import { astro } from './configs/astro.js'
import { base } from './configs/base.js'
import { next } from './configs/next.js'
import { react } from './configs/react.js'

export { defineConfig } from './utils.js'

export const configs = {
  base,
  next,
  astro,
  react,
}
