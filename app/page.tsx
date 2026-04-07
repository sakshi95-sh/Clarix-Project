
import Header from "./component/Header";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

function handleFreeSignup() {
  // Handle free signup logic here
  // console.log("Free signup clicked");
}

export default function Home() {
    return (
    <div id="landing-page">    
         <Header />
       <main className="min-h-screen bg-[#F5F0E8] pt-60 text-center" id="main-hero">
        <div className="py-4 
        max-w-md   
        mx-auto 
        border border-gray-300 
        rounded-4xl 
        bg-[#e8e4ff] 
        " >
          <h1 
          className="
          text-2xl 
          font-semibold 
          text-center 
          text-[#534ab7] 
          font-sans-serif" 
          id="landing-badge">
            AI-powered content intelligence
            <div className= " inline-block border rounded-full w-2 h-2  mx-4 bg-[#534ab7] animate-pulse ">
       </div>
          </h1>
        </div>
        <div className="mt-10">
          <h1 className=
          {`${outfit.className} text-9xl  text-Black font-extrabold p-2 `}
          >
      Turn any content into</h1>
       <h1 className=
          {`${outfit.className} text-9xl  text-Black font-extrabold p-2 text-[#534ab7] `}
          >
      clear, actionable insight</h1>
        </div>
        <div className="mt-10  mx-220 sp">
          <h2 className="text-2xl   leading-loose text-center text-gray-700 text-4xl font-sans-serif">
            Upload documents, images, or audio — Clarix extracts summaries, key insights, action items, and answers your questions instantly.
          </h2>
        </div>
        <div className="mt-10">
          <button className="
          cursor-pointer 
                    bg-[#534ab7] 
                    text-white 
                    font-sans
                    font-semibold
                    px-6 py-4  
                     mx-6 
                    text-3xl 
                    rounded-lg
                    hover:bg-[#4a41a0] 
                    hover:shadow-2xl
                    transition-colors">
        
        Try now — it's free

          </button>
          <button className="
          cursor-pointer 
                    bg-white 
                    text-[#534ab7] 
                    font-sans
                    font-semibold
                    px-6 py-4  
                    text-3xl 
                    mx-6  
                    rounded-lg
                    hover:bg-gray-100 
                    border border-gray-300
                    hover:shadow-2xl
                    transition-colors">
            Learn More
          </button>
      </div>
      <div id="landing-features "
      className="mt-30 pb-20 flex justify-center gap-15 ">

          <div id="feature-card" className="
          w-110 
          h-100 
          border-2 border-[#e8e2d8] rounded-3xl 
          bg-white 
          p-0
          flex 
          text-left
          flex-col 
          hover:scale-100 
          hover:border-[#534ab7]
          hover:shadow-lg
          ">
            <div className="
            w-20 h-20 
            rounded-xl 
            bg-[#e8e4ff] 
            flex items-center justify-center 
            ml-10 mt-15">
            <img src="/icon-document.svg" alt="Document" className="mx-auto my-10 w-10"/>
            </div>
            <h1 className="text-4xl font-semibold text-black-500 mt-9 ml-5 font-sans">Documents & PDFs
            </h1>
              <h2 className="text-3xl  text-gray-500 mt-6 ml-5 leading-relaxed">
                Summarize reports, contracts, research papers in seconds
              </h2>
          </div>   
        
        
         <div id="feature-card" className="
          w-110 
          h-100 
          border-2 border-[#e8e2d8] rounded-3xl 
          bg-white 
          p-0
          flex 
          text-left
          flex-col 
          hover:scale-100 
          hover:border-[#534ab7]
          hover:shadow-lg
          ">
            <div className="
            w-20 h-20 
            rounded-xl 
            bg-[#e8e4ff] 
            flex items-center justify-center 
            ml-10 mt-15">
            <img src="/icon-image.svg" alt="Document" className="mx-auto my-10 w-10"/>
            </div>
            <h1 className="text-4xl font-semibold text-black-500 mt-9 ml-5 font-sans">Images & OCR
            </h1>
              <h2 className="text-3xl  text-gray-500 mt-6 ml-5 leading-relaxed">
                Extract and analyze text from any image or screenshot
              </h2>
          </div> 

          <div id="feature-card" className="
          w-110 
          h-100 
          border-2 border-[#e8e2d8] rounded-3xl 
          bg-white 
          p-0
          flex 
          text-left
          flex-col 
          hover:scale-100 
          hover:border-[#534ab7]
          hover:shadow-lg
          ">
            <div className="
            w-20 h-20 
            rounded-xl 
            bg-[#e8e4ff] 
            flex items-center justify-center 
            ml-10 mt-15">
            <img src="/icon-audio.svg" alt="Document" className="mx-auto my-10 w-10"/>
            </div>
            <h1 className="text-4xl font-semibold text-black-500 mt-9 ml-5 font-sans">
              Audio & Speech
            </h1>
              <h2 className="text-3xl  text-gray-500 mt-6 ml-5 leading-relaxed">
               Transcribe and extract insights from voice recordings
              </h2>
          </div> 

          <div id="feature-card" className="
          w-110 
          h-100 
          border-2 border-[#e8e2d8] rounded-3xl 
          bg-white 
          p-0
          flex 
          text-left
          flex-col 
          hover:scale-100 
          hover:border-[#534ab7]
          hover:shadow-lg
          ">
            <div className="
            w-20 h-20 
            rounded-xl 
            bg-[#e8e4ff] 
            flex items-center justify-center 
            ml-10 mt-15">
            <img src="/icon-chat.svg" alt="Document" className="mx-auto my-10 w-10"/>
            </div>
            <h1 className="text-4xl font-semibold text-black-500 mt-9 ml-5 font-sans">Ask anything
            </h1>
              <h2 className="text-3xl  text-gray-500 mt-6 ml-5 leading-relaxed">
               Chat with your content — get answers, translations, notes
              </h2>
          </div> 
      </div>
      <footer className="bg-gray-100 py-8 text-2xl">
        <div className="container mx-auto text-center text-gray-600">
          © 2026 Clarix. All rights reserved.
        </div>
      </footer>
        </main>
      </div>
    );
}