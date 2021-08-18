
window.onload = function () {
	// var nav = document.getElementById("navi");
	// var links = nav.getElementsByTagName("li");
	// var lilen = nav.getElementsByTagName("a");
	// var currenturl = document.location.href;
	// // for (var i = 0; i < links.length; i++) {
	// 	links.onclick=function(){
	// 		alert(1);
	// 	}
	// // }
	//导航栏高亮
	var nav =  document.getElementById("navi");
    var links = nav.getElementsByTagName("li");
    var lilen = nav.getElementsByTagName("a");
    var currenturl = document.location.href;
    var last = 0;
    for (var i=0;i<links.length;i++)
    {
       var linkurl =  lilen[i].getAttribute("href");
         if(currenturl.indexOf(linkurl)!=-1)
            {
             last = i;
            }
    }
    links[last].className = "hl";
}