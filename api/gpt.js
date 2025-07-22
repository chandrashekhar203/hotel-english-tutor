export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: text }],
    }),
  });

  const data = await response.json();

  if (data.choices && data.choices[0]) {
    res.status(200).json({ reply: data.choices[0].message.content });
  } else {
    res.status(500).json({ error: "Failed to generate response", details: data });
  }
}
