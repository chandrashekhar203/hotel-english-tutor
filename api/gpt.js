// /api/gpt.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { text } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly English teacher for hotel staff. If the English is correct, say "✅ Correct!" If not, explain what was wrong and suggest a corrected sentence.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    console.log("GPT response:", completion.data.choices[0].message.content);
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
