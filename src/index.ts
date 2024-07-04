import * as _ from "lodash";
import "./scss/style.scss";
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register(); //import Icon from "./img/icon.png";
let events = [
    { id: 0, parentId: 1, title: "2000", description: "" },
    { id: 1, parentId: 1, title: "2000", description: "" },
    { id: 2, parentId: 1, title: "2000", description: "" },
    { id: 3, parentId: 1, title: "2000", description: "" },
    { id: 4, parentId: 1, title: "2000", description: "" },
    { id: 5, parentId: 1, title: "2000", description: "" },
];

function component() {
    const section = document.createElement("div");
    const title = document.createElement("h2");
    const swiperContainer = document.createElement("div");
    const swiperSlide = document.createElement("div");

    section.classList.add("section");
    section.appendChild(title);
    section.appendChild(swiperContainer);
    title.innerHTML = "Исторические даты";
    title.classList.add("section__title");
    swiperContainer.classList.add("swiper-container");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.innerHTML = "1";
    events.forEach(function (element) {
        let event = new Event(element.id, element.parentId, element.title, element.description);
    });

    return section;
}
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
// new Swiper(".swiper", {
//     slidesPerView: 3,
//     grid: {
//         rows: 3,
//     },
//     mousewheel: {
//         forceToAxis: true,
//     },
// });

document.body.appendChild(component());
