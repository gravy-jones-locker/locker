+function ($) {
'use strict';

// Multiple SCROLLSPY CLASS DEFINITION
// ===================================

function MultipleScrollSpy(element, options) {
this.$body = $(document.body)
this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
this.options = $.extend({}, MultipleScrollSpy.DEFAULTS, options)
var target = (this.options.target || '').split(',');
this.selector = target.map(function (s) { return s + ' .nav li > a' })
this.offsets = []
this.targets = []
this.activeTarget = []
this.scrollHeight = 0

this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
this.refresh()
this.process()
}

MultipleScrollSpy.VERSION = '0.0.1'

MultipleScrollSpy.DEFAULTS = {
offset: 10
}

MultipleScrollSpy.prototype.getScrollHeight = function () {
return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
}

MultipleScrollSpy.prototype.refresh = function () {
var that = this
var offsetMethod = 'offset'
var offsetBase = 0

this.offsets = []
this.targets = []
this.activeTarget = []
this.scrollHeight = this.getScrollHeight()

if (!$.isWindow(this.$scrollElement[0])) {
offsetMethod = 'position'
offsetBase = this.$scrollElement.scrollTop()
}

for (var i = 0; i < this.selector.length; i++) {
that.offsets[i] = [];
that.targets[i] = [];
this.$body
    .find(this.selector[i])
    .map(function () {
        var $el = $(this)
        var href = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href &&
            $href.length &&
            $href.is(':visible') &&
            [[$href[offsetMethod]().top + offsetBase, href]]) ||
            null
    })
    .sort(function (a, b) { return a[0] - b[0] })
    .each(function () {
        that.offsets[i].push(this[0])
        that.targets[i].push(this[1])
    })
}
}

MultipleScrollSpy.prototype.process = function () {
for (var k = 0; k < this.selector.length; k++) {
var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
var scrollHeight = this.getScrollHeight()
var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
var offsets = this.offsets[k] || []
var targets = this.targets[k] || []
var activeTarget = this.activeTarget[k]
var i

if (this.scrollHeight != scrollHeight) {
    this.refresh()
}

if (scrollTop >= maxScroll) {
    return activeTarget[k] != (i = targets[targets.length - 1]) && this.activate(k, i)
}

if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget[k] = null
    return this.clear(k)
}

for (i = offsets.length; i--;) {
    activeTarget != targets[i] &&
        scrollTop >= offsets[i] &&
        (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
        this.activate(k, targets[i])
}
}
}

MultipleScrollSpy.prototype.activate = function (index, target) {
this.activeTarget[index] = target

this.clear(index)

var selector = this.selector[index] +
'[data-target="' + target + '"],' +
this.selector[index] + '[href="' + target + '"]'

var active = $(selector)
.parents('li')
.addClass('active')

if (active.parent('.dropdown-menu').length) {
active = active
    .closest('li.dropdown')
    .addClass('active')
}

active.trigger('activate.bs.scrollspy')
}

MultipleScrollSpy.prototype.clear = function (index) {
$(this.selector[index])
.parentsUntil(this.options.target, '.active')
.removeClass('active')
}


// MULTIPLE SCROLLSPY PLUGIN DEFINITION
// ====================================

function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.scrollspy')
var options = typeof option == 'object' && option

if (!data) $this.data('bs.scrollspy', (data = new MultipleScrollSpy(this, options)))
if (typeof option == 'string') data[option]()
})
}

var old = $.fn.multipleScrollspy;

$.fn.multipleScrollspy = Plugin;
$.fn.multipleScrollspy.Constructor = MultipleScrollSpy;


// MULTIPLE SCROLLSPY NO CONFLICT
// =============================

($.fn.multipleScrollspy || {}).noConflict = function () {
$.fn.multipleScrollspy = old
return this
}


// MULTIPLE SCROLLSPY DATA-API
// ===========================

$(window).on('load.bs.scrollspy.data-api', function () {
$('[data-multiple-spy="scroll"]').each(function () {
var $spy = $(this)
Plugin.call($spy, $spy.data())
})
})

}(jQuery);