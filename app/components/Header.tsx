"use client";
import { Outfit } from "next/font/google";
import AppName from "./AppName";
import Link from "next/link";
import { useModal } from "./ModalProvider";
import { useState, useEffect } from "react";

export default function Header() {
    const { setOpenHow, setOpenLogin, setOpenSignup } = useModal();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setIsLoggedIn(!!userId);
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.location.href = "/";
    };
    return (
        <header className=" 
        flex justify-between items-center  fixed top-0 w-full z-50  border-b border-[var(--border-color)]
     px-4
     py-3
     bg-[var(--background)]
        font-[--font-sans]">
            <AppName />
            <div className="flex flex-1 justify-end items-center gap-5">
                <button className="
                    cursor-pointer
                    text-[var(--text-muted)]
                    font-sans
                    text-sm
                    px-2
                    py-2
                    leading-[1.2]
                    tracking-wide
                    font-normal
                    hover:text-[var(--primary)]      
                    " onClick={() => setOpenHow(true)}>How it works</button>

                {isLoggedIn ? (<button className="  cursor-pointer 
                    bg-[#534ab7] 
                    text-white 
                    font-sans
                   p-2
                   px-4
                    text-sm
                    rounded-xl
                    hover:bg-[#4a41a0] 
                    hover:shadow-2xl
                    transition-colors" onClick={handleLogout}>Logout</button>) :
                <>
                    <button onClick={() => setOpenLogin(true)} className="cursor-pointer
                    text-[var(--text-muted)]
                    font-sans
                    text-sm
                    px-2
                    py-2
                    leading-[1.2]
                    tracking-wide
                    hover:text-[var(--primary)]   
                    font-normal
                    hover:shadow-2xl  ">Log In</button>
                    <button onClick={() => setOpenSignup(true)} className="
                    cursor-pointer 
                    bg-[#534ab7] 
                    text-white 
                    font-sans
                   p-2
                   px-4
                    text-sm
                    rounded-xl
                    hover:bg-[#4a41a0] 
                    hover:shadow-2xl
                    transition-colors">Sign Up for free</button>
                    </>}
                <Link href="/feedback" onClick={() => setOpenSignup(true)} className="
                    cursor-pointer
                    text-[var(--text-muted)]
                    font-sans
                    hover:text-[var(--primary)]   
                    text-sm
                    tracking-wider
                    leading-[1.2]
                    font-normal
                    hover:shadow-2xl 
                     ">Feedback</Link>
            </div>

        </header>

    );
}