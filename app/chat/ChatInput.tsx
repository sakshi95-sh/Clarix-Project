export default function ChatInput({
  handleSubmitChat,
  handleInputChange,
  inputValue,
  handleImageUpload,
  handleAudioUpload,
  handlePdfUpload,
  selectedFile,
  setSelectedFile,
  fileInputRef,
  isLoading,
}: {
  handleSubmitChat: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAudioUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isLoading: boolean;
}) {
  return (
    <div>
      <div
        className="main-chat-typing
       border-t border-[var(--border-color)]
       p-4
       flex flex-col
       w-full
       gap-4   
      "
      >
        <div className=" flex  items-center gap-4">
          <label
            className=" 
              flex items-center justify-center gap-1
             border-1 border-[#c6c2bb] border-dashed
              text-sm
              hover:bg-[#e8e4ff]
              hover:text-[#534ab7]
              hover:font-bold
            bg-[var(--cream)]
                border-solid
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-1 py-1 "
          >
            <img src="/icon-image.svg" alt="image-icon" className="w-4 h-6" />
            Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </label>
          <label
            className="
               flex items-center justify-center gap-1
             border-1 border-[#c6c2bb] border-dashed
              text-sm
              hover:bg-[#e8e4ff]
              hover:text-[#534ab7]
              hover:font-bold
            bg-[var(--cream)]
                border-solid
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-1 py-1"
          >
            <img src="/icon-audio.svg" alt="audio-icon" className="w-4 h-6" />
            Audio
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioUpload}
            />
          </label>
          <label
            className="flex items-center justify-center gap-1
             border-1 border-[#c6c2bb] border-dashed
              text-xs
              hover:bg-[#e8e4ff]
              hover:text-[#534ab7]
              hover:font-bold
            bg-[var(--cream)]
                border-solid
              hover:border-[#534ab7]
               w-fit
   rounded-lg px-1 py-1"
          >
            <img src="/icon-upload.svg" alt="upload-icon" className="w-4 h-6" />
            PDF
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handlePdfUpload}
            />
          </label>
        </div>
        {selectedFile && (
          <div className="text-lg bg-[var(--blue-md)] w-fit px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-[var(--paper)]">{selectedFile.name}</span>
            <button
              className="text-[var(--paper)]"
              onClick={() => setSelectedFile(null)}
            >
              ✖
            </button>
          </div>
        )}
        <form className=" flex flex-row   gap-2" onSubmit={handleSubmitChat}>
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-[90%] px-2 py-2 
          h-10
          border-2 border-[#c6c2bb]
          rounded-lg 
          focus:outline-none 
          bg-[var(--cream)]
          text-sm
          focus:ring-2 
          focus:ring-[#534ab7]
          "
            onChange={handleInputChange}
            value={inputValue}
          />
          <button
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg
          text-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          "
            type="submit"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
