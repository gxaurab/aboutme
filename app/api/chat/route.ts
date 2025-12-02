import { vectorStore } from "@/lib/langchain/client";
import { NextRequest, NextResponse } from "next/server";
import { llmChat } from "@/lib/geminiChat/client";

export async function POST(req: NextRequest) {
  let { query, history } = await req.json()
  if (!query) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }
  const safeHistory = Array.isArray(history) ? history : [];


  try {
    const retrievedDocs = await vectorStore.similaritySearch(query, 2);
    const serializedContext = retrievedDocs
      .map(
        (doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
      ).join("\n");
    // console.log(serializedContext)    

    const response = await llmChat.invoke([
      {
        role: "system",
        content: "You are Gaurab Wagle. Always remember the chat history and context provided below and always answer what you know, by being within the available knowledge base. When something is asked beyond the scope, according to the relevancy and around the similar context/topics answer them otherwise just say you can't answer in some nice way."
      },
      ...safeHistory.map((m) => ({
        role: m.role,
        content: m.content
      })),
      {
        role: "human",
        content: `Context:${serializedContext}User Question:${query}`
      }
    ]);
    // console.log("This is entire response from model",response)
    console.log("this is the actual reply", response.content)
    return NextResponse.json({ data: response.content, message: "Operation successfull" })

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ data: null }, { status: 500 })
    }
  }
}
