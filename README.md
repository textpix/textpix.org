# textpix.org

The website of the Text + Pix Collective. It's a small static site built with
[Eleventy](https://www.11ty.dev/) and hosted on Cloudflare. Every change pushed
to the `main` branch on GitHub goes live in about a minute.

## Everyday edits

You'll almost never touch anything outside `src/_data/`.

| To do this | Edit this file |
|---|---|
| Add or change a gathering | `src/_data/events.yaml` |
| Add a publication for sale | `src/_data/publications.yaml` |
| Change the email, venue, mailing-list form, social links, organizers | `src/_data/site.yaml` |
| Change the About page wording | `src/about.njk` |
| Change colors or fonts | top of `src/assets/style.css` |

Each data file has notes at the top explaining every field.

**Events move themselves.** Put every gathering in `events.yaml`. Future ones
show on the Events page; once the date passes they drop off the Events page
and appear in the Archive (the Archive catches up the next time anything is
pushed). After a meeting, add a `recap:` line and maybe an `image:` so the
archive entry has some life to it.

**Sign-ups for a gathering:** make a Brevo form (or a Google Form) for the
meeting, copy its shareable link, and paste it as `rsvp:` on the event. A
"Reserve a seat" button appears.

**Short links** (e.g. textpix.org/nov4 for flyers and QR codes): add a line
to `src/_redirects` — the short path, the destination, and `302`.

**Mailing list:** the sign-up form in every page footer sends addresses to
Brevo. Its settings are under `brevo:` in `src/_data/site.yaml`; SETUP.md
step 6 explains where to find them.

**Selling a publication:** create a Stripe Payment Link for it and paste the
link as `buy:`. Put a cover image in `src/assets/img/`.

**Images:** put files in `src/assets/img/` and refer to them by file name.
Keep them under ~1600 px wide and always write an `image_alt` description.

## Editing without installing anything

On github.com, open a file in `src/_data/`, click the pencil icon, edit,
and click "Commit changes". The site rebuilds on its own. If the change breaks
the build (usually a YAML indentation slip), the old site stays up and
Cloudflare shows the error under the project's Deployments.

## Previewing on your own computer

Requires Node.js 20 or newer.

```
npm install
npm start
```

Then open http://localhost:8080.

## How it's put together

- `src/_includes/base.njk` — the frame around every page (header, footer, mailing-list form)
- `src/_includes/event.njk` — how one event is laid out
- `src/*.njk` — one file per page
- `wrangler.jsonc` — tells Cloudflare to serve the built `_site` folder
- `eleventy.config.js` — date formatting and the upcoming/archive sorting
