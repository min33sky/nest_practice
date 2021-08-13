import * as express from 'express';
import CatsRouter from './cats/cats.route';

/**
 * 싱글톤 패턴 적용
 */
class Server {
  public app: express.Application;
  private PORT = 8000;

  constructor() {
    const app = express();
    this.app = app;
  }

  // 라우팅 미들웨어 설정
  private setRoute() {
    this.app.use(CatsRouter);
  }

  // 미들웨어 설정
  private setMiddleware() {
    //* 로깅 미들웨어
    this.app.use((req, res, next) => {
      console.log(req.headers['user-agent']);
      console.log('This is Logging Middleware');
      next();
    });

    //* JSON 파싱 미들웨어
    this.app.use(express.json());

    //* 라우팅 미들웨어
    this.setRoute();

    //* 404 미들웨어
    this.app.use((req, res, next) => {
      console.log('This is Error Middelware');
      res.send({
        error: '404 Not Found Error',
      });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(this.PORT, () =>
      console.log(`Example app listening at http://localhost:${this.PORT}`)
    );
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
