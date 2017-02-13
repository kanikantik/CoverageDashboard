(function ($) {
    'use strict';
    $.fn.uui_tooltip = function (options) {
        var self = this;
        var result_object = self.tooltip(options);

        if (typeof options === 'object' && 'color' in options && result_object instanceof jQuery) {
            self.each(function(i, elem) {
                $(elem).on('inserted.bs.tooltip', function() {
                    var tooltip_id = $(elem).attr('aria-describedby');
                    $('#' + tooltip_id).addClass(options.color);
                });
            });
        }
        return result_object;
    };
}(jQuery));