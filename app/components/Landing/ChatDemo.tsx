export default function ChatDemo() {
  return (
    <div className="w-full  max-w-none    bg-[var(--bg-color)] rounded-lg shadow-lg border border-[var(--border-color)] overflow-hidden
    opacity-0 animate-[fadeup_0.6s_ease_0.54s_forwards]
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);">

      {/* TOP BAR */}
      <div className="flex items-center gap-2 px-2 py-2 border-b border-[var(--border-color)]">
        <span className="w-3 h-3 bg-red-400 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
        <span className="w-3 h-3 bg-green-400 rounded-full"></span>

        <div className="ml-4 flex-1 bg-white rounded-md px-2 py-1 text-sm text-gray-500">
          clarix.app/chat
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex mt-2">

        {/* SIDEBAR */}
        <div className="w-1/3 border-r border-[var(--border-color)] p-1.5 space-y-4 h-full mt-2">
          <button className="w-full bg-[var(--primary)] text-white py-2 rounded-lg text-sm">
            + New Chat
          </button>

          <div className="text-sm text-gray-400 uppercase  mt-2">
            Recent
          </div>

          <div className="space-y-2 text-xs mt-2">
            <div className="flex items-center gap-2 rounded-md bg-[var(--blue-lt)] p-2 text-[var(--primary)]">
              <img src="/icon-clock.svg" className="w-4 h-4 inline-block" />
              <p className="">Q3 Earnings Report</p>
            </div>
            <div className="flex items-center gap-2  p-2 text-gray-500">
             <img src="/icon-clock.svg" className="w-4 h-4 inline-block " />
              <p className="inline-block ">Q3 Earnings Report</p>
            </div>
            <div className="flex items-center gap-2 p-2 text-gray-500">
              <img src="/icon-clock.svg" className="w-4 h-4 inline-block " />
              <p className="inline-block">Q3 Earnings Report</p>
            </div>
          </div>
          {/* <div className="h-[100px]"></div>  */}
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-6 flex flex-col gap-10 bg-white">

          {/* USER MESSAGE */}
          <div className=" self-end bg-[var(--primary)] text-white px-4 py-2 rounded-xl max-w-md text-sm leading-7 ">
            Summarize this Q3 report and pull out the key risks.
          </div>

          {/* AI RESPONSE */}
          <div className="bg-[#F7F4EF] border border-[var(--border-color)] rounded-xl p-4 space-y-3 text-sm max-w-xl leading-7">
            
            <div className="flex gap-5 text-sm">
              <span className="px-2 py-1 bg-[var(--blue-lt)] rounded text-sm">
                Summary
              </span>
              <span className="px-2 py-1 bg-[var(--blue-lt)] rounded text-sm">
                Key Risks
              </span>
              <span className="px-2 py-1 bg-[var(--blue-lt)] rounded text-sm">
                Actions
              </span>
            </div>

            <h3 className="font-semibold text-sm">
              Q3 2024 Earnings — Key Findings
            </h3>

            <div className="text-sm text-gray-700 space-y-2">
              <p>⬆ Revenue: $4.2B (+12% YoY)</p>
              <p>⬇ Net income: $820M, down 8%</p>
              <p>⚠ Risk: APAC supply chain pressure</p>
            </div>
          </div>
          {/* <div className="h-[150px]"></div> */}
          <div className="flex items-center gap-2   ">
          
        <input
          className="flex-1 px-3 py-2 rounded-md border text-sm  border-[var(--border-color)] "
          placeholder="Ask me anything about your content..."
        />
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          Send
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}