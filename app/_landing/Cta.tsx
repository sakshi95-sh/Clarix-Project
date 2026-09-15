import Link from "next/link";

export default function Cta() {
  return (
    <div className=" px-10 py-20 bg-text-[var(--primary)] flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-[#1c1c1c]">
        Your content.
        <br />
        <span className="text-[var(--primary)] italic">Finally useful.</span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Drop a file. Ask a question. Get the answer. That's the whole thing.
      </p>
    </div>
  );
}
