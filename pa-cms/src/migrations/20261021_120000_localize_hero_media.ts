import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Ensure Enum exists for hero media type
    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_hero_media_type" AS ENUM('upload', 'vimeo');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- 2. Add localized columns to home_page_locales
    ALTER TABLE "home_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_media_type" "enum_home_page_hero_media_type" DEFAULT 'upload',
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url" varchar,
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url_tablet" varchar,
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url_mobile" varchar,
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    -- 3. Add localized columns to about_page_locales
    ALTER TABLE "about_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    -- 4. Add localized columns to services_page_locales
    ALTER TABLE "services_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    -- 5. Add localized columns to careers_page_locales
    ALTER TABLE "careers_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    -- 6. Add localized columns to contact_settings_locales
    ALTER TABLE "contact_settings_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    -- 7. Add localized columns to ald_bioenergia_page_locales
    ALTER TABLE "ald_bioenergia_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    -- 8. Add localized columns to lavoura_page_locales
    ALTER TABLE "lavoura_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    -- 9. Add localized columns to centro_pesquisa_page_locales
    ALTER TABLE "centro_pesquisa_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    -- 10. Add localized columns to palestras_page_locales
    ALTER TABLE "palestras_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    -- 11. Add localized columns to services_locales
    ALTER TABLE "services_locales"
      ADD COLUMN IF NOT EXISTS "cover_image_id" integer,
      ADD COLUMN IF NOT EXISTS "cover_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "cover_image_mobile_id" integer;

    -- ─────────────────────────────────────────────────────────────────────────
    -- DATA MIGRATION: Copy existing media values to locales rows (pt and en)
    -- This guarantees zero data loss on deployment to production.
    -- ─────────────────────────────────────────────────────────────────────────
    DO $$ BEGIN
      -- Copy hero_image fields if they exist on the parent table
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_page' AND column_name = 'hero_image_id') THEN
        UPDATE "home_page_locales" l
        SET 
          "hero_image_id" = p."hero_image_id",
          "hero_image_tablet_id" = p."hero_image_tablet_id",
          "hero_image_mobile_id" = p."hero_image_mobile_id"
        FROM "home_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      -- Copy hero_media_type + hero_vimeo_url if they exist on the parent table
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_page' AND column_name = 'hero_media_type') THEN
        UPDATE "home_page_locales" l
        SET "hero_media_type" = COALESCE(p."hero_media_type", 'upload')
        FROM "home_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_page' AND column_name = 'hero_vimeo_url') THEN
        UPDATE "home_page_locales" l
        SET "hero_vimeo_url" = p."hero_vimeo_url"
        FROM "home_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_page' AND column_name = 'hero_vimeo_url_tablet') THEN
        UPDATE "home_page_locales" l
        SET "hero_vimeo_url_tablet" = p."hero_vimeo_url_tablet"
        FROM "home_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_page' AND column_name = 'hero_vimeo_url_mobile') THEN
        UPDATE "home_page_locales" l
        SET "hero_vimeo_url_mobile" = p."hero_vimeo_url_mobile"
        FROM "home_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'hero_image_id') THEN
        UPDATE "about_page_locales" l
        SET 
          "hero_image_id" = p."hero_image_id",
          "hero_image_tablet_id" = p."hero_image_tablet_id",
          "hero_image_mobile_id" = p."hero_image_mobile_id"
        FROM "about_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services_page' AND column_name = 'hero_image_id') THEN
        UPDATE "services_page_locales" l
        SET 
          "hero_image_id" = p."hero_image_id",
          "hero_image_tablet_id" = p."hero_image_tablet_id",
          "hero_image_mobile_id" = p."hero_image_mobile_id"
        FROM "services_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'careers_page' AND column_name = 'hero_image_id') THEN
        UPDATE "careers_page_locales" l
        SET 
          "hero_image_id" = p."hero_image_id",
          "hero_image_tablet_id" = p."hero_image_tablet_id",
          "hero_image_mobile_id" = p."hero_image_mobile_id"
        FROM "careers_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_settings' AND column_name = 'hero_image_id') THEN
        UPDATE "contact_settings_locales" l
        SET 
          "hero_image_id" = p."hero_image_id",
          "hero_image_tablet_id" = p."hero_image_tablet_id",
          "hero_image_mobile_id" = p."hero_image_mobile_id"
        FROM "contact_settings" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ald_bioenergia_page' AND column_name = 'hero_image_id') THEN
        UPDATE "ald_bioenergia_page_locales" l
        SET "hero_image_id" = p."hero_image_id"
        FROM "ald_bioenergia_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lavoura_page' AND column_name = 'hero_image_id') THEN
        UPDATE "lavoura_page_locales" l
        SET "hero_image_id" = p."hero_image_id"
        FROM "lavoura_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'centro_pesquisa_page' AND column_name = 'hero_image_id') THEN
        UPDATE "centro_pesquisa_page_locales" l
        SET "hero_image_id" = p."hero_image_id"
        FROM "centro_pesquisa_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'palestras_page' AND column_name = 'hero_image_id') THEN
        UPDATE "palestras_page_locales" l
        SET "hero_image_id" = p."hero_image_id"
        FROM "palestras_page" p
        WHERE l."_parent_id" = p."id";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'cover_image_id') THEN
        UPDATE "services_locales" l
        SET 
          "cover_image_id" = p."cover_image_id",
          "cover_image_tablet_id" = p."cover_image_tablet_id",
          "cover_image_mobile_id" = p."cover_image_mobile_id"
        FROM "services" p
        WHERE l."_parent_id" = p."id";
      END IF;
    END $$;

    -- ─────────────────────────────────────────────────────────────────────────
    -- FOREIGN KEYS & CONSTRAINTS
    -- ─────────────────────────────────────────────────────────────────────────
    DO $$ BEGIN
      ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "careers_page_locales" ADD CONSTRAINT "careers_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "careers_page_locales" ADD CONSTRAINT "careers_page_locales_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "careers_page_locales" ADD CONSTRAINT "careers_page_locales_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "ald_bioenergia_page_locales" ADD CONSTRAINT "ald_bioenergia_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "lavoura_page_locales" ADD CONSTRAINT "lavoura_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "centro_pesquisa_page_locales" ADD CONSTRAINT "centro_pesquisa_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "palestras_page_locales" ADD CONSTRAINT "palestras_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_cover_image_tablet_id_media_id_fk" FOREIGN KEY ("cover_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_cover_image_mobile_id_media_id_fk" FOREIGN KEY ("cover_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- Indexes
    CREATE INDEX IF NOT EXISTS "home_page_locales_hero_image_idx" ON "home_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "home_page_locales_hero_image_tablet_idx" ON "home_page_locales" USING btree ("hero_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "home_page_locales_hero_image_mobile_idx" ON "home_page_locales" USING btree ("hero_image_mobile_id");

    CREATE INDEX IF NOT EXISTS "about_page_locales_hero_image_idx" ON "about_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "about_page_locales_hero_image_tablet_idx" ON "about_page_locales" USING btree ("hero_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "about_page_locales_hero_image_mobile_idx" ON "about_page_locales" USING btree ("hero_image_mobile_id");

    CREATE INDEX IF NOT EXISTS "services_page_locales_hero_image_idx" ON "services_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "services_page_locales_hero_image_tablet_idx" ON "services_page_locales" USING btree ("hero_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "services_page_locales_hero_image_mobile_idx" ON "services_page_locales" USING btree ("hero_image_mobile_id");

    CREATE INDEX IF NOT EXISTS "careers_page_locales_hero_image_idx" ON "careers_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "careers_page_locales_hero_image_tablet_idx" ON "careers_page_locales" USING btree ("hero_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "careers_page_locales_hero_image_mobile_idx" ON "careers_page_locales" USING btree ("hero_image_mobile_id");

    CREATE INDEX IF NOT EXISTS "contact_settings_locales_hero_image_idx" ON "contact_settings_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "contact_settings_locales_hero_image_tablet_idx" ON "contact_settings_locales" USING btree ("hero_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "contact_settings_locales_hero_image_mobile_idx" ON "contact_settings_locales" USING btree ("hero_image_mobile_id");

    CREATE INDEX IF NOT EXISTS "ald_bioenergia_page_locales_hero_image_idx" ON "ald_bioenergia_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "lavoura_page_locales_hero_image_idx" ON "lavoura_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "centro_pesquisa_page_locales_hero_image_idx" ON "centro_pesquisa_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "palestras_page_locales_hero_image_idx" ON "palestras_page_locales" USING btree ("hero_image_id");

    CREATE INDEX IF NOT EXISTS "services_locales_cover_image_idx" ON "services_locales" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "services_locales_cover_image_tablet_idx" ON "services_locales" USING btree ("cover_image_tablet_id");
    CREATE INDEX IF NOT EXISTS "services_locales_cover_image_mobile_idx" ON "services_locales" USING btree ("cover_image_mobile_id");

    -- ─────────────────────────────────────────────────────────────────────────
    -- DROP OLD COLUMNS FROM PARENT TABLES
    -- ─────────────────────────────────────────────────────────────────────────
    ALTER TABLE "home_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_media_type" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url_tablet" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url_mobile" CASCADE;

    ALTER TABLE "about_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "services_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "careers_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "contact_settings"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "ald_bioenergia_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "lavoura_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "centro_pesquisa_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "palestras_page"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "cover_image_id" CASCADE,
      DROP COLUMN IF EXISTS "cover_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "cover_image_mobile_id" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Re-create columns on parent tables
    ALTER TABLE "home_page"
      ADD COLUMN IF NOT EXISTS "hero_media_type" "enum_home_page_hero_media_type" DEFAULT 'upload',
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url" varchar,
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url_tablet" varchar,
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url_mobile" varchar,
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    ALTER TABLE "about_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    ALTER TABLE "services_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    ALTER TABLE "careers_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    ALTER TABLE "contact_settings"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_image_mobile_id" integer;

    ALTER TABLE "ald_bioenergia_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    ALTER TABLE "lavoura_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    ALTER TABLE "centro_pesquisa_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    ALTER TABLE "palestras_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    ALTER TABLE "services"
      ADD COLUMN IF NOT EXISTS "cover_image_id" integer,
      ADD COLUMN IF NOT EXISTS "cover_image_tablet_id" integer,
      ADD COLUMN IF NOT EXISTS "cover_image_mobile_id" integer;

    -- Copy back data from PT locale
    UPDATE "home_page" p
    SET
      "hero_image_id" = l."hero_image_id",
      "hero_image_tablet_id" = l."hero_image_tablet_id",
      "hero_image_mobile_id" = l."hero_image_mobile_id",
      "hero_media_type" = l."hero_media_type",
      "hero_vimeo_url" = l."hero_vimeo_url",
      "hero_vimeo_url_tablet" = l."hero_vimeo_url_tablet",
      "hero_vimeo_url_mobile" = l."hero_vimeo_url_mobile"
    FROM "home_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "about_page" p
    SET
      "hero_image_id" = l."hero_image_id",
      "hero_image_tablet_id" = l."hero_image_tablet_id",
      "hero_image_mobile_id" = l."hero_image_mobile_id"
    FROM "about_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "services_page" p
    SET
      "hero_image_id" = l."hero_image_id",
      "hero_image_tablet_id" = l."hero_image_tablet_id",
      "hero_image_mobile_id" = l."hero_image_mobile_id"
    FROM "services_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "careers_page" p
    SET
      "hero_image_id" = l."hero_image_id",
      "hero_image_tablet_id" = l."hero_image_tablet_id",
      "hero_image_mobile_id" = l."hero_image_mobile_id"
    FROM "careers_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "contact_settings" p
    SET
      "hero_image_id" = l."hero_image_id",
      "hero_image_tablet_id" = l."hero_image_tablet_id",
      "hero_image_mobile_id" = l."hero_image_mobile_id"
    FROM "contact_settings_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "ald_bioenergia_page" p
    SET "hero_image_id" = l."hero_image_id"
    FROM "ald_bioenergia_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "lavoura_page" p
    SET "hero_image_id" = l."hero_image_id"
    FROM "lavoura_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "centro_pesquisa_page" p
    SET "hero_image_id" = l."hero_image_id"
    FROM "centro_pesquisa_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "palestras_page" p
    SET "hero_image_id" = l."hero_image_id"
    FROM "palestras_page_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    UPDATE "services" p
    SET
      "cover_image_id" = l."cover_image_id",
      "cover_image_tablet_id" = l."cover_image_tablet_id",
      "cover_image_mobile_id" = l."cover_image_mobile_id"
    FROM "services_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'pt';

    -- Drop columns from locales tables
    ALTER TABLE "home_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_media_type" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url_tablet" CASCADE,
      DROP COLUMN IF EXISTS "hero_vimeo_url_mobile" CASCADE;

    ALTER TABLE "about_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "services_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "careers_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "contact_settings_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "hero_image_mobile_id" CASCADE;

    ALTER TABLE "ald_bioenergia_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "lavoura_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "centro_pesquisa_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "palestras_page_locales"
      DROP COLUMN IF EXISTS "hero_image_id" CASCADE;

    ALTER TABLE "services_locales"
      DROP COLUMN IF EXISTS "cover_image_id" CASCADE,
      DROP COLUMN IF EXISTS "cover_image_tablet_id" CASCADE,
      DROP COLUMN IF EXISTS "cover_image_mobile_id" CASCADE;
  `)
}
