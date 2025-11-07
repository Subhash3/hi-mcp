Just trying to understand mcp stuff!!

## Monorepo Structure

This project is organized as a monorepo with:
- `server/` - MCP server implementation
- `client/` - MCP client implementation

## Setup

```bash
pnpm install # Install dependencies for all packages
pnpm run build # Build all packages (generates dist/ folders)
pnpm run start:inspector # Start mcp inspector
pnpm run start # Starts the server with the built files
```

### Hooking up to copilot

1. Open a vscode instance (as we usually have the extension installed there)
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
