import { controller, get, post, DarukContext, middleware, inject, prefix, Next, validate } from 'daruk'
import { ParameterException } from '../glues/http-exception'
import ArticleModel from '../services/article'
@controller()
@prefix('/article')
class Article {
  @inject('ArticleModel') private ArticleModel: ArticleModel

  @post('/add')
  @validate({
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      required: true
    }
  })
  public async addArticle(ctx: DarukContext, next: Next) {
    let { body } = ctx.request
    await this.ArticleModel.insertArticle(body)
    ctx.body = {
      success: true,
      model: true,
    }
    // await next()
  }

  @get('/get')
  public async getArticle(ctx: DarukContext, next: Next) {
    let { query } = ctx.request
    if (!query.id) {
      throw new ParameterException('id不能为空')
    }
    let article = await this.ArticleModel.findArticleById(Number(query.id))
    ctx.body = {
      success: true,
      model: article,
    }
    await next()
  }
  
  @post('/getArticle/list')
  public async findArticle(ctx: DarukContext, next: Next) {
    let { body = {} } = ctx.request
    let { model = {}, pageIndex = 1, pageSize = 10, } = body.data || {}
    if (!model) {
      throw new ParameterException('参数异常')  
    }
    console.log('-->', body, model, pageIndex, pageSize)
    let res = await this.ArticleModel.findArticleByTitle({
      model,
      pageIndex,
      pageSize
    })
    ctx.body = {
      success: true,
      ...res
    }
    await next()
  }
}