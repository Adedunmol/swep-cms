import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rosters', table => {
        table.increments('id')
        table.integer('doctor_id').notNullable()
        table.date('date').notNullable()
        table.enum('shift', ['morning', 'afternoon', 'night']).notNullable()
        table.foreign('doctor_id').references('doctors.id')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rosters')
}

