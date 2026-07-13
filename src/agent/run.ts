import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { getTracer, Laminar } from "@lmnr-ai/lmnr";

import { tools } from "./tools/index.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";

const MODEL_NAME = "gpt-5-mini";

Laminar.initialize({
  projectApiKey: process.env.LMNR_PROJECT_API_KEY,
});

export const runAgent = async (
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks,
) => {
  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools,
    experimental_telemetry: {
      isEnabled: true,
      tracer: getTracer(),
    },
  });

  console.log("done");
};
