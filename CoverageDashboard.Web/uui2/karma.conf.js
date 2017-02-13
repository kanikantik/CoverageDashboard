/*jslint node: true */

module.exports = function(config) {
    'use strict';
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: [
            'js/lib/jquery-*.js',
            'js/lib/components/jquery.mCustomScrollbar.concat.min.js',
            'js/lib/components/bootstrap-datepicker.js',
            'js/lib/components/bootstrap-timepicker.js',
            'bootstrap/js/bootstrap.min.js',
            'js/uui/*.js',
            'js/uui/tests/*.js',
            { pattern: 'js/uui/tests/fixtures/*.html', included: false, served: true }
        ]
    });
};