describe("uui-popover", function() {
    'use strict';
    var color_class = 'blue';
    var popover_text = 'Popover on top';
    var $body = $('body');
    var $button;

    beforeEach(function() {
        $button = $('<button type="button" class="uui-button" id="popover1" data-toggle="popover" ' +
            'data-container="body" data-content="' + popover_text + '" data-placement="top" ' +
            'data-original-title="Popover on top">Popover on top</button>');
        $body.append($button);
        $button.uui_popover({color: color_class});
    });

    afterEach(function() {
        $button.remove();
        $body.find('.popover').remove();
    });

    it("should generate popover on click", function() {
        $button.trigger('click');
        expect($body.find('.popover').length).toBe(1);
    });

    it("should have appropriate color class", function() {
        $button.trigger('click');
        expect($body.find('.popover')).toHaveClass(color_class);
    });

    it("tooltip should have appropriate text", function() {
        $button.trigger('click');
        expect($body.find('.popover .popover-content')).toHaveText(popover_text);
    });
});
