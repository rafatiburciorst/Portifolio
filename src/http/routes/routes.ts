import { FastifyInstance } from 'fastify'

import { Controller } from '../controllers/controller'

export async function routes(app: FastifyInstance) {
    app.get('/', Controller.index)
    app.post('/form', Controller.contact)
}