import axios from 'axios'
//store内のxxxx.jsのxxxxは名前空間になります。この場合はarticle
//このファイル外でこの内部のstateをアクセスする場合は$store.state.article.xxxxxxx になる
export const state = () => ({
  articleList: [],
  articleContent: null,
  articleTitle: null,
})

export const mutations = {
  setList(state, list) {
    console.log('article-mutations setList')
    state.articleList = list
    console.log('state.articleList = ', state.articleList)
  },
  setContent(state, data) {
    state.articleContent = data.ArticleData
    state.articleTitle = data.ArticleTitle
  },
}

const apiId = '<xxxxxxxx>'
const version = 'v1'

export const actions = {
  async getList({ commit }) {
    console.log('article-actions getList start')
    // 記事一覧の取得
    //then,catchを使ったやりかた
    await this.$axios
      .$get(
        `https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/Prod/${version}/getArticleList`
      )
      .then((response) => {
        // 以下のコメントを入れると直後の行はprettierが無視される
        // prettier-ignore
        console.log(`------- response = ${JSON.stringify(response,null,'  ')}`)
        console.log('getList 記事一覧', response)
        commit('setList', response.articleList.Items)
      })
      .catch((error) => {
        console.log('記事一覧', error)
      })

    //nuxtjs/axiosモジュールを利用したデータ取得
    //axios単体ではファイル毎にimportでaxiosを読み込んでいましたが、nuxtjs/axiosの場合はcontextを利用してaxiosを使います。
    //axiosの記述方法ですがaxios.getからcontext.$axios.$getに変更になります。context.$axios.$getに変更するとresponseではなく直接response.dataが戻されます。
  },

  //アロー関数を使ったやりかた、この場合thisの扱いが変わるので注意
  getContent: async ({ commit }, query) => {
    console.log('article-actions getContent start')
    // 記事詳細の取得
    // axiosはpromiseを返却するので try catch が可能
    try {
      let response = await axios.get(
        `https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/Prod/${version}/${query}`
      )
      console.log('記事閲覧', response.data)
      commit('setContent', response.data)
    } catch (error) {
      console.log('記事閲覧', error)
    }
  },

  //引き数に{ title, content }のように記述することにより引き数オブジェクトの選択が可能
  async postContent({ commit, dispatch }, { title, content }) {
    console.log('article-actions postContent start')
    // 新規記事の登録
    try {
      let response = await axios.post(
        `https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/Prod/${version}/new`,
        {
          articleTitle: title,
          articleData: content,
        }
      )
      console.log(response)
      dispatch('getList')
    } catch (error) {
      console.log(error)
    }
  },
  test01(content) {
    console.log('article-actions test01 start')
  },
}

export const getters = {
  //Vuex を利用するとストア内に "ゲッター" を定義することができます。
  //それらをストアの算出プロパティと考えることができます。
  //算出プロパティと同様に、ゲッターの結果はその依存関係に基づいて計算され、依存関係の一部が変更されたときにのみ再評価されます。
  //ゲッターは第1引数として、state を受け取ります
  //
  //通常書き方
  getArticleList(state) {
    console.log('article-getter getArticleList')
    return state.articleList
  },
  //アローを使った書き方
  getArticleContentObject: (state) => {
    console.log('article-getter getArticleContentObject')
    return state
  },
}
