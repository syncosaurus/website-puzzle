# Syncosaurus Puzzle Demo

This application is the puzzle demo for the Syncosaurus homepage.

# Getting Started

## Setting up your environment
Add a `.env` file to the root directory, containing a single parameter `VITE_DO_URL`. This URL must point to an active Syncosaurus server, either deployed to Cloudflare or running in a local dev environment.

The URL will _likely_ be one of two options:

1. `ws://localhost:8787` if running a local dev server using the CLI on the default port
2. `wss://project-name.your-account.workers.dev` if pointing to a live Syncosaurus server

## Developing locally
If running both the client app and server locally, use the Syncosaurus CLI to spin up both frontend and backend dev servers.

If the Syncosaurus server is deployed to Cloudflare, simply use `npm run dev` to spin up the Vite dev server.
