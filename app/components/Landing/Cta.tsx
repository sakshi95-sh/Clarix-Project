import Link from "next/link";

export default function Cta() {
  return (
    <div className=" px-10 py-20 bg-[#f8f6f2] flex flex-col justify-center items-center text-center">

      <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-[#1c1c1c]">
        Your content.
        <br />
        <span className="text-[#5a4df5] italic">
          Finally useful.
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Drop a file. Ask a question. Get the answer. That's the whole thing.
      </p>

      <Link href="/chat" className="mt-5">
        <button className="bg-gradient-to-r from-[#5a4df5] to-[#6a5cff] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition">
          Get started free →
        </button>
      </Link>

    </div>
  );
}