import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

function getDbUrl(): string {
  // If DATABASE_URL is explicitly set, use it
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL

  // On Vercel (or any serverless), copy the bundled SQLite DB to /tmp so it's writable
  const srcDb = path.join(process.cwd(), 'prisma', 'dev.db')
  const tmpDb = '/tmp/dev.db'

  if (fs.existsSync(srcDb)) {
    // Only copy if not already in /tmp or source is newer
    if (!fs.existsSync(tmpDb)) {
      fs.copyFileSync(srcDb, tmpDb)
    }
    return `file:${tmpDb}`
  }

  // Fallback for local dev
  return 'file:./prisma/dev.db'
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: getDbUrl(),
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
