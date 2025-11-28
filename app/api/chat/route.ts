import { vectorStore } from "@/lib/langchain/client";
import { NextRequest, NextResponse } from "next/server";
import { llmChat } from "@/lib/geminiChat/client";

export async function POST(req:NextRequest){
    const {query} = await req.json()

    if (!query) {
        return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    
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
                content: "You know details about Gaurab Wagle and you answer about him in a nice impressive way to the user according to ONLY based on the provided context. If unsure and not in the context, say so."
            },
            {
                role: "human",
                content: `
            Context:
            ${serializedContext}

            User Question:
            ${query}
            `
            }
            ]);
            console.log("This is entire response from model",response)
            console.log("this is the actual reply",response.content)
            return NextResponse.json({data: response.content, message:"Operation successfull"})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({data: null}, {status: 500})
        }
    }
}