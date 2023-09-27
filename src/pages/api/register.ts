import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method != 'POST') {
    res.status(405).json({ message: 'Invalid Method.' })
    return;
  }
  const { email, password, name } = req.body;
  if (!email && !password && !name) {
    res.status(204).json({ message: 'No Content.' })
    return;
  }
  if (!email || !password || !name) {
    res.status(206).json({ message: 'Partial Content.' })
    return;
  }
  query(email, password, name).then(async (response) => {
    await prisma.$disconnect()
    if (!response || !response.status || !response.message) {
      res.status(500).json({ message: 'Internal Server Error.' });
      return;
    }
    res.status(response.status).json({ message: response.message });
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    })
}


function sanitizeString(str: string): string {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}

interface IRegisterResponse {
  status?: number;
  message?: string;
}

async function query(email: string, password: string, name: string) {
  let response: IRegisterResponse = {};
  const existUser = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existUser) {
    response.status = 200;
    response.message = 'User already exists.';
    return response;
  }
  const cryptPass = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: cryptPass,
      rank: { connect: { id: 1 } }
    }
  })
  if (newUser) {
    response.status = 201;
    response.message = 'Success.';
    return response;
  }
  return null;
}