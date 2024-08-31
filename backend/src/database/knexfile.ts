import type { Knex } from "knex";

// Update with your config settings.
import path from "path";

require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!!,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
  },
}
};

export default config;
