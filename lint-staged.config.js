/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*.{js,jsx,ts,tsx,astro}': ['eslint --fix --no-warn-ignored'],
  '**/*.{md,mdx}': ['markdownlint --fix'],
  '**/*.{json,css,scss,html}': ['prettier --write'],
}
