import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("doctors", table => {
        table.dropColumn('phone_number')
        table.string('office_number').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('doctors', table => {
        table.dropColumn('office_number')
        table.string('phone_number').notNullable()
    })
}

