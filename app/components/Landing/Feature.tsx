export default function Features() {
    const heights = [28, 38,  58, 42, 36, 42, 48, 38, 36, 40, 54, 38,34, 29,38,22];

    const colors = [
        "bg-[var(--primary)]",
        "bg-[var(--blue-md)]",
        "bg-[var(--primary)]",
        "bg-[var(--blue-lt)]",
    ];
    return (

        <section className="bg-[var(--background)] ">

            {/* Container */}
            <div className=" mx-auto px-6">

                {/* TOP TEXT */}
                <div className="text-center mb-7 ">
                    <p className="text-lg tracking-wider text-[var(--text-muted)] mb-3 ">
                        WHAT YOU CAN ANALYZE
                    </p>

                    <h1 className="text-3xl md:text-3xl font-bold text-[var(--secondary-color)]">
                        Every format. One conversation.
                    </h1>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

              {/* CARD 1 */}
                    <div className="transition duration-200 hover:shadow-xl shadow-lg hover:-translate-y-1 p-8 bg-white border border-[var(--border-color)] rounded-2xl p-6 shadow-sm col-span-12 md:col-span-7">
                        <div className="w-8 h-8 bg-[var(--blue-lt)] rounded-lg mb-4">
                            <img src="/icon-document.svg" alt="PDF Icon" className="w-8 h-8" />
                        </div>

                        <h1 className="text-xl font-semibold mb-2 mt-4">
                            Documents & PDFs
                        </h1>

                        <p className="text-lg text-[var(--text-muted)] mt-4 mb-6 leading-relaxed tracking-loose">
                            Upload any report, contract, or research paper — Clarix extracts
                            a structured summary, key obligations, deadlines, and risks in seconds.
                        </p>

                        {/* Bottom box */}
                        <div className="bg-[var(--background)] p-2 border border-[var(--border-color)] rounded-lg p-3 text-sm text-[var(--text-muted)] mt-2 mb-2">
                            Q3_Annual_Report.pdf
                        </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="transition duration-200 hover:shadow-xl shadow-lg hover:-translate-y-1 p-2 bg-white border border-[var(--border-color)] rounded-2xl p-6 shadow-sm col-span-12 md:col-span-5">
                        <div className="w-8 h-8 bg-[var(--blue-lt)] rounded-lg mb-4">
                            <img src="/icon-image.svg" className="w-8 h-8" />
                        </div>
                        <h1 className="text-xl font-semibold mb-2 mt-4">
                            Images & OCR
                        </h1>
                        <p className="text-lg text-[var(--text-muted)] mt-4 mb-6 leading-relaxed tracking-loose">
                            Extract and analyze text from any screenshot, whiteboard photo, or slide deck.
                        </p>
                        <div className="bg-[var(--background)] p-2 border border-[var(--border-color)] rounded-lg p-3 text-s, text-[var(--text-muted)] mt-2 mb-2">
                            Supports PNG, JPG, WEBP, HEIC
                        </div>

                    </div>
                    {/* CARD 3 */}
                    <div className="transition duration-200 hover:shadow-xl shadow-lg hover:-translate-y-1  bg-white border border-[var(--border-color)] rounded-2xl p-6 shadow-sm col-span-12 md:col-span-5">
                        <div className="w-8 h-8 bg-[var(--blue-lt)] rounded-lg mb-4">
                            <img src="/icon-audio.svg" className="w-8 h-8" />
                        </div>

                        <h1 className="text-xl font-semibold mt-4 mb-2">
                            Audio & Speech
                        </h1>

                        <p className="text-lg text-[var(--text-muted)] mt-4 mb-6 leading-relaxed tracking-loose">
                            Upload a meeting recording and get a full transcript with speaker summaries.
                        </p>
                        <div className="flex items-center gap-[3px] mt-4 h-[40px]">
                            {heights.map((h, i) => (
                                <div
                                    key={i}
                                    className={`w-[6px] rounded-sm ${colors[i % colors.length]}`}
                                    style={{
                                        height: `${h}px`,
                                        opacity: 0.5 + (i % 10) * 0.8,
                                    }}
                                />
                            ))}
                            <h3 className="p-2 text-sm text-[var(--text-muted)] mt-2 mb-2">
                                Transcribing...
                            </h3>
                        </div>


                    </div>

                    {/* CARD 4 (DARK) */}
                    <div className="transition duration-200 shadow-xl hover:shadow-lg hover:-translate-y-1 p-4 rounded-2xl bg-gradient-to-br from-black to-[#1a1a1a] text-white col-span-12 md:col-span-6">

                        <div className="w-8 h-8 bg-white/10 rounded-lg mb-4">
                            <img src="/icon-chat.svg" className="w-8 h-8 opacity-80" />
                        </div>

                        <h3 className="text-xl font-semibold mt-4 mb-2">
                            Ask anything
                        </h3>

                        <p className=" text-sm text-[#F7F4EFBF] mt-4 mb-6  ">
                            Chat with your content in natural language. Ask follow-ups, compare sections,
                            or generate summaries.
                        </p>

                        <div className="flex flex-wrap gap-3 text-sm mt-6">
                            <span className="bg-white/10 px-4 py-2 rounded-full text-[#F7F4EFBF] ">Translate to Spanish</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full text-[#F7F4EFBF] ">What are the risks?</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full text-[#F7F4EFBF] ">Summarize in 3 bullets</span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}