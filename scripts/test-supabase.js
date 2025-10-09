// Simple test script to probe the local Supabase Edge Function
// Usage: node scripts/test-supabase.js

import fetch from 'node-fetch';

const base = 'http://localhost:54321/functions/v1/mcp-server';

async function health() {
  const res = await fetch(`${base}/health`);
  const json = await res.json().catch(() => null);
  console.log('/health', res.status, json ?? await res.text());
}

async function postMcp() {
  const res = await fetch(`${base}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'hello from test script', ts: Date.now() })
  });
  const json = await res.json().catch(() => null);
  console.log('/mcp', res.status, json ?? await res.text());
}

async function run() {
  try {
    await health();
    await postMcp();
  } catch (err) {
    console.error('Error connecting to local Supabase function:', err.message || err);
    process.exitCode = 1;
  }
}

run();
