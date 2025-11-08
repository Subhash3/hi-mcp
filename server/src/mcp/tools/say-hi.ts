import z from "zod"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { HiService } from "../../services/hi-service"

const hiService = new HiService()

const sayHiInputSchema = {
    name: z.string().describe("The name of the person to greet"),
}

const sayHiOutputSchema = {
    greeting: z.string().describe("The greeting message"),
}

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
            const out = hiService.sayHi(name)
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
            }
        }
    )
}
