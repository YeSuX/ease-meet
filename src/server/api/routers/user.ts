import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    getUser: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: eq(users.id, input.id),
            });

            return user;
        }),
    updateUser: publicProcedure
        .input(z.object({ id: z.string(), nickname: z.string(), email: z.string(), pronouns: z.enum(["dont_specify", "they/them", "she/her", "he/him", "custom"]) }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.update(users).set({
                nickname: input.nickname,
                email: input.email,
                pronouns: input.pronouns,
            }).where(eq(users.id, input.id));

            return user;
        }),
});

