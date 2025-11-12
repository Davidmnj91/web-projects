import { Cormorant, Ubuntu } from 'next/font/google'

export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['700', '400'],
  variable: '--font-cormorant',
})

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-ubuntu',
})
