(function ($) {
    'use strict';

    $.fn.uui_rating = function (method_or_options) {
        var self = this;

        var methods = {
            init: function (options) {
                var settings = $.extend({
                    count: 5,
                    animate_hover: true,
                    read_only: false
                }, options);

                $(self).empty();
                $.each(self, function (i, element) {
                    if (typeof $(element).data('value') === typeof undefined) {
                        $(element).data('value', 0);
                    }

                    for (var j = 0; j < settings.count; j++) {
                        var star = $('<span />').addClass('star');
                        if (j + 1 <= $(element).data('value')) {
                            star.addClass('fa fa-star');
                        }
                        else {
                            star.addClass('fa fa-star-o');
                        }
                        if ($(element).hasClass('disable')) {
                            star.addClass('disable');
                        }
                        $(element).append(star);
                    }

                    if (settings.read_only) {
                        $(element).find('.star').css('cursor', 'default');
                    }

                    $(element).click(function (e) {
                        if ($(element).hasClass('disable') || settings.read_only) {
                            return;
                        }
                        var clicked_star_number = $.inArray(e.target, $(element).find('.star')) + 1;
                        $(element).data('value', clicked_star_number);
                        $.each($(element).find('.star'), function (i, star) {
                            if (i + 1 <= clicked_star_number) {
                                if (!$(star).hasClass('fa fa-star')) {
                                    $(star).removeClass('fa fa-star-o').addClass('fa fa-star');
                                }
                            }
                            else {
                                if ($(star).hasClass('fa fa-star')) {
                                    $(star).removeClass('fa fa-star').addClass('fa fa-star-o');
                                }
                            }
                        });
                        $(element).trigger('uui.rating.change');
                    });
                    if (settings.animate_hover && !settings.read_only) {
                        $(element).mouseover(function (e) {
                            if ($(element).hasClass('disable')) {
                                return;
                            }
                            var hovered_star_number = $.inArray(e.target, $(element).find('.star')) + 1;
                            var clicked_star_number = parseInt($(element).data('value'));
                            if (hovered_star_number <= clicked_star_number) {
                                return;
                            }
                            $.each($(element).find('.star').slice(clicked_star_number, settings.count),
									function (i, star) {
                                if (i + clicked_star_number + 1 <= hovered_star_number) {
                                    if (!$(star).hasClass('fa fa-star')) {
                                        $(star).removeClass('fa fa-star-o').addClass('fa fa-star');
                                    }
                                }
                                else {
                                    if ($(star).hasClass('fa fa-star')) {
                                        $(star).removeClass('fa fa-star').addClass('fa fa-star-o');
                                    }
                                }
                            });
                        });

                        $(element).mouseout(function () {
                            if ($(element).hasClass('disable')) {
                                return;
                            }
                            var clicked_star_number = parseInt($(element).data('value'));
                            $(element).data('value', clicked_star_number);
                            $.each($(element).find('.star'), function (i, star) {
                                if (i + 1 <= clicked_star_number) {
                                    if (!$(star).hasClass('fa fa-star')) {
                                        $(star).removeClass('fa fa-star-o').addClass('fa fa-star');
                                    }
                                }
                                else {
                                    if ($(star).hasClass('fa fa-star')) {
                                        $(star).removeClass('fa fa-star').addClass('fa fa-star-o');
                                    }
                                }
                            });
                        });
                    }
                });
                return $(self);
            },
            get_value: function () {
                return parseInt($(self).data('value'));
            },
            set_value: function (value) {
                $(self).data('value', value);
                $.each($(self).find('.star'), function (i, star) {
                    if (i + 1 <= parseInt(value)) {
                        if (!$(star).hasClass('fa fa-star')) {
                            $(star).removeClass('fa fa-star-o').addClass('fa fa-star');
                        }
                    }
                    else {
                        if (i < value && value < i + 1) {
                            if (!$(star).hasClass('fa fa-star-half-empty')) {
                                $(star).removeClass('fa fa-star-o').addClass('fa fa-star-half-empty');
                            }
                        } else {
                            if ($(star).hasClass('fa fa-star')) {
                                $(star).removeClass('fa fa-star').addClass('fa fa-star-o');
                            }
                        }
                    }
                });
            },
            show_error: function () {
                $(self).addClass('error');
            },
            remove_error: function () {
                $(self).removeClass('error');
            },
            disable: function () {
                $(self).addClass('disable');
                $(self).find('.star').addClass('disable');
            },
            enable: function () {
                $(self).removeClass('disable');
                $(self).find('.star').removeClass('disable');
            },
            reset: function () {
                methods.set_value(0);
            }
        };

        if (typeof method_or_options === 'object' || !method_or_options) {
            return methods.init(method_or_options);
        } else if (methods[method_or_options]) {
            return methods[method_or_options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
})(jQuery);