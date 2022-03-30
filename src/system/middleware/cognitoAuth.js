export default async function({ store, route, redirect }) {
  await store.dispatch('authenticate/tryAutoSignIn')
  if (route.name == 'index') {
    // 各ページのユーザ認証チェック場所
    if (store.state.authenticate.authenticated) {
      redirect('/newsList')
    }
  } else {
    // 各ページのユーザ認証チェック場所
    if (!store.state.authenticate.authenticated) {
      redirect('/')
    }
  }
}
