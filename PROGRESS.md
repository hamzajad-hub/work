# Progress — Frames Studio portfolio

**Folder:** `~/Desktop/portfolio` · **Open it:** double-click `index.html`
**Preview with a server:** `cd ~/Desktop/portfolio && python3 -m http.server 8000 --bind 127.0.0.1` → <http://127.0.0.1:8000>
**Last updated:** 2026-07-31

Tick the boxes as you go: replace `- [ ]` with `- [x]`.

---

## Done

- [x] One-page site that works on phone, tablet and desktop — no build step, no installs
- [x] Three languages (English / French / Arabic) with a switch in the header; Arabic flips the whole layout right-to-left
- [x] Dark and light theme, remembered between visits
- [x] Sections: hero, numbers, work gallery, services, process, about + gear, testimonials, contact form, footer
- [x] Work gallery: 8 buttons (All · Events · Portrait · Product · Brand stories · Film & video · Motorcycles · Architecture) and **only your own work** — 36 cards, the 13 example cards are deleted. Graphic design is still commented out in `data.js`, ready to switch on the day you add that kind of work
- [x] Your 18 photos wired in from `assets/img/`, named after what they show — the two BAL games, the courtside action, the UM6P concert, the coding-school interview, the minaret at night, the edit desk, the Morocco Showcase Summit, the OFPPT stand, the graduation bouquet, three portraits, the two handwoven vests, the two sushi-brand photos and the behind-the-scenes shoot — each with en/fr/ar title, description and tags
- [x] Two videos playing in the viewer as their own cards: `bikes.mp4` (vertical reel, 11 s, 1.9 MB — leads the gallery) and `masira.mp4` (Massira talk event at UM6P, 8 Sep 2025)
- [x] A video card with no `thumb` now shows **its own first frame** in the grid — no cover file needed. Give it `thumb:`/`full:` any time you prefer a chosen picture
- [x] The three frames on the first screen are filled: the BAL drive to the basket (wide frame), the blue stage portrait, and `bikes.mp4` playing muted on a loop with the play badge fading out. Visitors who ask their phone for less motion keep a still frame instead
- [x] Viewer with keyboard control (Esc / ← / →), swipe on phones, and YouTube / Vimeo / local-file video support
- [x] Share button in the viewer: copies a link like `…/index.html#p=basketball-africa-league-courtside` that opens straight into that project
- [x] Brand-media services: brand story & film, graphic design, photo show, portrait, events, product, video, editing only, monthly pack — 9 in total
- [x] "Request this" on each service jumps to the form with that service already chosen
- [x] Contact form: validation in all three languages, spam trap, sends through Web3Forms, and opens the visitor's email app while no key is set
- [x] Accessible: skip link, real buttons, focus kept inside the viewer, screen-reader labels, reduced-motion respected
- [x] Placeholder artwork drawn in code — **nothing on the site uses it any more.** The `ph()` helper stays in `data.js` in case you want it while trying things out
- [x] **The two garage shoots are on the site** — a new **Motorcycles** filter with 12 cards, plus one frame kept under Portrait. The three strongest (the two riders head-on, the full side profile, the fist bump over the tanks) lead the gallery right after the reel; the rest of the series sits together further down `window.WORK`. Each one has en/fr/ar title, description and tags written from the picture itself — no dates or client names invented
- [x] **Web versions made from the camera originals**: longest side 1600 px, quality 78, progressive — 118–268 KB each instead of 12–15 MB. The originals themselves belong in `~/Desktop/portfolio-originals/`, never in the site folder
- [x] `bikes-parked-garage.jpeg` re-cropped: 11 % off the left edge takes out the out-of-focus arm that was standing in the frame
- [x] **Link preview fixed.** `index.html` now points at `assets/img/og-cover.jpg` (1200×630, 95 KB, the BAL drive to the basket) for both Facebook/WhatsApp (`og:image`) and X (`twitter:image`, which was missing altogether)
- [x] Project moved onto the Desktop and this tracker created

## Your turn — in this order

- [ ] **Move the camera originals out of the site folder.** The 31 `DSC…jpg` files from the garage shoots are sitting in `assets/img/` — 426 MB, which is why the folder is 438 MB instead of ~13 MB. They are not used by the site and every one of them would be uploaded when you publish. Put them next to the others in `~/Desktop/portfolio-originals/`; the web versions I made from them stay behind in `assets/img/`. In a terminal that is:
  `mkdir -p ~/Desktop/portfolio-originals && mv ~/Desktop/portfolio/assets/img/DSC*.jpg ~/Desktop/portfolio-originals/`
  **Rule of thumb from now on: originals → `~/Desktop/portfolio-originals/`, web versions → `assets/img/`.** (The older note below that says "drop the files in `assets/img/`" means the small web copies, not what comes off the card.)
- [ ] **Your details.** Top of `assets/js/data.js`: `email`, `phone`, `whatsapp` (digits only), `city`, and the four social links.
- [ ] **More of your work.** Same file, `window.WORK`. Copy any one of the 36 blocks that are in there and change it. Each one needs a title, a description and tags in en / fr / ar.
- [ ] **Real images.** Drop the **web-sized** files in `assets/img/`, then point `thumb` and `full` at them: `thumb: "assets/img/my-photo.jpeg"`. Grid ≈ 1200×900, viewer ≈ 2000 px wide, keep each file under ~400 KB. *Every picture on the site is now between 25 KB and 268 KB, so nothing needs shrinking; if a new one comes out heavier, <https://squoosh.app> does it in the browser.*
- [ ] **Names and dates for the new work.** Six cards are written from what I can see in the photo alone: the Morocco Showcase Summit talk, the OFPPT stand, the graduation bouquet and the two sushi photos. Tell me the client, the city and the date for each and I will put them in the text and the tags.
- [ ] **The garage shoots: who and when.** The twelve motorcycle cards say what is in the frame and nothing more, because the camera clock is wrong — the older files read *2020:03:06* and the newer ones carry the export time, not the shoot time. Tell me the real date, the riders' names (if they are happy to be named) and whether it was a paid job or a personal shoot, and I will put it in the text. Same question for the reel `bikes.mp4` — is it from the same day?
- [ ] **Five more frames from the same shoot, if you want them.** Held back to keep the series tight: the five-bike line-up (`DSC02697`), the handshake over the headlight (`DSC02606`), the rider crouched cleaning the bike (`DSC02620`), plus `DSC02589` and `DSC02547`. Name any of them and I will size them and write the cards.
- [ ] **Are the vests Product or Portrait?** The two medina lookbook shots sit under **Product** because they were made to sell the vests. Say the word and I move them to Portrait.
- [ ] **`tower-dusk-2026.jpeg` is waiting in `assets/img/`, not on the site.** It carries a **"Meta AI" watermark** in the bottom-right corner. If the photo is yours, crop that strip off in Lightroom and tell me — it goes straight into Architecture next to the minaret.
- [ ] **A title for the bikes reel.** I cannot watch video in this VM, so its card says "Bikes — vertical reel". Tell me what it is (what, where, when) and I will write the real text.
- [ ] **Check the two video covers with your eyes.** The grid now shows each video's own first frame. If a first frame looks dull or black, export a nicer frame, save it in `assets/img/`, and set it as `thumb` and `full` on that card.
- [ ] **Video links.** `video: { kind: "youtube", id: "AbCdEf12345" }` — the id is the part after `?v=` in the YouTube address. `vimeo` and `file` also work. *`masira.mp4` uses `kind: "file"` and is 4.4 MB — fine on wifi, slow on a phone. YouTube **unlisted** would be lighter.*
- [ ] **Connect the form.** Make a free box at <https://web3forms.com>, paste the access key into `web3formsKey` in `data.js`. Until you do, the form opens the visitor's email app instead — nothing is lost, it is just less convenient. Be aware that answers travel through Web3Forms' servers.
- [ ] **Your own words.** `about.p1` / `about.p2` in `assets/js/i18n.js`, and the gear list in `data.js`.
- [ ] **Prices.** The numbers in `window.SERVICES` are placeholders — set yours before anyone sees the site.
- [ ] **Testimonials.** The three examples talk about clients that are no longer anywhere on the site (Studio Terra, Café Nour, a wedding). Replace them with real quotes, or empty the list: `window.TESTIMONIALS = [];`
- [x] **Share picture — done.** The link preview uses `assets/img/og-cover.jpg` (1200×630, cut from the BAL drive to the basket), and X now gets its own `twitter:image` line as well. One thing is still yours: once you have a domain, both lines should hold the full address (`https://…/og-cover.jpg`), because some apps refuse a short path. If you would rather the preview showed a motorcycle frame, say which one.
- [ ] **Publish.** Drag the folder onto <https://app.netlify.com/drop> for a free address in seconds; `README.md` lists the other free options.
- [ ] Optional: buy a domain name and point it at the host.

## Where things live

| File | What it holds |
| --- | --- |
| `assets/js/data.js` | **Your content** — details, projects, services, prices, testimonials. The only file you normally touch. |
| `assets/js/i18n.js` | Interface wording in the three languages (buttons, labels, About text). |
| `assets/js/main.js` | Behaviour: language, theme, filters, viewer, sharing, form. |
| `assets/css/styles.css` | Look and feel. Colours are the tokens at the very top. |
| `index.html` | Page structure. Most sections are filled from `data.js`. |
| `README.md` | Longer how-to: editing, form setup, publishing. |

## Checked on 2026-07-31

- All three JS files parse clean (`node --check`).
- 85 interface strings × 3 languages → 0 missing. Every project and service text exists in en + fr + ar.
- Every element the JS looks for exists in the page; every project sits in a real category; no two projects share a link.
- Headless browser run of the real page: **97 checks passed, 0 failed** — rendering counts, language switch, RTL, theme, all 7 filters, viewer + keyboard + wrap-around, share link, deep links, form validation, spam trap, mobile menu.
- After the clean-up: all three JS files parse clean; the gallery holds 5 cards, all yours; every card has an en/fr/ar title, description and tags; no two cards share a share-link; every file a card points at exists in `assets/img/`; no file in `assets/img/` is unused; and no filter is left empty. The browser run could not be repeated — headless Firefox cannot draw in this VM (graphics error), so check the look with your own eyes.
- After adding the reel and the two new photos: `node --check` clean on `data.js` and `main.js`; **78 data checks passed, 0 failed** — 8 cards, every one with en/fr/ar title + description + tags, every card in a live filter, every picture and video file present on disk, and all 8 share-links different. Only `tower-dusk-2026.jpeg` sits unused, on purpose. Still no browser run in this VM: **look at the gallery yourself**, mainly the two video cards, to see which first frame they land on.
- After the twelve new cards and the three new filters: `node --check` clean on all three JS files; **368 data checks passed, 0 failed** — 20 cards (7 events, 4 film & video, 4 product, 3 portrait, 1 architecture, 1 brand story), every one with en/fr/ar title + description + tags, every card in a switched-on filter, no switched-on filter left empty, every picture and video file present on disk, all 20 share-links different, and every image `index.html` itself points at now exists (the missing `og-cover.jpg` was found this way and replaced). `tower-dusk-2026.jpeg` is the only unused file, on purpose. No browser run is possible in this VM — **the look is yours to check.**
- After the motorcycle series: `node --check` clean on all three JS files; **960 data checks passed, 0 failed** — 36 cards (12 motorcycles, 8 events, 5 portrait, 4 product, 4 film & video, 2 brand stories, 1 architecture), every one with en/fr/ar title + description + tags, every card in a switched-on filter, no switched-on filter left empty, every picture and video file present on disk, all 36 share-links different, and the interface wording, services, process, testimonials and budget lines all complete in the three languages. The check also reports what is in `assets/img/` and used nowhere: the 31 camera originals (see the first job above) and `tower-dusk-2026.jpeg`, which stays out on purpose. No browser run is possible in this VM — **the look is yours to check**, mainly whether the three motorcycle frames at the top of the gallery are the three you would choose.

## Later, if you want it

- Nothing on the site tracks visitors. If you want numbers, add a privacy-friendly analytics snippet after publishing.
- A blog or "behind the scenes" page would need a second HTML file — one page is a deliberate choice for now.
- More languages: copy a block in `i18n.js`, add the code to `window.LANGS`, add the same key to every `{ en, fr, ar }` object in `data.js`.
