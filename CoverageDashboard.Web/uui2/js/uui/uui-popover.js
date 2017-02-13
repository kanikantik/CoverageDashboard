(function ($) {
    'use strict';
    $.fn.uui_popover = function (options) {
        var self = this;
        var result_object = self.popover(options);

        if (typeof options === 'object' && 'color' in options && result_object instanceof jQuery) {
            self.each(function(i, elem) {
                $(elem).on('inserted.bs.popover', function() {
                    var popover_id = $(elem).attr('aria-describedby');
                    $('#' + popover_id).addClass(options.color);
                });
            });
        }
        return result_object;
    };
}(jQuery));