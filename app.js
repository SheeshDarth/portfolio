(function () {
  "use strict";

  var menuButton = document.getElementById("menuButton");
  var mobileMenu = document.getElementById("mobileMenu");

  if (!menuButton || !mobileMenu) {
    return;
  }

  var focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

  function isOpen() {
    return menuButton.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    var firstLink = mobileMenu.querySelector("a[href]");
    if (firstLink) {
      firstLink.focus();
    }
  }

  function closeMenu(returnFocus) {
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    if (returnFocus) {
      menuButton.focus();
    }
  }

  menuButton.addEventListener("click", function () {
    if (isOpen()) {
      closeMenu(true);
    } else {
      openMenu();
    }
  });

  mobileMenu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!isOpen()) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    var focusable = Array.prototype.slice.call(mobileMenu.querySelectorAll(focusableSelector));
    focusable.unshift(menuButton);

    if (focusable.length < 2) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  var desktopQuery = window.matchMedia("(min-width: 50.0625rem)");
  function handleDesktopChange(event) {
    if (event.matches && isOpen()) {
      closeMenu(false);
    }
  }

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleDesktopChange);
  } else {
    desktopQuery.addListener(handleDesktopChange);
  }
})();
