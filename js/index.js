
window.onload = function () {
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
//实现轮播的功能
	var list = document.getElementById('carousel-wrap');
	var prev = document.getElementById('btn-last');
    var next = document.getElementById('btn-next');
	var container = document.getElementById('carousel');
    var buttons = document.getElementById('carousel-click').getElementsByTagName('li');
    var index = 1;
    var timer;
    function animate(offset) {
                //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
    	var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        if (newLeft > 0) {
            list.style.left = -4000 + 'px';
        }
        if (newLeft < -4000) {
            list.style.left = 0 + 'px';
        }
    }
    function play() {
                 //重复执行的定时器
        timer = setInterval(function() {
        next.onclick();
    	}, 4000);
    }
    function stop() {
		clearInterval(timer);
	}
	function buttonsShow() {
                 //将之前的小圆点的样式清除
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }                               
        buttons[index - 1].className = 'on';//数组从0开始，故index需要-1
    }
    prev.onclick = function() {
   		if (index < 1) {
        	index = 5
        }else{
        	index -= 1;
        }
        buttonsShow();
        animate(1000);
    };
    next.onclick = function() {
                 //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断   
        if (index > 4) {                   
        	index = 1
        }else{
        	index += 1;
        }
        animate(-1000);
        buttonsShow();
    };
    for (var i = 0; i < buttons.length; i++) {
        (function(i) {
            buttons[i].onclick = function() {
                        /*   这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                         /*   由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 1000 * (index - clickIndex); //这个index是当前图片停留时的index
                animate(offset);
                index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
               	buttonsShow();
        	}
        })(i)
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();

    //悬浮图片，更换<img>src
    getID("carousel-one-left").onmouseover=function(){
        getID("carousel-one-img").src="images/carousel-one-one.webp";
    }
    getID("carousel-one-right").onmouseover=function(){
        getID("carousel-one-img").src="images/carousel-one-two.webp";
    }
    getID("carousel-one-left").onmouseout=function(){
        getID("carousel-one-img").src="images/carousel-one.webp";
    }
    getID("carousel-one-right").onmouseout=function(){
        getID("carousel-one-img").src="images/carousel-one.webp";
    }

    /*
    *悬浮出现图标，点击实现更换图片效果
    */
    var isHover=true;
    getID("section-top-img").onmouseover=function(){
        if(isHover){
            getID("icon-show").style.display="block";
        }
    }
    getID("section-top-img").onmouseout=function(){
        getID("icon-show").style.display="none";
        getID("icon-show").onmouseover=function(){
            getID("icon-show").style.display="block";
        }
        getID("icon-show").onmouseout=function(){
            getID("icon-show").style.display="none";
        }
    }
    getID("icon-show").onclick=function(){
        getID("section-top-img").src="images/section-top-hidden.webp";
        getID("section-top-img").style.height="568px";
        getID("icon-hidden").style.display="block";
        getID("icon-show").style.display="none";
        isHover=false;
    }
    getID("icon-hidden").onclick=function(){
        getID("section-top-img").src="images/section-top-img.webp";
        getID("icon-hidden").style.display="none";
        getID("section-top-img").style.height="130px";
        isHover=true;
    }

    /*
    *   登录效果
    */
    //悬浮二维码使其移动位置，出现扫一扫图片
    getID("login-qq-img").onmouseover=function(){
        getID("login-code").style.marginLeft="-140px";
        getID("login-scan").style.display="inline-block";
    }
    getID("login-qq-img").onmouseout=function(){
        getID("login-code").style.marginLeft="-61px";
        getID("login-scan").style.display="none";
    }
    //快速登录与账号登录转换
    getID("convert-count").onclick=function(){
        var content=getID("convert-count").innerHTML;
        if(content=="账号密码登录"){
            setBlock("login-qq-form");
            setNone("login-qq-img");
            getID("convert-count").innerHTML="忘记密码？";
            setNone("login-qq-quick");
            setBlock("login-qq-count");
        }
        if(content==="忘记密码？"){
            alert("暂时还未写此功能")
        }
    }
    getID("qq-phone").onclick=function(){
        alert("暂时还不支持QQ手机扫描！！！");
    }
    getID("qq-quick").onclick=function(){
        setNone("login-qq-form");
        setBlock("login-qq-img");
        getID("convert-count").innerHTML="账号密码登录";
        setBlock("login-qq-quick");
        setNone("login-qq-count");
    }

    //点击切换微信登录,0为QQ，1为微信
    getID("login-title").getElementsByTagName("li")[0].onclick=function(){
        setBlock("login-content-qq");
        setNone("login-content-wechat");
        getID("login-title").getElementsByTagName("li")[0].style.borderBottom="2px solid orange";
        getID("login-title").getElementsByTagName("li")[1].style.borderBottom="none";
        getID("login-title").getElementsByTagName("img")[0].src="images/qq-orange.png";
        getID("login-title").getElementsByTagName("img")[1].src="images/wechat-gray.png";
    }
    getID("login-title").getElementsByTagName("li")[1].onclick=function(){
        setNone("login-content-qq");
        setBlock("login-content-wechat");
        getID("login-title").getElementsByTagName("li")[0].style.borderBottom="none";
        getID("login-title").getElementsByTagName("li")[1].style.borderBottom="2px solid orange";
        getID("login-title").getElementsByTagName("img")[0].src="images/qq-gray.png";
        getID("login-title").getElementsByTagName("img")[1].src="images/wechat-orange.png";
    }
    //关闭登录界面
    getID("close").onclick=function(){
        setNone("login-wrap");
    }
    //打开登录界面
    getID("open-login").onclick=function(){
        setBlock("login-wrap");
    }

    /*
    *视频轮播
    */
    var vedioImg=new Array("images/vedio-one.jpg","images/vedio-two.jpg","images/vedio-three.jpg","images/vedio-four.jpg","images/vedio-five.jpg");
    var vedioTitle=new Array("中国式家长","秘奥法师","风暴之海","古剑奇谭3","星际战甲");
    var vedio=new Array("vedio/recommend-one.mp4","vedio/recommend-two.mp4","vedio/recommend-three.mp4","vedio/recommend-four.mp4","vedio/recommend-five.mp4");
    var number=new Array(0,1,2,3,4); 
    getID("next-vedio").onclick=function(){
        for (var i = 0; i < number.length; i++) {
            number[i]++;
            if (number[i]==number.length) {
                number[i]=0;
            }
        }
        //更换视频的类型
        if (number[0]%2==0) {
            getID("recommend-bottem-type").innerHTML="猜你喜欢";
        }else{
            getID("recommend-bottem-type").innerHTML="编辑精选";
        }
        //更换当前视频
        getID("vedio").src=vedio[number[0]];
        //更换当前视频的预加载图片
        getID("vedio").poster=vedioImg[number[0]];
        //更换当前视频的标题
        getID("recommend-bottem-title").innerHTML=vedioTitle[number[0]];
        //更新vedio-two的图片
        getID("vedio-img-two").src=vedioImg[number[1]];
        //更新vedio-three的图片
        getID("vedio-img-three").src=vedioImg[number[2]];
        //更新vedio-four的图片
        getID("vedio-img-four").src=vedioImg[number[3]];
        //更新vedio-five的图片
        getID("vedio-img-five").src=vedioImg[number[4]];  
    }

}
//搜索排行榜的获取焦点及失去焦点事件
    function show(){
        setBlock("search-rank");
		getID("input-search").style.color="#000"
	}
	function hide(){
        setNone("search-rank");
		if(getID("input-search").value=""){
			getID("input-search").value="隐形守护者";
			getID("input-search").style.color="#ccc";
		}
	}
	function textClear(){
		if(getID("input-search").value!="隐形守护者"){
			getID("input-search").focus();
			getID("input-search").value="";
		}
	}

    /*
    *登录的正则验证
    */
    //账号的正则验证
    function checkCount(){
        var qqRegex=/^[1-9]\d{4,8}$/;
        var emailRegex=/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
        var phoneRegex=/^[1][3,4,5,7,8][0-9]{9}$/;
        var count=document.getElementById("login-count").value;
        if (qqRegex.test(count)) {
            getID("login-hint").innerHTML="";
            getID("login-count").style.border="1px solid #a0a0a0";
            return true;
        }else{    
            getID("login-count").style.border="1px solid red";
            getID("login-hint").innerHTML="账号格式出错！！！";
            return false; 
        }
    }
    //密码的正则验证(6-16位的字母、数字、下划线)
    function checkPsass(){
        var passRegex=/^(\w){6,16}$/;
        var pass=getID("login-password").value;
        if(passRegex.test(pass)){
            getID("login-hint").innerHTML="";
            getID("login-password").style.border="1px solid #a0a0a0";
            return true; 
        }else{  
            getID("login-hint").innerHTML="密码格式出错！！！";
            getID("login-password").style.border="1px solid red"; 
            return false; 
        }
    }
    //表单登录验证
    function checkSubmit(){
        if (checkCount()&&checkPsass()) {
            getID("login-hint").innerHTML="";
            return true;
        }else{
            getID("login-hint").innerHTML="账号或者密码不正确！！！";
            getID("login-password").value="";//登录失败清空密码
            return false;
        }
    }






