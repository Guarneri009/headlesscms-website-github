let is_signin = false

export class AuthClass {
  constructor() {}

  signIn() {
    return new Promise((resolve, reject) => {
      is_signin = true
      resolve({
        signInUserSession: {
          accessToken: {
            jwtToken: 'jwtToken',
          },
          idToken: {
            jwtToken: 'jwtToken',
          },
          refreshToken: {
            token: 'jwtToken',
          },
        },
        username: 'username',
      })
    })
  }

  currentAuthenticatedUser() {
    return new Promise((resolve, reject) => {
      if (is_signin) {
        resolve({
          signInUserSession: {
            accessToken: {
              jwtToken: 'jwtToken',
            },
            idToken: {
              jwtToken: 'jwtToken',
            },
            refreshToken: {
              token: 'jwtToken',
            },
          },
          username: 'username',
        })
      } else {
        reject('Falied!')
      }
    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      is_signin = false
      resolve({})
    })
  }
}

export const Auth = new AuthClass(null)
