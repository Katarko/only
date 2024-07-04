import * as _ from "lodash";
import "./scss/style.scss";
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

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
events.forEach(function (element) {
    let event = new Event(element.id, element.parentId, element.title, element.description);
});

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
new Swiper(".swiper", {
    slidesPerView: 3,
    grid: {
        rows: 3,
    },
    mousewheel: {
        forceToAxis: true,
    },
});
