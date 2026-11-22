# Ebhar Line — Sector pages (React + Vite)

Six self-contained pages, one folder each (`.jsx` + `.css`):

| Folder | Sector (menu label) |
|---|---|
| EngineeringConsultancy | الاستشارات الهندسية |
| ProjectManagement | إدارة المشاريع |
| ConstructionContracting | الإنشاءات والمقاولات |
| InfrastructureEnergy | البنية التحتية والطاقة |
| LogisticsServices | الخدمات اللوجستية |
| ProfessionalTraining | التدريب المهني |

`index.js` re-exports all six.

## Usage
```jsx
import { EngineeringConsultancy } from "./sectors";
<EngineeringConsultancy />            // language from <html dir>
<EngineeringConsultancy lang="en" />  // or force "ar" | "en"
```

Props: `lang`, `Link` (e.g. react-router `Link`, uses a `to` prop), `routes`
(override the URL builders in `DEFAULT_ROUTES`).

## Edit these at the top of each .jsx
- `IMG` – images folder (default `/assets/images/`, i.e. `public/assets/images`)
- `DEFAULT_ROUTES` – home / sectors / sector(slug) / project / contact URLs
- `SECTOR` – all Arabic + English text and project data for that page

## Needs from your global CSS (style.css)
CSS variables (`--red`, `--navy`, `--muted`, `--line`...), `.container`,
`.eh-hero__scroll`, `.el-cta*`, `.el-reveal-item`, `.el-chevron`, `.down-icon`.
`<html>` must carry `lang` and `dir` (sector.css uses `html[dir="rtl"]`).

## Not included (stays in your layout)
Header, footer, WhatsApp button. The page adds the class `sc-sector` to
`<body>` while mounted (used by the sector css for the nav highlight).

Project text on all pages except Engineering Consultancy is new placeholder
content in the same illustrative style; replace it with real projects.
