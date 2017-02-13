describe("uui-global-search", function() {
    'use strict';
    var $header_tools, $responsive_search;
    var search_word = 'test';
    var data_items_count = 5;
    var data = [];

    for (var i = 0; i < data_items_count; i++) {
        data.push({
            title: 'Search Result ' + search_word + ' Item Title' + i,
            description: 'Search Result ' + search_word + ' Item Description' + i,
            link: 'Link to Search Result ' + search_word + ' Item page' + i
        });
    }

    var searchResults = function() {
        var d = $.Deferred();
        d.resolve(data);
        return d.promise();
    };

    var notFoundResults = function() {
        var d = $.Deferred();
        d.resolve([]);
        return d.promise();
    };

    beforeEach(function() {
        try {
            jasmine.getFixtures().fixturesPath = 'base/js/uui/tests/fixtures';
            loadFixtures('global-search.html');
        }
        catch(ex) {
            jasmine.getFixtures().fixturesPath = 'js/uui/tests/fixtures';
            loadFixtures('global-search.html');
        }
        $header_tools = $('.uui-header-tools');
        $responsive_search = $('.responsive-global-search');
        spyOn($, 'mCustomScrollbar').and.callThrough();
    });

    afterEach(function() {
        $header_tools.remove();
        $responsive_search.remove();
    });

    it("should generate list of results and don't route to full results", function() {
        UUI.Global_Search.init(searchResults);

        var $search = $header_tools.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $header_tools.find('.search-links li');
        expect($results.length).toBe(data.length);
        $results.each(function (i, result) {
            var $result = $(result);
            expect($result.find('.title').text()).toEqual(data[i].title);
            var $description = $result.find('.description');
            expect($description).toHaveText(data[i].description);
            expect($description.find('strong').length).toBe(1);
            expect($result.find('a').attr('href')).toEqual(data[i].link);
        });
        var $all_results_text = $header_tools.find('.all-results a');
        expect($all_results_text).toContainText('');
    });

    it("should generate list of results and route to full results", function() {
        var full_results_url = 'http://test?q=';
        var full_results_text = data.length + ' results found. View all.';
        var query = 'test';
        UUI.Global_Search.init(searchResults, full_results_url);

        var $search = $header_tools.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $header_tools.find('.search-links li');
        expect($results.length).toBe(data.length);
        $results.each(function (i, result) {
            var $result = $(result);
            expect($result.find('.title').text()).toEqual(data[i].title);
            var $description = $result.find('.description');
            expect($description).toHaveText(data[i].description);
            expect($description.find('strong').length).toBe(1);
            expect($result.find('a').attr('href')).toEqual(data[i].link);
        });
        var $all_results_text = $header_tools.find('.all-results a');
        expect($all_results_text).toContainText(full_results_text);
        expect($all_results_text).toHaveAttr('href', full_results_url + query);
    });

    it("should generate 'not found'", function() {
        UUI.Global_Search.init(notFoundResults);

        var $search = $header_tools.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $header_tools.find('.search-links li');
        expect($results.length).toBe(1);
        expect($results.first()).toHaveClass('no-results');
    });

    it("should generate list of results and don't route to full results for responsive menu", function() {
        UUI.Global_Search.init(searchResults);

        var $search = $responsive_search.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $responsive_search.find('.search-links li');
        expect($results.length).toBe(data.length);
        $results.each(function (i, result) {
            var $result = $(result);
            expect($result.find('.title').text()).toEqual(data[i].title);
            var $description = $result.find('.description');
            expect($description).toHaveText(data[i].description);
            expect($description.find('strong').length).toBe(1);
            expect($result.find('a').attr('href')).toEqual(data[i].link);
        });
        var $all_results_text = $responsive_search.find('.all-results a');
        expect($all_results_text).toContainText('');
    });

    it("should generate list of results and route to full results for responsive menu", function() {
        var full_results_url = 'http://test?q=';
        var full_results_text = data.length + ' results found. View all.';
        var query = 'test';
        UUI.Global_Search.init(searchResults, full_results_url);

        var $search = $responsive_search.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $responsive_search.find('.search-links li');
        expect($results.length).toBe(data.length);
        $results.each(function (i, result) {
            var $result = $(result);
            expect($result.find('.title').text()).toEqual(data[i].title);
            var $description = $result.find('.description');
            expect($description).toHaveText(data[i].description);
            expect($description.find('strong').length).toBe(1);
            expect($result.find('a').attr('href')).toEqual(data[i].link);
        });
        var $all_results_text = $responsive_search.find('.all-results a');
        expect($all_results_text).toContainText(full_results_text);
        expect($all_results_text).toHaveAttr('href', full_results_url + query);
    });

    it("should generate 'not found' for responsive search", function() {
        UUI.Global_Search.init(notFoundResults);

        var $search = $responsive_search.find('.uui-search');
        $search.val(search_word);
        $search.trigger('focus');
        $search.trigger('keyup');
        var $results = $responsive_search.find('.search-links li');
        expect($results.length).toBe(1);
        expect($results.first()).toHaveClass('no-results');
    });
});
