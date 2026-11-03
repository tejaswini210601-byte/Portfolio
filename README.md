# Tejaswini S | Coding, Robotics & Maths Educator

A friendly one-page portfolio for **two audiences**, with a **For Parents / For Recruiters** switch at the top.
All facts come from my résumé (`public/Tejaswini_S_Resume.pdf`).

- **Parents** see what kids learn, how I teach and how I keep parents updated.
- **Recruiters** see impact numbers, experience, skills and the résumé first.
- Tip: link straight to a view with `?for=recruiters` or `?for=parents` (great for job emails).

## Run it on your computer

```bash
npm install     # downloads the libraries (only needed once)
npm run dev     # starts the site at http://localhost:3000
```

## Change the text

Everything you read on the site lives in **one file: `src/lib/data.ts`**.
`HERO`, `BUBBLES` (what the cartoon says), `KID_GAINS`, `LEARN_PATHS`, `HOW_I_TEACH`, `PROJECTS`, `TIMELINE`, `SKILLS`…

## How it's built

| Folder / file | What it does |
|---|---|
| `src/lib/data.ts` | **All the content** |
| `src/lib/audience.tsx` | Remembers "parents" or "recruiters" (React context + localStorage) |
| `src/components/App.tsx` | Puts the sections in a different order for each audience |
| `src/components/sections/Hero.tsx` | **Cursor-tracking 3D hero**: picks one of 64 pre-made frames so my head turns towards your cursor (canvas, ~60fps, no video seeking) |
| `scripts/build-hero-frames.py` | Cuts my Google Flow video into those 64 frames (+ looking-at-you frame and a cut-out). Run: `python3 scripts/build-hero-frames.py my-video.mov` |
| `src/components/art/Kid.tsx`, `Robot.tsx` | Cartoon kids and robot for the classroom scene |
| `src/components/sections/*.tsx` | One file per section (below) |
| `src/app/globals.css` | Colours, chunky buttons, cards, pop-in animation |
| `.github/workflows/deploy.yml` | Publishes the site on every push |

### Sections

| Section | What's fun about it |
|---|---|
| Hero | My 3D head follows your cursor (on phones I glance around by myself), custom glowing cursor |
| For kids | Classroom scene: kids cheer and hearts float up on hover/tap |
| What they learn | Six subject cards that lift and wiggle |
| How I teach | Four steps on a dashed path |
| Projects | Sticker-style project cards |
| Impact | Numbers count up |
| Experience | Road that draws itself as you scroll |
| Skills | Filterable skill stickers with real logos |
| Contact | Message changes for parents vs recruiters |

Tech: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lenis smooth scroll. Fonts: Fredoka + Nunito + Dancing Script, stored in `src/fonts`.

## Publishing (GitHub Pages)

Push to the `main` branch → GitHub Actions builds the site and copies it to the `gh-pages` branch → it goes live at
`https://<username>.github.io/<repo-name>/`.
One-time setup (already done): **Settings → Pages → Deploy from a branch → gh-pages / (root)**.

## Credits & licences

- Brand logos: [Devicon](https://devicon.dev) (MIT, see `public/logos/LICENSE-devicon.txt`) and
  [Simple Icons](https://simpleicons.org) (CC0, see `public/logos/LICENSE-simple-icons.md`).
  All logos are trademarks of their owners.
- Fonts: Fredoka and Nunito (SIL Open Font License) via Fontsource.
- 3D portrait: generated with ChatGPT + Google Flow from my photo. Kids and robot: original SVG drawings.
