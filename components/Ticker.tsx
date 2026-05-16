const tickerItems = [
  "小雯 完成了「預約牙科檢查」(拖延 38 天)",
  "建宏 完成了「辦理勞保查詢帳戶」",
  "怡君 完成了「整理舊衣捐贈箱」(拖延 61 天)",
  "文哲 完成了「繳清舊信用卡帳單」",
  "思穎 完成了「申請學貸還款展延」(拖延 29 天)",
  "瑞恩 完成了「更新緊急聯絡人資料」",
  "柏翰 完成了「回撥給媽媽說保單的事」",
  "曉彤 完成了「填寫公司年度健康問卷」(拖延 17 天)"
];

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border bg-cream-d py-2">
      <div className="flex w-max animate-tick">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span className="flex shrink-0 items-center gap-2 px-10 text-sm text-muted" key={`${item}-${index}`}>
            <span className="text-xs font-bold text-forest">✓</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
