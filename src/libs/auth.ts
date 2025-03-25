import jwt, { SignOptions, type JwtPayload } from 'jsonwebtoken';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '1h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS,
) {
  const secretKey = process.env.NEXTAUTH_SECRET!;
  const token = jwt.sign(payload, secretKey, options);

  return token;
}

export function verify(token: string) {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET!;
    const decoded = jwt.verify(token, secretKey);

    return decoded as JwtPayload;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        password: {
          label: '비밀번호',
          type: 'password',
        },
      },
      async authorize(credentials, _) {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: credentials?.password,
            }),
          },
        );

        const user = await response.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
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
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
