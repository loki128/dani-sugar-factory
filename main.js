/* =========================================================
   DANI SUGAR FACTORY V2 — MAIN
   Minimal: cursor → CSS variable mask + ENTER → curtain → shop.
   ========================================================= */

const splash      = document.getElementById("splash");
const shop        = document.getElementById("shop");
const enterBtn    = document.getElementById("enter-btn");
const curtain     = document.getElementById("curtain");
const cursorPearl = document.querySelector(".cursor-pearl");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const touchOnly     = window.matchMedia("(hover: none), (pointer: coarse)").matches;

let entering = false;
const pearl = { tx: window.innerWidth / 2, ty: window.innerHeight / 2, x: window.innerWidth / 2, y: window.innerHeight / 2 };

/* -------------------------------------------------------
   1. Cursor → CSS variables on the splash.
   The .candy-overlay (inset:0 of splash) reads these to drive
   its radial mask. One source of truth, no per-element math.
   ------------------------------------------------------- */
function setCursorPos(clientX, clientY) {
  if (splash) {
    const r = splash.getBoundingClientRect();
    splash.style.setProperty("--cursor-x", `${clientX - r.left}px`);
    splash.style.setProperty("--cursor-y", `${clientY - r.top}px`);
  }
  pearl.tx = clientX;
  pearl.ty = clientY;
}

function tickPearl() {
  pearl.x += (pearl.tx - pearl.x) * 0.22;
  pearl.y += (pearl.ty - pearl.y) * 0.22;
  if (cursorPearl) {
    cursorPearl.style.transform = `translate(${pearl.x}px, ${pearl.y}px) translate(-50%, -50%)`;
  }
  requestAnimationFrame(tickPearl);
}

if (!touchOnly) {
  setCursorPos(window.innerWidth / 2, window.innerHeight / 2);
  document.addEventListener("pointermove", (e) => setCursorPos(e.clientX, e.clientY), { passive: true });
  if (enterBtn) {
    enterBtn.addEventListener("mouseenter", () => cursorPearl && cursorPearl.classList.add("is-on-target"));
    enterBtn.addEventListener("mouseleave", () => cursorPearl && cursorPearl.classList.remove("is-on-target"));
  }
  requestAnimationFrame(tickPearl);
}

/* -------------------------------------------------------
   2. ENTER click → curtain transition → shop reveal
   ------------------------------------------------------- */
function revealShop() {
  if (entering) return;
  entering = true;
  // Show shop immediately so curtain reveal lands on it
  shop.classList.add("is-revealed");

  if (reducedMotion) {
    splash.style.display = "none";
    if (cursorPearl) cursorPearl.style.display = "none";
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    return;
  }

  // Vanilla JS curtain animation — no GSAP dependency
  const panes = curtain.querySelectorAll("span");

  // Phase 1: panes slam down (stagger)
  panes.forEach((p, i) => {
    p.style.transition = `transform 0.55s cubic-bezier(0.6, 0, 0.2, 1) ${i * 0.06}s`;
    p.style.transform = "translateY(0%)";
  });

  // Phase 2: hide splash + scroll to shop
  setTimeout(() => {
    splash.style.display = "none";
    if (cursorPearl) cursorPearl.style.display = "none";
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "smooth";
  }, 850);

  // Phase 3: panes lift up (stagger from opposite side)
  setTimeout(() => {
    const reversed = Array.from(panes).reverse();
    reversed.forEach((p, i) => {
      p.style.transition = `transform 0.7s cubic-bezier(0.6, 0, 0.2, 1) ${i * 0.05}s`;
      p.style.transform = "translateY(101%)";
    });
  }, 950);

  // Phase 4: fade in product cards in stagger
  setTimeout(() => {
    document.querySelectorAll(".product-card").forEach((card, idx) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(28px)";
      card.style.transition = `opacity 0.7s ease-out ${idx * 0.06}s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.06}s`;
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    });
  }, 1100);
}

if (enterBtn) {
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    revealShop();
  });
}

/* -------------------------------------------------------
   3. Build-a-box size card → smooth scroll to menu
   ------------------------------------------------------- */
document.querySelectorAll(".size-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

console.log("[main] v2 polished — splash + shop wired");
