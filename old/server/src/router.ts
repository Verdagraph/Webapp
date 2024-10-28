import type { FastifyInstance } from "fastify";
import userRouter from "../../../server/src/users/controllers";

export const registerRouters = (app: FastifyInstance) => {
    app.register(userRouter, {prefix: 'users/'})
}
export default registerRouters