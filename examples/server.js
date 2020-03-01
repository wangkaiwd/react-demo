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

router.get('/simple/get', (req, res) => {
  console.log('req', req)
  res.json({
    message: 'hello world!'
  })
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
