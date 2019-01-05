import React from 'react'
import Link from 'next/link'
import Butter from 'buttercms'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    let page = query.page || 1

    const resp = await butter.post.list({ page: page, page_size: 10 })
    return resp.data
  }
  render () {
    const { next_page, previous_page } = this.props.meta

    return (
      <div>
        {this.props.data.map((post, key) => {
          return (
            <div key={key}>
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </div>
          )
        })}

        <br />

        <div>
          {previous_page && (
            <Link href={`/?page=${previous_page}`}>
              <a>Prev</a>
            </Link>
          )}

          {next_page && (
            <Link href={`/?page=${next_page}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </div>
    )
  }
}
