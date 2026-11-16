# Supabase 產品調整交接｜2026-11-15

這份文件只記錄需要 Ching 一起確認或實作的資料層工作。前端可以先做的項目不需要等待 migration。正式資料庫已經有每週待辦資料，以下 SQL／migration 都不可直接重跑或覆蓋 production。

## 1. 帳號時區偏好

### 目前前端

- 預設讀取瀏覽器／裝置的 IANA 時區，例如 `America/Los_Angeles`。
- 使用者可手動改成其他時區，也可恢復裝置時區。
- 手動選擇目前只存在該瀏覽器的 `localStorage`，不會跨裝置同步。
- 場次時間在資料庫仍應以 UTC timestamp 儲存；只在顯示與 Google Calendar 連結時套用偏好時區。

### 建議 Supabase 升級

- 在既有 profile，或獨立 `user_preferences` 表新增 nullable `time_zone text`。
- 儲存 IANA 名稱，不存 `PST`／`PDT` 這類會受日光節約時間影響的縮寫。
- `null` 代表沿用裝置時區；非 null 代表使用者手動指定。
- RLS 只允許本人讀寫。
- 前端登入後以 Supabase 值為準，登出／尚未載入時仍可使用裝置時區。

## 2. 重複待辦擴充

### 現況

- 現有 `weekly_goals`、`ensure_weekly_tasks` 與已執行的 weekly migration 只支援每週。
- 實測 `ensure_weekly_tasks` 目前以台灣週界線驗證；在美西週日直接傳入美西當週 Monday 會失敗。前端因此暫時保留既有週期，不能只改顯示文字。
- UI 下一輪要能容納每日、每週、每月與自訂頻率，不能再把資料模型綁死在「週」。

### 建議資料模型

- 建立通用 recurring goal，例如 `recurring_goals`：`id`、`user_id`、`title`、`starts_on`、`time_zone`、`rule`、`active`、timestamps。
- `rule` 建議採標準 RRULE 語意，至少支援頻率、間隔、每週星期、每月日期與結束條件。
- 每個實際 occurrence 仍建立一筆 task，並保留 parent goal id 與 occurrence identity，避免重新產生重複資料。
- 月底 29／30／31 日、日光節約時間、暫停後恢復、編輯未來 occurrence 的行為需要先定義。
- 建立通用 RPC 取代 `ensure_weekly_tasks`，並保留 production 既有 weekly 資料的 migration 路徑。

## 3. 完成待辦與未來場次

### 現況風險

- task 標記完成後，既有 `booking_tasks` 關聯可能仍留在未來場次，因此使用者之後仍可能在預約裡看到已完成事項。

### 建議

- 建立 transaction／RPC：標記完成時，同步移除該 task 在尚未開始場次的 `booking_tasks`。
- 回傳移除的場次數量，前端顯示通知並提供短時間「復原」。
- 復原需能安全恢復 task 狀態與原本未來場次關聯；已開始或已結束場次不可改寫歷史成果。

## 4. 開房者編輯場次主題

- `sessions.title` 已存在，但需要確認誰是開房者／管理者，以及現在是否已有 ownership 欄位。
- 建議用受 RLS 保護的 RPC 編輯 title，不開放一般參與者修改。
- title 可選填；未命名時顯示中性的「雜事房」，不要固定用「午間／晚間」判斷跨時區場次。

## 5. 待辦成果與洞察

- 若要準確計算「本週完成幾件」或完成趨勢，建議 tasks 新增 `completed_at timestamptz`，不要只靠 boolean `completed`。
- 完成時寫入時間，復原時清空；批次操作需一致。
- `tasks.priority` 已存在，星號優先標記只需前端使用，不需要新欄位。
- 舊 localStorage 匯入提示會從 UI 移除；新帳號以 Supabase clean slate 開始，不需要資料庫變更。

## 6. 場次列表篩選

- 第一版可在前端依已載入場次篩選日期與時段，不一定需要 migration。
- 若場次增加到需分頁或查詢多週，公開場次 API／query 應接受日期範圍與時區，並檢查 `sessions.starts_at` index。

## 執行順序

1. 先確認目前 production schema、RLS 與 weekly migration 狀態，只讀盤點。
2. 帳號時區偏好可獨立做，風險最低。
3. recurring model 先寫 migration 與既有 weekly 資料遷移方案，在 Preview 專案驗證後才碰 production。
4. 完成待辦／移除未來場次關聯需連同 undo 行為一起做，避免只改一半。
5. `completed_at` 與場次 title 權限可各自獨立 PR。

## 驗收重點

- 同一帳號在不同裝置登入後，手動選擇的時區一致。
- DST 切換日的場次時間與 Google Calendar 一致。
- 每日／每週／每月 occurrence 不重複產生。
- 完成已排入未來場次的待辦後，未來場次移除且可復原；歷史成果不變。
- 一般使用者無法修改他人的時區、重複待辦、場次主題或 booking 關聯。
