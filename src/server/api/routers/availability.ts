import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { availability } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const availabilityRouter = createTRPCRouter({
    getAvailability: publicProcedure.query(async ({ ctx }) => {
        const availability = await ctx.db.query.availability.findMany();

        return availability;
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