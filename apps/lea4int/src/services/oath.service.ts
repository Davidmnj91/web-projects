import { google } from 'googleapis'

export const oAuthClient = () =>
  new google.auth.OAuth2({
    credentials: { refresh_token: process.env.OAUTH_REFRESH_TOKEN },
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    redirectUri: process.env.OAUTH_REDIRECT_URL,
  })

export const getAuthToken = async (): Promise<string> => {
  return new Promise((resolve, reject) =>
    oAuthClient().getAccessToken((err, token) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(token!)
    }),
  )
}
