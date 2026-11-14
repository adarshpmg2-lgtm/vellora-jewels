// Catalogue and navigation data shared by every page.
// sec: which section pages list the product. tags: sub-category keys used by page sub-navs.
// sizes: product needs a size picked; engrave: complimentary engraving offered.
const RING = [48, 50, 52, 54, 56, 58];
const WRIST = ["S", "M", "L"];

const products = [
  // ---- Rings ----
  { id: 1, name: "Aurea Solitaire Ring", desc: "18k white gold, 1.2ct diamond", price: 485000, cat: "rings", img: "ring-solitaire.jpg", tag: "Bridal", material: "White Gold", stone: "Diamond", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["engagement"], who: "her", sizes: RING, engrave: true,
    long: "A brilliant-cut diamond held aloft by a sculpted cathedral setting and a pavé shoulder — the quintessential VELLORA engagement ring." },
  { id: 13, name: "Aurea Classic Solitaire", desc: "18k yellow gold, 0.9ct emerald-cut diamond", price: 395000, cat: "rings", img: "ring-yellow.jpg", material: "Yellow Gold", stone: "Diamond", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["engagement"], who: "her", sizes: RING, engrave: true,
    long: "An emerald-cut diamond in a four-claw setting on a fine pavé band — clean Roman lines, made to be worn every day." },
  { id: 2, name: "Rosa Antica Ring", desc: "Rose gold, pink tourmaline, pavé", price: 312000, cat: "rings", img: "ring-pink.jpg", tag: "New", material: "Rose Gold", stone: "Pink Tourmaline", collection: "Serena", isNew: true, sec: ["jewellery", "bridal", "gifts"], tags: ["engagement"], who: "her", sizes: RING, engrave: true,
    long: "An emerald-cut pink tourmaline framed by a halo of diamonds, on a slender rose gold band inspired by Roman frescoes." },
  { id: 3, name: "Fiore di Roma Ring", desc: "Amethyst, citrine, diamonds", price: 695000, cat: "rings", img: "ring-flower.jpg", tag: "High Jewellery", material: "White Gold", stone: "Amethyst", collection: "Fiore di Roma", sec: ["high", "jewellery"], who: "her", sizes: [50, 52, 54, 56],
    long: "Six pear-shaped petals of amethyst and citrine bloom around a diamond heart — a cocktail ring of joyful colour." },
  { id: 15, name: "Smeraldo Ring", desc: "18k gold, Colombian emerald, diamonds", price: 545000, cat: "rings", img: "ring-emerald.jpg", tag: "High Jewellery", material: "Yellow Gold", stone: "Emerald", collection: "Giardino Segreto", sec: ["high", "jewellery"], who: "her", sizes: [50, 52, 54],
    long: "A vivid Colombian emerald cradled by tapered baguette diamonds, from the Giardino Segreto high jewellery collection." },
  { id: 14, name: "Trinità Stacking Rings", desc: "18k yellow gold, diamond pavé, set of three", price: 245000, cat: "rings", img: "ring-stack.jpg", material: "Yellow Gold", stone: "Diamond", collection: "Catene", sec: ["jewellery", "bridal", "gifts"], tags: ["eternity"], who: "her", sizes: RING,
    long: "Three textured bands of gold and pavé diamonds, designed to be stacked together or worn apart." },
  { id: 16, name: "Bouquet Cluster Ring", desc: "Rose gold, champagne diamonds", price: 215000, cat: "rings", img: "ring-cluster.jpg", material: "Rose Gold", stone: "Diamond", collection: "Fiore di Roma", sec: ["jewellery", "gifts"], who: "her", sizes: RING,
    long: "A bouquet of champagne diamonds gathered on a rose gold band — vintage romance with a modern finish." },
  { id: 17, name: "Polychroma Cocktail Set", desc: "Gold, turquoise, carnelian, set of three", price: 168000, cat: "rings", img: "rings-gem.jpg", tag: "New", material: "Yellow Gold", stone: "Coloured Stones", collection: "Polychroma", isNew: true, sec: ["jewellery", "gifts"], who: "her", sizes: [50, 52, 54, 56],
    long: "Cabochons of turquoise, carnelian and onyx set in polished gold — colour as the Romans loved it." },
  { id: 21, name: "Piccoli Stacking Set", desc: "18k gold, five fine rings", price: 76000, cat: "rings", img: "rings-dish.jpg", material: "Yellow Gold", stone: "None", collection: "Catene", sec: ["jewellery", "gifts"], who: "her", sizes: RING,
    long: "Five whisper-fine rings in polished and twisted gold, presented in a ceramic dish." },
  { id: 18, name: "Promessa Wedding Band", desc: "18k yellow gold, 4mm comfort fit", price: 98000, cat: "rings", img: "wedding-bands.jpg", material: "Yellow Gold", stone: "None", collection: "Promessa", sec: ["bridal", "gifts"], tags: ["bands", "mens"], who: "couple", sizes: RING, engrave: true,
    long: "A softly domed band in 18k yellow gold with a comfort-fit interior. Available for her and for him." },
  { id: 19, name: "Duetto Two-Tone Bands", desc: "White & rose gold, pair", price: 176000, cat: "rings", img: "wedding-two-tone.jpg", material: "White Gold", stone: "None", collection: "Promessa", sec: ["bridal", "gifts"], tags: ["bands"], who: "couple", sizes: RING, engrave: true,
    long: "A matching pair of bands joining white and rose gold — two metals, one promise." },
  { id: 20, name: "Eternità Ring Trio", desc: "Rose gold, diamond eternity rings", price: 132000, cat: "rings", img: "rings-tray.jpg", material: "Rose Gold", stone: "Diamond", collection: "Promessa", sec: ["bridal", "jewellery"], tags: ["eternity", "bands"], who: "her", sizes: RING,
    long: "Three eternity rings of rose gold and diamonds, made to accompany an engagement ring." },
  { id: 52, name: "Amore Ring Duo", desc: "Rose gold, in signature gift box", price: 88000, cat: "rings", img: "gift-box-rings.jpg", tag: "Gift", material: "Rose Gold", stone: "None", collection: "Serena", sec: ["jewellery", "gifts"], who: "her", sizes: RING, engrave: true,
    long: "Two interlocking rose gold rings presented in our signature box — a gift ready to give." },

  // ---- Necklaces ----
  { id: 22, name: "Regina Diamond Necklace", desc: "White gold, 38ct diamonds", price: 2450000, cat: "necklaces", img: "necklace-diamond.jpg", tag: "One of a kind", material: "White Gold", stone: "Diamond", collection: "Magnifica", sec: ["high"], who: "her",
    long: "A cascade of 212 diamonds — pear, marquise and brilliant — assembled by hand over 1,400 hours in our Roman atelier." },
  { id: 23, name: "Giardino Emerald Pendant", desc: "Yellow gold, 12ct octagonal emerald", price: 860000, cat: "necklaces", img: "pendant-emerald.jpg", tag: "High Jewellery", material: "Yellow Gold", stone: "Emerald", collection: "Giardino Segreto", sec: ["high"], who: "her",
    long: "An octagonal emerald of rare depth suspended from a fine gold chain — the heart of Giardino Segreto." },
  { id: 4, name: "Luna Layered Necklace", desc: "18k yellow gold, topaz pendant", price: 228000, cat: "necklaces", img: "necklace-layer.jpg", material: "Yellow Gold", stone: "Topaz", collection: "Luna", isNew: true, sec: ["jewellery", "gifts"], who: "her",
    long: "Two fine chains, a London blue topaz and a crescent moon set with diamonds, designed to be worn together or apart." },
  { id: 24, name: "Halo Cushion Pendant", desc: "White gold, 1.5ct cushion diamond", price: 365000, cat: "necklaces", img: "pendant-cushion.jpg", material: "White Gold", stone: "Diamond", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["bridal-jewellery"], who: "her",
    long: "A cushion-cut diamond in a double halo, on a box chain — the brightest piece on the wedding day." },
  { id: 25, name: "Stella Halo Pendant", desc: "White gold, diamond halo", price: 198000, cat: "necklaces", img: "pendant-halo.jpg", material: "White Gold", stone: "Diamond", collection: "Stella", sec: ["jewellery", "gifts"], who: "her" },
  { id: 5, name: "Cuore Pendant", desc: "18k white gold, diamond pavé", price: 176000, cat: "necklaces", img: "necklace-heart.jpg", material: "White Gold", stone: "Diamond", collection: "Serena", sec: ["jewellery", "gifts"], who: "her", engrave: true,
    long: "An open heart traced in pavé diamonds on a delicate white gold chain, adjustable at 40 and 45 cm." },
  { id: 26, name: "Moneta Coin Necklace", desc: "18k yellow gold, Roman coin motifs", price: 154000, cat: "necklaces", img: "necklace-coins.jpg", material: "Yellow Gold", stone: "None", collection: "Luna", sec: ["jewellery", "gifts"], who: "her",
    long: "Three layered chains carrying medallions inspired by ancient Roman coinage." },
  { id: 6, name: "Perla Classica Necklace", desc: "Akoya pearls, white gold clasp", price: 142000, cat: "necklaces", img: "pearls.jpg", tag: "Gift", material: "White Gold", stone: "Pearl", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["bridal-jewellery"], who: "her",
    long: "Hand-matched Akoya pearls with a lustrous finish, closed by a white gold clasp engraved with the Maison's mark." },
  { id: 28, name: "Riviera Layered Chains", desc: "18k yellow gold, three lengths", price: 136000, cat: "necklaces", img: "necklace-gold-model.jpg", material: "Yellow Gold", stone: "None", collection: "Catene", isNew: true, sec: ["jewellery", "gifts"], who: "her" },
  { id: 30, name: "Maglia Chain", desc: "18k white gold, bold links", price: 145000, cat: "necklaces", img: "chain-black.jpg", material: "White Gold", stone: "None", collection: "Catene", sec: ["jewellery", "gifts"], tags: ["mens"], who: "him",
    long: "Substantial white gold links with a hidden clasp — worn by him or by her." },
  { id: 31, name: "Sole Layered Necklace", desc: "Rose gold, two fine chains", price: 118000, cat: "necklaces", img: "necklace-model.jpg", material: "Rose Gold", stone: "None", collection: "Luna", sec: ["jewellery", "gifts"], who: "her" },
  { id: 29, name: "Goccia Pendant", desc: "18k yellow gold, diamond drop", price: 112000, cat: "necklaces", img: "necklace-model2.jpg", material: "Yellow Gold", stone: "Diamond", collection: "Serena", sec: ["jewellery", "gifts"], who: "her", engrave: true },
  { id: 11, name: "Catene Charm Set", desc: "Gold chains with charms", price: 96000, cat: "necklaces", img: "chains.jpg", material: "Yellow Gold", stone: "Diamond", collection: "Catene", sec: ["jewellery", "gifts"], who: "her" },
  { id: 27, name: "Barra Pendant", desc: "18k yellow gold, mother-of-pearl bar", price: 89000, cat: "necklaces", img: "necklace-bar.jpg", material: "Yellow Gold", stone: "Pearl", collection: "Catene", sec: ["jewellery", "gifts"], who: "her", engrave: true },

  // ---- Bracelets ----
  { id: 7, name: "Stella Tennis Bracelet", desc: "Platinum, 4.5ct diamonds", price: 925000, cat: "bracelets", img: "bracelet-diamond.jpg", tag: "Icon", material: "Platinum", stone: "Diamond", collection: "Stella", sec: ["high", "jewellery"], who: "her", sizes: WRIST, engrave: true,
    long: "A river of brilliant and oval diamonds in openwork platinum links — the Maison's most iconic bracelet." },
  { id: 32, name: "Classic Tennis Bracelet", desc: "White gold, 3ct round diamonds", price: 545000, cat: "bracelets", img: "tennis-bracelet.jpg", material: "White Gold", stone: "Diamond", collection: "Stella", sec: ["jewellery", "bridal"], tags: ["bridal-jewellery"], who: "her", sizes: WRIST },
  { id: 34, name: "Roma Bangle Stack", desc: "18k yellow gold, set of seven", price: 285000, cat: "bracelets", img: "bangles.jpg", material: "Yellow Gold", stone: "None", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["bridal-jewellery"], who: "her", sizes: WRIST,
    long: "Seven hand-chased bangles of differing textures — a celebration piece for weddings and festivals." },
  { id: 8, name: "Onda Bracelet", desc: "Rose gold, diamond waves", price: 268000, cat: "bracelets", img: "bracelet-rose.jpg", material: "Rose Gold", stone: "Diamond", collection: "Onda", isNew: true, sec: ["jewellery", "gifts"], who: "her", sizes: WRIST, engrave: true,
    long: "Undulating waves of rose gold and diamonds, echoing the fountains of Rome." },
  { id: 33, name: "Catena Chain Bracelet", desc: "18k yellow gold, chunky links", price: 128000, cat: "bracelets", img: "bracelet-chain.jpg", material: "Yellow Gold", stone: "None", collection: "Catene", sec: ["jewellery", "gifts"], tags: ["mens"], who: "him", sizes: WRIST, engrave: true },
  { id: 35, name: "Maglia Fine Bracelet", desc: "18k yellow gold, paperclip links", price: 92000, cat: "bracelets", img: "bracelet-wrist.jpg", material: "Yellow Gold", stone: "None", collection: "Catene", sec: ["jewellery", "gifts"], who: "her", sizes: WRIST, engrave: true },

  // ---- Earrings ----
  { id: 42, name: "Giardino Sapphire Earrings", desc: "Platinum, Ceylon sapphires, diamonds", price: 1650000, cat: "earrings", img: "high-jewelry.jpg", tag: "One of a kind", material: "Platinum", stone: "Sapphire", collection: "Giardino Segreto", sec: ["high"], who: "her",
    long: "Two cushion Ceylon sapphires of 8.4ct each, framed in diamonds and suspended from diamond tops." },
  { id: 43, name: "Rubino Imperiale Parure", desc: "Gold necklace & earrings, Burmese rubies", price: 1980000, cat: "necklaces", img: "hero.jpg", tag: "High Jewellery", material: "Yellow Gold", stone: "Ruby", collection: "Magnifica", sec: ["high"], who: "her",
    long: "A granulated gold collar and matching earrings set with pigeon-blood rubies — a tribute to Roman goldsmiths." },
  { id: 36, name: "Luce Diamond Studs", desc: "White gold, 1ct total halo studs", price: 225000, cat: "earrings", img: "earrings-studs.jpg", material: "White Gold", stone: "Diamond", collection: "Aurea Eterna", sec: ["jewellery", "bridal", "gifts"], tags: ["bridal-jewellery"], who: "her" },
  { id: 37, name: "Goccia Drop Earrings", desc: "Rose gold, morganite, diamonds", price: 186000, cat: "earrings", img: "earrings-drop.jpg", material: "Rose Gold", stone: "Morganite", collection: "Serena", sec: ["jewellery", "bridal", "gifts"], tags: ["bridal-jewellery"], who: "her" },
  { id: 9, name: "Serena Hoop Earrings", desc: "18k yellow gold, sculpted", price: 134000, cat: "earrings", img: "earrings-gold.jpg", tag: "New", material: "Yellow Gold", stone: "None", collection: "Serena", isNew: true, sec: ["jewellery", "gifts"], who: "her",
    long: "Bold sculpted hoops in polished yellow gold, light enough for every day." },
  { id: 10, name: "Torsade Earrings", desc: "18k yellow gold, twisted rope", price: 118000, cat: "earrings", img: "earrings-twist.jpg", material: "Yellow Gold", stone: "None", collection: "Catene", sec: ["jewellery", "gifts"], who: "her" },
  { id: 41, name: "Medaglione Earrings", desc: "18k yellow gold, medallion drops", price: 99000, cat: "earrings", img: "earrings-editorial.jpg", material: "Yellow Gold", stone: "None", collection: "Luna", sec: ["jewellery", "gifts"], who: "her" },
  { id: 38, name: "Conchiglia Hoops", desc: "18k yellow gold, shell texture", price: 78000, cat: "earrings", img: "earrings-pink.jpg", material: "Yellow Gold", stone: "None", collection: "Onda", sec: ["jewellery", "gifts"], who: "her" },
  { id: 40, name: "Scolpito Mini Hoops", desc: "18k yellow gold, huggies", price: 69000, cat: "earrings", img: "earrings-model.jpg", material: "Yellow Gold", stone: "None", collection: "Serena", sec: ["jewellery", "gifts"], who: "her" },
  { id: 39, name: "Cuore Blu Earrings", desc: "Gold, blue topaz hearts", price: 64000, cat: "earrings", img: "earrings-heart.jpg", material: "Yellow Gold", stone: "Topaz", collection: "Polychroma", sec: ["jewellery", "gifts"], who: "her" },

  // ---- Accessories ----
  { id: 12, name: "Piazza Top-Handle Bag", desc: "Calf leather, palladium hardware", price: 248000, cat: "accessories", img: "bag.jpg", material: "Leather", stone: "None", collection: "Piazza", isNew: true, sec: ["accessories", "gifts"], tags: ["bags"], who: "her",
    long: "Structured calf leather with a sculpted palladium clasp, handcrafted in our Florentine workshop." },
  { id: 45, name: "Laguna Top-Handle Bag", desc: "Teal calf leather, gold clasp", price: 232000, cat: "accessories", img: "bag-teal.jpg", material: "Leather", stone: "None", collection: "Piazza", sec: ["accessories", "gifts"], tags: ["bags"], who: "her" },
  { id: 46, name: "Notte Tote", desc: "Black grained leather, laptop pocket", price: 198000, cat: "accessories", img: "tote-black.jpg", material: "Leather", stone: "None", collection: "Viaggio", sec: ["accessories", "gifts"], tags: ["bags"], who: "her" },
  { id: 44, name: "Cesto Woven Bag", desc: "Woven leather, tan, top handle", price: 168000, cat: "accessories", img: "bag-woven.jpg", tag: "New", material: "Leather", stone: "None", collection: "Riviera", isNew: true, sec: ["accessories", "gifts"], tags: ["bags"], who: "her" },
  { id: 47, name: "Viaggio Briefcase", desc: "Vachetta leather, detachable strap", price: 215000, cat: "accessories", img: "briefcase.jpg", material: "Leather", stone: "None", collection: "Viaggio", sec: ["accessories", "gifts"], tags: ["bags", "mens"], who: "him" },
  { id: 48, name: "Portafoglio Wallet", desc: "Smooth calf leather, bi-fold", price: 42000, cat: "accessories", img: "wallet.jpg", material: "Leather", stone: "None", collection: "Viaggio", sec: ["accessories", "gifts"], tags: ["slg", "mens"], who: "him", engrave: true },
  { id: 49, name: "Diva Cat-Eye Sunglasses", desc: "Champagne metal, gradient lenses", price: 38000, cat: "accessories", img: "sunglasses-cat.jpg", material: "Metal", stone: "None", collection: "Riviera", sec: ["accessories", "gifts"], tags: ["eyewear"], who: "her" },
  { id: 50, name: "Pantheon Round Sunglasses", desc: "Gold metal, green lenses", price: 34000, cat: "accessories", img: "sunglasses-round.jpg", material: "Metal", stone: "None", collection: "Riviera", sec: ["accessories", "gifts"], tags: ["eyewear", "mens"], who: "him" },
  { id: 51, name: "Foulard Silk Scarf", desc: "Printed silk twill, 90 × 90 cm", price: 29000, cat: "accessories", img: "silk-scarf.jpg", material: "Silk", stone: "None", collection: "Riviera", sec: ["accessories", "gifts"], tags: ["silk"], who: "her" },
];

// Fallback long description for products without one
products.forEach(p => {
  p.long ||= `${p.desc}. Designed in Rome and finished by hand by the artisans of the ${p.collection} atelier.`;
  p.isNew ||= false;
});

const COLLECTIONS = {
  "Aurea Eterna": { img: "hero.jpg", text: "Roman gold, sculpted by hand into light." },
  "Serena": { img: "model.jpg", text: "Arches of ancient Rome, softened into feminine curves." },
  "Luna": { img: "necklace-layer.jpg", text: "Crescent moons and coins for layered, everyday magic." },
  "Stella": { img: "bracelet-diamond.jpg", text: "Rivers of diamonds that catch every star." },
  "Onda": { img: "bracelet-rose.jpg", text: "Waves of rose gold from the fountains of Rome." },
  "Catene": { img: "chains.jpg", text: "Bold chains and links — the Maison's modern talisman." },
  "Polychroma": { img: "rings-gem.jpg", text: "Joyful colour in turquoise, carnelian and topaz." },
  "Fiore di Roma": { img: "ring-flower.jpg", text: "Gem-set blooms from the gardens of the Villa Borghese." },
  "Giardino Segreto": { img: "high-jewelry.jpg", text: "Emeralds and sapphires from a secret Roman garden." },
  "Magnifica": { img: "necklace-diamond.jpg", text: "Our most extraordinary one-of-a-kind creations." },
  "Promessa": { img: "wedding-bands.jpg", text: "Wedding bands for a promise made forever." },
};

// Section pages. Each `subs` entry is a sub-category tab with a test function.
const isCat = c => p => p.cat === c;
const hasTag = t => p => (p.tags || []).includes(t);
const SECTIONS = {
  jewellery: {
    title: "Jewellery", file: "jewellery.html", hero: "necklace-model.jpg", eyebrow: "Fine Jewellery",
    intro: "Rings, necklaces, bracelets and earrings crafted in 18k gold and platinum — the colour, volume and audacity of Rome, to wear every day.",
    subs: [
      { slug: "rings", label: "Rings", test: isCat("rings") },
      { slug: "necklaces", label: "Necklaces & Pendants", test: isCat("necklaces") },
      { slug: "bracelets", label: "Bracelets", test: isCat("bracelets") },
      { slug: "earrings", label: "Earrings", test: isCat("earrings") },
      { slug: "mens", label: "Men's Jewellery", test: hasTag("mens") },
    ],
    facets: ["material", "stone", "collection"],
  },
  high: {
    title: "High Jewellery", file: "high-jewellery.html", hero: "high-jewelry.jpg", eyebrow: "Haute Joaillerie", dark: true,
    intro: "One-of-a-kind masterpieces set with the rarest gemstones in the world, each one born from more than a thousand hours of work in our Roman atelier.",
    subs: [
      { slug: "necklaces", label: "Necklaces", test: isCat("necklaces") },
      { slug: "earrings", label: "Earrings", test: isCat("earrings") },
      { slug: "rings", label: "Rings", test: isCat("rings") },
      { slug: "bracelets", label: "Bracelets", test: isCat("bracelets") },
    ],
    facets: ["stone", "collection", "material"],
  },
  bridal: {
    title: "Bridal", file: "bridal.html", hero: "wedding-bands.jpg", eyebrow: "Love & Promise",
    intro: "Engagement rings, wedding bands and bridal jewellery, with complimentary engraving and a private appointment to choose together.",
    subs: [
      { slug: "engagement", label: "Engagement Rings", test: hasTag("engagement") },
      { slug: "bands", label: "Wedding Bands", test: hasTag("bands") },
      { slug: "eternity", label: "Eternity Rings", test: hasTag("eternity") },
      { slug: "bridal-jewellery", label: "Bridal Jewellery", test: hasTag("bridal-jewellery") },
      { slug: "mens", label: "For Him", test: hasTag("mens") },
    ],
    facets: ["material", "stone", "collection"],
  },
  accessories: {
    title: "Accessories", file: "accessories.html", hero: "bag-teal.jpg", eyebrow: "Leather & Silk",
    intro: "Handbags, small leather goods, eyewear and silk, made in Italy by artisans who bring the same precision as our jewellers.",
    subs: [
      { slug: "bags", label: "Bags", test: hasTag("bags") },
      { slug: "slg", label: "Small Leather Goods", test: hasTag("slg") },
      { slug: "eyewear", label: "Eyewear", test: hasTag("eyewear") },
      { slug: "silk", label: "Silk", test: hasTag("silk") },
      { slug: "mens", label: "Men's", test: hasTag("mens") },
    ],
    facets: ["material", "collection"],
  },
  gifts: {
    title: "Gifts", file: "gifts.html", hero: "gift.jpg", eyebrow: "The Art of Gifting",
    intro: "Find the perfect present for every person and every occasion — each gift arrives in our signature box with a handwritten message.",
    subs: [
      { slug: "her", label: "For Her", test: p => p.who === "her" },
      { slug: "him", label: "For Him", test: p => p.who === "him" || hasTag("mens")(p) },
      { slug: "couple", label: "For Couples", test: p => p.who === "couple" },
      { slug: "under-1l", label: "Under ₹1,00,000", test: p => p.price < 100000 },
      { slug: "under-1-5l", label: "Under ₹1,50,000", test: p => p.price < 150000 },
      { slug: "under-3l", label: "Under ₹3,00,000", test: p => p.price < 300000 },
      { slug: "exceptional", label: "Exceptional Gifts", test: p => p.price >= 300000 },
    ],
    facets: ["material", "stone", "collection"],
  },
  maison: { title: "The Maison", file: "maison.html", hero: "colosseum.jpg", eyebrow: "Since 1924" },
};

// Mega menu: link `h` points to a page (with preset filters) or an anchor on it.
const menu = [
  {
    label: "High Jewellery", h: "high-jewellery.html",
    cols: [
      { title: "Collections", links: [
        { t: "Giardino Segreto", h: "high-jewellery.html?collection=Giardino Segreto" },
        { t: "Magnifica", h: "high-jewellery.html?collection=Magnifica" },
        { t: "Fiore di Roma", h: "high-jewellery.html?collection=Fiore di Roma" },
        { t: "Stella", h: "high-jewellery.html?collection=Stella" } ] },
      { title: "Creations", links: [
        { t: "Necklaces", h: "high-jewellery.html?sub=necklaces" }, { t: "Earrings", h: "high-jewellery.html?sub=earrings" },
        { t: "Rings", h: "high-jewellery.html?sub=rings" }, { t: "Bracelets", h: "high-jewellery.html?sub=bracelets" } ] },
      { title: "Gemstones", links: [
        { t: "Diamonds", h: "high-jewellery.html?stone=Diamond" }, { t: "Emeralds", h: "high-jewellery.html?stone=Emerald" },
        { t: "Sapphires", h: "high-jewellery.html?stone=Sapphire" }, { t: "Rubies", h: "high-jewellery.html?stone=Ruby" },
        { t: "Amethyst", h: "high-jewellery.html?stone=Amethyst" } ] },
      { title: "Services", links: [
        { t: "Private Appointment", h: "high-jewellery.html#appointment" }, { t: "Bespoke Creations", h: "high-jewellery.html#bespoke" },
        { t: "The Gemstone Journey", h: "high-jewellery.html#gemstones" } ] },
    ],
    feature: { img: "necklace-diamond.jpg", caption: "Regina Diamond Necklace", h: "high-jewellery.html?collection=Magnifica" },
  },
  {
    label: "Jewellery", h: "jewellery.html",
    cols: [
      { title: "Categories", links: [
        { t: "All Jewellery", h: "jewellery.html" }, { t: "Rings", h: "jewellery.html?sub=rings" },
        { t: "Necklaces & Pendants", h: "jewellery.html?sub=necklaces" }, { t: "Bracelets", h: "jewellery.html?sub=bracelets" },
        { t: "Earrings", h: "jewellery.html?sub=earrings" }, { t: "Men's Jewellery", h: "jewellery.html?sub=mens" } ] },
      { title: "Collections", links: ["Aurea Eterna", "Serena", "Luna", "Stella", "Onda", "Catene", "Polychroma"]
        .map(c => ({ t: c, h: `jewellery.html?collection=${c}` })) },
      { title: "Materials", links: [
        { t: "Yellow Gold", h: "jewellery.html?material=Yellow Gold" }, { t: "Rose Gold", h: "jewellery.html?material=Rose Gold" },
        { t: "White Gold", h: "jewellery.html?material=White Gold" }, { t: "Platinum", h: "jewellery.html?material=Platinum" },
        { t: "Diamonds", h: "jewellery.html?stone=Diamond" }, { t: "Pearls", h: "jewellery.html?stone=Pearl" } ] },
      { title: "Discover", links: [
        { t: "New Arrivals", h: "jewellery.html?new=1" }, { t: "Collections", h: "jewellery.html#collections" },
        { t: "Ring Size Guide", h: "bridal.html#size-guide" }, { t: "Jewellery Care", h: "jewellery.html#care" } ] },
    ],
    feature: { img: "necklace-layer.jpg", caption: "New: Luna Collection", h: "jewellery.html?collection=Luna" },
  },
  {
    label: "Bridal", h: "bridal.html",
    cols: [
      { title: "Engagement", links: [
        { t: "Engagement Rings", h: "bridal.html?sub=engagement" }, { t: "Solitaire Rings", h: "bridal.html?sub=engagement&stone=Diamond" },
        { t: "Coloured Gemstone Rings", h: "bridal.html?sub=engagement&stone=Pink Tourmaline" }, { t: "Book a Bridal Appointment", h: "bridal.html#appointment" } ] },
      { title: "Wedding", links: [
        { t: "Wedding Bands", h: "bridal.html?sub=bands" }, { t: "Eternity Rings", h: "bridal.html?sub=eternity" },
        { t: "Men's Bands", h: "bridal.html?sub=mens" }, { t: "Bridal Jewellery", h: "bridal.html?sub=bridal-jewellery" } ] },
      { title: "Diamond Guide", links: [
        { t: "The 4Cs", h: "bridal.html#guide" }, { t: "Diamond Shapes", h: "bridal.html#shapes" },
        { t: "Ring Size Guide", h: "bridal.html#size-guide" }, { t: "Ethical Sourcing", h: "maison.html#sustainability" } ] },
      { title: "Services", links: [
        { t: "Complimentary Engraving", h: "bridal.html#services" }, { t: "Lifetime Cleaning", h: "bridal.html#services" },
        { t: "Ring Resizing", h: "bridal.html#services" } ] },
    ],
    feature: { img: "ring-yellow.jpg", caption: "Aurea Classic Solitaire", h: "bridal.html?sub=engagement" },
  },
  {
    label: "Accessories", h: "accessories.html",
    cols: [
      { title: "Bags", links: [
        { t: "All Bags", h: "accessories.html?sub=bags" }, { t: "Top-Handle Bags", h: "accessories.html?sub=bags&collection=Piazza" },
        { t: "Totes & Work Bags", h: "accessories.html?sub=bags&collection=Viaggio" }, { t: "Summer Bags", h: "accessories.html?sub=bags&collection=Riviera" } ] },
      { title: "Small Leather Goods", links: [
        { t: "Wallets", h: "accessories.html?sub=slg" }, { t: "All Leather", h: "accessories.html?material=Leather" } ] },
      { title: "Eyewear & Silk", links: [
        { t: "Sunglasses", h: "accessories.html?sub=eyewear" }, { t: "Silk Scarves", h: "accessories.html?sub=silk" } ] },
      { title: "Men's", links: [
        { t: "Men's Accessories", h: "accessories.html?sub=mens" }, { t: "Briefcases", h: "accessories.html?sub=mens&collection=Viaggio" },
        { t: "Men's Jewellery", h: "jewellery.html?sub=mens" } ] },
    ],
    feature: { img: "bag-woven.jpg", caption: "New: Cesto Woven Bag", h: "accessories.html?sub=bags" },
  },
  {
    label: "Gifts", h: "gifts.html",
    cols: [
      { title: "By Recipient", links: [
        { t: "Gifts for Her", h: "gifts.html?sub=her" }, { t: "Gifts for Him", h: "gifts.html?sub=him" }, { t: "Gifts for Couples", h: "gifts.html?sub=couple" } ] },
      { title: "By Price", links: [
        { t: "Under ₹1,00,000", h: "gifts.html?sub=under-1l" }, { t: "Under ₹1,50,000", h: "gifts.html?sub=under-1-5l" },
        { t: "Under ₹3,00,000", h: "gifts.html?sub=under-3l" }, { t: "Exceptional Gifts", h: "gifts.html?sub=exceptional" } ] },
      { title: "By Occasion", links: [
        { t: "Anniversary", h: "gifts.html?occasion=anniversary" }, { t: "Birthday", h: "gifts.html?occasion=birthday" },
        { t: "Diwali", h: "gifts.html?occasion=diwali" }, { t: "Wedding", h: "gifts.html?occasion=wedding" } ] },
      { title: "Gift Services", links: [
        { t: "Gift Finder", h: "gifts.html#finder" }, { t: "Signature Packaging", h: "gifts.html#services" }, { t: "Personal Message", h: "gifts.html#services" } ] },
    ],
    feature: { img: "gift-box-rings.jpg", caption: "The Art of Gifting", h: "gifts.html" },
  },
  {
    label: "The Maison", h: "maison.html",
    cols: [
      { title: "Our Story", links: [
        { t: "Our History", h: "history.html" }, { t: "Heritage since 1924", h: "maison.html#heritage" },
        { t: "Icons of the Maison", h: "maison.html#icons" } ] },
      { title: "Craftsmanship", links: [
        { t: "The Ateliers", h: "maison.html#ateliers" }, { t: "From Sketch to Jewel", h: "maison.html#ateliers" } ] },
      { title: "Commitments", links: [
        { t: "Sustainability", h: "maison.html#sustainability" }, { t: "Responsible Sourcing", h: "maison.html#sustainability" } ] },
      { title: "Visit Us", links: [
        { t: "Find a Boutique", h: "maison.html#boutiques" }, { t: "Careers", h: "maison.html#careers" } ] },
    ],
    feature: { img: "colosseum.jpg", caption: "A Century of Splendour", h: "maison.html" },
  },
];

// History page chapters, one per decade. `full` renders a full-bleed chapter;
// `vintage` tones the photo to suit the early decades; `product` links an icon born then.
const HISTORY = [
  { year: 1924, decade: "1920s", title: "A Workbench in Rome", img: "chains.jpg", alt: "Gold chains hanging in a workshop", vintage: true,
    caption: "Chains from the first workshop on Via della Croce",
    text: ["Marco Vellora, the son of a silversmith from Umbria, rents a narrow room on Via della Croce, a few steps from Piazza di Spagna. With one apprentice and a borrowed bench, he makes chains, signet rings and silver for the families of the neighbourhood.",
      "His chains — heavy, supple, hand-linked — quickly become known among Roman goldsmiths for a texture no machine could copy."],
    quote: { text: "Gold must feel warm in the hand before it is beautiful to the eye.", by: "Marco Vellora, 1926" } },
  { year: 1938, decade: "1930s", title: "Via Condotti", img: "rome-view.jpg", alt: "Rome seen from above", vintage: true, full: true,
    text: ["The first true boutique opens on Via Condotti, the most elegant street in Rome. Its windows, lit late into the evening, become a stop for travellers on the Grand Tour of a new century.",
      "Inside, Marco's wife Elena introduces something new: jewellery shown not in cases, but on velvet busts, as though already worn."] },
  { year: 1944, decade: "1940s", title: "The Hidden Years", img: "rings-tray.jpg", alt: "Rings resting in a jeweller's tray", vintage: true,
    text: ["During the war the workshop falls almost silent. The family hides its small reserve of stones inside the walls of the shop and keeps working in silver and brass, mending more than it makes.",
      "When peace returns, the stones come out of the walls exactly as they went in — and the first jewels of the new era are made from them."] },
  { year: 1955, decade: "1950s", title: "Colour Arrives", img: "rings-gem.jpg", alt: "Gold rings set with turquoise and carnelian", product: 17,
    text: ["Marco's son Luca, just twenty-four, breaks with the Parisian fashion for platinum and white diamonds. He sets rounded cabochons — turquoise, coral, amethyst, citrine — side by side in yellow gold.",
      "Clients call them scandalous. Within five years, they are the most recognisable jewels in Rome."],
    quote: { text: "Why should a jewel whisper, when Rome itself never does?", by: "Luca Vellora" } },
  { year: 1962, decade: "1960s", title: "La Dolce Vita", img: "model-hat.jpg", alt: "Woman in a wide-brimmed hat", full: true,
    text: ["Cinecittà is the Hollywood of the Tiber, and the actresses who film there find their way to Via Condotti between takes. Bold necklaces of gold and colour appear on screen, in magazines and on the Via Veneto at midnight.",
      "VELLORA becomes, for a decade, the jeweller of an entire way of life."] },
  { year: 1972, decade: "1970s", title: "Serena Is Born", img: "model.jpg", alt: "Woman wearing a fine gold pendant", product: 9,
    text: ["Inspired by the arches of the Colosseum and the aqueducts of the Campagna, Luca's daughter Chiara draws a collection of soft architectural curves: Serena.",
      "Light, wearable, made for every day rather than for galas, it brings VELLORA to a new generation of women who buy jewellery for themselves."],
    link: { t: "Discover the Serena collection", h: "jewellery.html?collection=Serena#shop" } },
  { year: 1985, decade: "1980s", title: "Coins & Chains", img: "necklace-coins.jpg", alt: "Layered gold necklaces with coin pendants", product: 26,
    text: ["Chiara returns to the beginning: her grandfather's hand-linked chains, now set with ancient-inspired coin medallions. The Moneta and Catene lines are born, bold and unmistakably Roman.",
      "The Maison opens its first boutiques outside Italy — in Paris, London and New York."] },
  { year: 1998, decade: "1990s", title: "The Florentine Workshop", img: "bag-woven.jpg", alt: "Woven leather top-handle bag", product: 44,
    text: ["VELLORA acquires a small leather workshop in Florence, run by three generations of saddle-makers. Its first bags carry clasps made by the jewellers in Rome.",
      "Leather becomes a second language for the Maison — and the Piazza top-handle bag its most requested piece."] },
  { year: 2006, decade: "2000s", title: "Giardino Segreto", img: "high-jewelry.jpg", alt: "Sapphire and diamond earrings on a leaf", product: 42,
    text: ["The first great high jewellery collection in fifty years: emeralds, sapphires and diamonds arranged as a secret garden, each piece one of a kind.",
      "It takes the atelier four years and more than 30,000 hours of work."],
    quote: { text: "We did not want to design jewels. We wanted to grow them.", by: "Chiara Vellora" } },
  { year: 2012, decade: "2010s", title: "VELLORA in India", img: "bangles.jpg", alt: "Stack of gold bangles", product: 34,
    text: ["A boutique opens in Mumbai's Kala Ghoda, followed by New Delhi, Bengaluru and Hyderabad. Indian goldsmithing — its bangles, its love of colour — feels like family.",
      "In 2018 the Maison commits to 100% recycled or certified gold and opens an artisan school in Jaipur with the VELLORA Foundation."],
    link: { t: "Find a boutique", h: "maison.html#boutiques" } },
  { year: 2024, decade: "2020s", title: "A Century of Splendour", img: "hero.jpg", alt: "Gold necklace with ruby earrings", full: true,
    text: ["One hundred years after the first workbench, the Maison celebrates with Aurea Eterna — sculpted Roman gold, rubies and granulation techniques revived from antiquity.",
      "Three generations later, every piece is still finished by hand in Rome."] },
];

// Occasion presets for the gifts page (each maps to a product test)
const OCCASIONS = {
  anniversary: { label: "Anniversary", test: p => ["Promessa", "Serena", "Aurea Eterna"].includes(p.collection) || p.who === "couple" },
  birthday: { label: "Birthday", test: p => p.price < 200000 },
  diwali: { label: "Diwali", test: p => p.material === "Yellow Gold" },
  wedding: { label: "Wedding", test: p => p.sec.includes("bridal") },
};

const BOUTIQUES = [
  { city: "Mumbai", name: "Kala Ghoda", addr: "14 Rampart Row, Kala Ghoda, Mumbai 400001", hours: "11:00 – 20:00", phone: "+91 22 4000 1924" },
  { city: "New Delhi", name: "DLF Emporio", addr: "Ground Floor, DLF Emporio, Vasant Kunj, New Delhi 110070", hours: "11:00 – 21:00", phone: "+91 11 4000 1924" },
  { city: "Bengaluru", name: "UB City", addr: "Level 1, UB City, Vittal Mallya Road, Bengaluru 560001", hours: "11:00 – 21:00", phone: "+91 80 4000 1924" },
  { city: "Hyderabad", name: "Banjara Hills", addr: "Road No. 1, Banjara Hills, Hyderabad 500034", hours: "11:00 – 20:30", phone: "+91 40 4000 1924" },
  { city: "Rome", name: "Via Condotti", addr: "Via Condotti 10, 00187 Roma, Italy", hours: "10:00 – 19:30", phone: "+39 06 000 1924" },
  { city: "Milan", name: "Via Montenapoleone", addr: "Via Montenapoleone 2, 20121 Milano, Italy", hours: "10:00 – 19:30", phone: "+39 02 000 1924" },
];
