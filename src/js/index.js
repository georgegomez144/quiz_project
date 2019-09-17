// Webpack entrypoint

import '../styles/styles.scss';
import ExampleClass from './ExampleClass';
import SliderClass from './SliderClass';

// Any JS below runs on page load
// let example = new ExampleClass();
// let message = example.getMessage();
// console.log(message);
let slider = new SliderClass("#slider_questionaire", {debug: false});