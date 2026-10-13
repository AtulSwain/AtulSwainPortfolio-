(function () {
  const root = document.documentElement;

  // Theme: remembers the visitor's choice, otherwise follows the system.
  const stored = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (stored) root.dataset.theme = stored;

  document.querySelector(".theme").addEventListener("click", () => {
    const current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  });

  // Nav border on scroll
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const items = document.querySelectorAll(".reveal, .case");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Active nav link
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && spy.observe(s));

  // Copy email
  const copy = document.querySelector(".copy");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.copy);
      copy.textContent = "Copied";
    } catch {
      copy.textContent = copy.dataset.copy;
    }
    setTimeout(() => (copy.textContent = "Copy email"), 1800);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
