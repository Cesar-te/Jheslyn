const opening = document.querySelector('#opening');
const openButton = document.querySelector('#openButton');
const bloomButton = document.querySelector('#bloomButton');
const garden = document.querySelector('#garden');
const jarButton = document.querySelector('#jarButton');
const jarMessage = document.querySelector('#jarMessage');

const messages = [
  'Tu amistad es de esas que se sienten bonitas y sinceras.',
  'Gracias por escuchar, acompañar y ser tú.',
  'Espero que hoy te pase algo tan bonito como tu amistad.',
  'Nunca dudes de lo mucho que vales como persona.',
  'Qué suerte haber coincidido y poder llamarte mi amiguita.',
  'Tu presencia hace más cálidos hasta los días normales.'
];
let messageIndex = 0;

function createGarden() {
  const count = window.innerWidth < 800 ? 12 : 21;
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index++) {
    const flower = document.createElement('div');
    const x = index < 2 ? (index ? 96 : 4) : 5 + Math.random() * 90;
    const size = 34 + Math.random() * 52;
    const height = 145 + Math.random() * 220;
    flower.className = 'flower';
    flower.style.cssText = `--x:${x}%;--h:${height}px;--s:${size}px;--d:${Math.random() * 1.25}s;z-index:${Math.round(height)}`;
    flower.innerHTML = '<i class="stem"></i><i class="leaf left"></i><i class="leaf"></i><b class="flower-head"></b>';
    fragment.appendChild(flower);
  }
  garden.replaceChildren(fragment);
}

function bloomAgain() {
  createGarden();
  bloomButton.querySelector('span').textContent = 'Nuestro recuerdo está floreciendo';
  setTimeout(() => { bloomButton.querySelector('span').textContent = 'Hazlo florecer otra vez'; }, 1900);
}

function createSparks() {
  const rect = jarButton.getBoundingClientRect();
  for (let index = 0; index < 18; index++) {
    const spark = document.createElement('i');
    spark.className = 'spark';
    spark.textContent = index % 3 === 0 ? '♡' : '✦';
    spark.style.left = `${rect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top + rect.height / 2}px`;
    spark.style.setProperty('--dx', `${(Math.random() - .5) * 250}px`);
    spark.style.setProperty('--dy', `${(Math.random() - .6) * 230}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

openButton.addEventListener('click', () => {
  opening.classList.add('opened');
  document.body.classList.remove('locked');
  createGarden();
});

bloomButton.addEventListener('click', bloomAgain);
garden.addEventListener('pointerdown', event => {
  const flower = event.target.closest('.flower');
  if (!flower) return;
  flower.classList.remove('pop');
  void flower.offsetWidth;
  flower.classList.add('pop');
  setTimeout(() => flower.classList.remove('pop'), 550);
});

jarButton.addEventListener('click', () => {
  jarButton.classList.remove('shake');
  void jarButton.offsetWidth;
  jarButton.classList.add('shake');
  jarMessage.textContent = messages[messageIndex++ % messages.length];
  createSparks();
  if (navigator.vibrate) navigator.vibrate(25);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .2 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

window.addEventListener('resize', () => {
  if (!document.body.classList.contains('locked')) createGarden();
});
