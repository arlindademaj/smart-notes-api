import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiProcess = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: "Note content is required",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `You are a smart learning assistant. The user just wrote a note. 

     Analyze the note and return the following in JSON format **ONLY** (no explanations):

      "summary": a short summary of the note.
      "key_points": an array of 3 concise bullet points that capture the most important ideas.
      "next_topics": an array of 3 suggestions or actions the user could do next to improve, learn more, or do better based on the note.
      "tags": an array of 3-5 relevant tags or keywords for the note.

        Return **valid JSON only**.  
        Here is the note: 
${content}
      `,
    });

    const aiOutput = response.output_text;
    const parsed = JSON.parse(aiOutput);

    res.status(200).json(parsed);
  } catch (error) {
    res.status(500).json({ error: "Ai failed" });
  }
};
