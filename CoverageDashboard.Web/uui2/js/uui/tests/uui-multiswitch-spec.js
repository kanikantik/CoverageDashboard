describe("uui-multiswitch", function() {
    'use strict';
    var $multiswitch;

    beforeEach(function() {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('multiswitch.html');
        }
        catch(ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('multiswitch.html');
        }
        $multiswitch = $('.uui-multiswitch');
        $multiswitch.uui_multiswitch();
    });

    afterEach(function() {
        $multiswitch.remove();
    });

    it("should set value on click", function() {
        var clicked_tab_number = 2;
        $multiswitch.find('li:nth-child(' + clicked_tab_number + ') label').trigger('click');
        expect($multiswitch.uui_multiswitch('get_value')).toBe(clicked_tab_number.toString());
    });

    it("should reset value using 'reset' method", function() {
        var clicked_tab_number = 2;
        $multiswitch.find('li:nth-child(' + clicked_tab_number + ') label').trigger('click');
        $multiswitch.uui_rating('reset');
        expect($multiswitch.uui_rating('get_value')).toBe(0);
    });

    it("should trigger 'uui.multiswitch.change' event", function() {
        var clicked_tab_number = 3;
        var event_emitted = false;
        $multiswitch.on('uui.multiswitch.change', function () {
            event_emitted = true;
        });
        $multiswitch.find('li:nth-child(' + clicked_tab_number + ') label').trigger('click');
        expect(event_emitted).toBe(true);
    });

    it("should become disabled via 'disable' method", function() {
        $multiswitch.uui_multiswitch('disable');
        expect($multiswitch).toHaveClass('disable');
        $multiswitch.find('li label').each(function(i, label) {
            expect(label).toHaveClass('disable');
        });
    });

    it("should become enabled via 'enable' method", function() {
        $multiswitch.uui_multiswitch('disable');
        $multiswitch.uui_multiswitch('enable');
        expect($multiswitch).not.toHaveClass('disable');
        $multiswitch.find('li label').each(function(i, label) {
            expect(label).not.toHaveClass('disable');
        });
    });

    it("should become in 'error' state via 'show_error' method", function() {
        $multiswitch.uui_multiswitch('show_error');
        expect($multiswitch).toHaveClass('error');
    });

    it("should become in 'normal' state via 'remove_error' method", function() {
        $multiswitch.uui_multiswitch('show_error');
        $multiswitch.uui_multiswitch('remove_error');
        expect($multiswitch).not.toHaveClass('error');
    });
});
