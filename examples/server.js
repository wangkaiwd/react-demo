const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

// 只能处理application/json的请求
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

const registerSimpleRouter = () => {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}
const registerBaseRouter = () => {
  router.get('/base/get', (req, res) => {
    res.json(req.query)
  })

  router.post('/base/post', (req, res) => {
    res.json(req.body)
  })
  router.post('/base/buffer', (req, res) => {
    let msg = []
    req.on('data', chunk => {
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
const registerErrorRouter = () => {
  router.get('/error/get', (req, res) => {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', (req, res) => {
    setTimeout(() => {
      res.json({
        msg: 'hello world'
      })
    }, 3000)
  })
}
const registerExtendRouter = () => {
  router.patch('/extend/patch', (req, res) => {
    res.json({
      msg: 'extend patch'
    })
  })
  router.get('/extend/get', (req, res) => {
    res.json({
      msg: 'extend get'
    })
  })
  router.options('/extend/options', (req, res) => {
    res.json({
      msg: 'extend options'
    })
  })
  router.delete('/extend/delete', (req, res) => {
    res.json({
      msg: 'extend delete'
    })
  })
  router.head('/extend/head', (req, res) => {
    res.json(req.query)
  })
  router.post('/extend/post', (req, res) => {
    res.json({
      msg: 'extend post'
    })
  })
  router.put('/extend/put', (req, res) => {
    res.json({
      msg: 'extend put'
    })
  })
  router.get('/extend/request', (req, res) => {
    res.json({
      msg: 'extend request'
    })
  })
  router.get('/extend/user', (req, res) => {
    res.json({
      code: 0,
      message: 'OK',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}
const registerInterceptorRouter = () => {
  router.get('/interceptor/get', (req, res) => {
    res.end('hello')
  })
}
registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()

app.use(router)

const port = process.env.PORT || 8088
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

