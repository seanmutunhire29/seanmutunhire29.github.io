(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("mobile-nav");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Don't leave the page scroll-locked if the window grows past the breakpoint.
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  // Fade in on scroll: reveal each element once, when 20% of it is in view.
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
