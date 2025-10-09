# Supabase Edge Function (mcp-server)

This folder contains a simple Supabase Edge Function scaffold (`mcp-server`) that will act as an MCP server. It reads `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` from environment variables (or Supabase secrets) and exposes two routes:

- `GET /health` — returns a JSON health check.
- `POST /mcp` — echoes back the posted JSON and attempts to insert it into a `mcp_events` table if present.

Files added

- `supabase/functions/mcp-server/index.ts` — Deno/TypeScript edge function entrypoint.
- `.env.example` — example env file you can copy to `.env` for local testing.

Quick setup and deploy (PowerShell on Windows)

1. Install and login with the Supabase CLI (if not already):

```powershell
# install via npm if you don't have it
npm install -g supabase

# login (opens browser)
supabase login
```

2. Link the local project to your Supabase project (replace with your project ref from the dashboard):

```powershell
supabase link --project-ref your-project-ref
```

3. Set secrets in Supabase (recommended for production). Replace the placeholders with the real values when available:

```powershell
supabase secrets set SUPABASE_SERVICE_KEY="your_service_role_key" SUPABASE_URL="https://your-project-ref.supabase.co"
```

4. Deploy the edge function:

```powershell
supabase functions deploy mcp-server --project-ref your-project-ref
```

5. Test the function locally (optional) — this will read from a local `.env` file if present:

```powershell
# copy example to .env for local testing
copy .env.example .env

# serve locally (binds to localhost)
supabase functions serve mcp-server --env-file .env
```

Notes
- When deploying, prefer storing the service role key as a secret and not in source control.
- The `mcp.json` at the repository root already contains a `supabase-mcp` entry. Make sure the `url` field in `mcp.json` matches your Supabase project URL.

Combined local dev and testing

From the repo root you can run both the frontend and the local Supabase function concurrently (requires `supabase` CLI installed):

```powershell
# install root dev deps (concurrently)
npm install

# start frontend and supabase functions serve together
npm run dev
```

After `npm run dev` is running, open a new terminal and run the test script to verify the function is reachable:

```powershell
# install node deps needed by the test script (node-fetch)
npm install node-fetch@2

# run the test script
node scripts/test-supabase.js
```

Create a user using the service role (admin) Edge Function

1. Serve the create-user function locally (it will use `.env` or Supabase secrets):

```powershell
# copy .env.example to .env and ensure SUPABASE_URL and SUPABASE_SERVICE_KEY are set
copy .env.example .env

# serve functions (this serves all functions in supabase/functions)
supabase functions serve --env-file .env
```

2. Call the function using the helper script (node):

```powershell
# install node deps for the scripts (only needed once)
npm install node-fetch@2

# create user: email password name
node scripts/create-user.js ajay.surti2@gmail.com TestPassw0rd! AjayS
```

3. Alternatively, curl:

```powershell
curl -X POST http://localhost:54321/functions/v1/create-user -H "Content-Type: application/json" -d '{"email":"ajay.surti2@gmail.com","password":"TestPassw0rd!","name":"AjayS"}'
```


