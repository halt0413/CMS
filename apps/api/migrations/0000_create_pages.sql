CREATE TABLE `pages` (
	`body` text NOT NULL,
	`content_type` text NOT NULL,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`published_at` text,
	`slug` text NOT NULL,
	`status` text NOT NULL,
	`title` text NOT NULL,
	`updated_at` text NOT NULL,
	CONSTRAINT "pages_status_check" CHECK("pages"."status" in ('draft', 'published')),
	CONSTRAINT "pages_published_at_check" CHECK((
        ("pages"."status" = 'draft' and "pages"."published_at" is null) or
        ("pages"."status" = 'published' and "pages"."published_at" is not null)
      ))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_pages_status` ON `pages` (`status`);--> statement-breakpoint
CREATE INDEX `idx_pages_content_type` ON `pages` (`content_type`);--> statement-breakpoint
CREATE INDEX `idx_pages_updated_at` ON `pages` (`updated_at`);