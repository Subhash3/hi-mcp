import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { registerSayHiTool } from "./say-hi"

export const registerTools = (server: McpServer) => {
    registerSayHiTool(server)
}
