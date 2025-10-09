import { assertEquals } from "https://deno.land/std@0.201.0/testing/asserts.ts";
import { handler } from "../functions/mcp-server/index.ts";

Deno.test("mcp-server health returns 200 even without env", async () => {
  // Delete envs if present
  try { Deno.env.delete("SUPABASE_URL") } catch {}
  try { Deno.env.delete("SUPABASE_SERVICE_KEY") } catch {}

  const req = new Request("http://localhost/health", { method: "GET" });
  const res = await handler(req);
  const json = await res.json();
  assertEquals(res.status, 200);
  assertEquals(json.ok, true);
});
