import { DarukContext, inject, injectable, service } from 'daruk'
import Db from '../glues/connection'
import Article from '../entity/article'

interface anyObj {
  [propsName: string]: any
}
interface PageModel {
  model: anyObj,
  pageIndex: number,
  pageSize: number
}
@service()
export default class ArticleModel {
  public ctx!: DarukContext
  @inject('Db') public Db!: Db
  public async findArticleById(id: number) {
    let repository = await this.Db.getRepository(Article)
    let art = await repository.findOne({
      where: {
        id
      }
    })
    return art
  }

  public async findArticleByTitle(param: PageModel) {
    let repository = await this.Db.getRepository(Article)
    let { model, pageIndex, pageSize } = param
    let { title = '' } = model
    let total = await repository.find({
      where: {
        title: new RegExp(`${title}`)
      }
    })
    let skipCount = pageSize * (pageIndex - 1)
    let art = await repository.find({
      where: {
        title: new RegExp(`${title}`)
      },
      take: pageSize || 10, // 页数
      skip: skipCount > total.length ? skipCount - pageSize : skipCount // 偏移量
    })
    console.log('---->', title, total, art)
    return {
      model: art,
      totalCount: total.length,
      pageIndex,
      pageSize
    }
  }

  public async findArticleList(model) {
    let repository = await this.Db.getRepository(Article)
    let [articleList, count] = await repository.findAndCount(model)
    return {
      model: articleList,
      totalCount: count
    }
  }
  
  public async insertArticle(article) {
    let repository = await this.Db.getRepository(Article)
    let art = await repository.create({ ...article })
    console.log('art: ', art)
    return repository.save(art)
  }
}