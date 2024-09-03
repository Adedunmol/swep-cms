import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("emergencies", table => {
        table.boolean("attended_to").nullable().defaultTo(false)
    }).alterTable("appointments", table => {
        table.boolean("attended_to").nullable().defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("emergencies", table => {
        table.dropColumn("attended_to")
    }).table("appointments", table => {
        table.dropColumn("attended_to")
    })
}

