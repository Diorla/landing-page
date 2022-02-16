// elements
const desktopNav = document.querySelector(".desktop-header");
const mobileNav = document.querySelector(".mobile-header");
const home = document.querySelector("#home");
const about = document.querySelector("#about");
const gallery = document.querySelector("#gallery");
const testimony = document.querySelector("#testimony");
const team = document.querySelector("#team");
const pricing = document.querySelector("#pricing");
const contactUs = document.querySelector("#contact-us");
const footer = document.querySelector("footer");
const topButton = document.getElementById("top");

const pascalToSentence = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? ` ${item}` : item))
    .join("")
    .trim();
const pascalToSnake = (str) =>
  str
    .split("")
    .map((item) => (/[A-Z]/.test(item) ? `-${item}` : item))
    .join("")
    .toLowerCase()
    .trim();
document.addEventListener("DOMContentLoaded", () => {
  let list = `<ul>`;
  const navList = [
    "home",
    "about",
    "gallery",
    "testimony",
    "team",
    "pricing",
    "contactUs",
    "footer",
  ];
  navList.forEach((item) => {
    const listItem = `<li id="${pascalToSnake(
      item
    )}-nav" class="nav-item">${pascalToSentence(item)}</li>`;
    list += listItem;
  });
  list += "</ul>";
  desktopNav.innerHTML = list;

  document
    .querySelector(`#${pascalToSnake(navList[0])}-nav`)
    .classList.add("active");
});

let timeoutId;
document.addEventListener("scroll", () => {
  desktopNav.classList.remove("hidden");
  if (timeoutId) clearTimeout(timeoutId);
  if (document.body.scrollTop > 50)
    timeoutId = setTimeout(() => {
      desktopNav.classList.add("hidden");
    }, 1000);
});

// let options = {
//   root: document,
//   rootMargin: "0px",
//   threshold: 1,
// };

// let observer = new IntersectionObserver((obList) => {
//   // Only the first
//   const [observeEntry] = obList;
//   const { isIntersecting, target } = observeEntry;

//   if (isIntersecting) {
//     // it is entering: scrolling down
//     if (target.tagName === "MAIN") info.textContent = "main";
//     if (target.tagName === "FOOTER") info.textContent = "footer";
//     if (target.id === "id") info.textContent = "ID";
//   } else {
//     // it is leaving: scrolling up
//     if (target.tagName === "FOOTER") info.textContent = "main";
//     if (target.id === "id") info.textContent = "footer";
//   }
// });

// button.addEventListener("click", () => {
//   document.body.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });
//   // footer.scrollIntoView({ behavior: 'smooth' });
// });
// observer.observe(main);
// observer.observe(footer);
// observer.observe(elemId);
