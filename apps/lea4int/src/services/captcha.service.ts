interface CaptchaVerification {
  success: boolean
  score?: number
  'error-codes'?: string[]
}

const minimumCaptchaScore = 0.7
const siteVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

export const validateCaptcha = async (token: string): Promise<boolean> => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Captcha verification skipped: RE_CAPTCHA_DISABLED is enabled')
    return true
  }

  const secretKey = process.env.RE_CAPTCHA_PRIVATE_KEY

  if (!secretKey) {
    throw new Error('Missing captcha configuration: RE_CAPTCHA_PRIVATE_KEY is required')
  }

  const captchaResponse = await fetch(siteVerifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
  })
  const verification = (await captchaResponse.json()) as CaptchaVerification

  // Without this the only symptom is an opaque `Invalid captcha`, the reason is in the response.
  if (!verification.success) {
    console.error('Captcha verification failed:', verification['error-codes'] ?? 'unknown reason')
    return false
  }

  const score = verification.score ?? 0

  if (score < minimumCaptchaScore) {
    console.error(`Captcha score ${score} is below the minimum of ${minimumCaptchaScore}`)
    return false
  }

  return true
}
