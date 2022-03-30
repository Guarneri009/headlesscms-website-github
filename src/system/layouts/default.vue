<template>
  <v-app>
    <v-content>
      <!-- サイドメニュー -->
      <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
        <v-list dense nav>
          <v-subheader>記事</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>記事一覧</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="item in this.getArticleList"
            :key="item.TitleName"
            link
          >
            <v-list-item-content @click="toLink(item.ArticleID)">
              <v-list-item-title>{{ item.TitleName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- app-bar -->
      <v-app-bar fixed :clipped-left="clipped" app dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title
          ><v-btn @click="toTop()" text>Training</v-btn></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <header-comp />
        </v-toolbar-items>
      </v-app-bar>

      <!-- メインコンテンツ -->
      <v-container>
        <!-- パスに従ったPagesフォルダー内の<path名>.vueファイルが差し込まれます
            初期画面はindex.vueとなり、index.vueのレイアウトはlogin.vueとなりますので
            ログイン画面はサイドバーがなくなります。
       -->
        <nuxt />
      </v-container>
    </v-content>

    <v-footer fixed app>
      <footer-comp />
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    console.log('default data')
    return {
      clipped: true,
      drawer: true,
    }
  },
  //ページコンポーネントに限り有効なのでここではasyncDataは使用できない
  //  async asyncData({ store }) {
  //   console.log('default asyncData')
  // },
  created() {
    console.log('default created')
  },
  mounted() {
    //this.$nextTick(() => {
    console.log('default mounted')
    this.getList()
  },
  computed: {
    //ヘルパー関数によりゲッターをarticle名前空間から展開
    ...mapGetters('article', ['getArticleList']),
  },
  methods: {
    //ヘルパー関数によりアクションをarticle名前空間から展開
    ...mapActions('article', ['getList']),
    toTop() {
      this.$router.push({ path: '/' })
    },
    toLink(ArticleID) {
      console.log('default toLink')
      //クエリ文字付でルーティングさせる contents-content で page/contents/_content.vueが呼ばれる
      //https://router.vuejs.org/ja/
      this.$router.push({
        name: 'contents-content',
        query: { ArticleID: ArticleID },
      })
    },
  },
}
</script>
