var content = document.getElementById('content');
var wrapper = document.getElementById('wrapper');
var navvy = document.getElementById('navvy');
var logo = document.getElementById('logo');
var sectionHeader = document.getElementById('section-header');
var entryHeader = document.getElementById('entry-header');
var sidebar = document.getElementById('sidebar');
var technical = document.getElementsByClassName('technical');
var feedback = document.getElementsByClassName('feedback');
var compile = document.getElementsByClassName('compile');
var container = document.getElementById('container');
var entries = document.getElementsByClassName('section');

var activeEntry = undefined;
var activeImg = undefined;

content.addEventListener('scroll', processScroll);
window.addEventListener('resize', processResize);

processResize();

function processScroll(event) {
    marginTop = entries[0].offsetTop;
    for (var entry of entries) {
        if (entry == activeEntry) {
            continue;
        };
        delta_y = Math.abs(content.scrollTop - entry.offsetTop + marginTop);
        if (delta_y < 200) {
            if (entry == activeEntry) {
                return;
            };
            activeEntry = entry;
            setFormatting();
        };
    };
};

function setFormatting() {
    if (activeImg != undefined) {
        activeImg.style.visibility = 'hidden';
    };
    if (activeEntry.id != 'summary') {
        activeImg = activeEntry.getElementsByClassName('background')[0];
        activeImg.style.visibility = 'visible';
    };
    details = activeEntry.getAttribute('alt').split(' // ');

    sectionHeader.textContent = details[0];
    entryHeader.textContent = '// '.concat(details[1]);
    console.log(activeEntry.offsetTop);
    content.scrollTop = activeEntry.offsetTop - entries[0].offsetTop;

    color = activeEntry.getElementsByClassName('color')[0].getAttribute('value');
    
    wrapper.style.background = color;
    navvy.style.background = color;

    logoColor = activeEntry.getElementsByClassName('logo-color')[0].getAttribute('value');
    logo.style.background = logoColor;
};

function processResize() {
    if (window.innerWidth < 1200) {
        sidebar.style.visibility = 'hidden';
        sidebar.style.width = 0;
        sidebar.style.margin = '0px 0px 0px 0px';
    } else {
        sidebar.removeAttribute('style');
    };
    if (window.innerWidth < 600) {
        for (var entry of compile) {
            entry.style.display = 'inline';
            entry.style.paddingLeft = 0;
        };
    } else {
        for (var entry of compile) {
            entry.removeAttribute('style');
        }
    }
    if (window.innerWidth < 800) {
        wrapper.style.padding = '30px 3vw 0px 3vw';
        container.style.padding = '0 0 0 0';
    } else {
        wrapper.removeAttribute('style');
        container.removeAttribute('style');
    };
};