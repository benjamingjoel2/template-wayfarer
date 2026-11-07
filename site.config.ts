/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WAYFARER — site configuration
 *
 *  This is the only file you need to edit to launch a new brand.
 *  Every name, colour, font, photo, journey and contact detail on the site
 *  comes from here. Replace each placeholder, run `npm run build`, deploy.
 *
 *  Photos: every `src` can be a full URL or a path under /public
 *  (e.g. "/photos/hero.jpg"). The defaults are neutral placeholder photos
 *  from picsum.photos; swap them all before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* Helpers ------------------------------------------------------------------ */

export type Photo = {
  /** Full URL or /public path. */
  src: string;
  /** Describe the photo for screen readers. */
  alt: string;
  /** Colour shown while the photo loads. Pick the photo's dominant tone. */
  tone?: string;
};

/** Neutral placeholder photo. Replace with your own: { src: "/photos/x.jpg", alt: "…" } */
const ph = (id: number, alt: string, w = 1600, h = 1200, tone = "#5b6152"): Photo => ({
  src: `https://picsum.photos/id/${id}/${w}/${h}`,
  alt,
  tone,
});

/* Brand -------------------------------------------------------------------- */

const BRAND = "Brand Name";
const DESTINATION = "Destination";
const TAGLINE = `${DESTINATION}, at its own pace.`;
const EMAIL = "hello@example.com";

export type Day = {
  title: string;
  place: string;
  photo: Photo;
  morning: string;
  afternoon: string;
  evening: string;
};

export type Journey = {
  slug: string;
  title: string;
  days: number;
  price: string;
  summary: string;
  /** Month numbers, 1 = January. */
  bestMonths: number[];
  photo: Photo;
  /** The featured journey's itinerary is shown on the home page. */
  featured?: boolean;
  itineraryTitle?: string;
  itineraryLead?: string;
  itinerary?: Day[];
};

export const site = {
  brand: {
    /** Shown in the header wordmark, hero headline, footer, meta tags. */
    name: BRAND,
    /** Optional second line beside the wordmark (e.g. the name in a local script). Leave "" to hide. */
    nativeName: "",
    /** Optional logo image (SVG or PNG under /public). Leave "" to use the text wordmark. */
    logo: "",
    tagline: TAGLINE,
    /** One-line description used for search engines and link previews. */
    description: `Private, slow journeys in ${DESTINATION}, planned around the seasons and away from the crowds.`,
    /** Single character in the middle of the seal (Stay section) and the favicon. */
    monogram: BRAND.charAt(0),
    /**
     * The giant hero headline. By default the brand name is split into two halves,
     * one hugging each edge. Override with two strings, e.g. ["Way", "farer"].
     */
    heroWords: [] as string[],
  },

  /* Site ------------------------------------------------------------------- */

  site: {
    /** Production URL, no trailing slash. Used for canonical and Open Graph tags. */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
    /** BCP 47 language tag of the copy, e.g. "en-GB". */
    lang: "en-GB",
    /** Open Graph locale, e.g. "en_GB". */
    ogLocale: "en_GB",
    /** Photo used when the site is shared on social media. */
    shareImage: ph(29, "Placeholder share image", 1200, 630),
  },

  /* Destination ------------------------------------------------------------ */

  destination: {
    name: DESTINATION,
    /** Shown in the About facts list. */
    country: DESTINATION,
    /** IANA time zone for the live clock, e.g. "Europe/Lisbon", "America/Mexico_City". */
    timeZone: "Europe/London",
    /** Label for the live clock, e.g. "Lisbon time". */
    clockLabel: "Local time",
    /** City used for "Sunrise in …". Latitude/longitude in decimal degrees. */
    sunrise: { city: "Capital City", lat: 51.5072, lng: -0.1276 },
    /** One short line per month, January first. Shown as "This month" in the About facts. */
    months: [
      "Crisp, clear and quiet",
      "Late winter light",
      "First blossom in the south",
      "Spring in full bloom",
      "Long, mild days",
      "Early summer greens",
      "High summer, head for the hills",
      "Warm evenings outdoors",
      "Harvest and soft light",
      "Autumn colour begins",
      "Peak colour, cool mornings",
      "Winter quiet returns",
    ],
  },

  /* Colours ---------------------------------------------------------------- */
  /* Hex values. The defaults reproduce the original palette. */

  colors: {
    /** Page background. */
    paper: "#f4efe4",
    /** Slightly deeper background, for subtle panels. */
    paperDeep: "#ebe4d4",
    /** Main text and dark buttons. */
    ink: "#1e1d1a",
    /** Secondary text. */
    inkSoft: "#3b3934",
    /** Brand colour: labels, captions, headings in the Values/Manners sections. */
    accent: "#5f6b4d",
    /** Lighter brand colour: dividers, Manners list. */
    accentLight: "#76815f",
    /** Palest brand colour. */
    accentPale: "#a9b294",
    /** Highlight: nav dots, the seal, focus rings, errors. */
    highlight: "#b4472e",
    /** Third colour in the "Included in every journey" colour cycle. */
    tertiary: "#a0782f",
    /** Dark backgrounds: hero, A Night section, footer. */
    night: "#1b2220",
  },

  /* Fonts ------------------------------------------------------------------ */
  /*
   * `family` is the CSS font-family name. `google` is the Google Fonts css2
   * spec (the part after `family=`); set it to "" if you self-host the font.
   */

  fonts: {
    display: {
      family: "Instrument Serif",
      google: "Instrument+Serif:ital@0;1",
      fallback: '"Iowan Old Style", Georgia, serif',
    },
    sans: {
      family: "Geist",
      google: "Geist:wght@300..700",
      fallback: "ui-sans-serif, system-ui, sans-serif",
    },
    /** Used for the optional native-script labels (nativeName, value words, stage labels). */
    native: {
      family: "",
      google: "",
      fallback: "Georgia, serif",
    },
  },

  /* Contact ---------------------------------------------------------------- */

  contact: {
    email: EMAIL,
    phone: "+00 0000 000000",
    address: ["Street address", "City, Postcode", "Country"],
    /** Optional: POST every plan-form enquiry as JSON to this URL (e.g. a Zapier/Make webhook). */
    enquiryWebhook: process.env.ENQUIRY_WEBHOOK_URL ?? "",
  },

  /* Navigation ------------------------------------------------------------- */

  nav: {
    cta: { label: "Plan with us", href: "/plan" },
    /** Prompt above the CTA in the mobile menu. */
    menuPrompt: "Tell us when you’d like to go. We’ll do the rest.",
    menuPhoto: ph(11, "Placeholder landscape", 900, 1200),
  },

  footer: {
    columns: [
      {
        title: "Travel",
        links: [
          { label: "Journeys", href: "/journeys" },
          { label: "Stays", href: "/#stay" },
          { label: "FAQ", href: "/#faq" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Values", href: "/#values" },
          { label: "A Night", href: "/#a-night" },
          { label: "Etiquette", href: "/#manners" },
        ],
      },
      {
        title: BRAND,
        links: [
          { label: "About", href: "/#about" },
          { label: "Plan with us", href: "/plan" },
          { label: "Contact", href: `mailto:${EMAIL}` },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Booking Terms", href: "/legal/booking-terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },

  /* Home page -------------------------------------------------------------- */

  hero: {
    photo: ph(29, "Placeholder: a wide mountain valley in soft light", 2400, 1600, "#4f5b3c"),
    /** Two small groups of words above the headline, left and right. */
    tags: [
      ["Private journeys", "Seasonal"],
      ["Slow", DESTINATION],
    ],
  },

  about: {
    /** Section menu label. Defaults to the brand name. */
    navLabel: BRAND,
    title: `${DESTINATION}, at its own pace`,
    lead: `${BRAND} plans journeys that move at the speed of the place: quiet, unhurried, and full of small moments.`,
    photo: ph(17, "Placeholder: a footpath leading into trees", 2000, 1400),
    photoCaption: `We are a small team based in ${DESTINATION}. We plan private, slow journeys around the seasons and away from the crowds, with guides, hosts and kitchens we know by name.`,
  },

  values: {
    title: "Values",
    photo: ph(227, "Placeholder: a misty forest", 2000, 1400, "#9aa39a"),
    items: [
      {
        native: "",
        title: "Season",
        body: "Everything has its moment. We plan your days around what is ready now: what is in bloom, in the river, on the table.",
      },
      {
        native: "",
        title: "Space",
        body: "The pause between notes is part of the music. We leave room in every day, so there is time to sit, look, and let a place arrive.",
      },
      {
        native: "",
        title: "Welcome",
        body: "Hospitality that notices before you ask. A warmer blanket, a later breakfast, an umbrella by the door when the sky turns.",
      },
    ],
  },

  stay: {
    navLabel: "Stay",
    title: "Where you’ll sleep",
    lead: "Country inns, old townhouses, farm stays and mountain lodges. Each one chosen for its people as much as its rooms.",
    body: "An inn where the owner pours your first drink. A farmhouse where breakfast comes from the garden. A townhouse with your own key and a deep bath. We choose fewer places and stay longer, so the room becomes yours.",
    photos: {
      small: ph(164, "Placeholder: old townhouses along a canal", 1200, 800, "#2b1d16"),
      large: ph(311, "Placeholder: a quiet room with a view", 1200, 1500, "#e7dfcd"),
    },
    includedTitle: ["Included in", "every", "journey"],
    included: [
      {
        title: "Private guides",
        body: "Local guides who know which gate opens first and which bench catches the morning light. They walk at your pace, and step back when a place needs no explaining.",
        photo: ph(216, "Placeholder: a woodland path", 1400, 1000, "#4f5b3c"),
      },
      {
        title: "Seasonal dining",
        body: "Seats at small kitchens, booked weeks ahead. The menu follows the season, so what you eat in May will not be on the table in June.",
        photo: ph(292, "Placeholder: fresh produce on a table", 1400, 1000, "#e7dfcd"),
      },
      {
        title: "Culture & craft",
        body: "A morning with a potter, an afternoon with a weaver, an evening with a musician. Small groups of one: you and the maker.",
        photo: ph(304, "Placeholder: hands at work", 1400, 1000, "#6f6a60"),
      },
      {
        title: "Time to unwind",
        body: "At least one night somewhere made for doing nothing: a hot spring, a lake, a garden. Cold air on your face, nowhere else to be.",
        photo: ph(306, "Placeholder: a water lily", 1400, 1000, "#3c3a4a"),
      },
      {
        title: "Luggage forwarding",
        body: "Your cases travel ahead and wait for you at the next stay. You ride the train with a small bag and both hands free.",
        photo: ph(155, "Placeholder: a railway line along the coast", 1400, 1000, "#9aa39a"),
      },
      {
        title: "Your specialist on call",
        body: "The person who planned your trip stays with it while you travel. A missed train or a sudden fever, and one message reaches someone who knows your plans.",
        photo: ph(1, "Placeholder: someone at work on a laptop", 1400, 1000, "#2b1d16"),
      },
    ],
    stays: [
      {
        slug: "stay-one",
        name: "Stay One",
        type: "country inn",
        summary: "A small inn of eight rooms on a quiet lane, a short walk from the old town at dawn.",
        facts: { Bath: "private", Sleeping: "double", Size: "38 m²", Guests: "2" },
        photos: [ph(142, "Placeholder: a country house at the end of a drive"), ph(102, "Placeholder: a plate of fruit", 1200, 1600, "#6b2a1c")],
      },
      {
        slug: "stay-two",
        name: "Stay Two",
        type: "townhouse",
        summary: "A restored townhouse with its own courtyard, rented whole, in the heart of the old quarter.",
        facts: { Bath: "deep tub", Sleeping: "two doubles", Size: "90 m²", Guests: "4" },
        photos: [ph(164, "Placeholder: townhouses on a canal"), ph(312, "Placeholder: a jar of honey", 1200, 1600, "#2b1d16")],
      },
      {
        slug: "stay-three",
        name: "Stay Three",
        type: "garden lodge",
        summary: "Six rooms around a walled garden, with breakfast from the kitchen beds.",
        facts: { Bath: "shared", Sleeping: "double", Size: "30 m²", Guests: "2" },
        photos: [ph(206, "Placeholder: sunlight over a farmhouse"), ph(326, "Placeholder: a bowl of tea", 1200, 1600, "#9aa39a")],
      },
      {
        slug: "stay-four",
        name: "Stay Four",
        type: "mountain lodge",
        summary: "A timber lodge above the tree line, with wood stoves and long views of the valley.",
        facts: { Bath: "hot tub", Sleeping: "king", Size: "45 m²", Guests: "2" },
        photos: [ph(29, "Placeholder: a mountain valley"), ph(260, "Placeholder: pines in snow", 1200, 1600, "#c9d1d4")],
      },
      {
        slug: "stay-five",
        name: "Stay Five",
        type: "lakeside retreat",
        summary: "A handful of cabins on a still lake, rowing boat included.",
        facts: { Bath: "private", Sleeping: "double", Size: "35 m²", Guests: "2" },
        photos: [ph(128, "Placeholder: a lake at the foot of hills"), ph(124, "Placeholder: a boat on turquoise water", 1200, 1600, "#2f5560")],
      },
      {
        slug: "stay-six",
        name: "Stay Six",
        type: "coastal house",
        summary: "A whitewashed house above a small bay, with a terrace made for long dinners.",
        facts: { Bath: "rain shower", Sleeping: "two doubles", Size: "80 m²", Guests: "4" },
        photos: [ph(323, "Placeholder: cliffs above the sea"), ph(215, "Placeholder: an empty beach", 1200, 1600, "#e7dfcd")],
      },
    ],
  },

  journeysIntro: {
    navLabel: "Journeys",
    title: "Journeys",
    /** Shown over the zooming photo. */
    caption: "Journeys to start from, each rewritten around your dates, your pace and the season you’ll arrive in.",
    photo: ph(191, "Placeholder: a road winding through mountains", 2400, 1600, "#1f2c22"),
    principles: [
      { title: "A few places, properly", body: `We don’t do ${DESTINATION} in ten cities. Three nights in one place is when the neighbourhood starts nodding back.` },
      { title: "Built around the season", body: "We plan from the calendar outward: what is in bloom, in the river, on the table. The route follows." },
      { title: "Private, never rushed", body: "Your own guide, your own pace. Long lunches are allowed. So is an afternoon with nothing in it." },
      { title: "Planned by people who live there", body: "Our specialists know the hosts by name and the timetables by heart. They are a message away throughout." },
    ],
    principlesPhoto: ph(335, "Placeholder: a trail through green hills", 1200, 1500, "#6b2a1c"),
    /** Journeys page header. */
    pageTitle: "Ways to begin",
    pageLead: "Each one is a starting point, not a package. We rewrite it around your dates, your pace and the season you arrive in.",
  },

  /**
   * Journeys. Shown on /journeys and in the plan form. The journey with
   * `featured: true` has its day-by-day itinerary on the home page.
   * `bestMonths` are month numbers, 1 = January.
   */
  journeys: [
    {
      slug: "journey-one",
      title: "Journey One",
      days: 7,
      price: "Price on request",
      summary: "Two old towns, one pace: early, quiet, and never rushed.",
      bestMonths: [3, 4, 5, 9, 10, 11],
      photo: ph(17, "Placeholder: a path through the trees", 1200, 1500),
      featured: true,
      itineraryTitle: `Seven days in ${DESTINATION}`,
      itineraryLead: "The old town at 7am belongs to the bakers and the gardeners. This is a week spent mostly in those hours, with long afternoons and very good dinners.",
      itinerary: [
        { title: "Arrive light", place: "First town", photo: ph(10, "Placeholder: a coastline seen through trees", 1200, 1700),
          morning: "Your bags go ahead from the airport. You take the train with nothing heavier than a coat.",
          afternoon: "A slow first walk through the old quarter, and coffee in a courtyard.",
          evening: "A long dinner at a family-run restaurant, the season arranged on each plate." },
        { title: "Before the gates", place: "First town, old quarter", photo: ph(15, "Placeholder: a waterfall over rocks", 1200, 1700),
          morning: "Early at the old monastery, before the gates open to tour groups.",
          afternoon: "The back lanes, and a workshop where a maker shows you how it is done.",
          evening: "Eight seats at a counter. The chef cooks an arm’s length away." },
        { title: "Into the hills", place: "The valley", photo: ph(28, "Placeholder: a green gorge", 1200, 1700),
          morning: "A walk through terraced fields while the mist is still lifting.",
          afternoon: "Lunch at a farmhouse, then an unhurried return along the river.",
          evening: "A long soak, then supper by the fire." },
        { title: "A house of your own", place: "Second town", photo: ph(49, "Placeholder: white houses above the sea", 1200, 1700),
          morning: "Move into your townhouse: a courtyard, a deep bath, a key on a cord.",
          afternoon: "An afternoon with a weaver, and the market as it closes.",
          evening: "A neighbourhood bar three doors down. The menu is on a blackboard." },
        { title: "The quiet side", place: "The coast", photo: ph(71, "Placeholder: a jetty at dusk", 1200, 1700),
          morning: "The coastal path while it is still empty, and breakfast at the top.",
          afternoon: "A village the crowds rarely reach, and a swim if the water is kind.",
          evening: "Fish grilled on the harbour, and the lights coming on across the bay." },
        { title: "Market morning", place: "Second town", photo: ph(62, "Placeholder: hills at golden hour", 1200, 1700),
          morning: "The market at opening time, with a cook who knows every stall.",
          afternoon: "A garden that borrows the hills beyond its wall as scenery.",
          evening: "A last dinner, and a walk home through quiet streets." },
        { title: "Slow goodbye", place: "Homeward", photo: ph(77, "Placeholder: a pier into calm water", 1200, 1700),
          morning: "One more early walk, before the town wakes.",
          afternoon: "A long lunch, then the car to the airport.",
          evening: "Something good in your bag, and the smell of the place on your coat." },
      ],
    },
    {
      slug: "journey-two",
      title: "Journey Two",
      days: 10,
      price: "Price on request",
      summary: "Old roads walked on foot, with your bags sent ahead.",
      bestMonths: [4, 5, 9, 10],
      photo: ph(335, "Placeholder: a trail through green hills", 1200, 1500),
    },
    {
      slug: "journey-three",
      title: "Journey Three",
      days: 9,
      price: "Price on request",
      summary: "Slow ferries, still water, and places you have to travel for.",
      bestMonths: [5, 6, 7, 8, 9],
      photo: ph(323, "Placeholder: cliffs above the sea", 1200, 1500),
    },
    {
      slug: "journey-four",
      title: "Journey Four",
      days: 12,
      price: "Price on request",
      summary: "First time, done well: four places, properly.",
      bestMonths: [3, 4, 5, 10, 11],
      photo: ph(287, "Placeholder: green mountain ridges", 1200, 1500),
    },
    {
      slug: "journey-five",
      title: "Journey Five",
      days: 8,
      price: "Price on request",
      summary: "Snow, hot water, and the silence in between.",
      bestMonths: [1, 2, 3, 12],
      photo: ph(260, "Placeholder: pines in snow", 1200, 1500),
    },
    {
      slug: "journey-six",
      title: "Journey Six",
      days: 11,
      price: "Price on request",
      summary: "Clay, cloth, wood and bread: the hands behind the things.",
      bestMonths: [4, 5, 6, 9, 10],
      photo: ph(304, "Placeholder: hands at work", 1200, 1500),
    },
  ] as Journey[],

  /** The full-screen stacked story: one memorable night, told in stages. */
  night: {
    navLabel: "A Night",
    title: "A Night to Remember",
    intro: "Some nights are more than a bed. They have a shape to them, from the first drink on arrival to the last cup of coffee at breakfast.",
    cta: "Every journey includes at least one night like this.",
    photo: ph(185, "Placeholder: dunes at dusk", 2400, 1600, "#2b1d16"),
    stages: [
      { native: "", title: "Arrival", photo: ph(125, "Placeholder: a quiet shore at evening", 2400, 1600, "#e7dfcd"),
        body: "Bags are taken at the door and are in your room when you look for them. A drink and something small wait on a low table. Then the shutters open, and the view is part of the room." },
      { native: "", title: "The bath", photo: ph(222, "Placeholder: clouds over hills", 2400, 1600, "#3c3a4a"),
        body: "Before dinner, a long soak. The light goes blue, the steam thickens, and somewhere a bird settles in a tree. Ten minutes is enough to forget the journey." },
      { native: "", title: "Dinner", photo: ph(195, "Placeholder: a lantern-lit lane", 2400, 1600, "#6b2a1c"),
        body: "Dinner arrives in small courses, each one a piece of the season. Take your time. The kitchen does." },
      { native: "", title: "Sleep", photo: ph(186, "Placeholder: a pale winter wood", 2400, 1600, "#141a1d"),
        body: "While you ate, the room changed. The bed is turned down, a lamp is low, and the windows are open just enough." },
      { native: "", title: "Morning", photo: ph(213, "Placeholder: a pastel sunrise over water", 2400, 1600, "#9aa39a"),
        body: "Mist sits in the valley. Breakfast is slow and local. Afterwards, one more look at the view before the car comes." },
    ],
  },

  manners: {
    navLabel: "Manners",
    title: "Manners, gently",
    lead: "Nobody expects you to get everything right, and a little care goes a very long way.",
    items: [
      { title: "Greet first", body: "A hello in the local language opens more doors than any guidebook." },
      { title: "Dress for the place", body: "Cover shoulders and knees for churches, temples and village visits; a light scarf solves most of it." },
      { title: "Quiet carriages", body: "On trains, people talk softly and take calls later, so the ride feels calm for everyone." },
      { title: "Tipping, lightly", body: "Customs vary. We tell you what is expected where, so you never have to guess." },
      { title: "Carry it home", body: "Bins can be rare, so a small bag in your pocket for wrappers saves a lot of looking." },
      { title: "Ask first", body: "Before photographing people, a smile and a gesture to the camera is a kind thing to do." },
    ],
  },

  faq: {
    navLabel: "FAQ",
    title: "FAQ",
    items: [
      {
        q: "How do we get around?",
        a: [
          "Mostly by train and private car. We book reserved seats for the longer journeys so you never stand with luggage.",
          "Your suitcases can travel separately by courier, collected one morning and delivered to your next stay, so you ride with a small bag.",
        ],
        photos: [ph(197, "Placeholder: railway tracks into the distance", 1000, 1250), ph(155, "Placeholder: a coastal railway", 900, 1200)],
      },
      {
        q: "When is the best time to go?",
        a: ["Every season has its reasons. Spring and autumn are lovely and busy; our quieter favourites are the weeks either side. Tell us what you love and we will suggest the month."],
        photos: [ph(62, "Placeholder: hills at golden hour", 1000, 1250), ph(167, "Placeholder: autumn leaves", 900, 1200)],
      },
      {
        q: "Won’t it be crowded?",
        a: ["Some places will be, at some hours. So we go early, go late, or go next door. It makes more difference than you would think."],
        photos: [ph(216, "Placeholder: an empty woodland path", 1000, 1250), ph(241, "Placeholder: a path over a hill", 900, 1200)],
      },
      {
        q: "What if we have dietary needs?",
        a: ["Tell us when you enquire. We brief every kitchen in advance and choose places that cook with care, not as an afterthought."],
        photos: [ph(292, "Placeholder: fresh produce", 1000, 1250), ph(326, "Placeholder: a bowl of tea", 900, 1200)],
      },
      {
        q: "Can we travel with children?",
        a: ["Yes. We slow the pace further, choose stays with family rooms, and swap a museum or two for a forest walk or an afternoon by the water."],
        photos: [ph(17, "Placeholder: a path into trees", 1000, 1250), ph(128, "Placeholder: a lake", 900, 1200)],
      },
      {
        q: "How do deposits and cancellations work?",
        a: ["A deposit secures your journey once you are happy with the plan, with the balance due before travel. Full terms are in our booking conditions, and we recommend travel insurance from the day you book."],
        photos: [ph(311, "Placeholder: a quiet room", 1000, 1250), ph(1, "Placeholder: someone at a laptop", 900, 1200)],
      },
    ],
  },

  /* Plan page (enquiry form with the month picker) ------------------------ */

  plan: {
    title: "Tell us a little",
    lead: "When you’d like to go, what you love, how you like to travel. We’ll write back with a first sketch, then plan it together.",
    /** Prices are written in the first currency; the others convert at these rates. */
    currencies: [
      { code: "GBP", rate: 1 },
      { code: "USD", rate: 1.27 },
      { code: "EUR", rate: 1.17 },
      { code: "AUD", rate: 1.95 },
    ],
    ratesDate: "2026-10-01",
    /** Budget bands per person in the first currency. `max: null` means "and above". */
    budgets: [
      { value: "under-5k", min: null as number | null, max: 5000 as number | null },
      { value: "5k-8k", min: 5000, max: 8000 },
      { value: "8k-12k", min: 8000, max: 12000 },
      { value: "12k-plus", min: 12000, max: null },
    ],
    defaultDays: 10,
    firstVisitQuestion: `Is this your first time in ${DESTINATION}?`,
    interests: ["food", "craft", "nature", "walking", "art", "wellbeing", "gardens", "history"],
    paces: [
      { value: "gentle", hint: "One thing a day, long lunches" },
      { value: "balanced", hint: "A morning and an afternoon, free evenings" },
      { value: "fuller", hint: "Early starts, more to see" },
    ],
    stayStyles: [
      { value: "traditional", label: "Mostly traditional inns" },
      { value: "design", label: "Mostly design hotels" },
      { value: "mix", label: "A mix of both" },
    ],
    thanks: "Thank you. We’ll write soon.",
    thanksBody: "A specialist will read your note properly and reply within two working days, usually sooner.",
  },

  /* Legal pages (placeholder copy: replace with your own) ----------------- */

  legal: {
    privacy: {
      title: "Privacy Policy",
      body: [
        `${BRAND} uses the details you send through the plan form only to reply to you and plan your trip.`,
        "Replace this text with your own privacy policy before launch.",
      ],
    },
    "booking-terms": {
      title: "Booking Terms",
      body: ["Replace this text with your booking terms and conditions before launch."],
    },
    cookies: {
      title: "Cookie Policy",
      body: ["This template sets no tracking cookies. If you add analytics, describe them here."],
    },
  } as Record<string, { title: string; body: string[] }>,
};

export type SiteConfig = typeof site;
export default site;
