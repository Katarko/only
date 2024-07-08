import * as _ from "lodash";
import "./scss/style.scss";
import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Controller } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import { HtmlTagObject } from "html-webpack-plugin";
import { gsap } from "gsap";

let events = [
    { id: 0, parentId: 1, title: "2000", description: "" },
    { id: 1, parentId: 1, title: "2000", description: "" },
    { id: 2, parentId: 1, title: "2000", description: "" },
    { id: 3, parentId: 1, title: "2000", description: "" },
    { id: 4, parentId: 1, title: "2000", description: "" },
    { id: 5, parentId: 1, title: "2000", description: "" },
];

function component() {
    return;
}
// events.forEach(function (element) {
//     let event = new Event(element.id, element.parentId, element.title, element.description);
// });
const titles: string[] = ["Заголовок", "Кино", "Литература", "Театр", "Заголовок", "Наука"];
document.querySelector<HTMLElement>(".period-slider__pagination-circle").style.transform = "rotate(0deg)";
class Event {
    id: number;
    parentId: number;
    title: string;
    description: string;
    constructor(eventId: number, eventParentId: number, eventTitle: string, eventDescription: string) {
        this.id = eventId;
        this.parentId = eventParentId;
        this.title = eventTitle;
        this.description = eventDescription;
    }
}
let mainSwiper = new Swiper(".period-slider__swiper", {
    modules: [Navigation, Pagination, EffectFade, Controller],
    slidesPerView: 1,
    effect: "fade",
    speed: 0,
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".period-slider__pagination",
        type: "fraction",
    },
    navigation: {
        prevEl: ".period-slider__btn_prev",
        nextEl: ".period-slider__btn_next",
    },
    on: {
        slideChangeTransitionStart: function () {
            gsap.effects.fadeOut(".swiper-pagination-bullet__title");
        },
        slideChangeTransitionEnd: function () {
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title");
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
        afterInit: function () {
            alignBullets();
        },
        slideChange: function () {
            rotateBullets();
        },
        slideChangeTransitionStart: function () {
            gsap.effects.fadeOut(".swiper-pagination-bullet__title");
        },
        slideChangeTransitionEnd: function () {
            gsap.effects.fadeIn(".swiper-pagination-bullet-active .swiper-pagination-bullet__title");
        },
    },
});

mainSwiper.controller.control = pagingSwiper;
pagingSwiper.controller.control = mainSwiper;

let eventSwiper = new Swiper(".event-slider__swiper", {
    modules: [Navigation],
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
});
function alignBullets() {
    let bullets = document.querySelectorAll<HTMLElement>(".swiper-pagination-bullet");
    let container = document.querySelector<HTMLElement>(".period-slider__pagination-circle");
    let diameter = container.offsetWidth,
        angle = -45,
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
        bulletTitle.textContent = titles[i];
        bulletIndex.textContent = (i + 1).toString();
        bullets[i].appendChild(bulletTitle);
        bullets[i].appendChild(bulletIndex);
        angle += step;
    }
}
function rotateBullets() {
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
gsap.registerEffect({
    name: "fadeIn",
    effect: (targets: HtmlTagObject, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 1 });
    },
    defaults: { duration: 0.4 }, //defaults get applied to any "config" object passed to the effect
});
gsap.registerEffect({
    name: "fadeOut",
    effect: (targets: HtmlTagObject, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: { duration: 0.1 }, //defaults get applied to any "config" object passed to the effect
});
