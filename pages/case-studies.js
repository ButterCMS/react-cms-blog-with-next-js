import React from 'react'
import Butter from 'buttercms'

const butter = Butter('your_api_token')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    const resp = await butter.page.list('customer_case_study')
    return resp.data
  }
  render () {
    return (
      <div>
        {this.props.data.map((caseStudy, key) => {
          return (
            <div key={key}>
              <img src={caseStudy.fields.customer_logo} height='40' width='40' />
              <a href={`/case-studies/${caseStudy.slug}`}>{caseStudy.fields.headline}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
