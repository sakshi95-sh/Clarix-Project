"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirect() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/chat");
    }
  }, [isLoggedIn]);

  return null;
}
