# Portfolio website — brand stories, film, photo & design

One-page site in English, French and Arabic (with full right-to-left layout).
Plain HTML, CSS and JavaScript: **no build step, no npm install**. Double-click
`index.html` and it works.

It lives on your Desktop, at `~/Desktop/portfolio`. `PROGRESS.md` in the same
folder is the checklist of what is done and what is left for you to do.

```
portfolio/
├─ index.html            page structure
├─ PROGRESS.md           ← what is done / what is left (tick the boxes)
├─ assets/css/styles.css all styling (light + dark theme)
├─ assets/js/data.js     ← YOUR CONTENT: details, work, services, prices
├─ assets/js/i18n.js     ← interface words in the 3 languages
├─ assets/js/main.js     behaviour (gallery, viewer, sharing, form, languages)
└─ assets/img/           put your photos and videos here
```

## 1. Make it yours (10 minutes)

Open `assets/js/data.js`. Everything you need to change is at the top:

```js
window.SITE = {
  email: "you@example.com",
  phone: "+1 555 000 0000",
  whatsapp: "15550000000",     // digits only, with country code
  city: "Casablanca, Morocco",
  web3formsKey: "",            // see step 2
  socials: [ ... ]
};
```

Then copy one of your own project blocks and change it. Each one has three languages:

```js
{
  cat: "event",                           // event | video | arch (see below)
  title: { en: "…", fr: "…", ar: "…" },
  desc:  { en: "…", fr: "…", ar: "…" },
  tags: ["2026"],                         // or { en, fr, ar } for words that translate
  thumb: "assets/img/my-photo.jpeg",      // small image in the grid
  full:  "assets/img/my-photo.jpeg"       // big image in the viewer (same file is fine)
}
```

The filter chips come from `window.CATEGORIES` — currently **All, Events, Portrait,
Product, Brand stories, Film & video, Architecture**, because that is the work on the
site. One more, **graphic design**, sits in the list behind a `//`: delete the `//`
when you have that kind of work. A filter with nothing behind it opens an empty
gallery, which is why it is switched off.

The nine services in `window.SERVICES` (brand story & film, graphic design,
photo show, portrait, events, product, video, editing only, monthly pack) also
fill the "What do you need?" dropdown in the form, so a visitor can request
exactly what they saw. `featured: true` puts the "Popular" flag on one of them.

For a video, add:

```js
video: { kind: "youtube", id: "dQw4w9WgXcQ" }        // or kind: "vimeo"
video: { kind: "file", id: "assets/img/masira.mp4" } // a file in your own folder
```

`kind: "file"` plays straight from the folder, like `masira.mp4` does now — easy,
but a big mp4 is slow on mobile data. YouTube as **unlisted** is lighter: the video
does not show up in search or on your channel, only people with the link see it.

A video card **does not need a cover picture**: leave `thumb` and `full` out and the
grid shows the video's own first frame, as `bikes.mp4` and `masira.mp4` do now. If you
would rather choose the frame, export one, save it in `assets/img/`, and point that
card's `thumb` and `full` at it. The `ph("…")` function still draws a coloured square
if you ever want a stand-in while trying things out — nothing uses it today.

Images: export around 1600 px wide and keep each file under ~400 KB, otherwise
phones on mobile data will load the page slowly.

## 2. Make the form reach you

The form works without a server, but it needs a free delivery service:

1. Go to <https://web3forms.com>, type your email, and copy the access key.
2. Paste it into `web3formsKey` in `assets/js/data.js`.

Requests then arrive in your inbox. Note that the visitor's answers pass through
Web3Forms' servers on the way (that is how any no-backend form works) — do not
use it for anything you would call confidential.

With the key left empty, the form still validates the answers and then opens the
visitor's own mail app with everything filled in, so nothing is lost.

The hidden `botcheck` field silently drops most spam bots.

## 3. Share one single project

Open any project in the viewer and press the share button (top corner). On a
phone the normal share sheet appears; on a computer the link is copied and a
small message confirms it. The link looks like:

```
https://your-site.com/#p=brand-story-film-atlas-coffee
```

Opening it goes straight to that project with the viewer already open, which is
what you send when a client asks "what have you done like this before?".
The `#p=` part is built from the **English title**, so if you rewrite an English
title, links you shared earlier stop pointing at that project.

## 4. Put it online (free)

Any of these host static sites for free on HTTPS:

| Host | How |
| --- | --- |
| **Netlify Drop** | Go to <https://app.netlify.com/drop> and drag the `portfolio` folder in. Live in about 30 seconds. |
| **Cloudflare Pages** | Create a project → *Direct upload* → drop the folder. |
| **GitHub Pages** | Push the folder to a repo, then Settings → Pages → branch `main`, folder `/`. |

Once you know your address, add this line inside `<head>` in `index.html`:

```html
<link rel="canonical" href="https://your-site.com/" />
```

and put a 1200×630 image at `assets/img/og-cover.jpg` — that is the picture
people see when your link is shared on WhatsApp, Facebook or LinkedIn.

## Good to know

- **Languages**: the site picks the visitor's browser language, remembers their
  choice, and you can link a specific one with `index.html?lang=fr`.
- **Themes**: dark by default, follows the phone's light/dark setting, and the
  visitor's choice is remembered.
- **Add a language**: copy a block in `i18n.js`, add it to `window.LANGS`, and add
  the same key to every `{ en, fr, ar }` object in `data.js`.
- **Accessibility**: keyboard works everywhere (Tab, Enter, Esc, ← →), images have
  descriptions, and animations turn off if the visitor asked for less motion.
- **Request this**: the button on every service card jumps to the form and picks
  that service, so you know what the message is about before you read it.
- **Preview locally**: `python3 -m http.server 8000 --bind 127.0.0.1 --directory .`
  then open <http://127.0.0.1:8000>.
