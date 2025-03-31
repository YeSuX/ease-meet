DO $$ BEGIN
 CREATE TYPE "public"."day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ease-meet_availability" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "ease-meet_availability" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "ease-meet_availability" ALTER COLUMN "day" SET DATA TYPE day;--> statement-breakpoint
ALTER TABLE "ease-meet_availability" ALTER COLUMN "user_id" SET DATA TYPE uuid;