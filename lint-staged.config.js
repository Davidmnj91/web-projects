/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': ['pnpm turbo run lint --parallel'],
  '**/*.{md,mdx}': ['markdownlint'],
}
