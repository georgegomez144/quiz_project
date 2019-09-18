Element.prototype.addClass = function (classNames) {
    let cns = classNames.split(' ');
    cns.forEach( cn => {
        this.classList.add(cn);
    });
    return this;
}

Element.prototype.removeClass = function(classNames) {
    let cns = classNames.split(' ');
    cns.forEach( cn => {
        this.classList.remove(cn);
    });
    return this;
}

Element.prototype.hasClass = function(classNames) {
    let cns = classNames.split(' ');
    let counter = 0;
    cns.forEach( cn => {
        if (this.classList.contains(cn)) counter++;
    });
    return counter === cns.length;
}

Element.prototype.data = function(name, value) {
    if(!value) return this.dataset[name];
    this.dataset[name] = value;
}

Element.prototype.on = function(event, func, options) {
    let events = event.split(' ');
    events.forEach( e => {
        this.addEventListener(e, func, options);
    });
}

Element.prototype.off = function(event, func, options) {
    let events = event.split(' ');
    events.forEach( e => {
        this.removeEventListener(e, func, options);
    });
}

Element.prototype.find = function(queries, returnArray) {
    returnArray = (returnArray !== null) ? returnArray : false;
    let qs = queries.split(/\,/g);
    let foundElements = [];
    qs.forEach( query => {
        let found = this.querySelectorAll(query);
        if(found.length !== 0) {
            if (found.length > 1) {
                found.forEach( fnd => foundElements.push(fnd) );
            } else {
                foundElements.push(found[0]);
            }
        }
    });
    if (!returnArray) if (foundElements.length === 1) return foundElements[0];
    return foundElements;
}