import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "@/schema/auth";
import { compare, hash } from "bcryptjs";
import { randomUUID } from "crypto";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(registerSchema)
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input;

            // 创建头像
            const avatar = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${randomUUID()}`

            // 检查邮箱是否已存在
            const existingUser = await ctx.db.query.users.findFirst({
                where: eq(users.email, email),
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "该邮箱已被注册",
                });
            }

            // 密码加密
            const hashedPassword = await hash(password, 10);

            // 创建用户
            await ctx.db.insert(users).values({
                name,
                email,
                password: hashedPassword,
                image: avatar,
                nickname: name,
                pronouns: "they/them",
            });

            return {
                success: true,
                message: "注册成功",
            };
        }),

    verifyCredentials: publicProcedure
        .input(loginSchema)
        .query(async ({ ctx, input }) => {
            const { email, password } = input;

            // 查找用户
            const user = await ctx.db.query.users.findFirst({
                where: eq(users.email, email),
            });

            if (!user?.password) {
                
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "邮箱或密码错误",
                });
            }

            // 验证密码
            const isPasswordValid = await compare(password, user.password);

            if (!isPasswordValid) {
                
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "邮箱或密码错误",
                });
            }

            return {
                success: true,
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        nickname: user.nickname,
                        pronouns: user.pronouns,
                    },
                },
            };
        }),
});