import React, { Component } from 'react'
import Butter from 'buttercms'

const butter = Butter('your_api_token')

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
