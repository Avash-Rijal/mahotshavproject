CREATE TABLE "participants" (
	"id" text PRIMARY KEY NOT NULL,
	"event_id" text NOT NULL,
	"event_ticket" text[],
	"revenue" text
);
--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;