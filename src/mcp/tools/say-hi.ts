import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  HiService,
  sayHiInputSchema,
  sayHiOutputSchema,
} from "../../services/hi-service";

const hiService = new HiService();

export function registerSayHiTool(mcpServer: McpServer) {
  mcpServer.registerTool(
    "sayHi",
    {
      title: "Say Hi",
      description: "A tool that greets a person by name.",
      inputSchema: sayHiInputSchema,
      outputSchema: sayHiOutputSchema,
      annotations: {
        title: "Greeting Tool",
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
        readOnlyHint: true,
      },
    },
    async ({ name }) => {
      const out = hiService.sayHi(name);
      return {
        content: [
          {
            type: "text",
            text: out,
          },
        ],
        structuredContent: {
          greeting: out,
        },
      };
    },
  );
}
