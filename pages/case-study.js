import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

const butter = Butter('your_api_token')

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
