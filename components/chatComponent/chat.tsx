import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { BarLoader } from "react-spinners";

interface ChatMessage {
  role: "human" | "assistant";
  content: string;
}

const Chat = () => {
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Only scroll when a new message is added by user
  useEffect(() => {
    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false); // reset after scrolling
    }
  }, [history, shouldScroll]);

  async function answerChat() {
    try {
      setLoading(true);
      const response = await axios.post("/api/chat", { query, history });
      const AIreply = response.data.data;

      setHistory((prev) => [
        ...prev,
        { role: "human", content: query },
        { role: "assistant", content: AIreply },
      ]);

      setQuery("");
      setLoading(false);
      setShouldScroll(true); // trigger scroll only when sending
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Server error");
      } else {
        setError("Network error");
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    answerChat();
  }

  return (
    <div className="flex flex-col bg-cyan-950 text-white text-[12px] sm:text-xl items-center p-4">
      <section className="text-center mb-4">
        <h1 className="sm:text-2xl font-bitcount">Chat With Me - live</h1>
        <span className="text-sm">
          Talk to me freely, but don't overwhelm !<br />
          (ik what you're asking 🤪)
        </span>
      </section>

      {/* MAIN CHAT BOX */}
      <div className="flex flex-col border-2 w-80 sm:w-100 md:w-200 h-[400px] sm:h-[550px] bg-black">

        {/* MESSAGE LIST */}
        <div className="flex-1 overflow-y-scroll p-2 space-y-2">
          {error && <p className="text-red-500">{error}</p>}

          {history.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-center ${
                msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {msg.role === "assistant" && (
                <Image
                  src={"/GaurabIcon.jpg"}
                  className="rounded-full object-cover"
                  alt="profile image"
                  width={35}
                  height={35}
                />
              )}

              <p
                className={
                  msg.role === "assistant" ? "text-green-400" : "text-blue-400"
                }
              >
                {msg.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* INPUT BOX */}
        <form className="p-2 flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={loading ? "" : query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-black text-white border w-full rounded-md p-1"
            required
            placeholder="Ask something..."
          />
          <button
            type="submit"
            className="bg-blue-600 px-3 rounded-xl hover:bg-blue-800"
          >
            {loading ? <BarLoader/> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
