// Builds the Shopify hand-off from the local site's data.js:
//   out/vellora-products.csv   Shopify product import (Admin → Products → Import)
//   theme/snippets/mega-default.liquid   fallback mega menu (same links as the local site)
//   theme/templates/page.history.json    history chapters as editable blocks
//   theme/assets/*.jpg                   editorial images used as section defaults
//   out/vellora-theme.zip                theme upload (Online Store → Themes → Upload)
// Run: node shopify/build.js   (from the luxe-jewels folder)

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const THEME = path.join(__dirname, "theme");
const OUT = path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });

// Load data.js (plain browser script) into a sandbox and pull its constants out
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8") +
  "\n;this.out = { products, menu, HISTORY, OCCASIONS, SECTIONS, BOUTIQUES, COLLECTIONS };", ctx);
const { products, menu, HISTORY, OCCASIONS, SECTIONS } = ctx.out;

// Unsplash photo id for every local image (product images are imported by URL)
const UNSPLASH = {
  hero: "1601121141461-9d6647bca1ed", "high-jewelry": "1535632066927-ab7c9ab60908", "ring-pink": "1603561591411-07134e71a2a9",
  "ring-solitaire": "1605100804763-247f67b3557e", "ring-flower": "1602751584552-8ba73aad10e1", "necklace-layer": "1599643478518-a784e5dc4c8f",
  "necklace-heart": "1588444837495-c6cfeb53f32d", "bracelet-diamond": "1573408301185-9146fe634ad0", "bracelet-rose": "1611591437281-460bfbe1220a",
  "earrings-gold": "1617038220319-276d3cfab638", "earrings-twist": "1617038260897-41a1f14a8ca0", model: "1611085583191-a3b181a88401",
  colosseum: "1552832230-c0197dd311b5", "rome-view": "1531572753322-ad063cecc140", gift: "1549465220-1a8b9238cd48",
  pearls: "1515562141207-7a88fb7ce338", bag: "1584917865442-de89df76afd3", chains: "1506630448388-4e683c67ddb0",
  "ring-stack": "1543294001-f7cd5d7fb516", "rings-dish": "1561828995-aa79a2db86dd", "silk-scarf": "1576053139778-7e32f2ae3cfd",
  "gift-box-rings": "1584302179602-e4c3d3fd629d", "earrings-studs": "1588444650733-d0767b753fc8", "pendant-halo": "1589128777073-263566ae5e4d",
  "necklace-model": "1590548784585-643d2b9f2925", "bag-woven": "1590874103328-eac38a683ce7", "bag-teal": "1594223274512-ad4803739b7c",
  "hands-model": "1596944924616-7b38e7cfac36", "pendant-cushion": "1598560917505-59a3ad559071", "ring-yellow": "1598560917807-1bae44bd2be8",
  wallet: "1627123424574-724758594e93", "wedding-two-tone": "1627293509201-cd0c780043e6", "rings-tray": "1631982690223-8aa4be0a2497",
  "bracelet-wrist": "1633810543462-77c4a3b13f07", "sunglasses-cat": "1508296695146-257a814070b4", "sunglasses-round": "1511499767150-a48a237f0083",
  "necklace-gold-model": "1599459183200-59c7687a0275", "pendant-emerald": "1599643477877-530eb83abc8e", "ring-emerald": "1602752250015-52934bc45613",
  "ring-cluster": "1611955167811-4711904bb9f8", "men-suit": "1617137968427-85924c800a22", "necklace-diamond": "1618403088890-3d9ff6f4c8b1",
  "earrings-drop": "1629224316810-9d8805b95e76", "earrings-heart": "1630019852942-f89202989a59", "earrings-model": "1600721391776-b5cd0e0048f9",
  "necklace-coins": "1601821765780-754fa98637c1", "bracelet-chain": "1602173574767-37ac01994b2a", "earrings-editorial": "1603974372039-adc49044b6bd",
  "rings-gem": "1608042314453-ae338d80c427", "earrings-pink": "1608508644127-ba99d7732fee", briefcase: "1608731267464-c0c889c2ff92",
  "necklace-bar": "1610694955371-d4a3e0ce4b52", "model-hat": "1611042553365-9b101441c135", bangles: "1611107683227-e9060eccd846",
  "necklace-model2": "1611652022419-a9419f74343d", "tote-black": "1614179689702-355944cd0918", "tennis-bracelet": "1619119069152-a2b331eb392a",
  "model-ring": "1620656798579-1984d9e87df7", "wedding-bands": "1622398925373-3f91b1e275f5", "chain-black": "1625908733875-efa9c75c084d",
};
const imgUrl = file => {
  const id = UNSPLASH[file.replace(/\.jpg$/, "")];
  if (!id) throw new Error("No Unsplash id for " + file);
  return `https://images.unsplash.com/photo-${id}?w=1600&q=85&fm=jpg`;
};

const slug = s => String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const TYPE = { rings: "Rings", necklaces: "Necklaces", bracelets: "Bracelets", earrings: "Earrings", accessories: "Accessories" };

// Tags drive the five smart collections (sec-*), sub-category tabs and the tag filters
function tagsFor(p) {
  const t = new Set([p.cat, ...(p.tags || [])]);
  p.sec.forEach(s => t.add("sec-" + s));
  t.add("collection-" + slug(p.collection));
  t.add("material-" + slug(p.material));
  if (p.stone !== "None") t.add("stone-" + slug(p.stone));
  if (p.isNew) t.add("new");
  if (p.engrave) t.add("engravable");
  if (p.sec.includes("gifts")) {
    if (p.who) t.add(p.who);
    if ((p.tags || []).includes("mens")) t.add("him");
    SECTIONS.gifts.subs.filter(s => s.slug.startsWith("under") || s.slug === "exceptional")
      .forEach(s => { if (s.test(p)) t.add(s.slug); });
    Object.entries(OCCASIONS).forEach(([k, o]) => { if (o.test(p)) t.add("occasion-" + k); });
  }
  return [...t];
}

// ---------- Product CSV ----------
const COLS = ["Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags", "Published",
  "Option1 Name", "Option1 Value", "Variant SKU", "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty",
  "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price",
  "Variant Requires Shipping", "Variant Taxable", "Image Src", "Image Position", "Image Alt Text", "Gift Card",
  "SEO Title", "SEO Description", "Status"];
const csvCell = v => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const rows = [COLS];
products.forEach(p => {
  const handle = slug(p.name);
  const sku = "VR-" + String(p.id).padStart(5, "0");
  const body = `<p>${p.long}</p><ul><li><strong>Material:</strong> ${p.material}</li>` +
    (p.stone !== "None" ? `<li><strong>Gemstone:</strong> ${p.stone}</li>` : "") +
    `<li><strong>Collection:</strong> ${p.collection}</li><li><strong>Reference:</strong> ${sku}</li></ul>`;
  const sizes = p.sizes || [null];
  sizes.forEach((size, i) => {
    const first = i === 0;
    const row = {
      Handle: handle,
      "Option1 Name": first ? (p.sizes ? "Size" : "Title") : "",
      "Option1 Value": size ?? "Default Title",
      "Variant SKU": size ? `${sku}-${size}` : sku,
      "Variant Grams": p.cat === "accessories" ? 900 : 40,
      "Variant Inventory Tracker": "shopify",
      "Variant Inventory Qty": p.sec.includes("high") ? 1 : 10,
      "Variant Inventory Policy": "deny",
      "Variant Fulfillment Service": "manual",
      "Variant Price": p.price,
      "Variant Requires Shipping": "TRUE",
      "Variant Taxable": "TRUE",
    };
    if (first) Object.assign(row, {
      Title: p.name, "Body (HTML)": body, Vendor: "VELLORA", Type: TYPE[p.cat],
      Tags: tagsFor(p).join(", "), Published: "TRUE",
      "Image Src": imgUrl(p.img), "Image Position": 1, "Image Alt Text": p.name, "Gift Card": "FALSE",
      "SEO Title": `${p.name} | VELLORA Roma`, "SEO Description": `${p.desc}. ${p.long}`.slice(0, 300),
      Status: "active",
    });
    rows.push(COLS.map(c => row[c] ?? ""));
  });
});
fs.writeFileSync(path.join(OUT, "vellora-products.csv"), "﻿" + rows.map(r => r.map(csvCell).join(",")).join("\r\n"));

// ---------- Local link → Shopify URL ----------
const FILE_URL = {
  "index.html": "/", "jewellery.html": "/collections/jewellery", "high-jewellery.html": "/collections/high-jewellery",
  "bridal.html": "/collections/bridal", "accessories.html": "/collections/accessories", "gifts.html": "/collections/gifts",
  "maison.html": "/pages/maison", "history.html": "/pages/history",
};
function shopUrl(h) {
  const [rest, hash] = h.split("#");
  const [file, query] = rest.split("?");
  let url = FILE_URL[file];
  if (!url) throw new Error("Unmapped link " + h);
  if (query) {
    const tags = [];
    new URLSearchParams(query).forEach((v, k) => {
      if (k === "sub") tags.push(v);
      else if (k === "new") tags.push("new");
      else if (k === "occasion") tags.push("occasion-" + v);
      else tags.push(`${k}-${slug(v)}`);
    });
    url += "/" + tags.join("+");
  }
  return url + (hash ? "#" + hash : "");
}

// ---------- Fallback mega menu snippet ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const mega = menu.map((m, i) => `
<li class="nav-item">
  <a class="nav-top" href="${shopUrl(m.h)}" aria-expanded="false" aria-controls="mega${i}">${esc(m.label)}{% render 'icon', name: 'chevron' %}</a>
  <div class="mega" id="mega${i}">
    <div class="mega-inner">
      <div class="mega-cols">${m.cols.map(c => `
        <div class="mega-col"><h6>${esc(c.title)}</h6>${c.links.map(l => `<a href="${esc(shopUrl(l.h))}">${esc(l.t)}</a>`).join("")}</div>`).join("")}
      </div>
      <a class="mega-feature" href="${esc(shopUrl(m.feature.h))}"><img src="{{ '${m.feature.img}' | asset_url }}" alt="" loading="lazy" width="560" height="420"><span>${esc(m.feature.caption)}</span><em>{{ 'general.discover' | t }}</em></a>
    </div>
    <a class="mega-all" href="${shopUrl(m.h)}">{{ 'general.view_all' | t }} ${esc(m.label)}</a>
  </div>
</li>`).join("");
fs.writeFileSync(path.join(THEME, "snippets", "mega-default.liquid"),
  "{%- comment -%} Generated by shopify/build.js from data.js — used when the main menu has no nested links. {%- endcomment -%}" +
  mega.replace(/href="\/collections/g, 'href="{{ routes.collections_url }}') + "\n");

// ---------- History page template (chapters as blocks) ----------
const historyBlocks = {}, order = [];
HISTORY.forEach(c => {
  const id = "y" + c.year;
  const prod = c.product && products.find(p => p.id === c.product);
  historyBlocks[id] = {
    type: "chapter",
    settings: {
      year: String(c.year), decade: c.decade, title: c.title,
      text: c.text.map(t => `<p>${t}</p>`).join(""),
      fallback_image: c.img, image_alt: c.alt, vintage: !!c.vintage, full_width: !!c.full,
      caption: c.caption || "", quote: c.quote?.text || "", quote_by: c.quote?.by || "",
      product: prod ? slug(prod.name) : "", link_label: c.link?.t || "", link_url: c.link ? shopUrl(c.link.h) : "",
    },
  };
  order.push(id);
});
const historyTemplate = {
  sections: {
    main: {
      type: "history",
      blocks: historyBlocks,
      block_order: order,
      settings: {
        eyebrow: "1924 — Today", heading: "Our History", subheading: "A century of Roman audacity, told in gold",
        lead: "From a single workbench near the Spanish Steps to boutiques from Rome to Mumbai, VELLORA has always worked the same way: by hand, in gold, with colour, volume and a little Roman audacity.",
        fig1: "1924", fig1_label: "Founded in Rome", fig2: "3", fig2_label: "Generations of the family",
        fig3: "300+", fig3_label: "Artisans today", fig4: "42", fig4_label: "Boutiques worldwide",
      },
    },
  },
  order: ["main"],
};
fs.writeFileSync(path.join(THEME, "templates", "page.history.json"), JSON.stringify(historyTemplate, null, 2));

// ---------- JSON templates for home, the five collections and the Maison page ----------
const T = path.join(THEME, "templates");
const writeTemplate = (name, sections) => fs.writeFileSync(path.join(T, name + ".json"),
  JSON.stringify({ sections, order: Object.keys(sections) }, null, 2));
let uid = 0;
const blocks = (type, list) => {
  const b = {}, order = [];
  list.forEach(settings => { const id = `${type}_${++uid}`; b[id] = { type, settings }; order.push(id); });
  return { blocks: b, block_order: order };
};
const subBlocks = (key, base) => blocks("sub", SECTIONS[key].subs
  .map(s => ({ s, items: base.filter(s.test) })).filter(x => x.items.length)
  .map(({ s, items }) => ({ label: s.label, tag: s.slug, fallback_image: items[0].img })));
const inSec = k => products.filter(p => p.sec.includes(k));
const info = list => blocks("item", list.map(([title, text]) => ({ title, text: `<p>${text}</p>` })));
const collectionMain = (key, extra) => ({
  type: "main-collection", ...subBlocks(key, inSec(key)),
  settings: { fallback_image: SECTIONS[key].hero, eyebrow: SECTIONS[key].eyebrow, heading: "All " + SECTIONS[key].title, show_tiles: true, per_page: 24, dark: !!SECTIONS[key].dark, ...extra },
});

writeTemplate("index", {
  hero: { type: "hero", settings: { style: "full", fallback_image: "hero.jpg", eyebrow: "New Collection", heading: "Aurea Eterna", text: "Roman gold, sculpted by hand into light.", button_label: "Discover the Collection", button_url: "/collections/jewellery/collection-aurea-eterna" } },
  categories: { type: "category-tiles", ...blocks("tile", [["Rings", "ring-solitaire.jpg", "rings"], ["Necklaces", "necklace-layer.jpg", "necklaces"], ["Bracelets", "bracelet-diamond.jpg", "bracelets"], ["Earrings", "earrings-gold.jpg", "earrings"]]
    .map(([title, img, tag]) => ({ title, fallback_image: img, url: `/collections/jewellery/${tag}` }))), settings: { eyebrow: "Explore", heading: "The World of VELLORA", layout: "tiles", anchor: "collections" } },
  serena: { type: "image-with-text", settings: { fallback_image: "model.jpg", eyebrow: "Icons", heading: "Serena Collection", text: "<p>Inspired by the arches of ancient Rome, Serena balances bold architecture with feminine grace. Each piece is crafted in 18k gold and finished by hand in our Roman ateliers.</p>", button_label: "Shop Serena", button_url: "/collections/jewellery/collection-serena" } },
  featured: { type: "featured-collection", settings: { eyebrow: "Selection", heading: "New & Iconic", collection: "jewellery", limit: 8, button_label: "View all Jewellery", anchor: "shop" } },
  high: { type: "banner", settings: { fallback_image: "high-jewelry.jpg", eyebrow: "High Jewellery", heading: "Giardino Segreto", text: "Rare sapphires and emeralds bloom in our most extraordinary creations — one-of-a-kind masterpieces born in the heart of Rome.", button_label: "Discover High Jewellery", button_url: "/collections/high-jewellery" } },
  duo: { type: "card-grid", ...blocks("card", [
    { title: "Bridal", text: "Engagement rings, wedding bands and the 4Cs guide.", fallback_image: "wedding-bands.jpg", url: "/collections/bridal" },
    { title: "Accessories", text: "Handbags, leather goods, eyewear and silk from Italy.", fallback_image: "bag-teal.jpg", url: "/collections/accessories" }]),
    settings: { style: "duo", eyebrow: "Love & Promise", heading: "Bridal & Accessories" } },
  gifts: { type: "card-grid", ...blocks("card", [
    { title: "Gifts for Her", fallback_image: "gift.jpg", url: "/collections/gifts/her" },
    { title: "Under ₹1,50,000", fallback_image: "pearls.jpg", url: "/collections/gifts/under-1-5l" },
    { title: "Gifts for Him", fallback_image: "briefcase.jpg", url: "/collections/gifts/him" }]),
    settings: { style: "gift", eyebrow: "The Art of Gifting", heading: "Gifts to Treasure", cream: true } },
  maison: { type: "maison-teaser", ...blocks("figure", [[100, "+", "Years of craft"], [42, "", "Boutiques"], [300, "+", "Artisans"]]
    .map(([number, suffix, label]) => ({ number, suffix, label }))),
    settings: { fallback_image: "colosseum.jpg", eyebrow: "The Maison", heading: "A Century of Roman Splendour", text: "Founded in 1924 on a quiet street near the Spanish Steps, VELLORA has carried the spirit of the Eternal City into every jewel — colour, volume and audacity, set in gold.", button_label: "Our History", button_url: "/pages/history" } },
});

writeTemplate("collection", { main: { type: "main-collection", settings: { fallback_image: "necklace-model.jpg", eyebrow: "VELLORA", show_tiles: false, per_page: 24 } } });

writeTemplate("collection.jewellery", {
  main: collectionMain("jewellery"),
  collections: { type: "card-grid", ...blocks("card", ["Aurea Eterna", "Serena", "Luna", "Stella", "Onda", "Catene", "Polychroma"]
    .map(n => ({ title: n, text: ctx.out.COLLECTIONS[n].text, fallback_image: ctx.out.COLLECTIONS[n].img, url: `/collections/jewellery/collection-${slug(n)}` }))),
    settings: { style: "overlay", eyebrow: "Signature Lines", heading: "The Collections", cream: true, anchor: "collections" } },
  layering: { type: "image-with-text", settings: { fallback_image: "hands-model.jpg", eyebrow: "Style Notes", heading: "The Art of Layering", text: "<p>Mix chains of different lengths, stack fine rings with one bold piece and pair yellow with rose gold — Roman women have done it for two thousand years.</p>", button_label: "Shop Catene", button_url: "/collections/jewellery/collection-catene" } },
  care: { type: "info-grid", ...info([
    ["Everyday care", "Put jewellery on last and take it off first. Avoid perfume, lotion and chlorine, and store each piece in its own pouch."],
    ["Cleaning", "Wipe gold and platinum with a soft lint-free cloth. Diamonds can be bathed in warm soapy water and dried with a soft brush."],
    ["Complimentary service", "Bring your VELLORA creations to any boutique for a free yearly clean, polish and stone check by our jewellers."],
    ["Repairs & resizing", "Rings can be resized once free of charge within the first year. Repairs are quoted within 48 hours."]]),
    settings: { eyebrow: "Client Services", heading: "Jewellery Care", anchor: "care" } },
});

const hjCollections = ["Giardino Segreto", "Magnifica", "Fiore di Roma"];
writeTemplate("collection.high-jewellery", {
  main: collectionMain("high", { button_label: "Request a Private Viewing", button_url: "#appointment" }),
  showcase: { type: "collection-showcase", ...blocks("row", hjCollections.map(n => ({ title: n, text: ctx.out.COLLECTIONS[n].text, fallback_image: ctx.out.COLLECTIONS[n].img, url: `/collections/high-jewellery/collection-${slug(n)}` }))), settings: { eyebrow: "Masterpieces", heading: "High Jewellery Collections", anchor: "collections" } },
  gemstones: { type: "gemstones", ...blocks("gem", [["Diamond", "#e9eef2", "Exceptional white diamonds, D–F colour, internally flawless."], ["Emerald", "#1f7a55", "Colombian emeralds with a velvety, saturated green."], ["Sapphire", "#1f3f8a", "Cornflower Ceylon and royal blue Kashmir-type sapphires."], ["Ruby", "#9b1b30", "Untreated Burmese rubies of pigeon-blood red."], ["Amethyst", "#7a4fa0", "Deep Siberian amethysts, often paired with citrine."]]
    .map(([title, color, text]) => ({ title, color, text, url: `/collections/high-jewellery/stone-${slug(title)}` }))), settings: { anchor: "gemstones" } },
  bespoke: { type: "image-with-text", settings: { fallback_image: "necklace-diamond.jpg", reverse: true, eyebrow: "Bespoke", heading: "A Jewel Made Only for You", text: "<p>From the first sketch to the final polish, our designers and master jewellers create a unique piece around your story — usually over six to nine months, with a gemstone selection presented privately.</p>", steps: "Consultation with a designer in Rome or India\nGemstone selection from our private reserve\nGouache drawings and wax model\nCrafting by hand in our atelier", anchor: "bespoke" } },
  appointment: { type: "appointment", settings: { eyebrow: "By Appointment", heading: "Request a Private Viewing", text: "High jewellery is presented privately in our salons or at a place of your choosing. A client advisor will contact you within 24 hours.", topic: "High Jewellery", anchor: "appointment" } },
});

writeTemplate("collection.bridal", {
  main: collectionMain("bridal", { button_label: "Book a Bridal Appointment", button_url: "#appointment" }),
  guide: { type: "diamond-guide", ...blocks("tab", [
    ["Cut", "Cut decides how brilliantly a diamond returns light. We only set diamonds graded Excellent or Very Good, cut for maximum fire."],
    ["Colour", "Graded from D (colourless) to Z. Our engagement diamonds are D to G — icy white and timeless in any metal."],
    ["Clarity", "Measures natural inclusions. Every centre stone is VS2 or better, so nothing is visible to the eye."],
    ["Carat", "The weight of the diamond: 1 carat = 0.2 g. Our solitaires range from 0.30ct to over 5ct, all certified by GIA or IGI."]]
    .map(([title, text]) => ({ title, text }))), settings: { eyebrow: "Diamond Guide", heading: "The 4Cs", shapes_url: "/collections/bridal/engagement", anchor: "guide" } },
  services: { type: "info-grid", ...info([
    ["Complimentary engraving", "Initials, a date or a short message engraved inside the band by hand."],
    ["Free resizing", "Your first resize is on us, in boutique or by insured courier."],
    ["Lifetime cleaning", "Bring your rings back any time for a professional clean and stone check."],
    ["Certified diamonds", "Every centre diamond over 0.30ct comes with a GIA or IGI certificate."]]),
    settings: { eyebrow: "For Life", heading: "Bridal Services", anchor: "services" } },
  appointment: { type: "appointment", settings: { eyebrow: "Together", heading: "Book a Bridal Appointment", text: "Discover engagement rings and wedding bands with a bridal specialist, in boutique or over video.", topic: "Engagement & Bridal", anchor: "appointment" } },
});

writeTemplate("collection.accessories", {
  main: collectionMain("accessories"),
  workshop: { type: "image-with-text", settings: { fallback_image: "bag-woven.jpg", eyebrow: "Made in Italy", heading: "The Florentine Workshop", text: "<p>Each bag is cut from full-grain calf leather and assembled by a single artisan over twelve to twenty hours, with hardware finished in palladium or gold by our jewellers.</p>", button_label: "Shop Bags", button_url: "/collections/accessories/bags" } },
  mens: { type: "image-with-text", settings: { fallback_image: "men-suit.jpg", reverse: true, eyebrow: "For Him", heading: "The Gentleman's Edit", text: "<p>Briefcases, wallets, sunglasses and bold gold chains — understated pieces built to be used every day for years.</p>", button_label: "Shop Men's", button_url: "/collections/accessories/mens" } },
});

writeTemplate("collection.gifts", {
  main: collectionMain("gifts", { button_label: "Open the Gift Finder", button_url: "#finder", show_tiles: false }),
  finder: { type: "gift-finder", settings: { eyebrow: "Gift Finder", heading: "Find the Perfect Gift", collection_url: "/collections/gifts", anchor: "finder" } },
  services: { type: "info-grid", ...info([
    ["Signature packaging", "Every gift arrives in our lacquered box with a silk ribbon, at no extra cost."],
    ["Handwritten message", "Add a personal note at checkout and our calligrapher will write it by hand."],
    ["Easy exchanges", "Gifts can be exchanged within 30 days — the receipt never shows the price."],
    ["Scheduled delivery", "Choose the perfect day, and we will deliver it by insured courier."]]),
    settings: { eyebrow: "With Love", heading: "Gift Services", anchor: "services" } },
});

const TIMELINE = [
  ["1924", "Founded in Rome", "Goldsmith Marco Vellora opens a workshop near the Spanish Steps."],
  ["1938", "Via Condotti", "The first boutique opens on Rome's most elegant street."],
  ["1955", "Colour arrives", "Cabochon gemstones in bold combinations become the Maison's signature."],
  ["1972", "Serena is born", "The arch-inspired collection becomes an instant icon."],
  ["1998", "Florentine leather", "A leather workshop in Florence launches the first VELLORA bags."],
  ["2012", "VELLORA in India", "The first Indian boutique opens in Mumbai's Kala Ghoda."],
  ["2024", "A century", "One hundred years celebrated with the Aurea Eterna collection."],
];
writeTemplate("page.maison", {
  main: { type: "maison-page", ...blocks("year", TIMELINE.map(([year, title, text]) => ({ year, title, text }))), settings: { history_url: "/pages/history" } },
  icons: { type: "product-row", settings: { eyebrow: "Timeless", heading: "Icons of the Maison", products: [7, 1, 9, 4].map(id => slug(products.find(p => p.id === id).name)), anchor: "icons" } },
  ateliers: { type: "image-with-text", settings: { fallback_image: "model-ring.jpg", eyebrow: "Craftsmanship", heading: "From Sketch to Jewel", text: "<p>More than 300 artisans work in our Roman ateliers. A single high jewellery necklace passes through the hands of designers, wax modellers, goldsmiths, setters and polishers.</p>", steps: "Design — gouache drawings at life size\nModelling — carved in wax or metal\nGoldsmithing — cast, assembled and soldered\nSetting — every stone placed by hand\nPolishing — until the gold glows", anchor: "ateliers" } },
  sustainability: { type: "info-grid", blocks: {
      f1: { type: "figure", settings: { number: 100, suffix: "%", label: "Recycled or certified gold" } },
      f2: { type: "figure", settings: { number: 100, suffix: "%", label: "Diamonds Kimberley Process compliant" } },
      f3: { type: "figure", settings: { number: 40, suffix: "%", label: "Less energy in our ateliers since 2018" } },
      i1: { type: "item", settings: { title: "Traceable gemstones", text: "<p>We buy from mines and cutters audited to the Responsible Jewellery Council standard.</p>" } },
      i2: { type: "item", settings: { title: "Recycled gold", text: "<p>All our gold is recycled or comes from certified responsible sources.</p>" } },
      i3: { type: "item", settings: { title: "Artisan schools", text: "<p>The VELLORA Foundation trains 60 young goldsmiths every year in Rome and Jaipur.</p>" } } },
    block_order: ["f1", "f2", "f3", "i1", "i2", "i3"], settings: { eyebrow: "Commitments", heading: "Responsible Luxury", anchor: "sustainability" } },
  boutiques: { type: "boutiques", ...blocks("boutique", ctx.out.BOUTIQUES.map(b => ({
    city: b.city, country: ["Rome", "Milan"].includes(b.city) ? "Italy" : "India", name: b.name, address: b.addr,
    hours: "Open daily " + b.hours, phone: b.phone }))), settings: { anchor: "boutiques" } },
  appointment: { type: "appointment", settings: { eyebrow: "Visit Us", heading: "Book an Appointment", text: "Meet a client advisor in boutique or over a private video call.", topic: "Fine Jewellery", anchor: "appointment",
    boutiques: ctx.out.BOUTIQUES.map(b => `${b.city} — ${b.name}`).join("\n") } },
  careers: { type: "info-grid", ...info([["Client Advisor", "Mumbai · New Delhi · Bengaluru"], ["Apprentice Goldsmith", "Rome atelier · 2-year programme"], ["Visual Merchandiser", "Mumbai · Full time"], ["E-commerce Specialist", "Remote, India · Full time"]]),
    settings: { eyebrow: "Join Us", heading: "Careers", note: "Send your CV to careers@vellora.example", anchor: "careers" } },
});

// ---------- Stylesheet: the local site's CSS plus theme-only additions ----------
fs.writeFileSync(path.join(THEME, "assets", "vellora.css"),
  "/* Generated by shopify/build.js from styles.css + shopify/theme-extra.css — edit those, not this file. */\n" +
  fs.readFileSync(path.join(ROOT, "styles.css"), "utf8") + "\n" +
  fs.readFileSync(path.join(__dirname, "theme-extra.css"), "utf8"));

// ---------- Assets: editorial images used as section defaults ----------
fs.readdirSync(path.join(ROOT, "images")).filter(f => f.endsWith(".jpg"))
  .forEach(f => fs.copyFileSync(path.join(ROOT, "images", f), path.join(THEME, "assets", f)));

// ---------- Zip the theme (folders at the zip root, as Shopify expects) ----------
const zip = path.join(OUT, "vellora-theme.zip");
if (fs.existsSync(zip)) fs.unlinkSync(zip);
execFileSync("python", ["-I", "-c", `
import os, sys, zipfile
root, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for d, _, files in os.walk(root):
        for f in files:
            p = os.path.join(d, f)
            z.write(p, os.path.relpath(p, root).replace(os.sep, '/'))
`, THEME, zip]);

console.log(`Products: ${products.length} (${rows.length - 1} CSV rows incl. size variants)`);
console.log(`Menu links: ${menu.reduce((n, m) => n + m.cols.reduce((k, c) => k + c.links.length, 0), 0)}`);
console.log(`History chapters: ${HISTORY.length}`);
console.log("Wrote", path.relative(ROOT, path.join(OUT, "vellora-products.csv")), "and", path.relative(ROOT, zip));
