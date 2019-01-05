import React from 'react'
import Link from 'next/link'
import Butter from 'buttercms'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const resp = await butter.page.list('product')
    return resp.data
  }
  render () {
    return (
      <div>
        {this.props.data.map((product, key) => {
          return (
            <div key={key}>
              <a href={`/product/${product.slug}`}>{product.fields.title}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
