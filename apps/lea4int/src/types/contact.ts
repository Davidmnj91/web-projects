import type { Language } from '@/i18n/config'
import type {
  HostFamilyContactSchema,
  IndividualContactSchema,
  InstitutionsContactSchema,
  PartnerContactSchema,
} from '@/schemas/contactSchemas'
import type { z } from 'zod'

export const Contact = {
  companyName: 'LEA 4 International',
  phone: '+34 605 34 20 75',
  mail: 'info@lea4int.com',
  instagram: 'https://www.instagram.com/lea4int',
  linkedin: 'https://www.linkedin.com/in/lucia-soto-5780402b1',
  facebook: 'https://www.facebook.com/profile.php?id=61555352530058',
  youtube: 'https://www.youtube.com/channel/UC58jbZp1CqC--5HBphpJmdg',
}

export enum ContactServices {
  ERASMUS = 'erasmus',
  CONVERSATIONAL_ENGLISH_COURSE = 'conversational-english-course',
  BUSINESS_ENGLISH_COURSE = 'business-english-course',
  CONVERSATIONAL_SPANISH_COURSE = 'conversational-spanish-course',
  BUSINESS_SPANISH_COURSE = 'business-spanish-course',
  MACHINE_LEARNING = 'machine-learning',
  DATA_MINING = 'data-mining',
  AI_FOR_BUSINESS = 'business-ai',
  CONCIERGE = 'concierge',
}

export type IndividualFormData = z.infer<typeof IndividualContactSchema>
export type HostFamilyFormData = z.infer<typeof HostFamilyContactSchema>
export type InstitutionFormData = z.infer<typeof InstitutionsContactSchema>
export type PartnerFormData = z.infer<typeof PartnerContactSchema>

export type ContactData =
  | { type: 'INDIVIDUAL'; data: IndividualFormData }
  | { type: 'FAMILY'; data: HostFamilyFormData }
  | { type: 'INSTITUTION'; data: InstitutionFormData }
  | { type: 'PARTNER'; data: PartnerFormData }

export interface ContactEmailProps {
  language: Language
  contactData: ContactData
}
