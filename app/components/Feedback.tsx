export default function Feedback({ onClose }: { onClose: () => void }) {

    return (
  <div className="
fixed inset-0 z-50
flex items-center justify-center
bg-black/30 backdrop-blur-sm
overflow-y-auto
p-6
">

  <div className="
  relative
  w-full max-w-2xl
  max-h-[90vh]
  overflow-y-auto
  rounded-[32px]
  bg-[var(--background)]
  border border-[var(--border-color)]
  shadow-2xl
  px-8 py-8
  ">

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

    {/* HEADER */}
    <div className="flex items-start gap-4 mb-8">

      <div className="
      w-14 h-14
      rounded-2xl
      bg-[var(--primary)]
      flex items-center justify-center
      flex-shrink-0
      ">
        <img
          src="/icon-message.svg"
          alt="feedback-icon"
          className="w-7 h-7"
        />
      </div>

      <div className="flex flex-col gap-1">

        <h1 className="
        text-4xl
        font-bold
        text-[var(--text-dark)]
        leading-tight
        ">
          Share your feedback
        </h1>

        <p className="
        text-[var(--text-muted)]
        text-lg
        leading-relaxed
        ">
          Help us improve Clarix. Every response is read by the team.
        </p>

      </div>
    </div>

    {/* TYPE */}
    <div className="flex flex-col gap-3 mb-8">

      <label className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      ">
        Type
      </label>

      <select className="
      w-full
      rounded-3xl
      border border-[var(--border-color)]
      bg-[var(--cream)]
      px-6 py-5
      text-xl
      outline-none
      ">
        <option>General feedback</option>
        <option>Bug report</option>
        <option>Feature request</option>
      </select>

    </div>

    {/* RATING */}
    <div className="flex flex-col gap-4 mb-8">

      <label className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      ">
        How's your experience?
      </label>

      <div className="flex items-center gap-3">

        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="
            text-5xl
            text-[#c6c2bb]
            hover:text-yellow-400
            transition-all
            cursor-pointer
            "
          >
            ★
          </button>
        ))}

      </div>
    </div>

    {/* MESSAGE */}
    <div className="flex flex-col gap-3 mb-8">

      <label className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      ">
        Your message
      </label>

      <textarea
        placeholder="Tell us what's on your mind..."
        className="
        min-h-[160px]
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

    {/* EMAIL */}
    <div className="flex flex-col gap-3 mb-10">

      <label className="
      text-sm
      tracking-[2px]
      uppercase
      font-semibold
      text-[var(--text-muted)]
      ">
        Email
        <span className="normal-case tracking-normal">
          {" "}
          (optional — for follow-up)
        </span>
      </label>

      <input
        type="email"
        placeholder="you@example.com"
        className="
        w-full
        rounded-3xl
        border border-[var(--border-color)]
        bg-[var(--cream)]
        px-6 py-5
        text-lg
        outline-none
        "
      />

    </div>

    {/* ACTION BUTTONS */}
    <div className="flex items-center gap-4">

      <button className="
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
      ">
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