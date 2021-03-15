import createError from 'http-errors'
import express from'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from'morgan'
import {router} from './routes/mainRouter'
const rfs = require('rotating-file-stream')



let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//日志设置
if(process.env.NODE_ENV.trim() === 'dev'){
  app.use(logger('dev'))//开发环境打印控制台
}

if(process.env.NODE_ENV.trim() === 'prod'){
  let accessLogStream = rfs.createStream('access.log', {
    size: '30M',
    interval: '1d', // rotate 每天 （1d）
    path: path.join(__dirname, 'log'),
    // compress: 'gzip' // compress rotated files
  })
  // setup the logger
  app.use(logger('combined', { stream: accessLogStream }))
}



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//main router
app.use('/main',router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
