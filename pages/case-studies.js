import React from 'react'
import Butter from 'buttercms'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

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
