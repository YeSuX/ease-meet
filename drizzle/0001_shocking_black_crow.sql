ALTER TABLE "ease-meet_user" RENAME COLUMN "email_verified" TO "nickname";--> statement-breakpoint
ALTER TABLE "ease-meet_user" ALTER COLUMN "nickname" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ease-meet_user" ALTER COLUMN "nickname" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ease-meet_user" ADD COLUMN "pronouns" varchar(255);