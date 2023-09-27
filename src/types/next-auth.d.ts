import "next-auth";

declare module "next-auth" {

  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }
  interface User {
    user: {
      id: string;
      email: string;
      name: string | null;
      games: string[];
      rankId: number;
      notificationsId: number | null;
    }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}