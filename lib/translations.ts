export type Lang = "en" | "cs" | "sk";

export const translations = {
  en: {
    // Nav
    howItWorks: "How It Works",
    designs: "Designs",
    getStarted: "Get Started",

    // Hero
    tagline: "Digital Wedding Invitations",
    heroTitle1: "Your love story,",
    heroTitle2: "beautifully told.",
    heroSub:
      "Elegant digital invitations your guests will remember. Customize in minutes. Share a link. No printing, no postage, no stress.",
    designYourInvitation: "Design Your Invitation",
    viewDesigns: "View Designs",
    heroQuote: "The beginning of forever.",

    // How it works
    howItWorksLabel: "How It Works",
    step1Title: "Choose a Design",
    step1Desc: "Browse our curated collection of elegant invitation templates.",
    step2Title: "Personalize It",
    step2Desc:
      "Add your names, date, venue and a personal message — and watch a live preview update in real time.",
    step3Title: "Checkout",
    step3Desc: "Pay once. No subscriptions, no hidden fees.",
    step4Title: "Share Your Link",
    step4Desc:
      "Receive a unique URL instantly. Copy, paste, send — your guests experience a stunning invitation online.",

    // Designs
    ourDesigns: "Our Designs",
    chooseYourStyle: "Choose Your Style",
    sampleInvitation: "Sample Invitation",
    comingSoon: "Coming Soon",
    customize: "Customize →",

    // CTA
    readyToBegin: "Ready to begin?",
    createInMinutes: "Create your invitation in minutes.",
    startDesigning: "Start Designing",

    // Footer
    footerText: "Forevermore — Digital Wedding Invitations",
    allRightsReserved: "All rights reserved.",

    // Customize page
    customizeStep: "Customize",
    reviewStep: "Review & Purchase",
    yourDetails: "Your Details",
    looksGood: "Looks good?",
    makeItYours: "Make it yours.",
    fillInDetails:
      "Fill in your details and watch the invitation update live on the right.",
    theCouple: "The Couple",
    firstPartner: "First Partner *",
    secondPartner: "Second Partner *",
    dateAndTime: "Date & Time",
    date: "Date *",
    time: "Time",
    venue: "Venue",
    venueName: "Venue Name *",
    cityAndCountry: "City & Country *",
    personalMessage: "Personal Message",
    noteForGuests: "A note for your guests (optional)",
    rsvpEmail: "RSVP Email",
    guestsWillRsvp: "Guests will RSVP to this email *",
    invalidEmail:
      "Please enter a valid email address (e.g. emma@example.com)",
    reviewInvitation: "Review My Invitation →",
    requiredFields: "* Required fields",
    lookingBeautiful: "Looking beautiful.",
    readyAfterPayment:
      "Your invitation is ready. After payment you'll receive a permanent shareable link instantly.",
    design: "Design",
    couple: "Couple",
    total: "Total",
    redirecting: "Redirecting to payment…",
    payAndGetLink: (price: string) => `Pay ${price} & Get My Link`,
    goBackEdit: "← Go Back & Edit",
    securePayment:
      "Secure payment via Stripe. Your link is permanent — share it forever.",
    livePreview: "Live Preview",
    exactlyWhatGuests: "This is exactly what your guests will see.",
    somethingWentWrong: "Something went wrong. Please try again.",
    networkError: "Network error. Please try again.",

    // Success page
    paymentConfirmed: "Payment Confirmed",
    invitationReady1: "Your invitation",
    invitationReady2: "is ready.",
    shareLink:
      "Share the link below with your guests. It's permanent — they can open it on any device, any time.",
    generatingLink: "Generating your link…",
    copiedToClipboard: "✓ Copied to Clipboard!",
    copyYourLink: "Copy Your Invitation Link",
    previewInvitation: "Preview Your Invitation →",
    linkComingSoon:
      "Your link is being generated — it will arrive at your email shortly. If you don't receive it in 5 minutes, please contact us.",
    backToForevermore: "← Back to Forevermore",

    // Invite page (guest view)
    weddingInvitation: "Wedding Invitation",
    togetherForever: "Together Forever",
    together: "Together",
    anInvitation: "An Invitation",
    rsvp: "RSVP",
    togetherWithFamilies: "Together with their families",
    requestPresence: "Request the honour of your presence",
    kindlyRsvp: "Kindly RSVP",
    createdWith: "Created with",

    // InvitePreview placeholders
    partnerOnePlaceholder: "Partner One",
    partnerTwoPlaceholder: "Partner Two",
    datePlaceholder: "Day, Month Date, Year",
    venuePlaceholder: "The Venue Name",
    locationPlaceholder: "City, Country",

    // Landing page — Why Digital section
    whyDigitalLabel: "Why Digital",
    whyDigitalHeading: "Modern love deserves a",
    whyDigitalHeadingItalic: "modern invitation",
    whyDigital1Title: "Instant link",
    whyDigital1Desc: "Share your link the moment payment is confirmed. No waiting, no shipping, no lost invitations.",
    whyDigital2Title: "Any device, always",
    whyDigital2Desc: "Guests open it on their phone, tablet, or laptop. One link works everywhere, forever.",
    whyDigital3Title: "Zero waste",
    whyDigital3Desc: "No paper, no printing, no postage. Beautiful and kind to the planet — like every great love story.",

    // Landing page — How it works subheading
    howItWorksSubtitle: "Ready in four simple steps",
    howItWorksSubDesc: "From blank to beautiful in minutes.",

    // Landing page — Designs subheading
    designsSubDesc: "20 unique designs — from dark and dramatic to light and botanical. Every style is yours to customize.",

    // Landing page — Lifestyle banner
    lifestyleLabel: "Your special day",
    lifestyleHeading: "Share your love story\nwith the world",

    // Landing page — Pricing
    pricingLabel: "Pricing",
    pricingHeading: "Simple & honest",
    pricingOneTime: "One-time payment",
    pricingPerInvite: "per invitation · no subscriptions",
    pricingMostPopular: "Most Popular",
    pricingCta: "Get Started",
    pricingTier1Tier: "Basic",
    pricingTier1Name: "Digital",
    pricingTier1Feature1: "1 design",
    pricingTier1Feature2: "Unlimited sends",
    pricingTier1Feature3: "Basic RSVP tracking",
    pricingTier1Feature4: "Link-based delivery",
    pricingTier2Tier: "Standard",
    pricingTier2Name: "Premium",
    pricingTier2Feature1: "3 designs to choose from",
    pricingTier2Feature2: "Unlimited sends",
    pricingTier2Feature3: "RSVP tracking + reminders",
    pricingTier2Feature4: "Animated envelope",
    pricingTier2Feature5: "QR code",
    pricingTier3Tier: "Pro",
    pricingTier3Name: "Luxury",
    pricingTier3Feature1: "All designs",
    pricingTier3Feature2: "Unlimited sends",
    pricingTier3Feature3: "Full RSVP dashboard",
    pricingTier3Feature4: "Custom domain link",
    pricingTier3Feature5: "WhatsApp / SMS delivery",
    pricingTier3Feature6: "Priority support",

    // Trust strip
    trustOneTime: "From €29",
    trustInstant: "Instant link",
    trustSecure: "Secure payment",

    // Form placeholders
    egPartner1: "e.g. Emma",
    egPartner2: "e.g. James",
    egDate: "e.g. September 14, 2025",
    egTime: "e.g. 4:00 PM",
    egVenue: "e.g. The Grand Estate",
    egLocation: "e.g. Florence, Italy",
    egMessage: "e.g. We joyfully invite you to celebrate with us…",
    egEmail: "e.g. emma@example.com",
    invitationLanguage: "Invitation Language",
    languageGuestsSee: "Language your guests will see",
  },

  cs: {
    // Nav
    howItWorks: "Jak to funguje",
    designs: "Vzory",
    getStarted: "Začít",

    // Hero
    tagline: "Digitální svatební oznámení",
    heroTitle1: "Váš příběh lásky,",
    heroTitle2: "krásně vyprávěný.",
    heroSub:
      "Elegantní digitální oznámení, na která vaši hosté nezapomenou. Přizpůsobte za pár minut. Sdílejte odkaz. Žádný tisk, žádné poštovné, žádný stres.",
    designYourInvitation: "Vytvořit oznámení",
    viewDesigns: "Zobrazit vzory",
    heroQuote: "Začátek navždy.",

    // How it works
    howItWorksLabel: "Jak to funguje",
    step1Title: "Vyberte vzor",
    step1Desc: "Prohlédněte si naši kolekci elegantních šablon oznámení.",
    step2Title: "Přizpůsobte si",
    step2Desc:
      "Přidejte jména, datum, místo a osobní vzkaz — a sledujte živý náhled v reálném čase.",
    step3Title: "Zaplaťte",
    step3Desc: "Zaplaťte jednou. Žádné předplatné, žádné skryté poplatky.",
    step4Title: "Sdílejte odkaz",
    step4Desc:
      "Okamžitě obdržíte jedinečný odkaz. Zkopírujte, vložte, odešlete — hosté uvidí krásné oznámení online.",

    // Designs
    ourDesigns: "Naše vzory",
    chooseYourStyle: "Vyberte svůj styl",
    sampleInvitation: "Ukázkové oznámení",
    comingSoon: "Připravujeme",
    customize: "Přizpůsobit →",

    // CTA
    readyToBegin: "Připraveni začít?",
    createInMinutes: "Vytvořte oznámení za pár minut.",
    startDesigning: "Začít navrhovat",

    // Footer
    footerText: "Forevermore — Digitální svatební oznámení",
    allRightsReserved: "Všechna práva vyhrazena.",

    // Customize page
    customizeStep: "Přizpůsobit",
    reviewStep: "Kontrola a platba",
    yourDetails: "Vaše údaje",
    looksGood: "Vypadá dobře?",
    makeItYours: "Udělejte ho svým.",
    fillInDetails:
      "Vyplňte údaje a sledujte, jak se oznámení aktualizuje živě napravo.",
    theCouple: "Pár",
    firstPartner: "První partner *",
    secondPartner: "Druhý partner *",
    dateAndTime: "Datum a čas",
    date: "Datum *",
    time: "Čas",
    venue: "Místo",
    venueName: "Název místa *",
    cityAndCountry: "Město a země *",
    personalMessage: "Osobní vzkaz",
    noteForGuests: "Vzkaz pro hosty (volitelné)",
    rsvpEmail: "RSVP e-mail",
    guestsWillRsvp: "Hosté odpoví na tento e-mail *",
    invalidEmail:
      "Zadejte prosím platnou e-mailovou adresu (např. emma@example.com)",
    reviewInvitation: "Zkontrolovat oznámení →",
    requiredFields: "* Povinná pole",
    lookingBeautiful: "Vypadá krásně.",
    readyAfterPayment:
      "Vaše oznámení je připraveno. Po platbě okamžitě obdržíte trvalý sdílený odkaz.",
    design: "Vzor",
    couple: "Pár",
    total: "Celkem",
    redirecting: "Přesměrování na platbu…",
    payAndGetLink: (price: string) => `Zaplatit ${price} a získat odkaz`,
    goBackEdit: "← Zpět a upravit",
    securePayment:
      "Bezpečná platba přes Stripe. Váš odkaz je trvalý — sdílejte ho navždy.",
    livePreview: "Živý náhled",
    exactlyWhatGuests: "Přesně takto to uvidí vaši hosté.",
    somethingWentWrong: "Něco se pokazilo. Zkuste to prosím znovu.",
    networkError: "Chyba sítě. Zkuste to prosím znovu.",

    // Success page
    paymentConfirmed: "Platba potvrzena",
    invitationReady1: "Vaše oznámení",
    invitationReady2: "je připraveno.",
    shareLink:
      "Sdílejte níže uvedený odkaz se svými hosty. Je trvalý — mohou ho otevřít na jakémkoli zařízení, kdykoli.",
    generatingLink: "Generování odkazu…",
    copiedToClipboard: "✓ Zkopírováno do schránky!",
    copyYourLink: "Zkopírovat odkaz na oznámení",
    previewInvitation: "Náhled oznámení →",
    linkComingSoon:
      "Váš odkaz se generuje — brzy dorazí na váš e-mail. Pokud ho neobdržíte do 5 minut, kontaktujte nás.",
    backToForevermore: "← Zpět na Forevermore",

    // Invite page (guest view)
    weddingInvitation: "Svatební oznámení",
    togetherForever: "Navždy spolu",
    together: "Společně",
    anInvitation: "Pozvánka",
    rsvp: "RSVP",
    togetherWithFamilies: "Společně se svými rodinami",
    requestPresence: "Žádáme vás o vaši přítomnost",
    kindlyRsvp: "Prosíme o potvrzení účasti",
    createdWith: "Vytvořeno s",

    // InvitePreview placeholders
    partnerOnePlaceholder: "Partner jedna",
    partnerTwoPlaceholder: "Partner dva",
    datePlaceholder: "Den, měsíc, rok",
    venuePlaceholder: "Název místa",
    locationPlaceholder: "Město, země",

    // Landing page — Why Digital section
    whyDigitalLabel: "Proč digitálně",
    whyDigitalHeading: "Moderní láska si zaslouží",
    whyDigitalHeadingItalic: "moderní oznámení",
    whyDigital1Title: "Okamžitý odkaz",
    whyDigital1Desc: "Sdílejte odkaz ihned po potvrzení platby. Žádné čekání, žádné zásilky, žádná ztráta oznámení.",
    whyDigital2Title: "Na každém zařízení",
    whyDigital2Desc: "Hosté ho otevřou na telefonu, tabletu nebo notebooku. Jeden odkaz funguje všude, navždy.",
    whyDigital3Title: "Bez odpadu",
    whyDigital3Desc: "Žádný papír, žádný tisk, žádné poštovné. Krásné a šetrné k přírodě — jako každý velký příběh lásky.",

    // Landing page — How it works subheading
    howItWorksSubtitle: "Hotovo ve čtyřech jednoduchých krocích",
    howItWorksSubDesc: "Z prázdné stránky k dokonalému oznámení za pár minut.",

    // Landing page — Designs subheading
    designsSubDesc: "20 unikátních vzorů — od temných a dramatických po světlé a botanické. Každý styl si přizpůsobíte.",

    // Landing page — Lifestyle banner
    lifestyleLabel: "Váš výjimečný den",
    lifestyleHeading: "Sdílejte váš příběh lásky\nse světem",

    // Landing page — Pricing
    pricingLabel: "Ceny",
    pricingHeading: "Jednoduché a upřímné",
    pricingOneTime: "Jednorázová platba",
    pricingPerInvite: "za oznámení · žádné předplatné",
    pricingMostPopular: "Nejoblíbenější",
    pricingCta: "Začít",
    pricingTier1Tier: "Basic",
    pricingTier1Name: "Digitální",
    pricingTier1Feature1: "1 vzor",
    pricingTier1Feature2: "Neomezené odesílání",
    pricingTier1Feature3: "Základní sledování RSVP",
    pricingTier1Feature4: "Doručení přes odkaz",
    pricingTier2Tier: "Standard",
    pricingTier2Name: "Prémiový",
    pricingTier2Feature1: "3 vzory na výběr",
    pricingTier2Feature2: "Neomezené odesílání",
    pricingTier2Feature3: "RSVP sledování + připomínky",
    pricingTier2Feature4: "Animovaná obálka",
    pricingTier2Feature5: "QR kód",
    pricingTier3Tier: "Pro",
    pricingTier3Name: "Luxusní",
    pricingTier3Feature1: "Všechny vzory",
    pricingTier3Feature2: "Neomezené odesílání",
    pricingTier3Feature3: "Plný RSVP přehled",
    pricingTier3Feature4: "Vlastní doménový odkaz",
    pricingTier3Feature5: "WhatsApp / SMS doručení",
    pricingTier3Feature6: "Prioritní podpora",

    // Trust strip
    trustOneTime: "Od 699 Kč",
    trustInstant: "Okamžitý odkaz",
    trustSecure: "Bezpečná platba",

    // Form placeholders
    egPartner1: "např. Jana",
    egPartner2: "např. Tomáš",
    egDate: "např. 14. září 2025",
    egTime: "např. 16:00",
    egVenue: "např. Zámek Kozel",
    egLocation: "např. Praha, Česká republika",
    egMessage: "např. S radostí vás zveme, abyste s námi slavili…",
    egEmail: "např. jana@example.com",
    invitationLanguage: "Jazyk oznámení",
    languageGuestsSee: "Jazyk, který uvidí vaši hosté",
  },

  sk: {
    // Nav
    howItWorks: "Ako to funguje",
    designs: "Vzory",
    getStarted: "Začať",

    // Hero
    tagline: "Digitálne svadobné oznámenia",
    heroTitle1: "Váš príbeh lásky,",
    heroTitle2: "krásne vyrozprávaný.",
    heroSub:
      "Elegantné digitálne oznámenia, na ktoré vaši hostia nezabudnú. Prispôsobte za pár minút. Zdieľajte odkaz. Žiadna tlač, žiadne poštovné, žiadny stres.",
    designYourInvitation: "Vytvoriť oznámenie",
    viewDesigns: "Zobraziť vzory",
    heroQuote: "Začiatok navždy.",

    // How it works
    howItWorksLabel: "Ako to funguje",
    step1Title: "Vyberte vzor",
    step1Desc: "Prezrite si našu kolekciu elegantných šablón oznámení.",
    step2Title: "Prispôsobte si",
    step2Desc:
      "Pridajte mená, dátum, miesto a osobný odkaz — a sledujte živý náhľad v reálnom čase.",
    step3Title: "Zaplaťte",
    step3Desc: "Zaplaťte raz. Žiadne predplatné, žiadne skryté poplatky.",
    step4Title: "Zdieľajte odkaz",
    step4Desc:
      "Okamžite dostanete jedinečný odkaz. Skopírujte, vložte, odošlite — hostia uvidia krásne oznámenie online.",

    // Designs
    ourDesigns: "Naše vzory",
    chooseYourStyle: "Vyberte svoj štýl",
    sampleInvitation: "Ukážkové oznámenie",
    comingSoon: "Pripravujeme",
    customize: "Prispôsobiť →",

    // CTA
    readyToBegin: "Pripravení začať?",
    createInMinutes: "Vytvorte oznámenie za pár minút.",
    startDesigning: "Začať navrhovať",

    // Footer
    footerText: "Forevermore — Digitálne svadobné oznámenia",
    allRightsReserved: "Všetky práva vyhradené.",

    // Customize page
    customizeStep: "Prispôsobiť",
    reviewStep: "Kontrola a platba",
    yourDetails: "Vaše údaje",
    looksGood: "Vyzerá dobre?",
    makeItYours: "Urobte ho svojím.",
    fillInDetails:
      "Vyplňte údaje a sledujte, ako sa oznámenie aktualizuje naživo napravo.",
    theCouple: "Pár",
    firstPartner: "Prvý partner *",
    secondPartner: "Druhý partner *",
    dateAndTime: "Dátum a čas",
    date: "Dátum *",
    time: "Čas",
    venue: "Miesto",
    venueName: "Názov miesta *",
    cityAndCountry: "Mesto a krajina *",
    personalMessage: "Osobný odkaz",
    noteForGuests: "Odkaz pre hostí (voliteľné)",
    rsvpEmail: "RSVP e-mail",
    guestsWillRsvp: "Hostia odpovedia na tento e-mail *",
    invalidEmail:
      "Zadajte prosím platnú e-mailovú adresu (napr. emma@example.com)",
    reviewInvitation: "Skontrolovať oznámenie →",
    requiredFields: "* Povinné polia",
    lookingBeautiful: "Vyzerá krásne.",
    readyAfterPayment:
      "Vaše oznámenie je pripravené. Po platbe okamžite dostanete trvalý zdieľaný odkaz.",
    design: "Vzor",
    couple: "Pár",
    total: "Celkom",
    redirecting: "Presmerovanie na platbu…",
    payAndGetLink: (price: string) => `Zaplatiť ${price} a získať odkaz`,
    goBackEdit: "← Späť a upraviť",
    securePayment:
      "Bezpečná platba cez Stripe. Váš odkaz je trvalý — zdieľajte ho navždy.",
    livePreview: "Živý náhľad",
    exactlyWhatGuests: "Presne takto to uvidia vaši hostia.",
    somethingWentWrong: "Niečo sa pokazilo. Skúste to prosím znova.",
    networkError: "Chyba siete. Skúste to prosím znova.",

    // Success page
    paymentConfirmed: "Platba potvrdená",
    invitationReady1: "Vaše oznámenie",
    invitationReady2: "je pripravené.",
    shareLink:
      "Zdieľajte odkaz nižšie so svojimi hosťami. Je trvalý — môžu ho otvoriť na akomkoľvek zariadení, kedykoľvek.",
    generatingLink: "Generovanie odkazu…",
    copiedToClipboard: "✓ Skopírované do schránky!",
    copyYourLink: "Skopírovať odkaz na oznámenie",
    previewInvitation: "Náhľad oznámenia →",
    linkComingSoon:
      "Váš odkaz sa generuje — čoskoro dorazí na váš e-mail. Ak ho nedostanete do 5 minút, kontaktujte nás.",
    backToForevermore: "← Späť na Forevermore",

    // Invite page (guest view)
    weddingInvitation: "Svadobné oznámenie",
    togetherForever: "Navždy spolu",
    together: "Spoločne",
    anInvitation: "Pozvánka",
    rsvp: "RSVP",
    togetherWithFamilies: "Spoločne so svojimi rodinami",
    requestPresence: "Prosíme o vašu prítomnosť",
    kindlyRsvp: "Prosíme o potvrdenie účasti",
    createdWith: "Vytvorené s",

    // InvitePreview placeholders
    partnerOnePlaceholder: "Partner jeden",
    partnerTwoPlaceholder: "Partner dva",
    datePlaceholder: "Deň, mesiac, rok",
    venuePlaceholder: "Názov miesta",
    locationPlaceholder: "Mesto, krajina",

    // Landing page — Why Digital section
    whyDigitalLabel: "Prečo digitálne",
    whyDigitalHeading: "Moderná láska si zaslúži",
    whyDigitalHeadingItalic: "moderné oznámenie",
    whyDigital1Title: "Okamžitý odkaz",
    whyDigital1Desc: "Zdieľajte odkaz hneď po potvrdení platby. Žiadne čakanie, žiadne zásielky, žiadna strata oznámenia.",
    whyDigital2Title: "Na každom zariadení",
    whyDigital2Desc: "Hostia ho otvoria na telefóne, tablete alebo notebooku. Jeden odkaz funguje všade, navždy.",
    whyDigital3Title: "Bez odpadu",
    whyDigital3Desc: "Žiadny papier, žiadna tlač, žiadne poštovné. Krásne a šetrné k prírode — ako každý veľký príbeh lásky.",

    // Landing page — How it works subheading
    howItWorksSubtitle: "Hotovo v štyroch jednoduchých krokoch",
    howItWorksSubDesc: "Z prázdnej stránky k dokonalému oznámeniu za pár minút.",

    // Landing page — Designs subheading
    designsSubDesc: "20 jedinečných vzorov — od tmavých a dramatických po svetlé a botanické. Každý štýl si prispôsobíte.",

    // Landing page — Lifestyle banner
    lifestyleLabel: "Váš výnimočný deň",
    lifestyleHeading: "Zdieľajte váš príbeh lásky\nso svetom",

    // Landing page — Pricing
    pricingLabel: "Ceny",
    pricingHeading: "Jednoduché a úprimné",
    pricingOneTime: "Jednorazová platba",
    pricingPerInvite: "za oznámenie · žiadne predplatné",
    pricingMostPopular: "Najpopulárnejší",
    pricingCta: "Začať",
    pricingTier1Tier: "Basic",
    pricingTier1Name: "Digitálne",
    pricingTier1Feature1: "1 vzor",
    pricingTier1Feature2: "Neobmedzené odosielanie",
    pricingTier1Feature3: "Základné sledovanie RSVP",
    pricingTier1Feature4: "Doručenie cez odkaz",
    pricingTier2Tier: "Standard",
    pricingTier2Name: "Prémiové",
    pricingTier2Feature1: "3 vzory na výber",
    pricingTier2Feature2: "Neobmedzené odosielanie",
    pricingTier2Feature3: "RSVP sledovanie + pripomienky",
    pricingTier2Feature4: "Animovaná obálka",
    pricingTier2Feature5: "QR kód",
    pricingTier3Tier: "Pro",
    pricingTier3Name: "Luxusné",
    pricingTier3Feature1: "Všetky vzory",
    pricingTier3Feature2: "Neobmedzené odosielanie",
    pricingTier3Feature3: "Plný RSVP prehľad",
    pricingTier3Feature4: "Vlastný doménový odkaz",
    pricingTier3Feature5: "WhatsApp / SMS doručenie",
    pricingTier3Feature6: "Prioritná podpora",

    // Trust strip
    trustOneTime: "Od €29",
    trustInstant: "Okamžitý odkaz",
    trustSecure: "Bezpečná platba",

    // Form placeholders
    egPartner1: "napr. Zuzana",
    egPartner2: "napr. Martin",
    egDate: "napr. 14. septembra 2025",
    egTime: "napr. 16:00",
    egVenue: "napr. Kaštieľ Betliar",
    egLocation: "napr. Bratislava, Slovensko",
    egMessage: "napr. S radosťou vás pozývame, aby ste s nami oslávili…",
    egEmail: "napr. zuzana@example.com",
    invitationLanguage: "Jazyk oznámenia",
    languageGuestsSee: "Jazyk, ktorý uvidia vaši hostia",
  },
};

export type Translations = typeof translations[Lang];
