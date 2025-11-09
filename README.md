Just trying to understand mcp stuff!!

## Setup

Structured as a monorepo

- `server/` - MCP server
- `client/` - MCP client


```bash
pnpm install # Install dependencies
pnpm run build # Build all packages (generates dist/ folders)
```

### Hooking up to a client (vscode copilot)

1. I'm choosing vscode copilot as the client to hook up to our mcp server
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

### Playaround with inspector

(Even though there is not a lot to play around with lol)

```bash
pnpm run inspector
```

### Running the Mcp Client

(An ultra-inferior copilot)

```bash
pnpm run client
```
