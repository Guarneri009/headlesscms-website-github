<template>
  <v-container fluid>
    <v-row>
      <v-col>
        チャット
      </v-col>
      <v-col>
        <v-text-field
          label="speech"
          v-model="cuSpeech"
          outlined
          data-cy="speech"
        ></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-btn @click="this.send" data-cy="submit">送信</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <v-list-item v-for="item in this.getChatList" :key="item.index"
          ><span :data-cy="'chatlist-' + item.index">{{ item.chatData }}</span>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { w3cwebsocket } from 'websocket'
const W3CWebSocket = w3cwebsocket

export default {
  data: function() {
    //#data
    //data プロパティ(例 data: () => { return { a: this.myProp }}) でアロー関数を使用すべきではないことに注意してください。
    //アロー関数は、this が期待する Vue インスタンスではなく、this.myProp が undefined になるため、
    //親コンテキストに束縛できないことが理由です。
    return {
      // WebSocketクライアントの生成
      socket: new W3CWebSocket(
        ' wss://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/Prod'
      ),
    }
  },
  created: function() {
    //インスタンスプロパティまたはコールバックでアロー関数 を使用しないでください。
    //例えば、 created: () => console.log(this.a) や vm.$watch('a', newValue => this.myMethod()) です。
    //アロー関数は this をもたないため、this は他の変数と同様に見つかるまで親スコープをレキシカルに探索され、
    //そしてしばしば、Uncaught TypeError: Cannot read property of undefined または Uncaught TypeError: this.myMethod is not a function のようなエラーが発生します。

    // createdライフサイクルで、Vueインスタンスが作成されたら
    // イベントリスナーを登録しておく
    this.socket.onmessage = (e) => {
      if (typeof e.data === 'string') {
        this.$store.commit('chat/addChat', e.data)
      }
    }
  },
  computed: {
    //#computed
    //算出プロパティ(例 aDouble: () => this.a * 2) を定義するためにアロー関数を使用すべきではないことに注意してください。
    //アロー関数は、this が期待する Vue インスタンスではなく、this.a が undefined になるため、
    //親コンテキストに束縛できないことが理由です。
    ...mapGetters('chat', ['getChatList']),
    //双方向算出プロパティを使うアプローチがあります。
    cuSpeech: {
      get() {
        return this.$store.state.chat.speech
      },
      set(value) {
        this.$store.commit('chat/setSpeech', value)
      },
    },
  },
  methods: {
    ...mapActions('chat', ['speech']),
    send: function() {
      // ボタン押下でサーバに値を送る
      let sendData = {
        message: 'sendmessage',
        data: this.$store.state.chat.speech,
      }
      this.socket.send(JSON.stringify(sendData))
    },
    test: function() {
      console.log('test')
    },
  },
}
</script>
