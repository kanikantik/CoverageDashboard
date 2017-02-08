(function ($) {
    'use strict';

    $.fn.uui_autocomplete = function (options, value) {
        var self = this;
        var result_object = self.typeahead(options, value);

        $.each(self, function (i, element) {
            var $input = $(element);
            $input.keyup(function () {
                setTimeout(function () {
                    if ($input.hasClass('large')) {
                        $input.next('.typeahead.dropdown-menu').addClass('large');
                    } else if ($input.hasClass('small')) {
                        $input.next('.typeahead.dropdown-menu').addClass('small');
                    }
                }, 10);
            });
        });

        return result_object;
    };
}(jQuery));