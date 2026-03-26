# AS Theme

A modern, fully editable portfolio theme built with **Custom Gutenberg Blocks**. Designed for designers, developers, and freelancers who want a professional one-page portfolio with full WordPress Site Editor support.

**[Live Demo](https://adamskrzypczak.com)**

## Features

- **10 Custom Gutenberg Blocks** — Hero, Dark Section, About, Featured Project, Portfolio, Testimonials, Services, Contact, Header, Footer
- **Full Site Editing** — every section is editable from the WordPress block editor
- **Responsive** — mobile-first design that looks great on all devices
- **Fast** — optimized for performance with bundled JS, local fonts, and minimal dependencies
- **Customizable colors** — change the entire color palette from Styles panel
- **Marquee animation** — smooth infinite scroll for logos/tools section
- **Swiper testimonials** — autoplay slider with navigation arrows
- **Count-up stats** — animated number counters with IntersectionObserver
- **Scroll reveal** — subtle entrance animations on scroll
- **Typewriter effect** — configurable rotating words in the hero
- **Portfolio hover scroll** — full-page screenshot scroll on card hover
- **Contact form** — built-in REST API endpoint with honeypot spam protection
- **Lucide icons** — 1500+ icons available, pick any by name

## Requirements

- WordPress 6.7+
- PHP 8.0+
- Node.js 18+ (for development only)

## Installation

1. Download the [latest release](https://github.com/ASkrzypczak/as-theme/releases) or clone:
   ```bash
   git clone https://github.com/ASkrzypczak/as-theme.git
   ```
2. Upload the `as-theme` folder to `/wp-content/themes/`
3. Activate in **Appearance > Themes**
4. Go to **Pages > Add New**, create a "Home" page
5. Set it as homepage in **Settings > Reading > A static page**

## Custom Blocks

| Block | Description | Editable Fields |
|-------|-------------|-----------------|
| **Hero** | Hero section with typewriter, email form, parallax photo | Heading, subtitle, words, photo, form text |
| **Dark Section** | Logos marquee, animated stats, tools | Logos (upload), stats (number/label), speed |
| **About** | Bio text + skills grid | Tag, heading, paragraphs, skill groups |
| **Featured Project** | Showcase card with dark/light theme + reverse layout | All text, image, tags, links, theme toggle |
| **Portfolio** | Project grid with hover-scroll screenshots | Projects (image, title, subtitle, category, URL) |
| **Testimonials** | Swiper slider + proof badges | Slides (text, author, stars, URL), badges |
| **Services** | Service cards with Lucide icons | Cards (icon, title, items, price, link) |
| **Contact** | Info links + contact form | Heading, description, links, form labels |
| **Header** | Fixed glassmorphism navigation | Logo, nav links, CTA button |
| **Footer** | Copyright + social links | Copyright text, tagline, links |

## Development

```bash
cd wp-content/themes/as-theme
npm install
npm run build    # Build blocks for production
npm run start    # Watch mode for development
```

## Customization

### Colors
Go to **Appearance > Editor > Styles > Colors** to change the color palette. All blocks respect the global color settings.

### Fonts
Fonts are loaded locally from `assets/fonts/`. To change fonts, replace the files and update `functions.php`.

### Contact Form
The form sends emails via `wp_mail()`. For reliable delivery, install a SMTP plugin like **WP Mail SMTP** and configure it with your email provider.

## License

GPL v2 or later. See [LICENSE](LICENSE) for details.

## Credits

- [Lucide Icons](https://lucide.dev) — MIT License
- [Swiper](https://swiperjs.com) — MIT License
- [Inter Font](https://rsms.me/inter/) — SIL Open Font License
- [DM Mono Font](https://fonts.google.com/specimen/DM+Mono) — SIL Open Font License

---

Built by [Adam Skrzypczak](https://adamskrzypczak.com)
