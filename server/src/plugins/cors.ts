import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'
import env from 'env'
export const registerCors = (app: FastifyInstance) => {
	app.register(cors, {
        origin: env.CLIENT_BASE_URL,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type', 
            'Authorization', 
            'Set-Cookie', 
            'Cookie'
        ],
        exposedHeaders: [
            'Set-Cookie', 
            'Authorization'
        ]
    })
};