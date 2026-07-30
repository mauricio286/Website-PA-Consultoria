import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ald_bioenergia_page_indicators_theme" AS ENUM('dark', 'lime', 'light');
  CREATE TABLE "services_cycle_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_number" varchar NOT NULL,
  	"icon" varchar NOT NULL
  );
  
  CREATE TABLE "services_cycle_steps_locales" (
  	"title_dark" varchar NOT NULL,
  	"title_light" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ald_bioenergia_page_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"theme" "enum_ald_bioenergia_page_indicators_theme" DEFAULT 'light' NOT NULL
  );
  
  CREATE TABLE "ald_bioenergia_page_indicators_locales" (
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ald_bioenergia_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"logo_image_id" integer NOT NULL,
  	"section3_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ald_bioenergia_page_locales" (
  	"title" varchar NOT NULL,
  	"left_content" jsonb NOT NULL,
  	"section3_content" jsonb NOT NULL,
  	"bottom_content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "lavoura_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "lavoura_page_locales" (
  	"title" varchar NOT NULL,
  	"left_content" jsonb NOT NULL,
  	"bottom_content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "centro_pesquisa_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "centro_pesquisa_page_locales" (
  	"title" varchar NOT NULL,
  	"left_content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "palestras_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "palestras_page_locales" (
  	"title" varchar NOT NULL,
  	"left_content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "services" ADD COLUMN "cycle_active" boolean DEFAULT false;
  ALTER TABLE "services" ADD COLUMN "cycle_color" varchar DEFAULT '#88a668';
  ALTER TABLE "services" ADD COLUMN "cycle_accent_color" varchar DEFAULT '#88a668';
  ALTER TABLE "services_cycle_steps" ADD CONSTRAINT "services_cycle_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_cycle_steps_locales" ADD CONSTRAINT "services_cycle_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_cycle_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page_indicators" ADD CONSTRAINT "ald_bioenergia_page_indicators_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page_indicators" ADD CONSTRAINT "ald_bioenergia_page_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ald_bioenergia_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page_indicators_locales" ADD CONSTRAINT "ald_bioenergia_page_indicators_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ald_bioenergia_page_indicators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page" ADD CONSTRAINT "ald_bioenergia_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page" ADD CONSTRAINT "ald_bioenergia_page_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page" ADD CONSTRAINT "ald_bioenergia_page_section3_image_id_media_id_fk" FOREIGN KEY ("section3_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ald_bioenergia_page_locales" ADD CONSTRAINT "ald_bioenergia_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ald_bioenergia_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lavoura_page" ADD CONSTRAINT "lavoura_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lavoura_page" ADD CONSTRAINT "lavoura_page_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lavoura_page_locales" ADD CONSTRAINT "lavoura_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lavoura_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "centro_pesquisa_page" ADD CONSTRAINT "centro_pesquisa_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "centro_pesquisa_page" ADD CONSTRAINT "centro_pesquisa_page_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "centro_pesquisa_page_locales" ADD CONSTRAINT "centro_pesquisa_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."centro_pesquisa_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "palestras_page" ADD CONSTRAINT "palestras_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "palestras_page" ADD CONSTRAINT "palestras_page_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "palestras_page_locales" ADD CONSTRAINT "palestras_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."palestras_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_cycle_steps_order_idx" ON "services_cycle_steps" USING btree ("_order");
  CREATE INDEX "services_cycle_steps_parent_id_idx" ON "services_cycle_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_cycle_steps_locales_locale_parent_id_unique" ON "services_cycle_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ald_bioenergia_page_indicators_order_idx" ON "ald_bioenergia_page_indicators" USING btree ("_order");
  CREATE INDEX "ald_bioenergia_page_indicators_parent_id_idx" ON "ald_bioenergia_page_indicators" USING btree ("_parent_id");
  CREATE INDEX "ald_bioenergia_page_indicators_icon_idx" ON "ald_bioenergia_page_indicators" USING btree ("icon_id");
  CREATE UNIQUE INDEX "ald_bioenergia_page_indicators_locales_locale_parent_id_uniq" ON "ald_bioenergia_page_indicators_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ald_bioenergia_page_hero_image_idx" ON "ald_bioenergia_page" USING btree ("hero_image_id");
  CREATE INDEX "ald_bioenergia_page_logo_image_idx" ON "ald_bioenergia_page" USING btree ("logo_image_id");
  CREATE INDEX "ald_bioenergia_page_section3_image_idx" ON "ald_bioenergia_page" USING btree ("section3_image_id");
  CREATE UNIQUE INDEX "ald_bioenergia_page_locales_locale_parent_id_unique" ON "ald_bioenergia_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "lavoura_page_hero_image_idx" ON "lavoura_page" USING btree ("hero_image_id");
  CREATE INDEX "lavoura_page_image_idx" ON "lavoura_page" USING btree ("image_id");
  CREATE UNIQUE INDEX "lavoura_page_locales_locale_parent_id_unique" ON "lavoura_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "centro_pesquisa_page_hero_image_idx" ON "centro_pesquisa_page" USING btree ("hero_image_id");
  CREATE INDEX "centro_pesquisa_page_image_idx" ON "centro_pesquisa_page" USING btree ("image_id");
  CREATE UNIQUE INDEX "centro_pesquisa_page_locales_locale_parent_id_unique" ON "centro_pesquisa_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "palestras_page_hero_image_idx" ON "palestras_page" USING btree ("hero_image_id");
  CREATE INDEX "palestras_page_image_idx" ON "palestras_page" USING btree ("image_id");
  CREATE UNIQUE INDEX "palestras_page_locales_locale_parent_id_unique" ON "palestras_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_cycle_steps" CASCADE;
  DROP TABLE "services_cycle_steps_locales" CASCADE;
  DROP TABLE "ald_bioenergia_page_indicators" CASCADE;
  DROP TABLE "ald_bioenergia_page_indicators_locales" CASCADE;
  DROP TABLE "ald_bioenergia_page" CASCADE;
  DROP TABLE "ald_bioenergia_page_locales" CASCADE;
  DROP TABLE "lavoura_page" CASCADE;
  DROP TABLE "lavoura_page_locales" CASCADE;
  DROP TABLE "centro_pesquisa_page" CASCADE;
  DROP TABLE "centro_pesquisa_page_locales" CASCADE;
  DROP TABLE "palestras_page" CASCADE;
  DROP TABLE "palestras_page_locales" CASCADE;
  ALTER TABLE "services" DROP COLUMN "cycle_active";
  ALTER TABLE "services" DROP COLUMN "cycle_color";
  ALTER TABLE "services" DROP COLUMN "cycle_accent_color";
  DROP TYPE "public"."enum_ald_bioenergia_page_indicators_theme";`)
}
