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

var activeEntry = entries[0];
var activeEntryIndex = 0;
var activeImg = undefined;
var scrollTop = 0;
var deltaY = 0;

content.addEventListener('scroll', processScroll);
window.addEventListener('resize', processResize);

document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
});

processResize();

function processScroll(event) {
    
    // Set starting defaults
    changedFocus = false;
    marginTop = entries[0].offsetTop;

    // Work out the scroll direction
    deltaY = content.scrollTop - scrollTop;

    if (deltaY == 0) {
        return;
    } 
    if (deltaY >= 0) {
        // If moving down the page then look for distance to next
        refIndex = activeEntryIndex + 1;
        if (refIndex > entries.length - 1) {
            return;
        };
        ref = entries[refIndex];

        distRefEntry = content.scrollTop - ref.offsetTop + marginTop;
        if (distRefEntry > -100) {
            changedFocus = true;
        };
    } else {
        // Otherwise look for distance to previous
        refIndex = activeEntryIndex - 1;
        if (refIndex < 0) {
            return;
        }
        ref = entries[refIndex];
        offsetBottom = ref.offsetTop + ref.offsetHeight;

        distRefEntry = content.scrollTop - offsetBottom + marginTop;
        if (distRefEntry < 0) {
            changedFocus = true;
        };
    };
    if (changedFocus) {
        activeEntry = ref;
        activeEntryIndex = refIndex;
        setFormatting();
    };
    scrollTop = content.scrollTop;
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
    if (deltaY > 0 && window.innerWidth > 1200) {
        content.scrollTop = activeEntry.offsetTop - entries[0].offsetTop;
    }

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
        wrapper.style.padding = '30px 3vw 0px 3vw';
        container.style.padding = '0 0 0 0';
        content.style.scrollSnapType = 'unset';
        for (var entry of compile) {
            entry.style.display = 'inline';
            entry.style.paddingLeft = 0;
        };
    } else {
        sidebar.removeAttribute('style');
        wrapper.removeAttribute('style');
        container.removeAttribute('style');
    };
};