/* =========================================================
   CONTENT — this is the only file you normally edit.
   Every text is written three times: en / fr / ar.
   ========================================================= */

/* ---- 1. your details ------------------------------------------------ */
window.SITE = {
  email: "framesstudio732@gmail.com",
  phone: "+212780652602",
  whatsapp: "212780652602",        // digits only, with country code (no leading 0)
  city: "Casablanca, Morocco",
  /* Free form delivery: create a free box at https://web3forms.com,
     paste the access key here. Empty = the form opens the visitor's
     mail app instead (nothing is lost, it is just less convenient).   */
  web3formsKey: "",
  /* Where a submitted request is routed on WhatsApp. Digits only, country
     code first, no + and no leading zero, or wa.me cannot find the account:
     the local number 0780652602 becomes 212780652602. Leave it empty to
     use the whatsapp number above instead.                              */
  requestWhatsapp: "212780652602",
  /* Start of the tracking reference on every request: REQ-20260801-4F7A. */
  requestPrefix: "REQ",
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/_fram3s_studi0_" },
    { name: "YouTube", url: "https://youtube.com/@_fram3s_studi0" },
    { name: "TikTok", url: "https://tiktok.com/@_fram3s_studi0" },
    { name: "Behance", url: "https://behance.net/_fram3s_studi0" }
  ]
};

/* ---- 2. placeholder image generator --------------------------------
   Delete these once you have real files and use a path instead:
     thumb: "assets/img/portrait-1.jpg"                                */
function ph(label, hue) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="hsl(' + hue + ',42%,28%)"/>' +
    '<stop offset="1" stop-color="hsl(' + (hue + 38) + ',34%,11%)"/>' +
    '</linearGradient></defs>' +
    '<rect width="1200" height="900" fill="url(#g)"/>' +
    '<circle cx="600" cy="372" r="122" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="10"/>' +
    '<circle cx="600" cy="372" r="54" fill="rgba(255,255,255,.16)"/>' +
    '<text x="600" y="620" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="700" fill="rgba(255,255,255,.78)">' + label + '</text>' +
    '<text x="600" y="678" text-anchor="middle" font-family="sans-serif" font-size="29" fill="rgba(255,255,255,.42)">replace with your own file</text>' +
    '</svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---- 3. numbers under the hero ------------------------------------- */
window.STATS = [
  { value: "80+", label: { en: "Projects delivered", fr: "Projets livrés", ar: "مشروع مُنجز" } },
  { value: "45+", label: { en: "Happy clients", fr: "Clients satisfaits", ar: "عميل سعيد" } },
  { value: "3", label: { en: "Years shooting", fr: "Ans d'expérience", ar: "سنوات خبرة" } },
  { value: "48h", label: { en: "Usual delivery", fr: "Livraison habituelle", ar: "مدة التسليم" } }
];

/* ---- 4. gallery filters --------------------------------------------
   A filter with nothing behind it opens an empty gallery, so only the
   ones you actually have are switched on. The day you add that kind of
   work, delete the // in front of the line.                           */
window.CATEGORIES = [
  { id: "all", label: { en: "All", fr: "Tout", ar: "الكل" } },
  { id: "event", label: { en: "Events", fr: "Événements", ar: "مناسبات" } },
  { id: "portrait", label: { en: "Portrait", fr: "Portrait", ar: "بورتريه" } },
  { id: "product", label: { en: "Product", fr: "Produit", ar: "منتجات" } },
  { id: "story", label: { en: "Brand stories", fr: "Récits de marque", ar: "قصص العلامات" } },
  { id: "video", label: { en: "Film & video", fr: "Film & vidéo", ar: "أفلام وفيديو" } },
  { id: "moto", label: { en: "Motorcycles", fr: "Moto", ar: "دراجات نارية" } },
  { id: "arch", label: { en: "Architecture", fr: "Architecture", ar: "معمار" } }
  // { id: "design", label: { en: "Graphic design", fr: "Design graphique", ar: "تصميم جرافيك" } }
];

/* ---- 5. the work itself --------------------------------------------
   cat    : one of the ids above
   thumb  : grid image        full : big image shown in the viewer
   video  : { kind: "youtube" | "vimeo" | "file", id: "..." }
            leave the id empty and the poster image is shown instead   */
window.WORK = [
  /* ---- your own photos and videos, from assets/img/ ---------------------
     A video with no `thumb` shows its own first frame in the grid — give it
     a `thumb: "assets/img/....jpeg"` if you prefer a chosen picture.     */
  {
    cat: "video",
    title: { en: "Bikes — vertical reel", fr: "Bikes — reel vertical", ar: "الدراجات — ريل عمودي" },
    desc: { en: "A short vertical reel, eleven seconds, shot and cut for social feeds.", fr: "Un court reel vertical de onze secondes, tourné et monté pour les réseaux.", ar: "ريل عمودي قصير من إحدى عشرة ثانية، تصوير ومونتاج للشبكات الاجتماعية." },
    tags: [{ en: "reel", fr: "reel", ar: "ريل" }, { en: "11 s", fr: "11 s", ar: "١١ ثانية" }],
    video: { kind: "file", id: "assets/img/bikes.mp4" }
  },
  /* ---- the two garage shoots. The three strongest frames lead the grid here;
     the rest of the series sits further down, just above the portraits.    */
  {
    cat: "moto",
    title: { en: "Two riders, head-on", fr: "Deux pilotes, de face", ar: "راكبان في مواجهة الكاميرا" },
    desc: { en: "Camera low in the middle of the parking deck: two sport bikes side by side, neon lines running away behind them.", fr: "Appareil au ras du sol au milieu du parking : deux sportives côte à côte, les lignes de néon qui filent derrière elles.", ar: "الكاميرا منخفضة في وسط الموقف: دراجتان رياضيتان جنبًا إلى جنب وخطوط النيون تمتد خلفهما." },
    tags: [{ en: "riders", fr: "pilotes", ar: "راكبون" }, { en: "underground garage", fr: "parking souterrain", ar: "موقف سفلي" }],
    thumb: "assets/img/riders-two-bikes-head-on.jpeg", full: "assets/img/riders-two-bikes-head-on.jpeg"
  },
  {
    cat: "moto",
    title: { en: "GSX-R1000 — full side profile", fr: "GSX-R1000 — profil complet", ar: "GSX-R1000 — من الجانب" },
    desc: { en: "The bike alone on the painted arrow, decals readable from nose to tail, its rider standing back out of the light.", fr: "La moto seule sur la flèche peinte, les stickers lisibles du nez à la queue, son pilote reculé hors de la lumière.", ar: "الدراجة وحدها على السهم المرسوم، ملصقاتها واضحة من المقدمة إلى المؤخرة، وصاحبها متراجع خارج الضوء." },
    tags: [{ en: "sport bike", fr: "sportive", ar: "دراجة رياضية" }, { en: "side profile", fr: "profil", ar: "من الجانب" }],
    thumb: "assets/img/gsxr1000-side-profile-garage.jpeg", full: "assets/img/gsxr1000-side-profile-garage.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Fist bump between the machines", fr: "Poing contre poing entre les motos", ar: "تحية بالقبضة بين الدراجتين" },
    desc: { en: "Backs to the camera, gloves meeting over the tanks — one printed tee, one back protector covered in sponsor patches.", fr: "Dos à l'appareil, les gants qui se rejoignent au-dessus des réservoirs — un t-shirt imprimé, une dorsale couverte d'écussons.", ar: "ظهرهما إلى الكاميرا والقفازان يتلامسان فوق الخزانين — قميص مطبوع ودرع ظهر مغطى بشعارات الرعاة." },
    tags: [{ en: "riders", fr: "pilotes", ar: "راكبون" }, { en: "from behind", fr: "de dos", ar: "من الخلف" }],
    thumb: "assets/img/riders-fist-bump-garage.jpeg", full: "assets/img/riders-fist-bump-garage.jpeg"
  },
  {
    cat: "event",
    title: { en: "Basketball Africa League — courtside", fr: "Basketball Africa League — au bord du terrain", ar: "دوري السلة الأفريقي — من حافة الملعب" },
    desc: { en: "Courtside coverage of a Basketball Africa League game, 25 April 2026.", fr: "Couverture d'un match de la Basketball Africa League, le 25 avril 2026.", ar: "تغطية مباراة في دوري السلة الأفريقي (BAL) بتاريخ ٢٥ أبريل ٢٠٢٦." },
    tags: [{ en: "sport", fr: "sport", ar: "رياضة" }, { en: "25 Apr 2026", fr: "25 avr. 2026", ar: "٢٥ أبريل ٢٠٢٦" }],
    thumb: "assets/img/bal-basketball-2026.jpeg", full: "assets/img/bal-basketball-2026.jpeg"
  },
  {
    cat: "event",
    title: { en: "Basketball Africa League — the bench on its feet", fr: "Basketball Africa League — le banc debout", ar: "دوري السلة الأفريقي — دكة البدلاء واقفة" },
    desc: { en: "A drive to the basket with the bench already on its feet and the photographers packed along the baseline, 25 April 2026.", fr: "Une pénétration vers le panier, le banc déjà debout et les photographes serrés le long de la ligne de fond, le 25 avril 2026.", ar: "اختراق نحو السلة والبدلاء واقفون بالفعل والمصورون متراصّون على خط النهاية، ٢٥ أبريل ٢٠٢٦." },
    tags: [{ en: "sport", fr: "sport", ar: "رياضة" }, { en: "25 Apr 2026", fr: "25 avr. 2026", ar: "٢٥ أبريل ٢٠٢٦" }],
    thumb: "assets/img/bal-basketball-action-2026.jpeg", full: "assets/img/bal-basketball-action-2026.jpeg"
  },
  {
    cat: "event",
    title: { en: "Basketball Africa League — from the stands", fr: "Basketball Africa League — depuis les tribunes", ar: "دوري السلة الأفريقي — من المدرجات" },
    desc: { en: "The whole court in one wide frame, shot from the stands during the game, 25 April 2026.", fr: "Tout le terrain dans un plan large, depuis les tribunes pendant le match, le 25 avril 2026.", ar: "الملعب بالكامل في لقطة واسعة من المدرجات خلال المباراة، ٢٥ أبريل ٢٠٢٦." },
    tags: [{ en: "sport", fr: "sport", ar: "رياضة" }, { en: "25 Apr 2026", fr: "25 avr. 2026", ar: "٢٥ أبريل ٢٠٢٦" }],
    thumb: "assets/img/bal-basketball-wide-2026.jpeg", full: "assets/img/bal-basketball-wide-2026.jpeg"
  },
  {
    cat: "event",
    title: { en: "Concert night — UM6P Rabat", fr: "Soirée concert — UM6P Rabat", ar: "ليلة حفل موسيقي — UM6P الرباط" },
    desc: { en: "Second edition of the campus event at UM6P Rabat, with Ahmed Soultan on the line-up.", fr: "Deuxième édition de l'événement du campus à UM6P Rabat, avec Ahmed Soultan à l'affiche.", ar: "النسخة الثانية من حفل الحرم الجامعي في UM6P الرباط، بمشاركة أحمد سلطان." },
    tags: [{ en: "concert", fr: "concert", ar: "حفل" }, { en: "10 May 2025", fr: "10 mai 2025", ar: "١٠ مايو ٢٠٢٥" }],
    thumb: "assets/img/um6p-concert-soultan-2025.jpeg", full: "assets/img/um6p-concert-soultan-2025.jpeg"
  },
  {
    cat: "concept",
    title: { en: "Concert art", fr: "concert ART", ar: "ليلي " },
    desc: { en: "a black wight art with a dance group waiting the next project .", ar: "اa black wight art with a dance group waiting the next project." },
    tags: [{ en: "concert", fr: "concert", ar: "حفل" }, { en: "10 May 2025", fr: "10 mai 2025", ar: "١٠ مايو ٢٠٢٥" }],
    thumb: "assets/img/balckwigtimag-2026.jpeg", full: "assets/img/balckwigtimag-2026.jpeg"
  },
  {
    cat: "event",
    title: { en: "Concert night — the orchestra from the crowd", fr: "Soirée concert — l'orchestre depuis la foule", ar: "ليلة حفل — الأوركسترا من بين الجمهور" },
    desc: { en: "A full Moroccan ensemble under the stage lights and the red haze, shot over the raised hands of the crowd.", fr: "Un orchestre marocain au complet sous les lumières et la fumée rouge, saisi par-dessus les mains levées du public.", ar: "أوركسترا مغربية كاملة تحت أضواء المسرح والدخان الأحمر، من فوق أيدي الجمهور المرفوعة." },
    tags: [{ en: "concert", fr: "concert", ar: "حفل" }, { en: "live", fr: "live", ar: "مباشر" }],
    thumb: "assets/img/concert-orchestra-crowd-2025.jpeg", full: "assets/img/concert-orchestra-crowd-2025.jpeg"
  },
  {
    cat: "event",
    title: { en: "Morocco Showcase Summit — at the podium", fr: "Morocco Showcase Summit — au pupitre", ar: "قمة موروكو شوكيس — على المنصة" },
    desc: { en: "A speaker at the second annual Morocco Showcase Summit, caught mid-smile under the stage screens.", fr: "Un intervenant à la deuxième édition annuelle du Morocco Showcase Summit, saisi en plein sourire sous les écrans de scène.", ar: "أحد المتحدثين في النسخة السنوية الثانية من قمة موروكو شوكيس، في لحظة ابتسامة تحت شاشات المنصة." },
    tags: [{ en: "conference", fr: "conférence", ar: "مؤتمر" }, { en: "speaker", fr: "intervenant", ar: "متحدّث" }],
    thumb: "assets/img/morocco-showcase-summit.jpeg", full: "assets/img/morocco-showcase-summit.jpeg"
  },
  {
    cat: "event",
    title: { en: "OFPPT stand — meeting the visitors", fr: "Stand OFPPT — à la rencontre des visiteurs", ar: "رواق OFPPT — لقاء الزوار" },
    desc: { en: "The team in white shirts walking families through the brochures at an OFPPT stand.", fr: "L'équipe en chemises blanches présentant les brochures aux familles sur un stand OFPPT.", ar: "الفريق بالقمصان البيضاء يشرح الكتيبات للعائلات في رواق OFPPT." },
    tags: [{ en: "stand", fr: "stand", ar: "رواق" }, { en: "open day", fr: "portes ouvertes", ar: "أبواب مفتوحة" }],
    thumb: "assets/img/ofppt-event-stand.jpeg", full: "assets/img/ofppt-event-stand.jpeg"
  },
  {
    cat: "event",
    title: { en: "Graduation day — the bouquet", fr: "Remise des diplômes — le bouquet", ar: "يوم التخرج — باقة الورد" },
    desc: { en: "Roses passed from hand to hand after the ceremony, shot close and warm.", fr: "Des roses qui passent de main en main après la cérémonie, cadré serré et chaleureux.", ar: "ورود تنتقل من يد إلى يد بعد الحفل، تصوير قريب ودافئ." },
    tags: [{ en: "graduation", fr: "remise des diplômes", ar: "تخرّج" }, { en: "detail", fr: "détail", ar: "تفصيل" }],
    thumb: "assets/img/blackwithe-image.jpeg", full: "assets/img/blackwithe-image.jpeg"
  },
  {
    cat: "video",
    title: { en: "Interview shoot at a coding school", fr: "Tournage d'interview dans une école de code", ar: "تصوير مقابلة في مدرسة للبرمجة" },
    desc: { en: "Behind the scenes — filming interviews with a visiting team from Germany at a coding school, 10 October 2025.", fr: "Coulisses — interviews d'une équipe venue d'Allemagne, tournées dans une école de code, le 10 octobre 2025.", ar: "من الكواليس — تصوير مقابلات مع فريق زائر من ألمانيا في مدرسة للبرمجة، ١٠ أكتوبر ٢٠٢٥." },
    tags: [{ en: "interview", fr: "interview", ar: "مقابلة" }, { en: "10 Oct 2025", fr: "10 oct. 2025", ar: "١٠ أكتوبر ٢٠٢٥" }],
    thumb: "assets/img/coding-school-interview-2025.jpeg", full: "assets/img/coding-school-interview-2025.jpeg"
  },
  {
    cat: "story",
    title: { en: "Interview stills — the mic is on", fr: "Photos d'interview — le micro tourne", ar: "صور من المقابلة — الميكروفون يعمل" },
    desc: { en: "An answer between two takes, lapel mic clipped on, the lab still working behind — from the same interview shoot at the coding school.", fr: "Une réponse entre deux prises, micro-cravate en place, le lab qui travaille toujours derrière — même tournage d'interviews à l'école de code.", ar: "إجابة بين لقطتين، ميكروفون مثبَّت على القميص، والقاعة تعمل في الخلف — من التصوير نفسه في مدرسة البرمجة." },
    tags: [{ en: "interview", fr: "interview", ar: "مقابلة" }, { en: "10 Oct 2025", fr: "10 oct. 2025", ar: "١٠ أكتوبر ٢٠٢٥" }],
    thumb: "assets/img/coding-school-interview-speaker-2025.jpeg", full: "assets/img/coding-school-interview-speaker-2025.jpeg"
  },
  {
    cat: "story",
    title: { en: "Interview stills — mid-sentence", fr: "Photos d'interview — en pleine phrase", ar: "صور من المقابلة — في منتصف الجملة" },
    desc: { en: "Hands moving, badge still on, the circuit-board wall of the school as a backdrop.", fr: "Les mains qui parlent, le badge encore au cou, le mur en circuit imprimé de l'école en fond.", ar: "اليدان تتحركان والبطاقة ما زالت معلّقة، وجدار الدوائر الإلكترونية خلفية للصورة." },
    tags: [{ en: "interview", fr: "interview", ar: "مقابلة" }, { en: "10 Oct 2025", fr: "10 oct. 2025", ar: "١٠ أكتوبر ٢٠٢٥" }],
    thumb: "assets/img/coding-school-interview-guest-2025.jpeg", full: "assets/img/coding-school-interview-guest-2025.jpeg"
  },
  {
    cat: "arch",
    title: { en: "Hassan II Mosque minaret at night", fr: "Le minaret de la mosquée Hassan II, de nuit", ar: "مئذنة مسجد الحسن الثاني ليلًا" },
    desc: { en: "Casablanca after dark — zellij and carved stone lit from below.", fr: "Casablanca à la nuit tombée — zellige et pierre sculptée éclairés par le bas.", ar: "الدار البيضاء بعد حلول الليل — زليج وحجر منقوش بإضاءة من الأسفل." },
    tags: [{ en: "night", fr: "nuit", ar: "ليل" }, "2026"],
    thumb: "assets/img/hassan2-minaret-night.jpeg", full: "assets/img/hassan2-minaret-night.jpeg"
  },
  {
    cat: "video",
    title: { en: "In the edit — event film on the timeline", fr: "Au montage — film d'événement sur la timeline", ar: "في المونتاج — فيلم مناسبة على طاولة المونتاج" },
    desc: { en: "Cutting an event film in DaVinci Resolve: hundreds of clips reduced to the moments that matter, July 2026.", fr: "Montage d'un film d'événement dans DaVinci Resolve : des centaines de rushes réduits aux moments qui comptent, juillet 2026.", ar: "مونتاج فيلم مناسبة في دافينشي ريزولف: مئات المقاطع تُختزل إلى اللحظات المهمة، يوليو ٢٠٢٦." },
    tags: [{ en: "post-production", fr: "post-production", ar: "ما بعد الإنتاج" }, { en: "Jul 2026", fr: "juil. 2026", ar: "يوليو ٢٠٢٦" }],
    thumb: "assets/img/edit-suite-davinci-2026.jpeg", full: "assets/img/edit-suite-davinci-2026.jpeg"
  },
  {
    cat: "video",
    title: { en: "Massira event film — UM6P", fr: "Film d'événement Massira — UM6P", ar: "فيلم حدث المسيرة — UM6P" },
    desc: { en: "A talk event at UM6P about Massira — filmed and edited, 8 September 2025.", fr: "Événement-conférence à UM6P autour de Massira — tourné et monté, le 8 septembre 2025.", ar: "لقاء في UM6P حول المسيرة — تصوير ومونتاج، ٨ سبتمبر ٢٠٢٥." },
    tags: [{ en: "event film", fr: "film d'événement", ar: "فيلم مناسبة" }, { en: "8 Sep 2025", fr: "8 sept. 2025", ar: "٨ سبتمبر ٢٠٢٥" }],
    video: { kind: "file", id: "assets/img/masira.mp4" }
  },
  /* ---- rest of the garage series (same two shoots as the three at the top) */
  {
    cat: "moto",
    title: { en: "Above the black circle", fr: "Au-dessus du cercle noir", ar: "من فوق الدائرة السوداء" },
    desc: { en: "Shot from above with the rider astride the bike, the painted circle on the concrete closing the frame around them.", fr: "Prise en hauteur, le pilote à califourchon sur la moto, le cercle peint sur le béton refermant le cadre autour d'eux.", ar: "لقطة من الأعلى والراكب على دراجته، والدائرة المرسومة على الخرسانة تُغلق الكادر حولهما." },
    tags: [{ en: "high angle", fr: "vue en hauteur", ar: "من الأعلى" }, { en: "sport bike", fr: "sportive", ar: "دراجة رياضية" }],
    thumb: "assets/img/rider-gsxr1000-from-above.jpeg", full: "assets/img/rider-gsxr1000-from-above.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Printed tee, straight down the aisle", fr: "T-shirt imprimé, dans l'axe de l'allée", ar: "قميص مطبوع في محور الممر" },
    desc: { en: "Vertical frame down the middle of the parking aisle, the neon strips overhead pulling straight to the rider.", fr: "Cadre vertical dans l'axe de l'allée, les néons du plafond tirant droit vers le pilote.", ar: "كادر عمودي في محور الممر، وشرائط النيون في السقف تشدّ النظر إلى الراكب." },
    tags: [{ en: "vertical", fr: "vertical", ar: "عمودي" }, { en: "neon", fr: "néon", ar: "نيون" }],
    thumb: "assets/img/suzuki-tee-neon-aisle.jpeg", full: "assets/img/suzuki-tee-neon-aisle.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Two riders, helmets on", fr: "Deux pilotes, casques sur la tête", ar: "راكبان بخوذتين" },
    desc: { en: "Both of them facing the camera on their bikes, visors down, ready to pull away.", fr: "Tous les deux face à l'appareil sur leurs motos, visières baissées, prêts à s'élancer.", ar: "كلاهما في مواجهة الكاميرا على دراجتيهما، الواقيان مُنزَلان، جاهزان للانطلاق." },
    tags: [{ en: "riders", fr: "pilotes", ar: "راكبون" }, { en: "helmets", fr: "casques", ar: "خوذ" }],
    thumb: "assets/img/riders-facing-camera-garage.jpeg", full: "assets/img/riders-facing-camera-garage.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Two bikes side by side", fr: "Deux motos côte à côte", ar: "دراجتان جنبًا إلى جنب" },
    desc: { en: "A green naked and a red-and-grey sport bike parked wheel to wheel, both riders in black.", fr: "Une roadster verte et une sportive rouge et grise garées roue contre roue, les deux pilotes en noir.", ar: "دراجة خضراء وأخرى رياضية بالأحمر والرمادي متجاورتان، والراكبان بالأسود." },
    tags: [{ en: "duo", fr: "duo", ar: "ثنائي" }, { en: "garage", fr: "garage", ar: "كراج" }],
    thumb: "assets/img/riders-duo-garage.jpeg", full: "assets/img/riders-duo-garage.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Leaning on the tank, bikes in a row", fr: "Appuyé sur le réservoir, motos en file", ar: "متكئ على الخزان والدراجات في صف" },
    desc: { en: "A quiet moment between takes, the row of parked bikes running back into the garage behind.", fr: "Un temps calme entre deux prises, la file de motos garées s'enfonçant dans le garage derrière.", ar: "لحظة هادئة بين لقطتين، وصف الدراجات المتوقفة يمتد إلى داخل الكراج خلفه." },
    tags: [{ en: "candid", fr: "spontané", ar: "عفوي" }, { en: "garage", fr: "garage", ar: "كراج" }],
    thumb: "assets/img/riders-row-garage.jpeg", full: "assets/img/riders-row-garage.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Rider on the green bike", fr: "Pilote sur la verte", ar: "الراكب على الدراجة الخضراء" },
    desc: { en: "Close on the rider in the saddle, the green bodywork and the decals filling the bottom of the frame.", fr: "Serré sur le pilote en selle, le carénage vert et les stickers remplissant le bas du cadre.", ar: "لقطة قريبة للراكب على السرج، والهيكل الأخضر والملصقات تملأ أسفل الكادر." },
    tags: [{ en: "rider", fr: "pilote", ar: "راكب" }, { en: "close-up", fr: "gros plan", ar: "لقطة قريبة" }],
    thumb: "assets/img/rider-ninja-portrait.jpeg", full: "assets/img/rider-ninja-portrait.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Gold visor", fr: "Visière dorée", ar: "واقٍ ذهبي" },
    desc: { en: "The second rider on the sport bike, the gold visor picking up everything the garage lights had to give.", fr: "Le second pilote sur la sportive, la visière dorée récupérant tout ce que les lampes du garage avaient à donner.", ar: "الراكب الثاني على الدراجة الرياضية، والواقي الذهبي يعكس كل ما تمنحه أضواء الكراج." },
    tags: [{ en: "rider", fr: "pilote", ar: "راكب" }, { en: "helmet", fr: "casque", ar: "خوذة" }],
    thumb: "assets/img/rider-suzuki-portrait.jpeg", full: "assets/img/rider-suzuki-portrait.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Under the neon line", fr: "Sous la ligne de néon", ar: "تحت خط النيون" },
    desc: { en: "Vertical frame with the ceiling strip running the length of the picture and the rider standing in its light.", fr: "Cadre vertical, le néon du plafond parcourant toute l'image et le pilote debout dans sa lumière.", ar: "كادر عمودي وشريط السقف يمتد بطول الصورة والراكب واقف في ضوئه." },
    tags: [{ en: "vertical", fr: "vertical", ar: "عمودي" }, { en: "neon", fr: "néon", ar: "نيون" }],
    thumb: "assets/img/rider-neon-vertical.jpeg", full: "assets/img/rider-neon-vertical.jpeg"
  },
  {
    cat: "moto",
    title: { en: "Parked, helmet on the tank", fr: "Garée, casque sur le réservoir", ar: "متوقفة والخوذة على الخزان" },
    desc: { en: "No rider in this one: the sport bike alone with a helmet resting on the tank, the other machines lined up behind on the polished floor.", fr: "Sans pilote : la sportive seule, un casque posé sur le réservoir, les autres motos alignées derrière sur le sol poli.", ar: "بلا راكب: الدراجة الرياضية وحدها وخوذة موضوعة على الخزان، وبقية الدراجات مصطفّة خلفها على الأرض اللامعة." },
    tags: [{ en: "still", fr: "nature morte", ar: "ثابتة" }, { en: "detail", fr: "détail", ar: "تفصيل" }],
    thumb: "assets/img/bikes-parked-garage.jpeg", full: "assets/img/bikes-parked-garage.jpeg"
  },
  {
    cat: "portrait",
    title: { en: "Portrait — blue stage light", fr: "Portrait — lumière bleue de scène", ar: "بورتريه — ضوء المسرح الأزرق" },
    desc: { en: "Shot at the edge of a stage with nothing but the blue wash for light, the silhouettes left blurred on purpose.", fr: "Pris en bord de scène sans autre lumière que le bleu des projecteurs, les silhouettes laissées floues volontairement.", ar: "لقطة على حافة المسرح بلا إضاءة سوى الأزرق، والظلال تُركت غير واضحة بشكل مقصود." },
    tags: [{ en: "portrait", fr: "portrait", ar: "بورتريه" }, { en: "low light", fr: "faible lumière", ar: "إضاءة خفيفة" }],
    thumb: "assets/img/portrait-stage-blue.jpeg", full: "assets/img/portrait-stage-blue.jpeg"
  },
  {
    cat: "portrait",
    title: { en: "Portrait — burgundy blazer and a felt hat", fr: "Portrait — veste bordeaux et chapeau de feutre", ar: "بورتريه — سُترة نبيذية وقبعة من اللباد" },
    desc: { en: "Seated portrait beside tall barred windows, the daylight coming from behind and the colour carrying the frame.", fr: "Portrait assis près de hautes fenêtres à barreaux, la lumière du jour venant de derrière et la couleur qui porte l'image.", ar: "بورتريه في وضعية الجلوس قرب نوافذ عالية، ضوء النهار من الخلف واللون هو ما يحمل الصورة." },
    tags: [{ en: "portrait", fr: "portrait", ar: "بورتريه" }, { en: "natural light", fr: "lumière naturelle", ar: "ضوء طبيعي" }],
    thumb: "assets/img/portrait-red-hat.jpeg", full: "assets/img/portrait-red-hat.jpeg"
  },
  {
    cat: "portrait",
    title: { en: "Portrait at the desks — between two interviews", fr: "Portrait dans la salle — entre deux interviews", ar: "بورتريه بين المكاتب — بين مقابلتين" },
    desc: { en: "A standing portrait in the middle of the room, the rows of screens left soft behind.", fr: "Portrait debout au milieu de la salle, les rangées d'écrans laissées floues derrière.", ar: "بورتريه واقف في وسط القاعة، وصفوف الشاشات غير واضحة في الخلف." },
    tags: [{ en: "portrait", fr: "portrait", ar: "بورتريه" }, { en: "on location", fr: "sur place", ar: "في موقع العمل" }],
    thumb: "assets/img/coding-school-standing-portrait-2025.jpeg", full: "assets/img/coding-school-standing-portrait-2025.jpeg"
  },
  {
    cat: "portrait",
    title: { en: "Portrait — grey coat on wet cobbles", fr: "Portrait — manteau gris sur pavés mouillés", ar: "بورتريه — معطف رمادي على حجر مبلَّل" },
    desc: { en: "A full-length winter portrait on a rainy morning, flat cap and umbrella, the wet ground doing half the work.", fr: "Portrait d'hiver en pied par un matin de pluie, casquette plate et parapluie, le sol mouillé fait la moitié du travail.", ar: "بورتريه شتوي كامل القامة في صباح ماطر، قبعة ومظلّة، والأرض المبلَّلة تؤدي نصف العمل." },
    tags: [{ en: "fashion", fr: "mode", ar: "أزياء" }, { en: "winter", fr: "hiver", ar: "شتاء" }],
    thumb: "assets/img/portrait-umbrella-winter.jpeg", full: "assets/img/portrait-umbrella-winter.jpeg"
  },
  {
    cat: "portrait",
    title: { en: "Portrait — a look back in the garage", fr: "Portrait — un regard en arrière au garage", ar: "بورتريه — نظرة إلى الخلف في الكراج" },
    desc: { en: "From the same shoot as the motorcycle series, but kept here: a look back over the shoulder, the parking lights out of focus behind.", fr: "Issu du même shooting que la série moto, mais gardé ici : un regard par-dessus l'épaule, les lampes du parking floues derrière.", ar: "من نفس جلسة سلسلة الدراجات لكنه هنا: نظرة من فوق الكتف، وأضواء الموقف غير واضحة في الخلف." },
    tags: [{ en: "portrait", fr: "portrait", ar: "بورتريه" }, { en: "low light", fr: "faible lumière", ar: "إضاءة خفيفة" }],
    thumb: "assets/img/rider-portrait-garage-look-back.jpeg", full: "assets/img/rider-portrait-garage-look-back.jpeg"
  },
  {
    cat: "product",
    title: { en: "Handwoven vest — medina lookbook", fr: "Gilet tissé main — lookbook dans la médina", ar: "صديرية منسوجة يدويًا — لوكبوك في المدينة العتيقة" },
    desc: { en: "Green and gold weave photographed from behind in the old medina, made for a shop's product page.", fr: "Tissage vert et or photographié de dos dans la médina, réalisé pour la fiche produit d'une boutique.", ar: "نسيج أخضر وذهبي مصوَّر من الخلف في المدينة العتيقة، أُنجز لصفحة منتج متجر." },
    tags: [{ en: "lookbook", fr: "lookbook", ar: "لوكبوك" }, { en: "handmade", fr: "fait main", ar: "صناعة يدوية" }],
    thumb: "assets/img/vest-lookbook-medina-green.jpeg", full: "assets/img/vest-lookbook-medina-green.jpeg"
  },
  {
    cat: "product",
    title: { en: "Handwoven vest — blue pattern", fr: "Gilet tissé main — motif bleu", ar: "صديرية منسوجة يدويًا — نقش أزرق" },
    desc: { en: "Second piece of the same series, the blue and red weave against old stone.", fr: "Deuxième pièce de la même série, tissage bleu et rouge contre la pierre ancienne.", ar: "القطعة الثانية من السلسلة نفسها، نسيج أزرق وأحمر على حجر قديم." },
    tags: [{ en: "lookbook", fr: "lookbook", ar: "لوكبوك" }, { en: "product", fr: "produit", ar: "منتج" }],
    thumb: "assets/img/vest-lookbook-medina-blue.jpeg", full: "assets/img/vest-lookbook-medina-blue.jpeg"
  },
  {
    cat: "product",
    title: { en: "New sushi brand — the board", fr: "Nouvelle marque de sushi — la planche", ar: "علامة سوشي جديدة — لوح التقديم" },
    desc: { en: "A full board of maki and uramaki with the chef still standing behind it — food photography shot for a brand launch.", fr: "Une planche entière de makis et uramakis, le chef encore debout derrière — photo culinaire pour le lancement d'une marque.", ar: "لوح كامل من الماكي والأوراماكي والشيف ما زال واقفًا خلفه — تصوير طعام لإطلاق علامة جديدة." },
    tags: [{ en: "food", fr: "culinaire", ar: "طعام" }, { en: "brand launch", fr: "lancement de marque", ar: "إطلاق علامة" }],
    thumb: "assets/img/new-breand-sushi.jpeg", full: "assets/img/new-breand-sushi.jpeg"
  },
  {
    cat: "product",
    title: { en: "New sushi brand — rolling and cutting", fr: "Nouvelle marque de sushi — roulage et découpe", ar: "علامة سوشي جديدة — اللف والتقطيع" },
    desc: { en: "Close on the hands and the knife while the kitchen worked: rolls breaded, cut and lined up.", fr: "Gros plan sur les mains et le couteau pendant que la cuisine tournait : rouleaux panés, coupés et alignés.", ar: "لقطة قريبة على اليدين والسكين أثناء العمل في المطبخ: لفائف مغلّفة ومقطّعة ومصفوفة." },
    tags: [{ en: "food", fr: "culinaire", ar: "طعام" }, { en: "close-up", fr: "gros plan", ar: "لقطة قريبة" }],
    thumb: "assets/img/new-breand-sushii.jpeg", full: "assets/img/new-breand-sushii.jpeg"
  }
  /* `working-team.jpeg` is deliberately not a card: it is the photo in the
     "Behind the camera" part of the page (index.html, section #about).
     Copy any block above and point it at that file to bring it back here. */
];

/* ---- 6. gear (brand names stay as they are) ------------------------- */
window.GEAR = ["Sony A7 IV", "24-70 f/2.8", "85mm f/1.8", "DJI RS gimbal", "Godox lights", "Lightroom", "Photoshop", "Illustrator", "After Effects", "DaVinci Resolve", "Premiere Pro", "Figma"];

/* ---- 7. services (also fill the "What do you need?" dropdown) ------- */
window.SERVICES = [
  {
    icon: "BS", featured: true,
    title: { en: "Brand story & film", fr: "Récit de marque & film", ar: "قصة العلامة والفيلم" },
    desc: { en: "We find the story your brand should tell, then I film it and cut it.", fr: "On trouve l'histoire que votre marque doit raconter, puis je la filme et la monte.", ar: "نجد القصة التي يجب أن تحكيها علامتك، ثم أصوّرها وأحرّرها." },
    bullets: {
      en: ["Idea, script and shot list", "1–2 shooting days", "Long version + social cuts"],
      fr: ["Idée, script et découpage", "1 à 2 jours de tournage", "Version longue + formats réseaux"],
      ar: ["الفكرة والنص وقائمة المشاهد", "يوم إلى يومين تصوير", "نسخة طويلة + مقاطع للشبكات"]
    },
    price: { en: "from 2000dh", fr: "à partir de 2000dh", ar: "تبدأ من 2000dh " }
  },
  //_fram3s_studi0_
  {
    icon: "GD", featured: false,
    title: { en: "Graphic design", fr: "Design graphique", ar: "تصميم جرافيك" },
    desc: { en: "Logo, brand kit, posters, packaging and social templates.", fr: "Logo, charte, affiches, packaging et modèles pour les réseaux.", ar: "شعار وهوية وملصقات وتغليف وقوالب للشبكات." },
    bullets: {
      en: ["Logo + brand guide", "Print and web files", "Editable templates you keep"],
      fr: ["Logo + charte graphique", "Fichiers print et web", "Modèles modifiables à garder"],
      ar: ["شعار + دليل الهوية", "ملفات للطباعة والويب", "قوالب قابلة للتعديل تبقى لديك"]
    },
    price: { en: "from 450dh ", fr: "à partir de 450 dh ", ar: "تبدأ من 450 DH" }
  },
  {
    icon: "PS", featured: false,
    title: { en: "Photo show / slideshow", fr: "Diaporama photo", ar: "عرض صور" },
    desc: { en: "Your photos become a film with music, titles and rhythm.", fr: "Vos photos deviennent un film avec musique, titres et rythme.", ar: "صورك تتحول إلى فيلم بموسيقى وعناوين وإيقاع." },
    bullets: {
      en: ["Old photos restored and cleaned", "Music and titles in your language", "Ready for a screen or a party"],
      fr: ["Anciennes photos restaurées", "Musique et titres dans votre langue", "Prêt pour un écran ou une fête"],
      ar: ["ترميم الصور القديمة وتنقيتها", "موسيقى وعناوين بلغتك", "جاهز للعرض أو للحفلات"]
    },
    price: { en: "from dh400", fr: "à partir de 400 dh", ar: "تبدأ من 400 DH" }
  },
  {
    icon: "PT", featured: false,
    title: { en: "Portrait & branding session", fr: "Séance portrait & image de marque", ar: "جلسة بورتريه وهوية شخصية" },
    desc: { en: "For people who need strong photos of themselves or their team.", fr: "Pour celles et ceux qui ont besoin de belles photos d'eux ou de leur équipe.", ar: "لمن يحتاج صورًا قوية له أو لفريقه." },
    bullets: {
      en: ["1–2 hours", "30+ edited photos", "Outfit and location advice"],
      fr: ["1 à 2 heures", "30+ photos retouchées", "Conseils tenue et lieu"],
      ar: ["ساعة إلى ساعتين", "أكثر من ٣٠ صورة معالجة", "نصائح للملابس والمكان"]
    },
    price: { en: "from 500 dh", fr: "à partir de 500 dh", ar: "تبدأ من 500 DH" }
  },
  {
    icon: "EV", featured: false,
    title: { en: "Event & wedding coverage", fr: "Couverture d'événement & mariage", ar: "تغطية المناسبات والأعراس" },
    desc: { en: "Half day or full day, photo only or photo and film together.", fr: "Demi-journée ou journée complète, photo seule ou photo et film.", ar: "نصف يوم أو يوم كامل، صور فقط أو صور وفيديو." },
    bullets: {
      en: ["Full day coverage", "Second shooter available", "Online gallery to share"],
      fr: ["Couverture journée complète", "Second photographe possible", "Galerie en ligne à partager"],
      ar: ["تغطية يوم كامل", "إمكانية مصوّر ثانٍ", "معرض إلكتروني للمشاركة"]
    },
    price: { en: "from 2000dh", fr: "à partir de 2000 dh", ar: "تبدأ من 2000 DH" }
  },
  {
    icon: "PR", featured: false,
    title: { en: "Product & food photography", fr: "Photo produit & culinaire", ar: "تصوير المنتجات والطعام" },
    desc: { en: "Clean studio shots your shop and ads can use right away.", fr: "Photos studio nettes, utilisables tout de suite en boutique et en pub.", ar: "صور استوديو نظيفة جاهزة للمتجر والإعلانات." },
    bullets: {
      en: ["White or styled background", "Per-product pricing", "Web sizes included"],
      fr: ["Fond blanc ou stylisé", "Tarif par produit", "Formats web inclus"],
      ar: ["خلفية بيضاء أو منسّقة", "سعر لكل منتج", "مقاسات الويب مشمولة"]
    },
    price: { en: "from 2000dh / product", fr: "à partir de 2000 dh / produit", ar: "تبدأ من 2000 DH للمنتج" }
  },
  {
    icon: "VD", featured: false,
    title: { en: "Video shooting & editing", fr: "Tournage & montage vidéo", ar: "تصوير ومونتاج الفيديو" },
    desc: { en: "Reels, ads and short films, from the idea to the export.", fr: "Reels, publicités et courts films, de l'idée à l'export.", ar: "ريلز وإعلانات وأفلام قصيرة، من الفكرة حتى التصدير." },
    bullets: {
      en: ["Vertical and 16:9 versions", "Subtitles in 3 languages", "Licensed music"],
      fr: ["Versions verticale et 16:9", "Sous-titres en 3 langues", "Musique sous licence"],
      ar: ["نسخة عمودية و16:9", "ترجمة بثلاث لغات", "موسيقى مرخّصة"]
    },
    price: { en: "from 2000dh", fr: "à partir de 2000 dh", ar: "تبدأ من 1200 DH" }
  },
  {
    icon: "ED", featured: false,
    title: { en: "Editing only", fr: "Montage / retouche seuls", ar: "مونتاج ومعالجة فقط" },
    desc: { en: "You already have the files — I make them look finished.", fr: "Vous avez déjà les fichiers — je leur donne une finition pro.", ar: "لديك الملفات بالفعل — وأنا أُخرجها بشكل نهائي." },
    bullets: {
      en: ["Photo retouch", "Video cut, colour and sound", "2 rounds of changes"],
      fr: ["Retouche photo", "Montage, étalonnage et son", "2 séries de corrections"],
      ar: ["معالجة الصور", "مونتاج وتصحيح ألوان وصوت", "جولتا تعديلات"]
    },
    price: { en: "from 300dh", fr: "à partir de 300 dh", ar: "تبدأ من 300 DH" }
  },
  {
    icon: "SM", featured: false,
    title: { en: "Monthly content pack", fr: "Pack de contenu mensuel", ar: "باقة محتوى شهرية" },
    desc: { en: "A steady flow of photos and clips for your social accounts.", fr: "Un flux régulier de photos et de clips pour vos réseaux.", ar: "محتوى ثابت من الصور والمقاطع لحساباتك." },
    bullets: {
      en: ["1 shooting day per month", "20 photos + 4 clips", "Posting calendar"],
      fr: ["1 jour de tournage par mois", "20 photos + 4 clips", "Calendrier de publication"],
      ar: ["يوم تصوير شهريًا", "٢٠ صورة + ٤ مقاطع", "جدول نشر"]
    },
    price: { en: "from 2000dh/ month", fr: "à partir de 2000 dh / mois", ar: "تبدأ من 2000 DH شهريًا" }
  }
];

/* ---- 8. how it works ------------------------------------------------ */
window.PROCESS = [
  {
    title: { en: "You send the form", fr: "Vous envoyez le formulaire", ar: "ترسل النموذج" },
    desc: { en: "Tell me the date, the place and what you want. Two minutes.", fr: "Indiquez la date, le lieu et votre besoin. Deux minutes.", ar: "أخبرني بالتاريخ والمكان وما تريده. دقيقتان." }
  },
  {
    title: { en: "We agree the plan", fr: "On valide le plan", ar: "نتفق على الخطة" },
    desc: { en: "A short call or chat, then a clear price with nothing hidden.", fr: "Un appel ou un message, puis un prix clair, sans surprise.", ar: "مكالمة أو محادثة قصيرة، ثم سعر واضح دون أي مفاجآت." }
  },
  {
    title: { en: "Shooting day", fr: "Jour du tournage", ar: "يوم التصوير" },
    desc: { en: "I arrive early, handle the light and keep the mood relaxed.", fr: "J'arrive tôt, je gère la lumière et je garde une ambiance détendue.", ar: "أحضر مبكرًا، أتولى الإضاءة وأحافظ على جو مريح." }
  },
  {
    title: { en: "You get the files", fr: "Vous recevez les fichiers", ar: "تستلم الملفات" },
    desc: { en: "Edited photos and video in a private gallery, usually in 48h.", fr: "Photos et vidéos montées dans une galerie privée, souvent en 48 h.", ar: "صور وفيديو معالجة في معرض خاص، غالبًا خلال ٤٨ ساعة." }
  }
];

/* ---- 9. testimonials ------------------------------------------------ */
window.TESTIMONIALS = [
  {
    name: "Amal & Yassine", role: { en: "Wedding, June 2025", fr: "Mariage, juin 2025", ar: "زفاف، يونيو ٢٠٢٥" },
    quote: {
      en: "He was everywhere and we never noticed him. The photos made our parents cry.",
      fr: "Il était partout sans qu'on le remarque. Les photos ont fait pleurer nos parents.",
      ar: "كان في كل مكان دون أن نلاحظه. الصور أبكت والدينا."
    }
  },
  {
    name: "Studio Terra", role: { en: "Ceramics shop", fr: "Boutique de céramique", ar: "متجر خزف" },
    quote: {
      en: "Our online sales went up after we replaced the old product photos.",
      fr: "Nos ventes en ligne ont augmenté après le remplacement des anciennes photos.",
      ar: "ارتفعت مبيعاتنا الإلكترونية بعد استبدال صور المنتجات القديمة."
    }
  },
  {
    name: "Café Nour", role: { en: "Monthly content", fr: "Contenu mensuel", ar: "محتوى شهري" },
    quote: {
      en: "One shooting day gives us content for the whole month. Easy to work with.",
      fr: "Un jour de tournage nous donne du contenu pour tout le mois. Très simple.",
      ar: "يوم تصوير واحد يمنحنا محتوى الشهر كله. التعامل معه سهل."
    }
  }
];

/* ---- 10. budget choices in the form --------------------------------- */
window.BUDGETS = [
  { value: "<150", label: { en: "Under $150", fr: "Moins de 150 $", ar: "أقل من ١٥٠ $" } },
  { value: "150-400", label: { en: "$150 – $400", fr: "150 – 400 $", ar: "١٥٠ – ٤٠٠ $" } },
  { value: "400-800", label: { en: "$400 – $800", fr: "400 – 800 $", ar: "٤٠٠ – ٨٠٠ $" } },
  { value: "800+", label: { en: "More than $800", fr: "Plus de 800 $", ar: "أكثر من ٨٠٠ $" } },
  { value: "unsure", label: { en: "Not sure yet", fr: "Je ne sais pas encore", ar: "لم أحدد بعد" } }
];

/* ---- 11. extra option at the end of "What do you need?" ------------- */
window.OTHER_OPTION = { en: "Something else", fr: "Autre chose", ar: "شيء آخر" };





