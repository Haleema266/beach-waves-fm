# Design Brief — Poolsuite FM

## Tone
Retro maximalist tropical — 80s/90s beach resort energy with modern UI clarity. Vibrant, warm, nostalgic.

## Differentiation
CRT scanline aesthetic + tropical color saturation + large, touchy-friendly controls. Deep navy background contrasts with warm sand/coral accents for high energy.

## Color Palette

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|-----------|-------|
| Primary (Sand) | L78 C16 H55 | L68 C18 H55 | Interactive elements, buttons, highlights |
| Secondary (Ocean Teal) | L72 C15 H185 | L65 C12 H185 | Links, secondary UI, supporting elements |
| Accent (Coral Pink) | L68 C22 H15 | L62 C19 H15 | Call-to-action, play buttons, notifications |
| Background | L12 C01 H260 | L96 C01 H55 | Page background, dark navy (night resort feel) |
| Foreground | L92 C01 H55 | L12 C02 H260 | Body text, warm cream on dark |
| Muted | L25 C01 H260 | L92 C01 H0 | Secondary text, disabled states |
| Border | L24 C02 H260 | L88 C02 H55 | Dividers, card edges |

## Typography

| Role | Font | Scale | Weight |
|------|------|-------|--------|
| Display | Lora Serif | 32–48px | 700 (Bold) |
| Body | DM Sans | 14–16px | 400–600 |
| Mono | Geist Mono | 12–14px | 400 |

Serif display font evokes retro resort signage. Sans-serif body ensures readability on player controls.

## Elevation & Depth

- **Base**: Navy background (L12)
- **Card**: Slightly elevated (L16, subtle shadow md)
- **Popover**: Higher elevation (L20, shadow-lg)
- **Active**: Button press insets with shadow-inner; hover lifts with shadow-md

## Structural Zones

| Zone | Style | Rationale |
|------|-------|-----------|
| Header/Nav | bg-card with border-b, primary accent | Tropical resort reception desk |
| Now-Playing | bg-card scanlines overlay, elevated shadow | Premium album art display |
| Channel Grid | bg-muted cards with gradient overlay | Beach kiosk cards |
| Playback Controls | btn-tropical retro styling | Retro resort equipment |
| Footer | bg-muted/50 border-t, dimmed text | Subtle, unobtrusive |

## Component Patterns

- **Button**: `.btn-tropical` — bold color, beveled shadow, text-shadow
- **Card**: Rounded corners (0.875rem), subtle scanline overlay, gradient on hover
- **Player**: Large centered play/pause (3rem min), coral accent glow
- **Mini-player**: Fixed nav position, compact row layout
- **Progress Bar**: Warm sand color, rounded endpoints

## Motion

- **Transitions**: 0.3s cubic-bezier for all interactive elements
- **Play Button Glow**: `pulse-glow` animation (subtle brightness oscillation)
- **Page Fade**: `fade-in` 0.4s on route transitions
- **Hover States**: Lift shadow (shadow-sm to shadow-md), brighten accent

## Spacing & Rhythm

- **Gap**: 1rem between card grid items
- **Padding**: 1.5rem on cards, 2rem on sections
- **Margin**: 3rem between major sections
- Maintains rhythm via 4px baseline grid

## Signature Detail

**CRT Scanlines**: Repeating horizontal lines (0.08 opacity) overlay on album art, player buttons, and key cards. Reinforces retro-futuristic beach resort vibe. Transparent enough not to reduce readability.

## Constraints

- **No dark text on warm backgrounds** — contrast ≥ 4.5:1 for AA compliance
- **Max 3 interactive colors per view** — avoid chaotic tropical excess
- **Typography hierarchy**: Display font only for major titles; body font for UI labels
- **Always show mini-player** when track is playing — persistent awareness

## Dark Mode Default
All screenshots and states assume dark mode (navy background, warm sand foreground). Light mode available as toggle but not primary aesthetic.
