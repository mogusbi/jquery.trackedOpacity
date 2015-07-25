/*!
 * Tracked Opacity v1.0.0
 * Fade an element as you scroll down a page
 * http://mogusbi.co.uk
 *
 * Written by Mo Gusbi
 */
; (function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'trackedOpacity';

  function Plugin(element, options) {
    this.element = element;
    this._name = pluginName;
    this.init();
  }

  $.extend(Plugin.prototype, {
    init: function () {
      var _this = this;

      $(window).on('scroll load', function () {
        _this.scrollEvent();
      });
    },
    scrollEvent: function () {
      var currentScrollPos = parseInt($(window).scrollTop(), 10),
          elementHeight = parseInt($(this.element).outerHeight(), 10);

      $(this.element).css({
        'opacity': (currentScrollPos <= elementHeight ? parseFloat(1 - (currentScrollPos / elementHeight)) : 0)
      });
    }
  });

  $.fn[pluginName] = function () {
    this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this));
      }
    });

    return this;
  };
})(jQuery, window, document);