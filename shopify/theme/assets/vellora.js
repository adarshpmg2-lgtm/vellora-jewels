// VELLORA theme behaviour: header, mega menu, AJAX cart drawer, product form,
// collection toolbar, and the editorial widgets (history, 4Cs, gift finder, boutiques).
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const V = window.VELLORA;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function formatMoney(cents, format = V.moneyFormat) {
    const value = (cents / 100);
    const fmt = (n, dec, thou = ",", decSep = ".") => {
      const [i, d] = n.toFixed(dec).split(".");
      return i.replace(/\B(?=(\d{3})+(?!\d))/g, thou) + (d ? decSep + d : "");
    };
    // Indian grouping (₹1,25,000) for amount_no_decimals when the store uses INR
    const indian = n => {
      const s = Math.round(n).toString(), last3 = s.slice(-3), rest = s.slice(0, -3);
      return (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + last3;
    };
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => ({
      amount: fmt(value, 2), amount_no_decimals: indian(value),
      amount_with_comma_separator: fmt(value, 2, ".", ","), amount_no_decimals_with_comma_separator: fmt(value, 0, "."),
    }[key] ?? fmt(value, 2)));
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  // ---------- Header ----------
  const promos = $$(".promo-track span");
  if (promos.length) {
    let i = 0; promos[0].classList.add("on");
    if (promos.length > 1) setInterval(() => { promos[i].classList.remove("on"); i = (i + 1) % promos.length; promos[i].classList.add("on"); }, 3500);
  }
  addEventListener("scroll", () => $("#header")?.classList.toggle("scrolled", scrollY > 10), { passive: true });

  const isMobile = () => matchMedia("(max-width: 860px)").matches;
  const navItems = $$(".nav-item");
  const setOpen = (item, open) => { item.classList.toggle("open", open); item.querySelector(".nav-top")?.setAttribute("aria-expanded", open); };
  const closeMenus = () => navItems.forEach(it => setOpen(it, false));
  const closeNav = () => { closeMenus(); $("#nav")?.classList.remove("open"); };
  navItems.forEach(item => {
    const top = item.querySelector(".nav-top");
    const hasMega = !!item.querySelector(".mega");
    let t;
    item.addEventListener("mouseenter", () => { if (isMobile() || !hasMega) return; clearTimeout(t); t = setTimeout(() => { closeMenus(); setOpen(item, true); }, 120); });
    item.addEventListener("mouseleave", () => { if (isMobile()) return; clearTimeout(t); t = setTimeout(() => setOpen(item, false), 150); });
    top.addEventListener("click", e => {
      if (!hasMega || (!isMobile() && !matchMedia("(hover: none)").matches)) return;
      e.preventDefault();
      const open = !item.classList.contains("open");
      closeMenus(); setOpen(item, open);
    });
    top.addEventListener("focus", () => { if (!isMobile() && hasMega) { closeMenus(); setOpen(item, true); } });
    item.addEventListener("keydown", e => { if (e.key === "Escape") { setOpen(item, false); top.focus(); } });
  });
  document.addEventListener("focusin", e => { if (!e.target.closest(".nav")) closeMenus(); });
  document.addEventListener("click", e => { if (!e.target.closest(".nav")) closeMenus(); });
  $("#menuToggle")?.addEventListener("click", () => $("#nav").classList.add("open"));
  $("#menuClose")?.addEventListener("click", closeNav);

  // ---------- Cart drawer ----------
  const drawer = $("#drawer");
  const openDrawer = open => {
    drawer?.classList.toggle("open", open);
    $("#backdrop")?.classList.toggle("open", open);
    document.body.classList.toggle("locked", open);
  };
  $("#bagOpen")?.addEventListener("click", e => { if (!drawer) return; e.preventDefault(); refreshCart().then(() => openDrawer(true)); });
  $("#bagClose")?.addEventListener("click", () => openDrawer(false));
  $("#backdrop")?.addEventListener("click", () => openDrawer(false));

  async function refreshCart() {
    const cart = await fetch(V.routes.cart + ".js", { headers: { Accept: "application/json" } }).then(r => r.json());
    const count = $("#bagCount");
    if (count) { count.textContent = cart.item_count; count.classList.toggle("show", cart.item_count > 0); }
    const box = $("#drawerItems");
    if (box) {
      box.innerHTML = cart.items.length ? cart.items.map((item, i) => {
        const props = Object.entries(item.properties || {}).filter(([k, v]) => v && !k.startsWith("_"))
          .map(([k, v]) => `${esc(k)}: “${esc(v)}”`);
        const meta = [item.variant_title, ...props].filter(Boolean).join(" · ");
        return `<div class="bag-item">
          ${item.image ? `<img src="${item.image}${item.image.includes("?") ? "&" : "?"}width=160" alt="" width="80" height="80" loading="lazy">` : "<span></span>"}
          <div><h4><a href="${item.url}">${esc(item.product_title)}</a></h4>${meta ? `<p>${meta}</p>` : ""}<p>${formatMoney(item.final_price)}</p>
            <div class="qty"><button data-line="${i + 1}" data-qty="${item.quantity - 1}" aria-label="−">−</button><span>${item.quantity}</span><button data-line="${i + 1}" data-qty="${item.quantity + 1}" aria-label="+">+</button></div></div>
          <button class="remove" data-line="${i + 1}" data-qty="0">${esc(V.strings.remove)}</button></div>`;
      }).join("") : `<p class="drawer-empty">${esc(V.strings.empty)}</p>`;
    }
    const total = $("#bagTotal");
    if (total) total.textContent = formatMoney(cart.total_price);
    const btn = $("#checkoutBtn");
    if (btn) btn.disabled = !cart.item_count;
    return cart;
  }
  $("#drawerItems")?.addEventListener("click", async e => {
    const b = e.target.closest("[data-line]");
    if (!b) return;
    b.disabled = true;
    await fetch(V.routes.cartChange + ".js", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ line: +b.dataset.line, quantity: Math.max(0, +b.dataset.qty) }),
    });
    refreshCart();
  });

  // Any product form marked data-ajax-cart adds without leaving the page
  document.addEventListener("submit", async e => {
    const form = e.target.closest("form[data-ajax-cart]");
    if (!form || !drawer) return;
    e.preventDefault();
    const err = form.querySelector("[data-error]");
    if (form.dataset.needsSize && !form.querySelector("[name=id]").value) {
      if (err) err.textContent = form.dataset.needsSize;
      return;
    }
    const btn = form.querySelector("[type=submit]");
    btn && (btn.disabled = true);
    try {
      const res = await fetch(V.routes.cartAdd + ".js", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.description || V.strings.error);
      if (err) err.textContent = "";
      await refreshCart();
      toast(`${data.product_title} — ${V.strings.added}`);
      openDrawer(true);
    } catch (ex) {
      if (err) err.textContent = ex.message; else toast(ex.message);
    } finally { btn && (btn.disabled = false); }
  });

  // ---------- Product page ----------
  $$("[data-product-form]").forEach(form => {
    const variants = JSON.parse(form.querySelector("[data-variants]")?.textContent || "[]");
    const idInput = form.querySelector("[name=id]");
    const price = $("[data-price]");
    const btn = form.querySelector("[type=submit]");
    form.querySelectorAll("[data-option]").forEach(r => r.addEventListener("change", () => {
      const v = variants.find(x => x.option1 === r.value);
      if (!v) return;
      idInput.value = v.id;
      if (price) price.textContent = formatMoney(v.price);
      btn.disabled = !v.available;
      btn.textContent = v.available ? btn.dataset.add : btn.dataset.soldout;
      form.querySelector("[data-error]").textContent = "";
      history.replaceState(null, "", `${location.pathname}?variant=${v.id}`);
    }));
    const engr = form.querySelector("[data-engrave-toggle]");
    const engrField = form.querySelector("[data-engrave-field]");
    const engrInput = engrField?.querySelector("input");
    engr?.addEventListener("change", () => {
      engrField.hidden = !engr.checked;
      engrInput.disabled = !engr.checked;
      if (engr.checked) engrInput.focus();
    });
    engrInput?.addEventListener("input", () => form.querySelector("[data-engrave-count]").textContent = `${engrInput.value.length} / 15`);
    const qty = form.querySelector("[name=quantity]");
    form.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => {
      qty.value = Math.min(5, Math.max(1, +qty.value + +b.dataset.step));
      form.querySelector("[data-qty-label]").textContent = qty.value;
    }));
  });
  $$("[data-zoom]").forEach(img => img.addEventListener("mousemove", e => {
    const r = img.getBoundingClientRect();
    img.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
    img.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
  }));
  $$("[data-thumb]").forEach(t => t.addEventListener("click", () => {
    const main = $("[data-zoom] img");
    main.src = t.dataset.thumb; main.srcset = "";
    $$("[data-thumb]").forEach(x => x.classList.toggle("active", x === t));
  }));
  const recos = $("[data-recommendations]");
  if (recos) fetch(recos.dataset.recommendations).then(r => r.text()).then(html => {
    const el = new DOMParser().parseFromString(html, "text/html").querySelector("[data-recommendations]");
    if (el && el.innerHTML.trim()) recos.innerHTML = el.innerHTML;
  });

  // ---------- Collection toolbar ----------
  $("#sortSelect")?.addEventListener("change", e => {
    const u = new URL(location.href);
    u.searchParams.set("sort_by", e.target.value);
    location.href = u;
  });
  $("#filterOpen")?.addEventListener("click", () => { $("#filterPanel").classList.add("open"); document.body.classList.add("locked"); });
  const closeFilters = () => { $("#filterPanel")?.classList.remove("open"); document.body.classList.remove("locked"); };
  $("#filterClose")?.addEventListener("click", closeFilters);
  $("#applyFilters")?.addEventListener("click", closeFilters);
  // Native storefront filters submit on change
  $$("[data-filter-form]").forEach(f => f.addEventListener("change", () => f.requestSubmit ? f.requestSubmit() : f.submit()));

  // ---------- Editorial widgets ----------
  $$("[data-tabs]").forEach(wrap => {
    const btns = $$("[data-tab]", wrap), panels = $$("[data-panel]", wrap);
    btns.forEach(b => b.addEventListener("click", () => {
      btns.forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
      panels.forEach(p => p.hidden = p.dataset.panel !== b.dataset.tab);
    }));
  });

  $$("[data-gift-finder]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const tags = $$("select", f).map(s => s.value).filter(Boolean);
    location.href = f.dataset.giftFinder + (tags.length ? "/" + tags.join("+") : "");
  }));

  $$("[data-city-filter]").forEach(wrap => wrap.addEventListener("click", e => {
    const c = e.target.dataset.city;
    if (!c) return;
    $$(".filter", wrap).forEach(b => b.classList.toggle("active", b === e.target));
    $$(".boutique").forEach(b => b.hidden = c !== "all" && b.dataset.country !== c);
  }));
  $$("[data-book]").forEach(b => b.addEventListener("click", () => {
    const sel = $("#ContactBoutique");
    if (sel) { sel.value = [...sel.options].find(o => o.text.startsWith(b.dataset.book))?.value || sel.value; }
    $("#appointment")?.scrollIntoView({ behavior: "smooth" });
  }));

  // History: highlight the decade in view and fill the progress bar
  const decadeLinks = $$("#decadeNav a");
  if (decadeLinks.length) {
    const spy = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      decadeLinks.forEach(a => {
        const on = a.getAttribute("href") === "#" + en.target.id;
        a.classList.toggle("active", on);
        if (on) a.scrollIntoView({ block: "nearest", inline: "center" });
      });
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$(".chapter").forEach(c => spy.observe(c));
    const box = $(".chapters"), bar = $("#histProgress");
    const onScroll = () => {
      const r = box.getBoundingClientRect();
      bar.style.width = Math.min(1, Math.max(0, (innerHeight / 2 - r.top) / r.height)) * 100 + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll + number counters
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    $$("[data-count]", en.target).forEach(el => {
      const end = +el.dataset.count, suffix = el.dataset.suffix || "", start = performance.now();
      const step = t => {
        const k = Math.min((t - start) / 1500, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffix : "");
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.unobserve(en.target);
  }), { threshold: 0.15 });
  if (!window.Shopify?.designMode) $$("[data-reveal]").forEach(el => { el.classList.add("reveal"); io.observe(el); });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    openDrawer(false); closeNav(); closeFilters();
  });
  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
})();
