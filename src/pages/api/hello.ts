import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  async function query() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
  }
  query().then(async () => {
    await prisma.$disconnect()
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    })
  res.status(200).json({ message: 'Hello from Next.js!' })
}
