describe("uui-panel", function() {
    'use strict';
    var $horizontal_panel, $vertical_panel;
    var hover_text = 'test';

    beforeEach(function() {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('panels.html');
        }
        catch(ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('panels.html');
        }
        $horizontal_panel = $('.uui-info-panel-horizontal');
        $vertical_panel = $('.uui-info-panel-vertical');
    });

    afterEach(function() {
        $horizontal_panel.remove();
        $vertical_panel.remove();
    });

    it("Horizontal Panel should apply 'light' hover effect", function() {
        $horizontal_panel.addClass('hover');
        $horizontal_panel.attr('data-hover', 'light');
        UUI.Panels.init();
        expect($horizontal_panel.find('.light-hover')).toBeVisible();
    });

    it("Horizontal Panel should apply 'solid' hover effect", function() {
        $horizontal_panel.addClass('hover');
        $horizontal_panel.attr('data-hover', 'solid');
        UUI.Panels.init();
        expect($horizontal_panel.find('.solid-hover')).toBeVisible();
    });

    it("Vertical Panel should apply 'light' hover effect", function() {
        $vertical_panel.addClass('hover');
        $vertical_panel.attr('data-hover', 'light');
        UUI.Panels.init();
        expect($vertical_panel.find('.light-hover')).toBeVisible();
    });

    it("Vertical Panel should apply 'solid' hover effect", function() {
        $vertical_panel.addClass('hover');
        $vertical_panel.attr('data-hover', 'solid');
        UUI.Panels.init();
        expect($vertical_panel.find('.solid-hover')).toBeVisible();
    });

    it("Horizontal Panel with 'solid' hover should have appropriate text", function() {
        $vertical_panel.addClass('hover');
        $vertical_panel.attr('data-hover', 'solid');
        $vertical_panel.attr('data-hover-text', hover_text);
        UUI.Panels.init();
        $vertical_panel.trigger('mouseover');
        expect($vertical_panel.find('.solid-hover p')).toHaveText(hover_text);
    });

    it("Vertical Panel with 'solid' hover should have appropriate text", function() {
        $horizontal_panel.addClass('hover');
        $horizontal_panel.attr('data-hover', 'solid');
        $horizontal_panel.attr('data-hover-text', hover_text);
        UUI.Panels.init();
        $horizontal_panel.trigger('mouseover');
        expect($horizontal_panel.find('.solid-hover p')).toHaveText(hover_text);
    });
});
