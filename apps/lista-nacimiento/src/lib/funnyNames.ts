import { db } from './db'

const NOUNS = [
  'unicornio',
  'alcachofa',
  'perezoso',
  'flamenco',
  'koala',
  'aguacate',
  'garbanzo',
  'patata',
  'broccoli',
  'croqueta',
  'empanadilla',
  'tortilla',
  'churro',
  'mapache',
  'pinguino',
  'dinosaurio',
  'pulpo',
  'ardilla',
  'erizo',
  'nutria',
]

const ADJECTIVES = [
  'bailarin',
  'volador',
  'veloz',
  'brillante',
  'dormilon',
  'saltarin',
  'feliz',
  'curioso',
  'travieso',
  'gigante',
  'diminuto',
  'cantarin',
  'espacial',
  'magico',
  'crujiente',
  'sabroso',
  'elegante',
  'sonriente',
  'sonador',
  'aventurero',
]

// Helper to sanitize Spanish accents if needed or keep it pure and simple
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateFunnyId(): string {
  const noun = getRandomElement(NOUNS)
  const adjective = getRandomElement(ADJECTIVES)
  const number = Math.floor(Math.random() * 90) + 10 // Random 10 to 99
  return `${noun}-${adjective}-${number}`
}

export async function generateUniqueReservationId(): Promise<string> {
  let attempts = 0
  while (attempts < 100) {
    const id = generateFunnyId()
    // Check database
    const result = await db.execute({
      sql: 'SELECT 1 FROM reservations WHERE id = ? LIMIT 1',
      args: [id],
    })
    if (result.rows.length === 0) {
      return id
    }
    attempts++
  }
  // Fallback to random uuid suffix if 100 collisions happen (extremely unlikely)
  return `${generateFunnyId()}-${Math.floor(Math.random() * 1000)}`
}
