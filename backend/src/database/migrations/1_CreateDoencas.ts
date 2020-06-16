import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('doencas', table =>{
        table.increments('idDoenca').primary();
        table.string('nomeDoenca').notNullable();
        
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('doencas');
}