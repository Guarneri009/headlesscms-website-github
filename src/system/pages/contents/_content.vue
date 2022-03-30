<template>
  <div>
    <v-card v-if="this.getArticleContentObject" class="pa-10 ma-10">
      <v-card-title>
        {{ this.getArticleContentObject.TitleName }}
      </v-card-title>
      <v-card-subtitle>
        {{ `${this.getArticleContentObject.articleTitle}` }}
      </v-card-subtitle>

      <hr class="grey lighten-4" />
      <v-card-text class="pb-2">
        <v-row>
          <!-- バックエンドでMarkdownitを使いマークダウンをHtml化して表示されます。
              そのため v-html を使います。
         -->
          <div v-html="this.getArticleContentObject.articleContent"></div>
        </v-row>
        <v-row>
          <!-- <div
            v-html="
              $md.render(`#### フロントエンドでMarkdownを使う場合のやりかたはこちら  
\`\`\`
{
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    runtime: true // Support $md()
  }
}
\`\`\`  
            `)
            "
          ></div> -->
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 読み込み待ち画面 -->
    <v-card
      v-if="!this.getArticleContentObject"
      justify="center"
      align="center"
    >
      <div class="text-center ma-12">
        <v-progress-circular
          :indeterminate="true"
          rotate
          :value="10"
          :size="250"
          :width="20"
          color="light-blue"
        ></v-progress-circular>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  //書き方その１
  data: function () {
    console.log('_content data')
    return {
      data01: 'data01です',
    }
  },
  //書き方その２
  // data() {
  //   console.log('default data')
  //   return {
  //     data01: 'data01です',
  //   }
  // },
  async asyncData({ store }) {
    //ページコンポーネントに限りasyncDataは有効
    //このページが最初に呼ばれる時のみ F5キーなどの場合
    console.log('_content asyncData')
  },

  //コンポーネント内で非同期データを扱うには？
  //コンポーネントは asyncData メソッドを持たないため、サーバーサイドでコンポーネント内で非同期にデータを取得することは直接的にはできません。
  //ただし、そのような制限を回避する方法が 2つあります:
  // 1. mounted() フック内に API コールを作成し、ロード時に data プロパティをセットすること。
  //   マイナスな側面: サーバーサイドレンダリングでは機能しません。
  // 2. ページコンポーネントの asyncData() または fetch() メソッド内に API コールを作成し、データを props としてサブコンポーネントへ渡すこと。
  //   この方法ではサーバーサイドレンダリングでもうまく機能します。
  //   マイナスな側面: ページ内 asyncData() または fetch() が他のコンポーネントのデータをロードするため、可読性が落ちるかもしれません。
  mounted() {
    //このページが最初に呼ばれる時のみ F5キーなどの場合
    console.log('_content mounted')
    this.getContent(this.$route.query.ArticleID)
  },
  computed: {
    //ヘルパー関数によりゲッターをarticle名前空間から展開
    ...mapGetters('article', ['getArticleContentObject']),
  },
  watch: {
    //パラメーター変更の検知
    //ルートのパラメーターを使う際に特筆すべき点は、ユーザーが /user/foo から /user/bar へ遷移するときに同じコンポーネントインスタンスが再利用されるということです。
    //両方のルートが同じコンポーネントを描画するため、古いインスタンスを破棄して新しいものを生成するよりも効率的です。
    //しかしながら、これはコンポーネントのライフサイクルフックが呼ばれないことを意味しています。
    //同じコンポーネントでパラメーター変更を検知するためには、 $route オブジェクトを watch するだけです。
    $route(to, from) {
      console.log('_content $route watch')

      console.log(from.query)
      console.log(
        `ルートの変更の検知 query=${from.query.ArticleID} => query=${to.query.ArticleID}`
      )
      // ルートの変更の検知
      this.getContent(this.$route.query.ArticleID)
    },
  },
  methods: {
    //ヘルパー関数によりアクションをarticle名前空間から展開
    ...mapActions('article', ['getContent']),
  },
}
</script>
