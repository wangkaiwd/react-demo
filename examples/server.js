const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const port = process.env.PORT || 8080

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()
app.use(router)

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter () {
  router.get('/simple/get', (req, res) => {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter () {
  router.get('/base/get', (req, res) => {
    res.json(req.query)
  })

  router.post('/base/post', (req, res) => {
    res.json(req.body)
  })

  router.post('/base/buffer', (req, res) => {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter () {
  /**
   * 模拟非200到300状态码
   */
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  /**
   * 模拟超时
   */
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}
