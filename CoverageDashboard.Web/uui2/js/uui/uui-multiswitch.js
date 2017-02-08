(function () {
    'use strict';
    $.fn.uui_multiswitch = function (method_or_options) {
        var self = this;

        var methods = {
            init: function () {
                $.each(self, function (i, switch_element) {
                    var $label = $(switch_element).find('label');
                    $label.unbind('click');

                    $.each($label, function (i, element) {
                        if ($(switch_element).hasClass('disable')) {
                            $(element).addClass('disable');
                        }
                        $(element).click(function (e) {
                            e.preventDefault();
                            if ($(this).hasClass('disable') || $(switch_element).hasClass('disable')) {
                                return;
                            }
                            if (!$(this).hasClass('active')) {
                                $(this).parents('.uui-multiswitch').find('label').removeClass('active');
                                $(this).addClass('active');
                                $(this).parents('.uui-multiswitch').find('input').removeAttr('checked');
                                $(this).parents('.uui-multiswitch').find('input').prop('checked', false);
                                $(this).prev().attr('checked', 'checked');
                                $(this).prev().prop('checked', true);
                                $(switch_element).trigger('uui.multiswitch.change');
                            }
                        });
                    });
                    $(switch_element).find('input:checked').next().trigger('click');
                });
                return $(self);
            },
            get_value: function () {
                return $(self).find('input:checked').val();
            },
            show_error: function () {
                $(self).addClass('error');
            },
            remove_error: function () {
                $(self).removeClass('error');
            },
            disable: function () {
                $(self).addClass('disable');
                $.each($(self), function () {
                    $(this).find('label').addClass('disable');
                });
            },
            enable: function () {
                $(self).removeClass('disable');
                $.each($(self), function () {
                    $(this).find('label').removeClass('disable');
                });
            },
            reset: function () {
                $(self).find('input:first').next().trigger('click');
            }
        };

        if (typeof method_or_options === 'object' || !method_or_options) {
            return methods.init(method_or_options);
        } else if (methods[method_or_options]) {
            return methods[method_or_options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
}(jQuery));

