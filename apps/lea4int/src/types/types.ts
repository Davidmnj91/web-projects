import type { ReactElement, ReactNode } from 'react'

export type Nullable<T> = T | null

export type ValidationErrors = {
  path: string
  message: string
}[]

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
      ? Subset<K[attr]> | null
      : K[attr] extends object | null | undefined
        ? Subset<K[attr]> | null | undefined
        : K[attr]
}

export type RichTranslation = string | ReactElement | ReactNode | ReactNode[]
