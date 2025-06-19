import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const { prompt } = await req.json();

  const apiKey = "AIzaSyAmHT9fFnrNHKVgAZ50ytG-8Z7wEOv9OP0"; // Replace this

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const geminiData = await geminiRes.json();
  const result = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No result.";

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
