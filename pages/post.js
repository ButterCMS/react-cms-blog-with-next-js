import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

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
}