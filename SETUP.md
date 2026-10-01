# Launching textpix.org

A one-time checklist for putting the site online under the collective's name
rather than anyone's personal accounts. Do the steps in order; each one
depends on the one before. Allow about two hours, most of it waiting on
confirmation emails.

The principle: **one shared Text + Pix identity owns everything**, and the
organizers get access through it. When leadership passes on, you hand over
one set of keys instead of untangling personal accounts.

---

## 1. Shared identity (15 min)

- [x] Create a Google account for the collective: **textpixcollective@gmail.com**
      (done Oct 1, 2026). Every service below is signed up with this address.
- [ ] Add a second recovery method (another organizer's email) so the account
      doesn't depend on one person's phone.
- [ ] Store its password in a shared password manager vault (1Password or
      Bitwarden both offer shared vaults). Add Dennis and Laura.
- [ ] Turn on two-step verification. Use an authenticator app or passkey kept
      in the shared vault, not one person's phone number.
- [ ] Keep sign-up forms, RSVPs and shared files in this account's Google Drive.

## 2. Domain: textpix.org on Cloudflare (15 min)

Cloudflare sells domains at cost (about $8.50 the first year for .org and
about $11 a year to renew) and also hosts the site, so everything lives in one
place.

- [x] Sign up at dash.cloudflare.com with the shared Gmail.
- [x] Domain Registration → Register Domains → `textpix.org` (done Oct 1, 2026).
- [ ] Registrant name: "Text + Pix Collective" as the organization, with one
      organizer as the contact (Cloudflare keeps this private).
- [x] Turn on auto-renew. Note whose card pays and the renewal month in the
      shared vault.
- [ ] Manage Account → Members: invite Dennis and Laura (as Administrator) so
      access never depends on one person.
- [ ] Optional: also register `textpixcollective.org` and redirect it to
      textpix.org.

## 3. Email: hello@textpix.org (10 min)

- [x] In Cloudflare, open textpix.org → Email → Email Routing → enable.
- [x] Add the rule `hello@textpix.org` → forwards to the shared Gmail (active Oct 1, 2026). Optionally
      forward it to each organizer as well.
- [x] Send a test message to hello@textpix.org (works; first tests landed in Spam).
- [x] In the shared Gmail, add a filter: To `hello@textpix.org` → Never send it
      to Spam, label "textpix.org".

Replies go out from the shared Gmail for now. Sending *as*
hello@textpix.org can be added later if it matters.

## 4. GitHub: the code's home (20 min)

Done Oct 1, 2026: organization `textpix`, repository https://github.com/textpix/textpix.org,
Claude GitHub App installed on the organization.

GitHub organizations must be created by a personal account, but the
organization owns the repository, and you can add other owners.

- [x] Signed in to your own GitHub account, create a free organization
      named `textpix` (or `textpix-collective` if that's taken). Set its
      contact email to the shared Gmail.
- [ ] Invite Dennis and/or Laura as owners, if they have GitHub accounts.
- [x] Create a repository named `textpix.org` (public is fine; nothing secret
      lives in it).
- [x] Upload the site files. Easiest: on the empty repository's page, click
      "uploading an existing file", drag in everything from the
      `textpix-site` folder, and commit. Or, from a terminal in that folder:

      git remote add origin https://github.com/textpix/textpix.org.git
      git push -u origin main

## 5. Hosting: connect GitHub to Cloudflare (15 min)

- [ ] Cloudflare → Workers & Pages → Create → Import a repository.
- [ ] Connect GitHub. When asked where to install the Cloudflare app, pick the
      **textpix organization only**, not your personal repositories.
- [ ] Choose the `textpix.org` repository and set:
  - Build command: `npm run build`
  - Deploy command: `npx wrangler deploy`
- [ ] Deploy. You'll get a temporary `textpix.<something>.workers.dev` address.
      Check it.
- [ ] In the new project → Settings → Domains & Routes → Add → Custom domain:
      add `textpix.org`, then again for `www.textpix.org`.

From now on, any change committed on GitHub is live in a minute or two.

## 6. Mailing list: Brevo (20 min)

Same tool as Mere Editions, but a separate Brevo account for Text + Pix so the
two lists never mix and the collective's list can be handed over cleanly.
The free plan allows unlimited contacts and 300 emails a day, with a small
Brevo logo in each email. If the list grows past 300, a blast would take more
than one day on the free plan; the entry-level paid plan removes that limit.

- [ ] Sign up at brevo.com with the shared Gmail. Company name "Text + Pix
      Collective", website textpix.org.
- [ ] Senders & IP → Domains: add textpix.org and authenticate it. Brevo shows
      a few DNS records; add them in Cloudflare (DNS → Records). This keeps
      email from hello@textpix.org out of spam folders.
- [ ] Senders: add hello@textpix.org as the sender (the confirmation email
      arrives through the forwarding set up in step 3).
- [ ] Contacts → Lists: create a list called "Text + Pix mailing list". Add
      sub-lists later as needed (e.g. one per semester, Manchester
      participants, publication buyers).
- [ ] Ask Lauren and Mesha for the existing contact list and import it as a CSV
      into that list.
- [ ] Contacts → Forms → Create a subscription form tied to that list, with
      double opt-in on. Under the form's success settings, redirect to
      `https://textpix.org/thanks/`.
- [ ] Open the form's "Share" step. Copy:
  - the **embed code**: find `action="https://...sibforms.com/serve/..."`
    in it and paste that address into `brevo: form_action:` in
    `src/_data/site.yaml`, and
  - the **shareable link** into `brevo: form_link:` (used as a backup and
    handy for flyers and QR codes).
- [ ] After the site redeploys, sign up with a test address and confirm it
      lands in the list.

## 7. Sign-ups for each gathering (5 min per event)

Two ways; pick one and stick with it.

- **Brevo** (keeps everything in one place): for each meeting, make a Brevo
  list such as "RSVP 2026-10-26" and a form that feeds it, asking for name and
  email, with a checkbox for "also add me to the mailing list". You can then
  email that meeting's attendees directly (reminders, room changes).
- **Google Forms** (simplest): one form per meeting in the shared Google
  account; responses collect in a Sheet.

Either way, paste the form's shareable link as `rsvp:` on that event in
`src/_data/events.yaml`. A "Reserve a seat" button appears.

## 8. Selling publications (decide before the first one)

Selling needs someone to receive the money. Stripe requires a legal person or
organization with a tax ID, and the collective isn't an organization. Options:

1. Sell through **Mere Editions'** existing setup and account for the
   proceeds separately.
2. One organizer opens a Stripe account as a sole proprietor for the collective.
3. Find a **fiscal sponsor** (a nonprofit that holds funds for groups like
   this). Worth it if you later want grants or tax-deductible donations.

Whichever you pick: create a Stripe Payment Link per publication and paste it
as `buy:` in `src/_data/publications.yaml`. Standard US card fees are around
2.9% + 30¢ per sale.

## 9. Social accounts (20 min)

- [ ] **Instagram** first. The work is visual, and that's where the audience
      already is. Sign up with the shared Gmail; switch to a free Creator or
      Business account. Use the same handle everywhere, e.g.
      `@textpixcollective`.
- [ ] **Bluesky** (optional): it can use the domain itself as the handle,
      `@textpix.org`, verified with one DNS record in Cloudflare.
- [ ] Add the profile links to `social:` in `src/_data/site.yaml`.
- [ ] Use `src/assets/social-card.png` as a starting point for the profile
      image, or swap in something Laura designs.

## 10. Tell people

- [ ] Ask the Duke English Department to add a link to textpix.org on their
      Text + Pix page (and update its Spring 2026 listing).
- [ ] Put textpix.org and the Instagram handle on Laura's fall flyer.
