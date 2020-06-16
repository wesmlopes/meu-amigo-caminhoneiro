import Knex from 'knex'

export async function seed(knex: Knex){
    await knex('doencas').insert([
        { nomeDoenca: 'Hipertensão'},
        { nomeDoenca: 'Diabetes'},
        { nomeDoenca: 'Colesterol alto'},
        { nomeDoenca: 'Dores musculares'},
        { nomeDoenca: 'Estresse'},
        { nomeDoenca: 'Obesidade'},
    ])
}