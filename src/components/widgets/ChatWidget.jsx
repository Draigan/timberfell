import { useState, useRef, useEffect } from "react";

const BRAND_PRIMARY = "#7b4a2b";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = inputRef.current?.value.trim();
    if (!text || loading) return;

    inputRef.current.value = "";
    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data?.reply?.trim() || "I’m still thinking about that.";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I’m having trouble responding right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full text-white transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-stone-800"
        style={{ backgroundColor: BRAND_PRIMARY }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-xl">💬</span>
      </button>

      {open && (
        <div className="fixed bottom-28 right-5 z-[9999] w-[20rem] overflow-hidden rounded-2xl border border-brand-cedar/40 bg-white shadow-[0_16px_40px_-14px_rgba(15,23,42,0.28)] dark:border-brand-cedar/50 dark:bg-slate-900/98 dark:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]">
          <div
            className="flex items-center justify-between bg-gradient-to-r from-[#6b3e25] via-[#7b4a2b] to-[#875232] px-4 py-3 text-white"
          >
            <div>
              <p className="text-sm font-semibold">Timberfell Assistant</p>
              <p className="text-xs text-white/90">Typically replies in a few seconds</p>
            </div>
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400" aria-hidden />
          </div>

          <div className="flex max-h-[22rem] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {!messages.length && !loading ? (
                <div className="rounded-lg bg-stone-100 px-4 py-3 text-stone-600">
                  Hi there! Ask about emergency service times, pricing, or what we recommend for the trees on your lot.
                </div>
              ) : null}

              {messages.map((msg, index) => (
                <div
                  key={`${msg.from}-${index}`}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      msg.from === "user"
                        ? "bg-[#7b4a2b] text-white border border-[#5a311a]"
                        : "bg-white text-stone-800 border border-stone-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-stone-100 px-3 py-2 text-stone-500">
                    <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-stone-400" />
                    <span className="inline-flex h-2 w-2 animate-bounce delay-150 rounded-full bg-stone-400" />
                    <span className="inline-flex h-2 w-2 animate-bounce delay-300 rounded-full bg-stone-400" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-stone-200 bg-white/90 px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-2 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask us about service hours..."
                  className="flex-1 bg-transparent px-1 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#7b4a2b] px-3 py-1.5 text-sm font-semibold text-white transition duration-150 hover:bg-[#6b3e25] disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-white/70"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
