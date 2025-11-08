import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { registerTools } from "./tools"
import { logger } from "../config/logger"

const transport = new StdioServerTransport()
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
    }
)

export async function startServer() {
    logger.info("Starting MCP Server...")
    registerTools(mcpServer)
    await mcpServer.connect(transport)
    logger.info("MCP Server started.")
}
