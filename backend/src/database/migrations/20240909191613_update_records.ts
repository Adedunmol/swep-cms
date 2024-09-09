import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("records", table => {
        table.string('critical_illness').nullable()
        table.string('physical_disabilities').nullable()
        table.string('emergency_phone_number').nullable()
        table.string('substance_use').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('records', table => {
        table.dropColumn('critical_illness')
        table.dropColumn('physical_disabilities')
        table.dropColumn('emergency_phone_number')
        table.dropColumn('substance_use')
    })
}

