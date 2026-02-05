const express = require('express');
const cors = require('cors');
const { ChatOllama } = require("@langchain/ollama");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts"); // <--- Import this
const { POSITIONS_DATA } = require("./data"); // <--- Import your data

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const model = new ChatOllama({
  baseUrl: "http://127.0.0.1:11434",
  model: "llama3.2",
  temperature: 0.7, // Adds a little creativity
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log("User Question:", message);

  try {
    // 1. Create the Context String (The "Knowledge")
    const contextText = JSON.stringify(POSITIONS_DATA, null, 2);

    // 2. Create a Structured Prompt
    // This tells the AI EXACTLY who it is and gives it the data.
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a helpful Recruitment Assistant for a company called Perficient. 
      
      Here is the LIVE database of open positions:
      {context}
      
      Rules:
      1. Only answer based on the data provided above.
      2. If the user asks about something not in the list, say you don't know.
      3. Be professional and concise.`],
      ["human", "{question}"],
    ]);

    // 3. Chain it all together: Prompt -> Model -> Output Parser
    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    // 4. Run the chain
    const stream = await chain.stream({
      context: contextText,
      question: message,
    });

    res.setHeader('Content-Type', 'text/plain');
    
    for await (const chunk of stream) {
      res.write(chunk);
    }
    res.end();
    
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Agent running on http://localhost:${PORT}`);
});