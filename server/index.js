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

const model = new ChatOllama({
  baseUrl: "http://127.0.0.1:11434",
  model: "llama3.2",
  temperature: 0,
  format: "json", 
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log("------------------------------------------------");
  console.log("1. User Question:", message);

  try {
    // ---------------------------------------------------------
    // STEP 1: SMARTER EXTRACTION PROMPT
    // ---------------------------------------------------------
    const parserPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a Keyword Extractor.
      
      GOAL: Extract clean keywords for database filtering.
      
      RULES:
      1. IGNORE filler words like: "show me", "list", "get", "jobs", "roles", "positions", "openings", "available".
      2. Extract ONLY the specific entity names (e.g., "Google", "Java", "Senior").
      3. Return NULL if a category is not mentioned.
      
      OUTPUT JSON FORMAT:
      {{
        "client": "string or null",
        "role": "string or null",
        "status": "string or null",
        "priority": "string or null",
        "location": "string or null",
        "deliveryUnit": "string or null"
      }}
      
      EXAMPLES:
      - "Show me Google positions" -> {{ "client": "Google", ...nulls }} (Removed 'positions')
      - "Java developer roles in India" -> {{ "role": "Java", "location": "India", ...nulls }}
      - "TMT open jobs" -> {{ "deliveryUnit": "TMT", ...nulls }}
      `],
      ["human", "{question}"],
    ]);

    const chain = parserPrompt.pipe(model).pipe(new StringOutputParser());
    
    // Get the JSON filter from AI
    const filterJsonStr = await chain.invoke({ question: message });
    let filters = {};
    
    try {
        filters = JSON.parse(filterJsonStr);
    } catch (e) {
        console.error("JSON Parse failed, attempting fallback");
    }
    
    console.log("2. AI Cleaned Filters:", filters);

    // ---------------------------------------------------------
    // STEP 2: SEARCH LOGIC (Added DeliveryUnit & Location)
    // ---------------------------------------------------------
    let results = POSITIONS_DATA.filter(item => {
      let match = true;
      
      // Helper to safely check text
      const check = (dataField, filterVal) => {
          if (!filterVal) return true; // No filter = pass
          if (!dataField) return false; // Data missing = fail
          return dataField.toLowerCase().includes(filterVal.toLowerCase());
      };

      // Apply Filters
      if (!check(item.client, filters.client)) match = false;
      if (!check(item.role, filters.role)) match = false;
      if (!check(item.status, filters.status)) match = false;
      if (!check(item.priority, filters.priority)) match = false;
      if (!check(item.location, filters.location)) match = false;
      if (!check(item.deliveryUnit, filters.deliveryUnit)) match = false;

      return match;
    });

    console.log(`3. Found ${results.length} matches`);

    // ---------------------------------------------------------
    // STEP 3: FORMAT THE RESPONSE
    // ---------------------------------------------------------
    let responseText = "";

    if (results.length === 0) {
      responseText = "No records found matching your criteria.";
    } else {
      const list = results.map(r => `• ${r.role} @ ${r.client} (${r.status})`).join("\n");
      responseText = `Found ${results.length} matches:\n\n${list}`;
      
      // Strict Word Limit Logic
      if (results.length > 10) {
         responseText += `\n\n...and ${results.length - 10} more.`;
      }
    }

    res.setHeader('Content-Type', 'text/plain');
    res.write(responseText);
    res.end();
    
  } catch (error) {
    console.error("Agent Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Agent running on http://localhost:${PORT}`);
});