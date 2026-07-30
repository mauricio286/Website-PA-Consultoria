import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create enum types for new select fields (IF NOT EXISTS via DO block)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_hero_media_type" AS ENUM('upload', 'vimeo');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_intro_media_type" AS ENUM('upload', 'vimeo');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_intro_video_align" AS ENUM('right', 'center', 'left');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_home_page_intro_video_aspect_ratio" AS ENUM('16/9', '1/1', '4/5', '9/16', '4/3');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- Hero section: media type toggle (image vs vimeo)
    ALTER TABLE "home_page"
      ADD COLUMN IF NOT EXISTS "hero_media_type" "enum_home_page_hero_media_type" DEFAULT 'upload',
      ADD COLUMN IF NOT EXISTS "hero_vimeo_url" varchar;

    -- Introduction section: media type toggle + video appearance controls
    ALTER TABLE "home_page"
      ADD COLUMN IF NOT EXISTS "intro_media_type" "enum_home_page_intro_media_type" DEFAULT 'upload',
      ADD COLUMN IF NOT EXISTS "intro_vimeo_url" varchar,
      ADD COLUMN IF NOT EXISTS "intro_video_width" numeric DEFAULT 80,
      ADD COLUMN IF NOT EXISTS "intro_video_max_width" numeric DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "intro_video_align" "enum_home_page_intro_video_align" DEFAULT 'right',
      ADD COLUMN IF NOT EXISTS "intro_video_aspect_ratio" "enum_home_page_intro_video_aspect_ratio" DEFAULT '16/9',
      ADD COLUMN IF NOT EXISTS "intro_video_radius" numeric DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "intro_video_inner_radius" numeric DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "intro_container_bg" varchar,
      ADD COLUMN IF NOT EXISTS "intro_container_padding" numeric DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "intro_container_border" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "intro_container_border_color" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page"
      DROP COLUMN IF EXISTS "hero_media_type",
      DROP COLUMN IF EXISTS "hero_vimeo_url",
      DROP COLUMN IF EXISTS "intro_media_type",
      DROP COLUMN IF EXISTS "intro_vimeo_url",
      DROP COLUMN IF EXISTS "intro_video_width",
      DROP COLUMN IF EXISTS "intro_video_max_width",
      DROP COLUMN IF EXISTS "intro_video_align",
      DROP COLUMN IF EXISTS "intro_video_aspect_ratio",
      DROP COLUMN IF EXISTS "intro_video_radius",
      DROP COLUMN IF EXISTS "intro_video_inner_radius",
      DROP COLUMN IF EXISTS "intro_container_bg",
      DROP COLUMN IF EXISTS "intro_container_padding",
      DROP COLUMN IF EXISTS "intro_container_border",
      DROP COLUMN IF EXISTS "intro_container_border_color";

    DROP TYPE IF EXISTS "enum_home_page_intro_video_aspect_ratio";
    DROP TYPE IF EXISTS "enum_home_page_intro_video_align";
    DROP TYPE IF EXISTS "enum_home_page_intro_media_type";
    DROP TYPE IF EXISTS "enum_home_page_hero_media_type";
  `)
}
