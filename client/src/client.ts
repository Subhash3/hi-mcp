import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import inquirer from "inquirer";
import { LLM } from "./llm";
import { logger } from "./config/logger";

const choices = ["Query", "List Tools", "Pick a tool", "Exit"] as const;
type Choice = (typeof choices)[number];

export class MyMcpClient {
  private client: Client;
  private transport: Transport;
  private tools: Tool[] = [];
  private llm: LLM;

  constructor() {
    this.client = new Client({
      name: "nice-mcp-client",
      version: "1.0.0",
    });

    this.transport = new StdioClientTransport({
      command: "node",
      args: ["../server/dist/index.js"],
    });

    this.llm = new LLM();
  }

  public async start() {
    await this.setup();
    await this.loop();
    await this.end();
  }

  private async setup() {
    logger.info("Starting MCP Client...");
    await this.client.connect(this.transport);
    logger.info("MCP Client connected.");
  }

  private async end() {
    await this.client.close();
    logger.info("Bye!");
  }

  private async loop() {
    while (true) {
      const choice = await this.input();

      switch (choice) {
        case "Query":
          await this.query();
          break;
        case "List Tools":
          await this.listTools();
          break;
        case "Pick a tool":
          await this.pickTool();
          break;
        case "Exit":
          return;
      }
    }
  }

  private async input(): Promise<Choice> {
    const { choice } = await inquirer.prompt<{ choice: Choice }>([
      {
        name: "choice",
        message: "Choose an option:",
        type: "list",
        choices: choices,
      },
    ]);

    return choice;
  }

  private async query() {
    const { response } = await inquirer.prompt<{ response: string }>([
      {
        name: "response",
        message: "Enter your query:",
        type: "input",
      },
    ]);

    const llmResponse = await this.llm.query(response);

    logger.info("LLM Response:" + llmResponse);
  }

  private async listTools() {
    logger.info("Fetching available tools from the server...");
    const toolsResult = await this.client.listTools();
    this.tools = toolsResult.tools;
    this.tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      };
    });

    logger.info("Available tools: " + this.tools.map(({ name }) => name));
  }

  private async pickTool() {
    if (!this.tools || this.tools.length === 0) {
      await this.listTools();
    }

    const toolNames = this.tools.map((tool) => tool.name);
    const { toolName } = await inquirer.prompt<{ toolName: string }>([
      {
        name: "toolName",
        message: "Select a tool:",
        type: "list",
        choices: toolNames,
      },
    ]);

    const selectedTool = this.tools.find((tool) => tool.name === toolName);

    // This can be expanded to do something with the selected tool
    if (!selectedTool) {
      logger.warn("Tool not found.");
      return;
    }
    logger.info(`Using tool: '${selectedTool.name}'`);
  }
}
