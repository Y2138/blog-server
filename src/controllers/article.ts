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
      model: true,
      success: true,
    }
    // await next()
  }

  @post('/getArticle/list')
  public async articleList(ctx: DarukContext, next: Next) {
    let { body } = ctx.request
    let { model, totalCount } = await this.ArticleModel.findArticleList(body)
    ctx.body = {
      model,
      totalCount,
      success: true
    }
    await next()
  }

  @get('/get')
  public async getArticle(ctx: DarukContext, next: Next) {
    let { query } = ctx.request
    if (!query.id) {
      throw new ParameterException('id不能为空')
    }
    let article = await this.ArticleModel.findArticleById(Number(query.id))
    ctx.body = {
      model: article,
      success: true,
    }
    await next()
  }
}