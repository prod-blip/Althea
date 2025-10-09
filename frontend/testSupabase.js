import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: './.env' })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function testConnection() {
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    console.log('Skipping test: URL or key missing')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ name: 'AjayS', email: 'ajay.surti2@gmail.com' }])
    .select()

  if (error) console.error('❌ Supabase insert error:', error.message)
  else console.log('✅ Data inserted:', data)
}

testConnection()
