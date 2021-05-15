! function(i) {
	i.fn.theiaStickySidebar = function(t) {
		function e(t, e) {
			return !0 === t.initialized || !(i("body").width() < t.minWidth) && (function(t, e) {
				t.initialized = !0, 0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
				e.each(function() {
					var e = {};
					if (e.sidebar = i(this), e.options = t || {}, e.container = i(e.options.containerSelector), 0 == e.container.length && (e.container = e.sidebar.parent()), e.sidebar.parents().css("-webkit-transform", "none"), e.sidebar.css({
							position: e.options.defaultPosition,
							overflow: "visible",
							"-webkit-box-sizing": "border-box",
							"-moz-box-sizing": "border-box",
							"box-sizing": "border-box"
						}), e.stickySidebar = e.sidebar.find(".theiaStickySidebar"), 0 == e.stickySidebar.length) {
						var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
						e.sidebar.find("script").filter(function(i, t) {
							return 0 === t.type.length || t.type.match(a)
						}).remove(), e.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children()), e.sidebar.append(e.stickySidebar)
					}
					e.marginBottom = parseInt(e.sidebar.css("margin-bottom")), e.paddingTop = parseInt(e.sidebar.css("padding-top")), e.paddingBottom = parseInt(e.sidebar.css("padding-bottom"));
					var n = e.stickySidebar.offset().top,
						s = e.stickySidebar.outerHeight();

					function d() {
						e.fixedScrollTop = 0, e.sidebar.css({
							"min-height": "1px"
						}), e.stickySidebar.css({
							position: "static",
							width: "",
							transform: "none"
						})
					}
					e.stickySidebar.css("padding-top", 1), e.stickySidebar.css("padding-bottom", 1), n -= e.stickySidebar.offset().top, s = e.stickySidebar.outerHeight() - s - n, 0 == n ? (e.stickySidebar.css("padding-top", 0), e.stickySidebarPaddingTop = 0) : e.stickySidebarPaddingTop = 1, 0 == s ? (e.stickySidebar.css("padding-bottom", 0), e.stickySidebarPaddingBottom = 0) : e.stickySidebarPaddingBottom = 1, e.previousScrollTop = null, e.fixedScrollTop = 0, d(), e.onScroll = function(e) {
						if (e.stickySidebar.is(":visible"))
							if (i("body").width() < e.options.minWidth) d();
							else {
								if (e.options.disableOnResponsiveLayouts) {
									var a = e.sidebar.outerWidth("none" == e.sidebar.css("float"));
									if (a + 50 > e.container.width()) return void d()
								}
								var n, s, r = i(document).scrollTop(),
									c = "static";
								if (r >= e.sidebar.offset().top + (e.paddingTop - e.options.additionalMarginTop)) {
									var p, b = e.paddingTop + t.additionalMarginTop,
										l = e.paddingBottom + e.marginBottom + t.additionalMarginBottom,
										f = e.sidebar.offset().top,
										h = e.sidebar.offset().top + (n = e.container, s = n.height(), n.children().each(function() {
											s = Math.max(s, i(this).height())
										}), s),
										g = 0 + t.additionalMarginTop,
										S = e.stickySidebar.outerHeight() + b + l < i(window).height();
									p = S ? g + e.stickySidebar.outerHeight() : i(window).height() - e.marginBottom - e.paddingBottom - t.additionalMarginBottom;
									var u = f - r + e.paddingTop,
										m = h - r - e.paddingBottom - e.marginBottom,
										y = e.stickySidebar.offset().top - r,
										k = e.previousScrollTop - r;
									"fixed" == e.stickySidebar.css("position") && "modern" == e.options.sidebarBehavior && (y += k), "stick-to-top" == e.options.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == e.options.sidebarBehavior && (y = p - e.stickySidebar.outerHeight()), y = k > 0 ? Math.min(y, g) : Math.max(y, p - e.stickySidebar.outerHeight()), y = Math.max(y, u), y = Math.min(y, m - e.stickySidebar.outerHeight());
									var v = e.container.height() == e.stickySidebar.outerHeight();
									c = (v || y != g) && (v || y != p - e.stickySidebar.outerHeight()) ? r + y - e.sidebar.offset().top - e.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
								}
								if ("fixed" == c) {
									var x = i(document).scrollLeft();
									e.stickySidebar.css({
										position: "fixed",
										width: o(e.stickySidebar) + "px",
										transform: "translateY(" + y + "px)",
										left: e.sidebar.offset().left + parseInt(e.sidebar.css("padding-left")) - x + "px",
										top: "0px"
									})
								} else if ("absolute" == c) {
									var T = {};
									"absolute" != e.stickySidebar.css("position") && (T.position = "absolute", T.transform = "translateY(" + (r + y - e.sidebar.offset().top - e.stickySidebarPaddingTop - e.stickySidebarPaddingBottom) + "px)", T.top = "0px"), T.width = o(e.stickySidebar) + "px", T.left = "", e.stickySidebar.css(T)
								} else "static" == c && d();
								"static" != c && 1 == e.options.updateSidebarHeight && e.sidebar.css({
									"min-height": e.stickySidebar.outerHeight() + e.stickySidebar.offset().top - e.sidebar.offset().top + e.paddingBottom
								}), e.previousScrollTop = r
							}
					}, e.onScroll(e), i(document).on("scroll." + e.options.namespace, function(i) {
						return function() {
							i.onScroll(i)
						}
					}(e)), i(window).on("resize." + e.options.namespace, function(i) {
						return function() {
							i.stickySidebar.css({
								position: "static"
							}), i.onScroll(i)
						}
					}(e)), "undefined" != typeof ResizeSensor && new ResizeSensor(e.stickySidebar[0], function(i) {
						return function() {
							i.onScroll(i)
						}
					}(e))
				})
			}(t, e), !0)
		}

		function o(i) {
			var t;
			try {
				t = i[0].getBoundingClientRect().width
			} catch (i) {}
			return void 0 === t && (t = i.width()), t
		}
		return (t = i.extend({
				containerSelector: "",
				additionalMarginTop: 0,
				additionalMarginBottom: 0,
				updateSidebarHeight: !0,
				minWidth: 0,
				disableOnResponsiveLayouts: !0,
				sidebarBehavior: "modern",
				defaultPosition: "relative",
				namespace: "TSS"
			}, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
			function(t, o) {
				e(t, o) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function(t, o) {
					return function(a) {
						var n = e(t, o);
						n && i(this).unbind(a)
					}
				}(t, o)), i(window).on("resize." + t.namespace, function(t, o) {
					return function(a) {
						var n = e(t, o);
						n && i(this).unbind(a)
					}
				}(t, o)))
			}(t, this), this
	}
}(jQuery);
! function(a) {
	a.fn.menuzt = function() {
		return this.each(function() {
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
! function(n) {
	n.fn.lazyzt = function() {
		return this.each(function() {
			var o, t = n(this),
				a = n(window),
				e = t.attr("data-image"),
				h = "w" + Math.round(t.width() + t.width() / 10) + "-h" + Math.round(t.height() + t.height() / 10) + "-p-k-no-nu";
			noThumbnail = "undefined" != typeof noThumbnail ? noThumbnail : "//4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nth-zt.png", e.match("resources.blogblog.com") && (e = noThumbnail), o = e.match("/s72-c") ? e.replace("/s72-c", "/" + h) : e.match("/w72-h") ? e.replace("/w72-h72-p-k-no-nu", "/" + h) : e.match("=w72-h") ? e.replace("=w72-h72-p-k-no-nu", "=" + h) : e, t.is(":hidden") || a.on("load resize scroll", function n() {
				if (a.scrollTop() + a.height() >= t.offset().top) {
					a.off("load resize scroll", n);
					var e = new Image;
					e.onload = function() {
						t.attr("style", "background-image:url(" + this.src + ")").addClass("lazy-zt")
					}, e.src = o
				}
			}).trigger("scroll")
		})
	}
}(jQuery);
! function(e) {
	e.fn.replaceText = function(n, t, i) {
		return this.each(function() {
			var o, r, l = this.firstChild,
				u = [];
			if (l)
				do {
					3 === l.nodeType && (r = (o = l.nodeValue).replace(n, t)) !== o && (!i && /</.test(r) ? (e(l).before(r), u.push(l)) : l.nodeValue = r)
				} while (l = l.nextSibling);
			u.length && e(u).remove()
		})
	}
}(jQuery);
! function(t) {
	"use strict";
	var n = function(n) {
			return this.each(function() {
				var e, i, a = t(this),
					o = a.data(),
					c = [a],
					r = this.tagName,
					d = 0;
				e = t.extend({
					content: "body",
					headings: "h1,h2,h3"
				}, {
					content: o.toc || void 0,
					headings: o.tocHeadings || void 0
				}, n), i = e.headings.split(","), t(e.content).find(e.headings).attr("id", function(n, e) {
					return e || function(t) {
						0 === t.length && (t = "?");
						for (var n = t.replace(/\s+/g, "_"), e = "", i = 1; null !== document.getElementById(n + e);) e = "_" + i++;
						return n + e
					}(t(this).text())
				}).each(function() {
					var n = t(this),
						e = t.map(i, function(t, e) {
							return n.is(t) ? e : void 0
						})[0];
					if (e > d) {
						var a = c[0].children("li:last")[0];
						a && c.unshift(t("<" + r + "/>").appendTo(a))
					} else c.splice(0, Math.min(d - e, Math.max(c.length - 1, 0)));
					t("<li/>").appendTo(c[0]).append(t("<a/>").text(n.text()).attr("href", "#" + n.attr("id"))), d = e
				})
			})
		},
		e = t.fn.toc;
	t.fn.toc = n, t.fn.toc.noConflict = function() {
		return t.fn.toc = e, this
	}, t(function() {
		n.call(t("[data-toc]"))
	})
}(window.jQuery);
! function(e) {
	var n;
	if ("function" == typeof define && define.amd) define(["jquery"], e);
	else if ("object" == typeof exports) {
		try {
			n = require("jquery")
		} catch (e) {}
		module.exports = e(n)
	} else {
		var o = window.Cookies,
			r = window.Cookies = e(window.jQuery);
		r.noConflict = function() {
			return window.Cookies = o, r
		}
	}
}(function(e) {
	var n = /\+/g;

	function o(e) {
		return u.raw ? e : encodeURIComponent(e)
	}

	function r(e) {
		return o(u.json ? JSON.stringzt(e) : String(e))
	}

	function t(e, o) {
		var r = u.raw ? e : function(e) {
			0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
			try {
				return e = decodeURIComponent(e.replace(n, " ")), u.json ? JSON.parse(e) : e
			} catch (e) {}
		}(e);
		return c(o) ? o(r) : r
	}

	function i() {
		for (var e, n, o = 0, r = {}; o < arguments.length; o++)
			for (e in n = arguments[o]) r[e] = n[e];
		return r
	}

	function c(e) {
		return "[object Function]" === Object.prototype.toString.call(e)
	}
	var u = function(e, n, f) {
		if (arguments.length > 1 && !c(n)) {
			if ("number" == typeof(f = i(u.defaults, f)).expires) {
				var s = f.expires,
					a = f.expires = new Date;
				a.setMilliseconds(a.getMilliseconds() + 864e5 * s)
			}
			return document.cookie = [o(e), "=", r(n), f.expires ? "; expires=" + f.expires.toUTCString() : "", f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join("")
		}
		for (var d, p = e ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], m = 0, v = l.length; m < v; m++) {
			var g = l[m].split("="),
				w = (d = g.shift(), u.raw ? d : decodeURIComponent(d)),
				j = g.join("=");
			if (e === w) {
				p = t(j, n);
				break
			}
			e || void 0 === (j = t(j)) || (p[w] = j)
		}
		return p
	};
	return u.get = u.set = u, u.defaults = {}, u.remove = function(e, n) {
		return u(e, "", i(n, {
			expires: -1
		})), !u(e)
	}, e && (e.cookie = u, e.removeCookie = u.remove), u
});

function shortCodezt(e, t, a) {
	for (var s = e.split("$"), i = /[^{\}]+(?=})/g, r = 0; r < s.length; r++) {
		var o = s[r].split("=");
		if (o[0].trim() == t) return null != (a = o[1]).match(i) && String(a.match(i)).trim()
	}
	return !1
}

function msgError() {
	return '<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'
}

function beforeLoader() {
	return '<div class="loader"></div>'
}

function getFeedUrl(e, t, a, s) {
	switch (a) {
		case "recent":
			s = "/feeds/posts/default?alt=json&max-results=" + t;
			break;
		default:
			s = "comments" == e ? "/feeds/comments/default?alt=json&max-results=" + t : "/feeds/posts/default/-/" + a + "?alt=json&max-results=" + t
	}
	return s
}

function getPostLink(e, t) {
	for (var a = 0; a < e[t].link.length; a++)
		if ("alternate" == e[t].link[a].rel) {
			var s = e[t].link[a].href;
			break
		}
	return s
}

function getPostTitle(e, t, a) {
	return e[t].title.$t ? e[t].title.$t : ztexport.noTitle
}

function getPostTag(e, t, a) {
	return e[t].category ? '<span class="entry-category">' + e[t].category[0].term + "</span>" : ""
}

function getPostAuthor(e, t, a, s) {
	return s = "" != ztexport.postAuthorLabel ? '<span class="sp">' + ztexport.postAuthorLabel + "</span>" : "", ztexport.postAuthor ? '<span class="entry-author mi">' + s + '<span class="author-name">' + e[t].author[0].name.$t + "</span></span>" : ""
}

function getPostDate(e, t, a, s, i, r) {
	monthNames = "undefined" != typeof monthNames ? monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], dateFormat = "undefined" != typeof dateFormat ? dateFormat : "{m} {d}, {y}";
	var o = e[t].published.$t,
		n = o.substring(0, 4),
		l = o.substring(5, 7),
		c = o.substring(8, 10),
		d = dateFormat.replace("{m}", monthNames[parseInt(l, 10) - 1]).replace("{d}", c).replace("{y}", n);
	return r = ztexport.postAuthor && "" != ztexport.postDateLabel ? '<span class="sp">' + ztexport.postDateLabel + "</span>" : "", [1 == ztexport.postDate ? '<span class="entry-time mi">' + r + '<time class="published" datetime="' + o + '">' + d + "</time></span>" : "", 1 == ztexport.postDate ? '<span class="entry-time mi"><time class="published" datetime="' + o + '">' + d + "</time></span>" : ""]
}

function getPostMeta(e, t, a, s, i) {
	return [1 == ztexport.postAuthor || 1 == ztexport.postDate ? '<div class="entry-meta">' + e + t[0] + "</div>" : "", 1 == ztexport.postDate ? '<div class="entry-meta">' + t[1] + "</div>" : ""]
}

function getFirstImage(e, t) {
	var a = $("<div>").html(e).find("img:first").attr("src"),
		s = a.lastIndexOf("/") || 0,
		i = a.lastIndexOf("/", s - 1) || 0,
		r = a.substring(0, i),
		o = a.substring(i, s),
		n = a.substring(s);
	return (o.match(/\/s[0-9]+/g) || o.match(/\/w[0-9]+/g) || "/d" == o) && (o = "/w72-h72-p-k-no-nu"), r + o + n
}

function getPostImage(e, t, a, s) {
	var i = e[t].content.$t;
	return a = e[t].media$thumbnail ? e[t].media$thumbnail.url : "https://resources.blogblog.com/img/blank.gif", i.indexOf(i.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1 ? i.indexOf("<img") > -1 ? i.indexOf(i.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < i.indexOf("<img") ? a.replace("img.youtube.com", "i.ytimg.com").replace("/default.", "/maxresdefault.") : getFirstImage(i) : a.replace("img.youtube.com", "i.ytimg.com").replace("/default.", "/maxresdefault.") : i.indexOf("<img") > -1 ? getFirstImage(i) : "https://resources.blogblog.com/img/blank.gif"
}

function getPostImageType(e, t) {
	return e.match("i.ytimg.com") ? "is-video" : "is-image"
}

function getPostComments(e, t, a, s) {
	var i = e[t].author[0].name.$t,
		r = e[t].author[0].gd$image.src.replace("/s113", "/s72-c").replace("/s220", "/s72-c"),
		o = e[t].title.$t;
	return (r.match("//img1.blogblog.com/img/blank.gif") || r.match("//img1.blogblog.com/img/b16-rounded.gif")) && (r = "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w72-h72-p-k-no-nu/avatar.jpg"), '<div class="cmm1-item item-' + t + '"><a class="entry-inner wrap-all-link" href="' + a + '" title="' + i + '"><span class="entry-image-wrap cmm-avatar"><span class="entry-thumb" data-image="' + r + '"></span></span><div class="entry-header"><h2 class="entry-title cmm-title">' + i + '</h2><p class="cmm-snippet excerpt">' + o + "</p></div></a></div>"
}

function getAjax(e, t, a, s) {
	switch (t) {
		case "msimple":
		case "featured":
		case "block1":
		case "block2":
		case "grid1":
		case "grid2":
		case "colLeft":
		case "colRight":
		case "video":
		case "default":
		case "mini":
		case "comments":
		case "related":
			0 == s && (s = "geterror404");
			var i = getFeedUrl(t, a, s);
			$.ajax({
				url: i,
				type: "GET",
				dataType: "json",
				cache: !0,
				beforeSend: function(a) {
					switch (t) {
						case "featured":
						case "block1":
						case "block2":
						case "grid1":
						case "grid2":
						case "video":
						case "default":
						case "mini":
						case "comments":
						case "related":
							e.html(beforeLoader()).parent().addClass("type-" + t);
							break;
						case "colLeft":
						case "colRight":
							e.html(beforeLoader())
					}
				},
				success: function(a) {
					var i = "";
					switch (t) {
						case "msimple":
							i = '<div class="ul mega-items">';
							break;
						case "featured":
							i = '<div class="featured-items">';
							break;
						case "block1":
						case "block2":
						case "grid1":
						case "grid2":
						case "video":
							i = '<div class="content-block ' + t + '-items">';
							break;
						case "colLeft":
						case "colRight":
							i = '<div class="content-block col-items ' + t + '-items">';
							break;
						case "default":
							i = '<div class="default-items">';
							break;
						case "mini":
							i = '<div class="mini-items">';
							break;
						case "comments":
							i = '<div class="cmm1-items">';
							break;
						case "related":
							i = '<div class="related-posts">'
					}
					var r = a.feed.entry;
					if (null != r)
						for (var o = 0, n = r; o < n.length; o++) {
							var l = n.length,
								c = getPostLink(n, o),
								d = getPostTitle(n, o),
								m = getPostTag(n, o),
								h = getPostAuthor(n, o),
								f = getPostDate(n, o, m),
								p = getPostImage(n, o),
								u = getPostImageType(p, o),
								g = getPostMeta(h, f),
								y = "";
							switch (t) {
								case "msimple":
									y += '<div class="mega-item post"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div>";
									break;
								case "featured":
									switch (o) {
										case 0:
										case 1:
											y += (0 == o ? '<div class="featured-cards">' : "") + '<div class="featured-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a title="' + d + '" href="' + c + '">' + d + "</a></h2>" + g[0] + "</div></div>" + (1 == l ? 0 == o ? "</div>" : "" : 1 == o ? "</div>" : "");
											break;
										default:
											y += (2 == o ? '<div class="featured-grid">' : "") + '<div class="featured-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><div class="entry-header"><h2 class="entry-title"><a title="' + d + '" href="' + c + '">' + d + "</a></h2>" + g[1] + "</div></div>" + (o == l - 1 ? "</div>" : "")
									}
									break;
								case "block1":
									switch (o) {
										case 0:
											y += '<div class="block1-left"><div class="block1-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[0] + "</div></div></div>";
											break;
										default:
											y += (1 == o ? '<div class="block1-right">' : "") + '<div class="block1-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>" + (o == l - 1 ? "</div>" : "")
									}
									break;
								case "block2":
									switch (o) {
										case 0:
											y += '<div class="block2-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[0] + "</div></div>";
											break;
										default:
											y += '<div class="block2-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>"
									}
									break;
								case "grid1":
								case "grid2":
									y += '<div class="' + t + "-item item-" + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><div class="entry-header"><h2 class="entry-title"><a title="' + d + '" href="' + c + '">' + d + "</a></h2>" + ("grid2" == t ? "" + g[0] : "" + g[1]) + "</div></div>";
									break;
								case "colLeft":
								case "colRight":
									switch (o) {
										case 0:
											y += '<div class="col-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[0] + "</div></div>";
											break;
										default:
											y += '<div class="col-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>"
									}
									break;
								case "video":
									y += '<div class="video-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask is-video" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a title="' + d + '" href="' + c + '">' + d + "</a></h2>" + (0 == o ? "" + g[0] : "" + g[1]) + "</div></div>";
									break;
								case "default":
									switch (o) {
										case 0:
											y += '<div class="default-item card-style item-' + o + '"><a title="' + d + '" class="entry-image-wrap before-mask ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header entry-info">' + m + '<h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[0] + "</div></div>";
											break;
										default:
											y += '<div class="default-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>"
									}
									break;
								case "mini":
									y += '<div class="mini-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>";
									break;
								case "comments":
									y += getPostComments(n, o, c);
									break;
								case "related":
									y += '<div class="related-item item-' + o + '"><a title="' + d + '" class="entry-image-wrap ' + u + '" href="' + c + '"><span class="entry-thumb" data-image="' + p + '"></span></a><div class="entry-header"><h2 class="entry-title"><a href="' + c + '" title="' + d + '">' + d + "</a></h2>" + g[1] + "</div></div>"
							}
							i += y
						} else switch (t) {
							case "msimple":
								i = '<div class="ul mega-items no-items">' + msgError() + "</div>";
								break;
							default:
								i = msgError()
						}
					switch (t) {
						case "msimple":
							i += "</div>", e.append(i).addClass("msimple"), e.find("a:first").attr("href", function(e, t) {
								switch (s) {
									case "recent":
										t = t.replace(t, "/search");
										break;
									default:
										t = t.replace(t, "/search/label/" + s)
								}
								return t
							});
							break;
						default:
							i += "</div>", e.html(i)
					}
					e.find("span.entry-thumb").lazyzt()
				},
				error: function() {
					switch (t) {
						case "msimple":
							e.append('<div class="ul mega-items no-items">' + msgError() + "</div>");
							break;
						default:
							e.html(msgError())
					}
				}
			})
	}
}

function ajaxMega(e, t, a, s, i) {
	if (i.match("getcontent")) {
		if ("msimple" == t) return getAjax(e, t, a, s);
		e.append('<div class="ul mega-items no-items">' + msgError() + "</div>")
	}
}

function ajaxFeatured(e, t, a, s, i) {
	if (i.match("getcontent")) {
		if ("featured" == t) return getAjax(e, t, a, s);
		e.html(msgError())
	}
}

function ajaxBlock(e, t, a, s, i, r, o) {
	if (i.match("getcontent")) {
		if ("block1" == t || "block2" == t || "grid1" == t || "grid2" == t || "colLeft" == t || "colRight" == t || "video" == t) return 0 != s && (r = "recent" == s ? "/search" : "/search/label/" + s, o = "" != viewAllText.trim() ? viewAllText : ztexport.viewAll, e.parent().find(".widget-title").append('<a href="' + r + '" class="wt-l">' + o + "</a>")), getAjax(e, t, a, s);
		e.html(msgError())
	}
}

function ajaxWidget(e, t, a, s, i) {
	if (i.match("getcontent")) {
		if ("default" == t || "mini" == t || "comments" == t) return getAjax(e, t, a, s);
		e.html(msgError())
	}
}

function ajaxRelated(e, t, a, s) {
	return getAjax(e, t, a, s)
}

function disqusComments(e) {
	var t = document.createElement("script");
	t.type = "text/javascript", t.async = !0, t.src = "//" + e + ".disqus.com/blogger_item.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t)
}

function beautiAvatar(e) {
	$(e).attr("src", function(e, t) {
		return t = (t = (t = t.replace("//resources.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("/s35", "/s39")
	})
}

function fixedSidebarzt(e) {
	$(e).each(function(e) {
		fixedSidebar = "undefined" == typeof fixedSidebar || fixedSidebar, 1 == fixedSidebar && (e = 1 == fixedMenu ? 77 : 25, $(this).theiaStickySidebar({
			containerSelector: "#content-wrapper > .container",
			additionalMarginTop: e,
			additionalMarginBottom: 25
		}))
	})
}
fixedMenu = "undefined" == typeof fixedMenu || fixedMenu, viewAllText = "undefined" != typeof viewAllText ? viewAllText : ztexport.viewAll, $("#zient-main-nav").menuzt(), $("#zient-main-nav .widget").addClass("show-menu"), $(".show-search").on("click", function() {
	$("body").addClass("search-active"), $("#main-search-wrap").fadeIn(170).find("input").focus()
}), $(".hide-search").on("click", function() {
	$("body").removeClass("search-active"), $("#main-search-wrap").fadeOut(170).find("input").val("").blur()
}), $("html").each(function() {
	var e = $(this);
	darkMode = "undefined" != typeof darkMode && darkMode, userDarkMode = "undefined" == typeof userDarkMode || userDarkMode, 1 != darkMode && 0 != userDarkMode && ("dark" == localStorage.themeColor && e.addClass("is-dark"), $(".darkmode-toggle").on("click", function() {
		"dark" != localStorage.themeColor ? (e.addClass("is-dark"), localStorage.themeColor = "dark") : (e.removeClass("is-dark"), localStorage.themeColor = "light")
	}))
}), $(".bp-title a.wt-l").each(function() {
	"" != viewAllText.trim() && $(this).text(viewAllText)
}), $(".sidebar .social-icons li a").each(function(e) {
	var t = $(this),
		a = t.attr("href").split("#");
	null != a[1] && "" != (e = a[1].trim()) && t.append('<span class="text">' + e + "</span>"), t.attr("href", a[0].trim())
}), $(".FollowByEmail .widget-content").each(function(e, t) {
	var a = $(this),
		s = a.data("shortcode");
	null != s && (e = shortCodezt(s, "title"), t = shortCodezt(s, "text"), 0 != e && a.find(".follow-by-email-title").text(e), 0 != t && a.find(".follow-by-email-text").text(t))
}), $(".post-body a").each(function() {
	var e = $(this),
		t = e.html(),
		a = t.toLowerCase(),
		s = shortCodezt(t, "text"),
		i = shortCodezt(t, "icon"),
		r = shortCodezt(t, "color");
	a.match("getbutton") && 0 != s && (e.addClass("button btn").text(s), 0 != i && e.addClass(i), 0 != r && e.addClass("colored-button").attr("style", "background-color:" + r + ";"))
}), $(".post-body b").each(function() {
	var e = $(this),
		t = e.text(),
		a = t.toLowerCase().trim();
	a.match(/(?:\$ads\=\{1\})/g) && e.replaceWith('<div id="zient-new-before-ad"/>'), a.match(/(?:\$ads\=\{2\})/g) && e.replaceWith('<div id="zient-new-after-ad"/>'), a.match("{toczt}") && (t = 0 != shortCodezt(t, "title") ? shortCodezt(t, "title") : "Table of Contents", e.replaceWith('<div class="toczt-wrap"><div class="toczt-inner"><a href="javascript:;" class="toczt-title" role="button" title="' + t + '"><span class="toczt-title-text">' + t + '</span></a><ol id="toczt"></ol></div></div>'), $(".toczt-title").each(function(e) {
		(e = $(this)).on("click", function() {
			e.toggleClass("is-expanded"), $("#toczt").slideToggle(170)
		})
	}), $("#toczt").toc({
		content: "#post-body",
		headings: "h2,h3,h4"
	}), $("#toczt li a").each(function(e) {
		(e = $(this)).click(function() {
			return $("html,body").animate({
				scrollTop: ($(e.attr("href")).offset().top) - 20
			}, 500), !1
		})
	})), a.match("{contactform}") && (e.replaceWith('<div class="contact-form"/>'), $(".contact-form").append($("#ContactForm1"))), a.match("{leftsidebar}") && ($("body").addClass("is-left"), e.remove()), a.match("{rightsidebar}") && ($("body").addClass("is-right"), e.remove()), a.match("{fullwidth}") && ($("body").addClass("no-sidebar"), e.remove())
}), $("#zient-new-before-ad").each(function() {
	var e = $(this);
	e.length && $("#before-ad").appendTo(e)
}), $("#zient-new-after-ad").each(function() {
	var e = $(this);
	e.length && $("#after-ad").appendTo(e)
}), $("#zient-main-before-ad .widget").each(function() {
	var e = $(this);
	e.length && e.appendTo($("#before-ad"))
}), $("#zient-main-after-ad .widget").each(function() {
	var e = $(this);
	e.length && e.appendTo($("#after-ad"))
}), $("#zient-post-footer-ads .widget").each(function() {
	var e = $(this);
	e.length && e.appendTo($("#post-footer-ads"))
}), $(".post-body blockquote").each(function() {
	var e = $(this),
		t = e.text().toLowerCase().trim(),
		a = e.html();
	if (t.match("{alertsuccess}")) {
		const t = a.replace("{alertSuccess}", "");
		e.replaceWith('<div class="alert-message alert-success">' + t + "</div>")
	}
	if (t.match("{alertinfo}")) {
		const t = a.replace("{alertInfo}", "");
		e.replaceWith('<div class="alert-message alert-info">' + t + "</div>")
	}
	if (t.match("{alertwarning}")) {
		const t = a.replace("{alertWarning}", "");
		e.replaceWith('<div class="alert-message alert-warning">' + t + "</div>")
	}
	if (t.match("{alerterror}")) {
		const t = a.replace("{alertError}", "");
		e.replaceWith('<div class="alert-message alert-error">' + t + "</div>")
	}
	if (t.match("{codebox}")) {
		const t = a.replace("{codeBox}", "");
		e.replaceWith('<pre class="code-box">' + t + "</pre>")
	}
}), $(".entry-share-links .window-zt,.zient-share-links .window-zt").on("click", function() {
	var e = $(this),
		t = e.data("url"),
		a = e.data("width"),
		s = e.data("height"),
		i = window.screen.width,
		r = window.screen.height,
		o = Math.round(i / 2 - a / 2),
		n = Math.round(r / 2 - s / 2);
	window.open(t, "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + a + ",height=" + s + ",left=" + o + ",top=" + n).focus()
}), $(".zient-share-links").each(function() {
	var e = $(this);
	e.find(".show-hid a").on("click", function() {
		e.toggleClass("show-hidden")
	})
}), $(".about-author .author-text").each(function() {
	var e = $(this),
		t = e.find("a");
	t.each(function() {
		var e = $(this),
			t = e.text().trim(),
			a = e.attr("href");
		e.replaceWith('<li class="' + t + '"><a href="' + a + '" title="' + t + '" rel="noopener noreferrer" target="_blank"/></li>')
	}), t.length && e.parent().append('<ul class="author-links social social-color"></ul>'), e.find("li").appendTo(".author-links")
}), $("#zient-main-nav-menu li.mega-menu").each(function(e, t) {
	var a = $(this),
		s = a.find("a").data("shortcode");
	null != s && (e = s.toLowerCase(), ajaxMega(a, "msimple", 5, shortCodezt(s, "label"), e))
}), $("#featured .HTML .widget-content").each(function(e) {
	var t = $(this),
		a = $(window),
		s = t.data("shortcode");
	null != s && (mtc = s.toLowerCase(), e = shortCodezt(s, "label"), a.on("resize scroll", function s() {
		a.scrollTop() + a.height() >= t.offset().top && (a.off("resize scroll", s), ajaxFeatured(t, "featured", 6, e, mtc))
	}).trigger("scroll"))
}), $(".content-section .HTML .widget-content").each(function(e, t, a) {
	var s = $(this),
		i = $(window),
		r = s.data("shortcode");
	null != r && (mtc = r.toLowerCase(), e = shortCodezt(r, "results"), t = shortCodezt(r, "label"), "colLeft" != (a = shortCodezt(r, "type")) && "colRight" != a || s.parent().addClass("column-style type-" + a), i.on("resize scroll", function r() {
		i.scrollTop() + i.height() >= s.offset().top && (i.off("resize scroll", r), ajaxBlock(s, a, e, t, mtc))
	}).trigger("scroll"))
}), $(".zient-widget-ready .HTML .widget-content").each(function(e, t, a, s) {
	var i = $(this),
		r = $(window),
		o = i.data("shortcode");
	null != o && (e = o.toLowerCase(), t = shortCodezt(o, "results"), a = shortCodezt(o, "label"), s = shortCodezt(o, "type"), r.on("resize scroll", function o() {
		r.scrollTop() + r.height() >= i.offset().top && (r.off("resize scroll", o), ajaxWidget(i, s, t, a, e))
	}).trigger("scroll"))
}), $("#zient-related-posts .HTML").each(function(e, t) {
	var a = $(this).data("shortcode");
	if (null != a) {
		function s() {
			return e = shortCodezt(a, "title"), t = shortCodezt(a, "results"), [e, t]
		}
		$("#related-wrap").each(function(e, t) {
			var a = $(this),
				i = $(window),
				r = a.find(".zient-related-content"),
				o = s();
			e = 0 != o[1] ? o[1] : 3, 0 != o[0] && a.find(".related-title .title").text(o[0]), t = a.find(".related-tag").data("label"), i.on("resize scroll", function a() {
				i.scrollTop() + i.height() >= r.offset().top && (i.off("resize scroll", a), ajaxRelated(r, "related", e, t))
			}).trigger("scroll")
		})
	}
}), $(".zient-blog-post-comments").each(function() {
	var e = $(this),
		t = e.data("shortcode"),
		a = shortCodezt(t, "type"),
		s = "comments-system-" + a,
		i = e.find("#top-continue .comment-reply");
	switch (a) {
		case "disqus":
			var r = shortCodezt(t, "shortname");
			0 != r && (disqus_shortname = r), disqusComments(disqus_shortname), e.addClass(s).show();
			break;
		case "facebook":
			e.addClass(s).find("#comments").html('<div class="fb-comments" data-width="100%" data-href="' + disqus_blogger_current_url + '" order_by="time" data-numposts="5" data-lazy="true"></div>'), e.show();
			break;
		case "hide":
			e.hide();
			break;
		default:
			e.addClass("comments-system-blogger").show(), $(".entry-meta .entry-comments-link").addClass("show"), i.addClass("btn"), beautiAvatar(".avatar-image-container img")
	}
	var o = e.find(".comments .comment-reply"),
		n = e.find(".comments #top-continue"),
		l = e.find("#top-ce.comment-replybox-thread");
	o.on("click", function() {
		n.show(), l.hide()
	}), n.on("click", function() {
		n.hide(), l.show()
	})
}), $(function() {
	$(".entry-image-wrap .entry-thumb,.author-avatar-wrap .author-avatar").lazyzt(), $("#zient-mobile-menu").each(function() {
		var e = $(this),
			t = $("#zient-main-nav-menu").clone();
		t.attr("id", "main-mobile-nav"), t.find(".mega-items").remove(), t.find(".mega-menu > a").each(function(e, t) {
			var a = $(this),
				s = a.data("shortcode");
			null != s && (t = "recent" == (e = shortCodezt(s.trim(), "label")) ? "/search" : "/search/label/" + e, a.attr("href", t))
		}), t.appendTo(e), $(".mobile-menu-toggle, .hide-zient-mobile-menu, .overlay").on("click", function() {
			$("body").toggleClass("nav-active")
		}), $(".zient-mobile-menu .has-sub").append('<div class="submenu-toggle"/>'), $(".zient-mobile-menu .mega-menu").find(".submenu-toggle").remove(), $(".zient-mobile-menu ul li .submenu-toggle").on("click", function(e) {
			$(this).parent().hasClass("has-sub") && (e.preventDefault(), $(this).parent().hasClass("show") ? $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170) : $(this).parent().addClass("show").children(".m-sub").slideToggle(170))
		})
	}), $(".mm-footer .mm-social").each(function() {
		var e = $(this);
		$("#topbar-social ul.social").clone().appendTo(e)
	}), $(".mm-footer .mm-menu").each(function() {
		var e = $(this);
		$("#topbar-menu ul.link-list").clone().appendTo(e)
	}), $(".header-inner").each(function() {
		var e = $(this);
		if (1 == fixedMenu && e.length > 0) {
			var t = $(document).scrollTop(),
				a = e.offset().top,
				s = e.height(),
				i = a + s + s;
			$(window).scroll(function() {
				var s = $(document).scrollTop();
				s > i ? e.addClass("is-fixed") : (s < a || s <= 1) && e.removeClass("is-fixed"), s > t ? e.removeClass("show") : e.addClass("show"), t = s
			})
		}
	}), fixedSidebarzt("#main-wrapper, #sidebar-wrapper"), $("#post-body iframe").each(function() {
		var e = $(this);
		e.attr("src").match("www.youtube.com") && e.wrap('<div class="responsive-video-wrap"/>')
	}), $("p.comment-content").each(function() {
		var e = $(this);
		e.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>'), e.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
	}), $("#zient-load-more-link").each(function() {
		var e = $(this).data("load");
		e && $("#zient-load-more-link").show(), $("#zient-load-more-link").on("click", function(t) {
			$("#zient-load-more-link").hide(), $.ajax({
				url: e,
				success: function(t) {
					var a = $(t).find(".blog-posts");
					a.find(".index-post").addClass("post-animated post-fadeInUp"), $(".blog-posts").append(a.html()), (e = $(t).find("#zient-load-more-link").data("load")) ? $("#zient-load-more-link").show() : ($("#zient-load-more-link").hide(), $("#blog-pager .no-more").addClass("show"))
				},
				beforeSend: function() {
					$("#blog-pager .loading").show()
				},
				complete: function() {
					$("#blog-pager .loading").hide(), $(".index-post .entry-image-wrap .entry-thumb").lazyzt(), fixedSidebarzt("#main-wrapper")
				}
			}), t.preventDefault()
		})
	}), $("#zient-cookie-zt").each(function() {
		var e = $(this),
			t = e.find(".widget.Text").data("shortcode");
		null != t && (ok = shortCodezt(t, "ok"), days = shortCodezt(t, "days"), 0 != ok && e.find("#zient-cookie-zt-accept").text(ok), 0 != days ? days = Number(days) : days = 7), e.length > 0 && ("1" !== $.cookie("zient-cookie") && (e.css("display", "block"), setTimeout(function() {
			e.addClass("is-visible")
		}, 10)), $("#zient-cookie-zt-accept").off("click").on("click", function(t) {
			t.preventDefault(), t.stopPropagation(), $.cookie("zient-cookie", "1", {
				expires: days,
				path: "/"
			}), e.removeClass("is-visible"), setTimeout(function() {
				e.css("display", "none")
			}, 500)
		}), cookieChoices = {})
	}), $("#back-top").each(function() {
		var e = $(this);
		$(window).on("scroll", function() {
			$(this).scrollTop() >= 100 ? e.fadeIn(170) : e.fadeOut(170), e.offset().top >= $("#footer-wrapper").offset().top - 34 ? e.addClass("on-footer") : e.removeClass("on-footer")
		}), e.on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 500)
		})
	})
});
$(document).ready(function() {
	$('#ZienRights').attr('style', 'margin-left: 3px;display:inline-block !important;visibility: visible!important; opacity: 1!important;z-index: 1!important;').html('<span class="ZienRightsClass"><a href="https://zien-template.blogspot.com" tooltip="قالب زين - متعدد الاستخدامات" target="_blank" style="visibility: visible!important; opacity: 1!important; position: relative!important; z-index: 1!important;width:32px!important;height:32px!important;"></a></span>');
	setInterval(function() {
		if (!$('#ZienRights:visible').length) {
			window.location.href = 'https://zien-template.blogspot.com/'
		}
	}, 10000)
});
