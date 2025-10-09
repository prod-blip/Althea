// Usage: node scripts/create-user.js email password name
import fetch from 'node-fetch'

const [,, email, password, name] = process.argv
if (!email || !password) {
  console.error('Usage: node scripts/create-user.js <email> <password> [name]')
  process.exit(1)
}

const base = 'http://localhost:54321/functions/v1/create-user'

async function run() {
  try {
    const res = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
    const txt = await res.text()
    console.log(res.status, txt)
  } catch (err) {
    console.error('Request failed:', err.message || err)
  }
}

run()
