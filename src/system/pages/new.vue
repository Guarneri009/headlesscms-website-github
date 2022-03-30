<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-form>
              <v-text-field
                v-model="articleTitle"
                :counter="20"
                label="Titleをここに入力"
                required
              ></v-text-field>

              <v-textarea
                v-model="articleContent"
                :counter="200"
                label="記事をMarkdown記法で入力"
                class="mt-2"
                rows="4"
                auto-grow
                required
              ></v-textarea>

              <v-btn
                @click="createArticle"
                depressed
                color="deep-purple darken-1"
                class="mr-4"
                nuxt
                >保存</v-btn
              >
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    console.log('new data')
    return {
      articleTitle: '',
      articleContent: '',
    }
  },
  methods: {
    //ヘルパー関数によりアクションをarticle名前空間から展開
    ...mapActions('article', ['postContent']),
    createArticle() {
      console.log('new createArticle methods')
      // postするオブジェクトの作成
      const newArticle = {
        title: this.articleTitle,
        content: this.articleContent,
      }
      this.postContent(newArticle)
      // topに戻る
      this.$router.push({ name: 'index' })
    },
  },
}
</script>
