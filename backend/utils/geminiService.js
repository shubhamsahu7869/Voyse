const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

function cleanJSON(text) {
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export async function askGemini(prompt, inlineFiles = []) {
  if (!process.env.GEMINI_API_KEY) return null;
  const response = await fetch(`${endpoint}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          ...inlineFiles.map(file => ({
            inline_data: { mime_type: file.mimetype, data: file.data }
          })),
          { text: prompt }
        ]
      }]
    })
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${details}`);
  }
  const json = await response.json();
  return cleanJSON(json.candidates[0].content.parts[0].text);
}
