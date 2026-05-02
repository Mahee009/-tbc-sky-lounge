# TBC Sky Lounge — Product Requirements

## Original Problem Statement
Build a high-end, cinematic, luxury rooftop lounge website for "To Be Continued Sky Lounge (TBC), Bangalore". Premium rooftop nightlife experience combining urban luxury + natural greenery + ambient lighting + modern architecture. Dark forest-black palette with green/gold/sky accents, glassmorphism, parallax, and cinematic motion-first interactions.

User follow-up: Major motion upgrade — letter-by-letter heading reveals, smooth Lenis scroll, Ken Burns on images, hero video scroll-parallax, blur-to-focus section transitions, button glow + micro bounce, card tilt + lift.

## User Personas
- **Bangalore date-night couples** browsing for an upscale rooftop dinner
- **Group celebrants** (birthdays, anniversaries) wanting private cabanas
- **Friday-night urbanites** seeking DJ + cocktail evenings with a view
- **Tourists / business travellers** in Marathahalli–Sarjapur ORR area

## Tech Stack
- React 19 + Tailwind CSS + shadcn/ui base tokens
- framer-motion (page reveals, parallax, tilt)
- lenis (global smooth scroll)
- sonner (toast)
- lucide-react (icons)
- Cormorant Garamond (headlines) + Outfit (body) via Google Fonts
- Frontend-only (display-only reservation, no backend integrations)

## Implemented Features (May 2026)
- Sticky glass navbar with mobile drawer + Lenis-driven anchor scroll
- Hero: real venue cinematic video (autoplay/muted/loop/no-controls), scroll-driven scale + drift, poster-image fallback, animated letter-reveal headline, glowing CTAs
- About: asymmetric parallax collage with rotation + Y shifts, char/word headline reveal, drop-cap intro, animated stat counters
- Experience: 5-card bento grid with mouse-tilt 3D cards, accent-color glow rings, animated icons + reveal underline
- Menu: 3 signature cocktail cards (placeholder pricing) with Ken-Burns + tilt; small-plates editorial list with staggered reveals; "menu coming soon" disclaimer
- Gallery: 8 real venue images in 3-col desktop / 2-col mobile masonry; framer-motion lightbox with arrow + keyboard navigation, blur-to-focus transitions, lenis pause on open
- Reservation: display-only luxury form (Name, Phone, Date, Time, Guests, Occasion) with sonner toast confirmation, validation, animated field reveals
- Footer: editorial "See you on the rooftop" line, address, hours, social/phone/email links with accent-color hover glow, "Continued." watermark
- Global: smooth Lenis scroll, grain overlay, custom scrollbar, btn-lux glow class, Ken-Burns class, lift class, section-level scroll-linked scale + opacity for film-like flow

## Real Venue Assets
- Hero video: served from `/public/media/tbc-hero.mp4`
- 8 interior/exterior photos used across About, Experience, Menu, Gallery
- Venue: 5th Floor, Berry's Hotel, Marathahalli–Sarjapur ORR, Kadubeesanahalli, Bengaluru 560103
- Phone: +91 76249 59444 · Instagram: @tbc.skylounge

## Backlog / Next Items
- **P1**: Replace placeholder cocktail/plate names + pricing with real menu when client provides
- **P1**: Add photo gallery upload pipeline if client wants to expand gallery without code edits
- **P2**: Hook reservation form to email (Resend) or WhatsApp Business API for actual confirmations
- **P2**: Add an Events / Live-music calendar section
- **P2**: Add bilingual (English/Kannada) toggle
- **P3**: Add SEO meta + Open Graph image and structured data (Restaurant schema)
- **P3**: Add lazy-loaded testimonials carousel (Zomato / Google reviews)
