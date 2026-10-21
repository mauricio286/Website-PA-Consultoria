import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_hero_overlay_type" AS ENUM('solid', 'gradient', 'none');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_hero_video_position_mobile" AS ENUM('center', 'left', 'right', 'top', 'bottom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_hero_mobile_height_mode" AS ENUM('fullscreen', 'proportional');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    ALTER TABLE "home_page"
      ADD COLUMN IF NOT EXISTS "hero_overlay_type" "enum_home_page_hero_overlay_type" DEFAULT 'solid',
      ADD COLUMN IF NOT EXISTS "hero_overlay_opacity" numeric DEFAULT 50,
      ADD COLUMN IF NOT EXISTS "hero_video_position_mobile" "enum_home_page_hero_video_position_mobile" DEFAULT 'center',
      ADD COLUMN IF NOT EXISTS "hero_mobile_height_mode" "enum_home_page_hero_mobile_height_mode" DEFAULT 'fullscreen',
      ADD COLUMN IF NOT EXISTS "hero_disable_entrance_animation" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page"
      DROP COLUMN IF EXISTS "hero_overlay_type",
      DROP COLUMN IF EXISTS "hero_overlay_opacity",
      DROP COLUMN IF EXISTS "hero_video_position_mobile",
      DROP COLUMN IF EXISTS "hero_mobile_height_mode",
      DROP COLUMN IF EXISTS "hero_disable_entrance_animation";

    DROP TYPE IF EXISTS "enum_home_page_hero_mobile_height_mode";
    DROP TYPE IF EXISTS "enum_home_page_hero_video_position_mobile";
    DROP TYPE IF EXISTS "enum_home_page_hero_overlay_type";
  `)
}
