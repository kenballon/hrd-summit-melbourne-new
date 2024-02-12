// import { CarouselSlider } from "./CarouselSlider.js"; 

let primaryColor = document.getElementById("siteColor");
let bgImage = document.getElementById("hero-section");
let rangeInputValue = document.getElementById("range_input_value")?.value;
const stopLenis = document.querySelectorAll("[data-lenis-stop]");
const startLenis = document.querySelectorAll(".modal");
const closeFooterModalBtn = document.querySelectorAll(".modal-footer");
const closeSpeakerModalBtn = document.querySelectorAll(".speaker_modal_close");
const lenis = new Lenis();

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below
    console.log(
      "%cDesign: Kenneth Ballon - https://kenballon.netlify.app/\nBuild By: Kenneth Ballon & Theresa Lacatan",
      "color: white; background-color: black;"
    );

    newAnnouncement();

    document.addEventListener("resize", () => {
      newAnnouncement();
    });

    pageSmoothScrolling();
    callOpenMobileMenu();
    showAndHideNavBar(".header", "__header-nav-hidden");
    showAndHideMobileEventPartner(
      ".event-partner-logo-container.show-on-mobile",
      "__show-n-hide"
    );

    pageScrollZoom();

    window.addEventListener("resize", () => {
      if (bgImage) {
        bgImage.style.backgroundSize = "cover";
      }
      pageScrollZoom();
    });

    // Update countdown on page load
    updateCountdown();

    // Update countdown every second
    setInterval(updateCountdown, 1000);

    if (document.cookie.indexOf("popupShown=true") === -1) {
      showPopup("popupModal", "show", "#popupModal .popup-btn-close");
    }

    // stop lenis scrolling
    stopLenis.forEach((modalItemPop) => {
      modalItemPop.addEventListener("click", () => {
        lenis.stop();
      });
    });

    // start lenis scrolling
    startLenis.forEach((startScroll) => {
      startScroll.addEventListener("click", (e) => {
        if (e.target === startScroll) {
          lenis.start();
        }
      });
    });

    closeFooterModalBtn.forEach((startScroll) => {
      startScroll.addEventListener("click", (e) => {
        if (e.target === startScroll || e.target.closest(".modal-footer")) {
          lenis.start();
        }
      });
    });

    closeSpeakerModalBtn.forEach((startScroll) => {
      startScroll.addEventListener("click", (e) => {
        if (
          e.target === startScroll ||
          e.target.closest(".speaker_modal_close")
        ) {
          lenis.start();
        }
      });
    });

    const gallerySliderObj = {
      parentSlider: ".gallery_slide_mask",
      prevBtn: "handle_prev_slide",
      nextBtn: "handle_next_slide",
      showPrevBtn: ".handle_prev_slide",
      autoPlay: true,
    };

    // const gallerySlider = new CarouselSlider(
    //   gallerySliderObj.parentSlider,
    //   gallerySliderObj.prevBtn,
    //   gallerySliderObj.nextBtn,
    //   gallerySliderObj.showPrevBtn,
    //   gallerySliderObj.autoPlay
    // );

    backToTopButton();
  }
});

const callOpenMobileMenu = () => {
  /* Event Listener for the button to hide and show menu */
  const mobileMenuBtn = document.getElementById("openCloseMobileNav");
  const revealMobileMenuNavLinks = document.querySelector(
    ".navigation-links-parent"
  );
  const bodyFixedScroll = document.querySelector("body");
  const addClassToFadeOut = document.querySelector(".navigation-links-parent");
  const navLinkItemMobile = document.querySelectorAll(".nav-item-mobile");

  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenuBtn.getAttribute("aria-label") == "Open Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Close Navigation");
      mobileMenuBtn?.classList.add("nav-toggle--close");
      revealMobileMenuNavLinks?.classList.add("show-mobile-menu");
      bodyFixedScroll?.classList.add("fixed-modal-reveal");
    } else if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
      mobileMenuBtn?.classList.remove("nav-toggle--close");

      // add class before closing for fadeout animation of mobile nav
      addClassToFadeOut?.classList.add("fade-out-animate");

      addClassToFadeOut.addEventListener(
        "animationend",
        () => {
          bodyFixedScroll?.classList.remove("fixed-modal-reveal");
          addClassToFadeOut?.classList.remove("fade-out-animate");
          revealMobileMenuNavLinks?.classList.remove("show-mobile-menu");
        },
        { once: true }
      );
    }
  });

  navLinkItemMobile.forEach((navlinkitem) => {
    navlinkitem.addEventListener("click", () => {
      if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
        mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
        mobileMenuBtn?.classList.remove("nav-toggle--close");

        // add class before closing for fadeout animation of mobile nav
        addClassToFadeOut?.classList.add("fade-out-animate");

        addClassToFadeOut.addEventListener(
          "animationend",
          () => {
            bodyFixedScroll?.classList.remove("fixed-modal-reveal");
            addClassToFadeOut?.classList.remove("fade-out-animate");
            revealMobileMenuNavLinks?.classList.remove("show-mobile-menu");
          },
          { once: true }
        );
      }
    });
  });
};

const showAndHideNavBar = (divToAddClass, nameOfClass) => {
  const headNav = document.querySelector(divToAddClass);
  let headNavScrollPosition = window.scrollY;

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    const isScrollingDown = currentScrollPosition > headNavScrollPosition;

    headNav?.classList.toggle(nameOfClass, isScrollingDown);
    headNavScrollPosition = currentScrollPosition;
  };

  const handleMouseMove = (e) => {
    const mouseMoveY = e.clientY;
    const isAboveThreshold = mouseMoveY < 90;
    const isClassPresent = headNav?.classList.contains(nameOfClass);

    headNav?.classList.toggle(
      nameOfClass,
      !(isAboveThreshold || !isClassPresent)
    );
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);
};

const showAndHideMobileEventPartner = (eventContainerClass, nameOfClass) => {
  let userIsActive = false;
  let inactivityTimer = null;
  let isMobile = window.innerWidth <= 600;

  /**
   * Toggles the specified class on the targeted element.
   *
   * @param {boolean} isActive - Whether to add or remove the class.
   */
  const toggleClass = (isActive) => {
    const element = document.querySelector(eventContainerClass);
    element?.classList.toggle(nameOfClass, isActive);
  };

  const handleScroll = () => {
    userIsActive = true;
    toggleClass(userIsActive);

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
      userIsActive = false;
      toggleClass(userIsActive);
    }, 2000);
  };

  /**
   * Handles the window resize event.
   */
  const handleWindowResize = () => {
    const newIsMobile = window.innerWidth <= 600;

    if (isMobile !== newIsMobile) {
      isMobile = newIsMobile;
      isMobile
        ? window.addEventListener("scroll", handleScroll)
        : window.removeEventListener("scroll", handleScroll);
    }
  };

  // Add event listeners based on the initial value of isMobile
  if (isMobile) {
    window.addEventListener("scroll", handleScroll);
  }

  window.addEventListener("resize", handleWindowResize);
};

const pageScrollZoom = () => {
  const handleScrollingZoom = () => {
    let screenWidth = window.innerWidth;

    if (screenWidth >= 1020) {
      let scrollPercentage =
        (window.scrollY / (0.8 * window.innerHeight)) * 100;
      scrollPercentage = Math.min(100, Math.max(0, scrollPercentage));

      let backgroundImageSize = 100 + Math.min(100, 0.5 * scrollPercentage);

      // Limit background size to a maximum of 400%
      if (typeof backgroundImageSize === "number") {
        backgroundImageSize = Math.min(400, backgroundImageSize);
        backgroundImageSize = backgroundImageSize + "%";
      }

      if (bgImage) {
        bgImage.style.backgroundSize = backgroundImageSize;
      }
    } else {
      // If screen width is less than 1024px, set the background image size to cover
      if (bgImage) {
        bgImage.style.backgroundSize = "cover";
      }
    }
  };

  window.addEventListener("scroll", handleScrollingZoom);
};

const backToTopButton = () => {
  const bckToTopDiv = document.querySelector(".btn-back-to-top");
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 1300) {
      bckToTopDiv?.classList.add("show");
    } else {
      bckToTopDiv?.classList.remove("show");
    }
  });

  bckToTopDiv.addEventListener("click", () => {
    scrollToTop();
  });

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
};

/**
 * Displays a popup modal on a webpage.
 * The modal is shown after a delay of 3.5 seconds and automatically closes after 10 seconds.
 * Provides a close button to manually close the modal.
 *
 * @param {string} popupModalId - The class name of the popup modal element.
 * @param {string} classToAdd - The class name to add to the popup modal element to make it visible.
 * @param {string} closeBtn - The class name of the close button element for the popup modal.
 */

const showPopup = (popupModalId, classToAdd, closeBtn) => {
  const modal = document.getElementById(popupModalId);
  const closeModal = document.querySelector(closeBtn);

  /**
   * Adds the specified class to the modal element, sets the `aria-modal` and `role` attributes,
   * and removes the class and attributes after a delay of 10 seconds.
   */
  function addClassToModal() {
    modal?.classList.add(classToAdd);
    modal?.setAttribute("aria-modal", "true");
    modal?.setAttribute("role", "dialog");
  }

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
  document.cookie =
    "popupShown=true; expires=" + expirationDate.toUTCString() + "; path=/";

  /**
   * Removes the specified class from the modal element.
   */
  function closePopup() {
    modal?.classList.remove(classToAdd);
    modal?.removeAttribute("aria-modal");
    modal?.removeAttribute("role");
  }

  setTimeout(addClassToModal, 3500);
  closeModal?.addEventListener("click", closePopup);
};

function captureColor(colorVal) {
  updateColors(colorVal);

  function updateColors(newColor) {
    if (isValidHexColor(newColor)) {
      updateCSSCustomProperties(newColor);
    }
  }

  function isValidHexColor(color) {
    const hexColorRegExp = /^#?([0-9A-Fa-f]{3}){1,2}$/;
    return hexColorRegExp.test(color);
  }

  function updateCSSCustomProperties(baseColor) {
    const { shades, shadeLighter } = generateColorShades(
      baseColor,
      1,
      rangeInputValue
    );

    // Update shades
    for (let i = 100; i <= 900; i += 100) {
      const customProps = `--primary-shades-${i}`;
      const hslaString = `hsla(${shades[i].h}, ${shades[i].s}%, ${shades[i].l}%, ${shades[i].a})`;
      setBrandColor(customProps, hslaString);
    }

    // Update shadeLighter
    for (let i = 100; i <= 900; i += 100) {
      const customProps = `--primary-lighter-shades-${i}`;
      const hslaString = `hsla(${shadeLighter[i].h}, ${shadeLighter[i].s}%, ${shadeLighter[i].l}%, ${shadeLighter[i].a})`;
      setBrandColor(customProps, hslaString);
    }
  }

  function generateColorShades(baseColor, alpha, rangeInputValue = 3.5) {
    const baseColorHSLA = hexToHSLA(baseColor, alpha);

    const shades = {};
    const shadeLighter = {};

    shades[500] = { ...baseColorHSLA };
    shadeLighter[100] = { ...baseColorHSLA };

    for (let i = 600; i <= 900; i += 100) {
      let delta = (i - 500) / 100;
      let newLightness = baseColorHSLA.l - delta * 8.5;
      newLightness = Math.min(100, Math.max(0, newLightness));
      const shadeHSLA = {
        h: baseColorHSLA.h,
        s: baseColorHSLA.s,
        l: newLightness,
        a: baseColorHSLA.a,
      };
      shades[i] = shadeHSLA;
    }

    for (let i = 400; i >= 100; i -= 100) {
      let delta = (500 - i) / 100;
      let newLightness = baseColorHSLA.l + delta * 5.8;
      newLightness = Math.min(100, Math.max(0, newLightness));
      const shadeHSLA = {
        h: baseColorHSLA.h,
        s: baseColorHSLA.s,
        l: newLightness,
        a: baseColorHSLA.a,
      };
      shades[i] = shadeHSLA;
    }

    let lighterBaseColor = { ...shades[100] };
    for (let i = 900; i >= 100; i -= 100) {
      let delta = (900 - i) / 100;
      let newLightness = lighterBaseColor.l + delta * rangeInputValue;
      newLightness = Math.min(100, Math.max(0, newLightness));
      const newLighterShadeHSLA = {
        h: lighterBaseColor.h,
        s: lighterBaseColor.s,
        l: newLightness,
        a: lighterBaseColor.a,
      };
      shadeLighter[i] = newLighterShadeHSLA;
    }

    return { shades, shadeLighter };
  }

  function hexToHSLA(hex, alpha = 1) {
    // Remove the "#" character, if present
    hex = hex.replace(/^#/, "");

    // Convert the hex code to RGB
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    // Find the min and max values for RGB
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate the hue (H)
    let h;
    if (max === min) {
      h = 0; // Achromatic (grayscale)
    } else if (max === r) {
      h = 60 * ((g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else {
      h = 60 * (4 + (r - g) / (max - min));
    }
    if (h < 0) h += 360;

    // Calculate the lightness (L)
    const l = (max + min) / 2;

    // Calculate the saturation (S)
    let s;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = (max - min) / (2 * l);
    } else {
      s = (max - min) / (2 - 2 * l);
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: alpha, // Include alpha in the result
    };
  }

  function setBrandColor(CSSCustomProp, brandColor) {
    document.documentElement.style.setProperty(CSSCustomProp, brandColor);
  }
}

const pageSmoothScrolling = () => {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

captureColor(primaryColor?.value.trim());

// =========================================
// POPUP TIMER COUNTDOWN JAVASCRIPT
// =========================================
const startDateField = document.getElementById("eventStartDate");
const endDateField = document.getElementById("eventEndDate");
const countdownDisplay = document.getElementById("event_countdown_label");
const countdownDisplayMobile = document.getElementById(
  "event_countdown_label_mobile"
);
const countdownDisplayPopup = document.getElementById("popupEvent_countdown");

const daysFromStart = document.getElementById("moredays");
const hoursFromStart = document.getElementById("lessday");
const daysFromStartMobile = document.getElementById("moredays_mobile");
const hoursFromStartMobile = document.getElementById("lessday_mobile");
const daysFromStartPopup = document.getElementById("popupMoredays");
const hoursFromStartPopup = document.getElementById("popupLessday");
const announceCards = document.querySelectorAll(".announce__card-slide");

let isRegDiscounted = false;
let activAnnounceCard = "";

announceCards.forEach((card) => {
  const dataValName = card.getAttribute("data-card-popup");

  if (dataValName == "registration_discount_countdown") {
    isRegDiscounted = true;
    activAnnounceCard = "registration_discount_countdown";
  } else if (dataValName == "registration_countdown") {
    isRegDiscounted = false;
    activAnnounceCard = "registration_countdown";
  } else if (dataValName == "event_countdown") {
    isRegDiscounted = false;
    activAnnounceCard = "event_countdown";
  } else if (dataValName == "events_has_ended") {
    isRegDiscounted = false;
    activAnnounceCard = "events_has_ended";
  } else {
    isRegDiscounted = false;
  }
});

const updateCountdown = () => {
  const currentTime = new Date();

  let startDate = null;
  let endDate = null;

  if (startDateField) {
    startDate = new Date(startDateField.value);
  }

  if (endDateField) {
    endDate = new Date(endDateField.value);
  }

  // Calculate time difference
  const timeDiff = Math.abs(startDate - currentTime);

  if (currentTime > endDate) {
    if (activAnnounceCard == "registration_discount_countdown") {
      countdownDisplay.textContent = "Promo has Ended";
      countdownDisplayPopup.textContent = "Promo has Ended";
      countdownDisplayMobile.textContent = "Promo has Ended";
    } else if (activAnnounceCard == "registration_countdown") {
      countdownDisplay.textContent = "Registration has Ended";
      countdownDisplayPopup.textContent = "Registration has Ended";
      countdownDisplayMobile.textContent = "Registration has Ended";
    } else if (activAnnounceCard == "event_countdown") {
      countdownDisplay.textContent = "Event has Ended";
      countdownDisplayPopup.textContent = "Event has Ended";
      countdownDisplayMobile.textContent = "Event has Ended";
    }
    return;
  }

  // Check if event has started
  if (currentTime >= startDate) {
    if (activAnnounceCard == "registration_discount_countdown") {
      countdownDisplay.textContent = "Promo has Ended";
      countdownDisplayPopup.textContent = "Promo has Ended";
      countdownDisplayMobile.textContent = "Promo has Ended";
    } else if (activAnnounceCard == "registration_countdown") {
      countdownDisplay.textContent = "Registration has Ended";
      countdownDisplayPopup.textContent = "Registration has Ended";
      countdownDisplayMobile.textContent = "Registration has Ended";
    } else if (activAnnounceCard == "event_countdown") {
      countdownDisplay.textContent = "Event started";
      countdownDisplayPopup.textContent = "Event started";
      countdownDisplayMobile.textContent = "Event started";
      countdownDisplayPopup.textContent = "Event started";
    }

    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Check if more than 24 hours remaining
  if (days > 0) {
    countdownDisplay.textContent = `${days
      .toString()
      .padStart(2, "0")}  :  ${hours.toString().padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}`;
    countdownDisplayPopup.textContent = `${days
      .toString()
      .padStart(2, "0")}  :  ${hours.toString().padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}`;
    countdownDisplayMobile.textContent = `${days
      .toString()
      .padStart(2, "0")}  :  ${hours.toString().padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}`;

    if (daysFromStart.classList.contains("d-none")) {
      daysFromStart.classList.remove("d-none");
      hoursFromStart.classList.add("d-none");
    }
    if (daysFromStartMobile.classList.contains("d-none")) {
      daysFromStartMobile.classList.remove("d-none");
      hoursFromStartMobile.classList.add("d-none");
    }
    if (daysFromStartPopup.classList.contains("d-none")) {
      daysFromStartPopup.classList.remove("d-none");
      hoursFromStartPopup.classList.add("d-none");
    }
  } else {
    countdownDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}  :  ${seconds.toString().padStart(2, "0")}`;
    countdownDisplayPopup.textContent = `${hours
      .toString()
      .padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}  :  ${seconds.toString().padStart(2, "0")}`;
    countdownDisplayMobile.textContent = `${hours
      .toString()
      .padStart(2, "0")}  :  ${minutes
        .toString()
        .padStart(2, "0")}  :  ${seconds.toString().padStart(2, "0")}`;

    if (hoursFromStart.classList.contains("d-none")) {
      hoursFromStart.classList.remove("d-none");
      daysFromStart.classList.add("d-none");
    }
    if (hoursFromStartMobile.classList.contains("d-none")) {
      hoursFromStartMobile.classList.remove("d-none");
      daysFromStartMobile.classList.add("d-none");
    }
    if (hoursFromStartPopup.classList.contains("d-none")) {
      hoursFromStartPopup.classList.remove("d-none");
      daysFromStartPopup.classList.add("d-none");
    }
  }
};

// ========================================================
// AGENDA HEADER DATE TOGGLE
// ========================================================
function toggleDate(elementId, startDateSelector, endDateSelector) {
  const element = document.getElementById(elementId);
  const startDate = document.querySelector(startDateSelector);
  const endDate = document.querySelector(endDateSelector);

  if (element && startDate && endDate) {
    element.addEventListener("click", () => {
      if (startDate.classList.contains("d-none")) {
        startDate.classList.remove("d-none");
        endDate.classList.add("d-none");
      }
    });
  } else {
    console.error(
      `One or more elements not found: ${elementId}, ${startDateSelector}, ${endDateSelector}`
    );
  }
}

// MULTI STREAM AGENDA
toggleDate(
  "pill_agenda_stream_one_day1_tab",
  ".header_label_startdate",
  ".header_label_enddate"
);
toggleDate(
  "pill_agenda_stream_one_day2_tab",
  ".header_label_enddate",
  ".header_label_startdate"
);
toggleDate(
  "pill_agenda_stream_two_day1_tab",
  ".header_label_startdate_stream",
  ".header_label_enddate_stream"
);

toggleDate(
  "pill_agenda_stream_two_day2_tab",
  ".header_label_enddate_stream",
  ".header_label_startdate_stream"
);

// SINGLE STREAM AGENDA
toggleDate(
  "pills-agenda1-day1-tab",
  ".header_label_startdate",
  ".header_label_enddate"
);

toggleDate(
  "pills-agenda2-day2-tab",
  ".header_label_enddate",
  ".header_label_startdate"
);

// ========================================================
// SPEAKER CARDS LOAD MORE
// ========================================================
let startIndex = 6;
let increment = 6;

const tabButton = document.querySelectorAll(
  "#pills_tab_speaker_section li button"
);
const streamTypes = ["single", "multi_stream_one", "multi_stream_two"];
const activeTab = document.querySelectorAll(".speaker_tab.tab-pane");
const tabContentRow = document.querySelectorAll(".tab_content_row");

const tabContent1 = document.getElementById("speaker_default_content");
const tabContent2 = document.getElementById("speaker_second_tab_content");
const loadMoreBtn = document.getElementById("load_more_wrapper");

function isActiveTab(tab) {
  return tab.classList.contains("show");
}

function handleCardWrapper(cardWrapper) {
  let dataAtrrVal = cardWrapper.getAttribute("data-streams");

  if (streamTypes.includes(dataAtrrVal)) {
    let parent = cardWrapper.parentNode;

    if (isActiveTab(parent)) {
      let cardWrapperChildren = cardWrapper.children;

      if (cardWrapperChildren.length <= 6) {
        hideLoadMoreBtn();
      }

      if (cardWrapperChildren.length > 6) {
        for (let i = 6; i < cardWrapperChildren.length; i++) {
          cardWrapperChildren[i].classList.add("d-none");
        }

        loadMoreBtn.removeEventListener("click", handleLoadMoreClick);
        loadMoreBtn.addEventListener(
          "click",
          handleLoadMoreClick(cardWrapperChildren, startIndex)
        );
      }
    }
  }
}

tabContentRow.forEach(handleCardWrapper);

// click event for tab button
tabButton.forEach((tabBtn) => {
  tabBtn.addEventListener("click", (e) => {
    const buttonID = e.currentTarget.id;

    if (buttonID === "speaker_default_tab" && isActiveTab) {
      const streamOne = tabContent1.firstElementChild;
      const streamOneChildDataAttr = streamOne.getAttribute("data-streams");

      if (streamTypes.includes(streamOneChildDataAttr)) {
        const dataStreamOneChildren = streamOne.children;

        if (dataStreamOneChildren.length <= 6) {
          hideLoadMoreBtn();
        }

        if (dataStreamOneChildren.length > 6) {
          showLoadMoreBtn();
          for (let i = 6; i < dataStreamOneChildren.length; i++) {
            dataStreamOneChildren[i].classList.add("d-none");
          }

          loadMoreBtn.removeEventListener("click", handleLoadMoreClick);
          loadMoreBtn.addEventListener(
            "click",
            handleLoadMoreClick(dataStreamOneChildren, startIndex)
          );
        }

        console.log(dataStreamOneChildren);
      }
    }

    if (buttonID === "speaker_second_tab" && isActiveTab) {
      const streamTwo = tabContent2.firstElementChild;
      const streamTwoChildDataAttr = streamTwo.getAttribute("data-streams");

      if (streamTypes.includes(streamTwoChildDataAttr)) {
        const dataStreamTwoChildren = streamTwo.children;

        if (dataStreamTwoChildren.length <= 6) {
          hideLoadMoreBtn();
        }

        if (dataStreamTwoChildren.length > 6) {
          showLoadMoreBtn();

          for (let i = 6; i < dataStreamTwoChildren.length; i++) {
            dataStreamTwoChildren[i].classList.add("d-none");
          }

          loadMoreBtn.removeEventListener("click", handleLoadMoreClick);
          loadMoreBtn.addEventListener(
            "click",
            handleLoadMoreClick(dataStreamTwoChildren, startIndex)
          );
        }

        console.log(dataStreamTwoChildren);
      }
    }
  });
});

function handleLoadMoreClick(children, startIndex) {
  return function () {
    let endIndex = startIndex + increment;
    showChildren(startIndex, endIndex, children);

    if (endIndex >= children.length) {
      hideLoadMoreBtn();
    } else {
      startIndex = endIndex;
    }
  };
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add("d-none");
}
function showLoadMoreBtn() {
  loadMoreBtn.classList.remove("d-none");
}

function showChildren(start, end, children) {
  for (let i = start; i < end && i < children.length; i++) {
    children[i].classList.remove("d-none");
  }
}

let lastMouseY = null;
let parentSection = document.querySelector("#agenda");
let listItems = document.querySelectorAll(".agenda-list-item");
let threshold = 4;

parentSection.addEventListener("mousemove", (e) => {
  let currentMouseY = e.clientY;

  if (lastMouseY !== null) {
    let deltaY = Math.abs(currentMouseY - lastMouseY);
    if (deltaY >= threshold) {
      listItems.forEach((listItem) => {
        if (currentMouseY < lastMouseY) {
          listItem.classList.remove("animate-down");
          listItem.classList.add("animate-up");
        } else {
          listItem.classList.remove("animate-up");
          listItem.classList.add("animate-down");
        }
      });
    }
  }
  lastMouseY = currentMouseY;
});


function newAnnouncement() {
  if (window.innerWidth > 992) {

    let liItems = document.querySelectorAll('.announce_li_item');

    liItems.forEach((item) => {
      // Add click event listener
      item.addEventListener('click', function () {

        let targetId = this.getAttribute('data-open-target');

        // Select the UI element with the matching ID
        let targetElement = document.querySelector(targetId);

        // If the UI element exists
        if (targetElement) {
          // Find the currently active element
          let activeElement = document.querySelector('.inner_content_item.active.show');


          // If an active element exists, remove the 'active' and 'show' classes from it
          if (activeElement) {
            activeElement.classList.remove('active', 'show');

          }

          // Add the 'active' and 'show' classes to the target element
          targetElement.classList.add('active', 'show');
        }

        // Remove 'active_item' class from all li elements
        liItems.forEach((li) => li.classList.remove('active_item'));

        // Add 'active_item' class to the clicked li element
        this.classList.add('active_item');
      });
    });

    liItems.forEach(item => {
      item.addEventListener('toggle', () => {
        let targetDetailedOpen = item.open;

        if (targetDetailedOpen) {
          liItems.forEach((otherDetailsOpened) => {
            if (otherDetailsOpened !== item && otherDetailsOpened.open) {
              otherDetailsOpened.open = false;
            }
          });
        }
      })
    })
  }
}