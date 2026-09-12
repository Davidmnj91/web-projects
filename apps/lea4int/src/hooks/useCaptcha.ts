const captchaAction = 'SEND_EMAIL'

const captchaReady = (): Promise<void> =>
  new Promise((resolve) => {
    window.grecaptcha.ready(() => resolve())
  })

export const useCaptcha =
  <T, R>(callback: (prevState: T | null, data: FormData) => Promise<R>) =>
  async (prevState: T | null, data: FormData): Promise<R> => {
    await captchaReady()

    const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY!, {
      action: captchaAction,
    })

    data.set('token', token)

    return callback(prevState, data)
  }
