import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Chave para exibir/ocultar a seção "Estrutura" (Metodologia / Pilares) da Home.
// Nasce DESLIGADA (false): a seção "Culturas" ocupa o lugar dela. O conteúdo da Metodologia é preservado.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "methodology_enabled" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "methodology_enabled";
  `)
}
