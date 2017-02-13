describe("uui-show-text", function() {
    'use strict';
    var $text, initial_text;
    var max_length = 50;
    var collapsed_text_label = 'Test text';

    beforeEach(function() {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('show-text.html');
        }
        catch(ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('show-text.html');
        }
        $text = $('#show');
        initial_text = $text.find('p').text();
        $text.uui_show_text({ max_length: max_length, collapsed_text_label: collapsed_text_label });
    });

    afterEach(function() {
        $text.remove();
    });

    it("should show text of specified length", function() {
        var new_text_length = $text.find('p').text().length;
        expect($text).toHaveAttr('data-text', initial_text);
        expect(new_text_length).toBeLessThan(initial_text.length);
        expect(new_text_length).toBe(max_length);
    });

    it("should generate collapsed text label", function() {
        var $collapsed_text = $text.find('span');
        expect($collapsed_text.length).toBe(1);
        expect($collapsed_text).toHaveText(collapsed_text_label);
    });

    it("should show full text", function() {
        var new_text_length = $text.find('p').text().length;
        expect(new_text_length).toBe(max_length);
        $text.find('span').trigger('click');
        new_text_length = $text.find('p').text().length;
        expect(new_text_length).toBe(initial_text.length);
    });
});
