/*Imports*/
import express, { Request,Response } from "express";
import httpError, { HttpError } from "http-errors";
import {NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { indexRouter } from "./routes/index";
import { usersRouter } from './routes/users';
import {dbInit} from "./config/sequelize/initialize";

dbInit()
    .catch(err => {
      console.log(err);
    })

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res:Response, next:NextFunction) => {
  next(httpError(404));
});

// error handler
app.use((err:HttpError, req:Request, res:Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export {app}
