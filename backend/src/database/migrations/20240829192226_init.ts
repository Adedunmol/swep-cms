import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('email').notNullable().unique()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('password').notNullable()
        table.string('role').notNullable()
    }).createTable('appointments', table => {
        table.increments('id')
        table.string('email').notNullable()
        table.string('available_day').notNullable()
        table.string('available_month').notNullable()
        table.string('phone_number').notNullable()
        table.integer('doctor_id')
        table.foreign('doctor_id').references('users.id')
    }).createTable('emergencies', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('address').notNullable()
        table.string('problem').notNullable()
        table.boolean('first_aid').nullable()
        table.boolean('online_med').nullable()
        table.boolean('ambulance').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
                .dropTable('users')
                .dropTable('appointments')
                .dropTable('emergencies')
}

