// wait for the DOM to load first before executing the script
document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below
    callStickyNavBarFunction();
    callOpenMobileMenu();
  }
});

const callStickyNavBarFunction = () => {
  const headerScrolledSticky = document.querySelector("header.container-fluid");

  window.addEventListener("scroll", () => {
    let scrollDown = window.scrollY;
    if (scrollDown >= 5) {
      headerScrolledSticky.classList.add("scrolled");
    } else if (scrollDown <= 5) {
      headerScrolledSticky.classList.remove("scrolled");
    }
  });
};

const callOpenMobileMenu = () => {
  // TODO:
  /* Event Listener for the button to hide and show menu */
  const mobileMenuBtn = document.getElementById("openCloseMobileNav");
  const revealMobileMenuNavLinks = document.querySelector(
    ".navigation-links-parent"
  );
  const bodyFixedScroll = document.querySelector("body");
  const addClassToFadeOut = document.querySelector(".navigation-links-parent");

  mobileMenuBtn.addEventListener("click", (e) => {
    if (mobileMenuBtn.getAttribute("aria-label") == "Open Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Close Navigation");
      mobileMenuBtn.classList.add("nav-toggle--close");
      revealMobileMenuNavLinks.classList.add("show-mobile-menu");
      bodyFixedScroll.classList.add("fixed-modal-reveal");
    } else if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
      mobileMenuBtn.classList.remove("nav-toggle--close");

      // add class before closing for fadeout animation of mobile nav
      addClassToFadeOut.classList.add("fade-out-animate");

      setTimeout(() => {
        bodyFixedScroll.classList.remove("fixed-modal-reveal");
        revealMobileMenuNavLinks.classList.remove("show-mobile-menu");
        addClassToFadeOut.classList.remove("fade-out-animate");
      }, 150);
    }
  });
};
