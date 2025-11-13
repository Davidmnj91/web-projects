import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/globals.css'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
