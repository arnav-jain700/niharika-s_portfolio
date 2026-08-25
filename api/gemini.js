export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt, temperature = 0.7, max_tokens = 1024, model = 'llama-3.3-70b-versatile' } = req.body || {};
    const groqKey = process.env.GROQ_API_KEY || req.headers.authorization?.replace('Bearer ', '');
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Try Groq Llama 3.3 70B
    if (groqKey && groqKey !== 'null' && groqKey !== 'undefined') {
      const groqMessages = [];
      if (systemPrompt) {
        groqMessages.push({ role: 'system', content: systemPrompt });
      }
      if (Array.isArray(messages)) {
        groqMessages.push(...messages);
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature,
          max_tokens
        })
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      } else {
        const errorText = await response.text();
        console.warn('Groq upstream error:', errorText);
      }
    }

    // 2. Fallback to Gemini if configured
    if (geminiKey) {
      const userPrompt = Array.isArray(messages) ? messages[messages.length - 1]?.content : 'Hello';
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${userPrompt}` : userPrompt;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature, maxOutputTokens: max_tokens }
        })
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return res.status(200).json({
          choices: [{
            message: { role: 'assistant', content: text }
          }],
          model: 'gemini-1.5-flash'
        });
      }
    }

    return res.status(400).json({
      error: 'No active AI key found on server. Please configure Groq API Key in the Admin Console or Vercel environment variables.'
    });

  } catch (err) {
    console.error('Serverless AI error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
