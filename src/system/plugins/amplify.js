//for IE11
import 'babel-polyfill'
import 'url-search-params-polyfill'
//--------
import Vue from 'vue'
import axios from 'axios'
import Amplify from 'aws-amplify'
const awsconfig = require('../../../aws-exports.js')

Amplify.configure(awsconfig)

//lambda@Edgeを使ったサーバーからのパラメータ取得
//Vue内からthis参照で使いたい場合
Vue.prototype.$getParameterOnLambdaEdge = () => {
  const url = `getParamFromEdge.js?p=${new Date().getTime()}`
  return axios
    .get(url, {
      headers: {
        'X-API-KEY': 'XXXXXXXXXXXXXXXXXXOjK',
      },
      data: {},
    })
    .then((res) => {
      //console.log(res.data)
      return res.data
    })
}
//store内からthis参照で使いたい場合に以下のインジェクションが必要
export default ({ app }, inject) => {
  inject('getParameterOnLambdaEdge', Vue.prototype.$getParameterOnLambdaEdge)
}
