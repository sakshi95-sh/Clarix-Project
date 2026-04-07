"use client";
import Link from "next/link";
import Header from "../component/Header";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  // TODO: Add logic for upload a pdf file
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const file = e.target.files?.[0];
    if (!file) return
    setSelectedFile(file);
  };


  return (
    <div id="chat-page" className="flex  flex-col h-screen ">
      <Header />
      <main className="main-content border-gray-700 flex flex-1 mt-32   ">
        <div className="sidebar w-[15%]
       border  border-gray-300 
       gap-4
       flex flex-col ">
          <div className="px-6 py-10">
            <div className="flex items-center justify-center gap-2
          cursor-pointer
          bg-[#534ab7]
          text-white
          hover:bg-[#a599f0]
          hover:text-white
          p-4
          text-center
          rounded-lg
          ">

              <img src="/icon-plus.svg" alt="chat-icon"
                className="" />
              <h1
                className="text-gray-800 text-2xl 
            font-medium tracking-[4px]
            text-white "> New Chat</h1>


            </div>

          </div>
          <div id="recent-chats" className="px-6 flex flex-col gap-10" >
            <label className="text-gray-800 text-2xl font-medium tracking-[4px]">Recent Chats</label>
            <div className="flex items-center 
            gap-2
            cursor-pointer
   p-4
   hover:rounded-lg
              hover:bg-[#a599f0]
          hover:text-white
          hover:scale-105">
              <img src="/icon-clock.svg" alt="chat-icon"
                className="w-8" />
              <h1 className="text-gray-800 text-lg font-medium tracking-[2px]">Chat History 1</h1>
            </div>
          </div>
        </div>
        <div className="main-chat-page flex flex-1 flex-col ">
          <div className="
            bg-[#eae7e2] h-[80%] gap-10 border border-[#e0e0e0] border-2 flex flex-col items-center justify-center
            
             ">
            <h1 className="
       text-6xl font-medium tracking-[2px]
        px-20 mt-20
        text-center
        text-[#534ab7]
        leading-[1.2]
        ">What would you like to analyze?</h1>
            <h1 className="text-4xl text-center text-black-500 leading-relaxed">
              Upload a document, image, or audio file — or just type a question to get started.
            </h1>


          </div>

          <div className="main-chat-container
       border border-[#e0e0e0]
       flex-1
       flex flex-col  justify-center
       w-full
       px-2
       py-2
      
       gap-5
       
      ">
            <div className=" flex  items-center gap-5
           w-[90%] px-5 py-2 
            ">
              <label className=" 
              flex items-center justify-center gap-1
             border-2 border-[#c6c2bb] border-dashed
              text-lg
              hover:bg-[#e8e4ff]
              hover:text-[#534ab7]
              hover:font-bold
                bg-[#eae7e2]
                border-solid
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-4 py-4 ">
                <img src="/icon-image.svg" alt="image-icon"
                  className="w-8 h-6" />
                Upload Image
              </label>
              <label className="
               flex items-center justify-center gap-1
             border-2 border-[#c6c2bb] border-solid
              text-lg
                bg-[#eae7e2]
              hover:bg-[#e8e4ff]
              hover:text-[#534ab7]
              hover:font-bold
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-4 py-4">
                <img src="/icon-audio.svg" alt="audio-icon"
                  className="w-8 h-6" />
                Audio File
              </label>
              <label className=" flex items-center justify-center gap-1
              border-2 border-[#c6c2bb] border-dashed
              text-lg
                bg-[#eae7e2]
              hover:bg-[#e8e4ff]
              border-solid
              hover:text-[#534ab7]
              hover:font-bold
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-4 py-4">
                <img src="/icon-upload.svg" alt="upload-icon"
                  className="w-8 h-6" />
                Upload a PDF
                <input id="pdf-upload" type="file" accept=".pdf" className="hidden"
                  onChange={handlePdfUpload} />
              </label>
            </div>
            {selectedFile && (
             <div className="text-lg bg-[#eae7e2] w-fit px-4 py-2 rounded-lg flex items-center gap-2">
    <span>{selectedFile.name}</span>
    <button onClick={() => setSelectedFile(null)}>✖</button>
  </div>
            )}
            <form className=" flex flex-row items-center justify-center gap-4
            ">
              <input type="text" placeholder="Ask me anything..."
                className="w-[90%] px-5 py-2 
          h-18
          border-2 border-[#c6c2bb]
          rounded-lg 
          focus:outline-none 
          bg-[#eae7e2]
          text-2xl
          focus:ring-2 
          focus:ring-[#534ab7]
          " />
              <button className="bg-[#534ab7] text-white px-4 py-2 rounded-lg
          w-40
          text-2xl
          h-16">Send</button>
            </form>

          </div>


        </div>



      </main>

    </div>
  );
}