# Parking Lot

暫存不阻擋目前功能整合、但後續需要安排的工作。不要在此文件放置密碼、API key 或 SMTP 憑證。

## 品牌化 Supabase 驗證信

- 狀態：待處理
- 優先度：正式推廣前完成
- 背景：目前註冊確認信顯示寄件人 `Supabase Auth`，主旨與內文沒有提到「雜事房」，使用者可能無法辨識來源。
- 待確認：目前 Supabase 方案是否允許編輯 Auth Email Templates；若不允許，評估 Custom SMTP。
- 修改範圍：至少包含 Confirm signup 與 Reset password，並將寄件人名稱、主旨、按鈕與說明文字改為雜事房品牌。
- 驗收：從正式站重新發起註冊及忘記密碼，使用最新信件完成流程；寄件人與內容可辨識為雜事房，連結最後回到正式網站。
- 注意：SMTP 憑證只能存放於服務設定或環境變數，不可提交 GitHub。
