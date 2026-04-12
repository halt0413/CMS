import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { assets } from "./assets";
import { pages } from "./pages";

export const pageAssets = sqliteTable(
  "page_assets",
  {
    assetId: text("asset_id")
      .notNull()
      .references(() => assets.id, { onDelete: "cascade" }),
    createdAt: text("created_at").notNull(),
    id: text("id").primaryKey(),
    pageId: text("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    sortOrder: integer("sort_order").notNull().default(0)
  },
  (table) => [
    index("idx_page_assets_page_id").on(table.pageId, table.sortOrder),
    index("idx_page_assets_asset_id").on(table.assetId)
  ]
);
