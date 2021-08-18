
window.onload = function (){
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
	//给漫画人物的滑轮事件  添加监听
	addEventHandler(getID("store"),'mousewheel',cartoonWheel);
	//超出部分  移除监听

	// removeEventHandler(getID("store"),'mousewheel',cartoonWheel);
	// removeEventHandler(getID("serve"),'mousewheel',cartoonWheel);

	/*
	*	不允许随意拖动网站
	*/
	var sideImg=document.getElementsByTagName('img');
	for (var i = 0; i < sideImg.length; i++) {
		sideImg[i].ondragstart=function(){
			alert("本网站不允许图片随意拖动");
		}
	}
	flipTimer1=setInterval(flip1,2500);
	flipTimer2=setInterval(flip2,2000);
	flipTimer3=setInterval(flip3,3000);

	//雪花效果
	var snowflake;
	time_createThing=setInterval(function(){
		snowflake=new thingFloat("../images/client-side/snowflake.png");
		snowflake.createThing();
		thing_array.push(snowflake);
	},1000);
	time_thingMove=setInterval(function(){
		if (thing_array.length>0) {
			for(var key in thing_array){
				thing_array[key].thingMove(key,thing_array);
			}			
		}
	},50);
}

/*
*	复制、剪切事件——不允许文本复制剪切
*/
function notCopy(){
	var isVip=prompt("页面默认不能复制粘贴，请验证VIP账户","");
	if(isVip=="123"){
		return true;
	}
	return false;
}

/*
*	漫画人物的滑轮事件
*/
function cartoonWheel(){
	setBlock("wheel-action-cartoon");
}

//页面底部的动画效果
var flipTimer1;
function flip1(){
	var flipUp1=getID("developer-up1");
	var distance=0;
	var flipUp1Top=parseInt(flipUp1.style.top);
	var flipSpeed1=setInterval(function(){
		flipUp1Top++;
		distance++;
		flipUp1.style.top=flipUp1Top+'px';	
		if (distance==6) {
			clearInterval(flipSpeed1);
			flipUp1.style.top="268px";
			var flipSpeed2=setInterval(function(){
				flipUp1Top--;
				distance--;
				flipUp1.style.top=flipUp1Top+'px';	
				if (distance==3) {
					clearInterval(flipSpeed2);
					flipUp1.style.top="260px";
				}
			},120);
		}
	},120);
	
}

var flipTimer2;
function flip2(){
	var flipUp1=getID("developer-up2");
	var distance=0;
	var flipUp1Top=parseInt(flipUp1.style.top);
	var flipSpeed1=setInterval(function(){
		flipUp1Top++;
		distance++;
		flipUp1.style.top=flipUp1Top+'px';	
		if (distance==6) {
			clearInterval(flipSpeed1);
			flipUp1.style.top="248px";
			var flipSpeed2=setInterval(function(){
				flipUp1Top--;
				distance--;
				flipUp1.style.top=flipUp1Top+'px';	
				if (distance==3) {
					clearInterval(flipSpeed2);
					flipUp1.style.top="240px";
				}
			},100);
		}
	},100);
	
}

var flipTimer3;
function flip3(){
	var flipUp1=getID("developer-up3");
	var distance=0;
	var flipUp1Top=parseInt(flipUp1.style.top);
	var flipSpeed1=setInterval(function(){
		flipUp1Top++;
		distance++;
		flipUp1.style.top=flipUp1Top+'px';	
		if (distance==6) {
			clearInterval(flipSpeed1);
			flipUp1.style.top="473px";
			var flipSpeed2=setInterval(function(){
				flipUp1Top--;
				distance--;
				flipUp1.style.top=flipUp1Top+'px';	
				if (distance==3) {
					clearInterval(flipSpeed2);
					flipUp1.style.top="465px";
				}
			},200);
		}
	},200);
	
}

/**
*	雪花飘落效果
*/
var thing_array=[];
var time_createThing,time_thingMove;
var mathIndex=0;
function thingFloat(src){
	this.width=20;
	this.height=20;
	this.x=Math.random()*document.documentElement.clientWidth;
	this.y=document.documentElement.scrollTop || document.body.scrollTop;
	this.speed=1;
	this.src=src;
	this.thing;
	this.createThing=function(){
		this.thing=document.createElement("img");
        this.thing.style.width=this.width+"px";
        this.thing.style.height=this.height+"px";
        this.thing.style.position="absolute";
        this.thing.style.zIndex=1;
        this.thing.src=this.src;
        this.thing.style.left=this.x+'px';
        this.thing.style.top=this.y+'px';
        document.getElementsByTagName('section')[0].appendChild(this.thing);
	}
	this.thingMove=function(index,array){
		mathIndex++;
		this.y+=this.speed;
		if (mathIndex<2500) {
			this.x+=this.speed;
		}else if(mathIndex<10000){
			this.x-=this.speed;
		}else{
			mathIndex=0;
		}
		if (this.y>document.body.scrollHeight||this.x>document.body.scrollWidth||this.x<0) {
			this.thing.remove();
			array.splice(index,1);
		}
		this.thing.style.left=this.x+'px';
        this.thing.style.top=this.y+'px';
	}
}










