import { HttpException } from "../glues/http-exception"

import { config } from "../config/config"

import {
  Daruk,
  defineMiddleware,
  injectable,
  MiddlewareClass,
  Next,
  DarukContext,
} from "daruk"

@defineMiddleware('catch-error')
class CatchError implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      try {
        await next()
      } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = config.environment === "dev"
        if (isDev && !isHttpException) {
          throw error
        }
        if (isHttpException) {
          // TODO
          ctx.body = {
            errMsg: error.errMsg,
            errorCode: error.errorCode,
            request: `${ctx.method} ${ctx.path}`
          }
          ctx.response.status = error.code
        } else {
          ctx.body = {
            msg: '未知错误！',
            error_code: 9999,
            request: `${ctx.method} ${ctx.path}`
          }
          ctx.response.status = 500
        }
      }
    }
  }
}