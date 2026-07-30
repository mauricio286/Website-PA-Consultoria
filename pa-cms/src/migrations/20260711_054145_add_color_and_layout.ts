import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pt', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('open', 'paused', 'closed');
  CREATE TYPE "public"."enum_home_page_stats_color" AS ENUM('peach', 'dark', 'lime', 'paleGreen', 'bronze', 'forest', 'white', 'gray', 'softYellow', 'softBlue', 'custom');
  CREATE TYPE "public"."enum_home_page_banner_text_align" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_home_page_stats_title_align" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_home_page_stats_subtext_align" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_home_page_methodology_title_align" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"cover_image_id" integer,
  	"cover_image_tablet_id" integer,
  	"cover_image_mobile_id" integer,
  	"illustration_image_id" integer,
  	"show_illustration" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"left_content" jsonb,
  	"bottom_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "jobs_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "jobs_requirements_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "jobs_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "jobs_responsibilities_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"status" "enum_jobs_status" DEFAULT 'open' NOT NULL,
  	"visible" boolean DEFAULT true,
  	"opening_date" timestamp(3) with time zone,
  	"closing_date" timestamp(3) with time zone,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"author_description" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "galleries_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "galleries_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "galleries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galleries_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "map_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar,
  	"area" varchar,
  	"description" varchar,
  	"position_x" numeric NOT NULL,
  	"position_y" numeric NOT NULL,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"services_id" integer,
  	"jobs_id" integer,
  	"media_id" integer,
  	"testimonials_id" integer,
  	"galleries_id" integer,
  	"map_locations_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"icon_id" integer,
  	"color" "enum_home_page_stats_color",
  	"custom_bg_color" varchar,
  	"custom_text_color" varchar
  );
  
  CREATE TABLE "home_page_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_methodology_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_methodology_cards_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_map_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_tablet_id" integer,
  	"hero_image_mobile_id" integer,
  	"intro_image_id" integer,
  	"banner_text_align" "enum_home_page_banner_text_align" DEFAULT 'center',
  	"banner_text_accent_color" varchar DEFAULT '#e1fe00',
  	"banner_image_id" integer,
  	"stats_title_accent_color" varchar DEFAULT '#88a668',
  	"stats_title_align" "enum_home_page_stats_title_align" DEFAULT 'left',
  	"stats_subtext_align" "enum_home_page_stats_subtext_align" DEFAULT 'left',
  	"methodology_title_align" "enum_home_page_methodology_title_align" DEFAULT 'left',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"intro_title" varchar,
  	"intro_text" jsonb,
  	"intro_cta_label" varchar,
  	"intro_cta_url" varchar,
  	"banner_text" varchar,
  	"banner_text_accent" varchar,
  	"stats_tag" varchar,
  	"stats_title" varchar,
  	"stats_title_accent" varchar,
  	"stats_subtext" varchar,
  	"methodology_badge" varchar DEFAULT 'Estrutura',
  	"methodology_title" varchar DEFAULT 'Pilares Metodológicos',
  	"map_tag" varchar,
  	"map_title" varchar,
  	"map_description" varchar,
  	"gallery_title" varchar,
  	"gallery_subtitle" varchar,
  	"testimonials_tag" varchar,
  	"testimonials_title" varchar,
  	"testimonials_title_accent" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "about_page_timeline_locales" (
  	"tag" varchar NOT NULL,
  	"text" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_tablet_id" integer,
  	"hero_image_mobile_id" integer,
  	"subtitle_color" varchar DEFAULT '#88a668',
  	"video_section_title_accent_color" varchar DEFAULT '#88a668',
  	"institutional_video_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"intro_tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"intro_text" jsonb,
  	"commitment_title" varchar,
  	"commitment_text" jsonb,
  	"vision_title" varchar,
  	"vision_text" jsonb,
  	"values_title" varchar,
  	"values_text" jsonb,
  	"video_section_tag" varchar,
  	"video_section_title" varchar,
  	"video_section_title_accent" varchar,
  	"timeline_tag" varchar,
  	"timeline_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "services_page_services_cards_locales" (
  	"title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_ecosystem_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_ecosystem_cards_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_tablet_id" integer,
  	"hero_image_mobile_id" integer,
  	"services_subtitle_color" varchar DEFAULT '#88a668',
  	"ecosystem_subtitle_color" varchar DEFAULT '#88a668',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_locales" (
  	"services_badge" varchar,
  	"services_title" varchar,
  	"services_subtitle" varchar,
  	"services_description" varchar,
  	"ecosystem_badge" varchar,
  	"ecosystem_title" varchar,
  	"ecosystem_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "careers_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_tablet_id" integer,
  	"hero_image_mobile_id" integer,
  	"title_highlight_color" varchar DEFAULT '#88a668',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_page_locales" (
  	"title" varchar,
  	"title_highlight" varchar,
  	"intro_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_settings_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "contact_settings_addresses_locales" (
  	"title" varchar NOT NULL,
  	"address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_tablet_id" integer,
  	"hero_image_mobile_id" integer,
  	"main_email" varchar,
  	"hr_email" varchar,
  	"form_recipient_email" varchar,
  	"career_recipient_email" varchar,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_settings_locales" (
  	"form_title" varchar DEFAULT 'Fale conosco',
  	"form_description" varchar DEFAULT 'Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores soluções para sua realidade. Entre em contato conosco. Será um prazer conversar com você.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_settings_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"maps_url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_addresses_locales" (
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_tablet_id_media_id_fk" FOREIGN KEY ("cover_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_mobile_id_media_id_fk" FOREIGN KEY ("cover_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_illustration_image_id_media_id_fk" FOREIGN KEY ("illustration_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_requirements" ADD CONSTRAINT "jobs_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_requirements_locales" ADD CONSTRAINT "jobs_requirements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs_requirements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_responsibilities" ADD CONSTRAINT "jobs_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_responsibilities_locales" ADD CONSTRAINT "jobs_responsibilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs_responsibilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_images" ADD CONSTRAINT "galleries_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries_images" ADD CONSTRAINT "galleries_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_images_locales" ADD CONSTRAINT "galleries_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_locales" ADD CONSTRAINT "galleries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_locations_fk" FOREIGN KEY ("map_locations_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_logos" ADD CONSTRAINT "home_page_hero_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_logos" ADD CONSTRAINT "home_page_hero_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stats" ADD CONSTRAINT "home_page_stats_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_stats" ADD CONSTRAINT "home_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stats_locales" ADD CONSTRAINT "home_page_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_methodology_cards" ADD CONSTRAINT "home_page_methodology_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_methodology_cards" ADD CONSTRAINT "home_page_methodology_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_methodology_cards" ADD CONSTRAINT "home_page_methodology_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_methodology_cards_locales" ADD CONSTRAINT "home_page_methodology_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_methodology_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_map_logos" ADD CONSTRAINT "home_page_map_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_map_logos" ADD CONSTRAINT "home_page_map_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_timeline" ADD CONSTRAINT "about_page_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_timeline" ADD CONSTRAINT "about_page_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_timeline_locales" ADD CONSTRAINT "about_page_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_services_cards" ADD CONSTRAINT "services_page_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_services_cards_locales" ADD CONSTRAINT "services_page_services_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_services_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_ecosystem_cards" ADD CONSTRAINT "services_page_ecosystem_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_ecosystem_cards" ADD CONSTRAINT "services_page_ecosystem_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_ecosystem_cards_locales" ADD CONSTRAINT "services_page_ecosystem_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_ecosystem_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page_locales" ADD CONSTRAINT "careers_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_addresses" ADD CONSTRAINT "contact_settings_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_addresses_locales" ADD CONSTRAINT "contact_settings_addresses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings_addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings" ADD CONSTRAINT "contact_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_settings" ADD CONSTRAINT "contact_settings_hero_image_tablet_id_media_id_fk" FOREIGN KEY ("hero_image_tablet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_settings" ADD CONSTRAINT "contact_settings_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_addresses" ADD CONSTRAINT "footer_settings_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_addresses_locales" ADD CONSTRAINT "footer_settings_addresses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_addresses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_cover_image_idx" ON "services" USING btree ("cover_image_id");
  CREATE INDEX "services_cover_image_tablet_idx" ON "services" USING btree ("cover_image_tablet_id");
  CREATE INDEX "services_cover_image_mobile_idx" ON "services" USING btree ("cover_image_mobile_id");
  CREATE INDEX "services_illustration_image_idx" ON "services" USING btree ("illustration_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "jobs_requirements_order_idx" ON "jobs_requirements" USING btree ("_order");
  CREATE INDEX "jobs_requirements_parent_id_idx" ON "jobs_requirements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "jobs_requirements_locales_locale_parent_id_unique" ON "jobs_requirements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "jobs_responsibilities_order_idx" ON "jobs_responsibilities" USING btree ("_order");
  CREATE INDEX "jobs_responsibilities_parent_id_idx" ON "jobs_responsibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "jobs_responsibilities_locales_locale_parent_id_unique" ON "jobs_responsibilities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE UNIQUE INDEX "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "galleries_images_order_idx" ON "galleries_images" USING btree ("_order");
  CREATE INDEX "galleries_images_parent_id_idx" ON "galleries_images" USING btree ("_parent_id");
  CREATE INDEX "galleries_images_image_idx" ON "galleries_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "galleries_images_locales_locale_parent_id_unique" ON "galleries_images_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "galleries_slug_idx" ON "galleries" USING btree ("slug");
  CREATE INDEX "galleries_updated_at_idx" ON "galleries" USING btree ("updated_at");
  CREATE INDEX "galleries_created_at_idx" ON "galleries" USING btree ("created_at");
  CREATE UNIQUE INDEX "galleries_locales_locale_parent_id_unique" ON "galleries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "map_locations_updated_at_idx" ON "map_locations" USING btree ("updated_at");
  CREATE INDEX "map_locations_created_at_idx" ON "map_locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("galleries_id");
  CREATE INDEX "payload_locked_documents_rels_map_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("map_locations_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_logos_order_idx" ON "home_page_hero_logos" USING btree ("_order");
  CREATE INDEX "home_page_hero_logos_parent_id_idx" ON "home_page_hero_logos" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_logos_logo_idx" ON "home_page_hero_logos" USING btree ("logo_id");
  CREATE INDEX "home_page_stats_order_idx" ON "home_page_stats" USING btree ("_order");
  CREATE INDEX "home_page_stats_parent_id_idx" ON "home_page_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_stats_icon_idx" ON "home_page_stats" USING btree ("icon_id");
  CREATE UNIQUE INDEX "home_page_stats_locales_locale_parent_id_unique" ON "home_page_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_methodology_cards_order_idx" ON "home_page_methodology_cards" USING btree ("_order");
  CREATE INDEX "home_page_methodology_cards_parent_id_idx" ON "home_page_methodology_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_methodology_cards_icon_idx" ON "home_page_methodology_cards" USING btree ("icon_id");
  CREATE INDEX "home_page_methodology_cards_image_idx" ON "home_page_methodology_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_page_methodology_cards_locales_locale_parent_id_unique" ON "home_page_methodology_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_map_logos_order_idx" ON "home_page_map_logos" USING btree ("_order");
  CREATE INDEX "home_page_map_logos_parent_id_idx" ON "home_page_map_logos" USING btree ("_parent_id");
  CREATE INDEX "home_page_map_logos_logo_idx" ON "home_page_map_logos" USING btree ("logo_id");
  CREATE INDEX "home_page_gallery_images_order_idx" ON "home_page_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_gallery_images_parent_id_idx" ON "home_page_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_gallery_images_image_idx" ON "home_page_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_hero_image_tablet_idx" ON "home_page" USING btree ("hero_image_tablet_id");
  CREATE INDEX "home_page_hero_image_mobile_idx" ON "home_page" USING btree ("hero_image_mobile_id");
  CREATE INDEX "home_page_intro_image_idx" ON "home_page" USING btree ("intro_image_id");
  CREATE INDEX "home_page_banner_image_idx" ON "home_page" USING btree ("banner_image_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_timeline_order_idx" ON "about_page_timeline" USING btree ("_order");
  CREATE INDEX "about_page_timeline_parent_id_idx" ON "about_page_timeline" USING btree ("_parent_id");
  CREATE INDEX "about_page_timeline_image_idx" ON "about_page_timeline" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_timeline_locales_locale_parent_id_unique" ON "about_page_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_hero_image_tablet_idx" ON "about_page" USING btree ("hero_image_tablet_id");
  CREATE INDEX "about_page_hero_image_mobile_idx" ON "about_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_services_cards_order_idx" ON "services_page_services_cards" USING btree ("_order");
  CREATE INDEX "services_page_services_cards_parent_id_idx" ON "services_page_services_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_page_services_cards_locales_locale_parent_id_unique" ON "services_page_services_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_ecosystem_cards_order_idx" ON "services_page_ecosystem_cards" USING btree ("_order");
  CREATE INDEX "services_page_ecosystem_cards_parent_id_idx" ON "services_page_ecosystem_cards" USING btree ("_parent_id");
  CREATE INDEX "services_page_ecosystem_cards_image_idx" ON "services_page_ecosystem_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_page_ecosystem_cards_locales_locale_parent_id_uniqu" ON "services_page_ecosystem_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "services_page_hero_image_tablet_idx" ON "services_page" USING btree ("hero_image_tablet_id");
  CREATE INDEX "services_page_hero_image_mobile_idx" ON "services_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "services_page_locales_locale_parent_id_unique" ON "services_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_page_hero_image_idx" ON "careers_page" USING btree ("hero_image_id");
  CREATE INDEX "careers_page_hero_image_tablet_idx" ON "careers_page" USING btree ("hero_image_tablet_id");
  CREATE INDEX "careers_page_hero_image_mobile_idx" ON "careers_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "careers_page_locales_locale_parent_id_unique" ON "careers_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_settings_addresses_order_idx" ON "contact_settings_addresses" USING btree ("_order");
  CREATE INDEX "contact_settings_addresses_parent_id_idx" ON "contact_settings_addresses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_settings_addresses_locales_locale_parent_id_unique" ON "contact_settings_addresses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_settings_hero_image_idx" ON "contact_settings" USING btree ("hero_image_id");
  CREATE INDEX "contact_settings_hero_image_tablet_idx" ON "contact_settings" USING btree ("hero_image_tablet_id");
  CREATE INDEX "contact_settings_hero_image_mobile_idx" ON "contact_settings" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "contact_settings_locales_locale_parent_id_unique" ON "contact_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_settings_addresses_order_idx" ON "footer_settings_addresses" USING btree ("_order");
  CREATE INDEX "footer_settings_addresses_parent_id_idx" ON "footer_settings_addresses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_settings_addresses_locales_locale_parent_id_unique" ON "footer_settings_addresses_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "jobs_requirements" CASCADE;
  DROP TABLE "jobs_requirements_locales" CASCADE;
  DROP TABLE "jobs_responsibilities" CASCADE;
  DROP TABLE "jobs_responsibilities_locales" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "galleries_images" CASCADE;
  DROP TABLE "galleries_images_locales" CASCADE;
  DROP TABLE "galleries" CASCADE;
  DROP TABLE "galleries_locales" CASCADE;
  DROP TABLE "map_locations" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_logos" CASCADE;
  DROP TABLE "home_page_stats" CASCADE;
  DROP TABLE "home_page_stats_locales" CASCADE;
  DROP TABLE "home_page_methodology_cards" CASCADE;
  DROP TABLE "home_page_methodology_cards_locales" CASCADE;
  DROP TABLE "home_page_map_logos" CASCADE;
  DROP TABLE "home_page_gallery_images" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "about_page_timeline" CASCADE;
  DROP TABLE "about_page_timeline_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "services_page_services_cards" CASCADE;
  DROP TABLE "services_page_services_cards_locales" CASCADE;
  DROP TABLE "services_page_ecosystem_cards" CASCADE;
  DROP TABLE "services_page_ecosystem_cards_locales" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_locales" CASCADE;
  DROP TABLE "careers_page" CASCADE;
  DROP TABLE "careers_page_locales" CASCADE;
  DROP TABLE "contact_settings_addresses" CASCADE;
  DROP TABLE "contact_settings_addresses_locales" CASCADE;
  DROP TABLE "contact_settings" CASCADE;
  DROP TABLE "contact_settings_locales" CASCADE;
  DROP TABLE "footer_settings_addresses" CASCADE;
  DROP TABLE "footer_settings_addresses_locales" CASCADE;
  DROP TABLE "footer_settings" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum_home_page_stats_color";
  DROP TYPE "public"."enum_home_page_banner_text_align";
  DROP TYPE "public"."enum_home_page_stats_title_align";
  DROP TYPE "public"."enum_home_page_stats_subtext_align";
  DROP TYPE "public"."enum_home_page_methodology_title_align";`)
}
