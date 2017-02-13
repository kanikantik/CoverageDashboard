(function ($) {
    'use strict';
    $.fn.uui_datepicker = function (options, value) {
        var self = this;
        var result_object = self.datepicker(options, value);
        
        if (typeof options === 'object' && 'color' in options) {
            self.find(".datepicker-inline").addClass(options.color);
            if (result_object instanceof jQuery) {
                result_object.on('show', function() {
                    $('body').find('.datepicker-dropdown').addClass(options.color);
                });
            }
        }
        return result_object;
    };
}(jQuery));