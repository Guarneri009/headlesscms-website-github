<template>
  <v-card class="pa-2">
    <v-card-title primary-title>
      <div>
        <h4 class="headline mb-0">サインイン</h4>
      </div>
    </v-card-title>
    <v-card-text>
      <v-alert type="error" dismissible class="mb-4 mt-0" v-model="showerr">
        {{ errmsg }}
        <v-btn v-if="resend" color="primary" flat small :to="'/resend'"
          >Re-send Confirmation</v-btn
        >
      </v-alert>
      <v-form v-model="valid" ref="form">
        <v-text-field
          autocomplete="username"
          label="ユーザ名 (User Name)"
          v-model="username"
          :rules="usernamerules"
          required
          clearable
        >
        </v-text-field>
        <v-text-field
          autocomplete="current-password"
          label="パスワード (Password)"
          v-model="password"
          :rules="passRules"
          hint="パスワードは8文字以上必要です。"
          :append-icon="hidepw ? 'fa-eye-slash' : 'fa-eye'"
          @click:append="() => (hidepw = !hidepw)"
          :type="hidepw ? 'password' : 'text'"
          required
        >
        </v-text-field>
      </v-form>
      <v-btn
        block
        :loading="loading"
        @click.native="onSubmit()"
        :disabled="!valid"
        class="mt-3 mb-3 white--text"
        color="primary"
      >
        サインイン
        <span slot="loader">サインイン...</span>
      </v-btn>
    </v-card-text>
    <v-card-actions class="ml-2 mb-2"> </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'login',
  components: {},
  data: function () {
    return {
      showerr: false,
      resend: false,
      errmsg: '',
      username: '',
      valid: false,
      email: '',
      usernamerules: [
        (value) => !!value || 'ユーザ名 (User Name)が必要です',
        (value) =>
          (value || '').search(/\s/) == -1 ||
          `ユーザ名にスペース文字が含まれています。`,
      ],
      password: '',
      passRules: [
        (v) => !!v || 'パスワード (Password)が必要です',
        (v) =>
          !v ||
          v.length >= 8 ||
          'パスワード (Password)は8文字以上である必要があります',
      ],
      hidepw: true,
      loader: false,
      loading: false,
    }
  },
  computed: {
    errcode: function () {
      return this.$store.state.authenticate.errcode
    },
  },
  methods: {
    onSubmit() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      var authData = {
        Username: this.username,
        Password: this.password,
      }
      this.$store.dispatch('authenticate/signIn', authData)
    },
    getMessage: function () {
      return this.message
    },
    forgotPassword: function () {
      this.$router.push('/forgot')
      return this.message
    },
  },
  watch: {
    errcode() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.errcode !== '') {
        if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'ユーザ名、パスワードが違います'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'ユーザ名、パスワードが違います'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.$store.commit('authenticate/setUsername', this.email)
          this.resend = true
          this.errmsg = 'ユーザは認証されていません。'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg =
            '試行回数が規定をオーバーしました。しばらくしてから再度こころみてください。'
        } else {
          this.errmsg = '予期せぬエラーが発生しました。'
        }
        this.showerr = true
      } else {
        this.showerr = false
      }
      this[l] = false
      this.loader = null
    },
  },
}
</script>
<style scoped></style>
