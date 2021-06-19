DROP TABLE IF EXISTS "public"."menu_items";
-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS menu_items_id_seq

-- Table Definition
CREATE TABLE "public"."menu_items" (
    "id" int4 NOT NULL DEFAULT nextval('menu_items_id_seq'::regclass),
    "menu_id" int4,
    "title" varchar NOT NULL,
    "url" varchar NOT NULL,
    "target" varchar NOT NULL DEFAULT '_self'::character varying,
    "icon_class" varchar,
    "color" varchar,
    "parent_id" int4,
    "order" int4 NOT NULL,
    "created_at" timestamp,
    "updated_at" timestamp,
    "route" varchar,
    "parameters" text,
    CONSTRAINT "menu_items_menu_id_foreign" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."menu_items" ("id", "menu_id", "title", "url", "target", "icon_class", "color", "parent_id", "order", "created_at", "updated_at", "route", "parameters") VALUES
(14, 1, 'Import', '/quiz-panel/admin/quiz-editor/import', '_self', 'voyager-upload', '#ffffff', NULL, 3, '2021-06-19 12:26:54', '2021-06-19 16:16:59', NULL, '');
INSERT INTO "public"."menu_items" ("id", "menu_id", "title", "url", "target", "icon_class", "color", "parent_id", "order", "created_at", "updated_at", "route", "parameters") VALUES
(6, 1, 'Menu Builder', '', '_self', 'voyager-list', NULL, 5, 1, '2021-06-19 12:09:46', '2021-06-19 12:12:25', 'voyager.menus.index', NULL);
INSERT INTO "public"."menu_items" ("id", "menu_id", "title", "url", "target", "icon_class", "color", "parent_id", "order", "created_at", "updated_at", "route", "parameters") VALUES
(7, 1, 'Database', '', '_self', 'voyager-data', NULL, 5, 2, '2021-06-19 12:09:46', '2021-06-19 12:12:25', 'voyager.database.index', NULL);
INSERT INTO "public"."menu_items" ("id", "menu_id", "title", "url", "target", "icon_class", "color", "parent_id", "order", "created_at", "updated_at", "route", "parameters") VALUES
(8, 1, 'Compass', '', '_self', 'voyager-compass', NULL, 5, 3, '2021-06-19 12:09:46', '2021-06-19 12:12:25', 'voyager.compass.index', NULL),
(9, 1, 'BREAD', '', '_self', 'voyager-bread', NULL, 5, 4, '2021-06-19 12:09:46', '2021-06-19 12:12:25', 'voyager.bread.index', NULL),
(11, 1, 'Hooks', '', '_self', 'voyager-hook', NULL, 5, 5, '2021-06-19 12:09:47', '2021-06-19 12:12:25', 'voyager.hooks', NULL),
(15, 1, 'Export', '/quiz-panel/admin/quiz-editor/export', '_self', 'voyager-download', '#ffffff', NULL, 4, '2021-06-19 12:29:56', '2021-06-19 16:17:01', NULL, ''),
(2, 1, 'Media', '', '_self', 'voyager-images', NULL, NULL, 8, '2021-06-19 12:09:46', '2021-06-19 16:17:01', 'voyager.media.index', NULL),
(13, 1, 'Quiz Editor', '/quiz-panel/admin/quiz-editor', '_self', 'voyager-controller', '#ffffff', NULL, 1, '2021-06-19 12:14:15', '2021-06-19 16:17:22', NULL, ''),
(5, 1, 'Tools', '', '_self', 'voyager-tools', NULL, NULL, 9, '2021-06-19 12:09:46', '2021-06-19 16:16:56', NULL, NULL),
(10, 1, 'Settings', '', '_self', 'voyager-settings', NULL, NULL, 10, '2021-06-19 12:09:46', '2021-06-19 16:16:56', 'voyager.settings.index', NULL),
(12, 1, 'Results Editor', '/quiz-panel/admin/results-editor', '_self', 'voyager-trophy', '#ffffff', NULL, 2, '2021-06-19 12:11:27', '2021-06-19 16:16:58', NULL, '');