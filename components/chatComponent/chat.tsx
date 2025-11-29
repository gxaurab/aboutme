import { useState } from "react"
import axios from "axios";

interface ChatMessage{
    role: "human" | "assistant";
    content: string
}

const Chat = () => {
    const [query, setQuery] = useState<string>("")
    const [history, setHistory] = useState<ChatMessage[]>([])
    const [error, setError] = useState<string | null>(null)


    async function answerChat(){
        try {
            const response = await axios.post("/api/chat", {query, history})
            console.log(response.data.data)

            const AIreply = response.data.data
            
            setHistory((prev) => [
                ...prev,
                { role: "human", content: query },
                { role: "assistant", content: AIreply }
            ]);
            setQuery("")

        } catch (err) {
            if (axios.isAxiosError(err)) {
            setError(err.response?.data?.error || "Server error")
        } else {
            setError("Network error")
        }
        }
    }


    function handleSubmit(e: React.FormEvent<HTMLFormElement>){   
        e.preventDefault()
        if (!query.trim()) return;
        console.log(query)
        answerChat()
    }


  return (
    <div className="flex flex-col border-2 max-w-150 justify-center items-center border-pink-600">
        <h1 className="text-xl border-b-2"> Chat With Me</h1>
        <p>This is basically me. Don't overwhelm me with your questions but, yea let's talk !!</p>
        
        <div className="border-2 border-amber-700 h-100 w-3/4 flex flex-col gap-5 justify-end">
            
            {error && (
            <p className="text-red-500 p-2">{error}</p>
            )}

            <div className="flex flex-col gap-2">
            {history.map((msg, i) => (
                <p
                key={i}
                className={
                    msg.role === "assistant"
                    ? "text-green-500"
                    : "text-red-500"
                }
                >
                {msg.content}
                </p>
            ))}
            </div>


            <form className="flex flex-col" onSubmit={handleSubmit} >
                <label className="text-sm"> Ask here: </label>
                <input type="text" name="human" 
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-900 text-white tex w-full rounded-xl" placeholder="ask anything about me" required/>

                <button type="submit" className="border-2 mx-auto hover:bg-amber-200"> Send</button>
            </form>
        </div>

    </div>
  )
}

export default Chat