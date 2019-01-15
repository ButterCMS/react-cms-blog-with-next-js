import React, { Component } from 'react'
import Butter from 'buttercms'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

class Faq extends Component {
  static async getInitialProps () {
    const resp = await butter.content.retrieve([ 'faq_headline', 'faq_items' ])
    return resp.data.data
  }

  render () {
    return (
      <div>
        <h1>{this.props.faq_headline}</h1>

        <ul>
          {this.props.faq_items.map((item) => {
            return (
              <li>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Faq
