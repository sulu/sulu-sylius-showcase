/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import './styles/app.css';
import './bootstrap.js';

const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
    const event = new Event('localStorage');

    event.value = value;
    event.key = key;

    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
};
