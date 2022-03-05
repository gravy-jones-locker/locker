var content = document.getElementById('content');
var wrapper = document.getElementById('wrapper');
var logo = document.getElementById('logo');
var sectionHeader = document.getElementById('section-header');
var entryHeader = document.getElementById('entry-header');
var container = document.getElementById('container');
var navvy = document.getElementById('navvy');
var sidebar = document.getElementById('sidebar');
var entries = document.getElementsByClassName('section');
var links = document.getElementsByClassName('nav-link');

var mobileWidth = 1200;
var windowWidth = 0;  // Just a placeholder value

var activeEntry = entries[0];
var activeEntryIndex = 0;
var activeImg = undefined;

var contentScrollTop = 0;
var containerScrollTop = 0;

var clicking = false;

function processContainerScroll() {

    if (window.innerWidth > mobileWidth) {
        return;
    }

    // Get the scroll direction and reset static var for next time
    containerDeltaY = container.scrollTop - containerScrollTop;
    containerScrollTop = container.scrollTop;

    // Then check that the relevant settings are not already configured
    if (container.style.overflowY == 'hidden') {
        return;
    };

    // If scrolling down and < 20px distance to top of wrapper then change the scroll focus
    if (containerDeltaY > 0 && container.scrollTop + 20 >= wrapper.offsetTop) {
        content.style.overflowY = 'scroll';
        container.style.overflowY = 'hidden';

        // Set the position of the two scrollable containers going down
        container.scrollTop = wrapper.offsetTop;
        content.scrollTop = 1;
    };
};

function processContentScroll() {

    // Work out the scroll direction
    deltaY = content.scrollTop - contentScrollTop;
    contentScrollTop = content.scrollTop;

    if (clicking) {
        return;
    };
    if (windowWidth < mobileWidth) {
        checkContentScrollFocus(deltaY);
    };
    checkEntryFocus(deltaY);
};

function checkContentScrollFocus(deltaY) {

    // First check that the relevant settings are not already configured
    if (content.style.overflowY == 'hidden') {
        return;
    };

    // If scrolling up and at top of content then change the scroll focus
    if (deltaY < 0 && activeEntryIndex == 0 && content.scrollTop <= 10) {
        content.style.overflowY = 'hidden';
        container.style.overflowY = 'scroll';

        // Set the starting position of the two scrollable containers going up
        content.scrollTop = 0;

        scrollPos = sidebar.offsetHeight - 1;
        container.scrollTop = scrollPos;
    };
};

function checkEntryFocus(deltaY) {

    // Set starting defaults
    changedFocus = false;
    marginTop = entries[0].offsetTop;

    // If scrolling down then look for distance to next
    if (deltaY > 0) {
        refIndex = activeEntryIndex + 1;
        if (refIndex < entries.length) {
            ref = entries[refIndex];

            distRefEntry = content.scrollTop - ref.offsetTop + marginTop;
            if (distRefEntry > -100) {
                changedFocus = true;
            };
        };

    // Otherwise look for distance to previous
    } else if (deltaY < 0) {
        refIndex = activeEntryIndex - 1;
        if (refIndex > -1) {
            ref = entries[refIndex];
            offsetBottom = ref.offsetTop + ref.offsetHeight;

            distRefEntry = content.scrollTop - offsetBottom + marginTop;
            if (distRefEntry < -window.innerHeight * 2 / 3) {
                changedFocus = true;
            };
    }};
    if (changedFocus) {
        activeEntry = ref;
        activeEntryIndex = refIndex;
        setFormatting();  // Use the updated 'active' variables to change the formatting
    };
};

function setFormatting() {

    if (activeImg != undefined) {
        activeImg.style.visibility = 'hidden';  // Hide the existing background
    };
    if (activeEntry.id != 'summary') {
        // And show the new one
        activeImg = activeEntry.getElementsByClassName('background')[0];
        activeImg.style.visibility = 'visible';
    };

    for (var link of links) {
        link.classList.remove('active');
        href = link.getAttribute('href');
        if (href == null) {
            section = link;
            continue;
        };
        id = href.slice(1)
        if (id == activeEntry.id) {
            link.classList.add('active');
            section.classList.add('active');
        };
    };

    // Use the data encoded in the entry 'alt' attribute to set the header
    details = activeEntry.getAttribute('alt').split(' // ');
    sectionHeader.textContent = details[0];
    entryHeader.textContent = '// '.concat(details[1]);

    // Likewise with the color and wrapper/navvy/logo
    color = activeEntry.getElementsByClassName('color')[0].getAttribute('value');
    wrapper.style.background = color;
    navvy.style.background = color;

    logoColor = activeEntry.getElementsByClassName('logo-color')[0].getAttribute('value');
    logo.style.background = logoColor;

    if (window.innerWidth > mobileWidth) {
        content.scrollTop = activeEntry.offsetTop;
    };

};

function processResize() {
    if (window.innerWidth != windowWidth) {
        for (var elem of document.getElementsByClassName('adaptive')) {
            if (window.innerWidth < mobileWidth) {
                elem.classList.add('mobile');
            } else {
                elem.classList.remove('mobile');
                container.scrollTop = 0;
            };
        };
        windowWidth = window.innerWidth;
    };
};

function processLinkClick(event) {
    clicking = true;
    event.preventDefault();
    id = event.target.getAttribute('href').slice(1);
    index = 0;
    for (var entry of entries) {
        index += 1;
        if (entry.getAttribute('id') == id) {
            content.scrollTop = entry.offsetTop;
            activeEntry = entry;
            activeEntryIndex = index;
            setFormatting();
            break;
        };
    clicking = false;
    };
};

// Check to see if a resized window needs to be made to fit mobile
window.addEventListener('resize', processResize);

// Check for scroll focus changes and/or entry focus changes
container.addEventListener('scroll', processContainerScroll);
content.addEventListener('scroll', processContentScroll);

// Scroll to entries rather than linking
for (var link of links) {
    link.addEventListener('click', processLinkClick);
};

processResize();  // Execute on startup