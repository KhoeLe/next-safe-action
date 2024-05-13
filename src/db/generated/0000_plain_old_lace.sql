DO $$ BEGIN
 CREATE TYPE "priority" AS ENUM('low', 'normal', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('bug', 'feature', 'task');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workitems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar NOT NULL,
	"status" "status",
	"priority" "priority",
	"type" "type",
	"description" text NOT NULL,
	"assignee" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
