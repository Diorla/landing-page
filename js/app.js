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

const scrollToElement = (id) => {
  document.getElementById(id).scrollIntoView();
};

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
  const createElementChild = (item, isDesktop) => {
    const element = document.createElement("li");
    element.innerHTML = pascalToSentence(item);
    element.id = isDesktop
      ? `d-${pascalToSnake(item)}-nav`
      : `m-${pascalToSnake(item)}-nav`;
    element.className = "nav-item";
    return element;
  };
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

desktopNav.addEventListener("mouseover", () => {
  desktopNav.classList.remove("hidden");
  if (timeoutId) clearTimeout(timeoutId);
});

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
  if (document.getElementById(id)?.classList.contains("active-section"))
    return 0;
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
