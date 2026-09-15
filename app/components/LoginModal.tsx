"use client";

import AppName from "./AppName";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalProvider";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { setIsLoggedIn } = useAuth();
  const { setOpenSignup } = useModal();

  const router = useRouter();

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError("");
        localStorage.setItem("userId", data.userID);
        localStorage.setItem("userName", data.userName);

        toast.success("Logged in 🎉");
        setIsLoggedIn(true);
        onClose();

        router.push("/chat");
      } else {
        setIsError(data.message || "Invalid email or password");
      }
    } catch {
      setIsError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/40 backdrop-blur-md
        "
    >
      <div
        className="
            relative
            w-[90%]
            max-w-[420px]
            rounded-2xl
            bg-white
            p-8
            shadow-2xl
            "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="
                    absolute top-4 right-4
                    w-8 h-8
                    flex items-center justify-center
                    rounded-full
                    bg-gray-100
                    hover:bg-gray-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
        >
          ✕
        </button>

        {/* LOGO */}
        <div className="mb-6 flex justify-center">
          <AppName />
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>

          <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
        </div>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
          {isError && (
            <p
              className="
                        text-red-500
                        text-sm
                        mb-2
                        text-center
                        "
            >
              {isError}
            </p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={isLoading}
            className="
                        h-11 w-full
                        rounded-lg
                        border
                        px-3
                        bg-[#F8F7F2]
                        disabled:opacity-60
                        "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            disabled={isLoading}
            className="
                        h-11 w-full
                        rounded-lg
                        border
                        px-3
                        bg-[#F8F7F2]
                        disabled:opacity-60
                        "
          />

          <button
            type="submit"
            disabled={isLoading}
            className="
                        h-11 w-full
                        rounded-lg
                        bg-[#4F46E5]
                        text-white
                        font-medium
                        mt-2
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        "
          >
            {isLoading ? "Logging in..." : "Log in →"}
          </button>
        </form>

        {/* FOOTER */}
        <p
          className="
                text-sm
                text-center
                text-gray-500
                mt-4
                "
        >
          Don’t have an account?{" "}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              onClose();
              setOpenSignup(true);
            }}
            className="
                        text-[#4F46E5]
                        font-medium
                        hover:underline
                        disabled:opacity-50
                        "
          >
            Sign up free
          </button>
        </p>
      </div>
    </div>
  );
}
