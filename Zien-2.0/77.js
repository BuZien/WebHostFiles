var _zXz = !1;window.addEventListener("scroll", function () {(0 != document.documentElement.scrollTop && !1 === _zXz || 0 != document.body.scrollTop && !1 === _zXz) && (! function () {var e = document.createElement("script");e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/Zien-2.0/78.js";var a = document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e, a)}(), _zXz = !0)}, !0);
var zToggleDarkMode = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zToggleDarkMode || 0 != document.body.scrollTop && !1 === zToggleDarkMode) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zToggleDarkMode.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zToggleDarkMode = !0)
}, !0);
var zKeys = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zKeys || 0 != document.body.scrollTop && !1 === zKeys) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zKeys.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zKeys = !0)
}, !0);
var zPages = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === zPages || 0 != document.body.scrollTop && !1 === zPages) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://cdn.jsdelivr.net/gh/BuZien/WebHostFiles/ZienTheme/zPages.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), zPages = !0)
}, !0);
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
            a.innerHTML = '<div id="AdBlockBlocker"><div class="inner"><img src="' + AdBlockImage + '" alt="adblock" width="800px" height="600px" title="adblock"/></div></div>';
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
window.addEventListener("scroll", function () {
    noThumbnail = "" + DefaultPostImage + "", $(".post-nav").each(function () {
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
window.addEventListener("scroll", function () {
    $(".toggle").click(function (e) {
        e.preventDefault();
        var n = $(this);
        n.next().hasClass("show") ? (n.next().removeClass("show"), n.next().slideUp(350)) : (n.parent().parent().find("li .inner").removeClass("show"), n.parent().parent().find("li .inner").slideUp(350), n.next().toggleClass("show"), n.next().slideToggle(350))
    })
});
function cyberghost(e,t){for(var r=e.split("<"),n=0;n<r.length;n++)-1!=r[n].indexOf(">")&&(r[n]=r[n].substring(r[n].indexOf(">")+1,r[n].length));return r=r.join(""),r=r.substring(0,t-1)}function showzTable(e){var t,r,n,i,l,a="";urlprevious="",urlnext="";for(var o=0;o<e.feed.link.length;o++)"previous"==e.feed.link[o].rel&&(urlprevious=e.feed.link[o].href),"next"==e.feed.link[o].rel&&(urlnext=e.feed.link[o].href);for(var s=0;numfeed>s&&s!=e.feed.entry.length;s++){t=e.feed.entry[s],r=t.title.$t;for(var o=0;o<t.link.length;o++)if("alternate"==t.link[o].rel){n=t.link[o].href;break}l="content"in t?t.content.$t:"summary"in t?t.summary.$t:"",i="media$thumbnail"in t?t.media$thumbnail.url:""+DefaultPostImage,a+="<div class='zTablePost'>",a+="<a href='"+n+"' target='_blank'><img src='"+i+"' /></a>",a+="<h6><a href='"+n+"'>"+r+"</a></h6>",a+="<p>"+cyberghost(l,charac)+"...</p>",a+="</div>"}document.getElementById("zTable").innerHTML=a,a=""}function navigasifeed(e){var t,r;-1==e?(t=urlprevious.indexOf("?"),r=urlprevious.substring(t)):1==e?(t=urlnext.indexOf("?"),r=urlnext.substring(t)):r="?start-index=1&max-results="+numfeed+"&orderby=published&alt=json-in-script",r+="&callback=showzTable",incluirscript(r)}function incluirscript(e){1==startfeed&&removerscript(),document.getElementById("zTable").innerHTML="<div id='zLoading'></div>";var t=urlblog+"/feeds/posts/default/"+e,r=document.createElement("script");r.setAttribute("type","text/javascript"),r.setAttribute("src",t),r.setAttribute("id","MASLABEL"),document.getElementsByTagName("head")[0].appendChild(r),startfeed=1}function removerscript(){var e=document.getElementById("MASLABEL"),t=e.parentNode;t.removeChild(e)}var numfeed=5,startfeed=0,urlblog=window.location.protocol+"//"+window.location.hostname,charac=150,urlprevious,urlnext;onload=function(){navigasifeed(0)};
setInterval(() => console.clear(), 100);
