"use client";
import Link from "next/link";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Sidebar from "../components/Chat/Sidebar";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import Footer from "../components/Landing/Footer";


export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("");
const[userId, setUserId] = useState<string | null>(null);



  const [message, setMessage] = useState<{ content: string, role: 'user' | 'AI' }[]>([]);
  const hasMessage = message.length > 0;
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);


  const handleNewChat = () => {
  setChatId(null);
  setMessage([]);
};


  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    if (currentUserId) {
      setUserId(currentUserId);
    } 
  },[]);
  const handleChatSelect = async (chatId: string) => {
  setChatId(chatId);
  const response = await fetch(`/api/messages?chatId=${chatId}`);
  const data = await response.json();
  setMessage(data.messages);
  console.log("MESSAGES ----------- ",data.messages);
};
    useEffect(() => {
      if (userId) {
        fetchChats();
      }
    }, [userId]);
  //  Add logic for upload a pdf file
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return
    setSelectedFile(file);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return
    if(!['audio/mpeg','audio/wav', 'audio/mp3'].includes(file.type.toLowerCase())) {
      alert('Please upload a valid audio file (MP3, WAV, or M4A)');
      return;
    }
    setSelectedFile(file);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return
    if(!['image/jpg','image/jpeg', 'image/png', 'image/webp'].includes(file.type.toLowerCase())) {
      alert('Please upload a valid image file (JPG, JPEG, PNG, or WebP)');
      return;
    }
    setSelectedFile(file);
  }

    const fetchChats = async () => {
    if (!userId) return;
    const response = await fetch(`/api/chats?userId=${userId}`);
    const data = await response.json();
    setChatHistory(data.chatHistory);
    console.log("DATA ----------- ",chatHistory);
  };

  const handleSubmitChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue && !selectedFile) return;

    // Logic for sending message only
    if (inputValue && !selectedFile) {
      setMessage(prev => [...prev, { content: inputValue, role: 'user' }]);
     const userMessage = inputValue;

      setInputValue("");
      setIsLoading(true);
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, userId, chatId })
      });
      const data = await res.json();
      setMessage(prev => [...prev, { content: data.response, role: 'AI' }]);
         fetchChats();
      setIsLoading(false);
    }
    // Logic for sending PDF only
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const userMessage = inputValue;
      if (inputValue.trim()) {
        formData.append('message', userMessage);
        setMessage(prev => [...prev, { content: inputValue, role: 'user' }]);
      }
      setInputValue("");
      setIsLoading(true);
      const res = await fetch ('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(prev => [...prev, { content: data.response, role: 'AI' }]);
      fetchChats();
      setIsLoading(false);
    }

    if(selectedFile && selectedFile.type.startsWith('image/')) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    const userMessage = inputValue;
      if (inputValue.trim()) {
        formData.append('message', userMessage);
        setMessage(prev => [...prev, { content: inputValue, role: 'user' }]);
      
      }
      setInputValue("");
      setIsLoading(true);
      const res = await fetch ('/api/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(prev => [...prev, { content: data.response, role: 'AI' }]);
         fetchChats();
      setIsLoading(false);
    }

    if(selectedFile && selectedFile.type.startsWith('audio/')) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    const userMessage = inputValue;
      if (inputValue.trim()) {
        formData.append('message', userMessage);
        setMessage(prev => [...prev, { content: inputValue, role: 'user' }]);
      
      }
      setInputValue("");
      setIsLoading(true);
      const res = await fetch ('/api/audio', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(prev => [...prev, { content: data.response, role: 'AI' }]);
         fetchChats();
      setIsLoading(false);
    }
  }

  
  return (
    <div id="chat-page" className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 pt-[58px]  border-3 border-pink-500 overflow-hidden bg-[var(--background)]">
        <Sidebar chatHistory={chatHistory} 
        handleChatSelect={handleChatSelect}
        handleNewChat={handleNewChat} 
        chatId={chatId?.toString() || ""}  
        />
        {/* Main Chat Container */}
        <div className="flex flex-col flex-1  overflow-hidden bg-[var(--cream)]">
          {/* MESSAGES */}
          <ChatMessages hasMessage={hasMessage} message={message} />
          {/* Typing Area */}
          <ChatInput 
          handleSubmitChat={handleSubmitChat} 
          handleInputChange={handleInputChange} 
          inputValue={inputValue} 
          handleImageUpload={handleImageUpload}
          handleAudioUpload={handleAudioUpload}
          handlePdfUpload={handlePdfUpload}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}/>
        </div>
      </main>
      <Footer />

    </div>
  );
}