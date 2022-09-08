import { controller, get, post, DarukContext, middleware, inject, prefix, Next, validate } from 'daruk'
import UserModel from '../services/user'
@controller()
@prefix('/user')
class User {
  @inject('UserModel') private UserModel: UserModel

  @get('/')
  public async index(ctx: DarukContext) {
    ctx.body = 'hello world123'
  }

  @post('/add')
  public async addUser(ctx: DarukContext, next: Next) {
    let { body } = ctx.request
    await this.UserModel.insertUser(body)
    ctx.body = {
      model: true,
      success: true,
    }
    await next()
  }


  @get('/get')
  public async getUser(ctx: DarukContext, next: Next) {
    let { query } = ctx.request
    if (query.code || !(query.code instanceof String)) {
      await next()
    }
    let user = await this.UserModel.findUserByCode(query.code as string)
    ctx.body = {
      model: user,
      success: true,
    }
    await next()
  }
}