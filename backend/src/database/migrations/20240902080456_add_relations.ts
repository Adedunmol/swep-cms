import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("emergencies", table => {
        table.integer("user_id").notNullable()
        table.foreign("user_id").references("users.id")
    }).alterTable("appointments", table => {
        table.integer("user_id").notNullable()
        table.foreign("user_id").references("users.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("emergencies", table => {
        table.dropColumn("user_id")
    }).table("appointments", table => {
        table.dropColumn("user_id")
    })
}

