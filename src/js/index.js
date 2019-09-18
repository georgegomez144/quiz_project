// Webpack entrypoint

import '../styles/styles.scss';
import './Prototypes';
import ExampleClass from './ExampleClass';
import SliderClass from './SliderClass';
import InputAnimationsClass from './InputAnimationsClass';

// Any JS below runs on page load
// let example = new ExampleClass();
// let message = example.getMessage();
// console.log(message);
let slider = new SliderClass("#slider_questionaire", {debug: false});
let inputAnimations = new InputAnimationsClass();