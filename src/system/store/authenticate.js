// AWSのCognitoを利用する場合はこちらを有効に
import { Auth } from 'aws-amplify'
// ローカルで認証する場合はこちらのモックを利用できます
//import { Auth } from '../../../aws-amplify-auth-local'

export const state = {
  tokens: {
    accessToken: '(none)',
    idToken: '(none)',
    refreshToken: '(none)',
  },
  username: '',
  errcode: '',
  authenticated: false,
}

export const mutations = {
  async setSignOut(state) {
    try {
      await Auth.signOut()
    } catch (err) {
      console.log(`signOut error.. ${err}`)
    }
    //
    state.tokens.accessToken = '(none)'
    state.tokens.idToken = '(none)'
    state.tokens.refreshToken = '(none)'
    state.username = ''
    state.errcode = ''
    state.authenticated = false
  },
  setTokens(state, payload) {
    state.tokens.accessToken = payload.signInUserSession.accessToken.jwtToken
    state.tokens.idToken = payload.signInUserSession.idToken.jwtToken
    state.tokens.refreshToken = payload.signInUserSession.refreshToken.token
    state.username = payload.username
    state.authenticated = true
  },
  setError(state, payload) {
    state.errcode = payload
  },
  clearError(state) {
    state.errcode = ''
  },
}

export const actions = {
  async signIn({ commit }, authData) {
    try {
      commit('clearError')
      let result = await Auth.signIn(authData.Username, authData.Password)
      commit('setTokens', result)
      this.$router.push('/newsList')
    } catch (err) {
      commit('setError', JSON.stringify(err.code))
    }
  },
  async tryAutoSignIn({ commit, dispatch }) {
    localStorage.clear()
    try {
      let result = await Auth.currentAuthenticatedUser()
      commit('setTokens', result)
      dispatch('setLogoutTimer', 3600)
    } catch (err) {
      console.log(`${err}`)
    }
  },
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('setSignOut')
    }, expirationTime * 1000)
  },
  signOut({ commit }) {
    commit('setSignOut')
    this.$router.push('/')
  },
}
