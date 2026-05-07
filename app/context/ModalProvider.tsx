"use client"

import { usePathname } from "next/navigation";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { createContext, useContext, useState } from "react";
import HowItWorksModal from "../components/HowItWorksModal";
import Feedback from "../components/Feedback";

const ModalContext = createContext<any>(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }: { children: React.ReactNode }) {

    const [openHow, setOpenHow] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);

    const pathname = usePathname();
    return (
        <ModalContext.Provider value={{ setOpenHow, setOpenLogin, setOpenSignup, setOpenFeedback }}>
            {children}
            {openSignup && (
                <SignupModal onClose={() => setOpenSignup(false)} />
            )}
            {openLogin && (
                <LoginModal onClose={() => setOpenLogin(false)} />
            )}
            {openHow && (
                <HowItWorksModal onClose={() => setOpenHow(false)} />
            )}
            {openFeedback && (
                <Feedback onClose={() => setOpenFeedback(false)} />
            )}
        </ModalContext.Provider>
    );
}
