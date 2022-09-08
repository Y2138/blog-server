import { DarukContext, inject, injectable, service } from 'daruk'
import Db from '../glues/connection'
import User from '../entity/user'
import { UserInf } from '../entity/user'

@service()
export default class UserModel {
  public ctx!: DarukContext
  @inject('Db') public Db!: Db
  public async findUserByCode(no: string) {
    let repository = await this.Db.getRepository(User)
    let user = repository.findOne({
      where: {
        code: ''
      }
    })
    return user
  }
  
  public async insertUser(userModel: UserInf) {
    console.log('userModel: ', userModel)
    let EntityManager = await this.Db.getManager()
    let user = await EntityManager.create(User, userModel)
    return EntityManager.insert(User, user)
  }
}