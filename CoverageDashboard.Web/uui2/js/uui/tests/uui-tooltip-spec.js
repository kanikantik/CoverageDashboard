describe("uui-tooltip", function() {
    'use strict';
    var color_class = 'blue';
    var tooltip_text = 'Tooltip on top';
    var $body = $('body');
    var $button;

    beforeEach(function() {
        $button = $('<button type="button" class="uui-button" id="tooltip1" data-toggle="tooltip" ' +
            'data-container="body" data-placement="top" ' +
            'data-original-title="' + tooltip_text + '">Tooltip on top</button>');
        $body.append($button);
        $button.uui_tooltip({color: color_class});
    });

    afterEach(function() {
        $button.remove();
        $body.find('.tooltip').remove();
    });

    it("should generate tooltip on hover", function() {
        $button.trigger('mouseover');
        expect($body.find('.tooltip').length).toBe(1);
    });

    it("should have appropriate color class", function() {
        $button.trigger('mouseover');
        expect($body.find('.tooltip')).toHaveClass(color_class);
    });

    it("tooltip should have appropriate text", function() {
        $button.trigger('mouseover');
        expect($body.find('.tooltip')).toHaveText(tooltip_text);
    });
});
