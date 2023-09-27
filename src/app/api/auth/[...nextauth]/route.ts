import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  pages: {
    signIn: '/dashboard',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
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

export { handler as GET, handler as POST };

