import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.dropTable('appointments').createTable('appointments', table => {
        table.increments('id')
        table.integer('user_id').notNullable()
        table.integer('doctor_id').notNullable()
        table.date('date').notNullable()
        table.time('start_time').notNullable()
        table.time('end_time').notNullable()
        table.foreign('user_id').references('users.id')
        table.foreign('doctor_id').references('doctors.id')
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('appointments')
}

