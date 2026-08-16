/* Siddharth P — portfolio. Two behaviors: mobile menu toggle, back-to-top. */
(function () {
  "use strict";

  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      var open = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!open));
      mobileMenu.classList.toggle("open", !open);
    });
    Array.prototype.forEach.call(mobileMenu.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        hamburger.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
      });
    });
  }

  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
