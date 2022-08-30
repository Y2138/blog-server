import { DarukServer } from 'daruk'

(async () => {
  const myapp = DarukServer({
    rootPath: __dirname,
    middlewareOrder: ['koa2-cors', 'catch-error'],
    validateOptions: {
      error: true, // 验证器配置，error标识是否抛出错误
    }
  });

  let port = process.env.NODE_ENV !== 'production' ? 3000 : 3001

  await myapp.loadFile('./middlewares')
  await myapp.loadFile('./glues')
  await myapp.loadFile('./controllers')
  await myapp.loadFile('./services')


  await myapp.binding()

  myapp.listen(port)
})()