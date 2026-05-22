"use client";

import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [inputValue, setInputValue] = useState("");

  const [userId, setUserId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<
    {
      content: string;
      role: "user" | "AI";
      fileUrl?: string;
      fileType?: string;
    }[]
  >([]);

  const hasMessage = message.length > 0;

  const [isLoading, setIsLoading] = useState(false);

  const [chatId, setChatId] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const { isLoggedIn } = useAuth();

  const handleNewChat = () => {
    setChatId(null);

    setMessage([]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchChats();
    }
  }, [isLoggedIn]);

  const handleChatSelect = async (chatId: string) => {
    setChatId(chatId);

    const response = await fetch(`/api/messages?chatId=${chatId}`);

    const data = await response.json();

    setMessage(data.messages);
  };

  // FILE VALIDATION
  const validateFile = (
    file: File,
    allowedTypes: string[],
    errorMessage: string,
  ) => {
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      alert(errorMessage);

      return false;
    }

    return true;
  };

  // PDF
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !validateFile(file, ["application/pdf"], "Please upload a valid PDF file")
    ) {
      return;
    }

    setSelectedFile(file);
  };

  // AUDIO
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !validateFile(
        file,
        ["audio/mpeg", "audio/wav", "audio/mp3"],
        "Please upload a valid audio file (MP3, WAV, or M4A)",
      )
    ) {
      return;
    }

    setSelectedFile(file);
  };

  // IMAGE
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !validateFile(
        file,
        ["image/jpg", "image/jpeg", "image/png", "image/webp"],
        "Please upload a valid image file (JPG, JPEG, PNG, or WebP)",
      )
    ) {
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchChats = async () => {
    const response = await fetch(`/api/chats`, {
      credentials: "include",
    });

    const data = await response.json();

    setChatHistory(data.chatHistory);
  };

  // SHARED SUBMIT
  const submit = async (
    endpoint: string,
    body: FormData | string,
    optimistic: {
      content: string;
      role: "user";
      fileUrl?: string;
      fileType?: string;
    },
  ) => {
    // OPTIMISTIC USER MESSAGE
    setMessage((prev) => [...prev, optimistic]);

    // RESET UI
    setInputValue("");

    setSelectedFile(null);

    setIsLoading(true);

    // REQUEST
    const res = await fetch(endpoint, {
      method: "POST",
      headers:
        typeof body === "string"
          ? {
              "Content-Type": "application/json",
            }
          : undefined,
      body,
    });

    // CHAT ID HEADER
    const chatIdHeader = res.headers.get("x-chat-id");

    if (chatIdHeader) {
      setChatId(chatIdHeader);
    }

    // STREAM READER
    const reader = res.body?.getReader();

    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();

    // EMPTY AI MESSAGE
    setMessage((prev) => [
      ...prev,
      {
        content: "",
        role: "AI",
      },
    ]);

    // REAL STREAMING
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      setMessage((prev) => {
        const updated = [...prev];

        const lastIndex = updated.length - 1;

        updated[lastIndex] = {
          ...updated[lastIndex],
          content: updated[lastIndex].content + chunk,
        };

        return updated;
      });
    }

    // LOADING COMPLETE
    setIsLoading(false);

    // REFRESH SIDEBAR
    if (isLoggedIn) {
      fetchChats();
    }

    // RESET FILE INPUT
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // TEXT
  const handleTextSubmit = () => {
    return submit(
      "/api/message",

      JSON.stringify({
        message: inputValue,
        userId,
        chatId,
      }),

      {
        content: inputValue,
        role: "user",
      },
    );
  };

  // FILES
  const handleFileSubmit = (endpoint: string) => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    formData.append("chatId", chatId || "");

    if (inputValue.trim()) {
      formData.append("message", inputValue);
    }

    return submit(endpoint, formData, {
      content: inputValue,
      role: "user",
      fileUrl: URL.createObjectURL(selectedFile),
      fileType: selectedFile.type,
    });
  };

  // DISPATCHER
  const handleSubmitChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue && !selectedFile) {
      return;
    }

    // TEXT
    if (!selectedFile) {
      return handleTextSubmit();
    }

    // PDF
    if (selectedFile.type === "application/pdf") {
      return handleFileSubmit("/api/upload");
    }

    // IMAGE
    if (selectedFile.type.startsWith("image/")) {
      return handleFileSubmit("/api/image");
    }

    // AUDIO
    if (selectedFile.type.startsWith("audio/")) {
      return handleFileSubmit("/api/audio");
    }
  };

  return (
    <div
      id="chat-page"
      className="
      flex flex-col h-screen
      "
    >
      <Header />

      <main
        className="
        flex flex-1
        pt-[58px]
        overflow-hidden
        bg-[var(--background)]
        "
      >
        <Sidebar
          chatHistory={chatHistory}
          handleChatSelect={handleChatSelect}
          handleNewChat={handleNewChat}
          chatId={chatId?.toString() || ""}
        />

        {/* CHAT AREA */}
        <div
          className="
          flex flex-col flex-1
          overflow-hidden
          bg-[var(--cream)]
          "
        >
          {/* MESSAGES */}
          <ChatMessages
            hasMessage={hasMessage}
            message={message}
            isLoading={isLoading}
          />

          {/* INPUT */}
          <ChatInput
            handleSubmitChat={handleSubmitChat}
            handleInputChange={handleInputChange}
            inputValue={inputValue}
            handleImageUpload={handleImageUpload}
            handleAudioUpload={handleAudioUpload}
            handlePdfUpload={handlePdfUpload}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            fileInputRef={fileInputRef}
            isLoading={isLoading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
