(function ($) {
    'use strict';
    $.fn.uui_tree_grid = function (options) {
        var self = this;

        var processed_nodes = [];
        var processed_children = [];

        self.update = function () {
            $.each($(self).find('tr.treegrid-child'), function (i, child) {
                if ($.inArray(child, processed_children) === -1) {
                    if (settings.collapsed) {
                        $(child).hide();
                    }

                    if (settings.padding_automation) {
                        $(child).find('td:nth-child(' + settings.td_with_padding_number + ')')
                            .css('padding-left', settings.padding * (parseInt($(child).data('gridLevel')) - 1));
                    }
                    processed_children.push($(child));
                }
            });
            if (settings.stripe_table) {
                $.each($(self).find('tr.treegrid-parent[data-grid-level="1"]'), function (i, parent) {
                    if (i % 2 !== 0) {
                        $(parent).css('background-color', settings.stripe_color);
                        $(parent).nextUntil('tr.treegrid-parent[data-grid-level="1"]')
                            .css('background-color', settings.stripe_color);
                    }
                });
            }


            $.each($(self).find('tr.treegrid-parent .treegrid-caret'), function (i, caret) {
                if ($.inArray(caret, processed_nodes) === -1) {
                    init_nodes($(caret));
                    processed_nodes.push(caret);
                }
            });
        };

        var settings = $.extend({
            collapsed: true,
            animate: false,
            padding_automation: true,
            padding: 29,
            td_with_padding_number: 1,
            stripe_table: false,
            stripe_color: '#f8f8f8'
        }, options);

        if (settings.collapsed) {
            $(self).find('tr.treegrid-child').hide();
        }

        if (settings.padding_automation) {
            $.each($(self).find('tr.treegrid-child'), function (i, child) {
                $(child).find('td:nth-child(' + settings.td_with_padding_number + ')')
                    .css('padding-left', settings.padding * (parseInt($(child).data('gridLevel')) - 1));
            });
        }

        Array.prototype.push.apply(processed_children, $(self).find('tr.treegrid-child'));

        if (settings.stripe_table) {
            $.each($(self).find('tr.treegrid-parent[data-grid-level="1"]'), function (i, parent) {
                if (i % 2 !== 0) {
                    $(parent).css('background-color', settings.stripe_color);
                    $(parent).nextUntil('tr.treegrid-parent[data-grid-level="1"]')
                        .css('background-color', settings.stripe_color);
                }
            });
        }

        var init_nodes = function (nodes) {
            nodes.click(function () {
                var grid_level = parseInt($(this).parents('.treegrid-parent').data('gridLevel'));

                var $all_grid_children = $(this).parents('.treegrid-parent')
                    .nextUntil('tr.treegrid-parent[data-grid-level="' + grid_level + '"]');
                var $current_level_grid_children = $all_grid_children
                    .filter('tr.treegrid-child[data-grid-level="' + (grid_level + 1) + '"]');
                if (settings.animate) {
                    if ($current_level_grid_children.is(':hidden')) {
                        $current_level_grid_children.fadeIn(300);
                        $(this).removeClass('fa fa-angle-right').addClass('fa fa-angle-down');
                    }
                    else {
                        $.each($all_grid_children, function (i, child) {
                            if (parseInt($(child).data('gridLevel')) > grid_level) {
                                $(child).fadeOut(300);
                                $(child).find('.treegrid-caret').removeClass(' fa fa-angle-down')
                                    .addClass('fa fa-angle-right');
                            }
                        });
                        $(this).removeClass('fa fa-angle-down').addClass('fa fa-angle-right');
                    }
                }
                else {
                    if ($current_level_grid_children.is(':hidden')) {
                        $current_level_grid_children.show();
                        $(this).removeClass('fa fa-angle-right').addClass('fa fa-angle-down');
                    }
                    else {
                        $.each($all_grid_children, function (i, child) {
                            if (parseInt($(child).data('gridLevel')) > grid_level) {
                                $(child).hide();
                                $(child).find('.treegrid-caret').removeClass('fa fa-angle-down')
                                    .addClass('fa fa-angle-right');
                            }
                        });
                        $(this).removeClass('fa fa-angle-down').addClass('fa fa-angle-right');
                    }
                }
            });
        };

        var $grid_nodes = $(self).find('tr.treegrid-parent .treegrid-caret');
        init_nodes($grid_nodes);
        Array.prototype.push.apply(processed_nodes, $grid_nodes);
        return self;
    };
}(jQuery));