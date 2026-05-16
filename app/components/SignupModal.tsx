"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AppName from "./AppName";
import { useModal } from "../context/ModalProvider";

export default function SignupModal({
  onClose
}: {
  onClose: () => void
}) {

  const { setOpenLogin } = useModal();

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    try {

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

      const data = await res.json();

      if (res.ok) {

        setIsError("");

        form.reset();

        toast.success("Account created 🎉");

        onClose();

        setOpenLogin(true);

      } else {

        setIsError(
          data.error ||
          data.message ||
          "Something went wrong"
        );

      }

    } catch {

      setIsError("Something went wrong");

    } finally {

      setIsLoading(false);

    }

  };

  return (

    <div className="
    fixed inset-0 z-[999]
    flex items-center justify-center
    bg-black/40 backdrop-blur-md
    ">

      {/* MODAL BOX */}
      <div className="
      relative
      w-[90%]
      max-w-[420px]
      rounded-2xl
      bg-white
      p-8
      shadow-2xl
      ">

        {/* CLOSE BUTTON */}
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

          <h1 className="text-2xl font-bold mt-4">
            Create your account
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Free — no credit card required
          </p>

        </div>

        {/* FORM */}
        <form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          noValidate
        >

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
            disabled={isLoading}
            className="
            h-11 w-full
            rounded-lg
            border border-gray-300
            px-3
            bg-[#F8F7F2]
            disabled:opacity-60
            "
          />

          <input
            type="text"
            name="name"
            placeholder="Full name (optional)"
            disabled={isLoading}
            className="
            h-11 w-full
            rounded-lg
            border border-gray-300
            px-3
            bg-[#F8F7F2]
            disabled:opacity-60
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={isLoading}
            className="
            h-11 w-full
            rounded-lg
            border border-gray-300
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
            border border-gray-300
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
            {isLoading
              ? "Creating account..."
              : "Create Account →"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="
        text-sm
        text-center
        text-gray-500
        mt-4
        ">

          Already have an account?{" "}

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              onClose();
              setOpenLogin(true);
            }}
            className="
            text-[#4F46E5]
            font-medium
            hover:underline
            disabled:opacity-50
            "
          >
            Log in
          </button>

        </p>

      </div>

    </div>
  );
}