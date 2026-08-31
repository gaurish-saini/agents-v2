import { tool } from "ai";
import { z } from "zod";
import fs from "node:fs/promises";
import nodePath from "node:path";

export const readFile = tool({
  description:
    "Rad the full contents of a file at the given path, always use this to read a file",
  inputSchema: z.object({
    path: z.string().describe("The path to the file to read"),
  }),
  execute: async ({ path }) => {
    try {
      const content = await fs.readFile(path, "utf-8");
      return content;
    } catch (e) {
      return `There was an error reading this file, here is the native error from node.js: ${e}`;
    }
  },
});

export const writeFile = tool({
  description:
    "Write content to a file at a specified given path. Create the file if it does not exist, overwrite if it does.",
  inputSchema: z.object({
    path: z.string().describe("TThe path to the file to write to"),
    content: z.string().describe("The content to write to the file"),
  }),
  execute: async ({ path, content }) => {
    try {
      const dir = nodePath.dirname(path);
      await fs.mkdir(dir, { recursive: true });

      await fs.writeFile(path, content, "utf-8");
      return `Successfully wrote ${content.length} characters to ${path}`;
    } catch (e) {
      return `Was not able to write to that file at that path, here is the node.js error: ${e}`;
    }
  },
});
