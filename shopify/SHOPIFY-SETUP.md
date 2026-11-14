# Moving VELLORA to Shopify

Two files do the work, both in `shopify/out/`:

| File | What it is | Where it goes |
|---|---|---|
| `vellora-products.csv` | All 52 products with photos, prices (₹), sizes and tags | Admin → **Products** → **Import** |
| `vellora-theme.zip` | The VELLORA design: mega menu, section pages, History page, cart drawer | Admin → **Online Store → Themes** → **Add theme → Upload zip file** |

About 20 minutes in total. Do the steps in order.

---

## 1. Store settings (2 min)

1. **Settings → Markets** (or **Settings → General**): set the store currency to **Indian Rupee (INR)**. The prices in the CSV are in rupees.
2. **Settings → Customer accounts**: turn accounts **on**. Classic or new accounts both work: sign-in, registration and order history are handled by Shopify.

## 2. Import the products (3 min)

1. **Products → Import → Add file** → choose `vellora-products.csv`.
2. Leave "Overwrite products with matching handles" unticked the first time → **Upload and preview** → **Import products**.
3. Shopify downloads the photos from Unsplash in the background. Allow a few minutes before all the images appear.

Each product arrives with:
- Its **Type** (Rings, Necklaces, Bracelets, Earrings or Accessories).
- **Sizes as variants** for rings and bracelets.
- **Tags** that the theme uses for collections and filters. Don't rename these tags.

## 3. Create the five collections (5 min)

**Products → Collections → Create collection**, five times. For each one:
- Choose **Automated**, with the condition **Product tag — is equal to — the tag below**.
- On the right, set **Theme template** to the template below. It appears once the theme from step 4 is uploaded, so you can come back and set it then.
- Check that the **handle** (URL) at the bottom matches exactly. The menus link to these handles.

| Title | Handle | Tag condition | Theme template |
|---|---|---|---|
| Jewellery | `jewellery` | `sec-jewellery` | `collection.jewellery` |
| High Jewellery | `high-jewellery` | `sec-high` | `collection.high-jewellery` |
| Bridal | `bridal` | `sec-bridal` | `collection.bridal` |
| Accessories | `accessories` | `sec-accessories` | `collection.accessories` |
| Gifts | `gifts` | `sec-gifts` | `collection.gifts` |

Suggested descriptions, which show on each page's banner:
- **Jewellery**: Rings, necklaces, bracelets and earrings crafted in 18k gold and platinum — the colour, volume and audacity of Rome, to wear every day.
- **High Jewellery**: One-of-a-kind masterpieces set with the rarest gemstones in the world, each one born from more than a thousand hours of work in our Roman atelier.
- **Bridal**: Engagement rings, wedding bands and bridal jewellery, with complimentary engraving and a private appointment to choose together.
- **Accessories**: Handbags, small leather goods, eyewear and silk, made in Italy by artisans who bring the same precision as our jewellers.
- **Gifts**: Find the perfect present for every person and every occasion — each gift arrives in our signature box with a handwritten message.

## 4. Upload and publish the theme (3 min)

1. **Online Store → Themes → Add theme → Upload zip file** → choose `vellora-theme.zip`.
2. Click **Customize** to preview it. The home page, header and footer are already filled in.
3. When you're happy, click **Publish**.

## 5. Create the Maison and History pages (3 min)

**Online Store → Pages → Add page**, twice:

| Title | Handle | Theme template |
|---|---|---|
| The Maison | `maison` | `page.maison` |
| Our History | `history` | `page.history` |

Leave the page content empty. The template already holds the timeline, chapters, boutiques, appointment form and other sections. You can edit every chapter, photo and text later in **Customize**: pick the page from the top dropdown.

## 6. Menu (nothing to do)

The full VELLORA mega menu is built into the theme, with all 88 links pointing at the collections and pages above. It shows automatically while your **Main menu** has no nested links. That's true of the default menu.

If you'd rather manage the menu yourself, edit **Online Store → Navigation → Main menu** with three levels:
- **Top item**: for example, Jewellery.
- **Column heading**: for example, Categories.
- **Links**: for example, Rings → `/collections/jewellery/rings`.

As soon as the menu has nested links, the theme uses yours instead.

## 7. Optional extras

- **Price and availability filters**: install Shopify's free **Search & Discovery** app and add filters. The collection pages show them automatically, next to the built-in Metal, Gemstone and Collection filters.
- **Your own photos**: in **Customize**, every banner and tile has an image picker. The bundled Unsplash images are only defaults.
- **Appointment and newsletter forms** use Shopify's contact form. Requests arrive in your store's email inbox, and subscribers appear in **Customers**.

---

## How the links work

The theme filters products by tag through the URL, for example:

- `/collections/jewellery/rings`: rings only.
- `/collections/jewellery/collection-serena`: the Serena collection.
- `/collections/bridal/engagement+stone-diamond`: diamond engagement rings.
- `/collections/gifts/him+under-1-5l`: gifts for him under ₹1,50,000.

The tag groups are:

| Group | Tags |
|---|---|
| Category | `rings`, `necklaces`, `bracelets`, `earrings`, `accessories` |
| Sub-category | `engagement`, `bands`, `eternity`, `bridal-jewellery`, `mens`, `bags`, `slg`, `eyewear`, `silk` |
| Filters | `material-…`, `stone-…`, `collection-…`, `new` |
| Gifts | `her`, `him`, `couple`, `under-1l`, `under-1-5l`, `under-3l`, `exceptional`, `occasion-…` |
| Collections | `sec-…` decides which of the five collections a product is in |
| Product options | `engravable` turns on the free engraving box on the product page |

## What changes compared with the local demo

- **Accounts, cart, checkout and payments** are now real Shopify features. The demo's browser-only versions aren't used.
- **Wishlist**: Shopify has no built-in wishlist, so the heart buttons are gone. A wishlist app can add them back.
- **Engraving** is saved on the order as a note on that item, so you'll see it in **Orders**.

## Rebuilding after changes

If you edit the local site's `data.js` or `styles.css`, regenerate both files from the `luxe-jewels` folder:

```bash
node shopify/build.js
```

To re-run Shopify's theme checker:

```bash
node shopify/.tools/check.js
```

Run the checker from inside `shopify/.tools`.
