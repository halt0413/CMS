CREATE TABLE `assets` (
	`alt_text` text,
	`byte_size` integer NOT NULL,
	`created_at` text NOT NULL,
	`file_name` text NOT NULL,
	`height` integer,
	`id` text PRIMARY KEY NOT NULL,
	`mime_type` text NOT NULL,
	`r2_key` text NOT NULL,
	`width` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `assets_r2_key_unique` ON `assets` (`r2_key`);--> statement-breakpoint
CREATE TABLE `page_assets` (
	`asset_id` text NOT NULL,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`role` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_page_assets_page_id` ON `page_assets` (`page_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `idx_page_assets_asset_id` ON `page_assets` (`asset_id`);