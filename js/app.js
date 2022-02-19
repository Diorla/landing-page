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
    "footer",
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

// update the nav item and set to active when section comes into view
let observer = new IntersectionObserver((obList) => {
  const [observeEntry] = obList;
  const { isIntersecting, target } = observeEntry;

  if (isIntersecting) {
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));
    document.querySelector(`#d-${target.id}-nav`)?.classList.add("active");
    document.querySelector(`#m-${target.id}-nav`)?.classList.add("active");
  }
});

observer.observe(home);
observer.observe(about);
observer.observe(gallery);
observer.observe(testimonial);
observer.observe(team);
observer.observe(pricing);
observer.observe(contactUs);
observer.observe(footer);

// scroll to top on clicking button#top
topButton.addEventListener("click", () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
