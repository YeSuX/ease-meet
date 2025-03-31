import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { availability } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const availabilityRouter = createTRPCRouter({
    getAvailability: publicProcedure.input(z.object({
        userId: z.string(),
    })).query(async ({ ctx, input }) => {
        const availabilityRecords = await ctx.db.query.availability.findMany({
            where: eq(availability.userId, input.userId),
        });

        return availabilityRecords.map(item => ({
            id: item.id,
            isActive: item.isActive,
            fromTime: item.fromTime,
            toTime: item.toTime,
            day: item.day
        }));
    }),
    updateAvailability: publicProcedure.input(z.object({
        fromTime: z.string(),
        toTime: z.string(),
        isActive: z.boolean(),
        id: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const availabilityRecord = await ctx.db.update(availability).set({
            fromTime: input.fromTime,
            toTime: input.toTime,
            isActive: input.isActive,
        }).where(eq(availability.id, input.id));

        return availabilityRecord;
    }),
});

export default availabilityRouter;