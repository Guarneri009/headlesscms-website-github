// plugins経由で登録を行うことで、どこからでも呼び出せるようになるので、ui.jsを作成する。

import Vue from 'vue'

import header from '~/components/header'
import footer from '~/components/footer'
import chatfield from '~/components/chatfield'
import sample from '~/components/sample'

Vue.mixin({
  components: {
    'header-comp': header,
    'footer-comp': footer,
    chatfield: chatfield,
    sample: sample,
  },
})
