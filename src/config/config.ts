import 'dotenv/config.js'

const NODE_ENV = process.env.NODE_ENV ?? 'production'
const PORT: string = process.env.PORT ?? '5001'
const SESSION_SECRET: string = process.env.SESSION_SECRET ?? 'valenoirs'
const SESSION_COLLECTION_NAME: string =
  process.env.SESSION_COLLECTION_NAME ?? 'session'
const SESSION_LIFETIME: number = 1000 * 60 * 60 * 24 // a day

const config = {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  SESSION_COLLECTION_NAME,
  SESSION_LIFETIME,
}

export default config
