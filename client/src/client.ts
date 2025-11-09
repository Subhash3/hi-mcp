import { Client } from "@modelcontextprotocol/sdk/client"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js"
import { Tool } from "@modelcontextprotocol/sdk/types.js"
import { LLM } from "./llm"
import { logger } from "./config/logger"

export class MyMcpClient {
    private client: Client
    private transport: Transport
    private initialized: boolean = false

    constructor() {
        this.client = new Client({
            name: "nice-mcp-client",
            version: "1.0.0",
        })

        this.transport = new StdioClientTransport({
            command: "node",
            args: ["../server/dist/index.js"],
        })
    }

    public async start() {
        logger.info("Starting MCP Client...")
        try {
            await this.client.connect(this.transport)
        } catch (error) {
            logger.error("Failed to connect to MCP Server:" + error)
            return
        }
        logger.info("MCP Client connected.")
        this.initialized = true
    }

    public async end() {
        await this.client.close()
        logger.info("Bye!")
    }

    public async listTools(): Promise<Tool[]> {
        if (!this.initialized) {
            logger.error(
                "Client not initialized. Call start() before using the client."
            )
            return []
        }
        logger.info("Listing tools from MCP Server...")
        const toolsResult = await this.client.listTools()
        const tools = toolsResult.tools
        return tools
    }
}
