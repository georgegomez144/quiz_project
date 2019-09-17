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

        if (this.debug) console.log(this);
    }

    createButtons(buttonContainerClass, type) {
        const div = document.createElement('div');
        div.classList.add(`${buttonContainerClass}--container`);
        div.innerHTML = `<button class="btn prev">Previous ${type}</button>
            <div class="spacer with-buttons"></div>
            <button class="btn next">Next ${type}</button>`;
        div.querySelector('.spacer.with-buttons').innerHTML = this.createLinks(type);
        div.firstChild.addEventListener('click', () => {
            this.updateCurrent(type, '-');
        });
        div.lastChild.addEventListener('click', () => {
            this.updateCurrent(type, '+');
        });
        
        div.querySelector('.spacer.with-buttons').querySelectorAll('.btn').forEach( btn => {
            btn.addEventListener('click', () => {
                let type = btn.dataset.type;
                if(type === 'step') this.currentStep = btn.dataset.goToPage;
                if(type === 'question') this.currentQuestion = btn.dataset.goToPage;
                this.activateContainers();
            });
        });
        
        return div;
    }

    createLinks(type) {
        const div = document.createElement('div');
        let strButtons = '';
        if(type === 'step') {
            for( let i = 0; i < this.steps.length; i++) {
                let stepNumber = i + 1;
                strButtons += `<button class="btn" data-go-to-page="${stepNumber}" data-type="step">${stepNumber}</button>`;
            }
        }
        if(type === 'question') {
            for( let i = 0; i < this.questions.length; i++) {
                let stepNumber = i + 1;
                strButtons += `<button class="btn" data-go-to-page="${stepNumber}" data-type="question">${stepNumber}</button>`;
            }
        }
        div.innerHTML = strButtons;

        return strButtons;
    }

    buildButtons() {
        let buttons;
        this.steps.forEach( (v, i) => {
            buttons = this.createButtons('step-btn', 'step');
            v.appendChild(buttons);
        });
        this.questions.forEach( v => {
            buttons = this.createButtons('question-btn', 'question');
            v.innerHTML = `<div class="question-content">${v.innerHTML}</div>`;
            v.appendChild(buttons);
        });
    }

    updateCurrent(type, incrementType) {
        if (type === 'step') {
            if (incrementType === '+') if (this.currentStep < this.steps.length) this.currentStep++;
            if (incrementType === '-') if (this.currentStep > 1) this.currentStep--;
        }
        if (type === 'question') {
            if (incrementType === '+') if (this.currentQuestion < this.questions.length) this.currentQuestion++;
            if (incrementType === '-') if (this.currentQuestion > 1) this.currentQuestion--;
        }
        this.activateContainers();
    }

    activateContainers() {
        const cns = ['active','previous','next'];
        this.steps.forEach( step => { cns.forEach( cn => step.classList.remove(cn) ); });
        this.questions.forEach( question => { cns.forEach( cn => question.classList.remove(cn) ); });
        this.steps.forEach( step => {
            if (+step.dataset.step === +this.currentStep) step.classList.add(cns[0]);
            if (+this.currentStep !== 0 && +step.dataset.step < +this.currentStep) step.classList.add(cns[1]);
            if (this.steps.length -1 !== +this.currentStep && +step.dataset.step > +this.currentStep) step.classList.add(cns[2]);
        });
        this.questions.forEach( question => {
            if (+question.dataset.question === +this.currentQuestion) question.classList.add(cns[0]);
            if (+this.currentQuestion !== 0 && +question.dataset.question < +this.currentQuestion) question.classList.add(cns[1]);
            if (this.questions.length -1 !== +this.currentQuestion && +question.dataset.question > +this.currentQuestion) question.classList.add(cns[2]);
        });

        let paginationBtns = document.querySelectorAll('.spacer.with-buttons .btn');
        paginationBtns.forEach( btn => {
            let type = btn.dataset.type;
            let paginationNumber = btn.dataset.goToPage;
            btn.classList.remove(cns[0]);
            if (type === 'step') { if (+paginationNumber === +this.currentStep) btn.classList.add(cns[0]); }
            if (type === 'question') { if (+paginationNumber === +this.currentQuestion) btn.classList.add(cns[0]); }
        });
    }
}

export default SliderClass; 