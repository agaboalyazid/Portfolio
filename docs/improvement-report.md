# Portfolio improvement report

Review of the `redesign` branch, 15 November 2026.
Nothing in this report has been implemented. Each item needs your approval first.

Measured on the live build at desktop (1440px), laptop (1024px), tablet (768px) and
mobile (375px), in light and dark mode, with and without JavaScript.

**Summary:** the site is in good shape. The automated accessibility and HTML checks are
clean, every text colour passes the contrast requirement, the page weight is 334 KB and it
finishes loading in about 130 ms. The items below are refinements, not repairs — except
items 1 and 2, which are small real defects.

Priorities: **High** = affects whether a recruiter understands or trusts the site.
**Medium** = noticeable polish. **Low** = nice to have.

---

## A. Content and what's missing

### A1. Three of the five projects have no picture of the result — High

**Issue.** The two Excel dashboards show a screenshot. The Power BI dashboard, the SQL
warehouse and the banks ETL pipeline show only diagrams and tables. A recruiter opening the
Power BI project never sees the report.

**Why.** For an analytics project, the visual *is* the deliverable. A case study without one
asks the reader to take the result on trust.

**Recommendation.** Add a screenshot of each Power BI report page (three images), and for
the two engineering projects a screenshot of something real — SSMS showing the Gold views,
or the pipeline's log output. These are files only you have.

### A2. The two dashboard screenshots are low resolution — Medium

**Issue.** They are 612px and 723px wide and display at roughly that size, so they look soft
on a modern screen and can't be enlarged.

**Why.** It's the main evidence of the analytics work, and it looks blurrier than the rest
of the page.

**Recommendation.** Re-export at 1600px or wider. Optionally let them open full-size on
click.

### A3. "Superstore" charts are titled "per Net Salary" — Medium

**Issue.** Several chart titles in the Superstore workbook read "per Net Salary" where the
measure is sales or profit. The screenshot on the site shows this.

**Why.** It reads as a copy-paste slip in work presented as evidence of care with data.

**Recommendation.** Fix the titles in the workbook, then recapture the screenshot.

### A4. No data sources named on the analytics projects — Medium

**Issue.** The Excel and Power BI projects don't say where the data came from (sample
dataset, public dataset, generated). The two engineering projects do name their course
source.

**Why.** A reviewer wants to know whether figures like "$2,297,201 total sales" are real
client data or a public sample. Silence invites the less flattering guess.

**Recommendation.** One line in the facts strip, e.g. "Source · public sample dataset".
You asked to leave this unspecified for now — raising it again because it's the single
question a technical reviewer is most likely to ask.

### A5. Two projects are missing — Low

**Issue.** Bike Sales and the SQL Data Cleaning project are listed on your CV but not here.

**Why.** SQL data cleaning is directly relevant to the data-engineering direction the hero
describes.

**Recommendation.** Add them once you can share the files.

### A6. Nothing says what you're looking for, specifically — Medium

**Issue.** "Open to full-time, contract and freelance work" sits in small grey text at the
bottom of the hero, and the Contact section repeats the same general idea.

**Why.** A recruiter scanning for fit wants the specifics: remote only or will relocate,
notice period, preferred role.

**Recommendation.** Make the availability line a short, confident sentence near the contact
buttons: role sought, remote/relocation, when you can start.

### A7. The timeline mixes training and employment without saying so — Medium

**Issue.** The Experience section is headed "Data training & development" and lists ALX and
DEPI entries that look like jobs (role title, organisation, bullet points).

**Why.** You were explicit that these are training programmes, not employment. A reader
skimming may take them as jobs, which risks a credibility problem later.

**Recommendation.** A one-line note under the heading: "Training programmes, not
employment." It costs nothing and removes the ambiguity.

---

## B. Layout, spacing and hierarchy

### B1. The hero fills the whole first screen with no sign of what's below — High

**Issue.** The hero is 924px tall on desktop and 1185px on mobile. At a 900px window,
nothing below it is visible, not even the edge of the stats strip.

**Why.** A visitor's first scroll is a decision. If the first screen shows no hint of
projects, some won't make it.

**Recommendation.** Reduce the hero's bottom padding so the stats strip peeks above the
fold (roughly 40–60px less). Optionally pull the stats into the hero.

### B2. The page is long on mobile — Medium

**Issue.** 10,369px on mobile versus 6,550px on desktop. Everything stacks into one column.

**Why.** Long single-column pages lose readers before the Contact section.

**Recommendation.** Tighten section padding on mobile (currently 72px between sections), and
consider showing three projects with a "Show all" control.

### B3. Project cards are tall relative to their content — Low

**Issue.** Each card is 460–500px, with a 190px image area even for the card whose "visual"
is three numbers (3 pages / 8 tables / 6 measures).

**Why.** Five cards at 500px is a lot of scrolling for five projects.

**Recommendation.** Reduce the visual area to about 150px, or give that card a real
screenshot (see A1).

### B4. The analytics cards are narrower but carry equal content — Low

**Issue.** Engineering cards span 3 of 6 columns, analytics cards 2 of 6, so analytics
titles wrap onto two lines while descriptions are the same length.

**Why.** The width difference signals "less important", which may not be your intent given
that three of five projects are analytics.

**Recommendation.** Either shorten the analytics descriptions to match the narrower column,
or use equal widths in two rows.

---

## C. Typography and readability

### C1. The hero summary is now smaller than the body text elsewhere — Medium

**Issue.** The summary is 15px in muted grey; project descriptions are 15.5px and body text
is 17px. The most important paragraph on the site is the smallest.

**Why.** It swung from too large to slightly too small. Contrast is 5.88:1 — fine, but light
for the lead paragraph.

**Recommendation.** 16px, and use the main text colour rather than muted. The two-paragraph
length is right.

### C2. Small text in several places — Low

**Issue.** Card labels and the identity-visual captions are 10.5–11.5px.

**Why.** Below 12px is hard work on a laptop screen, especially in uppercase mono.

**Recommendation.** Raise anything below 12px to 12px.

### C3. The service and project descriptions have no verbs — Low

**Issue.** "Consistent, de-duplicated, checked data", "Built on a clean data model".

**Why.** Fragments read as a spec sheet. A client reading the Services section wants to know
what they get.

**Recommendation.** Keep them short but make them sentences: "I clean, de-duplicate and
validate your data so the numbers can be trusted."

---

## D. Responsive behaviour

### D1. Tablet shows the desktop layout at an awkward width — Medium

**Issue.** At 768px the nav collapses to a menu button, but Services keeps its three-column
star layout, leaving the centre card just 205px wide between two narrow columns.

**Why.** Tablet is a real device class, and this is the widest viewport where the layout
looks cramped rather than deliberate.

**Recommendation.** Switch Services to the mobile stacked arrangement at 900px instead of
760px.

### D2. The timeline rail disappears on mobile — Low

**Issue.** On mobile the date column moves above each entry and the connecting rail becomes
very short.

**Why.** It's the element that makes the section read as a timeline.

**Recommendation.** Keep the rail and dots running the full height on mobile.

### D3. The 404 page is sparse — Low

**Issue.** Title, one line and two buttons.

**Why.** A 404 from a stale CV link is a chance to keep the visitor.

**Recommendation.** Add links to the five projects.

---

## E. Navigation, buttons and interaction

### E1. No way back to the top of a long page except the footer — Medium

**Issue.** The header is sticky, so the menu stays reachable — but on mobile reaching
Contact means either the menu button or scrolling to the footer link.

**Why.** Minor, but 10,000px of mobile page makes it felt.

**Recommendation.** The sticky header already covers this; consider a floating "Contact"
button on mobile instead.

### E2. External links don't say they leave the site — Low

**Issue.** Certificate, review and platform links open in the same tab. Several show "↗",
but not all.

**Why.** A recruiter mid-review who lands on DataCamp has lost their place.

**Recommendation.** Either open external links in a new tab (with `rel="noopener"`), or show
"↗" consistently on all of them. Opening in a new tab is the stronger choice for
certificates.

### E3. The project filter is hidden without JavaScript — Low

**Issue.** Correct behaviour (all five cards show), worth noting as deliberate.

**Why.** No action needed; recording it so it isn't "fixed" by mistake.

**Recommendation.** Leave as is.

### E4. The hero identity visual only animates on hover — Low

**Issue.** The scattered marks align when you hover, so most visitors never see it, and
touch users can't.

**Why.** The animation is what makes the point.

**Recommendation.** Play it once when it scrolls into view, respecting reduced-motion.

---

## F. Accessibility

### F1. Dashboard screenshots have empty alt text on the homepage — Medium

**Issue.** The two project cards use `alt=""`. The same images on the project pages have
full descriptions.

**Why.** The decision was defensible (the card text describes the project), but a screen
reader user hears nothing where sighted users see the deliverable.

**Recommendation.** Short alt text: "Excel dashboard for digital wallet transactions".

### F2. Arabic review text has no English equivalent — Medium

**Issue.** You removed the translations by request. A non-Arabic-speaking recruiter now sees
two blocks they can't read.

**Why.** The reviews are social proof. Untranslated, they prove only that reviews exist.

**Recommendation.** Keep the Arabic as the card's main text and add the translation as
small, muted text below — or on a toggle. Your call; noting the trade-off.

### F3. Contrast is good but close to the line in places — Low

**Issue.** Muted text measures 5.43–6.15:1 against its background. The requirement is 4.5:1.

**Why.** Fine as is. Flagged because several items above suggest *more* muted text, which
would erode the margin.

**Recommendation.** Treat 4.5:1 as the floor for anything new.

---

## G. Performance

### G1. Seven font files load on every page — Medium

**Issue.** 189 KB of fonts across seven files, including two Arabic weights that only the
reviews need.

**Why.** Fonts are the largest single part of the 334 KB page.

**Recommendation.** Drop to one Arabic weight, and preload only the regular Latin weight
(already done). Saves roughly 50 KB.

### G2. Only one font is preloaded — Low

**Issue.** The 500 and 600 weights (used by headings) load after the stylesheet, so headings
can reflow slightly.

**Why.** Small visible shift on first load.

**Recommendation.** Preload the 600 weight too.

### G3. Images are already well handled — no action

Both screenshots are WebP, lazy-loaded, with width and height set. Nothing to change.

---

## H. Technical notes

### H1. The site has no build step — no action

The HTML is generated by a Python script and committed. Worth keeping: it means the site
has no dependencies and can't break on a failed build.

### H2. Consider a `humans.txt` or visible "last updated" — Low

**Issue.** Nothing shows when the site was last touched.

**Why.** A recruiter can't tell whether it's current. Dates on projects help, but the newest
is July 2026.

**Recommendation.** A small "Updated November 2026" in the footer.

### H3. The CV is linked but not dated — Low

**Issue.** The "Download CV" button doesn't say when the PDF was last revised or how big it
is.

**Why.** Minor trust signal; also avoids surprise downloads on mobile data.

**Recommendation.** "Download CV (PDF, 62 KB)".

---

## Suggested order

**Do first (High):** A1 project screenshots · B1 hero height

**Then (Medium):** A3 chart titles · A4 data sources · A6 availability · A7 training note ·
B2 mobile length · C1 summary size · D1 tablet services · E1 mobile contact · F1 alt text ·
F2 review translations · G1 fonts

**When convenient (Low):** everything else.

Items A1, A3 and A5 need files or decisions from you. The rest I can implement on request.
