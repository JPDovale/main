import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect().then(() => {
  console.log('Database connected')
})

export { prisma }
