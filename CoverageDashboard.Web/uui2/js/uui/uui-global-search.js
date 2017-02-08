var UUI = UUI || {};

UUI.Global_Search = (function() {
    'use strict';

    function Global_Search() {
        this._search_xhr = null;
        this._full_results_page = null;
    }
    Global_Search.prototype.init = function (callback, full_results_page) {
        var self = this;
        var $search = $('.uui-global-search .uui-search');
        if (full_results_page) {
            self._full_results_page = full_results_page;
        }
        $search.unbind('keyup paste');
        $search.on('keyup paste', function () {
            var that = this;
            var $search_results = $(this).parents('.uui-global-search').find('.dropdown-menu');
            if (callback && typeof callback === 'function') {
                var query = $(this).val().trim();
                if (query.length < 2) {
                    $search_results.hide();
                    return;
                }
                if (self._search_xhr && typeof self._search_xhr.abort !== 'undefined') {
                    self._search_xhr.abort();
                    self._search_xhr = null;
                }
                self._search_xhr = callback(query);
                $.when(self._search_xhr).then(function(data, textStatus, jqXHR) {
                    if (!jqXHR || jqXHR.status === 200) {
                        self.show_results(data, query, $(that).parents('.uui-global-search'));
                    } else {
                        console.log('Callback function returned status: ' + textStatus);
                    }
                });
            }
        });
        $search.unbind('focus');
        $search.focus(function () {
            $(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
            $(this).parents('.uui-header').find('.uui-navigation').hide();
            $(this).parents('li:first').prevAll().hide();
        });
        $search.unbind('blur');
        $search.blur(function () {
            var that = this;
            $(this).one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                $(this).parents('.uui-header').find('.uui-navigation').show();
                $(this).parents('li:first').prevAll().show();
            });
            $(this).val('');
            setTimeout(function() {
                $(that).parents('.uui-global-search').find('.dropdown-menu').hide();
            }, 200);
        });

        $('.uui-global-search .menu-scroll').mCustomScrollbar();

        var $resp_search = $('.responsive-global-search');
        var $all_search_results = $('.all-results');
        if ($all_search_results.is(':visible')) {
            $resp_search.find('.menu-scroll')
                .css('height', $(window).height() - $('header').height() - $all_search_results.height());
            $resp_search.find('.menu-scroll').mCustomScrollbar();
        } else {
            $resp_search.find('.menu-scroll').css('height', $(window).height() - $('header').height());
            $resp_search.find('.menu-scroll').mCustomScrollbar();
        }

        var $resp_search_icon = $('.search-icon');
        var $resp_hide_search = $('.hide-search');
        var $resp_search_field = $('.responsive-global-search .uui-search');
        var $resp_search_results = $resp_search_field.parents('.responsive-global-search').find('.list-wrapper');

        $resp_search_icon.find('a').unbind('click');
        $resp_search_icon.find('a').click(function () {
            $(this).parents('nav').find('.responsive-global-search').show();
            $resp_search_field.focus();
        });

        $resp_hide_search.unbind('click');
        $resp_hide_search.click(function () {
            $(this).parents('nav').find('.responsive-global-search').hide();
            $resp_search_field.val('');
            $resp_search_results.hide();
        });

        $resp_search_field.unbind('keyup paste');
        $resp_search_field.on('keyup paste', function () {
            var that = this;
            $resp_search_results = $(this).parents('.responsive-global-search').find('.list-wrapper');
            if (callback && typeof callback === 'function') {
                var query = $(this).val().trim();
                if (query.length < 2) {
                    $resp_search_results.hide();
                    return;
                }
                if (self._search_xhr && typeof self._search_xhr.abort !== 'undefined') {
                    self._search_xhr.abort();
                    self._search_xhr = null;
                }
                self._search_xhr = callback(query);
                $.when(self._search_xhr).then(function(data, textStatus, jqXHR) {
                    if (!jqXHR || jqXHR.status === 200) {
                        self.show_responsive_results(data, query, $(that)
                            .parents('.responsive-global-search'));
                    } else {
                        console.log('Callback function returned status: ' + textStatus);
                    }
                });
            }
        });

        $(window).resize(function () {
            if ($all_search_results.is(':visible')) {
                $resp_search.find('.menu-scroll')
                    .css('height', $(window).height() - $('header').height() - $all_search_results.height());
            } else {
                $resp_search.find('.menu-scroll')
                    .css('height', $(window).height() - $('header').height());
            }

            $resp_search.find('.no-results')
                .css('height', $(window).height() - $resp_search_field.find('.search-header').height());
        });
    };
    Global_Search.prototype.show_results = function(data, query, $search) {
        var self = this;
        if (Object.prototype.toString.call(data) !== '[object Array]') {
            console.log('Search results have wrong format.');
            return;
        }
        var $results_box = $search.find('.search-links');
        var $results_container = $results_box.parents('.dropdown-menu').first();
        $results_box.empty();
        $results_container.hide();
        var $all_results = $results_container.find('.all-results');
        var $all_results_text = $all_results.find('a');
        if (data.length === 0) {
            var $li = $('<li />').addClass('no-results').show();
            var $img = $('<img />').attr('src', '/images/icons/no-results.png');
            var $h4 = $('<h4 />').text('Whoops');
            var $p = $('<p />').text('No results found');
            $li.append($img).append($h4).append($p);
            $results_box.append($li);
            $all_results.hide();
        } else {
            var regexp = new RegExp('(' + query.split(' ').join('|') + ')', 'gi');
            data.forEach(function (item) {
                var $li = $('<li />');
                var $a = $('<a />').attr('href', item.link);
                var $title = $('<p />').addClass('title').text(item.title);
                if (item.description.length > 175) {
                    item.description = (item.description.substring(0, 175) + '...');
                }
                var $description = $('<p />').addClass('description')
                    .html(item.description.replace(/</, '&lt;').replace(/>/, '&gt;')
                        .replace(regexp, '<strong>$1</strong>'));
                $a.append($title).append($description);
                $li.append($a);
                $results_box.append($li);
            });
            if (self._full_results_page) {
                $all_results_text.text(data.length + ' results found. View all.');
                $all_results_text.attr('href', self._full_results_page + query);
                $all_results.show();
            }
            else {
                $all_results.hide();
            }
        }
        if ($search.find('.uui-search:focus').length > 0) {
            $results_container.show();
        }
    };
    Global_Search.prototype.show_responsive_results = function(data, query, $resp_search) {
        var self = this;
        if (Object.prototype.toString.call(data) !== '[object Array]') {
            console.log('Search results have wrong format.');
            return;
        }
        var $results_box = $resp_search.find('.search-links');
        var $results_container = $results_box.parents('.list-wrapper').first();
        $results_box.empty();
        $results_container.hide();
        var $all_results = $results_container.find('.all-results');
        var $all_results_text = $all_results.find('a');

        if (data.length === 0) {
            var $li = $('<li />').addClass('no-results').show();
            var $div_content = $('<div />').addClass('no-results-content');
            var $div_footer = $('<div />').addClass('no-results-footer');
            var $img = $('<img />').attr('src', '/images/icons/no-results-responsive.png');
            var $h4 = $('<h4 />').text('Whoops');
            var $p = $('<p />').text('No results found');
            var $a = $('<a />').attr('href', '#')
                .append('<i class="fa fa-angle-left"></i>Back to...').click(function(e) {
                    e.preventDefault();
                    var $resp_search_field = $resp_search.find('.uui-search');
                    $resp_search_field.val('').focus();
                    $li.remove();
                    $all_results.hide();
                    $results_container.hide();
                });
            $li.append($div_content.append($img).append($h4).append($p)).append($div_footer.append($a));
            $results_box.append($li);
            $all_results.hide();
            $resp_search.find('.no-results')
                .css('height', $(window).height() - $resp_search.find('.search-header').height());
        } else {
            var regexp = new RegExp('(' + query.split(' ').join('|') + ')', 'gi');
            data.forEach(function (item) {
                var $li = $('<li />').click(function () {
                    setTimeout(function () {
                        $resp_search.hide();
                        $resp_search.find('.uui-search').val('');
                        $results_container.hide();
                    }, 200);
                });
                var $a = $('<a />').attr('href', item.link);
                var $title = $('<p />').addClass('title').text(item.title);
                if (item.description.length > 175) {
                    item.description = item.description.substring(0, 175) + '...';
                }
                var $description = $('<p />').addClass('description')
                    .html(item.description.replace(/</, '&lt;').replace(/>/, '&gt;')
                        .replace(regexp, '<strong>$1</strong>'));
                $a.append($title).append($description);
                $li.append($a);
                $results_box.append($li);
            });
            if (self._full_results_page) {
                $all_results_text.text(data.length + ' results found. View all.');
                $all_results_text.attr('href', self._full_results_page + query);
                $all_results_text.click(function() {
                    $resp_search.hide();
                    $resp_search.find('.uui-search').val('');
                    $results_container.hide();
                });
                $all_results.show();
            } else {
                $all_results.hide();
            }
        }
        if ($resp_search.find('.uui-search:focus').length > 0) {
            $results_container.show();
        }
    };

    return new Global_Search();
}());