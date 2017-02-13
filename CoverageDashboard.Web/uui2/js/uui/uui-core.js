var UUI = {};

UUI.Util = (function () {
    'use strict';

    function Util() {
        this._viewport_min_width = 320;
    }

    Util.prototype.set_viewport_min_width = function (min_width) {
        this._viewport_min_width = min_width;
    };
    Util.prototype.viewport = function () {
        var self = this;
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'], height: e[a + 'Height'],
            small_screen: e[a + 'Width'] <= self._viewport_min_width
        };
    };

    return new Util();
}());

UUI.Sidebar = (function () {
    'use strict';

    function Sidebar() {
        this._menu_timer = {};
        this._mouse_over_menu = {};
        this._animate = false;
        this._over_content = false;
        this._sub_menu_hover = false;
        this._callback_function = function () {
        };

        this._callback_function = function () {
            var menu = $('.uui-side-bar');
            if (menu.data('callback')) {
                var callback = menu.data('callback');
                try {
                    window[callback]();
                }
                catch (ex) {
                    console.log("Wrong callback function.");
                }
            }
        };
        this._timer = function (target) {
            var self = this;
            if (self._menu_timer[target] > 300 && $('.sub', target).is(':hidden')) {
                self._menu_timer[target] = 0;
                $('.arrow', target).removeClass('fa-angle-right').addClass('fa-angle-down');
                $('.sub', target).slideDown(300);
            }
            else if (self._mouse_over_menu[target] && $('.sub', target).is(':hidden')) {
                setTimeout(function () {
                    self._menu_timer[target] += 100;
                    self._timer(target);
                }, 100);
            }
        };
        this._set_menu_height = function () {
            var $sidebar_height = $(window).height();
            $('.uui-side-bar').css({'height': $sidebar_height});
        };
        this._current_menu_width = function () {
            return $('.uui-side-bar').width();
        };
    }

    Sidebar.prototype.init = function (options) {
        if (options && typeof options !== 'object') {
            console.log('Provided options have wrong format.');
            return;
        }

        options = $.extend({
            animate: false,
            sub_menu_hover: false,
            over_content: false,
            open: false
        }, options);

        var self = this;
        var $menu = $('.uui-side-bar').first();
        var $main_container = $('.uui-main-container');

        self._animate = $menu[0].hasAttribute('data-animate') || options.animate;
        self._sub_menu_hover = $menu[0].hasAttribute('data-sub-menu-hover') || options.sub_menu_hover;
        self._over_content = $menu[0].hasAttribute('data-over-content') || options.over_content;
        if ($menu[0].hasAttribute('data-callback')) {
            var callback = $menu.data('callback');
            if (typeof window[callback] === 'function') {
                self._callback_function = window[callback];
            }
        }
        if (options.callback_function && typeof options.callback_function === 'function') {
            self._callback_function = options.callback_function;
        }

        setTimeout(function () {
            var active_item = $('.uui-side-bar .sub-menu .sub li.active');
            if ($('.uui-side-bar .sub-menu .sub li').hasClass('active')) {
                active_item.parent().show();
                active_item.parents('.sub-menu').addClass('open');
                active_item.parent().prev().find('.arrow').removeClass('fa-angle-right').addClass('fa-angle-down');
            }
        }, 10);

        $menu.parent().css({'height': $(document).height()});
        var $toggle_box = $('.uui-toggle-box');

        $toggle_box.click(function () {
            if ($menu.is(':hidden')) {
                if (self._animate) {
                    $menu.css('left', '-' + self._current_menu_width() + 'px');
                    $menu.show();
                    $menu.animate({'left': '0px'}, 300, function () {
                        self._callback_function();
                    });
                    if (!self._over_content) {
                        $main_container.animate({'marginLeft': self._current_menu_width() + 'px'}, 300);
                    }
                    else {
                        $menu.parent().css({'width': '100%'});
                    }
                }
                else {
                    $menu.show();
                    if (!self._over_content) {
                        $main_container.css('margin-left', self._current_menu_width() + 'px');
                    }
                    self._callback_function();
                }
            }
            else {
                if (self._animate) {
                    $menu.animate({'left': '-' + self._current_menu_width() + 'px'}, 300, function () {
                        $menu.hide();
                        $menu.css('left', '0px');
                        self._callback_function();
                    });
                    if (!self._over_content) {
                        $main_container.animate({'marginLeft': '0px'}, 300);
                    }
                    else {
                        $menu.parent().css({'width': 'auto'});
                    }
                }
                else {
                    $menu.hide();
                    if (!self._over_content) {
                        $main_container.css('margin-left', '0px');
                    }
                    self._callback_function();
                }
            }
        });

        $(window).resize(function () {
            self._set_menu_height();
            if (self._over_content) {
                if ($menu.is(':visible')) {
                    if (UUI.Util.viewport().width >= 768) {
                        $menu.parent().css({'width': '100%'});
                    }
                    else {
                        $menu.parent().css({'width': 'auto'});
                    }
                }
                else {
                    $menu.parent().css({'width': 'auto'});
                }
            }
        });

        if (self._sub_menu_hover) {
            $(document).mouseover(function (event) {
                if ($(event.target).parents('.sub-menu').length > 0 || $(event.target).parents('.sub').length > 0) {
                    var target = $(event.target).parents('.sub-menu').first();
                    self._mouse_over_menu[target] = true;
                    self._menu_timer[target] = self._menu_timer[target] > 0 ? self._menu_timer[target] : 0;
                    if (self._menu_timer[target] === 0) {
                        self._timer(target);
                    }
                }
                else {
                    self._mouse_over_menu = {};
                    self._menu_timer = {};
                    $('.sub').slideUp(300, function () {
                        $('.uui-side-bar .arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
                    });
                }
            });
        }
        else {
            $('.uui-side-bar .sub-menu').click(function (e) {
                if ($(e.target).parents('.sub').length === 0) {
                    e.preventDefault();
                    $('.uui-side-bar .sub-menu').removeClass('open');
                    if ($('.sub', this).is(':hidden')) {
                        $('.arrow', this).removeClass('fa-angle-down').addClass('fa-angle-right');
                        $('.sub').slideUp(300);
                        $('.arrow', this).removeClass('fa-angle-right').addClass('fa-angle-down');
                        $('.sub', this).slideDown(300);
                        $(this).addClass('open');
                    }
                    else {
                        $('.arrow', this).removeClass('fa-angle-down').addClass('fa-angle-right');
                        $('.sub', this).slideUp(300);
                        $(this).removeClass('open');
                    }
                }
            });
        }

        if (navigator.userAgent.indexOf('Mac OS X') === -1) {
            $menu.mCustomScrollbar({mouseWheelPixels: 250});
        } else {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $menu.mCustomScrollbar({mouseWheelPixels: 60});
            } else {
                $menu.mCustomScrollbar({mouseWheelPixels: 10});
            }
        }

        self._set_menu_height();

        if (options.open && !UUI.Util.viewport().small_screen) {
            $toggle_box.trigger('click');
        }
    };

    return new Sidebar();
}());

UUI.Navigation = (function () {
    'use strict';

    function Navigation() {
        this._reset_navigation_header = function () {
            var $resp_brand_logo = $('.responsive-brand-logo');
            if ($resp_brand_logo.data('title')) {
                $resp_brand_logo.find('.title').text($resp_brand_logo.data('title'));
            }
            $resp_brand_logo.find('img').show();
            $resp_brand_logo.find('.arrow').hide();
            $resp_brand_logo.data('title', '');
        };
        this._reset_navigation = function () {
            $('.uui-responsive-header .responsive-menu ul:not(.button-links)').each(function (i, ul) {
                if (i > 0) {
                    $(ul).hide();
                } else {
                    $(ul).children('li').find('a').show();
                }
                $(ul).children('li').show();
            });
        };
        this._set_responsive_navigation_height = function () {
            var $menu_responsive = $('.uui-responsive-header .responsive-menu');
            var $resp_header_button = $('.uui-responsive-header .responsive-menu .responsive-header-button');
            var $resp_global_menu_button = $('.uui-responsive-header .responsive-menu .responsive-global-menu');
            $menu_responsive.css('height', $(window).height() - $('header').height());
            $menu_responsive.find('.menu-scroll').css('height', $menu_responsive.height() -
                $resp_header_button.outerHeight() - $resp_global_menu_button.outerHeight());
        };
        this._generate_extended_menu = function () {
            if (UUI.Util.viewport().width < 768) {
                return;
            }
            var that = this;
            var $menu = $('.uui-navigation').not('.extended-menu').not('.breadcrumb-main-nav');
            var $extended_menu = $('.extended-menu');
            var more_width = 0;

            var header_available_width = $(window).width() - $('.uui-toggle-box').width() -
                $('.breadcrumb-main-nav').width() - $('.brand-logo').outerWidth() - $('.uui-header-tools').outerWidth() -
                $extended_menu.outerWidth();
            var menu_width = $menu.width();
            if (menu_width >= header_available_width - 20 && $menu.children().length > 0) {
                var $last_menu_item = $menu.children().last();
                if ($extended_menu.length === 0) {
                    $extended_menu = $('<ul class="uui-navigation nav navbar-nav extended-menu" />')
                        .append($('<li class="dropdown" />')
                            .append('<a href="#" onclick="return false;">More' +
                                '<span class="arrow fa fa-angle-down"></span></a>')
                            .append('<ul class="dropdown-menu" role="menu" />'));
                    $menu.after($extended_menu);
                    more_width = $extended_menu.width();
                }
                var $last_menu_item_clone = $last_menu_item.clone(true, true);
                if ($last_menu_item_clone.find('ul').length > 0) {
                    $last_menu_item_clone.addClass('dropdown-submenu');
                    $last_menu_item_clone.find('a:first').find('span').remove();
                }
                $extended_menu.find('ul.dropdown-menu:first').prepend($last_menu_item_clone);
                $extended_menu.find('.dropdown').unbind('mouseleave').unbind('mouseenter');
                $extended_menu.find('.dropdown').hover(
                    function () {
                        $(this).not('.dropdown-submenu').find('.arrow')
                            .removeClass('fa-angle-down').addClass('fa-angle-up');
                        $(this).addClass('open');
                    }, function () {
                        $(this).not('.dropdown-submenu').find('.arrow')
                            .removeClass('fa-angle-up').addClass('fa-angle-down');
                        $(this).removeClass('open');
                    }
                );
                var last_menu_item_width = $last_menu_item.width();
                $last_menu_item.remove();
                if (menu_width - last_menu_item_width + more_width >= header_available_width - 20) {
                    that._generate_extended_menu();
                }
            } else {
                var extended_menu_item_width = 120;
                if (menu_width + extended_menu_item_width - (header_available_width + 20) < -40) {
                    var $first_extended_menu_item = $extended_menu.find('ul.dropdown-menu:first li').first();
                    var $first_extended_menu_item_clone = $first_extended_menu_item.clone(true, true);
                    $first_extended_menu_item_clone.removeClass('dropdown-submenu');
                    if ($first_extended_menu_item_clone.find('ul').length > 0) {
                        $first_extended_menu_item_clone.find('a:first')
                            .append('<span class="arrow fa fa-angle-down"></span>');
                    }
                    $menu.append($first_extended_menu_item_clone);
                    $first_extended_menu_item.remove();
                    if ($extended_menu.find('ul.dropdown-menu:first li').length === 1) {
                        $menu.append($extended_menu.find('ul.dropdown-menu:first li').first());
                        $extended_menu.remove();
                    }
                }
            }
        };
    }

    Navigation.prototype.init = function () {
        var that = this;

        $('.uui-navigation .dropdown').hover(
            function () {
                $(this).not('.dropdown-submenu').find('.arrow').removeClass('fa-angle-down').addClass('fa-angle-up');
                $(this).addClass('open');
            }, function () {
                $(this).not('.dropdown-submenu').find('.arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
                $(this).removeClass('open');
            }
        );

        var $menu_responsive = $('.uui-responsive-header .responsive-menu');
        if (navigator.userAgent.indexOf('Mac OS X') === -1) {
            $menu_responsive.find('.menu-scroll').mCustomScrollbar({mouseWheelPixels: 250});
        } else {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $menu_responsive.find('.menu-scroll').mCustomScrollbar({mouseWheelPixels: 60});
            } else {
                $menu_responsive.find('.menu-scroll').mCustomScrollbar({mouseWheelPixels: 10});
            }
        }


        var $resp_toggle_box = $('.responsive-toggle-box');
        var $resp_hide_menu = $('.responsive-hide-menu');
        var $resp_header_tools = $('.uui-responsive-header .uui-header-tools');

        $resp_toggle_box.unbind('click');
        $resp_toggle_box.click(function () {
            var self = this;
            if ($menu_responsive.is(':hidden')) {
                $menu_responsive.show();
                that._set_responsive_navigation_height();
                $resp_header_tools.hide();
                $(self).hide(1, function () {
                    $resp_hide_menu.addClass('show');
                });
            }
        });

        $resp_hide_menu.unbind('click');
        $resp_hide_menu.click(function () {
            var self = this;
            if ($menu_responsive.is(':visible')) {
                $menu_responsive.hide();
                $resp_header_tools.show();
                $(self).removeClass('show');
                $resp_toggle_box.fadeIn(600);
                that._reset_navigation_header();
                that._reset_navigation();
            }
        });

        var $resp_brand_logo = $('.responsive-brand-logo');

        $menu_responsive.find('a:not(.uui-button)').unbind('click');
        $menu_responsive.find('a:not(.uui-button)').click(function () {
            var self = this;
            if ($(self).parent().find('ul').length > 0) {
                $(self).parents('ul:first').children().each(function (i, elem) {
                    if (elem !== $(self).parent()[0]) {
                        $(elem).hide();
                    }
                });
                $(self).parent().find('ul.sub:first').show();
                $(self).hide();

                if (!$resp_brand_logo.data('title')) {
                    $resp_brand_logo.data('title', $resp_brand_logo.find('.title').text());
                }
                $resp_brand_logo.find('.title').text($(self).text());
                $resp_brand_logo.find('img').hide();
                $resp_brand_logo.find('.arrow').show();
                return false;
            } else {
                $menu_responsive.find('a:not(.uui-button)').parents('li').removeClass('active');
                $(self).parent().addClass('active');
                $menu_responsive.hide();
                that._reset_navigation_header();
                that._reset_navigation();
                $resp_hide_menu.removeClass('show');
                $resp_toggle_box.fadeIn(600);
                that._reset_navigation_header();
                $resp_header_tools.show();
            }
        });

        $resp_brand_logo.unbind('click');
        $resp_brand_logo.click(function () {
            if ($resp_brand_logo.data('title')) {
                var $target = $menu_responsive.find('ul:first:visible');
                var $prev_target;
                while ($target.length > 0) {
                    $prev_target = $target;
                    $target = $target.children().find('ul:first:visible');
                }
                if ($prev_target && $prev_target.parents('ul:first').hasClass('sub')) {
                    var title = $prev_target.parents('ul:first').parents('ul:first').children(':visible').children('a')
                        .text();
                    $resp_brand_logo.find('.title').text(title);
                }
                else {
                    that._reset_navigation_header();
                }
                $prev_target.hide();
                $prev_target.parents('ul:first').children().show();
                $prev_target.parents('ul:first').children().find('a').show();
                return false;
            }
        });

        that.default_menu = $menu_responsive.clone(true, true);

        setTimeout(function () {
            that._generate_extended_menu();
        }, 300);

        var $search = $('.uui-global-search .uui-search');

        $(window).resize(function () {
            if ($search.length > 0 && $search.is(':focus')) {
                $search.blur();
            }
            that._set_responsive_navigation_height();
            that._generate_extended_menu();
        });

        if ($search.length > 0) {
            $search.focus(function () {
                $(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                $(this).parents('.uui-header').find('.uui-navigation').hide();
                $(this).parents('li:first').prevAll().hide();
            });
            $search.blur(function () {
                var search_box = this;
                $(search_box).one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    $(this).parents('.uui-header').find('.uui-navigation').show();
                    $(this).parents('li:first').prevAll().show();
                    that._generate_extended_menu();
                });
            });
        }
    };
    return new Navigation();
}());

UUI.Header_Tools = (function () {
    'use strict';

    function Header_Tools() {
    }

    Header_Tools.prototype.init = function () {
        $('.uui-header .dropdown:not(.uui-header-button):not(.uui-global-search)').hover(
            function () {
                event.stopPropagation();
                $(this).addClass('open');
            }, function () {
                event.stopPropagation();
                $(this).removeClass('open');
            }
        );

        var $menu_profile_items = $('.uui-header-tools .uui-profile-menu .profile-links');
        $menu_profile_items.each(function () {
            var $items = $(this).find('li');
            var $length = $items.length;
            if ($length === 1 && $items.hasClass('logout')) {
                $(this).parents('.dropdown-menu').find('.menu-arrow').css('border-bottom-color', '#b22746');
            }
        });

        var $menu_tools = $('.uui-header-tools');
        var $menu_tools_items = $menu_tools.find('>li:not(.uui-global-search):last-child');
        $menu_tools_items.each(function () {
            var $self = $(this);
            var $menu_tools_items_dropdown = $self.find('.dropdown-menu');
            setTimeout(function () {
                $menu_tools_items_dropdown.css({ 'right': 0, 'margin-right': 'auto' });
                $menu_tools_items_dropdown.find('.menu-arrow').css({ 'right': $self.width() / 2 + 18 - 6, 'margin-right': 'auto' });
            }, 10);
        });
    };

    return new Header_Tools();
}());