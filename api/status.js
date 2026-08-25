export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  return res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    aiProviders: {
      groq: {
        configured: hasGroq,
        model: 'llama-3.3-70b-versatile'
      },
      gemini: {
        configured: hasGemini,
        model: 'gemini-1.5-flash'
      }
    }
  });
}
