export default function HowItWorksModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-lg rounded-2xl p-5 shadow-xl relative">

        {/* CLOSE BUTTON */}
        <button

          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        {/* HEADER */}
        <h1 className="text-3xl font-semibold mb-2">
          How Clarix works
        </h1>
        <p className="text-[var(--text-muted)] mb-6 text-sans tracking-wider">
          Three steps from raw content to clear insight
        </p>

        {/* STEPS */}
        <div className="space-y-0">

          {/* STEP 1 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center shrink-0">
            <em className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--primary)] text-white">
              1
            </em>
            <div className="h-30 border-1 border-soild border-gray-500 "></div>
            </div>
                
            <div>
              <div className="text-sm text-[var(--primary)] font-semibold   border-[var(--border-color)] ">UPLOAD</div>
              <h3 className="font-semibold text-lg mt-1 ">Add your content</h3>
              <div className="w-full text-sm text-[var(--text-muted)] mt-2">
                PDF, image, audio, or plain text — any format.
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex gap-4">
             <div className="flex flex-col items-center shrink-0">
            <em className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--primary)] text-white">
              2
            </em>
            <div className="h-30 border-1 border-soild border-gray-500 "></div>
            </div>
                
            <div>
              <p className="text-sm text-[var(--primary)] font-semibold">ANALYZE</p>
              <h3 className="font-semibold text-lg mt-1" >AI reads and understands</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                Extracts themes, risks, and insights in seconds.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--primary)] text-white">
              3
            </div>
            <div>
              <p className="text-lg text-[var(--primary)] font-semibold">INSIGHT</p>
              <h3 className="font-semibold text-lg mt-1">Get structured output</h3>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                Summary, key points, risks, and actions instantly.
              </p>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-8 pt-4 ">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg cursor-pointer"
          >
            Close
          </button>

          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg cursor-pointer">
            Try it free →
          </button>
        </div>

      </div>
    </div>
  );
}