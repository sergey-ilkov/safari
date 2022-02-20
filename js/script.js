$(function () {
    $('.popup__link').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
    });

    $('.gallery__item-inner').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
        },
    });

    $('.gallery__slider').slick({
        prevArrow: '<button type="button" class="slick-prev gallery__btn-prev"><img src="./images/arrow-left.svg" alt="arrow-left"></button>',
        nextArrow: '<button type="button" class="slick-next gallery__btn-next"><img src="./images/arrow-right.svg" alt="arrow-right"></button>',
    });
});

const burgerBtn = document.querySelector('.icon-menu');
const menuList = document.querySelector('.top-header__menu');
const body = document.querySelector('body');

if (burgerBtn) {
    burgerBtn.addEventListener('click', clickBurgerMenu);
}

const clickBodyMenu = (e) => {
    if ((!e.target.closest('.header__info') && !e.target.closest('.top-header__menu')) || e.target.hasAttribute('href')) {
        clickBurgerMenu();
    }
};

function clickBurgerMenu() {
    const elBurger = burgerBtn.classList;
    const elMenu = menuList.classList;
    const elBody = body.classList;

    elBurger.contains('active') ? elBurger.remove('active') : elBurger.add('active');
    elMenu.contains('active') ? elMenu.remove('active') : elMenu.add('active');
    elBody.contains('fixed-page') ? elBody.remove('fixed-page') : elBody.add('fixed-page');
    elBody.contains('fixed-page') ? body.addEventListener('click', clickBodyMenu) : body.removeEventListener('click', clickBodyMenu);
    elMenu.contains('active') ? menuList.addEventListener('click', clickBodyMenu) : menuList.removeEventListener('click', clickBodyMenu);
}

if (menuList) {
    menuList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.hasAttribute('href')) {
            const id = e.target.getAttribute('href').substr(1);
            element = document.getElementById(id);
            if (element) {
                scrollTo(element);
            }
        }
    });
}

function scrollTo(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth',
    });
}

const haederBtn = document.querySelector('.header__btn');

const contacts = document.querySelector('.booking');

haederBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (contacts) {
        scrollTo(contacts);
    }
});

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

const directionItem = document.querySelectorAll('.direction__item');
const offersLink = document.querySelectorAll('.offers__link');

let count = 0.6;

directionItem.forEach((item) => {
    count += 0.09;
    item.style.transition = `all 0.5s ease ${count}s`;
});

count = 0.6;

offersLink.forEach((item) => {
    count += 0.15;
    item.style.transition = `all 0.5s ease ${count}s`;
});
