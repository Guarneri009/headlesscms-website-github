import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = require('express')()

const list = [
  {
    TitleName: '記事1',
    ArticleID: 0,
  },
  {
    TitleName: '記事2',
    ArticleID: 1,
  },
  {
    TitleName: '記事3',
    ArticleID: 2,
  },
  {
    TitleName: '記事4',
    ArticleID: 3,
  },
]
const article = {
  ArticleTitle: 'axiosで取得した記事タイトル',
  ArticleData: `# axiosで取得した記事のテキストです。  
## 記事の内容  

`,
  contentId: null,
}
const ret = {
  articleList: {
    Items: null,
  },
}

const message = 'success'

module.exports = {
  path: '/api',
  handler: app,
}

app.get('/list', (req, res) => {
  console.log('get list')
  ret.articleList.Items = list
  res.send(ret)
})

app.get('/article', (req, res) => {
  console.log('get article', req.query.content)
  article.contentId = req.query.content
  res.send(article)
})

app.post('/article', (req, res) => {
  console.log('post article')
  res.send(message)
})
