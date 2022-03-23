import * as express from 'express';
import * as cors from 'cors';
import loginRoute from './routes/loginRouter';
import clubsRouter from './routes/clubRouter';
import matchRouter from './routes/matchRouter';
import leaderboardRouter from './routes/LeaderBoardRouter';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/login', loginRoute);
    this.app.use('/clubs', clubsRouter);
    this.app.use('/matchs', matchRouter);
    this.app.use('/leaderboard', leaderboardRouter);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Escutando na porta: ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
