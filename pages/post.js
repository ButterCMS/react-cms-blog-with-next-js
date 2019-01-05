import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    console.log('query: ', query)
    const resp = await butter.post.retrieve(query.slug)
    console.log('got posts')
    return resp.data
  }
  render () {
    const post = this.props.data

    return (
      <div>
        <Head>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.meta_description} />
          <meta name='og:image' content={post.featured_image} />
        </Head>

        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    )
  }
}
