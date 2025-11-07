import { generateText, LanguageModel } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export class LLM {
  private model: LanguageModel;

  constructor() {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });
    this.model = google("gemini-2.5-flash");
  }

  async query(prompt: string): Promise<string> {
    console.log("Generating text with Gemini 2.5 Flash model...");
    const { text } = await generateText({
      model: this.model,
      prompt: prompt,
    });

    return text;
  }
}
