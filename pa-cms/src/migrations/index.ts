import * as migration_20260711_054145_add_color_and_layout from './20260711_054145_add_color_and_layout';
import * as migration_20260715_182629_add_new_pages_and_cycle from './20260715_182629_add_new_pages_and_cycle';
import * as migration_20260730_192000_add_video_fields_to_home_page from './20260730_192000_add_video_fields_to_home_page';
import * as migration_20261021_120000_localize_hero_media from './20261021_120000_localize_hero_media';
import * as migration_20261021_160000_add_hero_visual_controls from './20261021_160000_add_hero_visual_controls';

export const migrations = [
  {
    up: migration_20260711_054145_add_color_and_layout.up,
    down: migration_20260711_054145_add_color_and_layout.down,
    name: '20260711_054145_add_color_and_layout',
  },
  {
    up: migration_20260715_182629_add_new_pages_and_cycle.up,
    down: migration_20260715_182629_add_new_pages_and_cycle.down,
    name: '20260715_182629_add_new_pages_and_cycle'
  },
  {
    up: migration_20260730_192000_add_video_fields_to_home_page.up,
    down: migration_20260730_192000_add_video_fields_to_home_page.down,
    name: '20260730_192000_add_video_fields_to_home_page'
  },
  {
    up: migration_20261021_120000_localize_hero_media.up,
    down: migration_20261021_120000_localize_hero_media.down,
    name: '20261021_120000_localize_hero_media'
  },
  {
    up: migration_20261021_160000_add_hero_visual_controls.up,
    down: migration_20261021_160000_add_hero_visual_controls.down,
    name: '20261021_160000_add_hero_visual_controls'
  },
];

