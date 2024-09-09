import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('records', table => {
        table.increments('id')
        table.integer('age').nullable()
        table.string('genotype').nullable()
        table.string('blood_type').nullable()
        table.integer('user_id').notNullable().unique()
        table.foreign('user_id').references('users.id')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('records')
}

