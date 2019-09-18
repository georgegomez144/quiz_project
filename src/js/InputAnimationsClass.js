import _Class from './_Class';
let _ = new _Class();

class InputAnimationsClass {
    constructor() {
        let arrInputs = _.all('input');
        let arrTextareas = _.all('textarea');
        let arrSelects = _.all('select');

        this.wrapElements(arrInputs)
            .addFocusListenerToElements(arrInputs)
            .addBlurListenerToElements(arrInputs);
        this.wrapElements(arrTextareas);
        this.wrapElements(arrSelects);
    }

    wrapElements(elements) {
        elements.forEach( element => {
            let wrapper = _.create('div');
            wrapper.addClass(`${element.nodeName.toLowerCase()}-container`);
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        });
        return this;
    }

    addFocusListenerToElements(elements) {
        elements.forEach( element => {
            element.on('focus', function() {
                let parent = element.parentNode;
                let elementName = element.nodeName.toLowerCase();
                let containerName = `${elementName}-container`;
                if (parent.hasClass(containerName)) parent.addClass('active');
            });
        });
        return this;
    }

    addBlurListenerToElements(elements) {
        elements.forEach( element => {
            element.on('blur', function() {
                let parent = element.parentNode;
                let elementName = element.nodeName.toLowerCase();
                let containerName = `${elementName}-container`;
                if (parent.hasClass(containerName)) parent.removeClass('active');
                if (element.value.trim().length < 1) parent.addClass('error'); else parent.removeClass('error');
            });
        });
        return this;
    }
}


export default InputAnimationsClass;