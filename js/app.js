// elements
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const button = document.querySelector('button');
const elemId = document.querySelector('#id');
const info = document.querySelector('#info');
nav.classList.add('hidden');

let id;
document.addEventListener('scroll', () => {
  nav.classList.remove('hidden');
  nav.classList.add('visible');
  if (id) clearTimeout(id);
  id = setTimeout(() => {
    nav.classList.remove('visible');
    nav.classList.add('hidden');
  }, 1000);
});

let options = {
  root: document,
  rootMargin: '0px',
  threshold: 1,
};

let observer = new IntersectionObserver((obList) => {
  // Only the first
  const [observeEntry] = obList;
  const { isIntersecting, target } = observeEntry;

  if (isIntersecting) {
    // it is entering: scrolling down
    if (target.tagName === 'MAIN') info.textContent = 'main';
    if (target.tagName === 'FOOTER') info.textContent = 'footer';
    if (target.id === 'id') info.textContent = 'ID';
  } else {
    // it is leaving: scrolling up
    if (target.tagName === 'FOOTER') info.textContent = 'main';
    if (target.id === 'id') info.textContent = 'footer';
  }
});

button.addEventListener('click', () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  // footer.scrollIntoView({ behavior: 'smooth' });
});
observer.observe(main);
observer.observe(footer);
observer.observe(elemId);
