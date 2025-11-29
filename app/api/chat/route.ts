import { vectorStore } from "@/lib/langchain/client";
import { NextRequest, NextResponse } from "next/server";
import { llmChat } from "@/lib/geminiChat/client";

export async function POST(req:NextRequest){
    let {query, history} = await req.json()
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
                content: "You area person named gaurab wagle and people will ask things about you. Your job is to give responses of medium/short/sweet length that answers the questions but don't reply to anything that is out of context. Just say you CAN'T answer that. "
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
            console.log("this is the actual reply",response.content)
            return NextResponse.json({data: response.content, message:"Operation successfull"})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({data: null}, {status: 500})
        }
    }
}