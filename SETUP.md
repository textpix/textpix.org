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

- [ ] Create a Google account for the collective, e.g. `textpixcollective@gmail.com`.
      Every service below is signed up with this address.
- [ ] Store its password in a shared password manager vault (1Password or
      Bitwarden both offer shared vaults). Add Dennis and Laura.
- [ ] Turn on two-step verification. Use an authenticator app or passkey kept
      in the shared vault, not one person's phone number.
- [ ] Keep sign-up forms, RSVPs and shared files in this account's Google Drive.

## 2. Domain: textpix.org on Cloudflare (15 min)

Cloudflare sells domains at cost (about $8.50 the first year for .org and
about $11 a year to renew) and also hosts the site, so everything lives in one
place.

- [ ] Sign up at dash.cloudflare.com with the shared Gmail.
- [ ] Domain Registration → Register Domains → `textpix.org`.
- [ ] Registrant name: "Text + Pix Collective" as the organization, with one
      organizer as the contact (Cloudflare keeps this private).
- [ ] Turn on auto-renew. Note whose card pays and the renewal month in the
      shared vault.
- [ ] Manage Account → Members: invite Dennis and Laura (as Administrator) so
      access never depends on one person.
- [ ] Optional: also register `textpixcollective.org` and redirect it to
      textpix.org.

## 3. Email: hello@textpix.org (10 min)

- [ ] In Cloudflare, open textpix.org → Email → Email Routing → enable.
- [ ] Add the rule `hello@textpix.org` → forwards to the shared Gmail. Optionally
      forward it to each organizer as well.
- [ ] Send a test message to hello@textpix.org.

Replies go out from the shared Gmail for now. Sending *as*
hello@textpix.org can be added later if it matters.

## 4. GitHub: the code's home (20 min)

GitHub organizations must be created by a personal account, but the
organization owns the repository, and you can add other owners.

- [ ] Signed in to your own GitHub account, create a free organization
      named `textpix` (or `textpix-collective` if that's taken). Set its
      contact email to the shared Gmail.
- [ ] Invite Dennis and/or Laura as owners, if they have GitHub accounts.
- [ ] Create a repository named `textpix.org` (public is fine; nothing secret
      lives in it).
- [ ] Upload the site files. Easiest: on the empty repository's page, click
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

## 6. Mailing list: Buttondown (15 min)

Buttondown is simple, ad-free and works with a plain form on the site. It's
free up to 100 subscribers, then about $9/month up to 1,000.

- [ ] Sign up with the shared Gmail. Choose the username `textpix`.
- [ ] Settings: newsletter name "Text + Pix Collective", reply-to
      hello@textpix.org. Turn on double opt-in.
- [ ] Ask Lauren and Mesha for the existing contact list, and import it as a CSV.
- [ ] In `src/_data/site.yaml`, set `buttondown: textpix`. The site's "Email us"
      button becomes a working sign-up form.

If the list will clearly pass 100 people soon, MailerLite or Mailchimp have
larger free tiers. Only the form in `src/_includes/signup.njk` would change.

## 7. Sign-ups for each gathering (5 min per event)

- [ ] For each meeting, make a Google Form in the shared account: name, email,
      affiliation (optional). Responses collect in a Google Sheet.
- [ ] Paste the form link as `rsvp:` on that event in `src/_data/events.yaml`.

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
