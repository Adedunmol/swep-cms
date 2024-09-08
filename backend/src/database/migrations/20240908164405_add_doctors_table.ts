import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('doctors', table => {
        table.increments('id')
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('password').nullable()
        table.string('phone_number').notNullable()
        table.string('role').notNullable().defaultTo('doctor')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('doctors')
}

