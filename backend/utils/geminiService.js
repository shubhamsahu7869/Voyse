const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function cleanJSON(text) {
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export async function askGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) return null;
  const response = await fetch(`${endpoint}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  if (!response.ok) throw new Error("Gemini request failed");
  const json = await response.json();
  return cleanJSON(json.candidates[0].content.parts[0].text);
}
