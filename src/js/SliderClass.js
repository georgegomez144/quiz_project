class SliderClass {

    constructor(selector, options) {
        this.currentStep = 1;
        this.currentQuestion = 1;
        this.sliderContainer = document.querySelector(selector);
        if(!!this.sliderContainer) {
            this.sliderContainer.classList.add('slider');
            this.steps = this.sliderContainer.querySelectorAll('[data-step]');
            this.questions = this.sliderContainer.querySelectorAll('[data-question]');

            this.buildStepButtons('step-btn');
            this.buildQuestionButtons('question-btn');

            this.steps[this.currentStep - 1].classList.add('active');
        }

        if (options.debug) console.log(this);
    }

    createButtons(buttonContainerClass) {
        const div = document.createElement('div');
        div.classList.add(`${buttonContainerClass}--container`);
        div.innerHTML = '<span class="btn prev">Previous</span><span class="btn next">Next</span>';
        div.firstChild.addEventListener('click', this.prevClick);
        div.lastChild.addEventListener('click', this.nextClick);
        return div;
    }

    buildStepButtons(containerClass) {
        this.steps.forEach( (v, i) => {
            let buttons = this.createButtons(containerClass);
            if (i === this.steps.length - 1) buttons.lastChild.remove();
            v.appendChild(buttons);
        });
    }

    buildQuestionButtons(containerClass) {
        this.questions.forEach( (v, i) => {
            let buttons = this.createButtons(containerClass);
            if (i === this.questions.length - 1) buttons.lastChild.remove();
            v.appendChild(buttons);
        });
    }

    nextClick(type) {
        if (type === 'step') if (this.currentStep < this.steps.length) this.currentStep++;
        if (type === 'question') if (this.currentQuestion < this.questions.length) this.currentQuestion++;
    }

    prevClick(type) {
        if (type === 'step') if (this.currentStep > 0) this.currentStep--;
        if (type === 'question') if (this.currentQuestion > 0) this.currentQuestion--;
    }
}

export default SliderClass;