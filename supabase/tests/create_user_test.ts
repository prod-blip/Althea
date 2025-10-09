import { assertEquals } from "https://deno.land/std@0.201.0/testing/asserts.ts";
import { handler } from "../functions/create-user/index.ts";

Deno.test("create-user returns 500 when env missing", async () => {
  // Ensure envs are unset for this test
  try { Deno.env.delete("SUPABASE_URL") } catch {}
  try { Deno.env.delete("SUPABASE_SERVICE_KEY") } catch {}

  const req = new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "a@b.com", password: "x" }) });
  const res = await handler(req);
  assertEquals(res.status, 500);
});
