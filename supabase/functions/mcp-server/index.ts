import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY") ?? "";

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // Allow a health check even if env not configured
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, env: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      error: "SUPABASE_URL or SUPABASE_SERVICE_KEY not set",
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // Health check
  if (url.pathname === "/health") {
    return new Response(JSON.stringify({ ok: true, env: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Example MCP-like endpoint: accept POST JSON and echo back and optionally insert to a table
  if (url.pathname === "/mcp" && req.method === "POST") {
    try {
      const body = await req.json();

      // Example: insert into 'mcp_events' table if it exists. This is optional and will fail silently.
      try {
        await supabase.from("mcp_events").insert(body);
      } catch (err) {
        // ignore insert errors to keep function resilient during initial setup
        console.warn("Supabase insert failed:", err);
      }

      return new Response(JSON.stringify({ received: body }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ message: "Supabase MCP Edge Function" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// runtime entrypoint
if (import.meta.main) {
  serve(handler);
}
