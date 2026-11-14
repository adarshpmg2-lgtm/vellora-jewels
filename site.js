// Shared behaviour for every page: shell (header/footer/overlays), bag, wishlist,
// account, product detail, checkout, mega menu, search, the shop/filter engine and
// the section page templates. Page type comes from <body data-page="...">.

const inr = n => "₹" + n.toLocaleString("en-IN");
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const byId = id => products.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const PAGE = document.body.dataset.page || "home";
const ICON = {
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>',
};

// ---------- Shell ----------
document.body.insertAdjacentHTML("afterbegin", `
  <a class="skip" href="#page">Skip to content</a>
  <div class="promo"><div class="promo-track">
    <span>Complimentary express shipping across India</span>
    <span>Book a private appointment at our boutiques</span>
    <span>Complimentary engraving on rings &amp; bracelets</span>
  </div></div>
  <header class="header" id="header">
    <div class="header-top">
      <div class="header-left">
        <button class="icon-btn menu-toggle" aria-label="Open menu" id="menuToggle"><svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
        <button class="icon-btn" aria-label="Search" id="searchOpen"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button>
        <a href="maison.html#boutiques" class="header-link hide-sm">Boutiques</a>
      </div>
      <a href="index.html" class="logo" aria-label="VELLORA home">VELLORA<small>ROMA · 1924</small></a>
      <div class="header-right">
        <a href="#contact" class="header-link hide-sm">Contact Us</a>
        <button class="icon-btn account-btn" aria-label="Account" id="accountOpen">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
          <span class="account-initial" id="accountInitial"></span>
        </button>
        <button class="icon-btn badge-wrap" aria-label="Wishlist" id="wishOpen">${ICON.heart}<span class="badge" id="wishCount">0</span></button>
        <button class="icon-btn badge-wrap" aria-label="Shopping bag" id="bagOpen">
          <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span class="badge" id="bagCount">0</span>
        </button>
      </div>
    </div>
    <nav class="nav" id="nav" aria-label="Main">
      <button class="icon-btn nav-close" aria-label="Close menu" id="menuClose">${ICON.close}</button>
      <ul class="nav-list" id="navList"></ul>
    </nav>
  </header>
  <div class="search-overlay" id="searchOverlay">
    <button class="icon-btn search-close" aria-label="Close search" id="searchClose">${ICON.close}</button>
    <input type="search" placeholder="What are you looking for?" id="searchInput" aria-label="Search">
    <p class="search-hint">Popular: <a href="jewellery.html?sub=rings">Rings</a> · <a href="jewellery.html?stone=Diamond">Diamonds</a> · <a href="bridal.html?sub=engagement">Engagement</a> · <a href="gifts.html?sub=her">Gifts for her</a></p>
    <div class="search-results" id="searchResults"></div>
  </div>`);

document.body.insertAdjacentHTML("beforeend", `
  <section class="services" id="services-strip">
    <div class="service"><svg viewBox="0 0 24 24"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
      <h4>Complimentary Shipping</h4><p>Insured express delivery on every order.</p></div>
    <div class="service"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
      <h4>Book an Appointment</h4><p>In boutique or by private video call.</p></div>
    <div class="service"><svg viewBox="0 0 24 24"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/></svg>
      <h4>Engraving</h4><p>Personalise rings and bracelets for free.</p></div>
    <div class="service"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1z"/></svg>
      <h4>Signature Packaging</h4><p>Every creation arrives in our iconic box.</p></div>
  </section>
  <section class="newsletter" id="contact">
    <h2>Stay in Touch</h2>
    <p>Be the first to discover new collections, exclusive events and stories from the Maison.</p>
    <form id="newsletterForm" class="news-form">
      <input type="email" placeholder="Your email address" required aria-label="Email address">
      <button type="submit" class="btn btn-dark">Subscribe</button>
    </form>
    <p class="form-msg" id="formMsg" role="status"></p>
    <p class="contact-line">Client Services: <a href="tel:+911800001924">1800 000 1924</a> · Mon–Sat, 10:00–19:00 IST</p>
  </section>
  <footer class="footer">
    <div class="footer-grid">
      <div><h5>Client Services</h5>
        <a href="#contact">Contact Us</a><a href="high-jewellery.html#appointment">Book an Appointment</a><a href="bridal.html#size-guide">Ring Size Guide</a><a href="jewellery.html#care">Care &amp; Repair</a><a href="gifts.html#services">Gift Services</a></div>
      <div><h5>The Maison</h5>
        <a href="history.html">Our History</a><a href="maison.html#ateliers">Ateliers</a><a href="maison.html#sustainability">Sustainability</a><a href="maison.html#careers">Careers</a><a href="maison.html#boutiques">Boutiques</a></div>
      <div><h5>Shop</h5>
        <a href="high-jewellery.html">High Jewellery</a><a href="jewellery.html">Jewellery</a><a href="bridal.html">Bridal</a><a href="accessories.html">Accessories</a><a href="gifts.html">Gifts</a></div>
      <div><h5>Follow Us</h5>
        <div class="socials">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg></a>
        </div>
        <p class="region">Country / Region: <strong>India (₹)</strong></p></div>
    </div>
    <div class="footer-bottom">
      <span class="logo small">VELLORA</span>
      <p>© 2026 VELLORA Roma — a demo concept site. Photography from Unsplash.</p>
    </div>
  </footer>
  <div class="drawer-backdrop" id="backdrop"></div>
  <aside class="drawer" id="drawer" aria-label="Shopping bag">
    <div class="drawer-head"><h3>Your Bag</h3><button class="icon-btn" aria-label="Close bag" id="bagClose">${ICON.close}</button></div>
    <div class="drawer-items" id="drawerItems"></div>
    <div class="drawer-foot">
      <div class="total"><span>Subtotal</span><strong id="bagTotal">₹0</strong></div>
      <button class="btn btn-dark full" id="checkoutBtn">Proceed to Checkout</button>
    </div>
  </aside>
  <div class="modal" id="accountModal" role="dialog" aria-modal="true" aria-labelledby="accountTitle">
    <div class="modal-box modal-sm"><button class="icon-btn modal-close" data-close aria-label="Close">${ICON.close}</button><div id="accountBody"></div></div>
  </div>
  <div class="modal" id="productModal" role="dialog" aria-modal="true" aria-label="Product details">
    <div class="modal-box modal-lg"><button class="icon-btn modal-close" data-close aria-label="Close">${ICON.close}</button><div id="productBody"></div></div>
  </div>
  <div class="checkout" id="checkout" role="dialog" aria-modal="true" aria-label="Checkout">
    <header class="checkout-head">
      <button class="link-btn" id="checkoutBack">← Continue shopping</button>
      <span class="logo small">VELLORA</span>
      <span class="secure">🔒 Secure checkout</span>
    </header>
    <ol class="steps" id="steps"><li>Details</li><li>Delivery</li><li>Payment</li><li>Review</li></ol>
    <div class="checkout-body"><div class="checkout-main" id="checkoutMain"></div><aside class="checkout-summary" id="checkoutSummary"></aside></div>
  </div>
  <div class="toast" id="toast" role="status"></div>`);

// ---------- Storage (demo only: everything lives in this browser) ----------
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem("vellora-" + k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("vellora-" + k, JSON.stringify(v)); } catch {} },
};
let bag = store.get("bag", []).filter(i => i.key && byId(i.id));
const wish = new Set(store.get("wish", []).filter(byId));
let users = store.get("users", {});
let session = store.get("session", null);
function save() {
  store.set("bag", bag); store.set("wish", [...wish]);
  store.set("users", users); store.set("session", session);
}
const currentUser = () => (session && users[session]) || null;

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

// ---------- Modals ----------
let lastFocus;
function openModal(id) {
  lastFocus = document.activeElement;
  $(id).classList.add("open");
  document.body.classList.add("locked");
  setTimeout(() => $(id).querySelector("input, select, button:not(.modal-close)")?.focus(), 60);
}
function closeModal(el) {
  el.classList.remove("open");
  if (!$$(".modal.open, .checkout.open, .drawer.open").length) document.body.classList.remove("locked");
  lastFocus?.focus?.();
}
$$(".modal").forEach(m => m.addEventListener("click", e => {
  if (e.target === m || e.target.closest("[data-close]")) closeModal(m);
}));

// ---------- Product cards ----------
function cardHTML(p, i = 0) {
  return `
    <article class="p-card" style="animation-delay:${Math.min(i, 8) * 50}ms">
      <div class="p-img">
        <button class="p-open" data-open="${p.id}" aria-label="View ${esc(p.name)}"><img src="images/${p.img}" alt="${esc(p.name)}" loading="lazy"></button>
        ${p.tag ? `<span class="p-tag">${p.tag}</span>` : p.isNew ? `<span class="p-tag">New</span>` : ""}
        <button class="p-wish ${wish.has(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Add ${esc(p.name)} to wishlist">${ICON.heart}</button>
        <div class="p-actions"><button data-${p.sizes ? "open" : "add"}="${p.id}">${p.sizes ? "Select Size" : "Add to Bag"}</button></div>
      </div>
      <button class="p-name" data-open="${p.id}">${p.name}</button>
      <p class="p-desc">${p.desc}</p>
      <p class="p-price">${inr(p.price)}</p>
    </article>`;
}

// ---------- Shop / filter engine ----------
// mountShop renders sub-nav tabs, facet sidebar, sorting, chips and the grid.
// State is mirrored into the URL so filtered views can be shared and bookmarked.
const FACET_LABELS = { material: "Metal & Material", stone: "Gemstone", collection: "Collection" };
let shop = null;

function mountShop(el, { base, subs = [], facets = [], extra = null }) {
  const params = new URLSearchParams(location.search);
  const maxPrice = Math.ceil(Math.max(...base.map(p => p.price)) / 10000) * 10000;
  const state = {
    sub: subs.some(s => s.slug === params.get("sub")) ? params.get("sub") : "all",
    sort: params.get("sort") || "featured",
    price: Math.min(+params.get("max") || maxPrice, maxPrice),
    newOnly: params.get("new") === "1",
    extra: extra && params.get(extra.param) in extra.options ? params.get(extra.param) : null,
  };
  facets.forEach(f => { state[f] = new Set(params.getAll(f).flatMap(v => v.split(","))); });

  el.innerHTML = `
    ${subs.length ? `<div class="filters" role="tablist">
      <button class="filter" data-sub="all">All</button>
      ${subs.map(s => `<button class="filter" data-sub="${s.slug}">${s.label}</button>`).join("")}
    </div>` : ""}
    <div class="shop-bar">
      <button class="btn-outline filter-toggle" id="filterOpen"><svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg> Filter &amp; Sort</button>
      <p class="result-count" id="resultCount" aria-live="polite"></p>
      <label class="sort-wrap">Sort by
        <select id="sortSelect">
          <option value="featured">Featured</option><option value="new">Newest</option>
          <option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </label>
    </div>
    <div class="active-chips" id="activeChips"></div>
    <div class="shop-layout">
      <aside class="filter-panel" id="filterPanel" aria-label="Filters">
        <div class="filter-panel-head"><h3>Filter</h3><button class="icon-btn" aria-label="Close filters" id="filterClose">${ICON.close}</button></div>
        ${facets.map(f => {
          const values = [...new Set(base.map(p => p[f]))].filter(v => v !== "None").sort();
          return `<details class="filter-group" open><summary><h4>${FACET_LABELS[f]}</h4></summary>
            ${values.map(v => `<label class="check-line"><input type="checkbox" data-facet="${f}" value="${esc(v)}" ${state[f].has(v) ? "checked" : ""}>
              ${esc(v)} <span class="count" data-count-for="${f}|${esc(v)}"></span></label>`).join("")}
          </details>`;
        }).join("")}
        <div class="filter-group"><h4>Max Price</h4>
          <input type="range" id="priceRange" min="0" max="${maxPrice}" step="10000" value="${state.price}" aria-label="Maximum price">
          <div class="price-labels"><span>₹0</span><strong id="priceValue"></strong></div>
        </div>
        <label class="check-line"><input type="checkbox" id="newOnly" ${state.newOnly ? "checked" : ""}> New arrivals only</label>
        <div class="filter-panel-foot"><button class="btn-outline" id="clearFilters">Clear all</button><button class="btn btn-dark" id="applyFilters">Show results</button></div>
      </aside>
      <div>
        <div class="product-grid" id="productGrid"></div>
        <div class="empty-state" id="emptyState" hidden><p>No creations match these filters.</p><button class="btn btn-dark" id="emptyClear">Clear filters</button></div>
        <div class="load-more" id="loadMore" hidden><p id="shownCount"></p><button class="btn-outline" id="loadMoreBtn">Load more</button></div>
      </div>
    </div>`;
  $("#sortSelect").value = state.sort;

  const PAGE_SIZE = 12;
  let shown = PAGE_SIZE;
  const subTest = () => subs.find(s => s.slug === state.sub)?.test || (() => true);
  const matches = (p, skip) => {
    if (!subTest()(p)) return false;
    if (state.extra && !extra.options[state.extra].test(p)) return false;
    for (const f of facets) if (f !== skip && state[f].size && !state[f].has(p[f])) return false;
    return p.price <= state.price && (!state.newOnly || p.isNew);
  };

  function syncUrl() {
    const q = new URLSearchParams();
    if (state.sub !== "all") q.set("sub", state.sub);
    if (state.extra) q.set(extra.param, state.extra);
    facets.forEach(f => state[f].size && q.set(f, [...state[f]].join(",")));
    if (state.price < maxPrice) q.set("max", state.price);
    if (state.newOnly) q.set("new", "1");
    if (state.sort !== "featured") q.set("sort", state.sort);
    const qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }

  function render() {
    let list = base.filter(p => matches(p));
    const sorters = {
      "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name), new: (a, b) => b.isNew - a.isNew,
    };
    if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);
    $("#productGrid").innerHTML = list.slice(0, shown).map(cardHTML).join("");
    $("#emptyState").hidden = list.length > 0;
    $("#loadMore").hidden = list.length <= shown;
    $("#shownCount").textContent = `Showing ${Math.min(shown, list.length)} of ${list.length}`;
    $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "creation" : "creations"}`;
    el.querySelectorAll("[data-sub]").forEach(b => {
      b.classList.toggle("active", b.dataset.sub === state.sub);
      b.setAttribute("aria-selected", b.dataset.sub === state.sub);
    });
    $("#priceValue").textContent = "up to " + inr(state.price);
    el.querySelectorAll("[data-count-for]").forEach(c => {
      const [key, val] = c.dataset.countFor.split("|");
      c.textContent = `(${base.filter(p => matches(p, key) && p[key] === val).length})`;
    });
    const chips = [];
    if (state.sub !== "all") chips.push(["sub", "", subs.find(s => s.slug === state.sub).label]);
    if (state.extra) chips.push(["extra", "", extra.options[state.extra].label]);
    facets.forEach(f => state[f].forEach(v => chips.push([f, v, v])));
    if (state.price < maxPrice) chips.push(["price", "", "Up to " + inr(state.price)]);
    if (state.newOnly) chips.push(["newOnly", "", "New arrivals"]);
    $("#activeChips").innerHTML = chips.map(([k, v, l]) =>
      `<button class="chip" data-chip="${k}" data-val="${esc(v)}">${esc(l)} <span aria-hidden="true">×</span></button>`).join("") +
      (chips.length ? `<button class="link-btn" id="chipsClear">Clear all</button>` : "");
    syncUrl();
  }
  const update = () => { shown = PAGE_SIZE; render(); };

  function clear() {
    state.sub = "all"; state.extra = null; state.newOnly = false; state.price = maxPrice;
    facets.forEach(f => state[f].clear());
    $("#priceRange").value = maxPrice; $("#newOnly").checked = false;
    el.querySelectorAll("[data-facet]").forEach(c => c.checked = false);
    update();
  }

  el.querySelectorAll("[data-sub]").forEach(b => b.onclick = () => { state.sub = b.dataset.sub; update(); });
  $("#filterPanel").addEventListener("change", e => {
    const c = e.target;
    if (c.dataset.facet) { c.checked ? state[c.dataset.facet].add(c.value) : state[c.dataset.facet].delete(c.value); update(); }
  });
  $("#priceRange").oninput = e => { state.price = +e.target.value; update(); };
  $("#newOnly").onchange = e => { state.newOnly = e.target.checked; update(); };
  $("#sortSelect").onchange = e => { state.sort = e.target.value; update(); };
  $("#clearFilters").onclick = clear;
  $("#emptyClear").onclick = clear;
  $("#loadMoreBtn").onclick = () => { shown += PAGE_SIZE; render(); };
  $("#activeChips").onclick = e => {
    if (e.target.id === "chipsClear") return clear();
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const { chip: k, val } = chip.dataset;
    if (k === "sub") state.sub = "all";
    else if (k === "extra") state.extra = null;
    else if (k === "price") { state.price = maxPrice; $("#priceRange").value = maxPrice; }
    else if (k === "newOnly") { state.newOnly = false; $("#newOnly").checked = false; }
    else { state[k].delete(val); el.querySelectorAll(`[data-facet="${k}"]`).forEach(c => { if (c.value === val) c.checked = false; }); }
    update();
  };
  const closeFilters = () => { $("#filterPanel").classList.remove("open"); document.body.classList.remove("locked"); };
  $("#filterOpen").onclick = () => { $("#filterPanel").classList.add("open"); document.body.classList.add("locked"); };
  $("#filterClose").onclick = closeFilters;
  $("#applyFilters").onclick = () => { closeFilters(); el.scrollIntoView(); };

  render();
  // Lets other page widgets (gift finder, tiles) drive the shop
  shop = {
    set(changes) {
      clear();
      Object.entries(changes).forEach(([k, v]) => {
        if (facets.includes(k)) { state[k].add(v); el.querySelectorAll(`[data-facet="${k}"]`).forEach(c => { if (c.value === v) c.checked = true; }); }
        else if (k === "price") { state.price = Math.min(v, maxPrice); $("#priceRange").value = state.price; }
        else state[k] = v;
      });
      update();
      el.scrollIntoView();
    },
    close: closeFilters,
  };
}

// ---------- Bag ----------
function addToBag(id, size = null, engraving = "", qty = 1) {
  const key = [id, size, engraving].join("|");
  const item = bag.find(i => i.key === key);
  item ? item.qty += qty : bag.push({ key, id, size, engraving, qty });
  save(); renderBag();
  toast(`${byId(id).name} added to your bag`);
}
const bagTotal = () => bag.reduce((s, i) => s + byId(i.id).price * i.qty, 0);

function updateCounts() {
  const bc = $("#bagCount"), wc = $("#wishCount");
  const qty = bag.reduce((s, i) => s + i.qty, 0);
  bc.textContent = qty; bc.classList.toggle("show", qty > 0);
  wc.textContent = wish.size; wc.classList.toggle("show", wish.size > 0);
  const u = currentUser();
  $("#accountInitial").textContent = u ? u.first[0].toUpperCase() : "";
  $("#accountOpen").classList.toggle("signed-in", !!u);
}
const itemMeta = i => [i.size && `Size ${i.size}`, i.engraving && `Engraving: “${esc(i.engraving)}”`].filter(Boolean).join(" · ");

function renderBag() {
  $("#drawerItems").innerHTML = bag.length ? bag.map(i => {
    const p = byId(i.id);
    return `<div class="bag-item">
      <img src="images/${p.img}" alt="">
      <div>
        <h4>${p.name}</h4>${itemMeta(i) ? `<p>${itemMeta(i)}</p>` : ""}<p>${inr(p.price)}</p>
        <div class="qty">
          <button data-qty="-1" data-key="${esc(i.key)}" aria-label="Decrease quantity">−</button><span>${i.qty}</span>
          <button data-qty="1" data-key="${esc(i.key)}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="remove" data-remove="${esc(i.key)}">Remove</button>
    </div>`;
  }).join("") : `<p class="drawer-empty">Your bag is empty.</p><a class="btn-outline full" href="jewellery.html">Discover Jewellery</a>`;
  $("#bagTotal").textContent = inr(bagTotal());
  $("#checkoutBtn").disabled = !bag.length;
  updateCounts();
}
function openDrawer(open) {
  $("#drawer").classList.toggle("open", open);
  $("#backdrop").classList.toggle("open", open);
  document.body.classList.toggle("locked", open);
}
$("#bagOpen").onclick = () => openDrawer(true);
$("#bagClose").onclick = () => openDrawer(false);
$("#backdrop").onclick = () => openDrawer(false);

// ---------- Product detail ----------
const SECTION_OF = p => p.sec.includes("high") ? "high" : p.sec.includes("accessories") ? "accessories" : "jewellery";

function openProduct(id) {
  const p = byId(id);
  const related = products.filter(x => x.id !== id && (x.collection === p.collection || x.cat === p.cat)).slice(0, 4);
  const s = SECTIONS[SECTION_OF(p)];
  $("#productBody").innerHTML = `
    <div class="pd">
      <div class="pd-img" id="pdImg"><img src="images/${p.img}" alt="${esc(p.name)}"></div>
      <form class="pd-info" id="pdForm" novalidate>
        <p class="crumbs"><a href="${s.file}">${s.title}</a> / <a href="${s.file}?collection=${encodeURIComponent(p.collection)}">${p.collection}</a></p>
        <h2>${p.name}</h2>
        <p class="pd-price">${inr(p.price)}</p>
        <p class="pd-long">${p.long}</p>
        <ul class="pd-specs"><li><span>Material</span>${p.material}</li>${p.stone !== "None" ? `<li><span>Gemstone</span>${p.stone}</li>` : ""}<li><span>Collection</span>${p.collection}</li><li><span>Ref.</span>VR-${String(p.id).padStart(5, "0")}</li></ul>
        ${p.sizes ? `
          <fieldset class="sizes"><legend>Select size <a class="link-btn" href="bridal.html#size-guide">Size guide</a></legend>
            ${p.sizes.map(sz => `<label><input type="radio" name="size" value="${sz}"><span>${sz}</span></label>`).join("")}
          </fieldset><p class="field-error" id="sizeError"></p>` : ""}
        ${p.engrave ? `
          <label class="check-line"><input type="checkbox" id="engraveToggle"> Add complimentary engraving</label>
          <div class="field" id="engraveField" hidden>
            <input type="text" id="engraveText" maxlength="15" placeholder="Up to 15 characters" aria-label="Engraving text">
            <small id="engraveCount">0 / 15</small>
          </div>` : ""}
        <div class="pd-buy">
          <div class="qty big">
            <button type="button" id="pdMinus" aria-label="Decrease quantity">−</button><span id="pdQty">1</span>
            <button type="button" id="pdPlus" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-dark" type="submit">${p.price >= 1000000 ? "Add to Bag" : "Add to Bag"}</button>
          <button type="button" class="icon-btn p-wish ${wish.has(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Wishlist">${ICON.heart}</button>
        </div>
        ${p.sec.includes("high") ? `<a class="btn-outline full" href="high-jewellery.html#appointment">Request a private viewing</a>` : ""}
        <details class="pd-acc" open><summary>Complimentary services</summary><p>Free insured express delivery in 2–4 days, signature packaging and returns within 30 days.</p></details>
        <details class="pd-acc"><summary>Care instructions</summary><p>Store separately in its pouch. Clean with a soft cloth and avoid perfume and chlorine.</p></details>
        <details class="pd-acc"><summary>Try it in boutique</summary><p>Reserve this creation at one of our <a href="maison.html#boutiques">boutiques</a> or over a private video call.</p></details>
      </form>
    </div>
    ${related.length ? `<div class="pd-related"><h3>You may also like</h3><div class="product-grid four">${related.map(cardHTML).join("")}</div></div>` : ""}`;

  let qty = 1;
  $("#pdMinus").onclick = () => { qty = Math.max(1, qty - 1); $("#pdQty").textContent = qty; };
  $("#pdPlus").onclick = () => { qty = Math.min(5, qty + 1); $("#pdQty").textContent = qty; };
  const img = $("#pdImg");
  img.onmousemove = e => {
    const r = img.getBoundingClientRect();
    img.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
    img.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
  };
  if (p.engrave) {
    $("#engraveToggle").onchange = e => { $("#engraveField").hidden = !e.target.checked; if (e.target.checked) $("#engraveText").focus(); };
    $("#engraveText").oninput = e => $("#engraveCount").textContent = `${e.target.value.length} / 15`;
  }
  if (p.sizes) $$("[name=size]").forEach(r => r.onchange = () => $("#sizeError").textContent = "");
  $("#pdForm").onsubmit = e => {
    e.preventDefault();
    const size = $("[name=size]:checked")?.value || null;
    if (p.sizes && !size) { $("#sizeError").textContent = "Please select a size."; return; }
    const engraving = p.engrave && $("#engraveToggle").checked ? $("#engraveText").value.trim() : "";
    addToBag(p.id, size, engraving, qty);
    closeModal($("#productModal"));
    openDrawer(true);
  };
  $("#productModal .modal-box").scrollTop = 0;
  openModal("#productModal");
}

// ---------- Account ----------
const field = (id, label, type = "text", attrs = "") =>
  `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${attrs}><p class="field-error" data-err="${id}"></p></div>`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

function showAccount(view = currentUser() ? "profile" : "signin") {
  const body = $("#accountBody");
  const u = currentUser();
  if (view === "signin") {
    body.innerHTML = `
      <h2 id="accountTitle">Sign In</h2>
      <p class="muted">Access your orders, wishlist and personal details.</p>
      <form id="signinForm" novalidate>
        ${field("siEmail", "Email *", "email", 'autocomplete="email"')}
        ${field("siPass", "Password *", "password", 'autocomplete="current-password"')}
        <p class="form-error" id="siError"></p>
        <button class="btn btn-dark full" type="submit">Sign In</button>
      </form>
      <div class="divider"><span>New to VELLORA?</span></div>
      <ul class="perks"><li>Track orders and returns</li><li>Save your wishlist across visits</li><li>Faster checkout</li><li>Invitations to private events</li></ul>
      <button class="btn-outline full" id="toRegister">Create an Account</button>`;
    $("#toRegister").onclick = () => showAccount("register");
    $("#signinForm").onsubmit = async e => {
      e.preventDefault();
      const email = $("#siEmail").value.trim().toLowerCase();
      const user = users[email];
      if (!user || user.pass !== await hash(email + $("#siPass").value)) { $("#siError").textContent = "Email or password is incorrect."; return; }
      session = email; save(); updateCounts();
      toast(`Welcome back, ${user.first}`);
      afterAuth();
    };
  } else if (view === "register") {
    body.innerHTML = `
      <button class="link-btn" id="toSignin">← Back to sign in</button>
      <h2 id="accountTitle">Create an Account</h2>
      <form id="registerForm" novalidate>
        <div class="field"><label for="rgTitle">Title</label>
          <select id="rgTitle"><option>Ms.</option><option>Mrs.</option><option>Mr.</option><option>Mx.</option><option value="">Prefer not to say</option></select></div>
        <div class="field-row">${field("rgFirst", "First name *", "text", 'autocomplete="given-name"')}${field("rgLast", "Last name *", "text", 'autocomplete="family-name"')}</div>
        ${field("rgEmail", "Email *", "email", 'autocomplete="email"')}
        ${field("rgPhone", "Mobile number (+91)", "tel", 'autocomplete="tel" placeholder="10-digit number"')}
        <div class="field-row">
          ${field("rgPass", "Password *", "password", 'autocomplete="new-password"')}
          ${field("rgPass2", "Confirm password *", "password", 'autocomplete="new-password"')}
        </div>
        <div class="strength"><span id="strengthBar"></span></div>
        <p class="hint" id="strengthText">At least 8 characters, with a number and a capital letter.</p>
        <label class="check-line"><input type="checkbox" id="rgNews"> Keep me informed about new collections and events</label>
        <label class="check-line"><input type="checkbox" id="rgTerms"> I accept the Terms of Use and Privacy Policy *</label>
        <p class="field-error" data-err="rgTerms"></p>
        <button class="btn btn-dark full" type="submit">Create Account</button>
      </form>`;
    $("#toSignin").onclick = () => showAccount("signin");
    $("#rgPass").oninput = e => {
      const v = e.target.value;
      const score = [v.length >= 8, /\d/.test(v), /[A-Z]/.test(v), /[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
      $("#strengthBar").style.width = score * 25 + "%";
      $("#strengthBar").dataset.score = score;
      $("#strengthText").textContent = ["At least 8 characters, with a number and a capital letter.", "Weak", "Fair", "Good", "Strong"][score];
    };
    $("#registerForm").onsubmit = async e => {
      e.preventDefault();
      const v = id => $("#" + id).value.trim();
      const errs = {};
      if (!v("rgFirst")) errs.rgFirst = "Please enter your first name.";
      if (!v("rgLast")) errs.rgLast = "Please enter your last name.";
      const email = v("rgEmail").toLowerCase();
      if (!EMAIL_RE.test(email)) errs.rgEmail = "Please enter a valid email.";
      else if (users[email]) errs.rgEmail = "An account with this email already exists.";
      if (v("rgPhone") && !PHONE_RE.test(v("rgPhone"))) errs.rgPhone = "Enter a valid 10-digit mobile number.";
      const pw = $("#rgPass").value;
      if (pw.length < 8 || !/\d/.test(pw) || !/[A-Z]/.test(pw)) errs.rgPass = "Use 8+ characters with a number and a capital letter.";
      if ($("#rgPass2").value !== pw) errs.rgPass2 = "Passwords do not match.";
      if (!$("#rgTerms").checked) errs.rgTerms = "Please accept the terms to continue.";
      $$("#registerForm [data-err]").forEach(el => el.textContent = errs[el.dataset.err] || "");
      $$("#registerForm input").forEach(i => i.classList.toggle("invalid", !!errs[i.id]));
      if (Object.keys(errs).length) { $("#registerForm .invalid")?.focus(); return; }
      users[email] = {
        title: $("#rgTitle").value, first: v("rgFirst"), last: v("rgLast"), email, phone: v("rgPhone"),
        news: $("#rgNews").checked, pass: await hash(email + pw), orders: [], addresses: [], appointments: [],
        created: new Date().toISOString(),
      };
      session = email; save(); updateCounts();
      toast(`Welcome to VELLORA, ${users[email].first}`);
      afterAuth();
    };
  } else {
    const orders = u.orders || [];
    const appts = u.appointments || [];
    body.innerHTML = `
      <h2 id="accountTitle">Hello, ${esc(u.first)}</h2>
      <p class="muted">${esc(u.email)}${u.phone ? " · +91 " + esc(u.phone) : ""}</p>
      <div class="acct-tabs" role="tablist">
        <button class="active" data-tab="orders">Orders (${orders.length})</button>
        <button data-tab="wish">Wishlist (${wish.size})</button>
        <button data-tab="appts">Appointments (${appts.length})</button>
        <button data-tab="details">My Details</button>
      </div>
      <div class="acct-panel" data-panel="orders">
        ${orders.length ? orders.slice().reverse().map(o => `
          <div class="order">
            <div><strong>${o.id}</strong><span>${new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
            <p>${o.items.map(i => `${byId(i.id)?.name || "Item"} × ${i.qty}`).join(", ")}</p>
            <div><span class="status">${o.status}</span><strong>${inr(o.total)}</strong></div>
          </div>`).join("") : `<p class="muted">You have no orders yet.</p>`}
      </div>
      <div class="acct-panel" data-panel="wish" hidden>
        ${wish.size ? [...wish].map(byId).filter(Boolean).map(p => `
          <div class="wish-row"><img src="images/${p.img}" alt=""><div><h4>${p.name}</h4><p>${inr(p.price)}</p></div>
          <button class="link-btn" data-open="${p.id}">View</button></div>`).join("") : `<p class="muted">Your wishlist is empty.</p>`}
      </div>
      <div class="acct-panel" data-panel="appts" hidden>
        ${appts.length ? appts.map(a => `<div class="order"><div><strong>${esc(a.boutique)}</strong><span>${esc(a.date)} · ${esc(a.time)}</span></div><p>${esc(a.topic)}</p></div>`).join("")
          : `<p class="muted">No appointments booked. <a href="maison.html#boutiques">Book one</a>.</p>`}
      </div>
      <div class="acct-panel" data-panel="details" hidden>
        <ul class="pd-specs">
          <li><span>Name</span>${esc([u.title, u.first, u.last].filter(Boolean).join(" "))}</li>
          <li><span>Email</span>${esc(u.email)}</li>
          <li><span>Saved address</span>${u.addresses?.[0] ? esc(`${u.addresses[0].line1}, ${u.addresses[0].city}`) : "None"}</li>
          <li><span>Newsletter</span>${u.news ? "Subscribed" : "Not subscribed"}</li>
          <li><span>Member since</span>${new Date(u.created).toLocaleDateString("en-IN")}</li>
        </ul>
      </div>
      <button class="btn-outline full" id="signOut">Sign Out</button>`;
    body.querySelector(".acct-tabs").onclick = e => {
      const t = e.target.dataset.tab;
      if (!t) return;
      body.querySelectorAll(".acct-tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === t));
      body.querySelectorAll(".acct-panel").forEach(p => p.hidden = p.dataset.panel !== t);
    };
    $("#signOut").onclick = () => { session = null; save(); updateCounts(); showAccount("signin"); toast("You have been signed out"); };
  }
}
let afterAuthHook = null;
function afterAuth() {
  if (afterAuthHook) { const h = afterAuthHook; afterAuthHook = null; closeModal($("#accountModal")); h(); }
  else showAccount("profile");
}
$("#accountOpen").onclick = () => { afterAuthHook = null; showAccount(); openModal("#accountModal"); };
$("#wishOpen").onclick = () => {
  afterAuthHook = null;
  if (currentUser()) { showAccount("profile"); openModal("#accountModal"); $('[data-tab="wish"]').click(); }
  else if (wish.size) { afterAuthHook = () => { showAccount("profile"); openModal("#accountModal"); $('[data-tab="wish"]').click(); }; showAccount("signin"); openModal("#accountModal"); toast("Sign in to see your saved wishlist"); }
  else toast("Tap the heart on any creation to save it");
};

// ---------- Checkout ----------
const STATES = ["Andhra Pradesh", "Delhi", "Goa", "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
const PICKUP = BOUTIQUES.filter(b => !["Rome", "Milan"].includes(b.city)).map(b => `${b.city} — ${b.name}`);
let order = {};
let step = 0;

function openCheckout() {
  if (!bag.length) return;
  openDrawer(false);
  const u = currentUser();
  order = { email: u?.email || "", first: u?.first || "", last: u?.last || "", phone: u?.phone || "", delivery: "express", giftWrap: true, payment: "upi", ...(u?.addresses?.[0] || {}) };
  step = u ? 1 : 0;
  $("#checkout").classList.add("open");
  document.body.classList.add("locked");
  renderCheckout();
}
function closeCheckout() { $("#checkout").classList.remove("open"); document.body.classList.remove("locked"); }
$("#checkoutBtn").onclick = openCheckout;
$("#checkoutBack").onclick = closeCheckout;

function renderSummary() {
  $("#checkoutSummary").innerHTML = `
    <h3>Order Summary</h3>
    ${bag.map(i => { const p = byId(i.id); return `<div class="sum-item"><img src="images/${p.img}" alt=""><div><h4>${p.name}</h4>${itemMeta(i) ? `<p>${itemMeta(i)}</p>` : ""}<p>Qty ${i.qty}</p></div><strong>${inr(p.price * i.qty)}</strong></div>`; }).join("")}
    <div class="sum-line"><span>Subtotal</span><span>${inr(bagTotal())}</span></div>
    <div class="sum-line"><span>Shipping</span><span>Complimentary</span></div>
    ${order.giftWrap ? `<div class="sum-line"><span>Signature gift wrap</span><span>Complimentary</span></div>` : ""}
    <div class="sum-line total-line"><span>Total (incl. GST)</span><strong>${inr(bagTotal())}</strong></div>
    <p class="muted small">Prices include 3% GST on jewellery.</p>`;
}

function renderCheckout() {
  $$("#steps li").forEach((li, i) => { li.classList.toggle("done", i < step); li.classList.toggle("current", i === step); });
  renderSummary();
  const main = $("#checkoutMain");
  const u = currentUser();
  const val = k => esc(order[k] || "");

  if (step === 0) {
    main.innerHTML = `
      <h2>Your Details</h2>
      <div class="co-split">
        <form id="guestForm" novalidate>
          <h4>Checkout as guest</h4>
          ${field("coEmail", "Email *", "email", `autocomplete="email" value="${val("email")}"`)}
          <p class="hint">We'll send your order confirmation here.</p>
          <button class="btn btn-dark full" type="submit">Continue</button>
        </form>
        <div class="co-signin">
          <h4>Have an account?</h4>
          <p class="muted">Sign in for faster checkout and to track your order.</p>
          <button class="btn-outline full" id="coSignin">Sign In</button>
          <button class="link-btn" id="coRegister">Create an account</button>
        </div>
      </div>`;
    const viaAccount = view => { afterAuthHook = () => openCheckout(); showAccount(view); openModal("#accountModal"); };
    $("#coSignin").onclick = () => viaAccount("signin");
    $("#coRegister").onclick = () => viaAccount("register");
    $("#guestForm").onsubmit = e => {
      e.preventDefault();
      const email = $("#coEmail").value.trim();
      if (!EMAIL_RE.test(email)) { $('[data-err="coEmail"]').textContent = "Please enter a valid email."; return; }
      order.email = email; step = 1; renderCheckout();
    };
  }

  if (step === 1) {
    main.innerHTML = `
      <h2>Delivery</h2>
      ${u ? `<p class="muted">Signed in as ${esc(u.email)}</p>` : `<p class="muted">${esc(order.email)} · <button class="link-btn" id="editEmail">Edit</button></p>`}
      <form id="shipForm" novalidate>
        <fieldset class="options">
          <label class="option"><input type="radio" name="delivery" value="express" ${order.delivery === "express" ? "checked" : ""}>
            <span><strong>Express home delivery</strong><small>2–4 business days · insured · Complimentary</small></span></label>
          <label class="option"><input type="radio" name="delivery" value="boutique" ${order.delivery === "boutique" ? "checked" : ""}>
            <span><strong>Collect in boutique</strong><small>Ready in 48 hours · Complimentary</small></span></label>
        </fieldset>
        <div class="field-row">${field("first", "First name *", "text", `value="${val("first")}" autocomplete="given-name"`)}${field("last", "Last name *", "text", `value="${val("last")}" autocomplete="family-name"`)}</div>
        ${field("phone", "Mobile number (+91) *", "tel", `value="${val("phone")}" autocomplete="tel"`)}
        <div class="ship-only">
          ${field("line1", "Address *", "text", `value="${val("line1")}" autocomplete="address-line1"`)}
          ${field("line2", "Apartment, landmark (optional)", "text", `value="${val("line2")}" autocomplete="address-line2"`)}
          <div class="field-row">
            ${field("city", "City *", "text", `value="${val("city")}" autocomplete="address-level2"`)}
            ${field("pin", "PIN code *", "text", `value="${val("pin")}" inputmode="numeric" maxlength="6" autocomplete="postal-code"`)}
          </div>
          <div class="field"><label for="state">State *</label><select id="state"><option value="">Select state</option>${STATES.map(s => `<option ${order.state === s ? "selected" : ""}>${s}</option>`).join("")}</select><p class="field-error" data-err="state"></p></div>
        </div>
        <div class="boutique-only field"><label for="boutique">Boutique *</label><select id="boutique">${PICKUP.map(b => `<option ${order.boutique === b ? "selected" : ""}>${b}</option>`).join("")}</select></div>
        <label class="check-line"><input type="checkbox" id="giftWrap" ${order.giftWrap ? "checked" : ""}> Signature gift wrapping (complimentary)</label>
        <div class="field" id="giftMsgField" ${order.giftWrap ? "" : "hidden"}><label for="giftMsg">Gift message (optional)</label><textarea id="giftMsg" maxlength="200" rows="3">${val("giftMsg")}</textarea></div>
        ${u ? `<label class="check-line"><input type="checkbox" id="saveAddr" checked> Save this address to my account</label>` : ""}
        <div class="co-nav">${u ? "" : `<button type="button" class="link-btn" id="backStep">← Back</button>`}<button class="btn btn-dark" type="submit">Continue to Payment</button></div>
      </form>`;
    const syncMode = () => {
      const boutique = $('[name=delivery]:checked').value === "boutique";
      $(".ship-only").hidden = boutique; $(".boutique-only").hidden = !boutique;
    };
    syncMode();
    $$("[name=delivery]").forEach(r => r.onchange = syncMode);
    $("#giftWrap").onchange = e => { $("#giftMsgField").hidden = !e.target.checked; order.giftWrap = e.target.checked; renderSummary(); };
    $("#editEmail")?.addEventListener("click", () => { step = 0; renderCheckout(); });
    $("#backStep")?.addEventListener("click", () => { step = 0; renderCheckout(); });
    $("#shipForm").onsubmit = e => {
      e.preventDefault();
      const g = id => $("#" + id).value.trim();
      const delivery = $('[name=delivery]:checked').value;
      const errs = {};
      if (!g("first")) errs.first = "Required.";
      if (!g("last")) errs.last = "Required.";
      if (!PHONE_RE.test(g("phone"))) errs.phone = "Enter a valid 10-digit mobile number.";
      if (delivery === "express") {
        if (!g("line1")) errs.line1 = "Please enter your address.";
        if (!g("city")) errs.city = "Required.";
        if (!/^[1-9]\d{5}$/.test(g("pin"))) errs.pin = "Enter a valid 6-digit PIN code.";
        if (!g("state")) errs.state = "Please select a state.";
      }
      $$("#shipForm [data-err]").forEach(el => el.textContent = errs[el.dataset.err] || "");
      $$("#shipForm input, #shipForm select").forEach(i => i.classList.toggle("invalid", !!errs[i.id]));
      if (Object.keys(errs).length) { $("#shipForm .invalid")?.focus(); return; }
      Object.assign(order, {
        delivery, first: g("first"), last: g("last"), phone: g("phone"), line1: g("line1"), line2: g("line2"),
        city: g("city"), pin: g("pin"), state: g("state"), boutique: g("boutique"),
        giftWrap: $("#giftWrap").checked, giftMsg: $("#giftMsg").value.trim(),
      });
      if (u && $("#saveAddr")?.checked && delivery === "express") {
        u.addresses = [{ line1: order.line1, line2: order.line2, city: order.city, pin: order.pin, state: order.state }];
        save();
      }
      step = 2; renderCheckout();
    };
  }

  if (step === 2) {
    main.innerHTML = `
      <h2>Payment</h2>
      <p class="demo-note">This is a demo store — no real payment is taken and no card details are collected.</p>
      <form id="payForm">
        <fieldset class="options">
          ${[["upi", "UPI", "Google Pay, PhonePe, Paytm and more"],
             ["card", "Credit / Debit Card", "Visa, Mastercard, RuPay, Amex — via secure gateway"],
             ["netbanking", "Net Banking", "All major Indian banks"],
             ["emi", "No-cost EMI", "3, 6 or 9 months on select cards"],
             ["boutique", "Pay at Boutique", "Only for boutique collection"]].map(([v, t, s]) => `
            <label class="option"><input type="radio" name="payment" value="${v}" ${order.payment === v ? "checked" : ""} ${v === "boutique" && order.delivery !== "boutique" ? "disabled" : ""}>
              <span><strong>${t}</strong><small>${s}</small></span></label>`).join("")}
        </fieldset>
        <div class="co-nav"><button type="button" class="link-btn" id="backStep">← Back to delivery</button><button class="btn btn-dark" type="submit">Review Order</button></div>
      </form>`;
    $("#backStep").onclick = () => { step = 1; renderCheckout(); };
    $("#payForm").onsubmit = e => { e.preventDefault(); order.payment = $('[name=payment]:checked').value; step = 3; renderCheckout(); };
  }

  if (step === 3) {
    const payLabel = { upi: "UPI", card: "Card (secure gateway)", netbanking: "Net Banking", emi: "No-cost EMI", boutique: "Pay at Boutique" }[order.payment];
    main.innerHTML = `
      <h2>Review &amp; Place Order</h2>
      <div class="review">
        <div><h4>Contact <button class="link-btn" data-goto="${u ? 1 : 0}">Edit</button></h4><p>${esc(order.first)} ${esc(order.last)}<br>${esc(order.email)}<br>+91 ${esc(order.phone)}</p></div>
        <div><h4>${order.delivery === "boutique" ? "Collect in boutique" : "Ship to"} <button class="link-btn" data-goto="1">Edit</button></h4>
          <p>${order.delivery === "boutique" ? esc(order.boutique) : `${esc(order.line1)}${order.line2 ? ", " + esc(order.line2) : ""}<br>${esc(order.city)} ${esc(order.pin)}<br>${esc(order.state)}`}</p></div>
        <div><h4>Payment <button class="link-btn" data-goto="2">Edit</button></h4><p>${payLabel}</p></div>
        ${order.giftWrap ? `<div><h4>Gift</h4><p>Signature wrapping${order.giftMsg ? `<br>“${esc(order.giftMsg)}”` : ""}</p></div>` : ""}
      </div>
      <label class="check-line"><input type="checkbox" id="agree"> I agree to the Terms of Sale and Returns Policy</label>
      <p class="field-error" id="agreeErr"></p>
      <div class="co-nav"><button type="button" class="link-btn" data-goto="2">← Back</button><button class="btn btn-dark" id="placeOrder">Place Order · ${inr(bagTotal())}</button></div>`;
    main.querySelectorAll("[data-goto]").forEach(b => b.onclick = () => { step = +b.dataset.goto; renderCheckout(); });
    $("#placeOrder").onclick = () => {
      if (!$("#agree").checked) { $("#agreeErr").textContent = "Please accept the terms to place your order."; return; }
      const placed = {
        id: "VR" + Date.now().toString().slice(-8), date: new Date().toISOString(), status: "Confirmed",
        items: bag.map(({ id, qty, size, engraving }) => ({ id, qty, size, engraving })), total: bagTotal(),
        delivery: order.delivery, email: order.email,
      };
      if (u) u.orders = [...(u.orders || []), placed];
      bag = []; save(); renderBag();
      step = 4;
      $$("#steps li").forEach(li => { li.classList.add("done"); li.classList.remove("current"); });
      main.innerHTML = `
        <div class="confirm">
          <div class="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></div>
          <h2>Grazie, ${esc(order.first)}!</h2>
          <p>Your order <strong>${placed.id}</strong> has been confirmed.<br>A confirmation will be sent to ${esc(order.email)}.</p>
          <ol class="timeline">
            <li class="done">Order confirmed</li>
            <li>Crafted &amp; quality checked${placed.items.some(i => i.engraving) ? " (engraving 2–3 days)" : ""}</li>
            <li>${order.delivery === "boutique" ? "Ready at " + esc(order.boutique) : "Dispatched with insured express"}</li>
            <li>${order.delivery === "boutique" ? "Collected" : "Delivered"}</li>
          </ol>
          ${u ? `<button class="btn-outline" id="viewOrders">View my orders</button>` :
            `<p class="muted">Create an account to track this order and save your details next time.</p><button class="btn-outline" id="createAfter">Create an Account</button>`}
          <button class="btn btn-dark" id="keepShopping">Continue Shopping</button>
        </div>`;
      $("#keepShopping").onclick = closeCheckout;
      $("#viewOrders")?.addEventListener("click", () => { closeCheckout(); showAccount("profile"); openModal("#accountModal"); });
      $("#createAfter")?.addEventListener("click", () => {
        closeCheckout();
        afterAuthHook = () => { currentUser().orders.push(placed); save(); showAccount("profile"); openModal("#accountModal"); };
        showAccount("register"); openModal("#accountModal");
        $("#rgFirst").value = order.first; $("#rgLast").value = order.last; $("#rgEmail").value = order.email; $("#rgPhone").value = order.phone;
      });
      save();
      $("#checkout").scrollTop = 0;
    };
  }
  $("#checkout").scrollTop = 0;
}

// ---------- Appointment form (used on High Jewellery, Bridal and Maison pages) ----------
function appointmentHTML(topic, preset = "") {
  const u = currentUser();
  return `
    <form class="appt-form" id="apptForm" novalidate>
      <div class="field-row">${field("apName", "Full name *", "text", `autocomplete="name" value="${esc(u ? u.first + " " + u.last : "")}"`)}
        ${field("apPhone", "Mobile (+91) *", "tel", `autocomplete="tel" value="${esc(u?.phone || "")}"`)}</div>
      ${field("apEmail", "Email *", "email", `autocomplete="email" value="${esc(u?.email || "")}"`)}
      <div class="field-row">
        <div class="field"><label for="apBoutique">Boutique *</label><select id="apBoutique">
          <option value="Private video call">Private video call</option>
          ${BOUTIQUES.map(b => `<option ${preset === b.city ? "selected" : ""}>${b.city} — ${b.name}</option>`).join("")}</select></div>
        <div class="field"><label for="apTopic">Interest</label><select id="apTopic">
          ${["High Jewellery", "Engagement & Bridal", "Fine Jewellery", "Bespoke Creation", "Accessories", "Repair & Care"].map(t => `<option ${t === topic ? "selected" : ""}>${t}</option>`).join("")}</select></div>
      </div>
      <div class="field-row">
        ${field("apDate", "Preferred date *", "date", `min="${new Date(Date.now() + 864e5).toISOString().slice(0, 10)}"`)}
        <div class="field"><label for="apTime">Time</label><select id="apTime">${["11:00", "12:30", "14:00", "15:30", "17:00", "18:30"].map(t => `<option>${t}</option>`).join("")}</select></div>
      </div>
      <div class="field"><label for="apMsg">Message (optional)</label><textarea id="apMsg" rows="3" maxlength="400" placeholder="Tell us what you would like to see"></textarea></div>
      <button class="btn btn-dark" type="submit">Request Appointment</button>
      <p class="appt-done" id="apptDone" role="status" hidden></p>
    </form>`;
}
function bindAppointment() {
  const f = $("#apptForm");
  if (!f) return;
  f.onsubmit = e => {
    e.preventDefault();
    const g = id => $("#" + id).value.trim();
    const errs = {};
    if (!g("apName")) errs.apName = "Please enter your name.";
    if (!PHONE_RE.test(g("apPhone"))) errs.apPhone = "Enter a valid 10-digit mobile number.";
    if (!EMAIL_RE.test(g("apEmail"))) errs.apEmail = "Please enter a valid email.";
    if (!g("apDate")) errs.apDate = "Please choose a date.";
    f.querySelectorAll("[data-err]").forEach(el => el.textContent = errs[el.dataset.err] || "");
    f.querySelectorAll("input").forEach(i => i.classList.toggle("invalid", !!errs[i.id]));
    if (Object.keys(errs).length) { f.querySelector(".invalid")?.focus(); return; }
    const appt = { boutique: g("apBoutique"), topic: g("apTopic"), date: new Date(g("apDate")).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }), time: g("apTime") };
    const u = currentUser();
    if (u) { u.appointments = [...(u.appointments || []), appt]; save(); }
    $("#apptDone").hidden = false;
    $("#apptDone").innerHTML = `Grazie, ${esc(g("apName").split(" ")[0])}. Your ${esc(appt.topic.toLowerCase())} appointment at <strong>${esc(appt.boutique)}</strong> on ${esc(appt.date)} at ${esc(appt.time)} is requested. A client advisor will call you to confirm.`;
    f.querySelector("button[type=submit]").disabled = true;
  };
}

// ---------- Section page templates ----------
const hero = (s, extra = "") => `
  <section class="page-hero ${s.dark ? "dark" : ""}">
    <img src="images/${s.hero}" alt="">
    <div class="page-hero-text">
      <nav class="crumbs light" aria-label="Breadcrumb"><a href="index.html">Home</a> / <span>${s.title}</span></nav>
      <p class="eyebrow">${s.eyebrow}</p>
      <h1>${s.title}</h1>
      ${s.intro ? `<p>${s.intro}</p>` : ""}
      ${extra}
    </div>
  </section>`;

const subTiles = (s, base) => `
  <section class="section tight">
    <div class="sub-tiles">
      ${s.subs.map(sub => {
        const items = base.filter(sub.test);
        if (!items.length) return "";
        return `<a class="sub-tile" href="${s.file}?sub=${sub.slug}#shop" data-goto-sub="${sub.slug}">
          <div class="cat-img"><img src="images/${items[0].img}" alt="" loading="lazy"></div>
          <span>${sub.label}</span><small>${items.length} ${items.length === 1 ? "creation" : "creations"}</small></a>`;
      }).join("")}
    </div>
  </section>`;

const shopSection = title => `
  <section class="section" id="shop">
    <div class="section-head"><p class="eyebrow dark">Shop</p><h2>${title}</h2></div>
    <div id="shopMount"></div>
  </section>`;

const collectionCards = (names, file) => `
  <div class="coll-grid">
    ${names.map(n => `<a class="coll-card" href="${file}?collection=${encodeURIComponent(n)}#shop" data-goto-collection="${esc(n)}">
      <img src="images/${COLLECTIONS[n].img}" alt="" loading="lazy">
      <div><h3>${n}</h3><p>${COLLECTIONS[n].text}</p><span>Explore</span></div></a>`).join("")}
  </div>`;

const productRow = ids => `<div class="product-grid four">${ids.map(byId).filter(Boolean).map(cardHTML).join("")}</div>`;

const PAGES = {
  jewellery() {
    const s = SECTIONS.jewellery;
    const base = products.filter(p => p.sec.includes("jewellery"));
    return {
      html: hero(s) + subTiles(s, base) + shopSection("All Jewellery") + `
        <section class="section cream" id="collections">
          <div class="section-head"><p class="eyebrow dark">Signature Lines</p><h2>The Collections</h2></div>
          ${collectionCards(["Aurea Eterna", "Serena", "Luna", "Stella", "Onda", "Catene", "Polychroma"], s.file)}
        </section>
        <section class="split">
          <div class="split-img"><img src="images/hands-model.jpg" alt="Hands wearing gold rings and bracelets" loading="lazy"></div>
          <div class="split-text"><p class="eyebrow dark">Style Notes</p><h2>The Art of Layering</h2>
            <p>Mix chains of different lengths, stack fine rings with one bold piece and pair yellow with rose gold — Roman women have done it for two thousand years.</p>
            <a class="btn btn-dark" href="jewellery.html?collection=Catene#shop">Shop Catene</a></div>
        </section>
        <section class="section" id="care">
          <div class="section-head"><p class="eyebrow dark">Client Services</p><h2>Jewellery Care</h2></div>
          <div class="info-grid">
            <div><h4>Everyday care</h4><p>Put jewellery on last and take it off first. Avoid perfume, lotion and chlorine, and store each piece in its own pouch.</p></div>
            <div><h4>Cleaning</h4><p>Wipe gold and platinum with a soft lint-free cloth. Diamonds can be bathed in warm soapy water and dried with a soft brush.</p></div>
            <div><h4>Complimentary service</h4><p>Bring your VELLORA creations to any boutique for a free yearly clean, polish and stone check by our jewellers.</p></div>
            <div><h4>Repairs &amp; resizing</h4><p>Rings can be resized once free of charge within the first year. Repairs are quoted within 48 hours.</p></div>
          </div>
        </section>`,
      shop: { base, subs: s.subs, facets: s.facets },
    };
  },

  high() {
    const s = SECTIONS.high;
    const base = products.filter(p => p.sec.includes("high"));
    return {
      html: hero(s, `<a class="btn btn-light" href="#appointment">Request a Private Viewing</a>`) + `
        <section class="section" id="collections">
          <div class="section-head"><p class="eyebrow dark">Masterpieces</p><h2>High Jewellery Collections</h2></div>
          <div class="showcase">
            ${["Giardino Segreto", "Magnifica", "Fiore di Roma"].map((n, i) => `
              <div class="show-row ${i % 2 ? "rev" : ""}">
                <div class="show-img"><img src="images/${COLLECTIONS[n].img}" alt="" loading="lazy"></div>
                <div class="show-text"><p class="eyebrow dark">Collection</p><h3>${n}</h3><p>${COLLECTIONS[n].text}</p>
                  <p class="muted">${base.filter(p => p.collection === n).length} creations</p>
                  <a class="btn btn-dark" href="${s.file}?collection=${encodeURIComponent(n)}#shop" data-goto-collection="${esc(n)}">Discover ${n}</a></div>
              </div>`).join("")}
          </div>
        </section>` + shopSection("High Jewellery Creations") + `
        <section class="section dark-band" id="gemstones">
          <div class="section-head"><p class="eyebrow">The Gemstone Journey</p><h2>Rare Stones, Chosen One by One</h2></div>
          <div class="gem-grid">
            ${[["Diamond", "#e9eef2", "Exceptional white diamonds, D–F colour, internally flawless."],
               ["Emerald", "#1f7a55", "Colombian emeralds with a velvety, saturated green."],
               ["Sapphire", "#1f3f8a", "Cornflower Ceylon and royal blue Kashmir-type sapphires."],
               ["Ruby", "#9b1b30", "Untreated Burmese rubies of pigeon-blood red."],
               ["Amethyst", "#7a4fa0", "Deep Siberian amethysts, often paired with citrine."]].map(([g, c, t]) => `
              <a class="gem" href="${s.file}?stone=${g}#shop" data-goto-stone="${g}"><span class="gem-dot" style="--c:${c}"></span><h4>${g}</h4><p>${t}</p></a>`).join("")}
          </div>
        </section>
        <section class="split" id="bespoke">
          <div class="split-text"><p class="eyebrow dark">Bespoke</p><h2>A Jewel Made Only for You</h2>
            <p>From the first sketch to the final polish, our designers and master jewellers create a unique piece around your story — usually over six to nine months, with a gemstone selection presented privately.</p>
            <ol class="steps-list"><li><strong>Consultation</strong> with a designer in Rome or India</li><li><strong>Gemstone selection</strong> from our private reserve</li><li><strong>Gouache drawings</strong> and wax model</li><li><strong>Crafting</strong> by hand in our atelier</li></ol></div>
          <div class="split-img"><img src="images/necklace-diamond.jpg" alt="Diamond necklace on a display bust" loading="lazy"></div>
        </section>
        <section class="section cream" id="appointment">
          <div class="appt-wrap"><div><p class="eyebrow dark">By Appointment</p><h2>Request a Private Viewing</h2>
            <p class="muted">High jewellery is presented privately in our salons or at a place of your choosing. A client advisor will contact you within 24 hours.</p></div>
            ${appointmentHTML("High Jewellery")}</div>
        </section>`,
      shop: { base, subs: s.subs, facets: s.facets },
    };
  },

  bridal() {
    const s = SECTIONS.bridal;
    const base = products.filter(p => p.sec.includes("bridal"));
    const C4 = {
      Cut: "Cut decides how brilliantly a diamond returns light. We only set diamonds graded Excellent or Very Good, cut for maximum fire.",
      Colour: "Graded from D (colourless) to Z. Our engagement diamonds are D to G — icy white and timeless in any metal.",
      Clarity: "Measures natural inclusions. Every centre stone is VS2 or better, so nothing is visible to the eye.",
      Carat: "The weight of the diamond: 1 carat = 0.2 g. Our solitaires range from 0.30ct to over 5ct, all certified by GIA or IGI.",
    };
    return {
      html: hero(s, `<a class="btn btn-light" href="#appointment">Book a Bridal Appointment</a>`) + subTiles(s, base) + shopSection("Bridal Creations") + `
        <section class="section cream" id="guide">
          <div class="section-head"><p class="eyebrow dark">Diamond Guide</p><h2>The 4Cs</h2></div>
          <div class="tabs" role="tablist">${Object.keys(C4).map((k, i) => `<button role="tab" class="${i ? "" : "active"}" data-c="${k}" aria-selected="${!i}">${k}</button>`).join("")}</div>
          <p class="tab-text" id="c4Text">${C4.Cut}</p>
        </section>
        <section class="section" id="shapes">
          <div class="section-head"><p class="eyebrow dark">Find Your Shape</p><h2>Diamond Shapes</h2></div>
          <div class="shape-grid">
            ${[["Round", '<circle cx="20" cy="20" r="15"/>'], ["Oval", '<ellipse cx="20" cy="20" rx="11" ry="16"/>'],
               ["Emerald", '<path d="M13 4h14l7 7v18l-7 7H13l-7-7V11z"/>'], ["Cushion", '<rect x="5" y="5" width="30" height="30" rx="9"/>'],
               ["Pear", '<path d="M20 3c6 9 13 15 13 23a13 13 0 0 1-26 0c0-8 7-14 13-23z"/>'], ["Princess", '<rect x="6" y="6" width="28" height="28"/>']]
              .map(([n, d]) => `<a class="shape" href="bridal.html?sub=engagement#shop"><svg viewBox="0 0 40 40">${d}</svg><span>${n}</span></a>`).join("")}
          </div>
        </section>
        <section class="section cream" id="size-guide">
          <div class="section-head"><p class="eyebrow dark">Find the Perfect Fit</p><h2>Ring Size Guide</h2></div>
          <div class="size-wrap">
            <div class="info-grid two"><div><h4>Measure a ring you own</h4><p>Measure the inside diameter of a ring that fits, edge to edge, in millimetres and find it in the table.</p></div>
              <div><h4>Measure your finger</h4><p>Wrap a strip of paper around the base of your finger, mark where it meets, and measure the length — that is your circumference.</p></div></div>
            <table class="size-table"><thead><tr><th>VELLORA size</th><th>Circumference (mm)</th><th>Diameter (mm)</th><th>Indian size</th></tr></thead>
              <tbody>${[[48, 48, 15.3, 8], [50, 50, 15.9, 10], [52, 52, 16.5, 12], [54, 54, 17.2, 14], [56, 56, 17.8, 16], [58, 58, 18.5, 18]]
                .map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>
            <p class="muted">Still unsure? Order your best guess — the first resize is complimentary.</p>
          </div>
        </section>
        <section class="section" id="services">
          <div class="section-head"><p class="eyebrow dark">For Life</p><h2>Bridal Services</h2></div>
          <div class="info-grid">
            <div><h4>Complimentary engraving</h4><p>Initials, a date or a short message engraved inside the band by hand.</p></div>
            <div><h4>Free resizing</h4><p>Your first resize is on us, in boutique or by insured courier.</p></div>
            <div><h4>Lifetime cleaning</h4><p>Bring your rings back any time for a professional clean and stone check.</p></div>
            <div><h4>Certified diamonds</h4><p>Every centre diamond over 0.30ct comes with a GIA or IGI certificate.</p></div>
          </div>
        </section>
        <section class="section cream" id="appointment">
          <div class="appt-wrap"><div><p class="eyebrow dark">Together</p><h2>Book a Bridal Appointment</h2>
            <p class="muted">Discover engagement rings and wedding bands with a bridal specialist, in boutique or over video.</p></div>
            ${appointmentHTML("Engagement & Bridal")}</div>
        </section>`,
      shop: { base, subs: s.subs, facets: s.facets },
      after() {
        $$(".tabs button").forEach(b => b.onclick = () => {
          $$(".tabs button").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
          $("#c4Text").textContent = C4[b.dataset.c];
        });
      },
    };
  },

  accessories() {
    const s = SECTIONS.accessories;
    const base = products.filter(p => p.sec.includes("accessories"));
    return {
      html: hero(s) + subTiles(s, base) + shopSection("All Accessories") + `
        <section class="split">
          <div class="split-img"><img src="images/bag-woven.jpg" alt="Woven leather handbag" loading="lazy"></div>
          <div class="split-text"><p class="eyebrow dark">Made in Italy</p><h2>The Florentine Workshop</h2>
            <p>Each bag is cut from full-grain calf leather and assembled by a single artisan over twelve to twenty hours, with hardware finished in palladium or gold by our jewellers.</p>
            <a class="btn btn-dark" href="accessories.html?sub=bags#shop">Shop Bags</a></div>
        </section>
        <section class="split rev">
          <div class="split-text"><p class="eyebrow dark">For Him</p><h2>The Gentleman's Edit</h2>
            <p>Briefcases, wallets, sunglasses and bold gold chains — understated pieces built to be used every day for years.</p>
            <a class="btn btn-dark" href="accessories.html?sub=mens#shop">Shop Men's</a></div>
          <div class="split-img"><img src="images/men-suit.jpg" alt="Man in a navy suit" loading="lazy"></div>
        </section>`,
      shop: { base, subs: s.subs, facets: s.facets },
    };
  },

  gifts() {
    const s = SECTIONS.gifts;
    const base = products.filter(p => p.sec.includes("gifts"));
    return {
      html: hero(s, `<a class="btn btn-light" href="#finder">Open the Gift Finder</a>`) + `
        <section class="section cream" id="finder">
          <div class="section-head"><p class="eyebrow dark">Gift Finder</p><h2>Find the Perfect Gift</h2></div>
          <form class="finder" id="finderForm">
            <label>For<select id="fWho"><option value="">Anyone</option><option value="her">Her</option><option value="him">Him</option><option value="couple">A couple</option></select></label>
            <label>Occasion<select id="fOcc"><option value="">Any occasion</option>${Object.entries(OCCASIONS).map(([k, o]) => `<option value="${k}">${o.label}</option>`).join("")}</select></label>
            <label>Budget<select id="fBudget"><option value="">Any budget</option><option value="100000">Under ₹1,00,000</option><option value="150000">Under ₹1,50,000</option><option value="300000">Under ₹3,00,000</option></select></label>
            <button class="btn btn-dark" type="submit">Show Gifts</button>
          </form>
        </section>
        <section class="section tight">
          <div class="gift-grid">
            <a href="gifts.html?sub=her#shop" class="gift-card big" data-goto-sub="her"><img src="images/necklace-gold-model.jpg" alt="" loading="lazy"><div class="gift-label"><h3>Gifts for Her</h3><span>Discover</span></div></a>
            <a href="gifts.html?sub=him#shop" class="gift-card" data-goto-sub="him"><img src="images/wallet.jpg" alt="" loading="lazy"><div class="gift-label"><h3>Gifts for Him</h3><span>Discover</span></div></a>
            <a href="gifts.html?sub=under-1l#shop" class="gift-card" data-goto-sub="under-1l"><img src="images/earrings-pink.jpg" alt="" loading="lazy"><div class="gift-label"><h3>Under ₹1,00,000</h3><span>Discover</span></div></a>
          </div>
        </section>` + shopSection("All Gifts") + `
        <section class="section" id="services">
          <div class="section-head"><p class="eyebrow dark">With Love</p><h2>Gift Services</h2></div>
          <div class="info-grid">
            <div><h4>Signature packaging</h4><p>Every gift arrives in our lacquered box with a silk ribbon, at no extra cost.</p></div>
            <div><h4>Handwritten message</h4><p>Add a personal note at checkout and our calligrapher will write it by hand.</p></div>
            <div><h4>Easy exchanges</h4><p>Gifts can be exchanged within 30 days — the receipt never shows the price.</p></div>
            <div><h4>Scheduled delivery</h4><p>Choose the perfect day, and we will deliver it by insured courier.</p></div>
          </div>
        </section>`,
      shop: { base, subs: s.subs, facets: s.facets, extra: { param: "occasion", options: OCCASIONS } },
      after() {
        $("#finderForm").onsubmit = e => {
          e.preventDefault();
          const changes = {};
          if ($("#fWho").value) changes.sub = $("#fWho").value;
          if ($("#fOcc").value) changes.extra = $("#fOcc").value;
          if ($("#fBudget").value) changes.price = +$("#fBudget").value;
          shop.set(changes);
        };
      },
    };
  },

  maison() {
    const s = SECTIONS.maison;
    const timeline = [
      ["1924", "Founded in Rome", "Goldsmith Marco Vellora opens a workshop near the Spanish Steps."],
      ["1938", "Via Condotti", "The first boutique opens on Rome's most elegant street."],
      ["1955", "Colour arrives", "Cabochon gemstones in bold combinations become the Maison's signature."],
      ["1972", "Serena is born", "The arch-inspired collection becomes an instant icon."],
      ["1998", "Florentine leather", "A leather workshop in Florence launches the first VELLORA bags."],
      ["2012", "VELLORA in India", "The first Indian boutique opens in Mumbai's Kala Ghoda."],
      ["2024", "A century", "One hundred years celebrated with the Aurea Eterna collection."],
    ];
    return {
      html: `
        <section class="page-hero">
          <img src="images/colosseum.jpg" alt="">
          <div class="page-hero-text"><nav class="crumbs light" aria-label="Breadcrumb"><a href="index.html">Home</a> / <span>The Maison</span></nav>
            <p class="eyebrow">Since 1924</p><h1>The Maison</h1><p>A century of Roman audacity — colour, volume and gold, set by hand.</p></div>
        </section>
        <nav class="page-tabs" aria-label="On this page">
          <a href="#heritage">Heritage</a><a href="#icons">Icons</a><a href="#ateliers">Ateliers</a><a href="#sustainability">Sustainability</a><a href="#boutiques">Boutiques</a><a href="#careers">Careers</a>
        </nav>
        <section class="section" id="heritage">
          <div class="section-head"><p class="eyebrow dark">Our Story</p><h2>A Century of Roman Splendour</h2></div>
          <ol class="h-timeline">${timeline.map(([y, t, d]) => `<li><a href="history.html#y${y}"><span class="year">${y}</span><h4>${t}</h4><p>${d}</p></a></li>`).join("")}</ol>
          <p class="center"><a class="btn btn-dark" href="history.html">Read Our Full History</a></p>
        </section>
        <section class="section cream" id="icons">
          <div class="section-head"><p class="eyebrow dark">Timeless</p><h2>Icons of the Maison</h2></div>
          ${productRow([7, 1, 9, 4])}
        </section>
        <section class="split" id="ateliers">
          <div class="split-img"><img src="images/model-ring.jpg" alt="Woman wearing a gold ring and necklace" loading="lazy"></div>
          <div class="split-text"><p class="eyebrow dark">Craftsmanship</p><h2>From Sketch to Jewel</h2>
            <p>More than 300 artisans work in our Roman ateliers. A single high jewellery necklace passes through the hands of designers, wax modellers, goldsmiths, setters and polishers.</p>
            <ol class="steps-list"><li><strong>Design</strong> — gouache drawings at life size</li><li><strong>Modelling</strong> — carved in wax or metal</li><li><strong>Goldsmithing</strong> — cast, assembled and soldered</li><li><strong>Setting</strong> — every stone placed by hand</li><li><strong>Polishing</strong> — until the gold glows</li></ol></div>
        </section>
        <section class="section" id="sustainability">
          <div class="section-head"><p class="eyebrow dark">Commitments</p><h2>Responsible Luxury</h2></div>
          <div class="stats big"><div><strong data-count="100">0</strong><span>% recycled or certified gold</span></div>
            <div><strong data-count="100">0</strong><span>% diamonds Kimberley Process compliant</span></div>
            <div><strong data-count="40">0</strong><span>% less energy in our ateliers since 2018</span></div></div>
          <div class="info-grid"><div><h4>Traceable gemstones</h4><p>We buy from mines and cutters audited to the Responsible Jewellery Council standard.</p></div>
            <div><h4>Recycled gold</h4><p>All our gold is recycled or comes from certified responsible sources.</p></div>
            <div><h4>Artisan schools</h4><p>The VELLORA Foundation trains 60 young goldsmiths every year in Rome and Jaipur.</p></div></div>
        </section>
        <section class="section cream" id="boutiques">
          <div class="section-head"><p class="eyebrow dark">Visit Us</p><h2>Find a Boutique</h2></div>
          <div class="city-filter" id="cityFilter"><button class="filter active" data-city="all">All</button>
            <button class="filter" data-city="India">India</button><button class="filter" data-city="Italy">Italy</button></div>
          <div class="boutique-grid" id="boutiqueGrid">
            ${BOUTIQUES.map(b => `<div class="boutique" data-country="${["Rome", "Milan"].includes(b.city) ? "Italy" : "India"}">
              <h4>${b.city}</h4><p class="b-name">${b.name}</p><p>${b.addr}</p><p>Open daily ${b.hours}</p><p><a href="tel:${b.phone.replace(/\s/g, "")}">${b.phone}</a></p>
              <button class="link-btn" data-book="${b.city}">Book an appointment here</button></div>`).join("")}
          </div>
          <div class="appt-wrap" id="appointment"><div><h2>Book an Appointment</h2><p class="muted">Meet a client advisor in boutique or over a private video call.</p></div>
            <div id="apptMount">${appointmentHTML("Fine Jewellery")}</div></div>
        </section>
        <section class="section" id="careers">
          <div class="section-head"><p class="eyebrow dark">Join Us</p><h2>Careers</h2></div>
          <div class="info-grid"><div><h4>Client Advisor</h4><p>Mumbai · New Delhi · Bengaluru</p></div>
            <div><h4>Apprentice Goldsmith</h4><p>Rome atelier · 2-year programme</p></div>
            <div><h4>Visual Merchandiser</h4><p>Mumbai · Full time</p></div>
            <div><h4>E-commerce Specialist</h4><p>Remote, India · Full time</p></div></div>
          <p class="center muted">Send your CV to careers@vellora.example</p>
        </section>`,
      after() {
        $("#cityFilter").onclick = e => {
          const c = e.target.dataset.city;
          if (!c) return;
          $$("#cityFilter .filter").forEach(b => b.classList.toggle("active", b === e.target));
          $$(".boutique").forEach(b => b.hidden = c !== "all" && b.dataset.country !== c);
        };
        $("#boutiqueGrid").onclick = e => {
          const city = e.target.dataset.book;
          if (!city) return;
          $("#apptMount").innerHTML = appointmentHTML("Fine Jewellery", city);
          bindAppointment();
          $("#appointment").scrollIntoView();
        };
      },
    };
  },

  history() {
    const ch = HISTORY;
    return {
      html: `
        <section class="hist-hero">
          <img src="images/colosseum.jpg" alt="The Colosseum in Rome at dusk">
          <div class="hist-hero-text">
            <nav class="crumbs light" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="maison.html">The Maison</a> / <span>History</span></nav>
            <p class="eyebrow">1924 — Today</p>
            <h1>Our History</h1>
            <p>A century of Roman audacity, told in gold</p>
          </div>
          <a href="#hist-intro" class="scroll-cue" aria-label="Start reading"></a>
        </section>
        <section class="hist-intro" id="hist-intro">
          <p class="hist-lead">From a single workbench near the Spanish Steps to boutiques from Rome to Mumbai, VELLORA has always worked the same way: by hand, in gold, with colour, volume and a little Roman audacity.</p>
          <div class="hist-figures">
            <div><strong>1924</strong><span>Founded in Rome</span></div>
            <div><strong>3</strong><span>Generations of the family</span></div>
            <div><strong>300+</strong><span>Artisans today</span></div>
            <div><strong>42</strong><span>Boutiques worldwide</span></div>
          </div>
        </section>
        <nav class="decade-nav" id="decadeNav" aria-label="Decades">
          <div class="decade-progress"><span id="histProgress"></span></div>
          <div class="decade-links">${ch.map(c => `<a href="#y${c.year}" data-year="${c.year}">${c.decade}</a>`).join("")}</div>
        </nav>
        <div class="chapters">
          ${ch.map((c, i) => c.full ? `
            <section class="chapter full" id="y${c.year}">
              <img src="images/${c.img}" alt="${esc(c.alt)}" loading="lazy" class="${c.vintage ? "vintage" : ""}">
              <div class="chapter-full-text">
                <span class="ch-year">${c.year}</span>
                <h2>${c.title}</h2>
                ${c.text.map(t => `<p>${t}</p>`).join("")}
              </div>
            </section>` : `
            <section class="chapter ${i % 2 ? "rev" : ""}" id="y${c.year}">
              <figure class="ch-img"><img src="images/${c.img}" alt="${esc(c.alt)}" loading="lazy" class="${c.vintage ? "vintage" : ""}">
                ${c.caption ? `<figcaption>${c.caption}</figcaption>` : ""}</figure>
              <div class="ch-text">
                <span class="ch-year">${c.year}</span>
                <p class="eyebrow dark">${c.decade}</p>
                <h2>${c.title}</h2>
                ${c.text.map(t => `<p>${t}</p>`).join("")}
                ${c.quote ? `<blockquote>“${c.quote.text}”<cite>— ${c.quote.by}</cite></blockquote>` : ""}
                ${c.product ? `<button class="ch-product" data-open="${c.product}">
                  <img src="images/${byId(c.product).img}" alt=""><span><small>Born in this era</small>${byId(c.product).name}<em>Discover the creation</em></span></button>` : ""}
                ${c.link ? `<a class="link-arrow" href="${c.link.h}">${c.link.t} →</a>` : ""}
              </div>
            </section>`).join("")}
        </div>
        <section class="hist-end">
          <p class="eyebrow dark">The story continues</p>
          <h2>Written by hand, every day</h2>
          <p>Every jewel that leaves our atelier adds a line to this story. Discover what the next century begins with.</p>
          <div class="hist-end-links">
            <a class="duo-card" href="maison.html#ateliers"><img src="images/hands-model.jpg" alt="" loading="lazy"><div><h3>The Ateliers</h3><span>Discover</span></div></a>
            <a class="duo-card" href="high-jewellery.html"><img src="images/necklace-diamond.jpg" alt="" loading="lazy"><div><h3>High Jewellery</h3><span>Discover</span></div></a>
            <a class="duo-card" href="jewellery.html?collection=Aurea Eterna#shop"><img src="images/hero.jpg" alt="" loading="lazy"><div><h3>Aurea Eterna</h3><span>Discover</span></div></a>
          </div>
        </section>`,
      after() {
        // Scroll-spy: highlight the decade in view and fill the progress bar
        const links = $$("#decadeNav a");
        const spy = new IntersectionObserver(entries => {
          entries.forEach(en => {
            if (!en.isIntersecting) return;
            links.forEach(a => {
              const on = "y" + a.dataset.year === en.target.id;
              a.classList.toggle("active", on);
              if (on) a.scrollIntoView({ block: "nearest", inline: "center" });
            });
          });
        }, { rootMargin: "-45% 0px -50% 0px" });
        $$(".chapter").forEach(c => spy.observe(c));
        const box = $(".chapters");
        const onScroll = () => {
          const r = box.getBoundingClientRect();
          const k = Math.min(1, Math.max(0, (innerHeight / 2 - r.top) / r.height));
          $("#histProgress").style.width = k * 100 + "%";
        };
        addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        $$(".chapter, .hist-figures, .hist-lead, .hist-end").forEach(el => { el.classList.add("reveal"); io.observe(el); });
      },
    };
  },

  home() {
    return {
      shop: {
        base: products.filter(p => p.isNew || ["Icon", "Bridal", "Gift"].includes(p.tag)),
        subs: [
          { slug: "rings", label: "Rings", test: isCat("rings") },
          { slug: "necklaces", label: "Necklaces", test: isCat("necklaces") },
          { slug: "bracelets", label: "Bracelets", test: isCat("bracelets") },
          { slug: "earrings", label: "Earrings", test: isCat("earrings") },
          { slug: "accessories", label: "Accessories", test: isCat("accessories") },
        ],
        facets: ["material", "stone"],
      },
    };
  },
};

// ---------- Global click delegation ----------
document.addEventListener("click", e => {
  const open = e.target.closest("[data-open]");
  const add = e.target.closest("[data-add]");
  const w = e.target.closest("[data-wish]");
  const rm = e.target.closest("[data-remove]");
  const q = e.target.closest("[data-qty]");
  if (open) {
    e.preventDefault();
    closeModal($("#accountModal")); $("#searchOverlay").classList.remove("open");
    openProduct(+open.dataset.open);
  }
  if (add) addToBag(+add.dataset.add);
  if (w) {
    const id = +w.dataset.wish;
    wish.has(id) ? wish.delete(id) : wish.add(id);
    $$(`[data-wish="${id}"]`).forEach(b => b.classList.toggle("on", wish.has(id)));
    save(); updateCounts();
    toast(wish.has(id) ? "Saved to your wishlist" : "Removed from wishlist");
  }
  if (rm) { bag = bag.filter(i => i.key !== rm.dataset.remove); save(); renderBag(); }
  if (q) {
    const item = bag.find(i => i.key === q.dataset.key);
    item.qty = Math.min(5, item.qty + +q.dataset.qty);
    if (item.qty < 1) bag = bag.filter(i => i !== item);
    save(); renderBag();
  }
  // Tiles on the same page drive the shop directly instead of reloading
  if (shop) {
    const t = e.target.closest("[data-goto-sub], [data-goto-collection], [data-goto-stone]");
    if (t) {
      e.preventDefault();
      if (t.dataset.gotoSub) shop.set({ sub: t.dataset.gotoSub });
      if (t.dataset.gotoCollection) shop.set({ collection: t.dataset.gotoCollection });
      if (t.dataset.gotoStone) shop.set({ stone: t.dataset.gotoStone });
    }
  }
});

// ---------- Mega menu ----------
const ACTIVE_FILE = { jewellery: "jewellery.html", high: "high-jewellery.html", bridal: "bridal.html", accessories: "accessories.html", gifts: "gifts.html", maison: "maison.html", history: "maison.html" }[PAGE];
$("#navList").innerHTML = menu.map((m, i) => `
  <li class="nav-item">
    <a class="nav-top ${m.h === ACTIVE_FILE ? "current" : ""}" href="${m.h}" aria-expanded="false" aria-controls="mega${i}" ${m.h === ACTIVE_FILE ? 'aria-current="page"' : ""}>${m.label}
      <svg viewBox="0 0 24 24" class="chev"><path d="M6 9l6 6 6-6"/></svg></a>
    <div class="mega" id="mega${i}">
      <div class="mega-inner">
        <div class="mega-cols">
          ${m.cols.map(c => `<div class="mega-col"><h6>${c.title}</h6>${c.links.map(l => `<a href="${l.h}">${l.t}</a>`).join("")}</div>`).join("")}
        </div>
        <a class="mega-feature" href="${m.feature.h}"><img src="images/${m.feature.img}" alt="" loading="lazy"><span>${m.feature.caption}</span><em>Discover</em></a>
      </div>
      <a class="mega-all" href="${m.h}">View all ${m.label}</a>
    </div>
  </li>`).join("");

const navItems = $$(".nav-item");
const isMobile = () => matchMedia("(max-width: 860px)").matches;
function setOpen(item, open) {
  item.classList.toggle("open", open);
  item.querySelector(".nav-top").setAttribute("aria-expanded", open);
}
function closeMenus() { navItems.forEach(it => setOpen(it, false)); }
function closeNav() { closeMenus(); $("#nav").classList.remove("open"); }
navItems.forEach(item => {
  let t;
  item.addEventListener("mouseenter", () => {
    if (isMobile()) return;
    clearTimeout(t);
    t = setTimeout(() => { closeMenus(); setOpen(item, true); }, 120);
  });
  item.addEventListener("mouseleave", () => {
    if (isMobile()) return;
    clearTimeout(t);
    t = setTimeout(() => setOpen(item, false), 150);
  });
  // Touch / mobile: first tap opens the panel; the "View all" link inside navigates
  item.querySelector(".nav-top").addEventListener("click", e => {
    if (!isMobile() && !matchMedia("(hover: none)").matches) return;
    e.preventDefault();
    const open = !item.classList.contains("open");
    closeMenus(); setOpen(item, open);
  });
  item.addEventListener("keydown", e => { if (e.key === "Escape") { setOpen(item, false); item.querySelector(".nav-top").focus(); } });
  item.querySelector(".nav-top").addEventListener("focus", () => { if (!isMobile()) { closeMenus(); setOpen(item, true); } });
});
document.addEventListener("focusin", e => { if (!e.target.closest(".nav")) closeMenus(); });
// Same-page links (e.g. jewellery.html?sub=rings while on jewellery.html) reload with the new filters
$("#nav").addEventListener("click", e => { if (e.target.closest(".mega a")) closeNav(); });
document.addEventListener("click", e => { if (!e.target.closest(".nav")) closeMenus(); });
$("#menuToggle").onclick = () => $("#nav").classList.add("open");
$("#menuClose").onclick = closeNav;

// ---------- Search ----------
const overlay = $("#searchOverlay");
$("#searchOpen").onclick = () => { overlay.classList.add("open"); setTimeout(() => $("#searchInput").focus(), 50); };
$("#searchClose").onclick = () => overlay.classList.remove("open");
$("#searchInput").addEventListener("input", e => {
  const words = e.target.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const res = words.length ? products.filter(p => {
    const hay = [p.name, p.desc, p.cat, p.material, p.stone, p.collection, ...(p.tags || [])].join(" ").toLowerCase();
    return words.every(w => hay.includes(w.replace(/s$/, "")));
  }) : [];
  $("#searchResults").innerHTML = res.map(cardHTML).join("") ||
    (words.length ? `<p class="search-hint">No results for “${esc(e.target.value)}”.</p>` : "");
});
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const m = $(".modal.open");
  if (m) return closeModal(m);
  overlay.classList.remove("open"); openDrawer(false); closeNav(); shop?.close();
});

// ---------- Misc ----------
const promos = $$(".promo-track span");
let pi = 0;
promos[0].classList.add("on");
setInterval(() => {
  promos[pi].classList.remove("on");
  pi = (pi + 1) % promos.length;
  promos[pi].classList.add("on");
}, 3500);
window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", scrollY > 10), { passive: true });
$("#newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  $("#formMsg").textContent = "Grazie! You are now subscribed to VELLORA news.";
  e.target.reset();
});

// ---------- Boot the page ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll("[data-count]").forEach(el => {
      const end = +el.dataset.count, start = performance.now();
      const stepFn = t => {
        const k = Math.min((t - start) / 1500, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + (k === 1 && end >= 100 ? "+" : "");
        if (k < 1) requestAnimationFrame(stepFn);
      };
      requestAnimationFrame(stepFn);
    });
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });

const pageDef = PAGES[PAGE]?.();
if (pageDef?.html) $("#page").innerHTML = pageDef.html;
if (pageDef?.shop) mountShop($("#shopMount"), pageDef.shop);
pageDef?.after?.();
bindAppointment();
renderBag();

$$(".section-head, .cat-grid, .split-text, .gift-grid, .maison-text, .stats, .services, .newsletter, .coll-grid, .h-timeline")
  .forEach(el => { el.classList.add("reveal"); io.observe(el); });

// Deep links: ?product=ID opens the product, #anchor scrolls once content exists
const deep = +new URLSearchParams(location.search).get("product");
if (deep && byId(deep)) openProduct(deep);
if (location.hash.length > 1) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
