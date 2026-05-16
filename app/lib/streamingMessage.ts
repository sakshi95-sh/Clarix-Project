// lib/streamMessage.ts

type StreamMessageProps = {
    fullText: string;
    setMessage: React.Dispatch<
        React.SetStateAction<
            {
                content: string;
                role: "user" | "AI";
            }[]
        >
    >;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn?: boolean;
    fetchChats?: () => void;
};

export const streamMessage = ({
    fullText,
    setMessage,
    setIsLoading,
    isLoggedIn,
    fetchChats,
}: StreamMessageProps) => {
    const words = fullText.split(" ");
    setMessage((prev) => [
        ...prev,
        {
            content: "",
            role: "AI",
        },
    ]);
    let currentText = "";
    const interval = setInterval(() => {
        if (words.length === 0) {
            clearInterval(interval);

            setIsLoading(false);

            if (isLoggedIn && fetchChats) {
                fetchChats();
            }

            return;
        }

        const nextWord = words.shift();

        currentText += nextWord + " ";

        setMessage((prev) => {

            const updated = [...prev];

            updated[updated.length - 1] = {
                content: currentText,
                role: "AI",
            };

            return updated;
        });

    }, 80);
};