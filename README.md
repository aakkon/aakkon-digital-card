# AAKKON Digital Card

Personal portfolio and digital card for DevOps, automation and cloud architecture work.

Live at: [aakkon.github.io/aakkon-digital-card](https://aakkon.github.io/aakkon-digital-card)

## Adding a new project

Edit `projects.json` and add an entry:

```json
{
  "id": "my-project",
  "title": "My Project",
  "summary": "Short description for the card.",
  "description": "Extended description for the modal.",
  "status": "Public repository",
  "link": "https://github.com/aakkon/my-project"
}
```

Push to `main` — GitHub Pages deploys automatically.

## Stack

Static HTML + CSS + vanilla JS. No build step, no dependencies.

- **Font**: Space Grotesk (Google Fonts)
- **Data**: `projects.json` loaded dynamically via `fetch`
- **Hosting**: GitHub Pages
