/* =========================================================
   i18n — interface strings for English / French / Arabic.
   Page content (work items, services, ...) lives in data.js.
   Add a language by copying a block and adding it to LANGS.
   ========================================================= */

window.LANGS = [
  { code: "en", label: "EN", name: "English", dir: "ltr" },
  { code: "fr", label: "FR", name: "Français", dir: "ltr" },
  { code: "ar", label: "ع", name: "العربية", dir: "rtl" }
];

window.I18N = {
  /* ------------------------------ ENGLISH ------------------------------ */
  en: {
    meta: {
      title: "Frames Studio — Brand stories, film, photo & design",
      description: "I help brands tell their story: filmmaking, photo and video editing, photo shows and graphic design. Send a request and get availability and a price within 24 hours."
    },
    brand: { name: "FRAMES STUDIO", role: "Film · Photo · Design" },
    nav: { work: "Work", services: "Services", process: "Process", about: "About", contact: "Contact", hire: "Hire me" },
    hero: {
      eyebrow: "Brand stories · film · photo · design",
      title: "I help brands tell the story behind their work.",
      lead: "Films and photos, edited and designed — from the first idea to files that are ready to publish.",
      ctaPrimary: "See my work",
      ctaSecondary: "Request my help",
      badge1: "Available for travel",
      badge2: "Reply within 24h",
      badge3: "Raw + edited files"
    },
    work: {
      eyebrow: "Portfolio",
      title: "Selected work",
      lead: "A few recent projects. Tap any card to open it larger.",
      filterLabel: "Filter work",
      empty: "Nothing in this category yet."
    },
    services: {
      eyebrow: "Services",
      title: "What you can hire me for",
      lead: "Pick the closest one in the form — we can always adjust the details together.",
      cta: "Request this"
    },
    process: {
      eyebrow: "How it works",
      title: "Four steps, no surprises",
      lead: "From your first message to the final files."
    },
    about: {
      eyebrow: "About me",
      title: "Behind the camera",
      p1: "I shoot, edit and design. I care about light, timing, a clean cut and type that fits the brand.",
      p2: "I work with brands, small businesses and people who need their story told well, and I hand over files that are ready to post.",
      gearTitle: "Gear & tools",
      photoAlt: "On a shoot: the camera over the counter while the kitchen team works."
    },
    testimonials: { eyebrow: "Clients", title: "What people say" },
    contact: {
      eyebrow: "Work with me",
      title: "Tell me about your project",
      lead: "Fill the form and I will come back to you with availability and a price.",
      whatsapp: "WhatsApp me",
      based: "Based in {city} — available for travel"
    },
    form: {
      name: "Your name", namePh: "e.g. Sara Ahmed",
      email: "Email", emailPh: "you@example.com",
      phone: "Phone / WhatsApp", phonePh: "+1 555 000 0000",
      type: "What do you need?",
      budget: "Budget range",
      date: "Date (if you have one)",
      location: "City / location", locationPh: "City, country",
      message: "Describe the project",
      messagePh: "Number of photos or video length, place, the style you want…",
      consent: "I agree to be contacted about this request.",
      submit: "Send request", sending: "Sending…",
      privacy: "Your details are only used to answer you. No newsletters.",
      successTitle: "Request sent ✓",
      successBody: "Thank you! I will reply by email within 24 hours.",
      errorTitle: "Could not send",
      errorBody: "Check your connection and try again, or email me directly at",
      errRequired: "This field is required",
      errEmail: "Enter a valid email address",
      errConsent: "Please accept to continue",
      selectPlaceholder: "Choose…",
      notConfiguredTitle: "Form not connected yet",
      notConfiguredBody: "Add your Web3Forms key in assets/js/data.js. Opening your email app instead."
    },
    footer: { tagline: "Brand stories in film, photo and design — ready to publish.", links: "Pages", follow: "Follow", rights: "All rights reserved." },
    ui: {
      skip: "Skip to content", language: "Language", theme: "Switch theme", menu: "Menu",
      viewer: "Work viewer", close: "Close", prev: "Previous", next: "Next", top: "Back to top",
      counter: "{i} of {n}", share: "Share", copied: "Link copied"
    }
  },

  /* ------------------------------ FRANÇAIS ------------------------------ */
  fr: {
    meta: {
      title: "Frames Studio — Récits de marque, film, photo & design",
      description: "J'aide les marques à raconter leur histoire : réalisation de films, montage photo et vidéo, diaporamas et design graphique. Envoyez une demande et recevez mes disponibilités et un prix sous 24 h."
    },
    brand: { name: "FRAMES STUDIO", role: "Film · Photo · Design" },
    nav: { work: "Réalisations", services: "Services", process: "Déroulement", about: "À propos", contact: "Contact", hire: "Me contacter" },
    hero: {
      eyebrow: "Récits de marque · film · photo · design",
      title: "J'aide les marques à raconter l'histoire derrière leur travail.",
      lead: "Films et photos, montés et designés — de la première idée aux fichiers prêts à publier.",
      ctaPrimary: "Voir mes réalisations",
      ctaSecondary: "Demander mon aide",
      badge1: "Disponible pour voyager",
      badge2: "Réponse en 24 h",
      badge3: "Fichiers bruts et montés"
    },
    work: {
      eyebrow: "Portfolio",
      title: "Réalisations choisies",
      lead: "Quelques projets récents. Touchez une carte pour l'agrandir.",
      filterLabel: "Filtrer les réalisations",
      empty: "Rien dans cette catégorie pour l'instant."
    },
    services: {
      eyebrow: "Services",
      title: "Ce pour quoi vous pouvez m'engager",
      lead: "Choisissez le plus proche dans le formulaire — on ajustera les détails ensemble.",
      cta: "Demander ce service"
    },
    process: {
      eyebrow: "Comment ça marche",
      title: "Quatre étapes, sans surprise",
      lead: "De votre premier message aux fichiers finaux."
    },
    about: {
      eyebrow: "À propos",
      title: "Derrière la caméra",
      p1: "Je filme, je monte et je conçois. La lumière, le timing, un montage propre et une typographie juste sont mes priorités.",
      p2: "Je travaille avec des marques, des petites entreprises et des personnes qui veulent bien raconter leur histoire, et je livre des fichiers prêts à publier.",
      gearTitle: "Matériel & outils",
      photoAlt: "En tournage : la caméra au-dessus du comptoir pendant que l'équipe travaille."
    },
    testimonials: { eyebrow: "Clients", title: "Ce qu'ils en disent" },
    contact: {
      eyebrow: "Travaillons ensemble",
      title: "Parlez-moi de votre projet",
      lead: "Remplissez le formulaire et je reviens vers vous avec mes disponibilités et un prix.",
      whatsapp: "M'écrire sur WhatsApp",
      based: "Basé à {city} — disponible pour voyager"
    },
    form: {
      name: "Votre nom", namePh: "ex. Sara Ahmed",
      email: "E-mail", emailPh: "vous@exemple.com",
      phone: "Téléphone / WhatsApp", phonePh: "+33 6 00 00 00 00",
      type: "De quoi avez-vous besoin ?",
      budget: "Budget approximatif",
      date: "Date (si vous en avez une)",
      location: "Ville / lieu", locationPh: "Ville, pays",
      message: "Décrivez le projet",
      messagePh: "Nombre de photos ou durée de la vidéo, lieu, style souhaité…",
      consent: "J'accepte d'être contacté(e) au sujet de cette demande.",
      submit: "Envoyer la demande", sending: "Envoi…",
      privacy: "Vos informations servent uniquement à vous répondre. Aucune newsletter.",
      successTitle: "Demande envoyée ✓",
      successBody: "Merci ! Je vous réponds par e-mail sous 24 h.",
      errorTitle: "Envoi impossible",
      errorBody: "Vérifiez votre connexion et réessayez, ou écrivez-moi directement à",
      errRequired: "Ce champ est obligatoire",
      errEmail: "Saisissez une adresse e-mail valide",
      errConsent: "Vous devez accepter pour continuer",
      selectPlaceholder: "Choisir…",
      notConfiguredTitle: "Formulaire pas encore configuré",
      notConfiguredBody: "Ajoutez votre clé Web3Forms dans assets/js/data.js. Votre application e-mail va s'ouvrir à la place."
    },
    footer: { tagline: "Récits de marque en film, photo et design — prêts à publier.", links: "Pages", follow: "Suivez-moi", rights: "Tous droits réservés." },
    ui: {
      skip: "Aller au contenu", language: "Langue", theme: "Changer de thème", menu: "Menu",
      viewer: "Visionneuse", close: "Fermer", prev: "Précédent", next: "Suivant", top: "Haut de page",
      counter: "{i} sur {n}", share: "Partager", copied: "Lien copié"
    }
  },

  /* ------------------------------ العربية ------------------------------ */
  ar: {
    meta: {
      title: "FRAMES STUDIO — قصص العلامات، أفلام، تصوير وتصميم",
      description: "أساعد العلامات على حكاية قصتها: صناعة الأفلام، مونتاج الصور والفيديو، عروض الصور والتصميم الجرافيكي. أرسل طلبك واحصل على المواعيد المتاحة والسعر خلال ٢٤ ساعة."
    },
    brand: { name: "FRAMES STUDIO", role: "أفلام · تصوير · تصميم" },
    nav: { work: "الأعمال", services: "الخدمات", process: "طريقة العمل", about: "نبذة عني", contact: "تواصل", hire: "اطلب خدمتي" },
    hero: {
      eyebrow: "قصص العلامات · أفلام · تصوير · تصميم",
      title: "أساعد العلامات على حكاية القصة خلف عملها.",
      lead: "أفلام وصور، مونتاج وتصميم — من الفكرة الأولى إلى ملفات جاهزة للنشر.",
      ctaPrimary: "شاهد أعمالي",
      ctaSecondary: "اطلب مساعدتي",
      badge1: "جاهز للسفر",
      badge2: "أرد خلال ٢٤ ساعة",
      badge3: "ملفات أصلية ومعالجة"
    },
    work: {
      eyebrow: "معرض الأعمال",
      title: "أعمال مختارة",
      lead: "بعض المشاريع الأخيرة. اضغط على أي بطاقة لعرضها بحجم أكبر.",
      filterLabel: "تصفية الأعمال",
      empty: "لا يوجد شيء في هذا التصنيف بعد."
    },
    services: {
      eyebrow: "الخدمات",
      title: "ما يمكنك طلبه منّي",
      lead: "اختر الأقرب في النموذج، ويمكننا ضبط التفاصيل معًا.",
      cta: "اطلب هذه الخدمة"
    },
    process: {
      eyebrow: "كيف نعمل",
      title: "أربع خطوات بلا مفاجآت",
      lead: "من رسالتك الأولى حتى الملفات النهائية."
    },
    about: {
      eyebrow: "نبذة عني",
      title: "خلف الكاميرا",
      p1: "أصوّر وأحرّر وأصمّم. يهمّني الضوء والتوقيت والمونتاج النظيف والخط المناسب للعلامة.",
      p2: "أعمل مع العلامات التجارية والمشاريع الصغيرة ومن يريد حكاية قصته جيدًا، وأسلّم ملفات جاهزة للنشر مباشرة.",
      gearTitle: "الأدوات والمعدات",
      photoAlt: "أثناء التصوير: الكاميرا فوق الطاولة وفريق المطبخ يعمل."
    },
    testimonials: { eyebrow: "العملاء", title: "ماذا يقول العملاء" },
    contact: {
      eyebrow: "اعمل معي",
      title: "أخبرني عن مشروعك",
      lead: "املأ النموذج وسأعود إليك بالمواعيد المتاحة والسعر.",
      whatsapp: "راسلني على واتساب",
      based: "مقيم في {city} — وجاهز للسفر"
    },
    form: {
      name: "اسمك", namePh: "مثال: سارة أحمد",
      email: "البريد الإلكتروني", emailPh: "you@example.com",
      phone: "الهاتف / واتساب", phonePh: "+212 6 00 00 00 00",
      type: "ما الذي تحتاجه؟",
      budget: "الميزانية التقريبية",
      date: "التاريخ (إن وُجد)",
      location: "المدينة / المكان", locationPh: "المدينة، البلد",
      message: "اوصف مشروعك",
      messagePh: "عدد الصور أو مدة الفيديو، المكان، والأسلوب المطلوب…",
      consent: "أوافق على أن يتم التواصل معي بخصوص هذا الطلب.",
      submit: "أرسل الطلب", sending: "جارٍ الإرسال…",
      privacy: "تُستخدم بياناتك للرد عليك فقط، بلا رسائل دعائية.",
      successTitle: "تم إرسال طلبك ✓",
      successBody: "شكرًا لك! سأعود إليك عبر البريد خلال ٢٤ ساعة.",
      errorTitle: "لم يتم الإرسال",
      errorBody: "تحقّق من اتصالك بالإنترنت وحاول مرة أخرى، أو راسلني مباشرة على",
      errRequired: "هذا الحقل مطلوب",
      errEmail: "أدخل بريدًا إلكترونيًا صحيحًا",
      errConsent: "يجب الموافقة للمتابعة",
      selectPlaceholder: "اختر…",
      notConfiguredTitle: "النموذج غير مُهيَّأ بعد",
      notConfiguredBody: "أضف مفتاح Web3Forms في assets/js/data.js. سيتم فتح تطبيق البريد لديك بدلًا من ذلك."
    },
    footer: { tagline: "قصص العلامات في الفيلم والصورة والتصميم — جاهزة للنشر.", links: "الصفحات", follow: "تابعني", rights: "جميع الحقوق محفوظة." },
    ui: {
      skip: "تخطَّ إلى المحتوى", language: "اللغة", theme: "تغيير المظهر", menu: "القائمة",
      viewer: "عارض الأعمال", close: "إغلاق", prev: "السابق", next: "التالي", top: "إلى الأعلى",
      counter: "{i} من {n}", share: "مشاركة", copied: "تم نسخ الرابط"
    }
  }
};





