import { sessions } from './../db/schema';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/server/db";
import {
  accounts,
  users,
  verificationTokens,
} from "@/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import { createCaller } from "../api/root";
import { AdapterUser } from 'next-auth/adapters';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      nickname: string;
      pronouns: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | undefined;
    email?: string | undefined | null;
    name?: string | undefined | null;
    image?: string | undefined | null;
    nickname?: string | undefined | null;
    pronouns?: string | undefined | null;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          console.log("缺少凭证");
          return null;
        }

        try {
          // 添加调试日志
          console.log("尝试验证凭证:", credentials.email);
          const caller = createCaller({
            db,
            headers: new Headers(),
            session: null,
          });
          const result = await caller.auth.verifyCredentials({
            email: credentials.email as string,
            password: credentials.password as string
          })

          console.log("验证结果:", result);

          if (result.success && result.data) {
            console.log('result.data',result.data);
            
            return {
              id: result.data.user.id,
              email: result.data.user.email,
              name: result.data.user.name,
              image: result.data.user.image,
              nickname: result.data.user.nickname,
              pronouns: result.data.user.pronouns,
            };
          }

          console.log("验证失败，返回 null");
          return null;
        } catch (error) {
          console.error("认证错误:", error);
          return null;
        }
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    jwt: ({ token, user }) => {  
      console.log('user',user);
      console.log('token',token);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.nickname = user.nickname;
        token.pronouns = user.pronouns;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log('session',session);
      console.log('token',token);
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          image: token.image as string,
          nickname: token.nickname as string,
          pronouns: token.pronouns as string,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;
