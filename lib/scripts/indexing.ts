import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../langchain/client.ts";

async function main() {
  const filePath = path.join(process.cwd(), "data", "AboutMe.pdf");

  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
    console.log(docs[0])
    console.log(docs[0].metadata)
    console.log(`Total characters: ${docs[0].pageContent.length}`);


  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 100,
  });

  const splits = await splitter.splitDocuments(docs);

  console.log(`Uploading ${splits.length} chunks…`);
  await vectorStore.addDocuments(splits);

  console.log(" Indexing complete.");
}

main();

