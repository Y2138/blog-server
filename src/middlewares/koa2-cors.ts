// const cors = require("koa2/cors")
import cors = require("koa2-cors")

import { Daruk, defineMiddleware, injectable, MiddlewareClass } from "daruk"

@defineMiddleware("koa2-cors")
class Koa2Cors implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    daruk.app.use(cors())
  }
}