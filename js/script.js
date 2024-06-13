/* Burger Menü */
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuLinks = menu.querySelectorAll('a'); // Selektiert alle Links im Menü

btn.addEventListener('click', navToggle);

function navToggle() {
    btn.classList.toggle('open');
    menu.classList.toggle('flex');
    menu.classList.toggle('hidden');
}

// Funktion, um das Menü zu schließen
function closeMenu() {
    btn.classList.remove('open');
    menu.classList.remove('flex');
    menu.classList.add('hidden');
}

// Event-Listener für jeden Link im mobilen Menü
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

/* Scroll Animation Über mich Sektion */
document.addEventListener('scroll', function () {
    const image = document.querySelector('#uebermich img');
    const textContainer = document.querySelector('#textContainer');

    const imagePosition = image.getBoundingClientRect().top;
    const textContainerPosition = textContainer.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (imagePosition < screenPosition) {
        image.classList.add('image-visible');
    } else {
        image.classList.remove('image-visible');
    }

    if (textContainerPosition < screenPosition) {
        textContainer.classList.add('text-visible');
    } else {
        textContainer.classList.remove('text-visible');
    }
});