import {Request, Response} from 'express'
import knex from '../database/connection'

class DoencasController{
    async index(request: Request, response: Response){
        const doencas = await knex('doencas').select('*')

        return response.json(doencas) 
    }
}

export default DoencasController