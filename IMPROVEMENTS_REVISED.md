# Portfolio Improvement Opportunities

**Analysis date:** 2026-07-07 (updated 2026-09-12)  
**Current state:** 6 sections (hero, about, experience, projects, skills, contact), dark-only theme, i18n (TR/EN), Umami analytics + `experience_document_click` tracking, WebGL light rays (lazy-loaded), canvas sparkles, GSAP scroll animations, SpotlightCard glow, Inter + DM Sans fonts, sky-500 accent color, scroll progress, OG/Twitter meta tags, hero image srcSet, `public/documents/internships/{adm,tnc}/` PDFs.

---

## P1 - Medium Impact

### 1. Strip unused icons from `react-icons`

`SkillsSection.tsx` imports individual icons from `react-icons/si` and `react-icons/fa6`. Vite tree-shakes unused exports, but every rendered icon still adds SVG path data to the bundle.

**Approach:**
- Audit `skillIcons` against the final skill list.
- Remove icon imports for deleted or duplicated skills.
- Do not replace the whole icon system unless the bundle audit shows a meaningful gain.

**Fix:** Keep only icons that are actually rendered after the Skills redesign below.

---

## P2 - Architectural / Design

### 2. Projects section - DONE (2026-08-27)

Implemented as `src/features/projects/ProjectsSection.tsx` with 2 project cards for the Adrenal Anomaly Detection thesis and Raspberry Pi 5 homelab.

**Follow-up:** Add a real destination or an explicit private note for each project. Covered in the 2026-09-12 design plan below.

### 2b. Experience section - DONE (2026-08-27)

Added `src/features/experience/` with `ExperienceSection`, `ExperienceCard`, and `experienceData`, including ADM Elektrik Dagitim and TNC Group / Social Office internships, data-driven documents, i18n TR/EN, and Umami `experience_document_click` tracking.

### 3. Replace Inter + DM Sans with Open Sans

The current typography uses Inter and DM Sans. Replace both with a single Open Sans family to reduce visual fragmentation and simplify font loading.

**Goals:**
- Use Open Sans for body, headings, controls, cards, and navigation.
- Keep typography hierarchy through weight, size, spacing, and case rather than a second font family.
- Load only `latin` and `latin-ext` subsets required for Turkish and English.
- Remove unused Inter and DM Sans packages/imports after migration.

**Expected font weights:**
- 400 regular
- 500 medium
- 600 semibold
- 700 bold

**Example imports:**
```css
@import "@fontsource/open-sans/latin-400.css";
@import "@fontsource/open-sans/latin-500.css";
@import "@fontsource/open-sans/latin-600.css";
@import "@fontsource/open-sans/latin-700.css";

@import "@fontsource/open-sans/latin-ext-400.css";
@import "@fontsource/open-sans/latin-ext-500.css";
@import "@fontsource/open-sans/latin-ext-600.css";
@import "@fontsource/open-sans/latin-ext-700.css";
```

**Verify:**
- No Inter or DM Sans imports remain.
- No missing Turkish glyphs.
- `bun run lint`
- `bun run build`
- Visual check at 1280px and 390px.

---

## P3 - Nice-to-Haves

### 4. Purge `myself_backup.jpg` from git history

The 3 MB file is currently committed. Removing it from the file system is step 1. Purging it from git history with `git filter-repo` is only worth doing if repository size matters.

---

## 2026-09-09 Audit Backlog

Report-only audit checks run: `bun audit`, `bun run lint`, `bun run build`, LSP diagnostics, `bunx react-doctor@latest --json`, and Playwright MCP against the local production preview via system Chromium at `/usr/bin/chromium` on CDP port `9222`.

### Security / Hardening

1. `.dockerignore` does not exclude `.env`, so Docker build context can include secrets.
2. `nginx.conf` does not define a Content Security Policy header.
3. Docker images use mutable tags: `node:22-alpine`, `nginx:alpine`, `ghcr.io/umami-software/umami:latest`.

### React / Frontend Quality

4. `LightRays.tsx` has React Doctor cleanup / RAF warnings.
5. `LogoLoop.tsx` has React Doctor observer / listener cleanup warnings.
6. `ClickSpark.tsx` has `onClick` on a static wrapper. It is decorative, so avoid exposing fake interactivity.
7. `Navbar.tsx` and `ContactSection.tsx` use `transition-all`.
8. `I18nProvider.tsx` and `LoggingProvider.tsx` construct context provider values inline.
9. Mobile hero CTA row is slightly wider than its content area, although page-level horizontal overflow did not trigger.

### Cleanup / Over-Engineering

10. `public/myself_backup.jpg` is unused and about 3 MB.
11. Untracked `BACKEND-SUMMARY.md`, `FRONTEND_SUMMARY.md`, and `favicon_io/` look accidental unless intentionally kept.
12. `LogoLoop.tsx` is 539 lines for one simple skills marquee use case.
13. `LightRays.tsx` is 456 lines and is the highest-risk visual effect.

---

## Summary Priority Matrix

| Priority | Item | Effort | Impact | Status |
|---|---|---:|---:|---|
| P1 | Strip unused icons | 15 min | Medium | Open |
| P2 | Projects section | 2-4 h | High | Done |
| P2 | Experience section | 2-3 h | High | Done |
| P2 | Replace Inter + DM Sans with Open Sans | 20-30 min | Medium | Done 2026-09-12 |
| P3 | Purge backup from git | 10 min | Low | Open |
| P1 | Exclude `.env` from Docker context | 2 min | High | Open |
| P2 | Add CSP header | 15 min | Medium | Open |
| P2 | Fix React Doctor cleanup findings | 30-60 min | Medium | Open |
| P3 | Delete unused/local artifacts | 5 min | Low | Open |

---

# 2026-09-12 Design Review Implementation Plan

> **For agentic workers:** Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` if available. Implement one task at a time and verify before continuing.

## Goal

Reduce the generic AI-generated portfolio aesthetic without rewriting the application or introducing a new design system.

The target is not "more consistent components everywhere". The target is a portfolio that feels intentionally authored, with fewer repeated UI patterns, less decorative motion, clearer hierarchy, stronger project destinations, and more specific copy.

## Architecture

Keep the existing stack:

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- Bun
- GSAP where already justified
- Existing analytics and i18n architecture

No framework migration.  
No new UI library.  
No new animation library.  
No light theme.  
No redesign from scratch.

## Global Constraints

- Dark-only theme, `bg-neutral-950` base.
- Open Sans becomes the only primary typeface.
- Sky remains the primary interface accent.
- Brand colors are allowed only where they communicate technology identity, such as small skill/project dots.
- Do not add gradient text, glassmorphism, large glow blobs, floating decorative cards, or new animated backgrounds.
- Avoid using a card when plain layout, text, or separators communicate the content better.
- No em dash in source, translations, or docs.
- No `as any`, `@ts-ignore`, or `@ts-expect-error`.
- Type-only imports use `import type`.
- Keep the smallest reasonable diff per task.
- Verify every task with `bun run lint` and `bun run build`.
- Visually check touched areas at 1280px desktop and 390px mobile.

---

## Task 1: Simplify Hero CTAs

**Files:**
- Modify: `src/features/hero/HeroSection.tsx`

### Problem

The hero currently has three competing CTA buttons: About, Download CV, and Contact.

The primary button also uses a dark fill close to the page background, so hierarchy is weak. On narrow mobile widths, the CTA row can become cramped and `Download CV` may wrap.

### Change

Keep only two actions:

1. **Download CV** as primary.
2. **Contact** as secondary.

Remove the About CTA because the navigation already exposes About.

Primary:
```text
bg-sky-500 text-neutral-950 hover:bg-sky-400
```

Secondary:
```text
border-neutral-700 text-neutral-100 hover:bg-neutral-800
```

Mobile requirements:
- Do not allow label text to wrap.
- Use either a centered wrapping row or a mobile column.
- Keep the CTA group inside `max-w-full`.
- Preserve existing analytics events for remaining CTAs.

### Verify

- `bun run lint`
- `bun run build`
- 390px screenshot has no overflow or broken labels.
- Desktop has a clear primary and secondary hierarchy.

---

## Task 2: Remove the Decorative Section Divider

**Files:**
- Modify: `src/components/Section.tsx`

### Problem

Every section heading has the same short horizontal accent line. This is a common portfolio-template motif and currently adds no information.

Changing it to a brighter sky color would make the pattern more visible, but would not make the page feel more authored.

### Change

Delete the divider `span` under the `h2`.

Do not replace it with:
- another line,
- gradient,
- dot,
- glow,
- decorative icon.

Use typography and spacing for heading hierarchy.

### Verify

- `bun run build`
- About, Projects, Skills, and Contact headings still read clearly without the line.

---

## Task 3: Break the Identical Section Rhythm

**Files:**
- Modify: `src/components/Section.tsx` only if a small optional alignment/width prop is necessary.
- Modify: `src/features/experience/ExperienceSection.tsx`
- Modify: `src/features/projects/ProjectsSection.tsx`
- Modify: `src/features/skills/SkillsSection.tsx`
- Modify About only if required by Task 6.

### Problem

About, Experience, Projects, Skills, and Contact currently inherit nearly the same centered narrow-column treatment.

The repetition makes the page feel generated from one section template.

### Change

Keep no more than three section families.

#### Family A: centered editorial

Use for:
- About
- Contact

Keep centered section title treatment, but content itself does not need to be fully centered.

#### Family B: left-aligned content section

Use for:
- Experience

Requirements:
- Left-align heading.
- Left-align intro.
- Let experience content use the available container width.
- Keep existing data and documents.

#### Family C: showcase / utility section

Use for:
- Projects
- Skills

Projects:
- Keep a two-column desktop layout.
- Allow project cards to use the full section width instead of feeling nested inside repeated `max-w-3xl` wrappers.

Skills:
- Use static grouped layout from Task 4.
- Do not imitate the Projects card grid.

### Important

Do not create a large new layout abstraction unless it removes real duplication.

### Verify

- `bun run lint`
- `bun run build`
- At least two visibly different heading alignments exist.
- Projects, Experience, and Skills do not read as copies of the same section template.

---

## Task 4: Remove Skills Marquees

**Files:**
- Modify: `src/features/skills/SkillsSection.tsx`
- Remove `LogoLoop` usage from this section.
- Remove unused `LogoLoop` imports after the change.
- Delete `LogoLoop.tsx` only if it has no other consumers.

### Problem

Three infinite marquees make Skills one of the strongest "portfolio template" signals on the page.

The current data also contains:
- `Git/GitHub`
- `Git`

as duplicate concepts, and `REST API` has no icon.

### Change

Remove all Skills marquees.

Render all three categories as static groups:

- Programming Languages
- Frameworks & Technologies
- Tools & Software

Use:
```text
flex flex-wrap gap-2
```

or a small responsive grid.

Reuse `SkillBadge`, but simplify it if necessary.

Requirements:
- Dedupe Git to one entry. Prefer `Git/GitHub`.
- Icon-less skills must render naturally as text-only badges.
- Do not reserve empty icon space.
- Keep skill brand colors limited to small icon/dot details.
- Do not animate the skill list.
- Keep category headings visually stronger than individual badges.

### Optional cleanup

If `LogoLoop` becomes unused after this task:
- remove the component,
- remove related dead imports,
- update audit notes accordingly.

### Verify

- `bun run lint`
- `bun run build`
- No moving skill rows.
- No duplicate Git.
- No empty icon gap for REST API.
- Mobile wrapping remains clean.

---

## Task 5: Lock the Interface Accent

**Files:**
- Modify: `src/features/about/AboutSection.tsx`
- Modify: `src/features/contact/ContactSection.tsx`
- Reference only: `src/components/ScrollProgress.tsx`
- Reference only: `src/components/Navbar.tsx`

### Problem

About interest icons rotate between sky, emerald, and amber. Contact icons use individual brand colors. The result weakens the visual identity.

### Change

Use sky as the primary interface accent.

About:
- Interest icon backgrounds: `bg-sky-400/10`
- Interest icons: `text-sky-400`
- Education icons should follow the same interface accent unless a strong semantic reason exists otherwise.

Contact:
- Remove the per-item `color` field used for icon color.
- Use one neutral or sky icon color consistently.

Keep brand colors only in small technology identity markers such as project/skill dots.

### Note

The Open to Work indicator may remain emerald because green communicates status semantically. It is not part of the interface accent system.

### Verify

- `bun run lint`
- `bun run build`
- About does not cycle decorative accent colors.
- Contact icons use one visual treatment.

---

## Task 6: Reduce Repeated Card Usage

**Files:**
- Modify: `src/features/about/AboutSection.tsx`
- Keep `src/features/projects/ProjectsSection.tsx` as the primary card-driven section.
- Reference: `src/components/SpotlightCard.tsx`

### Problem

About education and Projects both rely on the same card metaphor.

Making their border and background classes identical would improve consistency but make the whole page feel even more like a component library.

### Change

Keep Projects as the stronger card-based section.

Simplify About education into a flatter editorial structure.

Recommended structure:

```text
Education
2022 - 2026
Pamukkale University
Computer Engineering
GPA / coursework

separator

Feb - Jul 2025
University of Maribor
Erasmus details
```

Use:
- text hierarchy,
- spacing,
- subtle borders/separators,
- small accent icon if useful.

Avoid:
- large background-filled card for every education entry,
- Spotlight effect,
- nested badge-heavy layouts.

Do not remove SpotlightCard globally. Experience and Projects may still justify cards.

### Verify

- `bun run lint`
- `bun run build`
- About and Projects no longer look like the same component with different content.
- About remains readable and visually structured without large cards.

---

## Task 7: Give Every Project a Destination

**Files:**
- Modify: `src/features/projects/ProjectsSection.tsx`
- Modify: `src/features/i18n/translations/en.json`
- Modify: `src/features/i18n/translations/tr.json`

### Problem

The project cards currently end after their technology pills. There is no repo, demo, document, writeup, or explicit private status.

That makes the Projects section feel unfinished.

### Change

Add exactly one destination row per project.

#### Thesis

If public:
- repository,
- demo,
- abstract PDF,
- presentation,
- technical writeup.

If not public:
- EN: `Private thesis, details available on request`
- TR: `Özel tez projesi, detaylar istek üzerine paylaşılabilir`

#### Homelab

If public:
- GitHub repo,
- infrastructure notes,
- writeup.

If not public:
- EN: `Self-hosted project, no public repository`
- TR: `Kişisel sunucu projesi, herkese açık repo bulunmuyor`

Use a simple inline text link or compact row.

Do not introduce a new button component.

### Verify

- `bun run lint`
- `bun run build`
- Every project has one clear destination or explicit private note.
- EN and TR remain synchronized.

---

## Task 8: Rewrite Generic Portfolio Copy

**Files:**
- Modify: `src/features/i18n/translations/en.json`
- Modify: `src/features/i18n/translations/tr.json`

**Keys:**
- `hero.description`
- `contact.intro`
- `about.description`

### Problem

The current About opener uses generic CV language such as being responsible, adaptable, eager to learn, and an efficient team member.

The Contact intro also repeats the same general positioning already communicated by the hero.

### Change

#### Hero

Keep it personal and concise. It should describe what kind of work you enjoy rather than list personality adjectives.

#### About

Use one concrete sentence containing:
- current study status,
- technical focus,
- the type of engineering work or opportunity you are interested in.

Avoid:
- responsible,
- adaptable,
- hard-working,
- team player,
- eager to learn,
- passionate,
- innovative,
- results-driven.

unless the sentence gives specific evidence.

#### Contact

Make it next-step oriented.

Example direction:

EN:
```text
Based in Denizli. You can reach me in Turkish or English for software development, internship, and project opportunities.
```

TR:
```text
Denizli'deyim. Yazılım geliştirme, staj ve proje fırsatları için Türkçe veya İngilizce iletişime geçebilirsiniz.
```

Do not copy these examples blindly if better wording matches the rest of the site.

### Verify

- `bun run lint`
- `bun run build`
- Hero, About, and Contact serve different purposes.
- No generic CV filler remains.

---

## Task 9: Reduce Decorative Motion

**Files:**
- Modify: `src/App.tsx`
- Modify `src/components/ClickSpark.tsx` only if needed after simplification.
- Do not rewrite `LightRays.tsx`.
- Delete `LightRays.tsx` only if it becomes unused and the removal is clean.

### Problem

The page currently combines several motion systems:

- LightRays
- ClickSpark
- SpotlightCard hover glow
- GSAP / AnimatedContent
- Open to Work ping
- Skills marquees

After Task 4, the Skills marquees are gone, but the ambient background still adds significant implementation complexity for little visible payoff.

### Change

Remove LightRays from `App.tsx`.

Do not replace it with another animated background.

Keep:
- section entrance motion,
- hover feedback,
- status ping,
- ClickSpark for now.

Then evaluate ClickSpark visually after LightRays is removed.

If ClickSpark still makes the page feel gimmicky, remove it in a separate small diff rather than replacing it.

### Rationale

One user-triggered decorative interaction is less intrusive than a permanent WebGL ambient effect.

### Verify

- `bun run lint`
- `bun run build`
- No WebGL background loads.
- Page background is clean.
- Existing entrance animations still work.
- Click interaction has no console errors.

---

## Task 10: Replace Inter + DM Sans with Open Sans

**Files:**
- Modify the global stylesheet that imports fonts.
- Modify Tailwind/theme typography configuration if font family aliases exist.
- Modify `package.json` / lockfile only as required.

### Problem

The page currently uses Inter and DM Sans, which introduces a second typographic voice without providing much differentiation.

A single Open Sans family is preferred for this revision.

### Change

1. Add `@fontsource/open-sans` if it is not already installed.
2. Import only:
   - latin 400
   - latin 500
   - latin 600
   - latin 700
   - latin-ext 400
   - latin-ext 500
   - latin-ext 600
   - latin-ext 700
3. Set body and heading font aliases to Open Sans.
4. Remove Inter and DM Sans imports.
5. Remove their packages if no longer used.
6. Do not compensate with extra letter-spacing everywhere.
7. Recheck heading weight after migration because Open Sans has different visual density.

### Verify

- `bun run lint`
- `bun run build`
- No Inter or DM Sans files in the final build output.
- Turkish characters render correctly.
- Heading/body hierarchy still reads clearly.
- 390px layout does not change unexpectedly due to font metrics.

---

# Per-task Verification Gate

Before marking any task complete:

1. Run:
   ```fish
   bun run lint
   ```

2. Run:
   ```fish
   bun run build
   ```

3. Run:
   ```fish
   bun dev
   ```

4. Check touched areas at:
   - 1280px desktop
   - 390px mobile

5. Confirm:
   - no horizontal overflow,
   - no wrapped CTA labels,
   - no missing translation keys,
   - no console errors,
   - no unused imports introduced,
   - no new decorative UI pattern was added to replace a removed one.

---

# Suggested Implementation Order

| Order | Task | Effort | Reason |
|---|---|---:|---|
| 1 | Task 2: remove divider | 5 min | Tiny diff, removes template motif immediately |
| 2 | Task 1: hero CTA cleanup | 20-30 min | High visual impact |
| 3 | Task 8: rewrite copy | 20 min | Removes generic AI/CV language |
| 4 | Task 10: Open Sans migration | 20-30 min | Establishes final typography before visual tuning |
| 5 | Task 5: accent lock | 15-20 min | Clarifies visual identity |
| 6 | Task 4: remove Skills marquees | 30-45 min | Major reduction in template-like motion |
| 7 | Task 6: flatten About cards | 30-45 min | Breaks repeated card vocabulary |
| 8 | Task 3: section rhythm | 30-45 min | Tune layout after card/skills changes |
| 9 | Task 7: project destinations | 20-30 min | Requires final public/private link decisions |
| 10 | Task 9: remove LightRays | 15-30 min | Final motion cleanup after static layout is visible |

---

# Open Questions Before Task 7

1. Thesis:
   - Public repository?
   - Demo?
   - PDF / abstract?
   - Presentation?
   - Or mark private?

2. Homelab:
   - Public GitHub repository?
   - Public writeup?
   - Infrastructure notes?
   - Or mark as self-hosted with no public repository?

Do not block Tasks 1-6, 8-10 on these questions. Only Task 7 depends on them.
