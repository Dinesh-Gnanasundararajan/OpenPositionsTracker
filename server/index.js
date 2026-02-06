const express = require('express');
const cors = require('cors');
const { ChatOllama } = require("@langchain/ollama");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { POSITIONS_DATA } = require("./data"); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. Setup Model (Temperature 0 is crucial)
const model = new ChatOllama({
  baseUrl: "http://127.0.0.1:11434",
  model: "llama3.2",
  temperature: 0,
  format: "json", // 👈 FORCE JSON OUTPUT
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log("User Question:", message);

  try {
    // ---------------------------------------------------------
    // STEP 1: ASK AI TO EXTRACT FILTERS (NOT SEARCH DATA)
    // ---------------------------------------------------------
    const parserPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a Search Query Extractor.
      
      Your goal is to extract search keywords from the user's question.
      
      OUTPUT FORMAT (JSON ONLY):
      {{
        "client": "string or null",
        "role": "string or null",
        "status": "string or null",
        "priority": "string or null"
      }}
      
      EXAMPLES:
      - "Show me Google roles" -> {{ "client": "Google", "role": null, "status": null, "priority": null }}
      - "Urgent Java jobs" -> {{ "client": null, "role": "Java", "status": null, "priority": "Urgent" }}
      - "What's up?" -> {{ "client": null, "role": null, "status": null, "priority": null }}
      `],
      ["human", "{question}"],
    ]);

    const chain = parserPrompt.pipe(model).pipe(new StringOutputParser());
    
    // Get the JSON filter from AI
    const filterJsonStr = await chain.invoke({ question: message });
    const filters = JSON.parse(filterJsonStr);
    
    console.log("🔍 AI Extracted Filters:", filters);

    // ---------------------------------------------------------
    // STEP 2: JAVASCRIPT PERFORMS THE SEARCH (100% ACCURATE)
    // ---------------------------------------------------------
    let results = POSITIONS_DATA.filter(item => {
      let match = true;
      
      // Fuzzy match client (e.g. "Google" matches "Google, Inc.")
      if (filters.client && !item.client.toLowerCase().includes(filters.client.toLowerCase())) match = false;
      
      // Fuzzy match role
      if (filters.role && !item.role.toLowerCase().includes(filters.role.toLowerCase())) match = false;
      
      // Fuzzy match status
      if (filters.status && !item.status.toLowerCase().includes(filters.status.toLowerCase())) match = false;

      // Fuzzy match priority
      if (filters.priority && !item.priority.toLowerCase().includes(filters.priority.toLowerCase())) match = false;
      
      return match;
    });

    // ---------------------------------------------------------
    // STEP 3: FORMAT THE RESPONSE
    // ---------------------------------------------------------
    let responseText = "";

    if (results.length === 0) {
      responseText = "No records found matching your criteria.";
    } else {
      // Create a super concise list
      const list = results.map(r => `• ${r.role} @ ${r.client} (${r.status})`).join("\n");
      
      // Add a header
      responseText = `Found ${results.length} matches:\n\n${list}`;
      
      // Hard limit to 50 words approx (or just truncate list)
      if (results.length > 10) {
         responseText += `\n\n...and ${results.length - 10} more.`;
      }
    }

    // Send simple text back to frontend
    res.setHeader('Content-Type', 'text/plain');
    res.write(responseText);
    res.end();
    
  } catch (error) {
    console.error("Agent Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Agent (Router Mode) running on http://localhost:${PORT}`);
});