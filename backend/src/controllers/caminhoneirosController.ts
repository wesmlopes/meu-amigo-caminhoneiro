import {Request, Response} from 'express'
import knex from '../database/connection'

import PasswordCrypt from '../utils/passwordCrypt'


const passwordCrypt = new PasswordCrypt()

class caminhoneirosController{
    async show(request: Request, response: Response){
        const {
            whatsapp,
            senha
        } = request.body
        console.log(whatsapp)
        const caminhoneiro = await knex('caminhoneiros').where('whatsapp', whatsapp).first()
        console.log(caminhoneiro)
        if(!caminhoneiro){
            return response.json({
                status: 'WHATSAPPNOTEXIST',
                message: 'Whatsapp Inexistente'
            })
        }

        const passwordcompare = passwordCrypt.ComparaSenha(senha, caminhoneiro.senha)

        if(!passwordcompare){
            return response.json({
                status: 'PASSWORDNOTTRUE',
                message: 'Senha incorreta'
            })
        }

        return response.json({
            ...caminhoneiro,
            message: "Sucesso",
            status: "SUCCESS"
        })
    }

    async index(request: Request, response: Response){
        const caminhoneiros = await knex('caminhoneiros').select('*')

        return response.json(caminhoneiros) 
    }

    async create(request: Request, response: Response){
        const {
            nome,
            whatsapp,
            senha,
            idade,
            doencas,
            fazAtividades,
            horasSono,
            tipoTrabalho,
            refeicoes
        } = request.body

        const caminhoneiro ={
            nome,
            whatsapp,
            senha: passwordCrypt.CripografaSenha(senha),
            idade,
            doencas,
            fazAtividades,
            horasSono,
            tipoTrabalho,
            refeicoes
        }

        const insertedId = await knex('caminhoneiros').insert(caminhoneiro)

        return response.json({
            id:insertedId[0],
            ...caminhoneiro
        })
    }
}

export default caminhoneirosController