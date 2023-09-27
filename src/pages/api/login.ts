import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;
type ResponseData = {
  message?: string,
  token?: string,
  user?: {
    id: string;
    email: string;
    name: string | null;
    games: string[];
    rankId: number;
    notificationsId: number | null;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method != 'POST') {
    res.status(405).json({ message: 'Invalid Method.' })
    return;
  }
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(204).json({ message: 'No Content.' })
    return;
  }
  if (!email || !password) {
    res.status(206).json({ message: 'Partial Content.' })
    return;
  }
  query(email, password).then(async (response) => {
    await prisma.$disconnect()
    if (!response || !response.status || !response.token) {
      res.status(500).json({ message: 'Internal Server Error.' });
      return;
    }
    if (response.message) {
      res.status(response.status).json({ message: response.message });
    }
    res.status(response.status).json({ user: response.user, token: response.token });
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    })
}

interface ILoginResponse {
  status?: number;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string | null;
    games: string[];
    rankId: number;
    notificationsId: number | null;
  }
}

async function query(email: string, password: string) {
  let response: ILoginResponse = {};
  const existUser = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existUser) {
    const valid = await bcrypt.compare(password, existUser.password);
    if (!valid) {
      response.status = 401;
      response.message = "Password is incorrect or invalid.";
    } else {
      if (typeof SECRET != "string") {
        return;
      }
      const { password, ...userWithoutPassword } = existUser;
      const token = await jwt.sign({
        data: userWithoutPassword
      }, SECRET, { expiresIn: '1h' });
      response.status = 200;
      response.user = userWithoutPassword;
      response.token = token;
    }
    return response;
  }
}