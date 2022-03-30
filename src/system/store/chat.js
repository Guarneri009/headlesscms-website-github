import axios from 'axios'
import * as R from 'ramda'

//store内のxxxx.jsのxxxxは名前空間になります。この場合は chat
//このファイル外でこの内部のstateをアクセスする場合は$store.state.chat.xxxxxxx になる
export const state = () => ({
  chatList: [
    { index: 0, chatData: 'aaa' },
    { index: 2, chatData: 'cccc' },
    { index: 1, chatData: 'bbbb' },
  ],
  speech: 'aaa',
  index: 2,
})

export const mutations = {
  setSpeech(state, data) {
    state.speech = data
  },
  addChat(state, data) {
    state.index += 1
    let chatListItem = { index: state.index, chatData: data }
    state.chatList.push(chatListItem)
  },
}

export const actions = {}

const chatSort = R.sortWith([R.descend(R.prop('index'))])
export const getters = {
  //Vuex を利用するとストア内に "ゲッター" を定義することができます。
  //それらをストアの算出プロパティと考えることができます。
  //算出プロパティと同様に、ゲッターの結果はその依存関係に基づいて計算され、依存関係の一部が変更されたときにのみ再評価されます。
  //ゲッターは第1引数として、state を受け取ります
  //
  //アローを使った書き方
  getChatList: (state) => {
    let ret = chatSort(state.chatList)
    return ret
  },
}
