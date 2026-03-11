/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*.{js,jsx,ts,tsx,astro}': ['eslint --fix'],
  '**/*.{md,mdx}': ['markdownlint --fix'],
  '**/*.{json,css,scss,html}': ['prettier --write'],
}
