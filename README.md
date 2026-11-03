# Tejaswini S — Portfolio

A one-page personal portfolio: calm white, black and gray, with one small animation per section.
All text comes from my résumé (`public/Tejaswini_S_Resume.pdf`).

## Run it on your computer

```bash
npm install     # downloads the libraries (only needed once)
npm run dev     # starts the site at http://localhost:3000
```

`npm run build` makes the finished static site in the `out/` folder.

## Change the text

Everything you read on the site lives in **one file: `src/lib/data.ts`**.
Edit it, save it, and the site updates. Some examples:

- Add GitHub / LinkedIn: fill in `github:` and `linkedin:` in `PROFILE`. The buttons show up by themselves.
- Add a project: copy one block in `PROJECTS` and change the words.
- Add a certificate: add a line to `CERTIFICATIONS`.

## How it's built

| Folder / file | What it does |
|---|---|
| `src/app/layout.tsx` | The page shell: fonts, page title, share image |
| `src/app/globals.css` | Colours, buttons, cards and the scroll-reveal effect, shared by every section |
| `src/lib/data.ts` | **All the content** |
| `src/lib/hooks.ts` | Small helpers: "is this on screen?" and "how far have I scrolled through this?" |
| `src/lib/scroll.tsx` | Smooth scrolling (Lenis) |
| `src/components/Navigation.tsx` | Top bar, sliding pill, progress line, mobile menu |
| `src/components/hero/Hero.tsx` | First screen: portrait with logos orbiting it |
| `src/components/sections/*.tsx` | One file per section (below) |
| `src/components/ui/TechLogo.tsx` | Brand logos and thin line icons |
| `.github/workflows/deploy.yml` | Publishes the site to GitHub Pages on every push |

### Sections

| # | Section | Animation |
|---|---|---|
| — | Hero | Logos slowly orbit the portrait |
| 01 | About | Hanging ID card that swings with your mouse and flips over |
| 02 | Skills | "Periodic table" of skills with filters and a detail panel |
| 03 | Work | Project panels that open like an accordion |
| 04 | Certifications | Rows fill with black on hover |
| 05 | Experience | Timeline line draws itself as you scroll |
| 06 | Achievements | Cards slide sideways while the section stays pinned; numbers count up |
| 07 | Contact | Letters hop under the cursor, copy-email button, spinning badge |

Tech: Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Lenis for smooth scrolling. No other animation libraries.
The fonts (Inter Tight, Instrument Serif, JetBrains Mono) are stored in `src/fonts`, so the site loads no outside scripts.

## Publishing (GitHub Pages)

Push to the `main` branch → GitHub Actions builds the site → it goes live at
`https://<username>.github.io/<repo-name>/`.
One-time setup: in the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.

## Hero video (optional, later)

The original design has a talking video in the hero. This version uses a photo instead.
To add a video later, put `hero.mp4` in `public/hero/` and swap the portrait in `Hero.tsx` for a `<video>` tag.

## Credits & licences

- Brand logos: [Devicon](https://devicon.dev) (MIT, see `public/logos/LICENSE-devicon.txt`) and
  [Simple Icons](https://simpleicons.org) (CC0, see `public/logos/LICENSE-simple-icons.md`).
  All logos are trademarks of their owners.
- Fonts: Inter Tight, Instrument Serif and JetBrains Mono (SIL Open Font License) via Fontsource.
