import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), { status: 405 });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_KEY") ?? "";

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY" }), { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });

  try {
    const body = await req.json();
    const email = body.email;
    const password = body.password;
    const name = body.name || null;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'email and password are required' }), { status: 400 });
    }

    // create user as admin
    const { user, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    } as any);

    if (createErr) {
      return new Response(JSON.stringify({ error: createErr.message }), { status: 400 });
    }

    // insert profile row into users table, linking by id if you have that column
    let profile = null;
    try {
      const { data, error: insertErr } = await supabase.from('users').insert([{ id: user.id, name, email }]);
      if (!insertErr) profile = data;
    } catch (e) {
      // ignore profile insert errors
    }

    return new Response(JSON.stringify({ user, profile }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}

// runtime entrypoint
if (import.meta.main) {
  serve(handler);
}
