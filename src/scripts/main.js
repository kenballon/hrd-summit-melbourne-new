// wait for the DOM to load first before executing the script
document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below
    callStickyNavBarFunction();
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

const callHamburgerMenuReveal = () => {
  // TODO:
  /* Event Listener for the button to hide and show menu */
};
