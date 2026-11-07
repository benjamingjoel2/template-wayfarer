# Wayfarer

A Tourground Launch Pad template for slow, private travel brands. It has a full-screen photo hero with a serif headline in the bottom-left, scroll-driven sections (stacked cards, a zooming photo, panels that stack on scroll, a drifting day-by-day itinerary), a journeys page and an enquiry form with a month picker.

Built with Next.js, Tailwind CSS v4 and Motion.

## Launch a new brand

1. **Copy the template.** Create a new repo from this one, then run `npm install`.
2. **Edit `site.config.ts`.** It is the only file you need to change. Replace every placeholder:
   - `brand`: name, tagline, description, monogram, an optional logo
   - `destination`: name, time zone, sunrise city, one line per month
   - `colors`: ten hex values (the defaults are the original palette)
   - `fonts`: display and body families, loaded from Google Fonts
   - every `photo`: hero, sections, stays, journeys, FAQ
   - `journeys`: the one marked `featured: true` shows its itinerary on the home page
   - `contact`, `footer`, `plan` (currencies and budgets), `legal`
3. **Add your photos.** Put them in `public/photos/` and point to them as `{ src: "/photos/hero.jpg", alt: "…" }`. The placeholder photos come from picsum.photos and must all be replaced.
4. **Set environment variables** on your host:
   - `NEXT_PUBLIC_SITE_URL`: your production URL, used for canonical and Open Graph tags
   - `ENQUIRY_WEBHOOK_URL`: where plan-form enquiries are sent as JSON (for example a Zapier, Make or CRM webhook). If you don't set it, enquiries are only written to the server log.
5. **Check it and deploy.**
   ```bash
   npm run dev     # http://localhost:3000
   npm run build   # must pass before you deploy
   ```
   Deploy to any Node host that runs Next.js, such as Vercel.

The footer shows `© <current year> <brand name>`, taken from the config.

## Good to know

- **Long brand names:** the hero headline shrinks so the name stays on one line. To choose where it splits, set `brand.heroWords`, for example `["Way", "farer"]`.
- **Local script:** `brand.nativeName`, and the `native` fields on values and night stages, show optional text in a second script (set `fonts.native` to match).
- **Pages:** `/`, `/journeys`, `/plan` (journey and stay links prefill it), `/legal/[slug]`, and the enquiry API at `/api/enquiry`.
- **Reduced motion:** every animation turns off when the visitor's system asks for reduced motion.
- **Phones:** no page scrolls sideways at 320px to 430px.
