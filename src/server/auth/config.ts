import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import { createCaller } from "../api/root";

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
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
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
            return {
              id: result.data.user.id,
              email: result.data.user.email,
              name: result.data.user.name,
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
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
