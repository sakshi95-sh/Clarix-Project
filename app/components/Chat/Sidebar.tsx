import { useState } from "react";



export default function Sidebar({ chatHistory, handleChatSelect, handleNewChat, chatId }: { chatHistory: any[], handleChatSelect: (chatId: string) => void, handleNewChat: () => void, chatId: string }) {
    return (
        <div className="
        sidebar w-[15%] flex flex-col gap-5 flex-shrink-0 overflow-y:auto 
        border-r border-[var(--border-color)] h-full">
            <div className="flex items-center justify-center pt-4">
                <button className="
                flex items-center justify-center 
                bg-[#534ab7] 
                text-white  rounded-sm 
                cursor-pointer  w-fit
                gap-1
                px-8 py-3">
                    <img src="/icon-plus.svg" alt="chat-icon"
                        className="text-center w-5 h-5" />
                    <h1
                        className="text-gray-800 text-sm 
            font-medium tracking-[2px]
            text-white " onClick={handleNewChat}> New Chat</h1>
                </button>
            </div>
            <div id="recent-chats" className="px-4 flex flex-col gap-4" >
                <label className=" text-sm  text-[var(--text-muted)] tracking-wider ">Recent Chats</label>
                {
                    <div className="flex flex-col gap-1 overflow-y-auto">
                        {chatHistory.map((chat) => (
                            <div key={chat.id} className={`
                            flex items-center gap-2 px-1 py-1 cursor-pointer 
                            ${chat.id ===chatId ? "bg-[var(--blue-lt)]  text-[var(--primary)]" : "hover:bg-[#f2f0ff] text-gray-800 "}`} 
                            onClick={() => handleChatSelect(chat.id)}>
                                <img src="/icon-clock.svg" alt="chat-icon"
                                    className="w-4" />
                                <h1 className=" capitalize text-sm font-medium tracking-[2px] truncate w-70">{chat.preview}</h1>
                            </div>

                        ))}

                    </div>
                }

            </div>
        </div>
    );
}