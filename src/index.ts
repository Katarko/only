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
let mainSwiper = new Swiper(".time-period-slider__swiper", {
    modules: [Navigation, Pagination, EffectFade, Controller],
    slidesPerView: 1,
    effect: "fade",
    speed: 0,
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".time-period-slider__pagination",
        type: "fraction",
    },
    navigation: {
        prevEl: ".time-period-slider__btn_prev",
        nextEl: ".time-period-slider__btn_next",
    },
});
let pagingSwiper = new Swiper(".time-period-slider__swiper", {
    modules: [Pagination, Controller],
    pagination: {
        el: ".time-period-slider__pagination-circle",
        clickable: true,
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

function animate() {
    // const items = document.querySelectorAll(".time-period-item__val");
    // let a = [500, 1500];
    // console.log(items);
    // gsap.from(items, {
    //     textContent: a,
    //     duration: 4,
    //     ease: "power1.in",
    //     snap: { textContent: 1 },
    // });
    // gsap.utils.toArray(".time-period-item__val").forEach((box) => {
    //     var spin = box.getAttribute("data-spin");
    //     let tween = gsap.from(box, {
    //         textContent: spin,
    //         duration: 4,
    //         ease: "power1.in",
    //         snap: { textContent: 1 },
    //     });
    // });
}
animate();
