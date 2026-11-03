import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@notes.app' },
    update: {},
    create: { email: 'demo@notes.app', password },
  })

  await prisma.note.upsert({
    where: { id: 'seed-note' },
    update: {},
    create: { id: 'seed-note', title: 'Welcome note', content: 'Start writing your notes here.', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
