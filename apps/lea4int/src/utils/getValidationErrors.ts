import type { ValidationErrors } from '@/types/types'
import type { ZodError } from 'zod'

export const getValidationErrors = (error: ZodError): ValidationErrors => {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}
