(function ($) {
    'use strict';
    $.fn.uui_show_text = function (options) {
        var self = this;
        var text = self.find('p').html();

        var settings = $.extend({
            max_length: 500,
            collapsed_text_label: 'Show full text'
        }, options);

        var show = $('<span>' + settings.collapsed_text_label + ' <i class="fa fa-sort-down"></i></span>');
        self.append(show);

        $.each(self, function () {
            self.attr('data-text', text);
            if (text.length > settings.max_length) {
                var substring = text.slice(0, settings.max_length - 3) + '...';
                self.find('p').html(substring);
            }
        });

        $(show).click(function () {
            var full_text = self.attr('data-text');
            self.removeAttr('data-text');
            self.find('p').html(full_text);
            show.css('display', 'none');
        });

        return this;
    };
})(jQuery);