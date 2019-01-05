const next = require('next')
const express = require('express')
const Butter = require('buttercms')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

app.prepare().then(() => {
  const server = express()

  server.get('/posts', (req, res) => {
    return app.render(req, res, '/index', { slug: req.params.slug })
  })

  server.get('/posts/categories', (req, res) => {
    return app.render(req, res, '/categories')
  })

  server.get('/posts/category/:slug', (req, res) => {
    return app.render(req, res, '/category', { slug: req.params.slug })
  })

  server.get('/posts/:slug', (req, res) => {
    return app.render(req, res, '/post', { slug: req.params.slug })
  })

  server.get('/products/:slug', (req, res) => {
    return app.render(req, res, '/product', { slug: req.params.slug })
  })

  server.post('/webhook-receiver', (req, res) => {
    console.log('a post has been modified')
    app
      .prepare()
      .then(() => {
        console.log('app refreshed')
        res.end()
      })
      .catch((e) => {
        res.status(500).end()
      })
  })

  server.get('/sitemap', (req, res) => {
    butter.feed.retrieve('sitemap').then((s) => {
      res.send(s.data.data)
    })
  })

  server.get('/atom', (req, res) => {
    butter.feed.retrieve('atom').then((s) => {
      res.send(s.data.data)
    })
  })

  server.get('/rss', (req, res) => {
    butter.feed.retrieve('rss').then((s) => {
      res.send(s.data.data)
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
