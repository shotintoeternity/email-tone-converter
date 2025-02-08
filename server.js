const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure you're using node-fetch v2
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // Adjust as needed

app.post('/api/convert', async (req, res) => {
  try {
    const { emailText, tone } = req.body;
    if (!emailText || !tone) {
      return res.status(400).json({ error: 'Missing emailText or tone' });
    }

    // Updated prompt instructs to generate a complete email
    // and to use generic placeholders rather than specific names or contact details.
    const prompt = `Rewrite the following email idea into a complete email that includes a subject line, greeting, body, and closing signature.
Use a ${tone} tone.
Return ONLY the complete email text with no extra commentary.
Do not invent or use any specific personal details—if a name is required, use "[Your Name]" and if contact details are required, use generic placeholders.

Email idea:
${emailText}`;

    const payload = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert email writer. When given an email idea, generate a complete email with a subject line, greeting, body, and closing signature in the requested tone. Do not include any specific personal details; instead, use generic placeholders such as '[Your Name]'. Output ONLY the email content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,  // Increased token limit for a longer email
      top_p: 1,
      n: 1,
      stream: false
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log("Full API response:", JSON.stringify(data, null, 2));

    const convertedEmail = data.choices?.[0]?.message?.content?.trim();
    if (!convertedEmail) {
      console.error("Unexpected API response structure:", data);
      return res.status(500).json({ error: "No conversion result received from API." });
    }

    res.json({ convertedEmail });
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
