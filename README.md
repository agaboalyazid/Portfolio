# Portfolio: Ashraf Aboalyazid

Personal portfolio of Ashraf Aboalyazid, Data Engineer | Data Analyst. Live at https://agaboalyazid.github.io/Portfolio/

A static site: hand-written HTML, CSS and a small vanilla JavaScript file, served by GitHub Pages with no build step.

## Structure

```
index.html                 Homepage
projects/<slug>/index.html Project pages (2 data engineering, 3 analytics)
404.html                   Not-found page
assets/css/tokens.css      Colours (light + dark), fonts — the only place colours are defined
assets/css/main.css        Layout and components
assets/js/main.js          Theme toggle, mobile menu, project filter, active nav, copy email
assets/fonts/              IBM Plex Sans / Mono / Sans Arabic (SIL Open Font License)
assets/cv/                 CV (PDF)
assets/og/                 Social preview image
```

`assets/Ashraf Aboalyazid.pdf` is kept at its old path so links shared before the redesign still work.

## Run locally

```
python3 -m http.server 8000
```

then open http://localhost:8000/.
