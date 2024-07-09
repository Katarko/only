import "./scss/style.scss";
import Swiper from "swiper";
import { Navigation, Pagination, Controller, Manipulation, FreeMode } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { HtmlTagObject } from "html-webpack-plugin";
import { gsap } from "gsap";

interface period {
    title: string;
    from: string;
    to: string;
    events: Array<event>;
}
interface event {
    year: string;
    event: string;
}
const periods: Array<period> = [
    {
        title: "Технологии",
        from: "1980",
        to: "1986",
        events: [
            {
                year: "1980",
                event: "Sinclair Research выпускает домашний компьютер ZX80",
            },
            {
                year: "1983",
                event: "Компания Coleco выпустила компьютер Coleco Adam.",
            },
            {
                year: "1984",
                event: "Apple представила миру Macintosh.",
            },
            {
                year: "1985",
                event: "Commodore выпустила Amiga 1000, первый домашний мультимедийный компьютер.",
            },
        ],
    },
    {
        title: "Кино",
        from: "1987",
        to: "1991",
        events: [
            {
                year: "1988",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "1989",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "1990",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    },
    {
        title: "Литература",
        from: "1992",
        to: "1997",
        events: [
            {
                year: "1993",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "1994",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "1995",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    },
    {
        title: "Театр",
        from: "1999",
        to: "2004",
        events: [
            {
                year: "2000",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2001",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2003",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    },
    {
        title: "Спорт",
        from: "2005",
        to: "2014",
        events: [
            {
                year: "2006",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2010",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2011",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    },
    {
        title: "Наука",
        from: "2015",
        to: "2022",
        events: [
            {
                year: "2015",
                event: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
            },
            {
                year: "2016",
                event: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
            },
            {
                year: "2017",
                event: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
            },
            {
                year: "2018",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2019",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                year: "2021",
                event: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    },
];

document.querySelector<HTMLElement>(".period-slider__pagination-circle").style.transform = "rotate(0deg)";
gsap.defaults({
    overwrite: true,
});
gsap.registerEffect({
    name: "fadeIn",
    effect: (targets: HtmlTagObject, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 1 });
    },
    defaults: { duration: 1 },
});
gsap.registerEffect({
    name: "fadeOut",
    effect: (targets: HtmlTagObject, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: { duration: 1 },
});
gsap.registerEffect({
    name: "fadeInOut",
    effect: (targets: HtmlTagObject, config: any) => {
        return gsap.fromTo(targets, { duration: config.duration, opacity: 0 }, { duration: config.duration, opacity: 1 });
    },
    defaults: { duration: 2 },
});
let mainSwiper = new Swiper(".period-slider__swiper", {
    modules: [Navigation, Pagination, Controller],
    slidesPerView: 1,
    speed: 0,
    pagination: {
        el: ".period-slider__pagination",
        type: "fraction",
        formatFractionCurrent: addPadStart,
        formatFractionTotal: addPadStart,
    },
    navigation: {
        prevEl: ".period-slider__btn_prev",
        nextEl: ".period-slider__btn_next",
    },
    on: {
        beforeInit: function () {
            setSlides();
        },
        slideChange: function () {
            setEvents();
            gsap.effects.fadeInOut(".event-slider", { duration: 1 });
        },
        beforeTransitionStart: function () {
            gsap.effects.fadeOut(".swiper-pagination-bullet__title", { duration: 0 });
        },
        slideChangeTransitionEnd: function () {
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title", { duration: 0.4 });
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title", { duration: 0.4 });
            animateCounter();
        },
    },
});
let pagingSwiper = new Swiper(".period-slider__swiper", {
    modules: [Pagination, Controller],
    pagination: {
        el: ".period-slider__pagination-circle",
        clickable: true,
    },
    on: {
        init: function () {
            alignBullets();
        },
        afterInit: function () {
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title", { duration: 0 });
        },
        slideChange: function () {
            rotateBullets();
            gsap.effects.fadeInOut(".event-slider", { duration: 1 });
        },
        beforeTransitionStart: function () {
            gsap.effects.fadeOut(".swiper-pagination-bullet__title", { duration: 0 });
        },
        slideChangeTransitionEnd: function () {
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title", { duration: 0.4 });
        },
    },
});

mainSwiper.controller.control = pagingSwiper;
pagingSwiper.controller.control = mainSwiper;

let eventSwiper = new Swiper(".event-slider__swiper", {
    modules: [Navigation, Manipulation, FreeMode],
    direction: "horizontal",
    slidesPerView: 3,
    spaceBetween: 80,
    grid: {
        rows: 3,
    },
    navigation: {
        prevEl: ".event-slider__btn_prev",
        nextEl: ".event-slider__btn_next",
    },
    breakpoints: {
        320: {
            slidesPerView: "auto",
            spaceBetween: 25,
            freeMode: {
                enabled: true,
            },
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 25,
            freeMode: {
                enabled: false,
            },
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 60,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 80,
        },
    },
});
function alignBullets() {
    if (window.innerWidth > 991) {
        let bullets = document.querySelectorAll<HTMLElement>(".swiper-pagination-bullet");
        let container = document.querySelector<HTMLElement>(".period-slider__pagination-circle");
        let diameter = container.offsetWidth,
            angle = -1.0471975512,
            radius = diameter / 2,
            step = (2 * Math.PI) / bullets.length,
            bulletWidth = bullets[0].offsetWidth;
        for (let i = 0; i < bullets.length; i++) {
            let x = Math.round(diameter / 2 + radius * Math.cos(angle) - bulletWidth / 2);
            let y = Math.round(diameter / 2 + radius * Math.sin(angle) - bulletWidth / 2);
            bullets[i].style.left = x + "px";
            bullets[i].style.top = y + "px";
            let bulletTitle = document.createElement("div");
            let bulletIndex = document.createElement("div");
            bulletTitle.className = "swiper-pagination-bullet__title";
            bulletIndex.className = "swiper-pagination-bullet__index";
            bulletTitle.textContent = periods[i].title;
            bulletIndex.textContent = (i + 1).toString();
            bullets[i].appendChild(bulletTitle);
            bullets[i].appendChild(bulletIndex);
            angle += step;
        }
    }
}
function rotateBullets() {
    if (window.innerWidth > 991) {
        let bullets = document.querySelectorAll<HTMLElement>(".swiper-pagination-bullet");
        let container = document.querySelector<HTMLElement>(".period-slider__pagination-circle");
        let rotateAngle = ((pagingSwiper.activeIndex - pagingSwiper.previousIndex) * 360) / bullets.length;
        if (rotateAngle >= 180) {
            rotateAngle = ((rotateAngle - 360) * -1) % 360;
        } else if (rotateAngle < -180) {
            rotateAngle = ((rotateAngle + 360) * -1) % 360;
        } else {
            rotateAngle = -rotateAngle;
        }
        let newAngle = parseInt(container.style.getPropertyValue("transform").replace(/(?!-)[^0-9.]/g, "")) + rotateAngle;
        container.style.transform = "rotate(" + newAngle + "deg)";
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].style.transform = "rotate(" + -newAngle + "deg)";
        }
    }
}
function animateCounter() {
    let ativeSlide = document.querySelector(".swiper-slide.swiper-slide-active");
    gsap.to(document.querySelector(".period-slider__title_min"), {
        textContent: ativeSlide.getAttribute("data-from"),
        duration: 1,
        snap: { textContent: 1 },
    });
    gsap.to(document.querySelector(".period-slider__title_max"), {
        textContent: ativeSlide.getAttribute("data-to"),
        duration: 1,
        snap: { textContent: 1 },
    });
}
function setSlides() {
    for (let i = 0; i < periods.length; i++) {
        let slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.setAttribute("data-from", periods[i].from);
        slide.setAttribute("data-to", periods[i].to);
        document.querySelector(".period-slider .swiper-wrapper").appendChild(slide);
    }
}
function setEvents() {
    eventSwiper.removeAllSlides();
    document.querySelector(".event-slider__title").textContent = periods[mainSwiper.activeIndex].title;
    let events = periods[mainSwiper.activeIndex].events;
    for (let i = 0; i < events.length; i++) {
        let slide = document.createElement("div");
        let title = document.createElement("div");
        let desc = document.createElement("div");
        slide.className = "swiper-slide event-item";
        title.className = "event-item__title";
        desc.className = "event-item__desc";
        title.textContent = events[i].year;
        desc.textContent = events[i].event;
        slide.appendChild(title);
        slide.appendChild(desc);
        eventSwiper.appendSlide(slide);
    }
}
setEvents();
function addPadStart(number: number) {
    return number.toString().padStart(2, "0");
}
