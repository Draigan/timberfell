import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    inputRef.current.value = "";
    setMessages((m) => [...m, { from: "user", text }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: data.reply || "..." }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-[#7b4a2b] text-white p-3 rounded-full shadow-lg z-[9999]"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 flex flex-col bg-white border border-stone-300 rounded-lg shadow-xl z-[9999]">
          <div className="bg-[#7b4a2b] text-white px-4 py-2 font-semibold">
            Timberfell AI
          </div>
          <div className="flex-1 overflow-y-auto p-2 text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-[#7b4a2b] text-white self-end ml-auto"
                    : "bg-stone-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
          <div className="p-2 border-t border-stone-200 flex">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 border border-stone-300 rounded-md text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-[#7b4a2b] text-white px-3 py-1 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

