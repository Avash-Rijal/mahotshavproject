ALTER TABLE "events" ALTER COLUMN "start_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "start_date" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "end_date" text;