import express from 'express'
import CaminhoneirosController from './controllers/caminhoneirosController'
import DoencasController from './controllers/doencasController'

const caminhoneirosController = new CaminhoneirosController()
const doencasController = new DoencasController()

const routes = express.Router()

routes.post('/api/v1/caminhoneiro/login', caminhoneirosController.show)
routes.get('/api/v1/caminhoneiro/todos', caminhoneirosController.index)
routes.post('/api/v1/caminhoneiro', caminhoneirosController.create)

routes.get('/api/v1/doencas/todos', doencasController.index)

export default routes