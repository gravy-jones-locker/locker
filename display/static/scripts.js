var content = document.getElementById('content');
var wrapper = document.getElementById('wrapper');
var navvy = document.getElementById('navvy');
var logo = document.getElementById('logo');
var activeImg = undefined;
var activeHeader = undefined;

content.addEventListener('activate.bs.scrollspy', processScroll);

function processScroll() {

    // Hide the previously active image/header pair
    if (activeImg != undefined) {
        activeImg.style.visibility = 'hidden';
    };
    if (activeHeader != undefined) {
        activeHeader.style.visibility = 'hidden';
    };

    // Get the currently focused element
    scrollSpy = bootstrap.ScrollSpy.getInstance(content);
    elem = document.getElementById(scrollSpy._activeTarget.slice(1));


    // Set and show the corresponding image
    if (elem.id != 'summary') {
        activeImg = elem.getElementsByClassName('background')[0];
        activeImg.style.visibility = 'visible';
    };

    // Set and show the corresponding header
    activeHeader = document.getElementById('subheading__'.concat(elem.id));
    activeHeader.style.visibility = 'visible';

    // Set and rewrite the corresponding color settings
    color = elem.getElementsByClassName('color')[0].getAttribute('value');
    wrapper.style.background = color;
    navvy.style.background = color;

    logoColor = elem.getElementsByClassName('logo-color')[0].getAttribute('value');
    logo.style.background = logoColor;
}