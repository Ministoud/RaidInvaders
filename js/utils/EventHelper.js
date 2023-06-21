export class EventHelper {
    constructor() {
        if (EventHelper.instance) {
            return EventHelper.instance;
        }
        EventHelper.instance = this;
    }

    sendEvent(eventName, detail) {
        window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }

    listenEvent(eventName, callback) {
        window.addEventListener(eventName, callback);
    }
}