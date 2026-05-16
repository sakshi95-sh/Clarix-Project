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
    const [status, setStatus] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

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

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);

            toast.success("Logged in 🎉");

            setIsLoggedIn(true);

            onClose();

            router.push("/chat");

        } else {

            setIsError(data.message || "Invalid email or password");

        }

    };

    return (

        <div className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/40 backdrop-blur-md
        ">

            <div className="
            relative
            w-[90%]
            max-w-[420px]
            rounded-2xl
            bg-white
            p-8
            shadow-2xl
            ">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="
                    absolute top-4 right-4
                    w-8 h-8
                    flex items-center justify-center
                    rounded-full
                    bg-gray-100
                    hover:bg-gray-200
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
                        Welcome back
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Log in to your account
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
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="
                        h-11 w-full
                        rounded-lg
                        border
                        px-3
                        bg-[#F8F7F2]
                        "
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="
                        h-11 w-full
                        rounded-lg
                        border
                        px-3
                        bg-[#F8F7F2]
                        "
                    />

                    <button
                        type="submit"
                        className="
                        h-11 w-full
                        rounded-lg
                        bg-[#4F46E5]
                        text-white
                        font-medium
                        mt-2
                        "
                    >
                        Log in →
                    </button>

                </form>

                {/* FOOTER */}
                <p className="
                text-sm
                text-center
                text-gray-500
                mt-4
                ">

                    Don’t have an account?{" "}

                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            setOpenSignup(true);
                        }}
                        className="
                        text-[#4F46E5]
                        font-medium
                        hover:underline
                        "
                    >
                        Sign up free
                    </button>

                </p>

            </div>

        </div>

    );
}