import knex from 'knex'
import config from './knexfile'

const db = knex(config[process.env.ENVIRONMENT || "development"])

export default db