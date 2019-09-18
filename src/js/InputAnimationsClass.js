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
        this.wrapElements(arrTextareas)
        .addFocusListenerToElements(arrTextareas)
        .addBlurListenerToElements(arrTextareas);
        this.wrapElements(arrSelects)
        .addFocusListenerToElements(arrSelects)
        .addBlurListenerToElements(arrSelects);
    }

    wrapElements(elements) {
        elements.forEach( element => {
            let wrapper = _.create('div');
            wrapper.addClass(`${element.nodeName.toLowerCase()}-container`);
            if (element.value.trim() === '' || element.value === 'Select the best answer') wrapper.addClass('empty');
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
                if (parent.hasClass(containerName)) parent.addClass('active').removeClass('empty');
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
                if (element.value.trim().length < 1 || element.value === 'Select the best answer') parent.addClass('error empty'); else parent.removeClass('error empty');
            });
        });
        return this;
    }
}


export default InputAnimationsClass;