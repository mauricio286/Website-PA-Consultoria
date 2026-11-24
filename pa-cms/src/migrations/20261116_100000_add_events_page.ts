import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "events_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "enabled" boolean DEFAULT false,
      "schedule_image_id" integer,
      "cta_button_url" varchar DEFAULT 'https://www.sympla.com.br/',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "events_page_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL,
      "hero_badge" varchar DEFAULT 'Próximo evento',
      "hero_title" varchar DEFAULT 'PA SUMMIT 2027',
      "hero_image_id" integer,
      "hero_subtitle" varchar DEFAULT 'Produtividade em outra dimensão',
      "stats_tag" varchar DEFAULT 'O evento',
      "stats_title" varchar DEFAULT 'Uma imersão completa em resultados de pesquisa, inovação agronômica e tendências de mercado para impulsionar a safra.',
      "about_title" varchar DEFAULT 'Sobre o PA Summit',
      "about_text" jsonb,
      "partners_tag" varchar DEFAULT 'Quem estará lá',
      "partners_title" varchar DEFAULT 'Empresas confirmadas',
      "schedule_tag" varchar DEFAULT 'Programação',
      "schedule_title" varchar DEFAULT 'Como funciona o evento',
      "cta_title" varchar DEFAULT 'Garanta seu lugar',
      "cta_subtitle" varchar DEFAULT 'Lote promocional por tempo limitado · Vagas limitadas',
      "cta_button_label" varchar DEFAULT 'Compre aqui agora',
      "cta_notice" varchar DEFAULT 'Redireciona com segurança para a página do evento na Sympla',
      "past_events_tag" varchar DEFAULT 'Nossa história',
      "past_events_title" varchar DEFAULT 'Veja nossos eventos anteriores'
    );

    CREATE TABLE IF NOT EXISTS "events_page_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_stats_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      "number" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_info_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_info_items_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      "key" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_partners_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_schedule_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "events_page_schedule_steps_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      "time" varchar NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "events_page_past_events" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "photo_id" integer,
      "gallery_url" varchar
    );

    CREATE TABLE IF NOT EXISTS "events_page_past_events_locales" (
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      "name" varchar NOT NULL,
      "date" varchar NOT NULL,
      "people" varchar,
      "desc" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "events_page_locales" ADD CONSTRAINT "events_page_locales_hero_image_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page" ADD CONSTRAINT "events_page_schedule_image_id_fk" FOREIGN KEY ("schedule_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_locales" ADD CONSTRAINT "events_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_stats" ADD CONSTRAINT "events_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_stats_locales" ADD CONSTRAINT "events_page_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_stats"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_info_items" ADD CONSTRAINT "events_page_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_info_items_locales" ADD CONSTRAINT "events_page_info_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_info_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_partners_logos" ADD CONSTRAINT "events_page_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_partners_logos" ADD CONSTRAINT "events_page_partners_logos_logo_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_schedule_steps" ADD CONSTRAINT "events_page_schedule_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_schedule_steps_locales" ADD CONSTRAINT "events_page_schedule_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_schedule_steps"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_past_events" ADD CONSTRAINT "events_page_past_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_past_events" ADD CONSTRAINT "events_page_past_events_photo_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "events_page_past_events_locales" ADD CONSTRAINT "events_page_past_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_past_events"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "events_page_hero_image_idx" ON "events_page_locales" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "events_page_schedule_image_idx" ON "events_page" USING btree ("schedule_image_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "events_page_locales_locale_parent_id_unique" ON "events_page_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_stats_order_idx" ON "events_page_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "events_page_stats_parent_id_idx" ON "events_page_stats" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "events_page_stats_locales_locale_parent_id_unique" ON "events_page_stats_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_info_items_order_idx" ON "events_page_info_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "events_page_info_items_parent_id_idx" ON "events_page_info_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "events_page_info_items_locales_locale_parent_id_unique" ON "events_page_info_items_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_partners_logos_order_idx" ON "events_page_partners_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "events_page_partners_logos_parent_id_idx" ON "events_page_partners_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_partners_logos_logo_idx" ON "events_page_partners_logos" USING btree ("logo_id");
    CREATE INDEX IF NOT EXISTS "events_page_schedule_steps_order_idx" ON "events_page_schedule_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "events_page_schedule_steps_parent_id_idx" ON "events_page_schedule_steps" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "events_page_schedule_steps_locales_locale_parent_id_unique" ON "events_page_schedule_steps_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_past_events_order_idx" ON "events_page_past_events" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "events_page_past_events_parent_id_idx" ON "events_page_past_events" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "events_page_past_events_photo_idx" ON "events_page_past_events" USING btree ("photo_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "events_page_past_events_locales_locale_parent_id_unique" ON "events_page_past_events_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "events_page_past_events_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_past_events" CASCADE;
    DROP TABLE IF EXISTS "events_page_schedule_steps_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_schedule_steps" CASCADE;
    DROP TABLE IF EXISTS "events_page_partners_logos" CASCADE;
    DROP TABLE IF EXISTS "events_page_info_items_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_info_items" CASCADE;
    DROP TABLE IF EXISTS "events_page_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_stats" CASCADE;
    DROP TABLE IF EXISTS "events_page_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page" CASCADE;
  `)
}
