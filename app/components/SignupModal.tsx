"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppName from "./AppName";


export default function SignupModal({ onClose }: { onClose: () => void }) {

     const [isError, setIsError] = useState("");
     const [status, setStatus] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username") as string,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }),
    });

    if (res.ok) {
       setIsError("");
       form.reset();
       onClose(); 
       toast.success("Account created 🎉");
    } else {
       const data = await res.json();
       setIsError(data.error);
       setIsError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md">
      
      {/* MODAL BOX */}
      <div className="relative w-[90%] max-w-[420px] rounded-2xl bg-white p-8 shadow-2xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          ✕
        </button>

         {/* Logo */}
                <div className="mb-6 flex justify-center">
                  <AppName />
                </div>

        {/* HEADER */}
        <div className="text-center mb-6">

          <h1 className="text-2xl font-bold mt-4">
            Create your account
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Free — no credit card required
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full h-11 border border-gray-300 rounded-lg mb-4 hover:bg-gray-50"
        >
          <span>G</span>
          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
            
          {isError && (
            <p className="text-red-500 text-sm mb-2 text-center">
              {isError}
            </p>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="h-11 w-full rounded-lg border border-gray-300 px-3 bg-[#F8F7F2]"
          />

          <input
            type="text"
            name="name"
            placeholder="Full name (optional)"
            className="h-11 w-full rounded-lg border border-gray-300 px-3 bg-[#F8F7F2]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="h-11 w-full rounded-lg border border-gray-300 px-3 bg-[#F8F7F2]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="h-11 w-full rounded-lg border border-gray-300 px-3 bg-[#F8F7F2]"
          />

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#4F46E5] text-white font-medium mt-2"
          >
            Create Account →
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <button className="text-[#4F46E5] font-medium">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}