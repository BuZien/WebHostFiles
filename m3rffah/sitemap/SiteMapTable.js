// global arrays

   var postTitle = new Array();     // array of posttitles
   var postUrl = new Array();       // array of posturls
   var postDate = new Array();      // array of post publish dates
   var postSum = new Array();       // array of post summaries
   var postLabels = new Array();    // array of post labels

// global variables
   var sortBy = "datenewest";         // default value for sorting SiteMapTable
   var SiteMapTableLoaded = false;           // true if feed is read and SiteMapTable can be displayed
   var numChars = 250;              // number of characters in post summary
   var postFilter = '';             // default filter value
   var SiteMapTablediv = document.getElementById("SiteMap"); //the SiteMapTable container
   var totalEntires =0; //Entries grabbed till now
   var totalPosts =0; //Total number of posts in the blog.

// main callback function

function loadSiteMapTable(json) {

   function getPostData() {
   // this functions reads all postdata from the json-feed and stores it in arrays
      if ("entry" in json.feed) {
         var numEntries = json.feed.entry.length;
         totalEntires = totalEntires + numEntries;
         totalPosts=json.feed.openSearch$totalResults.$t
         if(totalPosts>totalEntires)
         {
         var nextjsoncall = document.createElement('script');
         nextjsoncall.type = 'text/javascript';
         startindex=totalEntires+1;
         nextjsoncall.setAttribute("src", "/feeds/posts/summary?start-index=" + startindex + "&max-results=500&alt=json-in-script&callback=loadSiteMapTable");
         SiteMapTablediv.appendChild(nextjsoncall);
         }
      // main loop gets all the entries from the feed
         for (var i = 0; i < numEntries; i++) {
         // get the entry from the feed
            var entry = json.feed.entry[i];

         // get the posttitle from the entry
            var posttitle = entry.title.$t;

         // get the post date from the entry
            var postdate = entry.published.$t.substring(0,10);

         // get the post url from the entry
            var posturl;
            for (var k = 0; k < entry.link.length; k++) {
               if (entry.link[k].rel == 'alternate') {
               posturl = entry.link[k].href;
               break;
               }
            }

         // get the post contents from the entry
         // strip all html-characters, and reduce it to a summary
            if ("content" in entry) {
               var postcontent = entry.content.$t;}
            else
               if ("summary" in entry) {
                  var postcontent = entry.summary.$t;}
               else var postcontent = "";
         // strip off all html-tags
            var re = /<\S[^>]*>/g; 
            postcontent = postcontent.replace(re, "");
         // reduce postcontent to numchar characters, and then cut it off at the last whole word
            if (postcontent.length > numChars) {
               postcontent = postcontent.substring(0,numChars);
               var quoteEnd = postcontent.lastIndexOf(" ");
               postcontent = postcontent.substring(0,quoteEnd) + '...';
            }

         // get the post labels from the entry
            var pll = '';
            if ("category" in entry) {
               for (var k = 0; k < entry.category.length; k++) {
                  pll += '<a href="javascript:filterPosts(\'' + entry.category[k].term + '\');" title="انقر هنا لتحديد جميع المواضيع ذات التسمية \'' + entry.category[k].term + '\'">' + entry.category[k].term + '</a>,  ';
               }
            var l = pll.lastIndexOf(',');
            if (l != -1) { pll = pll.substring(0,l); }
            }

         // add the post data to the arrays
            postTitle.push(posttitle);
            postDate.push(postdate);
            postUrl.push(posturl);
            postSum.push(postcontent);
            postLabels.push(pll);
         }
      }
      if(totalEntires==totalPosts) {SiteMapTableLoaded=true;showSiteMapTable();}
   } // end of getPostData

// start of showSiteMapTable function body
// get the number of entries that are in the feed
//   numEntries = json.feed.entry.length;

// get the postdata from the feed
   getPostData();

// sort the arrays
   sortPosts(sortBy);
   SiteMapTableLoaded = true;
}



// filter and sort functions


function filterPosts(filter) {
// This function changes the filter
// and displays the filtered list of posts
  // document.getElementById("SiteMap").scrollTop = document.getElementById("SiteMap").offsetTop;;
   postFilter = filter;
   displaySiteMapTable(postFilter);
} // end filterPosts

function allPosts() {
// This function resets the filter
// and displays all posts

   postFilter = '';
   displaySiteMapTable(postFilter);
} // end allPosts

function sortPosts(sortBy) {
// This function is a simple bubble-sort routine
// that sorts the posts

   function swapPosts(x,y) {
   // Swaps 2 SiteMapTable-entries by swapping all array-elements
      var temp = postTitle[x];
      postTitle[x] = postTitle[y];
      postTitle[y] = temp;
      var temp = postDate[x];
      postDate[x] = postDate[y];
      postDate[y] = temp;
      var temp = postUrl[x];
      postUrl[x] = postUrl[y];
      postUrl[y] = temp;
      var temp = postSum[x];
      postSum[x] = postSum[y];
      postSum[y] = temp;
      var temp = postLabels[x];
      postLabels[x] = postLabels[y];
      postLabels[y] = temp;
   } // end swapPosts

   for (var i=0; i < postTitle.length-1; i++) {
      for (var j=i+1; j<postTitle.length; j++) {
         if (sortBy == "titleasc") { if (postTitle[i] > postTitle[j]) { swapPosts(i,j); } }
         if (sortBy == "titledesc") { if (postTitle[i] < postTitle[j]) { swapPosts(i,j); } }
         if (sortBy == "dateoldest") { if (postDate[i] > postDate[j]) { swapPosts(i,j); } }
         if (sortBy == "datenewest") { if (postDate[i] < postDate[j]) { swapPosts(i,j); } }
      }
   }
} // end sortPosts

// displaying the SiteMapTable

function displaySiteMapTable(filter) {
// this function creates a three-column table and adds it to the screen
   var numDisplayed = 0;
   var SiteMapTableTable = '';
   var SiteMapTableHead1 = 'عنوان الموضوع';
   var SiteMapTableTool1 = 'إضغط للترتيب ابجدياً';
   var SiteMapTableHead2 = 'النشر';
   var SiteMapTableTool2 = 'إضغط للترتيب حسب تاريخ النشر';
   var SiteMapTableHead3 = 'التسميات';
   var SiteMapTableTool3 = '';
   if (sortBy == "titleasc") { 
      SiteMapTableTool1 += ' (تنازلي)';
      SiteMapTableTool2 += ' (الأحدث أولاً)';
   }
   if (sortBy == "titledesc") { 
      SiteMapTableTool1 += ' (تصاعدي)';
      SiteMapTableTool2 += ' (الأحدث أولاً)';
   }
   if (sortBy == "dateoldest") { 
      SiteMapTableTool1 += ' (تصاعدي)';
      SiteMapTableTool2 += ' (الأحدث أولاً)';
   }
   if (sortBy == "datenewest") { 
      SiteMapTableTool1 += ' (تصاعدي)';
      SiteMapTableTool2 += ' (الأقدم أولا)';
   }
   if (postFilter != '') {
      SiteMapTableTool3 = 'انقر لإظهار جميع المشاركات';
   }
   SiteMapTableTable += '<table>';
   SiteMapTableTable += '<tr>';
   SiteMapTableTable += '<td class="SiteMapTable-header-col1">';
   SiteMapTableTable += '<a href="javascript:toggleTitleSort();" title="' + SiteMapTableTool1 + '">' + SiteMapTableHead1 + '</a>';
   SiteMapTableTable += '</td>';
   SiteMapTableTable += '<td class="SiteMapTable-header-col2">';
   SiteMapTableTable += '<a href="javascript:toggleDateSort();" title="' + SiteMapTableTool2 + '">' + SiteMapTableHead2 + '</a>';
   SiteMapTableTable += '</td>';
   SiteMapTableTable += '<td class="SiteMapTable-header-col3">';
   SiteMapTableTable += '<a href="javascript:allPosts();" title="' + SiteMapTableTool3 + '">' + SiteMapTableHead3 + '</a>';
   SiteMapTableTable += '</td>';
   SiteMapTableTable += '</tr>';
   for (var i = 0; i < postTitle.length; i++) {
      if (filter == '') {
         SiteMapTableTable += '<tr><td class="SiteMapTable-entry-col1"><a href="' + postUrl[i] + '" title="' + postSum[i] + '">' + postTitle[i] + '</a></td><td class="SiteMapTable-entry-col2">' + postDate[i] + '</td><td class="SiteMapTable-entry-col3">' + postLabels[i] + '</td></tr>';
         numDisplayed++;
      } else {
          z = postLabels[i].lastIndexOf(filter);
          if ( z!= -1) {
             SiteMapTableTable += '<tr><td class="SiteMapTable-entry-col1"><a href="' + postUrl[i] + '" title="' + postSum[i] + '">' + postTitle[i] + '</a></td><td class="SiteMapTable-entry-col2">' + postDate[i] + '</td><td class="SiteMapTable-entry-col3">' + postLabels[i] + '</td></tr>';
             numDisplayed++;
          }
        }
   }
   SiteMapTableTable += '</table>';
   if (numDisplayed == postTitle.length) {
      var SiteMapTableNote = '<span class="SiteMapTable-note">عرض كافة المواضيع وعددها ' + postTitle.length + ' موضوع<br/></span>'; }
   else {
      var SiteMapTableNote = '<span class="SiteMapTable-note">عرض ' + numDisplayed + ' مواضيع من قسم \'';
      SiteMapTableNote += postFilter + '\' من إجمالي '+ postTitle.length + ' موضوع<br/></span>';
   }
   SiteMapTablediv.innerHTML = SiteMapTableNote + SiteMapTableTable;
} // end of displaySiteMapTable

function toggleTitleSort() {
   if (sortBy == "titleasc") { sortBy = "titledesc"; }
   else { sortBy = "titleasc"; }
   sortPosts(sortBy);
   displaySiteMapTable(postFilter);
} // end toggleTitleSort

function toggleDateSort() {
   if (sortBy == "datenewest") { sortBy = "dateoldest"; }
   else { sortBy = "datenewest"; }
   sortPosts(sortBy);
   displaySiteMapTable(postFilter);
}


function showSiteMapTable() {
  if (SiteMapTableLoaded) { 
     displaySiteMapTable(postFilter);
     var SiteMapTablelink = document.getElementById("SiteMapTablelink");
   
  }
  else { alert("يرجي الإنتظار ..."); }
}

function hideSiteMapTable() {
  var SiteMapTablediv = document.getElementById("SiteMapTable");
  SiteMapTablediv.innerHTML = '';
  var SiteMapTablelink = document.getElementById("SiteMapTablelink");
  SiteMapTablelink.innerHTML = '<a href="#" onclick="scroll(0,0); showSiteMapTable(); Effect.toggle('+"'SiteMapTable-result','blind');"+'">» Show Table of Contents</a> <img src="http://chenkaie.blog.googlepages.com/new_1.gif"/>';
}
