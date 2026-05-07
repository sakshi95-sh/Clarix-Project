import { useState,useEffect } from "react";
import { useAuth } from "../../context/AuthContext";



export default function Sidebar({ chatHistory, handleChatSelect, handleNewChat, chatId }: { chatHistory: any[], handleChatSelect: (chatId: string) => void, handleNewChat: () => void, chatId: string }) {

    const {isLoggedIn} = useAuth();
    
    
        // const checkAuth = async () => {
        //     const response = await fetch("/api/auth/check", {
        //         credentials: "include"
        //     });
        //     const data = await response.json();
        //     console.log("data", data);
        //     setIsLoggedIn(data.authenticated);
    
        // }
    
        // useEffect(() => {
        //     checkAuth();
        // }, []);
    return (
      <>
      {!isLoggedIn ? (

    <div className="
    sidebar w-[20%] flex flex-col gap-5 flex-shrink-0
    border-r border-[var(--border-color)] h-full px-4 py-6">

        {/* New Chat Button */}
        <button className="
        flex items-center justify-center gap-2
        w-full
        bg-gradient-to-r from-[#7c6cff] to-[#534ab7]
        text-white
        rounded-2xl
        py-4
        font-medium
        tracking-[2px]
        shadow-sm
        opacity-60
        cursor-not-allowed">

            <img
                src="/icon-plus.svg"
                alt="plus-icon"
                className="w-5 h-5"
            />

            New Chat
        </button>

        {/* Recent Label */}
        <div className="flex flex-col gap-3 mt-4">

            <label className="
            text-xs
            tracking-[5px]
            uppercase
            text-[#9d958f]
            font-semibold">

                Recent
            </label>

            {/* Locked Card */}
            <div className="
            bg-[#f7f5ff]
            border border-[#d9d3ff]
            rounded-3xl
            p-6
            flex flex-col items-center
            justify-center
            gap-5
            text-center">

                {/* Lock Icon */}
                <div className="text-4xl">
                    🔒
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-2">

                    <h1 className="
                    text-[#534ab7]
                    text-2xl
                    font-semibold
                    leading-[1.3]">

                        Sign in to save chats
                    </h1>

                    <p className="
                    text-[#8d84d8]
                    text-lg
                    leading-[1.5]">

                        Your history appears here after logging in
                    </p>

                </div>

                {/* Login Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="
                    w-full
                    bg-gradient-to-r from-[#5f4cff] to-[#4d43c9]
                    hover:opacity-90
                    text-white
                    py-4
                    rounded-2xl
                    text-lg
                    font-semibold
                    tracking-wide
                    transition-all duration-200
                    cursor-pointer">

                    Log In
                </button>

            </div>

        </div>

    </div>

) : (

    <div className="
    sidebar w-[20%] flex flex-col gap-5 flex-shrink-0 overflow-y-auto
    border-r border-[var(--border-color)] h-full">

        {/* Existing Logged In Sidebar */}

        <div className="flex items-center justify-center pt-4">

            <button className="
            flex items-center justify-center 
            bg-[var(--primary)] 
            text-white rounded-sm 
            cursor-pointer w-fit
            gap-1
            px-2 py-3">

                <img
                    src="/icon-plus.svg"
                    alt="chat-icon"
                    className="text-center w-5 h-5"
                />

                <h1
                    className="text-sm font-medium tracking-[2px]"
                    onClick={handleNewChat}>

                    New Chat
                </h1>

            </button>

        </div>

        <div
            id="recent-chats"
            className="px-4 flex flex-col gap-4">

            <label className="
            text-sm
            text-[var(--text-muted)]
            tracking-wider">

                Recent Chats
            </label>

            <div className="flex flex-col gap-1 overflow-y-auto">

                {chatHistory?.map((chat) => (

                    <div
                        key={chat.id}
                        className={`
                        flex items-center gap-2 px-1 py-1 cursor-pointer
                        ${chat.id === chatId
                                ? "bg-[var(--blue-lt)] text-[var(--primary)]"
                                : "hover:bg-[#f2f0ff] text-gray-800"
                            }`}
                        onClick={() => handleChatSelect(chat.id)}>

                        <img
                            src="/icon-clock.svg"
                            alt="chat-icon"
                            className="w-4"
                        />

                        <h1 className="
                        capitalize
                        text-sm
                        font-medium
                        tracking-[2px]
                        truncate
                        w-70">

                            {chat.preview}
                        </h1>

                    </div>

                ))}

            </div>

        </div>

    </div>
)}
      </>
    );
    //     <div className="
    //     sidebar w-[20%] flex flex-col gap-5 flex-shrink-0 overflow-y:auto 
    //     border-r border-[var(--border-color)] h-full">
    //         <div className="flex items-center justify-center pt-4">
    //             <button className="
    //             flex items-center justify-center 
    //             bg-[var(--primary)] 
    //             text-white  rounded-sm 
    //             cursor-pointer  w-fit
    //             gap-1
    //             px-2 py-3">
    //                 <img src="/icon-plus.svg" alt="chat-icon"
    //                     className="text-center w-5 h-5" />
    //                 <h1
    //                     className="text-gray-800 text-sm 
    //         font-medium tracking-[2px]
    //         text-white " onClick={handleNewChat}> New Chat</h1>
    //             </button>
    //         </div>
    //         <div id="recent-chats" className="px-4 flex flex-col gap-4" >
    //             <label className=" text-sm  text-[var(--text-muted)] tracking-wider overflow-y-auto ">Recent Chats</label>
    //             {
    //                 <div className="flex flex-col gap-1 overflow-y-auto">
    //                     {chatHistory?.map((chat) => (
    //                         <div key={chat.id} className={`
    //                         flex items-center gap-2 px-1 py-1 cursor-pointer 
    //                         ${chat.id ===chatId ? "bg-[var(--blue-lt)]  text-[var(--primary)]" : "hover:bg-[#f2f0ff] text-gray-800 "}`} 
    //                         onClick={() => handleChatSelect(chat.id)}>
    //                             <img src="/icon-clock.svg" alt="chat-icon"
    //                                 className="w-4" />
    //                             <h1 className=" capitalize text-sm font-medium tracking-[2px] truncate w-70">{chat.preview}</h1>
    //                         </div>

    //                     ))}

    //                 </div>
    //             }

    //         </div>
    //     </div>
    // );
}