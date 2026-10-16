# textpix.org DNS records (reference)

Registered and hosted at Cloudflare under textpixcollective@gmail.com. Recorded 2026-10-15 from the Brevo domain-authentication screen; the live state is in Cloudflare, not here.

| Purpose | Type | Name | Content | Proxy |
|---|---|---|---|---|
| Email receiving (Cloudflare Email Routing) | MX ×3 | @ | route1/2/3.mx.cloudflare.net | n/a |
| SPF for Email Routing | TXT | @ | v=spf1 include:_spf.mx.cloudflare.net ~all | n/a |
| Brevo domain verification | TXT | @ | brevo-code:a82dc48ae88719fd084a958042d170d5 | n/a |
| Brevo DKIM 1 | CNAME | brevo1._domainkey | b1.textpix-org.dkim.brevo.com | off |
| Brevo DKIM 2 | CNAME | brevo2._domainkey | b2.textpix-org.dkim.brevo.com | off |
| DMARC (monitor only) | TXT | _dmarc | v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com | n/a |

Check from a terminal: `dig +short TXT textpix.org`, `dig +short CNAME brevo1._domainkey.textpix.org`, `dig +short TXT _dmarc.textpix.org`.
