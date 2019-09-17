class SliderClass {

    constructor(selector, options) {
        this.debug = options.debug ? options.debug : false;
        this.currentStep = 1;
        this.currentQuestion = 1;
        this.sliderContainer = document.querySelector(selector);
        if(!!this.sliderContainer) {
            this.sliderContainer.classList.add('slider');
            this.steps = this.sliderContainer.querySelectorAll('[data-step]');
            this.questions = this.sliderContainer.querySelectorAll('[data-question]');

            this.buildButtons();
            this.activateContainers();
        }

        if (options.debug) console.log(this);
    }

    createButtons(buttonContainerClass, type) {
        const div = document.createElement('div');
        div.classList.add(`${buttonContainerClass}--container`);
        div.innerHTML = `<button class="btn prev">Previous ${type}</button><div style="flex: 1"></div><button class="btn next">Next ${type}</button>`;
        div.firstChild.addEventListener('click', () => {
            this.updateCurrent(type, '-');
        });
        div.lastChild.addEventListener('click', () => {
            this.updateCurrent(type, '+');
        });
        return div;
    }
    
    removeUneededButtons(type, buttons, i) {
        if (this.debug) console.log(buttons, this.steps.length, this.questions.length, i);
        if (+i === 1) buttons.firstChild.remove();
        if (type === 'step') if (+i === this.steps.length) buttons.lastChild.remove();
        if (type === 'question') if (+i === this.questions.length) buttons.lastChild.remove();
        return buttons;
    }

    buildButtons() {
        this.steps.forEach( (v, i) => {
            let buttons = this.createButtons('step-btn', 'step');
            v.appendChild(this.removeUneededButtons('step', buttons, v.dataset.step));
        });
        this.questions.forEach( (v, i) => {
            let buttons = this.createButtons('question-btn', 'question');
            v.appendChild(this.removeUneededButtons('question', buttons, v.dataset.question));
        });
    }

    updateCurrent(type, crement) {
        if (this.debug) console.log('button click', type, crement);
        if (type === 'step') {
            if (crement === '+') if (this.currentStep < this.steps.length) this.currentStep++;
            if (crement === '-') if (this.currentStep > 1) this.currentStep--;
        }
        if (type === 'question') {
            if (crement === '+') if (this.currentQuestion < this.questions.length) this.currentQuestion++;
            if (crement === '-') if (this.currentQuestion > 1) this.currentQuestion--;
        }
        if (this.debug) console.log(this.currentStep, this.currentQuestion);
        this.activateContainers();
    }

    activateContainers() {
        this.steps.forEach( v => v.classList.remove('active'));
        this.questions.forEach( v => v.classList.remove('active'));
        this.steps.forEach( v => { if (+v.dataset.step === +this.currentStep) v.classList.add('active') });
        this.questions.forEach( v => { if (+v.dataset.question === +this.currentQuestion) v.classList.add('active') });
        if (this.debug) console.log(this.steps, this.questions);
    }
}

export default SliderClass; 