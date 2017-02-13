var UUI = UUI || {};

UUI.Panels = (function () {
    'use strict';

    function Panels() {
    }

    Panels.prototype.init = function () {
        $('.uui-info-panel-horizontal[data-hover="light"], .uui-info-panel-vertical[data-hover="light"]')
            .prepend($('<div />').addClass('light-hover'));
        $('.uui-info-panel-horizontal[data-hover="solid"], .uui-info-panel-vertical[data-hover="solid"]')
            .prepend($('<div />').addClass('solid-hover').append($('<p />')));
        $('.uui-info-panel-horizontal, .uui-info-panel-vertical').hover(function () {
            var $panel = $(this);
            if ($panel.hasClass('hover') && $panel.children(':first').hasClass('light-hover')) {
                $panel.find('.light-hover').fadeIn(200);
            }
            else if ($panel.hasClass('hover') && $panel.children(':first').hasClass('solid-hover')) {
                if (this.hasAttribute('data-hover-text')) {
                    var hover_text = $panel.data('hoverText');
                    $panel.find('.solid-hover p').text(hover_text);
                }
                $panel.find('.solid-hover').fadeIn(200);
            }
        }, function () {
            var $panel = $(this);
            if ($panel.hasClass('hover') && $panel.children(':first').hasClass('light-hover')) {
                $panel.find('.light-hover').fadeOut(200);
            }
            else if ($panel.hasClass('hover') && $panel.children(':first').hasClass('solid-hover')) {
                $panel.find('.solid-hover').fadeOut(200);
            }
        });
    };

    return new Panels();
}());