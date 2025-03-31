ALTER TABLE "ease-meet_availability" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ease-meet_availability" ADD CONSTRAINT "ease-meet_availability_user_id_ease-meet_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ease-meet_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
