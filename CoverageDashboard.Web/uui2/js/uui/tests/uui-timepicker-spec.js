describe("uui-timepicker", function () {
    'use strict';
    var color_class = 'lime-green';
    var $timepicker;

    beforeEach(function () {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('timepicker.html');
        }
        catch (ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('timepicker.html');
        }
        $timepicker = $('#timepicker');
        $timepicker.uui_timepicker({color: color_class});
    });

    afterEach(function () {
        $timepicker.parent().remove();
    });

    it("should be initialized properly", function (done) {
        expect($timepicker.parent()).toHaveClass(color_class);
        setTimeout(function () {
            $timepicker.trigger('focus');
            $timepicker.trigger('focus');
            var $timepicker_widget = $('body').find('.bootstrap-timepicker-widget');
            expect($timepicker_widget.length).toBe(1);
            expect($timepicker_widget).toHaveClass(color_class);
            done();
        }, 100);
    });

    it("should set date and get date (base bootstrap timepicker methods)", function () {
        var test_time = '11:45 AM';
        $timepicker.uui_timepicker('setTime', '4:43 PM');
        expect($timepicker.val()).not.toEqual(test_time);
        $timepicker.uui_timepicker('setTime', test_time);
        expect($timepicker.val()).toEqual(test_time);
    });

    it("should handle 'show.timepicker' event (base bootstrap timepicker events)", function () {
        var event_emitted = false;
        $timepicker.uui_timepicker().on('show.timepicker', function () {
            event_emitted = true;
        });
        $timepicker.trigger('focus');
        $timepicker.trigger('focus');
        expect(event_emitted).toBe(true);
    });
});
