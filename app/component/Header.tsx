import { Outfit } from "next/font/google";
import Link from "next/link";
import NextLink from "next/link";
const outfit = Outfit({ subsets: ["latin"] });

export default function Header() {
    return (
        <header className=" flex justify-between items-center  p-6 bg-[#F5F0E8] fixed top-0 w-full z-50 border-b border-gray-300">
            <div className="flex items-center">
            <img className="w-30 h-20" src="/clarix-icon.svg" alt="Clarix" />
                <span className="{`${outfit.className} text-6xl font-bold p-2 font-bold `} ">Clar</span>
                <span className="{`${outfit.className} text-6xl font-bold p-2 font-bold text-[#534ab7] `}">ix</span>
            </div>
            <nav >
                <div className="flex gap-10 text-gray-700">
                    <button className="
                    cursor-pointer  
                    text-black 
                    font-semibold
                     font-sans
                    rounded px-6 py-5 
                    text-2xl 
                    hover:text-[#534ab7]
                    hover:bg-gray-200">How it works</button>
                    <button className="cursor-pointer
                     text-black
                     font-semibold
                      font-sans
                      px-6 py-2 
                      rounded text-2xl 
                      hover:text-[#534ab7] 
                      hover:bg-gray-200">Log In</button>
                    <Link href="/chat" className="
                    cursor-pointer 
                    bg-[#534ab7] 
                    text-white 
                    font-sans
                    font-semibold
                    px-6 py-6 
                    text-2xl 
                    rounded-lg
                    hover:bg-[#4a41a0] 
                    hover:shadow-2xl
                    transition-colors">Sign Up for free</Link>
                     <button className="
                     cursor-pointer 
                     text-black 
                     font-sans
                     font-semibold
                     px-6 py-2 
                     rounded text-2xl 
                     hover:text-[#534ab7] 
                     hover:bg-gray-200
                     ">Feeback</button>
                </div>
            </nav>
        </header>
        
    );
}