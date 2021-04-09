function ($) {
    $.fn.theiaStickySidebar = function (options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern',
            'defaultPosition': 'relative',
            'namespace': 'TSS'
        };
        options = $.extend(defaults, options);
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
        tryInitOrHookIntoEvents(options, this);

        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);
            if (!success) {
                console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');
                $(document).on('scroll.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that));
                $(window).on('resize.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that))
            }
        }

        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true
            }
            if ($('body').width() < options.minWidth) {
                return false
            }
            init(options, $that);
            return true
        }

        function init(options, $that) {
            options.initialized = true;
            var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);
            if (existingStylesheet.length === 0) {
                $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))
            }
            $that.each(function () {
                var o = {};
                o.sidebar = $(this);
                o.options = options || {};
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent()
                }
                o.sidebar.parents().css('-webkit-transform', 'none');
                o.sidebar.css({
                    'position': o.options.defaultPosition,
                    'overflow': 'visible',
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });
                o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                if (o.stickySidebar.length == 0) {
                    var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    o.sidebar.find('script').filter(function (index, script) {
                        return script.type.length === 0 || script.type.match(javaScriptMIMETypes)
                    }).remove();
                    o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar)
                }
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0
                } else {
                    o.stickySidebarPaddingTop = 1
                }
                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0
                } else {
                    o.stickySidebarPaddingBottom = 1
                }
                o.previousScrollTop = null;
                o.fixedScrollTop = 0;
                resetSidebar();
                o.onScroll = function (o) {
                    if (!o.stickySidebar.is(":visible")) {
                        return
                    }
                    if ($('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return
                    }
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');
                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return
                        }
                    }
                    var scrollTop = $(document).scrollTop();
                    var position = 'static';
                    if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                        var offsetTop = o.paddingTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;
                        var containerTop = o.sidebar.offset().top;
                        var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;
                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight()
                        } else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom
                        }
                        var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff
                            }
                        }
                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop
                        }
                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight()
                        }
                        if (scrollTopDiff > 0) {
                            top = Math.min(top, windowOffsetTop)
                        } else {
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight())
                        }
                        top = Math.max(top, staticLimitTop);
                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();
                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed'
                        } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed'
                        } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            position = 'static'
                        } else {
                            position = 'absolute'
                        }
                    }
                    if (position == 'fixed') {
                        var scrollLeft = $(document).scrollLeft();
                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': getWidthForObject(o.stickySidebar) + 'px',
                            'transform': 'translateY(' + top + 'px)',
                            'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft) + 'px',
                            'top': '0px'
                        })
                    } else if (position == 'absolute') {
                        var css = {};
                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                            css.top = '0px'
                        }
                        css.width = getWidthForObject(o.stickySidebar) + 'px';
                        css.left = '';
                        o.stickySidebar.css(css)
                    } else if (position == 'static') {
                        resetSidebar()
                    }
                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            })
                        }
                    }
                    o.previousScrollTop = scrollTop
                };
                o.onScroll(o);
                $(document).on('scroll.' + o.options.namespace, function (o) {
                    return function () {
                        o.onScroll(o)
                    }
                }(o));
                $(window).on('resize.' + o.options.namespace, function (o) {
                    return function () {
                        o.stickySidebar.css({
                            'position': 'static'
                        });
                        o.onScroll(o)
                    }
                }(o));
                if (typeof ResizeSensor !== 'undefined') {
                    new ResizeSensor(o.stickySidebar[0], function (o) {
                        return function () {
                            o.onScroll(o)
                        }
                    }(o))
                }

                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        'min-height': '1px'
                    });
                    o.stickySidebar.css({
                        'position': 'static',
                        'width': '',
                        'transform': 'none'
                    })
                }

                function getClearedHeight(e) {
                    var height = e.height();
                    e.children().each(function () {
                        height = Math.max(height, $(this).height())
                    });
                    return height
                }
            })
        }

        function getWidthForObject(object) {
            var width;
            try {
                width = object[0].getBoundingClientRect().width
            } catch (err) {}
            if (typeof width === "undefined") {
                width = object.width()
            }
            return width
        }
        return this
    }
})(jQuery);
! function (a) {
    a.fn.menubz = function () {
        return this.each(function () {
            var $t = a(this),
                b = $t.find('.LinkList ul > li').children('a'),
                c = b.length;
            for (var i = 0; i < c; i++) {
                var d = b.eq(i),
                    h = d.text();
                if (h.charAt(0) !== '_') {
                    var e = b.eq(i + 1),
                        j = e.text();
                    if (j.charAt(0) === '_') {
                        var m = d.parent();
                        m.append('<ul class="sub-menu m-sub"/>');
                    }
                }
                if (h.charAt(0) === '_') {
                    d.text(h.replace('_', ''));
                    d.parent().appendTo(m.children('.sub-menu'));
                }
            }
            for (var i = 0; i < c; i++) {
                var f = b.eq(i),
                    k = f.text();
                if (k.charAt(0) !== '_') {
                    var g = b.eq(i + 1),
                        l = g.text();
                    if (l.charAt(0) === '_') {
                        var n = f.parent();
                        n.append('<ul class="sub-menu2 m-sub"/>');
                    }
                }
                if (k.charAt(0) === '_') {
                    f.text(k.replace('_', ''));
                    f.parent().appendTo(n.children('.sub-menu2'));
                }
            }
            $t.find('.LinkList ul li ul').parent('li').addClass('has-sub');
        });
    }
}(jQuery);
! function (a) {
    a.fn.tabbz = function (b) {
        b = jQuery.extend({
            onHover: false,
            animated: true,
            transition: 'fadeInUp'
        }, b);
        return this.each(function () {
            var e = a(this),
                c = e.children('[tab-bz]'),
                d = 0,
                n = 'tab-animated',
                k = 'tab-active';
            if (b.onHover == true) {
                var event = 'mouseenter'
            } else {
                var event = 'click'
            }
            e.prepend('<ul class="select-tab"></ul>');
            c.each(function () {
                if (b.animated == true) {
                    a(this).addClass(n)
                }
                e.find('.select-tab').append('<li><a href="javascript:;">' + a(this).attr('tab-bz') + '</a></li>')
            }).eq(d).addClass(k).addClass('tab-' + b.transition);
            e.find('.select-tab a').on(event, function () {
                var f = a(this).parent().index();
                a(this).closest('.select-tab').find('.active').removeClass('active');
                a(this).parent().addClass('active');
                c.removeClass(k).removeClass('tab-' + b.transition).eq(f).addClass(k).addClass('tab-' + b.transition);
                return false
            }).eq(d).parent().addClass('active')
        })
    }
}(jQuery);
! function (a) {
    a.fn.lazybz = function () {
        return this.each(function () {
            var t = a(this),
                dImg = t.attr('data-image'),
                iWid = Math.round(t.width()),
                iHei = Math.round(t.height()),
                iSiz = '/w' + iWid + '-h' + iHei + '-p-k-no-nu',
                img = '';
            if (dImg.match('s72-c')) {
                img = dImg.replace('/s72-c', iSiz);
            } else if (dImg.match('w72-h')) {
                img = dImg.replace('/w72-h72-p-k-no-nu', iSiz);
            } else {
                img = dImg;
            }
            a(window).on('load resize scroll', lazyOnScroll);

            function lazyOnScroll() {
                var wHeight = a(window).height(),
                    scrTop = a(window).scrollTop(),
                    offTop = t.offset().top;
                if (scrTop + wHeight > offTop) {
                    var n = new Image();
                    n.onload = function () {
                        t.attr('style', 'background-image:url(' + this.src + ')').addClass('lazybz');
                    }, n.src = img;
                }
            }
            lazyOnScroll();
        });
    }
}(jQuery);
(function ($) {
    $.fn.replaceText = function (b, a, c) {
        return this.each(function () {
            var f = this.firstChild,
                g, e, d = [];
            if (f) {
                do {
                    if (f.nodeType === 3) {
                        g = f.nodeValue;
                        e = g.replace(b, a);
                        if (e !== g) {
                            if (!c && /</.test(e)) {
                                $(f).before(e);
                                d.push(f)
                            } else {
                                f.nodeValue = e
                            }
                        }
                    }
                } while (f = f.nextSibling)
            }
            d.length && $(d).remove()
        })
    }
})(jQuery);
$('#Zien-main-menu').menubz();
$('#Zien-main-menu .widget').addClass('show-menu');
$('.search-toggle').on('click', function () {
    $('body').toggleClass('search-active')
});
$('.blog-posts-title a.more,.related-title a.more').each(function () {
    var $t = $(this),
        $smt = viewAllText;
    if ($smt != '') {
        $t.text($smt)
    }
});
$('.follow-by-email-text').each(function () {
    var $t = $(this),
        $fbet = followByEmailText;
    if ($fbet != '') {
        $t.text($fbet)
    }
});
$('#sidebar-tabs').tabbz();
$('.post-body strike').each(function () {
    var $t = $(this),
        $mtc = $t.text().trim();
    if ($mtc == '$ads={1}') {
        $t.replaceWith('<div id="Zien-new-before-E3lan"/>')
    }
    if ($mtc == '$ads={2}') {
        $t.replaceWith('<div id="Zien-new-after-E3lan"/>')
    }
});
$('#Zien-new-before-E3lan').each(function () {
    var $t = $(this);
    if ($t.length) {
        $('#before-E3lan').appendTo($t)
    }
});
$('#Zien-new-after-E3lan').each(function () {
    var $t = $(this);
    if ($t.length) {
        $('#after-E3lan').appendTo($t)
    }
});
$('#Zien-main-before-E3lan .widget').each(function () {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#before-E3lan'))
    }
});
$('#Zien-main-after-E3lan .widget').each(function () {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#after-E3lan'))
    }
});
$('.avatar-image-container img').attr('src', function ($this, i) {
    i = i.replace('//resources.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
    i = i.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
    return i
});
$('.post-body a').each(function () {
    var $this = $(this),
        type = $this.text().trim(),
        sp = type.split('/'),
        txt = sp[0],
        ico = sp[1],
        color = sp.pop();
    if (type.match('button')) {
        $this.addClass('button').text(txt);
        if (ico != 'button') {
            $this.addClass(ico)
        }
        if (color != 'button') {
            $this.addClass('colored-button').css({
                'background-color': color
            })
        }
    }
});
$('.post-body strike').each(function () {
    var $this = $(this),
        type = $this.text().trim(),
        html = $this.html();
    if (type.match('contact-form')) {
        $this.replaceWith('<div class="contact-form"/>');
        $('.contact-form').append($('#ContactForm1'))
    }
    if (type.match('alert-success')) {
        $this.replaceWith('<div class="alert-message alert-success short-b">' + html + '</div>')
    }
    if (type.match('alert-info')) {
        $this.replaceWith('<div class="alert-message alert-info short-b">' + html + '</div>')
    }
    if (type.match('alert-warning')) {
        $this.replaceWith('<div class="alert-message alert-warning short-b">' + html + '</div>')
    }
    if (type.match('alert-error')) {
        $this.replaceWith('<div class="alert-message alert-error short-b">' + html + '</div>')
    }
    if (type.match('left-sidebar')) {
        $this.replaceWith('<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>')
    }
    if (type.match('right-sidebar')) {
        $this.replaceWith('<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>')
    }
    if (type.match('full-width')) {
        $this.replaceWith('<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>')
    }
    if (type.match('code-box')) {
        $this.replaceWith('<pre class="code-box short-b">' + html + '</pre>')
    }
    var $sb = $('.post-body .short-b').find('b');
    $sb.each(function () {
        var $b = $(this),
            $t = $b.text().trim();
        if ($t.match('alert-success') || $t.match('alert-info') || $t.match('alert-warning') || $t.match('alert-error') || $t.match('code-box')) {
            $b.replaceWith("")
        }
    })
});
$('.Zien-share-links .window-bz,.entry-share .window-bz').on('click', function () {
    var $this = $(this),
        url = $this.data('url'),
        wid = $this.data('width'),
        hei = $this.data('height'),
        wsw = window.screen.width,
        wsh = window.screen.height,
        mrl = Math.round(wsw / 2 - wid / 2),
        mrt = Math.round(wsh / 2 - hei / 2),
        win = window.open(url, '_blank', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=' + wid + ',height=' + hei + ',left=' + mrl + ',top=' + mrt);
    win.focus()
});
$('.Zien-share-links').each(function () {
    var $t = $(this),
        $b = $t.find('.show-hid a');
    $b.on('click', function () {
        $t.toggleClass('show-hidden')
    })
});
$('.about-author .author-description span a').each(function () {
    var $this = $(this),
        cls = $this.text().trim(),
        url = $this.attr('href');
    $this.replaceWith('<li class="' + cls + '"><a href="' + url + '" title="' + cls + '" target="_blank"/></li>');
    $('.description-links').append($('.author-description span li'));
    $('.description-links').addClass('show')
});

function msgError() {
    return '<span class="no-posts"><b>خطأ:</b> لا يوجد بيانات لعرضها</span>'
}

function beforeLoader() {
    return '<div class="loader"/>'
}

function getFeedUrl(type, num, label) {
    var furl = '';
    switch (label) {
    case 'recent':
        furl = '/feeds/posts/summary?alt=json&max-results=' + num;
        break;
    case 'comments':
        if (type == 'list') {
            furl = '/feeds/comments/summary?alt=json&max-results=' + num
        } else {
            furl = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + num
        }
        break;
    default:
        furl = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + num;
        break
    }
    return furl
}

function getPostLink(feed, i) {
    for (var x = 0; x < feed[i].link.length; x++)
        if (feed[i].link[x].rel == 'alternate') {
            var link = feed[i].link[x].href;
            break
        } return link
}

function getPostTitle(feed, i) {
    var n = feed[i].title.$t;
    return n
}

function getPostImage(feed, i) {
    if ('media$thumbnail' in feed[i]) {
        var src = feed[i].media$thumbnail.url;
        if (src.match('img.youtube.com')) {
            src = src.replace('/default.', '/0.')
        }
        var img = src
    } else {
        img = ''+ DefaultIamge +''
    }
    return img
}

function getPostAuthor(feed, i) {
    var n = feed[i].author[0].name.$t,
        b = messages.postAuthorLabel,
        e = '';
    if (b != '') {
        e = '<span class="by">' + b + '</span>'
    } else {
        e = ''
    }
    if (messages.postAuthor == 'true') {
        var code = '<span class="entry-author">' + e + '<span class="author">' + n + '</span></span>'
    } else {
        var code = ''
    }
    return code
}

function getPostDate(feed, i) {
    var c = feed[i].published.$t,
        d = c.substring(0, 4),
        f = c.substring(5, 7),
        m = c.substring(8, 10),
        h = monthFormat[parseInt(f, 10) - 1] + ' ' + m + ', ' + d;
    if (messages.postDate == 'true') {
        var code = '<span class="entry-time"><time class="published" datetime="' + c + '">' + h + '</time></span>'
    } else {
        code = ''
    }
    return code
}

function getPostMeta(author, date) {
    if (messages.postAuthor == 'true' && messages.postDate == 'true') {
        var long = '<div class="entry-meta m-1">' + author + date + '</div>'
    } else if (messages.postAuthor == 'true') {
        long = '<div class="entry-meta m-2">' + author + '</div>'
    } else if (messages.postDate == 'true') {
        long = '<div class="entry-meta m-2">' + date + '</div>'
    } else {
        long = ''
    }
    if (messages.postDate == 'true') {
        var small = '<div class="entry-meta m-2">' + date + '</div>'
    } else {
        small = ''
    }
    var code = [long, small];
    return code
}

function getPostLabel(feed, i) {
    if (feed[i].category != undefined) {
        var tag = feed[i].category[0].term,
            code = '<span class="entry-category">' + tag + '</span>'
    } else {
        code = ''
    }
    return code
}

function getPostComments(feed, i, link) {
    var n = feed[i].author[0].name.$t,
        e = feed[i].author[0].gd$image.src.replace('/s113', '/w55-h55-p-k-no-nu'),
        h = feed[i].title.$t;
    if (e.match('//img1.blogblog.com/img/blank.gif') || e.match('//img1.blogblog.com/img/b16-rounded.gif')) {
        var img = '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg'
    } else {
        var img = e
    }
    var code = '<article class="custom-item item-' + i + '"><a class="entry-image-link cmm-avatar" href="' + link + '"><span class="entry-thumb" data-image="' + img + '"/></a><h2 class="entry-title"><a href="' + link + '">' + n + '</a></h2><p class="cmm-snippet excerpt">' + h + '</p></article>';
    return code
}

function getCustomStyle(type, label, color, lClass) {
    lClass = label.replace(' ', '-');
    if (color != false) {
        if (type == 'featured') {
            var code = '.id-' + type + '-' + lClass + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + type + '-' + lClass + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
        } else {
            code = '.id-' + type + '-' + lClass + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + type + '-' + lClass + ' .title-wrap > h3,.id-' + type + '-' + lClass + ' .title-wrap > a.more:hover,.id-' + type + '-' + lClass + ' .entry-header:not(.entry-info) .entry-title a:hover,.id-' + type + '-' + lClass + ' .entry-header:not(.entry-info) .entry-meta span.author{color:' + color + '}.id-' + type + '-' + lClass + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
        }
    } else {
        code = ''
    }
    return code
}

function getAjax($this, type, num, label, color) {
    switch (type) {
    case 'msimple':
    case 'megatabs':
    case 'featured1':
    case 'featured2':
    case 'featured3':
    case 'block1':
    case 'col-left':
    case 'col-right':
    case 'grid1':
    case 'grid2':
    case 'videos':
    case 'gallery':
    case 'list':
    case 'related':
        if (label == false) {
            label = 'geterror404'
        }
        var furl = getFeedUrl(type, num, label);
        $.ajax({
            url: furl,
            type: 'GET',
            dataType: 'json',
            cache: true,
            beforeSend: function (data) {
                var style = getCustomStyle(type, label, color),
                    lClass = label.replace(' ', '-');
                switch (type) {
                case 'featured1':
                case 'featured2':
                case 'featured3':
                    $('#page-skin-2').prepend(style);
                    $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + type + '-' + lClass + ' show-bz lazybz');
                    break;
                case 'block1':
                case 'grid1':
                case 'grid2':
                case 'videos':
                case 'gallery':
                    $('#page-skin-2').prepend(style);
                    $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + type + '-' + lClass + ' show-bz lazybz');
                    break;
                case 'col-left':
                case 'col-right':
                    $('#page-skin-2').prepend(style);
                    $this.html(beforeLoader()).parent().addClass('type-' + type + ' block-column id-' + type + '-' + lClass + ' show-bz lazybz');
                    break;
                case 'list':
                    $this.html(beforeLoader());
                    break;
                case 'related':
                    $this.html(beforeLoader()).parent().addClass('show-bz lazybz');
                    break
                }
            },
            success: function (data) {
                var html = '';
                switch (type) {
                case 'msimple':
                case 'megatabs':
                    html = '<ul class="mega-widget">';
                    break;
                case 'featured1':
                case 'featured2':
                case 'featured3':
                    html = '<div class="featured-posts ' + type + '">';
                    break;
                case 'block1':
                    html = '<div class="content-block-1">';
                    break;
                case 'col-left':
                case 'col-right':
                    html = '<div class="column-block">';
                    break;
                case 'grid1':
                    html = '<div class="grid-block-1 total-' + num + '">';
                    break;
                case 'grid2':
                    html = '<div class="grid-block-2">';
                    break;
                case 'videos':
                    html = '<div class="videos-block total-' + num + '">';
                    break;
                case 'gallery':
                    html = '<div class="gallery-block total-' + num + '">';
                    break;
                case 'list':
                    html = '<div class="custom-widget">';
                    break;
                case 'related':
                    html = '<div class="related-posts total-' + num + '">';
                    break
                }
                var entry = data.feed.entry;
                if (entry != undefined) {
                    for (var i = 0, feed = entry; i < feed.length; i++) {
                        var link = getPostLink(feed, i),
                            title = getPostTitle(feed, i, link),
                            image = getPostImage(feed, i, link),
                            author = getPostAuthor(feed, i),
                            date = getPostDate(feed, i),
                            meta = getPostMeta(author, date),
                            tag = getPostLabel(feed, i);
                        var content = '';
                        switch (type) {
                        case 'msimple':
                        case 'megatabs':
                            content += '<article class="mega-item"><div class="mega-content"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                            break;
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                            switch (i) {
                            case 0:
                                content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article><div class="featured-scroll">';
                                break;
                            default:
                                content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></div></article>';
                                break
                            }
                            break;
                        case 'block1':
                            switch (i) {
                            case 0:
                                content += '<article class="block-item item-' + i + '"><div class="block-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                break;
                            default:
                                content += '<article class="block-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                break
                            }
                            break;
                        case 'col-left':
                        case 'col-right':
                            switch (i) {
                            case 0:
                                content += '<article class="column-item item-' + i + '"><div class="column-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                break;
                            default:
                                content += '<article class="column-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                break
                            }
                            break;
                        case 'grid1':
                            content += '<article class="grid-item item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                            break;
                        case 'grid2':
                            content += '<article class="grid-item item-' + i + '"><div class="entry-image">' + tag + '<a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></article>';
                            break;
                        case 'videos':
                            switch (i) {
                            case 0:
                                content += '<article class="videos-item item-' + i + '"><div class="videos-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="video-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                break;
                            default:
                                content += '<article class="videos-item item-' + i + '"><div class="videos-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="video-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2></div></div></article>';
                                break
                            }
                            break;
                        case 'gallery':
                            switch (i) {
                            case 0:
                                content += '<article class="gallery-item item-' + i + '"><div class="gallery-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="gallery-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                break;
                            default:
                                content += '<article class="gallery-item item-' + i + '"><div class="gallery-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="gallery-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2></div></div></article>';
                                break
                            }
                            break;
                        case 'list':
                            switch (label) {
                            case 'comments':
                                var code = getPostComments(feed, i, link);
                                content += code;
                                break;
                            default:
                                content += '<article class="custom-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                break
                            }
                            break;
                        case 'related':
                            content += '<article class="related-item post item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                            break
                        }
                        html += content
                    }
                } else {
                    switch (type) {
                    case 'msimple':
                    case 'megatabs':
                        html = '<ul class="mega-widget">' + msgError() + '</ul>';
                        break;
                    default:
                        html = msgError();
                        break
                    }
                }
                switch (type) {
                case 'msimple':
                    html += '</ul>';
                    $this.append(html).addClass('msimple');
                    $this.find('a:first').attr('href', function ($this, href) {
                        switch (label) {
                        case 'recent':
                            href = href.replace(href, '/search');
                            break;
                        default:
                            href = href.replace(href, '/search/label/' + label);
                            break
                        }
                        return href
                    });
                    break;
                case 'featured1':
                case 'featured2':
                case 'featured3':
                    html += '</div></div>';
                    $this.html(html);
                    break;
                case 'block1':
                case 'grid1':
                case 'grid2':
                case 'col-left':
                case 'col-right':
                case 'videos':
                case 'gallery':
                    html += '</div>';
                    $this.html(html);
                    break;
                default:
                    html += '</div>';
                    $this.html(html);
                    break
                }
                $this.find('span.entry-thumb').lazybz()
            },
            error: function () {
                switch (type) {
                case 'msimple':
                case 'megatabs':
                    $this.append('<ul>' + msgError() + '</ul>');
                    break;
                default:
                    $this.html(msgError());
                    break
                }
            }
        })
    }
}

function ajaxMega($this, type, num, label, mtc) {
    if (mtc.match('getmega')) {
        if (type == 'msimple' || type == 'megatabs' || type == 'mtabs') {
            return getAjax($this, type, num, label)
        } else {
            $this.append('<ul class="mega-widget">' + msgError() + '</ul>')
        }
    }
}

function ajaxFeatured($this, type, num, label, mtc, color) {
    if (mtc.match('getfeatured')) {
        if (type == 'featured1' || type == 'featured2' || type == 'featured3') {
            return getAjax($this, type, num, label, color)
        } else {
            $this.html(beforeLoader()).parent().addClass('show-bz lazybz');
            setTimeout(function () {
                $this.html(msgError())
            }, 500)
        }
    }
}

function ajaxBlock($this, type, num, label, mtc, color) {
    if (mtc.match('getblock')) {
        if (type == 'block1' || type == 'col-left' || type == 'col-right' || type == 'grid1' || type == 'grid2' || type == 'videos' || type == 'gallery') {
            var moreText = viewAllText,
                text = '';
            if (moreText != '') {
                text = moreText
            } else {
                text = messages.viewAll
            }
            $this.parent().find('.widget-title').append('<a class="more" href="/search/label/' + label + '">' + text + '</a>');
            return getAjax($this, type, num, label, color)
        } else {
            $this.html(msgError()).parent().addClass('show-bz lazybz')
        }
    }
}

function ajaxWidget($this, type, num, label, mtc) {
    if (mtc.match('getwidget')) {
        if (type == 'list') {
            return getAjax($this, type, num, label)
        } else {
            $this.html(msgError())
        }
    }
}

function ajaxRelated($this, type, num, label, mtc) {
    if (mtc.match('getrelated')) {
        return getAjax($this, type, num, label)
    }
}

function shortCodebz(a, b, c) {
    var d = a.split('$'),
        e = /[^{\}]+(?=})/g;
    for (var i = 0; i < d.length; i++) {
        var f = d[i].split('=');
        if (f[0].trim() == b) {
            c = f[1];
            if (c.match(e) != null) {
                return String(c.match(e)).trim()
            } else {
                return false
            }
        }
    }
    return false
}

function megaTabs($this, type, label, mtc) {
    if (type == 'mtabs') {
        if (label != false) {
            var lLen = label.length,
                code = '<ul class="complex-tabs">';
            for (var i = 0; i < lLen; i++) {
                var tag = label[i];
                if (tag) {
                    code += '<div class="mega-tab" tab-bz="' + tag + '"/>'
                }
            }
            code += '</ul>';
            $this.addClass('mega-tabs mtabs').append(code);
            $this.find('> a:first').attr('href', 'javascript:;');
            $('.mega-tab').each(function () {
                var $this = $(this),
                    label = $this.attr('tab-bz');
                ajaxMega($this, 'megatabs', 4, label, mtc)
            });
            $this.find('ul.complex-tabs').tabbz({
                onHover: true
            })
        } else {
            $this.append('<ul class="mega-widget">' + msgError() + '</ul>')
        }
    }
}
$('#Zien-main-menu li').each(function (type, label) {
    var lc = $(this),
        $this = lc,
        ltx = lc.find('a'),
        txt = ltx.attr('href').trim(),
        mtc = txt.toLowerCase();
    type = shortCodebz(txt, 'type');
    label = shortCodebz(txt, 'label');
    if (mtc.match('getmega')) {
        $this.addClass('has-sub mega-menu')
    }
    ajaxMega($this, type, 5, label, mtc);
    if (type == 'mtabs') {
        if (label != false) {
            label = label.split('/')
        }
        megaTabs($this, type, label, mtc)
    }
});
$('#featured .HTML .widget-content').each(function (type, num, label, color) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodebz(txt, 'type');
    label = shortCodebz(txt, 'label');
    color = shortCodebz(txt, 'color');
    switch (type) {
    case 'featured2':
        num = 4;
        break;
    case 'featured3':
        num = 5;
        break;
    default:
        num = 3;
        break
    }
    ajaxFeatured($this, type, num, label, mtc, color)
});
$('.Zien-content-blocks .HTML .widget-content').each(function (type, num, label, color) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodebz(txt, 'type');
    num = shortCodebz(txt, 'results');
    label = shortCodebz(txt, 'label');
    color = shortCodebz(txt, 'color');
    ajaxBlock($this, type, num, label, mtc, color)
});
$('.Zien-widget-ready .HTML .widget-content').each(function (type, num, label) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodebz(txt, 'type');
    num = shortCodebz(txt, 'results');
    label = shortCodebz(txt, 'label');
    ajaxWidget($this, type, num, label, mtc)
});
$('.Zien-related-content').each(function () {
    var $this = $(this),
        label = $this.find('.related-tag').attr('data-label'),
        num = relatedPostsNum;
    ajaxRelated($this, 'related', num, label, 'getrelated')
});
$('.Zien-blog-post-comments').each(function () {
    var $this = $(this),
        system = commentsSystem,
        facebook = '<div class="fb-comments" data-width="100%" data-href="' + disqus_blogger_current_url + '" order_by="time" data-colorscheme="' + fbCommentsTheme + '" data-numposts="5"></div>',
        sClass = 'comments-system-' + system;
    switch (system) {
    case 'blogger':
        $this.addClass(sClass).show();
        $('.entry-meta .entry-comments-link').addClass('show');
        break;
    case 'disqus':
        $this.addClass(sClass).show();
        break;
    case 'facebook':
        $this.addClass(sClass).find('#comments').html(facebook);
        $this.show();
        break;
    case 'hide':
        $this.hide();
        break;
    default:
        $this.addClass('comments-system-blogger').show();
        $('.entry-meta .entry-comments-link').addClass('show');
        break
    }
    var $r = $this.find('.comments .toplevel-thread > ol > .comment .comment-actions .comment-reply'),
        $c = $this.find('.comments .toplevel-thread > #top-continue');
    $r.on('click', function () {
        $c.show()
    });
    $c.on('click', function () {
        $c.hide()
    })
});
$(function () {
    $('.index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar').lazybz();
    $('.mobile-logo').each(function () {
        var $t = $(this),
            $l = $('#main-logo .header-widget a').clone();
        $l.find('#h1-tag').remove();
        $l.appendTo($t)
    });
    $('#Zien-mobile-menu').each(function () {
        var $t = $(this),
            $m = $('#Zien-main-menu-nav').clone();
        $m.attr('id', 'main-mobile-nav');
        $m.find('.mega-widget, .mega-tab').remove();
        $m.find('li.mega-tabs .complex-tabs').each(function () {
            var $eq = $(this);
            $eq.replaceWith($eq.find('> ul.select-tab').attr('class', 'sub-menu m-sub'))
        });
        $m.find('.mega-menu:not(.mega-tabs) > a').each(function ($l, $u) {
            var $a = $(this),
                $h = $a.attr('href').trim(),
                $m = $h.toLowerCase();
            if ($m.match('getmega')) {
                $l = shortCodebz($h, 'label');
                $l == 'recent' ? $u = '/search' : $u = '/search/label/' + $l;
                $a.attr('href', $u)
            }
        });
        $m.find('.mega-tabs ul li > a').each(function () {
            var $a = $(this),
                $l = $a.text().trim();
            $a.attr('href', '/search/label/' + $l)
        });
        $m.appendTo($t);
        $('.show-Zien-mobile-menu, .hide-Zien-mobile-menu, .overlay').on('click', function () {
            $('body').toggleClass('nav-active')
        });
        $('.Zien-mobile-menu .has-sub').append('<div class="submenu-toggle"/>');
        $('.Zien-mobile-menu .mega-menu').find('.submenu-toggle').remove();
        $('.Zien-mobile-menu .mega-tabs').append('<div class="submenu-toggle"/>');
        $('.Zien-mobile-menu ul li .submenu-toggle').on('click', function ($this) {
            if ($(this).parent().hasClass('has-sub')) {
                $this.preventDefault();
                if (!$(this).parent().hasClass('show')) {
                    $(this).parent().addClass('show').children('.m-sub').slideToggle(170)
                } else {
                    $(this).parent().removeClass('show').find('> .m-sub').slideToggle(170)
                }
            }
        })
    });
    $('.social-mobile').each(function () {
        var $t = $(this),
            $l = $('#main-navbar-social ul.social').clone();
        $l.appendTo($t)
    });
    $('#Zien-header-wrapper .ZienHeader').each(function () {
        var $this = $(this);
        if (fixedMenu == true) {
            if ($this.length > 0) {
                var t = $(document).scrollTop(),
                    w = $this.offset().top,
                    s = $this.height(),
                    h = (w + s);
                $(window).scroll(function () {
                    var n = $(document).scrollTop(),
                        f = $('#footer-wrapper').offset().top,
                        m = (f - s);
                    if (n < m) {
                        if (n > h) {
                            $this.addClass('is-fixed')
                        } else if (n <= 0) {
                            $this.removeClass('is-fixed')
                        }
                        if (n > t) {
                            $this.removeClass('show')
                        } else {
                            $this.addClass('show')
                        }
                        t = $(document).scrollTop()
                    }
                })
            }
        }
    });
    $('#main-wrapper,#sidebar-wrapper').each(function () {
        if (fixedSidebar == true) {
            if (fixedMenu == true) {
                var $topMargin = 75
            } else {
                $topMargin = 25
            }
            $(this).theiaStickySidebar({
                additionalMarginTop: $topMargin,
                additionalMarginBottom: 25
            })
        }
    });
    $('#post-body iframe').each(function () {
        var $t = $(this),
            $mtc = $t.attr('src');
        if ($mtc.match('www.youtube.com')) {
            $t.wrap('<div class="responsive-video-wrap"/>')
        }
    });
    $('p.comment-content').each(function () {
        var $t = $(this);
        $t.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>');
        $t.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
    });
    $('#Zien-load-more-link').each(function () {
        var $this = $(this),
            $loadLink = $this.data('load');
        if ($loadLink) {
            $('#Zien-load-more-link').show()
        }
        $('#Zien-load-more-link').on('click', function (a) {
            $('#Zien-load-more-link').hide();
            $.ajax({
                url: $loadLink,
                success: function (data) {
                    var $p = $(data).find('.blog-posts');
                    $p.find('.index-post').addClass('post-animated post-fadeInUp');
                    $('.blog-posts').append($p.html());
                    $loadLink = $(data).find('#Zien-load-more-link').data('load');
                    if ($loadLink) {
                        $('#Zien-load-more-link').show()
                    } else {
                        $('#Zien-load-more-link').hide();
                        $('#blog-pager .no-more').addClass('show')
                    }
                    $('.index-post .entry-image-link .entry-thumb').lazybz()
                },
                beforeSend: function () {
                    $('#blog-pager .loading').show()
                },
                complete: function () {
                    $('#blog-pager .loading').hide()
                }
            });
            a.preventDefault()
        })
    });
    $('.back-top').each(function () {
        var $t = $(this);
        $(window).on('scroll', function () {
            $(this).scrollTop() >= 100 ? $t.fadeIn(250) : $t.fadeOut(250);
            $t.offset().top >= $('#footer-wrapper').offset().top - 32 ? $t.addClass('on-footer') : $t.removeClass('on-footer')
        }), $t.click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500)
        })
    })
});
var zPluginOne = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zPluginOne || 0 != document.body.scrollTop && !1 === zPluginOne) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zPluginOne.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zPluginOne = !0)
}, !0);
var zPluginTwo = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zPluginTwo || 0 != document.body.scrollTop && !1 === zPluginTwo) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zPluginTwo.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zPluginTwo = !0)
}, !0);
var lazyshare = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === lazyshare || 0 != document.body.scrollTop && !1 === lazyshare) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "//platform-api.sharethis.com/js/sharethis.js#property=5ae1955780207c001169f1d2&amp;product=inline-share-buttons";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), lazyshare = !0)
}, !0);
var zFuncyBox = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zFuncyBox || 0 != document.body.scrollTop && !1 === zFuncyBox) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zFuncyBox.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zFuncyBox = !0)
}, !0);
var lazyfancybox = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === lazyfancybox || 0 != document.body.scrollTop && !1 === lazyfancybox) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), lazyfancybox = !0)
}, !0);

function loadCSS(e, t, n) {
    "use strict";
    var i = window.document.createElement("link");
    var o = t || window.document.getElementsByTagName("script")[0];
    i.rel = "stylesheet";
    i.href = e;
    i.media = "only x";
    o.parentNode.insertBefore(i, o);
    setTimeout(function () {
        i.media = n || "all"
    })
}
loadCSS("https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css");
$(document).ready(function () {
    $(".post-body img").parent("a:not(.no-lightbox)").each(function () {
        $(this).attr("src", $(this).find("img").attr("src")), $(this).attr("data-fancybox", "postimages")
    }), $(".post-body img").parent("a:not(.no-lightbox)").fancybox({
        margin: [50, 0],
        onComplete: function (t, o) {
            t.scaleToActual(0, 0, 0), console.log(t)
        }
    })
});
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--cl', localStorage.getItem("color_option"));
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}
document.querySelector(".settings-box .toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open")
};
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--cl', e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});
! function () {
    for (var a = /(\[img\])?((http:|https:)?\/\/\S*?\.(jpg|gif|png|bmp|jpeg]))(\[\/img\])?/gi, b = /(\[vid\])?http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌?[\w\?‌?=]*)?(\[\/vid\])?/gi, c = /(\[vid\])?(http:|https:)?\/\/(vimeo.com)\/([0-9]*)(\[\/vid\])?/gi, d = document.querySelectorAll(".comment-content"), e = 0; e < d.length; e++) {
        for (var f = d[e].getElementsByTagName("a"), g = 0; g < f.length; g++)
            if (f[g].href.match(a) || f[g].href.match(b) || f[g].href.match(c)) {
                var h = document.createElement("span");
                h.innerHTML = f[g].href;
                var i = f[g];
                i.parentNode.insertBefore(h, i), f[g].href = "", f[g].innerHTML = ""
            } var j = d[e].innerHTML;
        j = j.replace(a, '<img style="max-width: 100%; height: auto;display: blocK;margin: 10px auto;" src="$2"" alt=""/>'), j = j.replace(b, '<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;margin:20px auto;"><iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" src="https://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe></div>'), j = j.replace(c, '<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;margin:20px auto;"><iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" src="https://player.vimeo.com/video/$4" frameborder="0" allowfullscreen></iframe></div>'), d[e].innerHTML = j
    }
}();
var head, newLine, el, title, link, ToC = "<nav class='table-of-contents' role='navigation'><h4 >جدول التنقل السريع</h4><ul>";
$(".post-body h2, .post-body h3").attr("id", function (arr) {
    return "point" + arr;
});
$(".post-body h2,  .post-body h3").each(function () {
    el = $(this), title = el.text(), link = "#" + el.attr("id"), ToC += newLine = "<li><a href='" + link + "'>" + title + "</a></li>"
}), ToC += "</ul></nav>", $(".ma-pro").prepend(ToC);
$('#plus').click(function () {
    $('#post-body').css({
        fontSize: "+=1px"
    });
});
$('#minus').click(function () {
    $('#post-body').css({
        fontSize: "-=1px"
    });
});
$(document).ready(function () {
    var e = "https://" + window.location.hostname + "",
        t = 10;
    $.ajax({
        url: "" + e + "/feeds/posts/default?alt=json-in-script&amp;max-results=" + t,
        type: "get",
        dataType: "jsonp",
        success: function (e) {
            function t() {
                $("#recentbreaking li:first").slideUp(function () {
                    $(this).appendTo($("#recentbreaking ul")).slideDown()
                })
            }
            var n, r, a = "",
                i = e.feed.entry;
            if (void 0 !== i) {
                a = "<ul>";
                for (var l = 0; l < i.length; l++) {
                    for (var s = 0; s < i[l].link.length; s++)
                        if ("alternate" == i[l].link[s].rel) {
                            n = i[l].link[s].href;
                            break
                        } r = i[l].title.$t, a += '<li><a href="' + n + '" target="_blank">' + r + "</a></li>"
                }
                a += "</ul>", $("#recentbreaking").html(a), setInterval(function () {
                    t()
                }, 5e3)
            } else $("#recentbreaking").html("<span>لا يوجد جديد مشاركات حتي الآن</span>")
        },
        error: function () {
            $("#recentbreaking").html("<strong>خطأ في عرض المواضيع</strong>")
        }
    })
});
$('i[rel="pre"]').replaceWith(function () {
    return $('<pre><code>' + $(this).html() + '</code></pre>');
});
var pres = document.querySelectorAll('pre,kbd,blockquote');
for (var i = 0; i < pres.length; i++) {
    pres[i].addEventListener("dblclick", function () {
        var selection = getSelection();
        var range = document.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    }, false);
}
$(document).ready(function () {
    if (localStorage.getItem("mode") == "dark") {
        $("body").addClass("dark");
    } else if (localStorage.getItem("mode") == "light") {
        $("body").removeClass("dark");
    }
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (localStorage.getItem("mode") == "light") {
        $("body").removeClass("dark");
    } else if (mq.matches) {
        $("body").addClass("dark");
    }
});
$("#zToggleMode").on("click", function () {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        localStorage.setItem("mode", "light");
    } else {
        $("body").addClass("dark");
        localStorage.setItem("mode", "dark");
    }
});
var idBlog= "1195570710948772705";var idPage= "5327479516839462864";
$.ajax({
    dataType: "json",
    url: "https://www.blogger.com/feeds/"+idBlog+"/pages/default/"+idPage+"?alt=json-in-script",
    method: "GET",
    dataType: "jsonp",
    success: function(e) {
        var o, t = $(e.entry.content.$t),
            n = t.find("li"),
            a = t.find("script"),
            l = [];
            $allow = !0, $("body").append(a);
        for (o = 0; o < n.length; o += 1) l.push($(n[o]).text());
        o = window.location.hostname.toLowerCase(), n = window.location.href.toLowerCase();
        var s;
        l.length;
        for (s = 0; s < l.length; s += 1) {
            if (-1 != o.indexOf(l[s])) {
                break
            }
  s == l.length - 1 && $('body *').remove() && $('body').addClass('RE').append("<style>body.RE {background:url(https://1.bp.blogspot.com/-qybbjvvGsKE/YFurt4fNFxI/AAAAAAAAAEM/u_jk7CoR0YIVj4G2wg3SeOkbWOpJRj-ZACLcBGAsYHQ/s0/TpJL6PC.png) no-repeat center #eee!important;background-position: center center!important;margin: 50% auto!important;}</style>")
        }
    }
});
jQuery(document).ready(function () {
    jQuery('.page1').click(function () {
        jQuery('.content1').show();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page2').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').show();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page3').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').show();
        jQuery('.content4').hide();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page4').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').show();
        jQuery('.content5').hide();
        return false;
    });
    jQuery('.page5').click(function () {
        jQuery('.content1').hide();
        jQuery('.content2').hide();
        jQuery('.content3').hide();
        jQuery('.content4').hide();
        jQuery('.content5').show();
        return false;
    });
});
$(document).ready(function () {
    $('#ZienRights').attr('style', 'margin-left: 3px;display:inline-block !important;visibility: visible!important; opacity: 1!important;z-index: 1!important;').html('<span class="ZienRightsClass"><a href="https://zien-template.blogspot.com" tooltip="قالب زين - متعدد الاستخدامات" target="_blank" style="visibility: visible!important; opacity: 1!important; position: relative!important; z-index: 1!important;width:32px!important;height:32px!important;"></a></span>');
    setInterval(function () {
        if (!$('#ZienRights:visible').length) {
            window.location.href = 'https://zien-template.blogspot.com/'
        }
    }, 10000)
});
if (AdBlockBlocker == 'true') {
    ! function () {
        function f() {
            var a = document.createElement("div");
            a.id = "levelmaxblock";
            a.innerHTML = '<div id="AdBlockBlocker"><div class="inner"><img src="'+AdBlockImage+'" alt="adblock" width="800px" height="600px" title="adblock"/></div></div>';
            document.body.append(a);
            document.body.style.overflow = "hidden";
        }
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.async = !0;
        b.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        b.onerror = function () {
            f();
            window.adblock = !0
        };
        var e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(b, e)
    }();
}
if (stopCopy == 'true') {
    $(document).ready(function () {
        var stopC = document.getElementById("post-body");
        stopC.classList.add("stopCopy");
    });
}
if (hideToc == 'true') {
    $(document).ready(function () {
        $('.ma-pro').css("display", "none");
    });
}
if (hideFontSize == 'true') {
    $(document).ready(function () {
        $('.font-size').css("display", "none");
    });
}
$(document).ready(function () {
    if (!$('.post-body h3:visible').length) {
        if (!$('.post-body h2:visible').length) {
            $('.ma-pro').css("display", "none");
        }
    }
});
var TransBreakNews = document.getElementById("TransBreakNews");
TransBreakNews.innerHTML = BreakNews;
var page_redirect = void 0 !== Settingsredirect["pageName"] ? Settingsredirect["pageName"] : "redirect",
    redirect_T_Configure = void 0 !== Settingsredirect["waitingMessage"] ? Settingsredirect["waitingMessage"] : "‏جاري تهيئة الرابط",
    redirect_T_ready = void 0 !== Settingsredirect["linkReady"] ? Settingsredirect["linkReady"] : "الرابط جاهز",
    redirect_T_err = void 0 !== Settingsredirect["linkError"] ? Settingsredirect["linkError"] : "رابط معطل",
    redirect_timer = void 0 !== Settingsredirect.waitingTimer ? Settingsredirect.waitingTimer : "10",
    redirect_match = void 0 !== Settingsredirect["autoRedirectSites"] ? Settingsredirect["autoRedirectSites"] : "#",
    nobuttonn = void 0 !== Settingsredirect.nobuttonn && Settingsredirect.nobuttonn;

function radialTimer() {
    var t = this;
    this.seconds = 0, this.count = 0, this.degrees = 0, this.timerHTML = "<div class='clom radialtimer'><div class='n'></div><div class='slice'><div class='q'></div><div class='pie r'></div><div class='pie l'></div></div></div><div class='clom radialbtn'><a class='areload' data-href='false' id='btn_reload'>" + redirect_T_Configure + "</a></div>", this.interval = null, this.timerContainer = null, this.number = null, this.slice = null, this.pie = null, this.pieRight = null, this.pieLeft = null, this.quarter = null, this.reload = null, this.history = "/p/" + page_redirect + ".html", this.ranQuerydata = function () {
        var e = t.getQueryVariable("url");
        t.reload.attr("data-href", e)
    }, this.ranQuerybtn = function () {
        "false" == t.reload.attr("data-href") ? (t.reload.attr("href", "javascript:void(0)"), t.reload.html(redirect_T_err), t.reload.addClass("disabled")) : (t.reload.attr("href", t.reload.attr("data-href")), t.reload.html(redirect_T_ready), t.reload.addClass("active")), nobuttonn && "false" !== t.reload.attr("data-href") && window.location.replace(t.reload.attr("data-href"))
    }, this.getQueryVariable = function (e) {
        for (var r = window.location.search.substring(1).split("&"), t = 0; t < r.length; t++) {
            var i = r[t].split("=");
            if (i[0] == e) return i[1]
        }
        return !1
    }, this.init = function (e, r) {
        t.timerContainer = $("#" + e), t.timerContainer.html(t.timerHTML), t.number = t.timerContainer.find(".n"), t.slice = t.timerContainer.find(".slice"), t.pie = t.timerContainer.find(".pie"), t.pieRight = t.timerContainer.find(".pie.r"), t.pieLeft = t.timerContainer.find(".pie.l"), t.quarter = t.timerContainer.find(".q"), t.reload = t.timerContainer.find(".areload"), t.start(r), t.ranQuerydata(), t.timerContainer.length && history.pushState(null, "", t.history)
    }, this.start = function (e) {
        t.seconds = e, t.interval = window.setInterval(function () {
            t.number.html(t.seconds - 1 - t.count), t.count++, t.count > t.seconds - 1 && clearInterval(t.interval), t.degrees += 360 / t.seconds, t.count >= t.seconds / 2 ? (t.slice.addClass("nc"), t.slice.hasClass("mth") || t.pieRight.css({
                transform: "rotate(180deg)"
            }), t.pieLeft.css({
                transform: "rotate(" + t.degrees + "deg)"
            }), t.slice.addClass("mth"), t.count >= .75 * t.seconds - 1 && t.quarter.remove(), t.seconds - 1 == t.count && t.ranQuerybtn()) : t.pie.css({
                transform: "rotate(" + t.degrees + "deg)"
            })
        }, 1e3)
    }
}
$(document).ready(function () {
    (new radialTimer).init("pageredirect", redirect_timer)
}), $(".post-body a").each(function () {
    var e = window.location.origin,
        r = window.location.hostname,
        t = new RegExp("(" + redirect_match + "|" + r + "|blogger.com|bp.blogspot.com|whatsapp:)");
    0 <= this.href.match(t) && 0 <= this.name.match("more") && ($(this).attr("href", e + "/p/" + page_redirect + ".html?&url=" + $(this).attr("href")), $(this).attr("target", "_blank"))
});
setInterval(() => console.clear(), 100);
window.addEventListener("load", function () {
    noThumbnail = ""+ DefaultIamge +"", $(".post-nav").each(function () {
        var t = $("a.prev-post").attr("href"),
            s = $("a.next-post").attr("href");
        $.ajax({
            url: t,
            type: "get",
            success: function (t) {
                var s = $(t).find("h1.entry-title").text(),
                    a = postnavPrevText,
                    n = "",
                    e = $(t).find("#post-body img:first").attr("src");
                void 0 === e && (e = noThumbnail), n += "<div class='nav-thumb'><img alt='" + s + "' src='" + e + "'/></div><div class='nav-content'><span>" + a + "</span><p class='truncate'>" + s + "</p></div>", $("a.prev-post").html(n)
            }
        }), $.ajax({
            url: s,
            type: "get",
            success: function (t) {
                var s = $(t).find("h1.entry-title").text(),
                    a = postnavNextText,
                    n = "",
                    e = $(t).find("#post-body img:first").attr("src");
                void 0 === e && (e = noThumbnail), n += "<div class='nav-thumb'><img alt='" + s + "' src='" + e + "'/></div><div class='nav-content'><span>" + a + "</span><p class='truncate'>" + s + "</p></div>", $("a.next-post").html(n)
            }
        })
    })
});
window.addEventListener("load", function () {
    $(".toggle").click(function (e) {
        e.preventDefault();
        var n = $(this);
        n.next().hasClass("show") ? (n.next().removeClass("show"), n.next().slideUp(350)) : (n.parent().parent().find("li .inner").removeClass("show"), n.parent().parent().find("li .inner").slideUp(350), n.next().toggleClass("show"), n.next().slideToggle(350))
    })
});
