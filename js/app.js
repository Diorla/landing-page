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
const footer = document.querySelector("footer");
const topButton = document.getElementById("top");
const mobileMenuIcon = document.querySelector(".fa-solid.menu-icon");
const galleryCards = document.querySelectorAll(".gallery-card");

// utility function: turns "helloWorld" to "hello world"
const pascalToSentence = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? ` ${item}` : item))
    .join("")
    .trim();

// utility function: turns "helloWorld" to "hello-world"
const pascalToSnake = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? `-${item}` : item))
    .join("")
    .toLowerCase()
    .trim();

// create mobile and desktop nav links
document.addEventListener("DOMContentLoaded", () => {
  let desktopList = `<ul>`;
  let mobileList = `<ul>`;
  const navList = [
    "home",
    "about",
    "gallery",
    "testimonial",
    "team",
    "pricing",
    "contactUs",
  ];
  navList.forEach((item) => {
    const listItem = `<li id="d-${pascalToSnake(
      item
    )}-nav" class="nav-item"><a href="#${pascalToSnake(
      item
    )}">${pascalToSentence(item)}</a></li>`;
    desktopList += listItem;
    const mobileItem = `<li id="m-${pascalToSnake(
      item
    )}-nav" class="nav-item"><a href="#${pascalToSnake(
      item
    )}">${pascalToSentence(item)}</a></li>`;
    mobileList += mobileItem;
  });
  desktopList += "</ul>";
  mobileList += "</ul>";
  desktopNav.innerHTML = desktopList;
  mobileMenu.innerHTML = mobileList;

  document
    .querySelector(`#d-${pascalToSnake(navList[0])}-nav`)
    .classList.add("active");
  document
    .querySelector(`#m-${pascalToSnake(navList[0])}-nav`)
    .classList.add("active");
});

let timeoutId;
// hide desktop navbar upon scrolling down
document.addEventListener("scroll", () => {
  desktopNav.classList.remove("hidden");
  if (timeoutId) clearTimeout(timeoutId);
  if (document.body.scrollTop > 50)
    timeoutId = setTimeout(() => {
      desktopNav.classList.add("hidden");
    }, 1000);
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

let options = {
  root: document,
  rootMargin: "0px",
  threshold: 1,
};

// scroll to top on clicking button#top
topButton.addEventListener("click", () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

galleryCards.forEach((item) =>
  item.addEventListener("click", () => {
    document.querySelector(".image-modal").classList.remove("hidden");
  })
);

document
  .querySelector(".image-modal .fa-solid")
  .addEventListener("click", () => {
    document.querySelector(".image-modal").classList.add("hidden");
  });

const isActive = (item) => {
  const { top } = item;
  return top <= 75;
};

const updateActiveElement = (id) => {
  document
    .querySelectorAll(".nav-item.active")
    .forEach((item) => item.classList.remove("active"));

  document.querySelector(`#d-${id}-nav`)?.classList.add("active");
  document.querySelector(`#m-${id}-nav`)?.classList.add("active");
};

// listen and update the active element
window.addEventListener("scroll", (e) => {
  const homeRect = home.getBoundingClientRect();
  const aboutRect = about.getBoundingClientRect();
  const galleryRect = gallery.getBoundingClientRect();
  const testimonialRect = testimonial.getBoundingClientRect();
  const teamRect = team.getBoundingClientRect();
  const pricingRect = pricing.getBoundingClientRect();
  const contactUsRect = contactUs.getBoundingClientRect();

  if (isActive(contactUsRect)) updateActiveElement("contact-us");
  else if (isActive(pricingRect)) updateActiveElement("pricing");
  else if (isActive(teamRect)) updateActiveElement("team");
  else if (isActive(testimonialRect)) updateActiveElement("testimonial");
  else if (isActive(galleryRect)) updateActiveElement("gallery");
  else if (isActive(aboutRect)) updateActiveElement("about");
  else if (isActive(homeRect)) updateActiveElement("home");
});
