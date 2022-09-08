import { DarukContext, inject, injectable, service } from 'daruk'
import Db from '../glues/connection'
import Article from '../entity/article'

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