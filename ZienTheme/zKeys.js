var idBlog= "1195570710948772705";
var idPage= "5327479516839462864";
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
