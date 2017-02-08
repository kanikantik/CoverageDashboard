describe("uui-datepicker", function () {
    'use strict';
    var color_class = 'lime-green';
    var $inline_datepicker, $popup_datepicker;

    beforeEach(function () {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('datepicker.html');
        }
        catch (ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('datepicker.html');
        }
        $inline_datepicker = $('#inline-datepicker');
        $popup_datepicker = $('#popup-datepicker');
        $inline_datepicker.uui_datepicker({todayHighlight: true, color: color_class});
        $popup_datepicker.uui_datepicker({todayHighlight: true, color: color_class});
    });

    afterEach(function () {
        $inline_datepicker.remove();
        $popup_datepicker.parent().remove();
    });

    it("inline datepicker should be initialized properly", function () {
        expect($inline_datepicker.find('.datepicker-inline')).toHaveClass(color_class);
    });

    it("popup datepicker should be initialized properly", function (done) {
        setTimeout(function () {
            $popup_datepicker.trigger('focus');
            $popup_datepicker.trigger('focus');
            var $datepicker_dropdown = $('body').find('.datepicker-dropdown');
            expect($datepicker_dropdown.length).toBe(1);
            expect($datepicker_dropdown).toHaveClass(color_class);
            done();
        }, 100);
    });

    it("should set date and get date (base bootstrap datepicker methods)", function () {
        var test_date = new Date(2011, 2, 5);
        $inline_datepicker.uui_datepicker('setDate', test_date);
        expect($inline_datepicker.uui_datepicker('getDate')).toEqual(test_date);
    });

    it("should handle 'show' event (base bootstrap datepicker events)", function () {
        var event_emitted = false;
        $popup_datepicker.uui_datepicker().on('show', function () {
            event_emitted = true;
        });
        $popup_datepicker.trigger('focus');
        $popup_datepicker.trigger('focus');
        expect(event_emitted).toBe(true);
    });
});
