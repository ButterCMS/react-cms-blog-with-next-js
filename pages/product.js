import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const resp = await butter.page.retrieve('product', query.slug)
    return resp.data
  }
  render () {
    const product = this.props.data
    const { title, description, price } = product.fields

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>

        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <span>
          <strong>Price : </strong> {price}
        </span>
      </div>
    )
  }
}
