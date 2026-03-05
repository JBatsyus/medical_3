const lenis = new Lenis({
    // Длительность анимации прокрутки (в секундах).
    // Чем больше значение — тем медленнее и плавнее скролл.
    duration: 1.2,

    // Коэффициент интерполяции (lerp = linear interpolation).
    // Значение от 0 до 1:
    // - 0.1 = очень плавно, но с "инерцией"
    // - 0.5 = баланс между плавностью и отзывчивостью
    // - 1 = мгновенная прокрутка (без сглаживания)
    lerp: 0.5,

    // Направление прокрутки:
    // 'vertical' — вертикальная (по умолчанию),
    // 'horizontal' — горизонтальная,
    // 'both' — оба направления (требует особой разметки)
    direction: "vertical",

    // Направление жестов (для touch-устройств и трекпада):
    // 'vertical' — только вертикальные свайпы
    // 'horizontal' — только горизонтальные
    // 'both' — любые жесты
    // Полезно, чтобы избежать конфликтов с каруселями и слайдерами
    gestureDirection: "vertical",

    // Включает плавную прокрутку при использовании колеса мыши
    smoothWheel: true,

    // Множитель скорости прокрутки колёсиком мыши.
    // Значение 1 = стандартная скорость.
    // Увеличение (>1) делает скролл быстрее, уменьшение (<1) — медленнее.
    wheelMultiplier: 1,

    // Множитель чувствительности для сенсорных экранов (свайпы).
    // Значение 2 = прокрутка в 2 раза дальше за тот же свайп.
    // Полезно для компенсации "тяжёлости" сенсорного скролла.
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// Кнопка "наверх" с интеграцией Lenis
const scrollToTopBtn = document.querySelector(".scroll-to-top");
if (scrollToTopBtn) {
    const updateButtonVisibility = () => {
        const shouldShow = lenis.scroll > 300 || window.scrollY > 300;
        scrollToTopBtn.classList.toggle("visible", shouldShow);
    };

    lenis.on("scroll", updateButtonVisibility);
    updateButtonVisibility();

    scrollToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo(0);
    });
}

// МОБИЛЬНОЕ МЕНЮ
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".menu-mob");
const body = document.body;

// 1. Логика открытия/закрытия бургера
if (burger && menu) {
    burger.addEventListener("click", () => {
        const isActive = burger.classList.toggle("active");
        menu.classList.toggle("active");
        body.classList.toggle("no-scroll", isActive);
    });

    // 2. Логика клика по ссылкам (включая скролл)
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            lenis.start();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Убираем хеш из URL и отменяем прыжок

                // Закрываем мобильное меню, если клик был в нем
                burger.classList.remove("active");
                menu.classList.remove("active");
                body.classList.remove("no-scroll");

                // Плавный скролл с учетом высоты шапки
                const headerHeight =
                    document.querySelector(".header").offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.pageYOffset - (headerHeight + 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}
// Скролл хедера
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.classList.add("header--scrolled");
    } else {
        header.classList.remove("header--scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Первый блок, скрытые теги
    const showMoreBtn = document.querySelector('.js-show-more');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            const parentList = this.closest('.universal-hero__tags');
            const hiddenTags = parentList.querySelectorAll('.is-hidden');

            hiddenTags.forEach(tag => tag.classList.remove('is-hidden'));

            this.remove();
        });
    }

    // Главный слайдер

    // Инициализация главного слайдера
    const mainSwiper = new Swiper('.hero-mrt__slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.hero-mrt__arrow--next',
            prevEl: '.hero-mrt__arrow--prev',
        },
        pagination: {
            el: ".hero-mrt__pagination",
            dynamicBullets: true,
            clickable: true,
            type: "bullets",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
        },
    });

    // Инициализация бокового слайдера
    const sideSwiper = new Swiper('.hero-mrt__side-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.hero-mrt__side-arrow--next',
            prevEl: '.hero-mrt__side-arrow--prev',
        },
        pagination: {
            el: ".hero-mrt__side-pagination",
            dynamicBullets: true,
            clickable: true,
            type: "bullets",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
        },
    });




    // Слайдер ДО/ПОСЛЕ
    var ourWorksSwiper = new Swiper(".our-works__swiper", {
        loop: true,
        speed: 600,
        slidesPerView: 1.2,
        spaceBetween: 16,
        breakpoints: {
            576: {
                slidesPerView: 1.1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },

        navigation: {
            prevEl: ".our-works__nav--prev",
            nextEl: ".our-works__nav--next",
        },

        pagination: {
            el: ".our-works__pagination",
            dynamicBullets: true,
            clickable: true,
        },


    });






    // Модальное окно - микромодал. Не фансибокс, тк фансибокс не предназначен для коммерческого использования

    MicroModal.init({
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        onShow: (modal, trigger) => {
            // Останавливаем Lenis (с проверкой на существование)
            if (window.lenis) window.lenis.stop();
            else if (typeof lenis !== "undefined") lenis.stop();

            if (trigger) {
                const titleText = trigger.getAttribute("data-title");
                const btnText = trigger.getAttribute("data-btn");
                const modalTitle = modal.querySelector(".modal__title");
                const modalSubmitBtn = modal.querySelector(".form-section__submit");

                if (titleText && modalTitle) modalTitle.textContent = titleText;
                if (btnText && modalSubmitBtn) modalSubmitBtn.textContent = btnText;
            }
            initChoices(modal);
        },
        onClose: (modal) => {
            // 1. Запускаем Lenis обратно
            if (window.lenis) window.lenis.start();
            else if (typeof lenis !== "undefined") lenis.start();

            // 2. Страховка от CSS-блокировки (удаляем overflow: hidden)
            // Делаем небольшую задержку, чтобы анимация закрытия успела завершиться
            setTimeout(() => {
                document.documentElement.style.removeProperty("overflow");
                document.body.style.removeProperty("overflow");
            }, 100);

            // очищаем модалку
            // const container = modal.querySelector('.modal__container');
            // const form = modal.querySelector('form');
            // const success = modal.querySelector('.form-section__success-message');

            // if (container.classList.contains('modal-success')) {
            //     container.classList.remove('modal-success');
            //     form.style.display = 'grid';
            //     success.style.display = 'none';
            //     form.reset(); // Очистить поля
            // }
        },
    });
    // Выпадающий список социальных сетей

    const socialDropdowns = document.querySelectorAll(".social-dropdown");

    socialDropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".social-dropdown__toggle");

        toggle.addEventListener("click", (event) => {
            event.stopPropagation();

            socialDropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("open");
                    otherDropdown
                        .querySelector(".social-dropdown__toggle")
                        .setAttribute("aria-expanded", "false");
                }
            });

            const isOpen = dropdown.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen);
        });
    });

    document.addEventListener("click", () => {
        socialDropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
            const toggle = dropdown.querySelector(".social-dropdown__toggle");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
    });
    // Свайпер Услуги

    const filterButtons = document.querySelectorAll(".filter-btn");
    const serviceItems = document.querySelectorAll(".service-item");
    let currentSwiper = null;

    function initSwiper() {
        if (currentSwiper) {
            currentSwiper.destroy(true, true);
        }

        currentSwiper = new Swiper(".services__swiper", {
            loop: true,
            speed: 600,
            slidesPerView: 1.1,
            spaceBetween: 12,
            navigation: {
                prevEl: ".services__nav--prev",
                nextEl: ".services__nav--next",
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 12
                },
                768: {
                    slidesPerView: 2.05,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 2.1,
                    spaceBetween: 16
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    }

    // Фильтрация карточек
    function filterServices(category) {
        serviceItems.forEach((item) => {
            const categories = item.getAttribute("data-category").split(" ");
            if (category === "all" || categories.includes(category)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });

        // Обновляем Swiper
        requestAnimationFrame(() => {
            if (currentSwiper) {
                currentSwiper.update();
            }
        });
    }

    // Обработчики фильтров
    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-filter");

            // Обновляем активную кнопку
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            this.classList.add("active");
            this.setAttribute("aria-selected", "true");

            // Фильтруем карточки
            filterServices(category);
        });
    });

    // Инициализация при загрузке
    initSwiper();
    filterServices("all");
});

//Слайдер главная секция
const heroSwiper = new Swiper(".hero-slider__swiper", {
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        prevEl: ".slider__nav--prev",
        nextEl: ".slider__nav--next",
    },
    pagination: {
        el: ".hero-slider__pagination",
        dynamicBullets: true,
        clickable: true,
    },
});
//Слайдер Специальные предложения
const specialOffersSwiper = new Swiper(".special-offers__swiper", {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
        576: {
            slidesPerView: 1.1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },

    navigation: {
        prevEl: ".special-offers__nav--prev",
        nextEl: ".special-offers__nav--next",
    },
    pagination: {
        el: ".special-offers__pagination",
        dynamicBullets: true,
        clickable: true,
        type: "bullets",
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
    },
});
// Слайдер Доктора
const doctorsSwiper = new Swiper(".doctors__swiper", {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 16,

    breakpoints: {
        450: {
            slidesPerView: 1.2,

        },
        576: {
            slidesPerView: 1.7,

        },
        768: {
            slidesPerView: 2,

        },
        992: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },

    navigation: {
        prevEl: ".doctors__nav--prev",
        nextEl: ".doctors__nav--next",
    },

    pagination: {
        el: ".doctors__pagination",
        dynamicBullets: true,
        clickable: true,
    },
});

// Слайдер в секции О нашей клинике
var swiperBullet = new Swiper(".about-clinic__swiper-bullet", {
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        576: {
            slidesPerView: 4,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 6,
            spaceBetween: 16,
        },
    },
});
var swiperBase = new Swiper(".about-clinic__swiper-base", {
    spaceBetween: 10,

    thumbs: {
        swiper: swiperBullet,
    },
});

// Слайдер в модальном окне

var swiperBulletModal = new Swiper(".modal__swiper-bullet", {
    spaceBetween: 5,
    slidesPerView: 7,
    direction: "horizontal",
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        768: {
            direction: "vertical",
            slidesPerView: 4,
            spaceBetween: 8,
        },
        1024: {
            direction: "horizontal",
            slidesPerView: 4, // или сколько вам нужно на десктопе
            spaceBetween: 8,
        },
    },
});
var swiperBaseModal = new Swiper(".modal__swiper-base", {
    spaceBetween: 10,
    thumbs: {
        swiper: swiperBulletModal,
    },
    // pagination: {
    //     el: '.modal__pagination',
    //     clickable: true,
    //     // dynamicBullets: true,
    //     // dynamicMainBullets: 4,
    // },
});

// Выпадающий список
const initChoices = () => {
    const elements = document.querySelectorAll(".default");

    elements.forEach((el) => {
        // Проверка, чтобы не инициализировать дважды
        if (!el.classList.contains("is-initialized")) {
            new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: "", // Убирает лишний текст "Press to select"
            });
            // Помечаем, что селект уже настроен
            el.classList.add("is-initialized");
        }
    });
};

// Маска для формы
document.addEventListener("DOMContentLoaded", initChoices);
$(function () {
    $(".input-phone").mask("+7 (999) 999 - 99 - 99");
});

Fancybox.bind("[data-fancybox]", {
    gestures: false, // ← главное: отключает свайпы/закрытие жестами
    dragToClose: false, // ← запрещает закрывать свайпом вниз
    hideScrollbar: false, // 
    compact: false,
    idle: false,
    infinite: true,
    Toolbar: {
        display: {
            left: ["infobar"],
            middle: [],
            right: ["iterateZoom", "slideshow", "close"],
        },
    },
    Images: {
        Panzoom: {
            maxScale: 2
        },
    },
});