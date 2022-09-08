const path = require('path')

import { Connection, createConnection, EntityTarget } from 'typeorm'

import { fluentProvide } from 'daruk'
import { config } from '../config/config'

const { dbName, host, port, user, password, charset } = config.database
import User from '../entity/user'
import Article from '../entity/article'

@(fluentProvide('Db').inSingletonScope().done())
export default class Db {
  public connection: Connection

  // 获取数据库连接
  public async getConnection() {
    if (!this.connection) {
      this.connection = await createConnection({
        type: 'mongodb',
        port,
        host,
        database: dbName,
        entities: [User, Article],

        // username: user,
        // password,
        // timezone: 'local',
        // entities: [],
        // synchronize: true,
        // charset,
        // logging: process.env.NODE_ENV === 'dev'
      });
    }
    return this.connection
  }

  public async getRepository<entity>(target: EntityTarget<entity>) {
    let c = await this.getConnection()
    return c.getRepository(target)
  }
  public async getManager() {
    let c = await this.getConnection()
    return c.manager
  }
}