"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppName from "./AppName";

export default function Feedback({
  onClose,
}: {
  onClose: () => void;
}) {

  const [rating, setRating] = useState(0);

  const [email, setEmail] = useState("");
  const [type, setType] = useState("General feedback");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmitFeedback = async () => {

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    try {

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type,
          message,
          rating,
        }),
      });

      const data = await res.json();

      console.log(data);

      toast.success("Feedback submitted 🎉");

      onClose();

    } catch (error) {

      console.log(error);

      setError("Failed to submit feedback");

    }
  };

  return (
    <div
      className="
fixed inset-0 z-50
flex items-center justify-center
bg-black/30 backdrop-blur-sm
overflow-y-auto
p-6
"
    >
      <div
        className="
  relative
  w-full max-w-xl
  max-h-[90vh]
  overflow-y-auto
  rounded-[32px]
  bg-[var(--background)]
  border border-[var(--border-color)]
  shadow-2xl
  px-8 py-8
  "
      >
        

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
      absolute top-6 right-6
      w-12 h-12
      rounded-full
      bg-[#f5f2ed]
      flex items-center justify-center
      text-2xl
      text-[var(--text-muted)]
      hover:bg-[#ece7e1]
      transition-all
      cursor-pointer
      "
        >
          ×
        </button>
             {/* Logo */}
                                            <div className="mb-6 flex justify-center">
                                              <AppName />
                                            </div>
        {/* HEADER */}
        <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mt-4">
                           Share your feedback
                    </h1>
                </div>
        {/* EMAIL */}
        <div className="flex flex-col gap-3 mb-4">

          <label
            className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      "
          >
            Email
            <span className="normal-case tracking-normal">
              {" "}
              (Required — for follow-up)
            </span>
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
        w-full
        rounded-3xl
        border border-[var(--border-color)]
        bg-[var(--cream)]
        px-4 py-5
        text-lg
        outline-none
        "
          />
        </div>

        {/* TYPE */}
        <div className="flex flex-col gap-3 mb-8">

          <label
            className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      "
          >
            Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="
      w-full
      rounded-3xl
      border border-[var(--border-color)]
      bg-[var(--cream)]
      px-4 py-5
      text-xl
      outline-none
      "
          >
            <option>✉️ General feedback</option>
            <option>🐛 Bug report</option>
            <option>✨ Feature request</option>
          </select>

        </div>

        {/* RATING */}
        <div className="flex flex-col gap-4 mb-4">

          <label
            className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      "
          >
            How&apos;s your experience?
          </label>

          <div className="flex items-center gap-3">

            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`
        text-4xl
        transition-all
        cursor-pointer
        hover:text-yellow-400
        ${star <= rating
                    ? "text-yellow-400"
                    : "text-[#c6c2bb]"
                  }
      `}
              >
                ★
              </button>

            ))}

          </div>
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col gap-3 mb-8">

          <label
            className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      "
          >
            Your message
          </label>

          <textarea
            placeholder="Tell us what's on your mind..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
        min-h-[90px]
        rounded-3xl
        border border-[var(--border-color)]
        bg-[var(--cream)]
        px-6 py-5
        text-lg
        outline-none
        resize-none
        "
          />

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm font-medium mb-4">
            {error}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">

          <button
            onClick={handleSubmitFeedback}
            className="
      flex-1
      rounded-3xl
      bg-[var(--primary)]
      text-white
      text-xl
      font-semibold
      py-5
      hover:opacity-90
      transition-all
      cursor-pointer
      "
          >
            Send feedback
          </button>

          <button
            onClick={onClose}
            className="
        px-10 py-5
        rounded-3xl
        border border-[var(--border-color)]
        text-xl
        bg-[var(--background)]
        hover:bg-[var(--cream)]
        transition-all
        cursor-pointer
        "
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}