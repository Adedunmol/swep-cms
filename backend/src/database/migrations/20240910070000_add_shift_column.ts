import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("appointments", table => {
        table.text('shift').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('appointments', table => {
        table.dropColumn('shift')
    })
}

