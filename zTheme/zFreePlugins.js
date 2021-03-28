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
        img = 'https://1.bp.blogspot.com/-91_bs9ugMu8/YF6BS3mmQbI/AAAAAAAAAGc/jZJ4TC0j7xgUe5MXW5ob8sW5sYKr_BPVQCLcBGAsYHQ/s0/ZT-DefaultPost.png'
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
                case 'list':
                    $this.html(beforeLoader());
                    break;
                }
            },
            success: function (data) {
                var html = '';
                switch (type) {
                case 'list':
                    html = '<div class="custom-widget">';
                    break;
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
                        }
                        html += content
                    }
                }
                switch (type) {
                default:
                    html += '</div>';
                    $this.html(html);
                    break
                }
                $this.find('span.entry-thumb').lazybz()
            },
            error: function () {
                switch (type) {
                default:
                    $this.html(msgError());
                    break
                }
            }
        })
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
$(document).ready(function () {$('#ZienRights').attr('style', 'margin-left: 3px;display:inline-block !important;visibility: visible!important; opacity: 1!important;z-index: 1!important;').html('<span class="ZienRightsClass"><a href="https://zien-template.blogspot.com" tooltip="قالب زين - متعدد الاستخدامات" target="_blank" style="visibility: visible!important; opacity: 1!important; position: relative!important; z-index: 1!important;width:32px!important;height:32px!important;"></a></span>');setInterval(function () {if (!$('#ZienRights:visible').length) {window.location.href = 'https://zien-template.blogspot.com/'}},10000)});
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
