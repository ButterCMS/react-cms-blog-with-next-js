const Butter = require('buttercms')

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

// butter.category
//   .retrieve('example-category', {
//     include: 'recent_posts'
//   })
//   .then((resp) => {
//     console.log(resp.data.data)
//   })

butter.page.list('product').then((res) => console.log(res.data.data)).catch((e) => console.error(e))
