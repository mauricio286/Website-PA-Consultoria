import pg from 'pg';

const connectionString = process.env.DATABASE_URI;

if (!connectionString) {
  console.log('No DATABASE_URI found, skipping cleanup.');
  process.exit(0);
}

async function run() {
  console.log('Connecting to database to check for dev mode migrations...');
  const { Client } = pg;
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    // 1. Delete dev-mode migrations
    console.log('Deleting dev-mode migrations (batch = -1)...');
    const deleteRes = await client.query('DELETE FROM payload_migrations WHERE batch = -1;');
    console.log(`Successfully deleted dev-mode migrations. Rows affected: ${deleteRes.rowCount}`);
    
    // 2. Baseline the initial migration
    const initialMigration = '20260711_054145_add_color_and_layout';
    const checkRes = await client.query('SELECT id FROM payload_migrations WHERE name = $1', [initialMigration]);
    if (checkRes.rowCount === 0) {
      console.log(`Baselining: inserting record for ${initialMigration}...`);
      await client.query('INSERT INTO payload_migrations (name, batch) VALUES ($1, 1)', [initialMigration]);
      console.log('Baselining complete.');
    } else {
      console.log(`Migration ${initialMigration} is already recorded in the database.`);
    }

  } catch (err) {
    console.error('Error during database preparation, but continuing:', err);
  } finally {
    try {
      await client.end();
    } catch (e) {
      // Ignore end errors
    }
  }
}

run();
