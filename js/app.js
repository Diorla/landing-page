// elements
const desktopNav = document.querySelector(".desktop-header");
const mobileNav = document.querySelector(".mobile-header");
const mobileMenu = document.querySelector(".mobile-header > .mobile-menu");
const home = document.querySelector("#home");
const about = document.querySelector("#about");
const gallery = document.querySelector("#gallery");
const testimonial = document.querySelector("#testimonial");
const team = document.querySelector("#team");
const pricing = document.querySelector("#pricing");
const contactUs = document.querySelector("#contact-us");
const topButton = document.getElementById("top");
const mobileMenuIcon = document.querySelector(".fa-solid.menu-icon");
const galleryCards = document.querySelectorAll(".gallery-card");

/**
 * @description Converts pascal case to sentence case
 * @param {string} str - The pascal case that will be transformed to sentence
 * @returns {string} sentence created from a single word
 * @example pascalToSentence("pascalToSentence") // pascal to sentence
 */
const pascalToSentence = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? ` ${item}` : item))
    .join("")
    .toLowerCase()
    .trim();

/**
 * @description Converts pascal case to sentence case
 * @param {string} str - The pascal case that will be transformed to snake
 * @returns {string} snake case created from a single word
 * @example pascalToSentence("pascalToSnake") // pascal-to-snake
 */
const pascalToSnake = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? `-${item}` : item))
    .join("")
    .toLowerCase()
    .trim();

/**
 * @description Scrolls the document to the specified part of the page
 * @param {string} id - The id of the section that the page will scroll to
 * @returns {void} nothing
 */
const scrollToElement = (id) => {
  document.getElementById(id).scrollIntoView();
};

/**
 * @description Used to create a new list element
 * @param {string} item - It will be used to generate the id
 * @param {boolean} [isDesktop=false] - big devices vs small devices
 * @returns {HTMLLIElement} <li id="d-item-nav" class="nav-item">item</li>
 * @example createElementChild("hello") // <li id="m-hello-nav" class="nav-item">hello</li>
 * @example createElementChild("hello", true) // <li id="d-hello-nav" class="nav-item">hello</li>
 */
const createElementChild = (item, isDesktop) => {
  const element = document.createElement("li");
  element.innerHTML = pascalToSentence(item);
  element.id = isDesktop
    ? `d-${pascalToSnake(item)}-nav`
    : `m-${pascalToSnake(item)}-nav`;
  element.className = "nav-item";
  return element;
};

// create nav items for big and small devices
document.addEventListener("DOMContentLoaded", () => {
  const navList = [
    "home",
    "about",
    "gallery",
    "testimonial",
    "team",
    "pricing",
    "contactUs",
  ];

  const desktopFrag = document.createElement("ul");
  const mobileFrag = document.createElement("ul");

  navList.forEach((item) => {
    const itemId = pascalToSnake(item);

    const element = createElementChild(item, true);
    element.addEventListener("click", () => scrollToElement(itemId));
    desktopFrag.appendChild(element);

    const mobileElem = createElementChild(item);
    mobileElem.addEventListener("click", () => scrollToElement(itemId));
    mobileFrag.appendChild(mobileElem);
  });
  desktopNav.appendChild(desktopFrag);
  mobileMenu.appendChild(mobileFrag);
  document.getElementById("d-home-nav").classList.add("active");
  document.getElementById("m-home-nav").classList.add("active");
});

let timeoutId;
// hide desktop navbar upon scrolling down
document.addEventListener("scroll", () => {
  desktopNav.classList.remove("hidden");
  if (timeoutId) clearTimeout(timeoutId);
  if (document.body.scrollTop > 50)
    timeoutId = setTimeout(() => {
      desktopNav.classList.add("hidden");
    }, 1500);
});

// reveal navbar when user hover over that area
desktopNav.addEventListener("mouseover", () => {
  desktopNav.classList.remove("hidden");
  if (timeoutId) clearTimeout(timeoutId);
});

// hide navbar when user moves away their mouse
desktopNav.addEventListener("mouseleave", () => {
  if (document.body.scrollTop > 50)
    timeoutId = setTimeout(() => {
      desktopNav.classList.add("hidden");
    }, 1500);
});

// expand and collapse mobile nav
mobileMenuIcon.addEventListener("click", () => {
  if (mobileNav.classList.contains("collapsed")) {
    mobileNav.classList.remove("collapsed");
    mobileMenuIcon.classList.add("fa-xmark");
  } else {
    mobileNav.classList.add("collapsed");
    mobileMenuIcon.classList.remove("fa-xmark");
  }
});

// scroll to top on clicking button#top
topButton.addEventListener("click", () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// expand gallery card
galleryCards.forEach((item) =>
  item.addEventListener("click", () => {
    document.querySelector(".image-modal").classList.remove("hidden");
  })
);

// close expanded gallery card
document
  .querySelector(".image-modal .fa-solid")
  .addEventListener("click", () => {
    document.querySelector(".image-modal").classList.add("hidden");
  });

/**
 * @description Used to determine if an element is within 75px from the top
 * @param {Element} element - the element in question
 * @returns {boolean} true or false
 * @example isActive(elem) // true
 */
const isActive = (element) => {
  const { top } = element.getBoundingClientRect();
  return top <= 75;
};

/**
 * @description Attach .active-section to the element and remove it from the rest
 * @param {string} id - The id of the element to be updated
 * @returns {boolean} false will be used to stop the function for continuously updating, true indicates that an update occurs
 * @example updateActiveElement("hello") // false
 */
const updateActiveElement = (id) => {
  if (document.getElementById(id)?.classList.contains("active-section"))
    return false;
  document
    .querySelectorAll(".nav-item.active")
    .forEach((item) => item.classList.remove("active"));
  document
    .querySelectorAll("main > div")
    .forEach((item) => item.classList.remove("active-section"));
  // active-class
  document.querySelector(`#d-${id}-nav`)?.classList.add("active");
  document.querySelector(`#m-${id}-nav`)?.classList.add("active");

  document.getElementById(id)?.classList.add("active-section");
  return true;
};

// listen and update the active element
window.addEventListener("scroll", () => {
  if (isActive(contactUs)) updateActiveElement("contact-us");
  else if (isActive(pricing)) updateActiveElement("pricing");
  else if (isActive(team)) updateActiveElement("team");
  else if (isActive(testimonial)) updateActiveElement("testimonial");
  else if (isActive(gallery)) updateActiveElement("gallery");
  else if (isActive(about)) updateActiveElement("about");
  else if (isActive(home)) updateActiveElement("home");
});
