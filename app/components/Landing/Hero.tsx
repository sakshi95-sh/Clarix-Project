import ChatDemo from "./ChatDemo";
export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 ">
{/* "w-full md:px-20 lg:px-10 mb-20 mt-10 pl-20 */}
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row items-center gap-6  ">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-2 mt-30">

          {/* Badge */}
          <div className="flex items-center p-2 rounded-full bg-[var(--blue-lt)] border border-[var(--border-color)] w-fit opacity-0 animate-[fadeup_0.6s_ease_0.20s_forwards]">
            <span className="inline-block  rounded-full w-3 h-3  mx-2 bg-[var(--primary)] animate-[pulse_2s_ease-in-out_infinite]"></span>
            <p className="text-sm font-bold text-center text-[var(--primary)] font-sans tracking-wider px-2">
              AI-powered content intelligence
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-xl md:text-xl lg:text-5xl font-bold text-[var(--secondary-color)] leading-[1.5] opacity-0 animate-[fadeup_0.6s_ease_0.18s_forwards]">
            Turn any content into
            <em className="ml-3 text-[var(--primary)] italic">
              clear insight
            </em>
          </h1>

          {/* Subtext */}
          <p   className="text-[var(--text-muted)] leading-relaxed tracking-wide text-2xl  md:text-xl max-w-xl opacity-0 animate-[fadeup_0.6s_ease_0.3s_forwards]">
            Upload documents, images, or audio — Clarix extracts summaries,
            key insights, and action items in seconds.
          </p>

          {/* Buttons */}
          {/* <div className="flex flex-wrap gap-4">
            <button className="border bg-[var(--primary)] text-white px-10 py-5 rounded-xl text-2xl mt-4 hover:shadow-xl hover:shadow-[var(--primary)]/20 hover:opacity-90 transition cursor-pointer opacity-0 animate-[fadeup_0.6s_ease_0.42s_forwards]">
              Try now — it’s free
            </button>

            <button className="border border-[var(--border-color)] px-10 py-5 text-2xl mt-4 rounded-xl text-[var(--secondary-color)] hover:border-gray-500 transition cursor-pointer opacity-0 animate-[fadeup_0.6s_ease_0.48s_forwards]">
              See how it works →
            </button>
          </div> */}

          {/* Small text */}
          <div className="flex flex-wrap gap-4 text-sm text-[var(--faint)] opacity-0 animate-[fadeup_0.6s_ease_0.54s_forwards]">
            <span className="text-lg font-semibold">✓ No credit card</span>
            <span className="text-lg font-semibold">✓ Results in seconds</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 min-w-0 flex items-center mt-30">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}