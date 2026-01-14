export const useCaptcha =
  <T, R>(callback: (prevState: T | null, data: FormData) => Promise<R>) =>
  (prevState: T | null, data: FormData): Promise<R> => {
    return window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY!, {
        action: 'SEND_EMAIL',
      })

      data.set('token', token)

      return callback(prevState, data)
    })
  }

export const validateCaptcha = async (token: string): Promise<boolean> => {
  const minimumCaptchaScore = 0.7
  const secretKey = process.env.RE_CAPTCHA_PRIVATE_KEY ?? ''
  const url = 'https://www.google.com/recaptcha/api/siteverify'

  const captchaResponse = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`,
  })
  const res = (await captchaResponse.json()) as { score: number | null }
  return (res.score ?? -1) >= minimumCaptchaScore
}
