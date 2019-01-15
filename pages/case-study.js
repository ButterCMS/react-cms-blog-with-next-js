import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const resp = await butter.page.retrieve('customer_case_study', query.slug)
    return resp.data
  }
  render () {
    const product = this.props.data
    const { seo_title: seoTitle, customer_logo: customerLogo, headline, testimonial } = product.fields

    return (
      <div>
        <Head>
          <title>{seoTitle}</title>
        </Head>

        <div>
          <img src={customerLogo} alt='' height='124' width='124' />
        </div>
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: testimonial }} />
      </div>
    )
  }
}
