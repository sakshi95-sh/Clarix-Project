export default function Ticker() {
    const items = [
        "Action Items",
        "Meeting Notes",
        "PDF Analysis",
        "Risk Detection",
        "Multilingual Support",
        "Ask Anything",
        "Documents & PDFs",
        "Audio Transcription",
        "Images & OCR",
        "Instant Summary",
        
    ];
  return (
    <div className="mb-10 overflow-hidden">
      {/* className="max-content text-[var(--muted)] w-full px-20 lg:px-20 py-3 overflow-hidden bg-[var(--cream)] border-y border-[var(--border-color)] */}
   "
      <div className=" flex gap-10 w-max py-1 whitespace-nowrap animate-[ticker_22s_linear_infinite]  border-2 border-[var(--border)] bg-[var(--ticker)]
      box-shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
        
        {/* items */}
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-xl text-[var(--text-muted)] border-r border-[var(--border)]  px-2 py-2  tracking-wide ">
            <span className="w-3 h-3 bg-[var(--primary)] rounded-full animate-[pulse_2s_ease-in-out_infinite]"></span>
            {item}
          </div>
        ))}
       {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-xl text-[var(--text-muted)] border-r border-[var(--border)]  px-2 py-2  tracking-wide ">
            <span className="w-3 h-3 bg-[var(--primary)] rounded-full animate-[pulse_2s_ease-in-out_infinite]"></span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}