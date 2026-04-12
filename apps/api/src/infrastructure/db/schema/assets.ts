import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const assets = sqliteTable("assets", {
  altText: text("alt_text"),
  byteSize: integer("byte_size").notNull(),
  createdAt: text("created_at").notNull(),
  fileName: text("file_name").notNull(),
  height: integer("height"),
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  r2Key: text("r2_key").notNull().unique(),
  width: integer("width")
});
