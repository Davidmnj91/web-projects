'use server'

import { render } from '@react-email/render'
import { ZodError } from 'zod'
import { zfd } from 'zod-form-data'

import AdminEmail from '../emails/admin-email'
import ClientEmail from '../emails/client-email'
import emails from '../messages/emails.json'

import type { Language } from '@/i18n/config'
import type { ContactData, ContactEmailProps } from '@/types/contact'
import type { Nullable, ValidationErrors } from '@/types/types'

import { defaultLanguage } from '@/i18n/config'
import {
  HostFamilyContactSchema,
  IndividualContactSchema,
  InstitutionsContactSchema,
  PartnerContactSchema,
} from '@/schemas/contactSchemas'
import { sendMail } from '@/services/mail.service'
import { getValidationErrors } from '@/utils/getValidationErrors'

interface ContactUsSuccess {
  status: 'SUCCESS'
}

interface ContactUsError {
  status: 'VALIDATION_ERROR'
  errors: ValidationErrors
  message: string
}

interface ServerError {
  status: 'INTERNAL_ERROR'
}

export type ContactUsState = Nullable<ContactUsSuccess | ContactUsError | ServerError>

const generalFormDataSchema = zfd.formData(IndividualContactSchema)
const hostFamilyFormDataSchema = zfd.formData(HostFamilyContactSchema)
const institutionFormDataSchema = zfd.formData(InstitutionsContactSchema)

const partnerFormDataSchema = zfd.formData(PartnerContactSchema)

export async function getContactUs(prevState: ContactUsState | null, data: FormData): Promise<ContactUsState> {
  try {
    const language: Language = (data.get('language') ?? defaultLanguage) as Language
    let contactData: ContactData

    switch (data.get('type')) {
      case 'INDIVIDUAL':
        contactData = {
          type: 'INDIVIDUAL',
          data: await generalFormDataSchema.parseAsync(data),
        }
        break
      case 'FAMILY':
        contactData = {
          type: 'FAMILY',
          data: await hostFamilyFormDataSchema.parseAsync(data),
        }
        break
      case 'INSTITUTION':
        contactData = {
          type: 'INSTITUTION',
          data: await institutionFormDataSchema.parseAsync(data),
        }
        break
      case 'PARTNER':
        contactData = {
          type: 'PARTNER',
          data: await partnerFormDataSchema.parseAsync(data),
        }
        break
      default:
        // eslint-disable-next-line @typescript-eslint/no-base-to-string,@typescript-eslint/restrict-template-expressions
        throw new Error(`Invalid type ${data.get('type')}`)
    }

    const email: ContactEmailProps = {
      language,
      contactData,
    }

    const adminTemplate = await render(AdminEmail({ props: email }))
    await sendMail(emails[language]['admin-mail'].subject, process.env.MAIL_USER!, adminTemplate)

    const clientTemplate = await render(ClientEmail({ props: email }))
    await sendMail(emails[language]['client-email'].subject, contactData.data.email, clientTemplate)

    return {
      status: 'SUCCESS',
    }
  } catch (e) {
    console.error(e)

    if (e instanceof ZodError) {
      return {
        status: 'VALIDATION_ERROR',
        errors: getValidationErrors(e),
        message: e.message,
      }
    }

    return {
      status: 'INTERNAL_ERROR',
    }
  }
}
