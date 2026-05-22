import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalProvider";

export default function Sidebar({
  chatHistory,
  handleChatSelect,
  handleNewChat,
  chatId,
}: {
  chatHistory: any[];
  handleChatSelect: (chatId: string) => void;
  handleNewChat: () => void;
  chatId: string;
}) {
  const { setOpenLogin } = useModal();
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <>
      {!isLoggedIn ? (
        <div
          className="
        sidebar
        w-[20%]
        flex
        flex-col
        flex-shrink-0
        border-r
        border-[var(--border-color)]
        h-full
        "
        >
          {/* FIXED TOP */}
          <div
            className="
          px-4
          py-6
          border-b
          border-[var(--border-color)]
          bg-[var(--background)]
          sticky
          top-0
          z-10
          "
          >
            <button
              className="
            flex items-center justify-center gap-2
            w-full
            bg-gradient-to-r from-[#7c6cff] to-[#534ab7]
            text-white
            rounded-2xl
            py-4
            font-medium
            tracking-[2px]
            shadow-sm
            opacity-60
            cursor-not-allowed"
            >
              <img src="/icon-plus.svg" alt="plus-icon" className="w-5 h-5" />
              New Chat
            </button>
          </div>

          {/* SCROLL AREA */}
          <div
            className="
          flex-1
          overflow-y-auto
          px-4
          py-6
          "
          >
            <div className="flex flex-col gap-3">
              <label
                className="
              text-xs
              tracking-[5px]
              uppercase
              text-[#9d958f]
              font-semibold"
              >
                Recent
              </label>

              {/* Locked Card */}
              <div
                className="
              bg-[#f7f5ff]
              border border-[#d9d3ff]
              rounded-3xl
              p-6
              flex flex-col items-center
              justify-center
              gap-5
              text-center"
              >
                <div className="text-2xl">🔒</div>

                <div className="flex flex-col gap-2">
                  <h1
                    className="
                  text-[#534ab7]
                  text-lg
                  font-semibold
                  leading-[1.3]"
                  >
                    Sign in to save chats
                  </h1>

                  <p
                    className="
                  text-[#8d84d8]
                  text-sm
                  leading-[1.5]"
                  >
                    Your history appears here after logging in
                  </p>
                </div>

                <button
                  onClick={() => setOpenLogin(true)}
                  className="
                  w-full
                  bg-gradient-to-r from-[#5f4cff] to-[#4d43c9]
                  hover:opacity-90
                  text-white
                  py-2
                  rounded-2xl
                  text-lg
                  font-semibold
                  tracking-wide
                  transition-all duration-200
                  cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
        sidebar
        w-[20%]
        flex
        flex-col
        flex-shrink-0
        border-r
        border-[var(--border-color)]
        h-full
        "
        >
          {/* FIXED TOP */}
          <div
            className="
          flex items-center justify-center
          px-4
          py-4
          border-b
          border-[var(--border-color)]
          bg-[var(--background)]
          sticky
          top-0
          z-10
          "
          >
            <button
              onClick={handleNewChat}
              className="
              flex items-center justify-center
              bg-[var(--primary)]
              text-white
              rounded-sm
              cursor-pointer
              w-fit
              gap-1
              px-4 py-3
              hover:opacity-90
              transition-all
              "
            >
              <img
                src="/icon-plus.svg"
                alt="chat-icon"
                className="text-center w-5 h-5"
              />

              <h1
                className="
              text-sm
              font-medium
              tracking-[2px]"
              >
                New Chat
              </h1>
            </button>
          </div>

          {/* SCROLLABLE CHATS */}
          <div
            id="recent-chats"
            className="
            flex-1
            overflow-y-auto
            px-4
            py-4
            flex flex-col gap-4
            "
          >
            <label
              className="
            text-sm
            text-[var(--text-muted)]
            tracking-wider"
            >
              Recent Chats
            </label>

            <div className="flex flex-col gap-1">
              {chatHistory?.map((chat) => (
                <div
                  key={chat.id}
                  className={`
                  flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer
                  ${
                    chat.id === chatId
                      ? "bg-[var(--blue-lt)] text-[var(--primary)]"
                      : "hover:bg-[#f2f0ff] text-gray-800"
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <img src="/icon-clock.svg" alt="chat-icon" className="w-4" />

                  <h1
                    className="
                  capitalize
                  text-sm
                  font-medium
                  tracking-[2px]
                  truncate
                  w-full"
                  >
                    {chat.preview}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
