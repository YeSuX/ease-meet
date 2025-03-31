CREATE TABLE IF NOT EXISTS "ease-meet_availability" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"day" varchar NOT NULL,
	"from_time" text NOT NULL,
	"to_time" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ease-meet_user" ADD COLUMN "availability" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ease-meet_availability" ADD CONSTRAINT "ease-meet_availability_user_id_ease-meet_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ease-meet_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
