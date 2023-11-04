import fastifyStatic from '@fastify/static'
import view from '@fastify/view'
import fastify from 'fastify'
import handlebars from 'handlebars'
import { join } from 'path'
import cors from '@fastify/cors'
import { routes } from './http/routes/routes'
import multipart from '@fastify/multipart'

export const app = fastify({
    logger: false,
})


app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(multipart)

app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public')
})

app.register(view, {
    engine: {
        handlebars
    },
    templates: join('templates')
})

app.register(routes)


