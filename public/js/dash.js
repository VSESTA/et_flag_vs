const myCarousel = document.querySelector('#myCarousel');
const carouselItems = myCarousel.querySelectorAll('.carousel-item');

carouselItems.forEach(item => {
    const minPerSlide = 4;
    let next = item.nextElementSibling || item.parentElement.firstElementChild;

    item.innerHTML += next.innerHTML;

    for (let i = 0; i < minPerSlide - 1; i++) {
        next = next.nextElementSibling || item.parentElement.firstElementChild;
        item.innerHTML += next.innerHTML;
    }
});