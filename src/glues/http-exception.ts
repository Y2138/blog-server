export class HttpException extends Error {
  errorCode: number
  code: number
  errMsg: string | string[]
  constructor(errMsg = '服务器异常', errorCode = 10000, code = 500) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.errMsg = errMsg
  }
}

export class ParameterException extends HttpException {
  constructor(errMsg = '参数错误', errorCode = 10001, code = 500) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.errMsg = errMsg
  }
}

export class AuthFailed extends HttpException {
  constructor(errMsg = '授权失败', errorCode = 10004, code = 401) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.errMsg = errMsg
  }
}

export class Forbidden extends HttpException {
  constructor(errMsg = "禁止访问", errorCode = 10005, code = 403) {
    super();
    this.code = code;
    this.errMsg = errMsg;
    this.errorCode = errorCode;
  }
}

export class NotFound extends HttpException {
  constructor(errMsg = "404找不到", errorCode = 10006) {
    super();
    this.code = 404;
    this.errMsg = errMsg;
    this.errorCode = errorCode;
  }
}

export class Existing extends HttpException {
  constructor(errMsg = "已存在", errorCode = 10007, code = 412) {
    super();
    this.code = code;
    this.errMsg = errMsg;
    this.errorCode = errorCode;
  }
}


export const errors = {
  HttpException,
  ParameterException,
  AuthFailed,
  NotFound,
  Forbidden,
  Existing,
}