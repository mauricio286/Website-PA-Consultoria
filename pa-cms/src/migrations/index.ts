import * as migration_20260711_054145_add_color_and_layout from './20260711_054145_add_color_and_layout';
import * as migration_20260715_182629_add_new_pages_and_cycle from './20260715_182629_add_new_pages_and_cycle';

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
];
