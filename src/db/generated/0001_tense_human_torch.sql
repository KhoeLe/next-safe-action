DO $$ BEGIN
 CREATE TYPE "public"."workItemsStatus" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workitems" ADD COLUMN "workItemsStatus" "workItemsStatus" DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "workitems" ADD COLUMN "workItemsStatusAt" timestamp DEFAULT now();