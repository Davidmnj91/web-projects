# Etimatic - Packaging Personalizado

Migrated from Next.js to Astro + Tailwind CSS.

## 🚀 Commands

| Command             | Action                     |
| :------------------ | :------------------------- |
| `pnpm dev`          | Starts local dev server    |
| `pnpm build`        | Build your production site |
| `pnpm preview`      | Preview your build locally |
| `pnpm lint`         | Run ESLint                 |
| `pnpm format:write` | Run Prettier               |

## 🛠️ Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **API:** Astro Endpoints (SSR)
- **Email:** [Nodemailer](https://nodemailer.com/)

## 📁 Structure

- `src/components/`: Astro components (Vanilla JS for interactivity).
- `src/layouts/`: Global layout.
- `src/pages/`: Page routes.
- `src/pages/api/`: Server-side endpoints.
- `public/`: Static assets (images, fonts, catalogs).
