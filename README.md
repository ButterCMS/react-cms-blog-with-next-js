# React CMS-powered blog built with Next.js

[Next.js](https://github.com/zeit/next.js/) is a small framework for building universal React webapps. Next.js comes with Webpack and Babel built-in. You can read more about the philosophy behind Next.js [here](https://zeit.co/blog/next).

[ButterCMS](https://buttercms.com) is a hosted API-based CMS and blog engine that lets you build CMS-powered apps using any programming language. You can think of Butter as similar to WordPress except that you build your website in your language of choice and then plug-in the dynamic content using an API.

### Getting Started

Create a new directory for your app and add a package.json file:

```
{
  "name": "react-blog"
}
```

Next, install Next.js and React. As of the time of this writing, we'll want to install the Next.js for custom routing we'll use later:

```
npm install next@beta react react-dom --save
```

Then add a script to your package.json:

```
{
  "scripts": {
    "start": "next"
  }
}
```

Next.js treats every js file in the `./pages` directory as a page. Let's setup a basic homepage by creating a `./pages/index.js` inside your project:

```
export default () => (
  <div>My blog homepage</div>
)
```

And then just run `npm run start` and go to `http://localhost:3000`.

Then create a `./pages/post.js` and check it out at `http://localhost:3000/post`:

```
export default () => (
  <div>A blog post</div>
)
```

### Fetching blog posts from ButterCMS

First install the ButterCMS Node.js API client and restart your server:

```
npm install buttercms --save
```

We'll load the ButterCMS package in index.js and setup a React component that fetches and displays posts:

```
import React from 'react'
import Link from 'next/link'
import Butter from 'buttercms'

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

export default class extends React.Component {
  static async getInitialProps({ query }) {
    let page = query.page || 1;

    const resp = await butter.post.list({page: page, page_size: 10})    
    return resp.data;
  }
  render() {
    const { next_page, previous_page } = this.props.meta;

    return (
      <div>
        {this.props.data.map((post) => {
          return (
            <div><a href={`/post/${post.slug}`}>{post.title}</a></div>
          )
        })}

        <br />

        <div>
          {previous_page && <Link href={`/?page=${previous_page}`}><a>Prev</a></Link>}
        
          {next_page && <Link href={`/?page=${next_page}`}><a>Next</a></Link>}
        </div>
      </div>
    )
  }
}
```

With Next.js `getInitialProps` will execute on the server on initial page loads, and then on the client when navigating to a different routes using the built-in `<Link>` component. `getInitialProps` also receives a context object with various properties – we access the `query` property for handling pagination. We are fetching posts from a ButterCMS test account – sign in with Github to setup your own posts. 

In our `render()` method we use some clever syntax to only display pagination links only when they're applicable. Our post links will take us to a 404 – we'll get these working next.

### Creating our post page

To get our post links working we need to setup dynamic routing for our blog posts. First, create a custom server `./server.js` that routes all `/post/:slug` URLs to our post component:

```
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname.includes('/post/')) {
      const splitPath = pathname.split("/");
      
      // Add post slug to query object
      query.slug = splitPath[2];
      
      app.render(req, res, '/post', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

We'll also update our post component to fetch blog posts via slug and render the title and body:

```
import React from 'react'
import Butter from 'buttercms'

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const resp = await butter.post.retrieve(query.slug);  
    return resp.data;
  }
  render() {
    const post = this.props.data;

    return (
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.body}} />
      </div>
    )
  }
}
```

Finally, update our `package.json` start script to use our customer server and restart:

```
"scripts": {
  "start": "node server.js"
}
```

### SEO

Next.js provides a `<Head>` component for setting HTML titles and meta tags. Add `import Head from 'next/head'` to the top of `./pages/post.js` and use the component in the `render()` method:

```
render() {
  const post = this.props.data;

  return (
    <div>
      <Head>
        <title>{post.seo_title}</title>
        <meta name="description" content={post.meta_description} />
        <meta name="og:image" content={post.featured_image} />
      </Head>

      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.body}} />
    </div>
  )
}
```

Restart the server and inspect the HTML source of a post to verify that tags are getting set correctly.

### Wrap up

Next.js is a powerful framework that makes it easy to build universal React apps. With ButterCMS you can quickly build CMS-powered blogs and websites with React and Node.js.

We hope you enjoyed this tutorial. If you have any questions about setting up your ButterCMS-powered Next.js/React app reach out to me at roger@buttercms.com or on Twitter.
