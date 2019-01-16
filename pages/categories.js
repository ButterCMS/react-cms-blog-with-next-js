import React from 'react'
import Butter from 'buttercms'

const butter = Butter('your_api_token')

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
