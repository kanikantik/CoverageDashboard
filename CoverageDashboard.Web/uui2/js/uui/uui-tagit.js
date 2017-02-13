(function ($) {
    'use strict';
    $.fn.uui_tagit = function (options, value) {
        var self = this;
        var result_object = self.tagit(options, value);
        $.each(self, function (i, element) {
            if ($(element).hasClass('disable')) {
                $(this).find('.ui-widget-content').attr('disabled', 'disabled');
            }
            self.find('.ui-widget-content').attr('placeholder', options && options.placeholder ? options.placeholder :
                'Type your tags');
        });
        return result_object;
    };
}(jQuery));