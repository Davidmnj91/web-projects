import concierge_bg from '../../public/images/services/concierge/concierge_bg.webp'
import erasmus_bg from '../../public/images/services/erasmus/erasmus_bg.webp'
import language_courses_bg from '../../public/images/services/language-courses/language_courses_bg.webp'
import student_exchange_bg from '../../public/images/services/student-exchange/student_exchange_bg.webp'

export enum ServicesCategories {
  Erasmus = 'erasmus',
  LanguageCourses = 'language-courses',
  StudentExchange = 'student-exchange',
  Concierge = 'concierge',
}

export const servicesCardConfig: Record<ServicesCategories, string> = {
  erasmus: erasmus_bg.src,
  'language-courses': language_courses_bg.src,
  'student-exchange': student_exchange_bg.src,
  concierge: concierge_bg.src,
}

export const Services: Record<ServicesCategories, string[]> = {
  [ServicesCategories.Erasmus]: ['work-experience', 'job-shadowing', 'school-exchange', 'erasmus-mundus'],
  [ServicesCategories.LanguageCourses]: [
    'english-courses',
    'business-english-courses',
    'spanish-courses',
    'business-spanish-courses',
    'ai-trainings',
  ],
  [ServicesCategories.StudentExchange]: ['immersion-program', 'exchange-program'],
  [ServicesCategories.Concierge]: [],
}
