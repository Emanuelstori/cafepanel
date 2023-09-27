
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    pages: {
      signIn: '/',
      signOut: '/',
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {},
          password: {}
        },
        async authorize(credentials, req) {
          console.log("caiu aqui")
          const response = await fetch('http://localhost:3000/api/login', {
            body: JSON.stringify({
              "email": credentials?.email,
              "password": credentials?.password
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST'
          });
          const data = await response.json();
          if (data) {
            return data;
          }
          return Promise.reject(new Error(data?.message));
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },

      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
  });
}