describe("uui-rating", function() {
    'use strict';
    var stars_count = 7;
    var $body = $('body');
    var $rating;

    beforeEach(function() {
        $rating = $('<div class="uui-rating"></div>');
        $body.append($rating);
        $rating.uui_rating({count: stars_count});
    });

    afterEach(function() {
        $rating.remove();
    });

    it("should generate rating with specified stars count", function() {
        expect($rating.find('.star').length).toBe(stars_count);
    });

    it("should set value on click", function() {
        var clicked_star_number = 5;
        $rating.find('.star:nth-child(' + clicked_star_number + ')').trigger('click');
        expect($rating.uui_rating('get_value')).toBe(clicked_star_number);
    });

    it("should set value using 'set_value' method", function() {
        var star_number = 3;
        $rating.uui_rating('set_value', star_number);
        expect($rating.uui_rating('get_value')).toBe(star_number);
    });

    it("should reset value using 'reset' method", function() {
        var star_number = 3;
        $rating.uui_rating('set_value', star_number);
        $rating.uui_rating('reset');
        expect($rating.uui_rating('get_value')).toBe(0);
    });

    it("should trigger 'uui.rating.change' event", function() {
        var clicked_star_number = 5;
        var event_emitted = false;
        $rating.on('uui.rating.change', function () {
            event_emitted = true;
        });
        $rating.find('.star:nth-child(' + clicked_star_number + ')').trigger('click');
        expect(event_emitted).toBe(true);
    });

    it("should become disabled via 'disable' method", function() {
        $rating.uui_rating('disable');
        expect($rating).toHaveClass('disable');
        $rating.find('.star').each(function(i, star) {
            expect(star).toHaveClass('disable');
        });
    });

    it("should become enabled via 'enable' method", function() {
        $rating.uui_rating('disable');
        $rating.uui_rating('enable');
        expect($rating).not.toHaveClass('disable');
        $rating.find('.star').each(function(i, star) {
            expect(star).not.toHaveClass('disable');
        });
    });

    it("should become in 'error' state via 'show_error' method", function() {
        $rating.uui_rating('show_error');
        expect($rating).toHaveClass('error');
    });

    it("should become in 'normal' state via 'remove_error' method", function() {
        $rating.uui_rating('show_error');
        $rating.uui_rating('remove_error');
        expect($rating).not.toHaveClass('error');
    });
});
