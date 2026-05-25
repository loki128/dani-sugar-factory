/* =========================================================
   DANI SUGAR FACTORY — COOKIE CATALOG
   Mock-up catalog @ $6/cookie. Wire to real Shopify later.
   ========================================================= */

const PRODUCTS = [
  {
    id: "cookies-and-cream",
    title: "Cookies & Cream",
    sub: "crushed chocolate cookies, vanilla cream pockets",
    price: 6,
    badge: "Bestseller",
    image: "assets/products/cookie-cookies-and-cream.jpg",
    fallbackGradient: "linear-gradient(135deg, #FFF6E9 0%, #C8B8A8 50%, #3D2419 100%)",
  },
  {
    id: "chocolate-chip",
    title: "Chocolate Chip",
    sub: "the classic, dark + milk chocolate chunks",
    price: 6,
    badge: null,
    image: "assets/products/cookie-chocolate-chip.jpg",
    fallbackGradient: "linear-gradient(135deg, #E6C896 0%, #B07845 50%, #5C3A21 100%)",
  },
  {
    id: "strawberry",
    title: "Strawberry",
    sub: "freeze-dried strawberry, pink dough, light glaze",
    price: 6,
    badge: "New",
    image: "assets/products/cookie-strawberry.jpg",
    fallbackGradient: "linear-gradient(135deg, #FFB7E5 0%, #FF6FB5 50%, #E63056 100%)",
  },
  {
    id: "oatmeal-raisin",
    title: "Oatmeal Raisin",
    sub: "rolled oats, plump golden raisins",
    price: 6,
    badge: null,
    image: "assets/products/cookie-oatmeal-raisin.jpg",
    fallbackGradient: "linear-gradient(135deg, #F2E4C9 0%, #D4A044 50%, #8B5E2B 100%)",
  },
  {
    id: "snickerdoodle",
    title: "Snickerdoodle",
    sub: "rolled in cinnamon sugar, soft & tangy",
    price: 6,
    badge: null,
    image: "assets/products/cookie-snickerdoodle.jpg",
    fallbackGradient: "linear-gradient(135deg, #FFE7CC 0%, #D4A044 50%, #8B5E2B 100%)",
  },
  {
    id: "double-chocolate",
    title: "Double Chocolate",
    sub: "dark cocoa dough, dark chocolate pools",
    price: 6,
    badge: "Bestseller",
    image: "assets/products/cookie-double-chocolate.jpg",
    fallbackGradient: "linear-gradient(135deg, #5C3A21 0%, #3D2419 60%, #1F1208 100%)",
  },
  {
    id: "peanut-butter",
    title: "Peanut Butter",
    sub: "crisscross fork pattern, real peanut pieces",
    price: 6,
    badge: null,
    image: "assets/products/cookie-peanut-butter.jpg",
    fallbackGradient: "linear-gradient(135deg, #FFE7CC 0%, #D4A044 50%, #8B5E2B 100%)",
  },
  {
    id: "sugar-cookie",
    title: "Sugar Cookie",
    sub: "crystal sugar dusted, pillowy soft center",
    price: 6,
    badge: null,
    image: "assets/products/cookie-sugar-cookie.jpg",
    fallbackGradient: "linear-gradient(135deg, #FFF6E9 0%, #F2E4C9 50%, #D4B89A 100%)",
  },
];

const grid = document.getElementById("product-grid");
const cartCountEl = document.querySelector(".cart-count");
let cartCount = 0;

function renderProducts() {
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card__media" style="background: ${p.fallbackGradient};">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.title} cookie" loading="lazy"
             onerror="this.style.display='none'" />
      </div>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.title}</h3>
        <p class="product-card__sub">${p.sub}</p>
        <div class="product-card__meta">
          <span class="product-card__price">$${p.price}</span>
          <button class="product-card__add" data-add="${p.id}" aria-label="Add ${p.title} cookie to cart">
            Add to box
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => onAddToCart(e, btn));
  });
}

function onAddToCart(e, btn) {
  cartCount++;
  if (cartCountEl) cartCountEl.textContent = cartCount;

  const originalText = btn.textContent;
  btn.textContent = "Added ✓";
  btn.classList.add("is-added");
  btn.disabled = true;

  if (cartCountEl && cartCountEl.parentElement) {
    cartCountEl.parentElement.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.18)" },
        { transform: "scale(1)" },
      ],
      { duration: 360, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
    );
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove("is-added");
    btn.disabled = false;
  }, 1400);
}

renderProducts();

console.log("[ecom] cookie catalog rendered with", PRODUCTS.length, "products @ $6 ea");
