import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { availability } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

const availabilityRouter = createTRPCRouter({
    getAvailability: publicProcedure.input(z.object({
        userId: z.string(),
    })).query(async ({ ctx, input }) => {
        const availabilityRecords = await ctx.db.query.availability.findMany({
            where: eq(availability.userId, input.userId),
            orderBy: (availability, { asc }) => [asc(availability.id)],
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
        userId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const availabilityRecord = await ctx.db.update(availability).set({
            fromTime: input.fromTime,
            toTime: input.toTime,
            isActive: input.isActive,
        }).where(and(eq(availability.id, input.id), eq(availability.userId, input.userId)));

        return availabilityRecord;
    }),
    updateAvailabilityBatch: publicProcedure.input(z.object({
        updates: z.array(z.object({
            fromTime: z.string(),
            toTime: z.string(),
            isActive: z.boolean(),
            id: z.string(),
            userId: z.string(),
        })),
    })).mutation(async ({ ctx, input }) => {
        const results = await Promise.all(
            input.updates.map(async (update) => {
                return ctx.db.update(availability).set({
                    fromTime: update.fromTime,
                    toTime: update.toTime,
                    isActive: update.isActive,
                }).where(and(eq(availability.id, update.id), eq(availability.userId, update.userId)));
            })
        );

        return results;
    }),
});

export default availabilityRouter;