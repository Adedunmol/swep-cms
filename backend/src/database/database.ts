import knex from 'knex'
import config from './knexfile'

const configEnv = process.env.ENVIRONMENT === 'development' ? config.development : config.production

const db = knex(configEnv)

export default db