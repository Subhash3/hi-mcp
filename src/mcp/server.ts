import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  HiService,
  sayHiInputSchema,
  sayHiOutputSchema,
} from "../services/hi-service";
import { registerTools } from "./tools";

const transport = new StdioServerTransport();
export const mcpServer = new McpServer(
  {
    name: "Nice MCP Server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resouces: {},
      prompts: {},
    },
  },
);

export async function startServer() {
  registerTools(mcpServer);
  await mcpServer.connect(transport);
}
