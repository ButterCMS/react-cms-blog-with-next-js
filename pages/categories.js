import React from 'react'
import Butter from 'buttercms'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const resp = await butter.category.list()
    console.log(resp.data)
    return resp.data
  }
  render () {
    return (
      <div>
        {this.props.data.map((category, key) => {
          return (
            <div key={key}>
              <a href={`/posts/category/${category.slug}`}>{category.name}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
