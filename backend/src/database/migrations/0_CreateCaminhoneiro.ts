import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('caminhoneiros', table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('whatsapp').notNullable();
        table.string('senha').notNullable();
        table.integer('idade').notNullable();
        table.string('doencas');
        table.string('fazAtividades').notNullable();
        table.integer('horasSono').notNullable();
        table.string('tipoTrabalho').notNullable();
        table.integer('refeicoes').notNullable();
        table.integer('pontuacao').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('caminhoneiros');
}