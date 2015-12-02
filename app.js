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
const http = require('http')

const cards = JSON.parse(fs.readFileSync('./cards.json'));


// logger
app.use(function *(next) {
  const start = new Date()
  yield next
  const ms = new Date() - start
  console.log('%s %s - %s ms', this.method, this.url, ms)
})

router.get('/', function*(){
  const fate = Math.floor((Math.random() * cards.length));
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  let option = {
    card: cards[fate]
  }
  this.body = ejs.render(template, option)
})

router.get('/result', function*(){
  const fate = Math.floor((Math.random() * cards.length));
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  let option = {
    card: cards[fate]
  }
  this.body = ejs.render(template, option)
})

router.get('/share', function*(){
  let id = (this.query.id || 0)
  let card = cards[id]
  const template = fs.readFileSync(__dirname + '/views/share.html', 'utf-8')
  let option = {
    card: card
  }
  this.body = ejs.render(template, option)
})

router.post('/', function*(){
  const fate = Math.floor((Math.random() * cards.length));
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  let option = {
    card: cards[fate]
  }

  this.body = ejs.render(template, option)
})

app.use(router.routes())
app.use(require('koa-static')(__dirname + '/static'))

// port
// var options = {
//   key: fs.readFileSync('./config/key'),
//   cert: fs.readFileSync('./config/server.crt')
// }

// app.listen(options, process.env.PORT || 3020, function(){
//   console.log('Server start on Port: '+ (process.env.PORT || 3020));
// })

// https.createServer(options, app.callback()).listen(3020);
http.createServer(app.callback()).listen(3020);
