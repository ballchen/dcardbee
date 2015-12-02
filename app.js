'use strict'

require('babel-core/register')
var ssl = require('koa-force-ssl')
const koa = require('koa')
const app = koa()
const router = require('koa-router')()
const Promise = require('bluebird')
const _ = require('lodash')
const fs = require('fs')
const ejs = require('ejs')
const https = require('https')

app.use(ssl())

// logger
app.use(function *(next) {
  const start = new Date()
  yield next
  const ms = new Date() - start
  console.log('%s %s - %s ms', this.method, this.url, ms)
})

router.get('/', function*(){
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  this.body = ejs.render(template)
})

router.get('/result', function*(){
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  this.body = ejs.render(template)
})

router.post('/', function*(){
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  this.body = ejs.render(template)
})

app.use(router.routes())
app.use(require('koa-static')(__dirname + '/static'))
// port


var options = {
  key: fs.readFileSync('./key'),
  cert: fs.readFileSync('./server.crt')
}

// app.listen(options, process.env.PORT || 3020, function(){
//   console.log('Server start on Port: '+ (process.env.PORT || 3020));
// })

https.createServer(options, app.callback()).listen(3020);
