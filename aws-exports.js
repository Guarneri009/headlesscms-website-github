import Amplify from 'aws-amplify'

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-1',
    // REQUIRED - Amazon Cognito User Pool ID
    userPoolId: 'ap-northeast-1_<xxxxxxxxxxx>',
    // REQUIRED - Amazon Cognito Web Client ID
    userPoolWebClientId: '<xxxxxxxxxxx>',
    // OPTIONAL - customized storage object
    storage: window.sessionStorage,
  },
})
