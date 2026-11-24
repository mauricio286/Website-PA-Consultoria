import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Seção "Culturas" (bolhas interativas) da Home. Campos fixos em grupos (sem tabelas de array).
// A seção nasce DESLIGADA (culturas_enabled = false) até ser ativada no CMS.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page"
      ADD COLUMN IF NOT EXISTS "culturas_enabled" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "culturas_soja_foto_id" integer,
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat1_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat2_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat3_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_milho_foto_id" integer,
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat1_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat2_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat3_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_algodao_foto_id" integer,
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat1_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat2_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat3_numero" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n1_valor" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n2_valor" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n3_valor" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n4_valor" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n5_valor" varchar;

    ALTER TABLE "home_page_locales"
      ADD COLUMN IF NOT EXISTS "culturas_tag" varchar DEFAULT 'ESTRUTURA',
      ADD COLUMN IF NOT EXISTS "culturas_titulo" varchar DEFAULT 'Culturas',
      ADD COLUMN IF NOT EXISTS "culturas_subtitulo" varchar DEFAULT 'Passe o mouse ou toque em uma bolha para explorar.',
      ADD COLUMN IF NOT EXISTS "culturas_painel_kicker" varchar DEFAULT 'GRUPO PA',
      ADD COLUMN IF NOT EXISTS "culturas_painel_titulo" varchar DEFAULT 'Onde a PA atua',
      ADD COLUMN IF NOT EXISTS "culturas_painel_texto" varchar DEFAULT 'Cada bolha é uma cultura ou um número da PA. Passe o mouse para ver a imagem e os dados; clique para fixar.',
      ADD COLUMN IF NOT EXISTS "culturas_kicker_cultura" varchar DEFAULT 'CULTURA',
      ADD COLUMN IF NOT EXISTS "culturas_kicker_numeros" varchar DEFAULT 'A PA EM NÚMEROS',
      ADD COLUMN IF NOT EXISTS "culturas_soja_nome" varchar DEFAULT 'Soja',
      ADD COLUMN IF NOT EXISTS "culturas_soja_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat1_legenda" varchar DEFAULT 'ensaios na safra',
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat2_legenda" varchar DEFAULT 'mil ha acompanhados',
      ADD COLUMN IF NOT EXISTS "culturas_soja_stat3_legenda" varchar DEFAULT 'produtores atendidos',
      ADD COLUMN IF NOT EXISTS "culturas_milho_nome" varchar DEFAULT 'Milho',
      ADD COLUMN IF NOT EXISTS "culturas_milho_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat1_legenda" varchar DEFAULT 'ensaios na safra',
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat2_legenda" varchar DEFAULT 'mil ha acompanhados',
      ADD COLUMN IF NOT EXISTS "culturas_milho_stat3_legenda" varchar DEFAULT 'híbridos avaliados',
      ADD COLUMN IF NOT EXISTS "culturas_algodao_nome" varchar DEFAULT 'Algodão',
      ADD COLUMN IF NOT EXISTS "culturas_algodao_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat1_legenda" varchar DEFAULT 'ensaios na safra',
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat2_legenda" varchar DEFAULT 'mil ha acompanhados',
      ADD COLUMN IF NOT EXISTS "culturas_algodao_stat3_legenda" varchar DEFAULT 'variedades avaliadas',
      ADD COLUMN IF NOT EXISTS "culturas_n1_legenda" varchar DEFAULT 'anos de pesquisa',
      ADD COLUMN IF NOT EXISTS "culturas_n1_titulo_painel" varchar DEFAULT 'anos',
      ADD COLUMN IF NOT EXISTS "culturas_n1_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n2_legenda" varchar DEFAULT 'consultores',
      ADD COLUMN IF NOT EXISTS "culturas_n2_titulo_painel" varchar DEFAULT 'consultores',
      ADD COLUMN IF NOT EXISTS "culturas_n2_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n3_legenda" varchar DEFAULT 'municípios',
      ADD COLUMN IF NOT EXISTS "culturas_n3_titulo_painel" varchar DEFAULT 'municípios',
      ADD COLUMN IF NOT EXISTS "culturas_n3_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n4_legenda" varchar DEFAULT 'clientes',
      ADD COLUMN IF NOT EXISTS "culturas_n4_titulo_painel" varchar DEFAULT 'clientes',
      ADD COLUMN IF NOT EXISTS "culturas_n4_texto" varchar,
      ADD COLUMN IF NOT EXISTS "culturas_n5_legenda" varchar DEFAULT 'mil ha',
      ADD COLUMN IF NOT EXISTS "culturas_n5_titulo_painel" varchar DEFAULT 'mil hectares',
      ADD COLUMN IF NOT EXISTS "culturas_n5_texto" varchar;

    -- Padrões em inglês nas linhas do idioma EN (as colunas nascem com os padrões em português)
    UPDATE "home_page_locales" SET
      "culturas_tag" = 'STRUCTURE',
      "culturas_titulo" = 'Crops',
      "culturas_subtitulo" = 'Hover or tap a bubble to explore.',
      "culturas_painel_kicker" = 'PA GROUP',
      "culturas_painel_titulo" = 'Where PA operates',
      "culturas_painel_texto" = 'Each bubble is a crop or a PA number. Hover to see the image and data; click to pin.',
      "culturas_kicker_cultura" = 'CROP',
      "culturas_kicker_numeros" = 'PA IN NUMBERS',
      "culturas_soja_nome" = 'Soybean',
      "culturas_milho_nome" = 'Corn',
      "culturas_algodao_nome" = 'Cotton',
      "culturas_n1_legenda" = 'years of research',
      "culturas_n1_titulo_painel" = 'years',
      "culturas_n2_legenda" = 'consultants',
      "culturas_n2_titulo_painel" = 'consultants',
      "culturas_n3_legenda" = 'municipalities',
      "culturas_n3_titulo_painel" = 'municipalities',
      "culturas_n4_legenda" = 'clients',
      "culturas_n4_titulo_painel" = 'clients',
      "culturas_n5_legenda" = 'k ha',
      "culturas_n5_titulo_painel" = 'thousand hectares',
      "culturas_soja_stat1_legenda" = 'trials per season',
      "culturas_soja_stat2_legenda" = 'k ha monitored',
      "culturas_milho_stat1_legenda" = 'trials per season',
      "culturas_milho_stat2_legenda" = 'k ha monitored',
      "culturas_algodao_stat1_legenda" = 'trials per season',
      "culturas_algodao_stat2_legenda" = 'k ha monitored',
      "culturas_soja_stat3_legenda" = 'growers served',
      "culturas_milho_stat3_legenda" = 'hybrids evaluated',
      "culturas_algodao_stat3_legenda" = 'varieties evaluated'
    WHERE "_locale" = 'en';

    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_culturas_soja_foto_id_media_id_fk" FOREIGN KEY ("culturas_soja_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_culturas_milho_foto_id_media_id_fk" FOREIGN KEY ("culturas_milho_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_culturas_algodao_foto_id_media_id_fk" FOREIGN KEY ("culturas_algodao_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "home_page_culturas_soja_culturas_soja_foto_idx" ON "home_page" USING btree ("culturas_soja_foto_id");
    CREATE INDEX IF NOT EXISTS "home_page_culturas_milho_culturas_milho_foto_idx" ON "home_page" USING btree ("culturas_milho_foto_id");
    CREATE INDEX IF NOT EXISTS "home_page_culturas_algodao_culturas_algodao_foto_idx" ON "home_page" USING btree ("culturas_algodao_foto_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "home_page_culturas_soja_culturas_soja_foto_idx";
    DROP INDEX IF EXISTS "home_page_culturas_milho_culturas_milho_foto_idx";
    DROP INDEX IF EXISTS "home_page_culturas_algodao_culturas_algodao_foto_idx";

    ALTER TABLE "home_page" DROP CONSTRAINT IF EXISTS "home_page_culturas_soja_foto_id_media_id_fk";
    ALTER TABLE "home_page" DROP CONSTRAINT IF EXISTS "home_page_culturas_milho_foto_id_media_id_fk";
    ALTER TABLE "home_page" DROP CONSTRAINT IF EXISTS "home_page_culturas_algodao_foto_id_media_id_fk";

    ALTER TABLE "home_page"
      DROP COLUMN IF EXISTS "culturas_enabled",
      DROP COLUMN IF EXISTS "culturas_soja_foto_id",
      DROP COLUMN IF EXISTS "culturas_soja_stat1_numero",
      DROP COLUMN IF EXISTS "culturas_soja_stat2_numero",
      DROP COLUMN IF EXISTS "culturas_soja_stat3_numero",
      DROP COLUMN IF EXISTS "culturas_milho_foto_id",
      DROP COLUMN IF EXISTS "culturas_milho_stat1_numero",
      DROP COLUMN IF EXISTS "culturas_milho_stat2_numero",
      DROP COLUMN IF EXISTS "culturas_milho_stat3_numero",
      DROP COLUMN IF EXISTS "culturas_algodao_foto_id",
      DROP COLUMN IF EXISTS "culturas_algodao_stat1_numero",
      DROP COLUMN IF EXISTS "culturas_algodao_stat2_numero",
      DROP COLUMN IF EXISTS "culturas_algodao_stat3_numero",
      DROP COLUMN IF EXISTS "culturas_n1_valor",
      DROP COLUMN IF EXISTS "culturas_n2_valor",
      DROP COLUMN IF EXISTS "culturas_n3_valor",
      DROP COLUMN IF EXISTS "culturas_n4_valor",
      DROP COLUMN IF EXISTS "culturas_n5_valor";

    ALTER TABLE "home_page_locales"
      DROP COLUMN IF EXISTS "culturas_tag",
      DROP COLUMN IF EXISTS "culturas_titulo",
      DROP COLUMN IF EXISTS "culturas_subtitulo",
      DROP COLUMN IF EXISTS "culturas_painel_kicker",
      DROP COLUMN IF EXISTS "culturas_painel_titulo",
      DROP COLUMN IF EXISTS "culturas_painel_texto",
      DROP COLUMN IF EXISTS "culturas_kicker_cultura",
      DROP COLUMN IF EXISTS "culturas_kicker_numeros",
      DROP COLUMN IF EXISTS "culturas_soja_nome",
      DROP COLUMN IF EXISTS "culturas_soja_texto",
      DROP COLUMN IF EXISTS "culturas_soja_stat1_legenda",
      DROP COLUMN IF EXISTS "culturas_soja_stat2_legenda",
      DROP COLUMN IF EXISTS "culturas_soja_stat3_legenda",
      DROP COLUMN IF EXISTS "culturas_milho_nome",
      DROP COLUMN IF EXISTS "culturas_milho_texto",
      DROP COLUMN IF EXISTS "culturas_milho_stat1_legenda",
      DROP COLUMN IF EXISTS "culturas_milho_stat2_legenda",
      DROP COLUMN IF EXISTS "culturas_milho_stat3_legenda",
      DROP COLUMN IF EXISTS "culturas_algodao_nome",
      DROP COLUMN IF EXISTS "culturas_algodao_texto",
      DROP COLUMN IF EXISTS "culturas_algodao_stat1_legenda",
      DROP COLUMN IF EXISTS "culturas_algodao_stat2_legenda",
      DROP COLUMN IF EXISTS "culturas_algodao_stat3_legenda",
      DROP COLUMN IF EXISTS "culturas_n1_legenda",
      DROP COLUMN IF EXISTS "culturas_n1_titulo_painel",
      DROP COLUMN IF EXISTS "culturas_n1_texto",
      DROP COLUMN IF EXISTS "culturas_n2_legenda",
      DROP COLUMN IF EXISTS "culturas_n2_titulo_painel",
      DROP COLUMN IF EXISTS "culturas_n2_texto",
      DROP COLUMN IF EXISTS "culturas_n3_legenda",
      DROP COLUMN IF EXISTS "culturas_n3_titulo_painel",
      DROP COLUMN IF EXISTS "culturas_n3_texto",
      DROP COLUMN IF EXISTS "culturas_n4_legenda",
      DROP COLUMN IF EXISTS "culturas_n4_titulo_painel",
      DROP COLUMN IF EXISTS "culturas_n4_texto",
      DROP COLUMN IF EXISTS "culturas_n5_legenda",
      DROP COLUMN IF EXISTS "culturas_n5_titulo_painel",
      DROP COLUMN IF EXISTS "culturas_n5_texto";
  `)
}
