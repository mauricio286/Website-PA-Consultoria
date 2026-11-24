import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Página de Eventos v2 — estrutura idêntica ao modelo (PA Summit).
// Substitui as tabelas da 1ª versão (nunca tiveram conteúdo publicado) e preserva "enabled".
// Gerado por script; conteúdo padrão PT/EN copiado do modelo.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
-- Remove a estrutura antiga (a página nunca teve conteúdo publicado; "enabled" é preservado)
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
DROP TABLE IF EXISTS "events_page_past_events_gallery" CASCADE;
DROP TABLE IF EXISTS "events_page_highlights_stats_locales" CASCADE;
DROP TABLE IF EXISTS "events_page_highlights_stats" CASCADE;
DROP TABLE IF EXISTS "events_page_universes_locales" CASCADE;
DROP TABLE IF EXISTS "events_page_universes" CASCADE;
DROP TABLE IF EXISTS "events_page_experience_steps_locales" CASCADE;
DROP TABLE IF EXISTS "events_page_experience_steps" CASCADE;

CREATE TABLE IF NOT EXISTS "events_page" (
  "id" serial PRIMARY KEY NOT NULL,
  "enabled" boolean DEFAULT false,
  "updated_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone
);
ALTER TABLE "events_page" DROP COLUMN IF EXISTS "schedule_image_id", DROP COLUMN IF EXISTS "cta_button_url";
ALTER TABLE "events_page" ADD COLUMN IF NOT EXISTS "hero_image_id" integer, ADD COLUMN IF NOT EXISTS "tickets_cta_url" varchar DEFAULT 'https://www.sympla.com.br/';

CREATE TABLE "events_page_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" integer NOT NULL,
  "hero_badge" varchar,
  "hero_title_line1" varchar,
  "hero_title_line2" varchar,
  "hero_subtitle" varchar,
  "hero_date_location" varchar,
  "hero_cta_label" varchar,
  "highlights_tag" varchar,
  "highlights_title1" varchar,
  "highlights_title_accent" varchar,
  "highlights_description" varchar,
  "about_title1" varchar,
  "about_title_accent" varchar,
  "about_p1" varchar,
  "about_p2" varchar,
  "partners_tag" varchar,
  "partners_title1" varchar,
  "partners_title_accent" varchar,
  "experience_tag" varchar,
  "experience_title1" varchar,
  "experience_title_accent" varchar,
  "experience_step_label" varchar,
  "tickets_badge" varchar,
  "tickets_title" varchar,
  "tickets_description" varchar,
  "tickets_cta_label" varchar,
  "tickets_note" varchar,
  "past_tag" varchar,
  "past_title1" varchar,
  "past_title_accent" varchar,
  "past_view_label" varchar,
  "past_close_label" varchar,
  "past_photo_label" varchar
);

CREATE TABLE "events_page_highlights_stats" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE "events_page_highlights_stats_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" varchar NOT NULL,
  "value" varchar,
  "label" varchar
);

CREATE TABLE "events_page_info_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE "events_page_info_items_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" varchar NOT NULL,
  "key" varchar,
  "value" varchar
);

CREATE TABLE "events_page_universes" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "image_id" integer
);

CREATE TABLE "events_page_universes_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" varchar NOT NULL,
  "tag" varchar,
  "crop" varchar,
  "focus" varchar
);

CREATE TABLE "events_page_partners_logos" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "logo_id" integer NOT NULL
);

CREATE TABLE "events_page_experience_steps" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "image_id" integer
);

CREATE TABLE "events_page_experience_steps_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" varchar NOT NULL,
  "time" varchar,
  "title" varchar,
  "description" varchar,
  "caption" varchar
);

CREATE TABLE "events_page_past_events" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "cover_id" integer
);

CREATE TABLE "events_page_past_events_locales" (
  "id" serial PRIMARY KEY NOT NULL,
  "_locale" "_locales" NOT NULL,
  "_parent_id" varchar NOT NULL,
  "name" varchar,
  "date" varchar,
  "people" varchar,
  "desc" varchar
);

CREATE TABLE "events_page_past_events_gallery" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "image_id" integer NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "events_page" ADD CONSTRAINT "events_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_locales" ADD CONSTRAINT "events_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_highlights_stats" ADD CONSTRAINT "events_page_highlights_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_highlights_stats_locales" ADD CONSTRAINT "events_page_highlights_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_highlights_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_info_items" ADD CONSTRAINT "events_page_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_info_items_locales" ADD CONSTRAINT "events_page_info_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_info_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_universes" ADD CONSTRAINT "events_page_universes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_universes" ADD CONSTRAINT "events_page_universes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_universes_locales" ADD CONSTRAINT "events_page_universes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_universes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_partners_logos" ADD CONSTRAINT "events_page_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_partners_logos" ADD CONSTRAINT "events_page_partners_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_experience_steps" ADD CONSTRAINT "events_page_experience_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_experience_steps" ADD CONSTRAINT "events_page_experience_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_experience_steps_locales" ADD CONSTRAINT "events_page_experience_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_experience_steps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_past_events" ADD CONSTRAINT "events_page_past_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_past_events" ADD CONSTRAINT "events_page_past_events_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_past_events_locales" ADD CONSTRAINT "events_page_past_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_past_events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_past_events_gallery" ADD CONSTRAINT "events_page_past_events_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page_past_events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE "events_page_past_events_gallery" ADD CONSTRAINT "events_page_past_events_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE INDEX IF NOT EXISTS "events_page_hero_image_idx" ON "events_page" USING btree ("hero_image_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_locales_locale_parent_id_unique" ON "events_page_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_highlights_stats_order_idx" ON "events_page_highlights_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_highlights_stats_parent_id_idx" ON "events_page_highlights_stats" USING btree ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_highlights_stats_locales_locale_parent_id_unique" ON "events_page_highlights_stats_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_info_items_order_idx" ON "events_page_info_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_info_items_parent_id_idx" ON "events_page_info_items" USING btree ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_info_items_locales_locale_parent_id_unique" ON "events_page_info_items_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_universes_order_idx" ON "events_page_universes" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_universes_parent_id_idx" ON "events_page_universes" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_universes_image_idx" ON "events_page_universes" USING btree ("image_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_universes_locales_locale_parent_id_unique" ON "events_page_universes_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_partners_logos_order_idx" ON "events_page_partners_logos" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_partners_logos_parent_id_idx" ON "events_page_partners_logos" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_partners_logos_logo_idx" ON "events_page_partners_logos" USING btree ("logo_id");
CREATE INDEX IF NOT EXISTS "events_page_experience_steps_order_idx" ON "events_page_experience_steps" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_experience_steps_parent_id_idx" ON "events_page_experience_steps" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_experience_steps_image_idx" ON "events_page_experience_steps" USING btree ("image_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_experience_steps_locales_locale_parent_id_unique" ON "events_page_experience_steps_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_past_events_order_idx" ON "events_page_past_events" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_past_events_parent_id_idx" ON "events_page_past_events" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_past_events_cover_idx" ON "events_page_past_events" USING btree ("cover_id");
CREATE UNIQUE INDEX IF NOT EXISTS "events_page_past_events_locales_locale_parent_id_unique" ON "events_page_past_events_locales" USING btree ("_locale","_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_past_events_gallery_order_idx" ON "events_page_past_events_gallery" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "events_page_past_events_gallery_parent_id_idx" ON "events_page_past_events_gallery" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "events_page_past_events_gallery_image_idx" ON "events_page_past_events_gallery" USING btree ("image_id");

-- Conteúdo padrão (igual ao modelo): garante a linha da página e popula PT/EN
INSERT INTO "events_page" ("id","enabled","created_at","updated_at") SELECT 1, false, now(), now() WHERE NOT EXISTS (SELECT 1 FROM "events_page");
UPDATE "events_page" SET "updated_at" = now() WHERE "id" = (SELECT MIN("id") FROM "events_page");
UPDATE "events_page" SET "tickets_cta_url" = COALESCE("tickets_cta_url", 'https://www.sympla.com.br/');

INSERT INTO "events_page_locales" ("_locale","_parent_id","hero_badge","hero_title_line1","hero_title_line2","hero_subtitle","hero_date_location","hero_cta_label","highlights_tag","highlights_title1","highlights_title_accent","highlights_description","about_title1","about_title_accent","about_p1","about_p2","partners_tag","partners_title1","partners_title_accent","experience_tag","experience_title1","experience_title_accent","experience_step_label","tickets_badge","tickets_title","tickets_description","tickets_cta_label","tickets_note","past_tag","past_title1","past_title_accent","past_view_label","past_close_label","past_photo_label") VALUES ('pt', (SELECT MIN("id") FROM "events_page"), 'Próximo evento', 'PA Summit', '2027', 'Produtividade em outra dimensão.', '06 de fevereiro de 2027 · Estação Experimental PA, Diamantino - MT', 'Garantir ingresso', 'O evento', 'Onde a pesquisa encontra', 'quem decide a safra.', 'O principal encontro técnico do Grupo PA reúne produtores rurais, pesquisadores, consultores e empresas do setor para transformar dados validados no campo em decisões seguras para a próxima temporada.', 'Sobre o', 'PA Summit', 'Mais do que um dia de campo tradicional, o PA Summit é o ponto de encontro de todo o conhecimento construído nos mais de 60 hectares e 2.000 tratamentos conduzidos na estação experimental do Grupo PA, em Diamantino-MT.', 'Durante a jornada, produtores rurais, gestores agrícolas e equipes técnicas percorrem parcelas demonstrativas, analisam comparativos práticos de cultivares, proteção de cultivos, fertilidade do solo e tecnologia de aplicação — sempre em condições reais de lavoura.', 'Quem estará lá', 'Empresas', 'confirmadas', 'A experiência', 'Como o dia', 'acontece', 'Etapa', 'Lote promocional aberto', 'Garanta seu lugar', 'Vagas limitadas por circuito técnico · Ingresso inclui credenciamento completo, acesso às estações, kit do participante e almoço oficial.', 'Compre aqui agora', 'Redireciona para a página do evento na Sympla', 'Edições anteriores', 'Veja nossos', 'eventos anteriores', 'Ver mais', 'Fechar', 'Foto');
INSERT INTO "events_page_locales" ("_locale","_parent_id","hero_badge","hero_title_line1","hero_title_line2","hero_subtitle","hero_date_location","hero_cta_label","highlights_tag","highlights_title1","highlights_title_accent","highlights_description","about_title1","about_title_accent","about_p1","about_p2","partners_tag","partners_title1","partners_title_accent","experience_tag","experience_title1","experience_title_accent","experience_step_label","tickets_badge","tickets_title","tickets_description","tickets_cta_label","tickets_note","past_tag","past_title1","past_title_accent","past_view_label","past_close_label","past_photo_label") VALUES ('en', (SELECT MIN("id") FROM "events_page"), 'Upcoming event', 'PA Summit', '2027', 'Productivity in another dimension.', 'February 6, 2027 · PA Experimental Station, Diamantino - MT', 'Get your ticket', 'The event', 'Where field research meets', 'those who shape the harvest.', 'Grupo PA''s flagship technical gathering brings together growers, researchers, consultants, and agribusiness leaders to turn field-validated data into confident decisions for the next season.', 'About', 'PA Summit', 'More than a traditional field day, PA Summit brings together all knowledge built across 60+ hectares and over 2,000 treatments conducted at Grupo PA''s experimental station in Diamantino-MT.', 'Throughout the journey, growers, farm managers, and technical teams walk live trial plots, evaluate cultivar comparisons, crop protection, soil fertility, and application technology under real commercial farming conditions.', 'Who will be there', 'Confirmed', 'companies', 'The experience', 'How the day', 'unfolds', 'Stage', 'Early-bird batch open', 'Secure your spot', 'Limited spots per technical circuit · Ticket includes full accreditation, station access, participant kit, and official lunch.', 'Buy tickets now', 'Redirects to the official event page on Sympla', 'Past editions', 'Explore our', 'past events', 'Learn more', 'Close', 'Photo');

INSERT INTO "events_page_highlights_stats" ("_order","_parent_id","id") VALUES (1, (SELECT MIN("id") FROM "events_page"), 'evhighligh00000001');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('pt', 'evhighligh00000001', '14ª', 'Edição do Dia de Campo');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('en', 'evhighligh00000001', '14th', 'Field Day edition');
INSERT INTO "events_page_highlights_stats" ("_order","_parent_id","id") VALUES (2, (SELECT MIN("id") FROM "events_page"), 'evhighligh00000002');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('pt', 'evhighligh00000002', '06.02', 'Fevereiro de 2027');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('en', 'evhighligh00000002', '02.06', 'February 6, 2027');
INSERT INTO "events_page_highlights_stats" ("_order","_parent_id","id") VALUES (3, (SELECT MIN("id") FROM "events_page"), 'evhighligh00000003');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('pt', 'evhighligh00000003', '+1.500', 'Participantes esperados');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('en', 'evhighligh00000003', '+1,500', 'Expected attendees');
INSERT INTO "events_page_highlights_stats" ("_order","_parent_id","id") VALUES (4, (SELECT MIN("id") FROM "events_page"), 'evhighligh00000004');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('pt', 'evhighligh00000004', '+40', 'Estações e marcas parceiras');
INSERT INTO "events_page_highlights_stats_locales" ("_locale","_parent_id","value","label") VALUES ('en', 'evhighligh00000004', '+40', 'Stations & partner brands');

INSERT INTO "events_page_info_items" ("_order","_parent_id","id") VALUES (1, (SELECT MIN("id") FROM "events_page"), 'evinfoitem00000001');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('pt', 'evinfoitem00000001', 'Data', '06 de fevereiro de 2027');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('en', 'evinfoitem00000001', 'Date', 'February 6, 2027');
INSERT INTO "events_page_info_items" ("_order","_parent_id","id") VALUES (2, (SELECT MIN("id") FROM "events_page"), 'evinfoitem00000002');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('pt', 'evinfoitem00000002', 'Horário', '07h00 às 17h00');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('en', 'evinfoitem00000002', 'Hours', '7:00 AM to 5:00 PM');
INSERT INTO "events_page_info_items" ("_order","_parent_id","id") VALUES (3, (SELECT MIN("id") FROM "events_page"), 'evinfoitem00000003');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('pt', 'evinfoitem00000003', 'Local', 'Estação Experimental PA · Diamantino - MT');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('en', 'evinfoitem00000003', 'Location', 'PA Experimental Station · Diamantino - MT');
INSERT INTO "events_page_info_items" ("_order","_parent_id","id") VALUES (4, (SELECT MIN("id") FROM "events_page"), 'evinfoitem00000004');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('pt', 'evinfoitem00000004', 'Público', 'Produtores rurais, consultores e parceiros');
INSERT INTO "events_page_info_items_locales" ("_locale","_parent_id","key","value") VALUES ('en', 'evinfoitem00000004', 'Audience', 'Growers, consultants & industry partners');

INSERT INTO "events_page_universes" ("_order","_parent_id","id") VALUES (1, (SELECT MIN("id") FROM "events_page"), 'evuniverse00000001');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('pt', 'evuniverse00000001', 'Universo 01', 'Soja', 'Posicionamento de cultivares, manejo de doenças, nematoides e construção de altas produtividades.');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('en', 'evuniverse00000001', 'Universe 01', 'Soybean', 'Cultivar positioning, disease & nematode management, and high-yield ceilings.');
INSERT INTO "events_page_universes" ("_order","_parent_id","id") VALUES (2, (SELECT MIN("id") FROM "events_page"), 'evuniverse00000002');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('pt', 'evuniverse00000002', 'Universo 02', 'Milho', 'Híbridos para segunda safra, proteção fitossanitária, manejo de pragas e eficiência nutricional.');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('en', 'evuniverse00000002', 'Universe 02', 'Corn', 'Second-crop hybrids, crop protection, pest control, and nutritional efficiency.');
INSERT INTO "events_page_universes" ("_order","_parent_id","id") VALUES (3, (SELECT MIN("id") FROM "events_page"), 'evuniverse00000003');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('pt', 'evuniverse00000003', 'Universo 03', 'Algodão', 'Qualidade de fibra, fisiologia vegetal, reguladores de crescimento e manejo integrado no cerrado.');
INSERT INTO "events_page_universes_locales" ("_locale","_parent_id","tag","crop","focus") VALUES ('en', 'evuniverse00000003', 'Universe 03', 'Cotton', 'Fiber quality, plant physiology, growth regulators, and integrated cerrado management.');

INSERT INTO "events_page_experience_steps" ("_order","_parent_id","id") VALUES (1, (SELECT MIN("id") FROM "events_page"), 'evexperien00000001');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('pt', 'evexperien00000001', '07h00', 'Credenciamento e recepção no campo', 'Chegada na Estação Experimental, retirada de credenciais e kits do participante acompanhada de café da manhã regional.', 'Recepção dos produtores e formação dos grupos técnicos');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('en', 'evexperien00000001', '07:00', 'Check-in & farm welcome', 'Arrival at the Experimental Station, badge and official participant kit pickup, accompanied by a regional breakfast.', 'Grower welcome and technical group organization');
INSERT INTO "events_page_experience_steps" ("_order","_parent_id","id") VALUES (2, (SELECT MIN("id") FROM "events_page"), 'evexperien00000002');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('pt', 'evexperien00000002', '08h00', 'Abertura oficial Grupo PA', 'Panorama estratégico da safra, leitura climática e direcionamentos técnicos da liderança da consultoria.', 'Abertura institucional e cenário agronômico da temporada');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('en', 'evexperien00000002', '08:00', 'Grupo PA official opening', 'Strategic harvest outlook, climate reading, and technical guidelines from our consulting leadership.', 'Institutional opening and agronomic outlook for the season');
INSERT INTO "events_page_experience_steps" ("_order","_parent_id","id") VALUES (3, (SELECT MIN("id") FROM "events_page"), 'evexperien00000003');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('pt', 'evexperien00000003', '09h00', 'Circuitos Soja, Milho e Algodão', 'Giro guiado pelas estações experimentais com pesquisadores do Grupo PA e especialistas das empresas parceiras.', 'Mais de 2.000 tratamentos avaliados em condições reais de cultivo');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('en', 'evexperien00000003', '09:00', 'Soybean, Corn & Cotton circuits', 'Guided walk through experimental plots alongside Grupo PA researchers and partner company specialists.', 'Over 2,000 treatments evaluated under real field conditions');
INSERT INTO "events_page_experience_steps" ("_order","_parent_id","id") VALUES (4, (SELECT MIN("id") FROM "events_page"), 'evexperien00000004');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('pt', 'evexperien00000004', '13h00', 'Encerramento, almoço e networking', 'Palestra convidada, almoço oficial de confraternização e troca direta de experiências entre produtores e lideranças do agro.', 'Conexão e troca de experiências entre quem constrói o agro');
INSERT INTO "events_page_experience_steps_locales" ("_locale","_parent_id","time","title","description","caption") VALUES ('en', 'evexperien00000004', '13:00', 'Closing talk, lunch & networking', 'Guest keynote, celebratory lunch, and direct exchange of experiences among growers and agribusiness leaders.', 'High-value connection among those who build agribusiness');

INSERT INTO "events_page_past_events" ("_order","_parent_id","id") VALUES (1, (SELECT MIN("id") FROM "events_page"), 'evpasteven00000001');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('pt', 'evpasteven00000001', 'PA Summit 2026', 'Fev 2026', '+1.350 participantes', '13ª edição com mais de 2.000 tratamentos em campo destacando posicionamento de cultivares e rentabilidade por hectare.');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('en', 'evpasteven00000001', 'PA Summit 2026', 'Feb 2026', '+1,350 attendees', '13th edition featuring over 2,000 field treatments focused on cultivar positioning and profitability per hectare.');
INSERT INTO "events_page_past_events" ("_order","_parent_id","id") VALUES (2, (SELECT MIN("id") FROM "events_page"), 'evpasteven00000002');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('pt', 'evpasteven00000002', 'PA Summit 2025', 'Fev 2025', '+1.150 participantes', '12ª edição voltada à proteção de cultivos, construção de perfil de solo e integração com agricultura de precisão.');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('en', 'evpasteven00000002', 'PA Summit 2025', 'Feb 2025', '+1,150 attendees', '12th edition dedicated to crop protection, deep soil profile building, and precision agriculture integration.');
INSERT INTO "events_page_past_events" ("_order","_parent_id","id") VALUES (3, (SELECT MIN("id") FROM "events_page"), 'evpasteven00000003');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('pt', 'evpasteven00000003', 'PA Summit 2024', 'Fev 2024', '+980 participantes', '11ª edição dedicada à estabilidade produtiva frente aos desafios climáticos na sucessão soja, milho e algodão.');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('en', 'evpasteven00000003', 'PA Summit 2024', 'Feb 2024', '+980 attendees', '11th edition addressing yield stability amidst climate challenges across soybean, corn, and cotton systems.');
INSERT INTO "events_page_past_events" ("_order","_parent_id","id") VALUES (4, (SELECT MIN("id") FROM "events_page"), 'evpasteven00000004');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('pt', 'evpasteven00000004', 'Dia de Campo PA 2023', 'Fev 2023', '+850 participantes', '10ª edição celebrando uma década de validação científica e compartilhamento de dados na estação experimental.');
INSERT INTO "events_page_past_events_locales" ("_locale","_parent_id","name","date","people","desc") VALUES ('en', 'evpasteven00000004', 'PA Field Day 2023', 'Feb 2023', '+850 attendees', '10th edition celebrating a decade of scientific validation and data sharing at our experimental station.');


  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverte para a estrutura vazia (a v1 será recriada se a migration 20261116_100000 for reexecutada).
  await db.execute(sql`
    DROP TABLE IF EXISTS "events_page_past_events_gallery" CASCADE;
    DROP TABLE IF EXISTS "events_page_past_events_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_past_events" CASCADE;
    DROP TABLE IF EXISTS "events_page_experience_steps_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_experience_steps" CASCADE;
    DROP TABLE IF EXISTS "events_page_partners_logos" CASCADE;
    DROP TABLE IF EXISTS "events_page_universes_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_universes" CASCADE;
    DROP TABLE IF EXISTS "events_page_info_items_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_info_items" CASCADE;
    DROP TABLE IF EXISTS "events_page_highlights_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "events_page_highlights_stats" CASCADE;
    DROP TABLE IF EXISTS "events_page_locales" CASCADE;
    ALTER TABLE "events_page" DROP COLUMN IF EXISTS "hero_image_id", DROP COLUMN IF EXISTS "tickets_cta_url";
  `)
}
