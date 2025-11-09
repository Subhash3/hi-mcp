Just trying to understand mcp stuff!!

## Setup

Structured as a monorepo

- `server/` - MCP server
- `client/` - MCP client
- `agents/` - AI Agent


```bash
pnpm install # Install dependencies
pnpm run build # Build all packages (generates dist/ folders)
```

## Hooking up to a client

### Play around with inspector (MCP server)

(Even though there is not a lot to play around with)

```bash
pnpm run inspector
```

### Hookup to VSCode Copilot

> You may choose any other MCP client, but copilot is the only one I have tried.

1. Open a vscode instance 
2. Click on configure tools icon
3. Click on 'Add MCP server' icon
4. Choose 'Command (stdio)' option as that is the transport used by this project
5. Our command would be `node <path/to/hi-mcp/server/dist/index.js>`
6. It'll generate a config like this:

```json
{
	"servers": {
		"nice-mcp-server": {
			"type": "stdio",
			"command": "node",
			"args": [
				"~/Projects/hi-mcp/server/dist/index.js"
			]
		}
	},
	"inputs": []
}
```
7. Now use `#sayHi` command in copilot chat to verify

### Custom agent

> (An ultra-inferior copilot)

```bash
pnpm run agent
```

- connects to the mcp server using the `client` package
- uses google's `gemini-2.5-flash` model to respond to messages

