import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('rosters', table => {
        table.enum('shift', ['morning', 'afternoon', 'evening']).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("rosters", table => {
        table.dropColumn('shift')
    })}

