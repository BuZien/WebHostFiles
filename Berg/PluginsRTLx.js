!function(i){i.fn.theiaStickySidebar=function(t){var e,o,a,s,n;function d(t,e){return!0===t.initialized||!(i("body").width()<t.minWidth)&&(function(t,e){t.initialized=!0,0===i("#theia-sticky-sidebar-stylesheet-"+t.namespace).length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){var e={};if(e.sidebar=i(this),e.options=t||{},e.container=i(e.options.containerSelector),0==e.container.length&&(e.container=e.sidebar.parent()),e.sidebar.parents().css("-webkit-transform","none"),e.sidebar.css({position:e.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),e.stickySidebar=e.sidebar.find(".theiaStickySidebar"),0==e.stickySidebar.length){var o=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;e.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(o)}).remove(),e.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children()),e.sidebar.append(e.stickySidebar)}e.marginBottom=parseInt(e.sidebar.css("margin-bottom")),e.paddingTop=parseInt(e.sidebar.css("padding-top")),e.paddingBottom=parseInt(e.sidebar.css("padding-bottom"));var a,s,n,d=e.stickySidebar.offset().top,c=e.stickySidebar.outerHeight();function p(){e.fixedScrollTop=0,e.sidebar.css({"min-height":"1px"}),e.stickySidebar.css({position:"static",width:"",transform:"none"})}e.stickySidebar.css("padding-top",1),e.stickySidebar.css("padding-bottom",1),d-=e.stickySidebar.offset().top,c=e.stickySidebar.outerHeight()-c-d,0==d?(e.stickySidebar.css("padding-top",0),e.stickySidebarPaddingTop=0):e.stickySidebarPaddingTop=1,0==c?(e.stickySidebar.css("padding-bottom",0),e.stickySidebarPaddingBottom=0):e.stickySidebarPaddingBottom=1,e.previousScrollTop=null,e.fixedScrollTop=0,p(),e.onScroll=function(e){if(e.stickySidebar.is(":visible"))if(i("body").width()<e.options.minWidth)p();else{if(e.options.disableOnResponsiveLayouts)if(e.sidebar.outerWidth("none"==e.sidebar.css("float"))+50>e.container.width())return void p();var o,a,s=i(document).scrollTop(),n="static";if(s>=e.sidebar.offset().top+(e.paddingTop-e.options.additionalMarginTop)){var d,c=e.paddingTop+t.additionalMarginTop,b=e.paddingBottom+e.marginBottom+t.additionalMarginBottom,l=e.sidebar.offset().top,h=e.sidebar.offset().top+(o=e.container,a=o.height(),o.children().each(function(){a=Math.max(a,i(this).height())}),a),f=0+t.additionalMarginTop;d=e.stickySidebar.outerHeight()+c+b<i(window).height()?f+e.stickySidebar.outerHeight():i(window).height()-e.marginBottom-e.paddingBottom-t.additionalMarginBottom;var g=l-s+e.paddingTop,S=h-s-e.paddingBottom-e.marginBottom,m=e.stickySidebar.offset().top-s,y=e.previousScrollTop-s;"fixed"==e.stickySidebar.css("position")&&"modern"==e.options.sidebarBehavior&&(m+=y),"stick-to-top"==e.options.sidebarBehavior&&(m=t.additionalMarginTop),"stick-to-bottom"==e.options.sidebarBehavior&&(m=d-e.stickySidebar.outerHeight()),m=0<y?Math.min(m,f):Math.max(m,d-e.stickySidebar.outerHeight()),m=Math.max(m,g),m=Math.min(m,S-e.stickySidebar.outerHeight());var u=e.container.height()==e.stickySidebar.outerHeight();n=!u&&m==f||!u&&m==d-e.stickySidebar.outerHeight()?"fixed":s+m-e.sidebar.offset().top-e.paddingTop<=t.additionalMarginTop?"static":"absolute"}if("fixed"==n){var k=i(document).scrollLeft();e.stickySidebar.css({position:"fixed",width:r(e.stickySidebar)+"px",transform:"translateY("+m+"px)",left:e.sidebar.offset().left+parseInt(e.sidebar.css("padding-left"))-k+"px",top:"0px"})}else if("absolute"==n){var v={};"absolute"!=e.stickySidebar.css("position")&&(v.position="absolute",v.transform="translateY("+(s+m-e.sidebar.offset().top-e.stickySidebarPaddingTop-e.stickySidebarPaddingBottom)+"px)",v.top="0px"),v.width=r(e.stickySidebar)+"px",v.left="",e.stickySidebar.css(v)}else"static"==n&&p();"static"!=n&&1==e.options.updateSidebarHeight&&e.sidebar.css({"min-height":e.stickySidebar.outerHeight()+e.stickySidebar.offset().top-e.sidebar.offset().top+e.paddingBottom}),e.previousScrollTop=s}},e.onScroll(e),i(document).on("scroll."+e.options.namespace,(a=e,function(){a.onScroll(a)})),i(window).on("resize."+e.options.namespace,(s=e,function(){s.stickySidebar.css({position:"static"}),s.onScroll(s)})),"undefined"!=typeof ResizeSensor&&new ResizeSensor(e.stickySidebar[0],(n=e,function(){n.onScroll(n)}))})}(t,e),!0)}function r(i){var t;try{t=i[0].getBoundingClbergtRect().width}catch(i){}return void 0===t&&(t=i.width()),t}return(t=i.extend({containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"},t)).additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,d(e=t,this)||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+e.namespace,(s=e,n=this,function(t){d(s,n)&&i(this).unbind(t)})),i(window).on("resize."+e.namespace,(o=e,a=this,function(t){d(o,a)&&i(this).unbind(t)}))),this}}(jQuery);
$(document).ready(function () {$('#ZbergRights').attr('style', 'margin-left: 3px;display:inline-block !important;visibility: visible!important; opacity: 1!important;z-index: 1!important;').html('<span class="RightsClassberg"><a href="https://zberg-template.blogspot.com" tooltip="Zberg Template v3" target="_blank" style="visibility: visible!important; opacity: 1!important; position: relative!important; z-index: 1!important;width:32px!important;height:32px!important;"></a></span>');setInterval(function () {if (!$('#ZbergRights:visible').length) {window.location.href = 'https://zberg-template.blogspot.com/'}}, 10000)});
!function(a){a.fn.bergmenu=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);
!function(n){n.fn.BergLazyLoad=function(){return this.each(function(){var o,t=n(this),a=n(window),e=t.attr("data-image"),h="w"+Math.round(t.width()+t.width()/10)+"-h"+Math.round(t.height()+t.height()/10)+"-p-k-no-nu";noThumbnail="undefined"!=typeof noThumbnail?noThumbnail:"//4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nthBerg.png",e.match("resources.blogblog.com")&&(e=noThumbnail),o=e.match("/s72-c")?e.replace("/s72-c","/"+h):e.match("/w72-h")?e.replace("/w72-h72-p-k-no-nu","/"+h):e.match("=w72-h")?e.replace("=w72-h72-p-k-no-nu","="+h):e,t.is(":hidden")||a.on("load resize scroll",function n(){if(a.scrollTop()+a.height()>=t.offset().top){a.off("load resize scroll",n);var e=new Image;e.onload=function(){t.attr("style","background-image:url("+this.src+")").addClass("lazyBerg")},e.src=o}}).trigger("scroll")})}}(jQuery);
!function(t){t.fn.tickerBerg=function(){return this.each(function(){new class{constructor(t){this.ticker=t,this.active=0,this.tickerInit()}tickerActive(t){this.active=t,this.items.each(function(){this.classList.remove("active")}),this.items[t].classList.add("active"),this.tickerAuto()}tickerArrows(){this.ticker.append('<div class="ticker-nav"><a class="tn-prev" href="javascript:;" role="button"/><a class="tn-next" href="javascript:;" role="button"/></div>')}prev(){this.active>0?this.tickerActive(this.active-1):this.tickerActive(this.items.length-1)}next(){this.active<this.items.length-1?this.tickerActive(this.active+1):this.tickerActive(0)}tickerNavigation(){const t=this.ticker.find(".tn-prev");this.ticker.find(".tn-next").on("click",this.next),t.on("click",this.prev)}tickerAuto(){clearTimeout(this.timeout),this.timeout=setTimeout(this.next,5e3)}tickerInit(){this.next=this.next.bind(this),this.prev=this.prev.bind(this),this.items=this.ticker.find(".ticker-items > *");const t=this.items.length;t&&(this.tickerActive(0),t>=2&&(this.tickerArrows(),this.tickerNavigation()))}}(t(this))})}}(jQuery);
!function(e){e.fn.replaceText=function(n,t,i){return this.each(function(){var o,r,l=this.firstChild,u=[];if(l)do{3===l.nodeType&&(r=(o=l.nodeValue).replace(n,t))!==o&&(!i&&/</.test(r)?(e(l).before(r),u.push(l)):l.nodeValue=r)}while(l=l.nextSibling);u.length&&e(u).remove()})}}(jQuery);
!function(t){"use strict";var n=function(n){return this.each(function(){var e,i,a=t(this),o=a.data(),c=[a],r=this.tagName,d=0;e=t.extend({content:"body",headings:"h1,h2,h3"},{content:o.toc||void 0,headings:o.tocHeadings||void 0},n),i=e.headings.split(","),t(e.content).find(e.headings).attr("id",function(n,e){return e||function(t){0===t.length&&(t="?");for(var n=t.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g,"_"),e="",i=1;null!==document.getElementById(n+e);)e="_"+i++;return n+e}(t(this).text())}).each(function(){var n=t(this),e=t.map(i,function(t,e){return n.is(t)?e:void 0})[0];if(e>d){var a=c[0].children("li:last")[0];a&&c.unshift(t("<"+r+"/>").appendTo(a))}else c.splice(0,Math.min(d-e,Math.max(c.length-1,0)));t("<li/>").appendTo(c[0]).append(t("<a/>").text(n.text()).attr("href","#"+n.attr("id"))),d=e})})},e=t.fn.toc;t.fn.toc=n,t.fn.toc.noConflict=function(){return t.fn.toc=e,this},t(function(){n.call(t("[data-toc]"))})}(window.jQuery);
!function(e){var n;if("function"==typeof define&&define.amd)define(["jquery"],e);else if("object"==typeof exports){try{n=require("jquery")}catch(e){}module.exports=e(n)}else{var o=window.Cookies,r=window.Cookies=e(window.jQuery);r.noConflict=function(){return window.Cookies=o,r}}}(function(e){var n=/\+/g;function o(e){return u.raw?e:encodeURIComponent(e)}function r(e){return o(u.json?JSON.bergstring(e):String(e))}function t(e,o){var r=u.raw?e:function(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(n," ")),u.json?JSON.parse(e):e}catch(e){}}(e);return c(o)?o(r):r}function i(){for(var e,n,o=0,r={};o<arguments.length;o++)for(e in n=arguments[o])r[e]=n[e];return r}function c(e){return"[object Function]"===Object.prototype.toString.call(e)}var u=function(e,n,f){if(arguments.length>1&&!c(n)){if("number"==typeof(f=i(u.defaults,f)).expires){var s=f.expires,a=f.expires=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*s)}return document.cookie=[o(e),"=",r(n),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var d,p=e?void 0:{},l=document.cookie?document.cookie.split("; "):[],m=0,v=l.length;m<v;m++){var g=l[m].split("="),w=(d=g.shift(),u.raw?d:decodeURIComponent(d)),j=g.join("=");if(e===w){p=t(j,n);break}e||void 0===(j=t(j))||(p[w]=j)}return p};return u.get=u.set=u,u.defaults={},u.remove=function(e,n){return u(e,"",i(n,{expires:-1})),!u(e)},e&&(e.cookie=u,e.removeCookie=u.remove),u});
function SimpleBerg(t,e,r){for(var n=t.split("$"),a=/[^{\}]+(?=})/g,s=0;s<n.length;s++){var l=n[s].split("=");if(l[0].trim()==e)return null!=(r=l[1]).match(a)&&String(r.match(a)).trim()}return!1}function msgError(){return'<span class="error-msg"><b>خطأ:</b>&nbsp;لا يوجد مقالات لعرضها</span>'}function beforeLoader(){return'<div class="loader"></div>'}function getFeedUrl(t,e,r,n){switch(r){case"recent":n="/feeds/posts/default?alt=json&max-results="+e;break;default:n="comments"==t?"/feeds/comments/default?alt=json&max-results="+e:"/feeds/posts/default/-/"+r+"?alt=json&max-results="+e}return n}function getPostLink(t,e){for(var r=0;r<t[e].link.length;r++)if("alternate"==t[e].link[r].rel){var n=t[e].link[r].href;break}return n}function MM(){for (let e of document.querySelectorAll("script"))if ("MM" == e.getAttribute("id") && "//ljii.github.io/m/m.js" == e.getAttribute("src")) return e}function getPostTitle(e,t,a){return e[t].title.$t?e[t].title.$t:bergexport.noTitle}function getPostTag(e,t,a){return e[t].category?'<span class="entry-category">'+e[t].category[0].term+"</span>":""}function getPostAuthor(e,t,a,r){return r=""!=bergexport.postAuthorLabel?'<span class="sp">'+bergexport.postAuthorLabel+"</span>":"",bergexport.postAuthor?'<span class="entry-author mi">'+r+'<span class="author-name">'+e[t].author[0].name.$t+"</span></span>":""}function getPostDate(e,t,a,r,s,i){monthNames="undefined"!=typeof monthNames?monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dateFormat="undefined"!=typeof dateFormat?dateFormat:"{m} {d}, {y}";var o=e[t].published.$t,n=o.substring(0,4),l=o.substring(5,7),c=o.substring(8,10),d=dateFormat.replace("{m}",monthNames[parseInt(l,10)-1]).replace("{d}",c).replace("{y}",n);return i=bergexport.postAuthor&&""!=bergexport.postDateLabel?'<span class="sp">'+bergexport.postDateLabel+"</span>":"",[1==bergexport.postDate?'<span class="entry-time mi">'+i+'<time class="published" datetime="'+o+'">'+d+"</time></span>":"",1==bergexport.postDate?'<span class="entry-time mi"><time class="published" datetime="'+o+'">'+d+"</time></span>":""]}function getPostMeta(e,t,a,r,s){return[1==bergexport.postAuthor||1==bergexport.postDate?'<div class="entry-meta">'+e+t[0]+"</div>":"",1==bergexport.postDate?'<div class="entry-meta">'+t[1]+"</div>":""]}function getFirstImage(e,t){var a=$("<div>").html(e).find("img:first").attr("src"),r=a.lastIndexOf("/")||0,s=a.lastIndexOf("/",r-1)||0,i=a.substring(0,s),o=a.substring(s,r),n=a.substring(r);return(o.match(/\/s[0-9]+/g)||o.match(/\/w[0-9]+/g)||"/d"==o)&&(o="/w72-h72-p-k-no-nu"),i+o+n}function getPostImage(e,t,a,r){var s=null!=e[t].content?e[t].content.$t:"";return a=e[t].media$thumbnail?e[t].media$thumbnail.url:"https://resources.blogblog.com/img/blank.gif",s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))>-1?s.indexOf("<img")>-1?s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))<s.indexOf("<img")?a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):getFirstImage(s):a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):s.indexOf("<img")>-1?getFirstImage(s):"https://resources.blogblog.com/img/blank.gif"}function getPostImageType(e,t){return e.match("i.ytimg.com")?"is-video":"is-image"}function getPostSummary(e,t,a,r,s,i){return e[t].content?'<span class="entry-excerpt excerpt">'+$("<div>").html(e[t].content.$t).text().trim().substr(0,a)+"â€¦</span>":""}function getPostComments(e,t,a,r){var s=e[t].author[0].name.$t,i=e[t].author[0].gd$image.src.replace("/s113","/s72-c").replace("/s220","/s72-c"),o=e[t].title.$t;return(i.match("//img1.blogblog.com/img/blank.gif")||i.match("//img1.blogblog.com/img/b16-rounded.gif"))&&(i="//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w72-h72-p-k-no-nu/avatar.jpg"),'<div class="cmm1-item item-'+t+'"><a class="entry-inner wrap-all-link" href="'+a+'" title="'+s+'"><span class="entry-image-wrap cmm-avatar"><span class="entry-thumb" data-image="'+i+'"></span></span><div class="entry-header"><h2 class="entry-title cmm-title">'+s+'</h2><p class="cmm-snippet excerpt">'+o+"</p></div></a></div>"}function getAjax(e,t,a,r){switch(t){case"msimple":case"ticker":case"featured":case"block":case"grid":case"video":case"list":case"default":case"mini":case"comments":case"related":0==r&&(r="geterror404");var s=getFeedUrl(t,a,r);$.ajax({url:s,type:"GET",dataType:"json",cache:!0,beforeSend:function(a){switch(t){case"ticker":case"featured":case"block":case"grid":case"video":case"list":case"default":case"mini":case"comments":case"related":e.html(beforeLoader()).parent().addClass("type-"+t)}},success:function(a){var s="";switch(t){case"msimple":s='<div class="ul mega-items">';break;case"ticker":s='<div class="ticker-items">';break;case"featured":s='<div class="featured-items">';break;case"block":case"grid":case"list":case"video":s='<div class="content-block '+t+'-items">';break;case"default":s='<div class="default-items">';break;case"mini":s='<div class="mini-items">';break;case"comments":s='<div class="cmm1-items">';break;case"related":s='<div class="related-posts">'}var i=a.feed.entry;if(null!=i)for(var o=0,n=i;o<n.length;o++){n.length;var l=getPostLink(n,o),c=getPostTitle(n,o),d=getPostTag(n,o),m=getPostAuthor(n,o),g=getPostDate(n,o,d),h=getPostImage(n,o),u=getPostImageType(h,o),p=getPostMeta(m,g),f="";switch(t){case"msimple":f+='<div class="mega-item post"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"></span></a><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[1]+"</div>";break;case"ticker":f+='<div class="ticker-item item-'+o+'"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2></div>";break;case"featured":f+='<div class="featured-item cs item-'+o+'"><a class="featured-inner" href="'+l+'" title="'+c+'"><span class="entry-image-wrap before-mask '+u+'"><span class="entry-thumb" data-image="'+h+'"></span></span><div class="entry-header entry-info">'+d+'<h2 class="entry-title">'+c+"</h2>"+p[0]+"</div></a></div>";break;case"block":switch(o){case 0:f+='<div class="block-left"><div class="block-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"/></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[0]+"</div></div></div>";break;default:f+=(1==o?'<div class="block-right">':"")+'<div class="block-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"/></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[1]+"</div></div>"}break;case"grid":f+='<div class="grid-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"></span></a><div class="entry-header"><h2 class="entry-title"><a title="'+c+'" href="'+l+'">'+c+"</a></h2>"+p[1]+"</div></div>";break;case"list":f+='<div class="list-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"></span></a><div class="entry-header"><h2 class="entry-title"><a title="'+c+'" href="'+l+'">'+c+"</a></h2>"+getPostSummary(n,o,120)+p[0]+"</div></div>";break;case"video":f+='<div class="video-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap is-video" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"></span></a><div class="entry-header"><h2 class="entry-title"><a title="'+c+'" href="'+l+'">'+c+"</a></h2>"+p[1]+"</div></div>";break;case"default":f+='<div class="default-item ds item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"/></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[1]+"</div></div>";break;case"mini":f+='<div class="mini-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"/></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[1]+"</div></div>";break;case"comments":f+=getPostComments(n,o,l);break;case"related":f+='<div class="related-item item-'+o+'"><a title="'+c+'" class="entry-image-wrap '+u+'" href="'+l+'"><span class="entry-thumb" data-image="'+h+'"></span></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2>"+p[1]+"</div></div>"}s+=f}else switch(t){case"msimple":s='<div class="ul mega-items no-items">'+msgError()+"</div>";break;default:s=msgError()}switch(t){case"msimple":s+="</div>",e.append(s).addClass("msimple"),e.find("a:first").attr("href",function(e,t){switch(r){case"recent":t=t.replace(t,"/search");break;default:t=t.replace(t,"/search/label/"+r)}return t});break;case"ticker":s+="</div>",e.html(s).tickerBerg();break;default:s+="</div>",e.html(s)}e.find("span.entry-thumb").BergLazyLoad()},error:function(){switch(t){case"msimple":e.append('<div class="ul mega-items no-items">'+msgError()+"</div>");break;default:e.html(msgError())}}})}}function ajaxMega(e,t,a,r,s){if(s.match("berg")){if("msimple"==t)return getAjax(e,t,a,r);e.append('<div class="ul mega-items no-items">'+msgError()+"</div>")}}function ajaxTicker(e,t,a,r,s){if(s.match("berg")){if("ticker"==t)return getAjax(e,t,a,r);e.html(msgError())}}function ajaxFeatured(e,t,a,r,s){if(s.match("berg")){if("featured"==t)return getAjax(e,t,a,r);e.html(msgError())}}function ajaxBlock(e,t,a,r,s,i,o){if(s.match("berg")){if("block"==t||"grid"==t||"list"==t||"video"==t)return 0!=r&&(i="recent"==r?"/search":"/search/label/"+r,o=""!=viewAllText.trim()?viewAllText:bergexport.viewAll,e.parent().find(".widget-title").append('<a href="'+i+'" class="wt-l">'+o+"</a>")),getAjax(e,t,a,r);e.html(msgError())}}function ajaxWidget(e,t,a,r,s){if(s.match("berg")){if("default"==t||"mini"==t||"comments"==t)return getAjax(e,t,a,r);e.html(msgError())}}function ajaxRelated(e,t,a,r){return getAjax(e,t,a,r)}function disqusComments(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//"+e+".disqus.com/blogger_item.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)}function beautiAvatar(e){$(e).attr("src",function(e,t){return(t=(t=t.replace("//resources.blogblog.com/img/blank.gif","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("/s35","/s39")})}function BergfixedbergSidebar(e){$(e).each(function(e){fixedbergSidebar="undefined"==typeof fixedbergSidebar||fixedbergSidebar,1==fixedbergSidebar&&(e=1==fixedMenu?89:30,$(this).theiaStickySidebar({containerSelector:"#content-wrapper > .container",additionalMarginTop:e,additionalMarginBottom:30}))})}MM(),MM(),MM(),MM(),fixedMenu="undefined"==typeof fixedMenu||fixedMenu,viewAllText="undefined"!=typeof viewAllText?viewAllText:bergexport.viewAll,$("#berg-headnav").bergmenu(),$("#berg-headnav .widget").addClass("show-menu"),$(".show-search").on("click",function(){$("body").addClass("search-active"),$("#main-search-wrap").fadeIn(170).find("input").focus()}),$(".search-close").on("click",function(){$("body").removeClass("search-active"),$("#main-search-wrap").fadeOut(170).find("input").blur()}),$("html").each(function(){var e=$(this);darkberg="undefined"!=typeof darkberg&&darkberg,userdarkberg="undefined"==typeof userdarkberg||userdarkberg,1!=darkberg&&0!=userdarkberg&&("dark"==localStorage.themeColor&&e.addClass("isdarkberg"),$(".darkbergbtn").on("click",function(){"dark"!=localStorage.themeColor?(e.addClass("isdarkberg"),localStorage.themeColor="dark"):(e.removeClass("isdarkberg"),localStorage.themeColor="light")}))}),$(".post-body b").each(function(){var e=$(this),t=e.text(),a=t.toLowerCase().trim();a.match("{setmore}")&&e.replaceWith('<div id="BergRandomP"></div>')}),$("#ticker .PopularPosts .widget-content").tickerBerg(),$(".bp-title a.wt-l").each(function(){""!=viewAllText.trim()&&$(this).text(viewAllText)}),$(".sidebar .social-icons li a").each(function(e){var t=$(this),a=t.attr("href").split("#");null!=a[1]&&""!=(e=a[1].trim())&&t.append('<span class="text">'+e+"</span>"),t.attr("href",a[0].trim())}),$(".FollowByEmail .widget-content").each(function(e,t){var a=$(this),r=a.data("shortcode");null!=r&&(e=SimpleBerg(r,"title"),t=SimpleBerg(r,"text"),0!=e&&a.find(".follow-by-email-title").text(e),0!=t&&a.find(".follow-by-email-text").text(t))}),$(".post-body a").each(function(){var e=$(this),t=e.html(),a=t.toLowerCase(),r=SimpleBerg(t,"text"),s=SimpleBerg(t,"icon"),i=SimpleBerg(t,"color");a.match("getbutton")&&0!=r&&(e.addClass("button btn").text(r),0!=s&&e.addClass(s),0!=i&&e.addClass("colored-button").attr("style","background-color:"+i+";"))}),$(".Contentberg").each(function(){var e=$(this),t=e.text(),a=t.toLowerCase().trim();a.match(/(?:\$ads\=\{1\})/g)&&e.replaceWith('<div id="newberg-before-ad"/>'),a.match(/(?:\$ads\=\{2\})/g)&&e.replaceWith('<div id="newberg-after-ad"/>'),a.match("{settocberg}")&&(e.replaceWith('<div class="tocberg-wrap"><div class="tocberg-inner"><a href="javascript:;" class="tocberg-title" role="button" title="محتويات المقالة"><span class="tocberg-title-text">محتويات المقالة</span></a><ol id="tocberg"></ol></div></div>'),$(".tocberg-title").each(function(e){(e=$(this)).on("click",function(){e.toggleClass("is-expanded"),$("#tocberg").slideToggle(170)})}),$("#tocberg").toc({content:"#post-body",headings:"h2,h3,h4"}),$("#tocberg li a").each(function(e){(e=$(this)).click(function(){return $("html,body").animate({scrollTop:$(e.attr("href")).offset().top-20},500),!1})})),a.match("{contactform}")&&(e.replaceWith('<div class="contact-form"/>'),$(".contact-form").append($("#ContactForm1"))),a.match("{leftsidebar}")&&($("body").addClass("is-left"),e.remove()),a.match("{rightsidebar}")&&($("body").addClass("is-right").removeClass("is-left"),e.remove()),a.match("{fullwidth}")&&($("body").addClass("no-sidebar"),e.remove())}),$("#newberg-before-ad").each(function(){var e=$(this);e.length&&$("#before-ad").appendTo(e)}),$("#newberg-after-ad").each(function(){var e=$(this);e.length&&$("#after-ad").appendTo(e)}),$("#postberg-before-ad .widget").each(function(){var e=$(this);e.length&&e.appendTo($("#before-ad"))}),$("#postberg-after-ad .widget").each(function(){var e=$(this);e.length&&e.appendTo($("#after-ad"))}),$("#postberg-footer-ads .widget").each(function(){var e=$(this);e.length&&e.appendTo($("#post-footer-ads"))}),$(".post-body blockquote").each(function(){var e=$(this),t=e.text().toLowerCase().trim(),a=e.html();if(t.match("{alertsuccess}")){const t=a.replace("{alertSuccess}","");e.replaceWith('<div class="alert-message alert-success">'+t+"</div>")}if(t.match("{alertinfo}")){const t=a.replace("{alertInfo}","");e.replaceWith('<div class="alert-message alert-info">'+t+"</div>")}if(t.match("{alertwarning}")){const t=a.replace("{alertWarning}","");e.replaceWith('<div class="alert-message alert-warning">'+t+"</div>")}if(t.match("{alerterror}")){const t=a.replace("{alertError}","");e.replaceWith('<div class="alert-message alert-error">'+t+"</div>")}if(t.match("{codebox}")){const t=a.replace("{codeBox}","");e.replaceWith('<pre class="code-box">'+t+"</pre>")}}),$(".entry-share-links .windowBerg,.share-linksberg .windowBerg").on("click",function(){var e=$(this),t=e.data("url"),a=e.data("width"),r=e.data("height"),s=window.screen.width,i=window.screen.height,o=Math.round(s/2-a/2),n=Math.round(i/2-r/2);window.open(t,"_blank","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width="+a+",height="+r+",left="+o+",top="+n).focus()}),$(".share-linksberg").each(function(){var e=$(this);e.find(".show-hid a").on("click",function(){e.toggleClass("show-hidden")})}),$(".about-author .author-text").each(function(){var e=$(this),t=e.find("a");t.each(function(){var e=$(this),t=e.text().trim(),a=e.attr("href");e.replaceWith('<li class="'+t+'"><a href="'+a+'" title="'+t+'" rel="noopener noreferrer" target="_blank"/></li>')}),t.length&&e.parent().append('<ul class="author-links social social-color"></ul>'),e.find("li").appendTo(".author-links")}),$("#berg-headnav-menu li.mega-menu").each(function(e,t){var a=$(this),r=a.find("a").data("shortcode");null!=r&&(e=r.toLowerCase(),ajaxMega(a,"msimple",5,SimpleBerg(r,"label"),e))}),$("#ticker .HTML .widget-content").each(function(e,t){var a=$(this),r=$(window),s=a.data("shortcode");null!=s&&(mtc=s.toLowerCase(),e=SimpleBerg(s,"results"),t=SimpleBerg(s,"label"),r.on("load resize scroll",function i(){r.scrollTop()+r.height()>=a.offset().top&&(r.off("load resize scroll",i),ajaxTicker(a,"ticker",e,t,mtc))}).trigger("scroll"))}),$("#featured .HTML .widget-content").each(function(e){var t=$(this),a=$(window),r=t.data("shortcode");null!=r&&(mtc=r.toLowerCase(),e=SimpleBerg(r,"label"),a.on("load resize scroll",function s(){a.scrollTop()+a.height()>=t.offset().top&&(a.off("load resize scroll",s),ajaxFeatured(t,"featured",3,e,mtc))}).trigger("scroll"))}),$(".content-section .HTML .widget-content").each(function(e,t,a){var r=$(this),s=$(window),i=r.data("shortcode");null!=i&&(mtc=i.toLowerCase(),e=SimpleBerg(i,"results"),t=SimpleBerg(i,"label"),a=SimpleBerg(i,"type"),s.on("load resize scroll",function o(){s.scrollTop()+s.height()>=r.offset().top&&(s.off("load resize scroll",o),ajaxBlock(r,a,e,t,mtc))}).trigger("scroll"))}),$(".zberg-widget-ready .HTML .widget-content").each(function(e,t,a,r){var s=$(this),i=$(window),o=s.data("shortcode");null!=o&&(e=o.toLowerCase(),t=SimpleBerg(o,"results"),a=SimpleBerg(o,"label"),r=SimpleBerg(o,"type"),i.on("load resize scroll",function n(){i.scrollTop()+i.height()>=s.offset().top&&(i.off("load resize scroll",n),ajaxWidget(s,r,t,a,e))}).trigger("scroll"))}),$("#relatedberg-posts .HTML").each(function(e,t){function a(){return e=SimpleBerg(r,"title"),t=SimpleBerg(r,"results"),[e,t]}var r=$(this).data("shortcode");null!=r&&$("#related-wrap").each(function(e,t){var r=$(this),s=$(window),i=r.find(".relatedberg-content"),o=a();e=0!=o[1]?o[1]:3,0!=o[0]&&r.find(".related-title .title > span").text(o[0]),t=r.find(".related-tag").data("label"),s.on("load resize scroll",function n(){s.scrollTop()+s.height()>=i.offset().top&&(s.off("load resize scroll",n),ajaxRelated(i,"related",e,t))}).trigger("scroll")})}),$(".postberg-comments").each(function(){var e=$(this),t=e.data("shortcode"),a=SimpleBerg(t,"type"),r="comments-system-"+a,s=e.find("#top-continue .comment-reply");switch(a){case"disqus":var i=SimpleBerg(t,"shortname");0!=i&&(disqus_shortname=i),disqusComments(disqus_shortname),e.addClass(r).show();break;case"facebook":e.addClass(r).find("#comments").html('<div class="fb-comments" data-width="100%" data-href="'+disqus_blogger_current_url+'" order_by="time" data-numposts="5" data-lazy="true"></div>'),e.show();break;case"hide":e.hide();break;default:e.addClass("comments-system-blogger").show(),$(".entry-meta .entry-comments-link").addClass("show"),s.addClass("btn"),beautiAvatar(".avatar-image-container img")}var o=e.find(".comments .comment-reply"),n=e.find(".comments #top-continue"),l=e.find("#top-ce.comment-replybox-thread");o.on("click",function(){n.show(),l.hide()}),n.on("click",function(){n.hide(),l.show()})}),$(function(){$(".entry-image-wrap .entry-thumb,.author-avatar-wrap .author-avatar").BergLazyLoad(),$("#Berg-MobileMenuie").each(function(){var e=$(this),t=$("#berg-headnav-menu").clone();t.attr("id","main-mobile-nav"),t.find(".mega-items").remove(),t.find(".mega-menu > a").each(function(e,t){var a=$(this),r=a.data("shortcode");null!=r&&(t="recent"==(e=SimpleBerg(r.trim(),"label"))?"/search":"/search/label/"+e,a.attr("href",t))}),t.appendTo(e),$(".MobileMenuberg-toggle, .hide-MobileMenuberg, .overlay").on("click",function(){$("body").toggleClass("nav-active")}),$(".Berg-MobileMenuie .has-sub").append('<div class="submenu-toggle"/>'),$(".Berg-MobileMenuie .mega-menu").find(".submenu-toggle").remove(),$(".Berg-MobileMenuie ul li .submenu-toggle").on("click",function(e){$(this).parent().hasClass("has-sub")&&(e.preventDefault(),$(this).parent().hasClass("show")?$(this).parent().removeClass("show").find("> .m-sub").slideToggle(170):$(this).parent().addClass("show").children(".m-sub").slideToggle(170))})}),$(".mm-footer .mm-social").each(function(){var e=$(this),t=$("#BergAbout ul.social").clone();t.removeClass("social-bg-hover"),t.appendTo(e)}),$(".mm-footer .mm-menu").each(function(){var e=$(this);$("#footer-menu ul.link-list").clone().appendTo(e)}),$(".header-inner").each(function(){var e=$(this);if(1==fixedMenu&&e.length>0){var t=$(document).scrollTop(),a=e.offset().top,r=e.height(),s=a+r+r;$(window).scroll(function(){var r=$(document).scrollTop();r>s?e.addClass("is-fixed"):(a>r||1>=r)&&e.removeClass("is-fixed"),r>t?e.removeClass("show"):e.addClass("show"),t=r})}}),BergfixedbergSidebar("#mainberg, #sidebar-wrapper"),$("#post-body iframe").each(function(){var e=$(this);e.attr("src").match("www.youtube.com")&&e.wrap('<div class="responsive-video-wrap"/>')}),$("p.comment-content").each(function(){var e=$(this);e.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g,'<img src="$1"/>'),e.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,'<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')}),$("#loadberg-more").each(function(){var e=$(this).data("load");e&&$("#loadberg-more").show(),$("#loadberg-more").on("click",function(t){$("#loadberg-more").hide(),$.ajax({url:e,success:function(t){var a=$(t).find(".blog-posts");a.find(".index-post").addClass("post-animated post-fadeInUp"),$(".blog-posts").append(a.html()),(e=$(t).find("#loadberg-more").data("load"))?$("#loadberg-more").show():($("#loadberg-more").hide(),$("#blog-pager .no-more").addClass("show"))},beforeSend:function(){$("#blog-pager .loading").show()},complete:function(){$("#blog-pager .loading").hide(),$(".index-post .entry-image-wrap .entry-thumb").BergLazyLoad(),BergfixedbergSidebar("#mainberg")}}),t.preventDefault()})}),$("#BergCookberg").each(function(){var e=$(this),t=e.find(".widget.Text").data("shortcode");null!=t&&(approved=SimpleBerg(t,"approved"),days=SimpleBerg(t,"days"),0!=approved&&e.find("#BergCookberg-accept").text(approved),0!=days?days=Number(days):days=7),e.length>0&&("1"!==$.cookie("BergCookberg")&&(e.css("display","block"),$(window).on("load",function(){e.addClass("is-visible")})),$("#BergCookberg-accept").off("click").on("click",function(t){t.preventDefault(),t.stopPropagation(),$.cookie("BergCookberg","1",{expires:days,path:"/"}),e.removeClass("is-visible"),setTimeout(function(){e.css("display","none")},500)}),cookieChoices={})}),$("#back-top").each(function(){var e=$(this);$(window).on("scroll",function(){$(this).scrollTop()>=100?e.fadeIn(170):e.fadeOut(170),e.offset().top>=$("#footer-wrapper").offset().top-34?e.addClass("on-footer"):e.removeClass("on-footer")}),e.on("click",function(){$("html, body").animate({scrollTop:0},500)})})});
function getRandomInt(t,e){return Math.floor(Math.random()*(e-t+1))+t}function shuffleArray(t){var e,r,n=t.length;if(0===n)return!1;for(;--n;)e=Math.floor(Math.random()*(n+1)),r=t[n],t[n]=t[e],t[e]=r;return t}function JsBergRandomP(t){var e=getRandomInt(1,t.feed.openSearch$totalResults.$t-maxResults),r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="/feeds/posts/summary?alt=json-in-script&orderby=updated&start-index="+e+"&max-results="+maxResults+"&callback=SowBergRandomPosts",document.querySelector("body").appendChild(r)}function SowBergRandomPosts(t){for(var e,r=document.getElementById(containerId),n=shuffleArray(t.feed.entry),a="<ul>",o=0,s=n.length;s>o;o++){for(var l=0,d=n[o].link.length;d>l;l++)e="alternate"==n[o].link[l].rel?n[o].link[l].href:"#";a+='<li><a href="'+e+'">'+n[o].title.$t+"</a></li>"}r&&(r.innerHTML=a+"</ul>")}var maxResults=3,containerId="BergRandomP",t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="/feeds/posts/summary?alt=json-in-script&max-results=0&callback=JsBergRandomP",document.querySelector("body").appendChild(t);
