(function ($) {
    'use strict';

    $.fn.uui_timepicker = function (options, value) {
        var self = this;
        var result_object = self.timepicker(options, value);

        $.each(self, function (i, element) {
            $(element).focus(function () {
                $(element).parent().addClass('focus');

            });
            $(element).blur(function () {
                $(element).parent().removeClass('focus');
            });
        });

        if (typeof options === 'object' && 'color' in options) {
            self.parents('.uui-timepicker').addClass(options.color);
            if (result_object instanceof jQuery) {
                result_object.on('show.timepicker', function () {
                    $('body').find('.bootstrap-timepicker-widget').addClass(options.color);
                });
            }
        }
        return result_object;
    };
}(jQuery));