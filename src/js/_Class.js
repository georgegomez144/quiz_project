class _Class {
    constructor() {}

    all(query) {
        return document.querySelectorAll(query);
    }

    only(query) {
        return document.querySelector(query);
    }

    create(element) {
        return document.createElement(element);
    }
}

export default _Class;