
	function aaa(){
		alert("aaa");
	}
window.onload=function(){
	//调用事件监听
	addEventHandler(getID("register-left"),'click',aaa);
	/*
	*注册界面的图片轮换
	*/
	var registerImgIndex=0;
	var registerImg=new Array("one","two","three");	
	function changeImg(){		
		getID("register-left").style.backgroundImage="url(../images/register/register-left-"+registerImg[registerImgIndex]+".jpg)";
	}
	setInterval(function() {
		registerImgIndex++;
		if (registerImgIndex>=registerImg.length) {
			registerImgIndex=0;
		}
        changeImg();
    }, 3000);

    /*
    * 手机号输入的焦点事件
    */
	getID("register-phone").onfocus=function(){
		setBlock("prove");
	}
	getID("register-phone").onblur=function(){
		setNone("prove");
	}

	/*
	*	注册的表单验证
	*/
		getID("register-nickname").onblur=function(){
			//验证昵称
			if(checkRegex(getID("register-nickname").value,nickNameRegex)){
				getID("register-nickname").style.border="1px solid #aaa";
				setNone("register-nickname-mistake");
			}else{
				setBlock("register-nickname-mistake");
			getID("register-nickname").style.border="1px solid red";
			}
		}
		getID("register-password").onblur=function(){
			//验证密码
			if(checkRegex(getID("register-password").value,passRegex)){
				setNone("register-password-mistake");
            	getID("register-password").style.border="1px solid #aaa";
			}else{
				setBlock("register-password-mistake");
            	getID("register-password").style.border="1px solid red"; 
			}
		}
		getID("register-phone").onblur=function(){
			//验证手机号
			if(checkRegex(getID("register-phone").value,phoneRegex)){
				getID("register-pnone-remind").innerHTML="可通过该手机号找回密码";
				getID("register-pnone-remind").style.color="#999";
				getID("register-phone").style.border="1px solid #aaa";
			}else{
				getID("register-pnone-remind").innerHTML="手机号格式错误";
				getID("register-pnone-remind").style.color="red";
				getID("register-phone").style.border="1px solid red";

			}
			
		}
	/*
	*	利用事件监听执行短信验证倒计时60秒的点击事件
	*/
		addEventHandler(getID("send-prove"),'click',messageProveTimer);
		
		/*
	* 判断是否同意注册服务条款
	*/
	var agreeIndex=0;
	var isAgree=false;
	getID("clause-img").onclick=function(){
		agreeIndex++;
		if(agreeIndex%2!=0){
			getID("clause-img").src="../images/register/clause-yes.png";
			setNone("clause-remind");
			isAgree=true;
		}else{
			getID("clause-img").src="../images/register/clause-no.png";
			setBlock("clause-remind");
			isAgree=false;
		}
	}

		//表单提交
	 	var isSubmit;//判断表单是否提交的成功的布尔值
		getID("register-form").onsubmit=function(){
			var isCorrect=checkRegex(getID("register-nickname").value,nickNameRegex)&&checkRegex(getID("register-password").value,passRegex)&&checkRegex(getID("register-phone").value,phoneRegex);
			var empty=getClass("submit-empty");
			if (isCorrect&&isAgree) {
				setNone("clause-remind");
				isSubmit=true;
				document.forms[0].target="rfFrame";//阻止表单提交刷新本页面
				//清空页面信息
				for (var i = 0; i < empty.length; i++) {
					empty[i].value="";
				}
				//清空同意的隐私协议
				agreeIndex=0;
				getID("clause-img").src="../images/register/clause-no.png";
				//成功登录，随机生成10位以3开头的QQ账号
				getID("qq-count").innerHTML=produceCode();
				//注册界面消失，出现新账号界面
				setNone("register-content-wrap");
				setBlock("new-qq");
				return true;
			}else if(isAgree==false||isCorrect==false) {
				if(isAgree==false){
					setBlock("clause-remind");
				}
				return false;
			}
		}
		/*
		*	点击图片有机会，更换一次账号的机会
		*/
		addEventHandler(getID("save-qq"),'click',changeCount);
		
		/*
		*	点击“立即登录”按钮跳转页面
		*/
		getID("new-qq-login").onclick=function(){
			if (confirm("进入登录页面前，请您记自己注册的账号！！！ \n 你确定要进入登录页面吗")) {
				window.location.href="../index.html";
			}
		}
					
}
/*
*	短信验证60秒倒计时效果
*/
	var wait=10;
	var isMessageProve=true;
	function messageProveTimer(){
		 if (wait == 0) {
            getID("send-prove").value="免费获取验证码";
            getID("send-prove").style.backgroundImage="linear-gradient(0deg,#398bff,#3083ff)";
            wait = 10;
            isMessageProve=true;
        }else{
        	isMessageProve=false;
        	getID("send-prove").value="重新发送(" + wait + ")";
        	getID("send-prove").style.backgroundImage="linear-gradient(0deg,#d0d0d0,#707070)";
        	wait--;
            setTimeout(function() {
                messageProveTimer();
            }, 1000)
        }
        if(isMessageProve){
			addEventHandler(getID("send-prove"),'click',messageProveTimer);
		}else{
			removeEventHandler(getID("send-prove"),'click',messageProveTimer);
		}
        return isMessageProve;
	}

/*
*	登录成功后随机加载10位以3开头的QQ
*/
	//生成账号
	function produceCode(){
		var digit=9;
		var result="3";
		for (var i = 0; i < digit; i++) {
			result=result+(parseInt(Math.random()*10)).toString();
		}
		return result;
	}

/*
*	点击图片更换图片，只有一次机会
*/
	function changeCount(){
		getID("qq-count").innerHTML=produceCode();
		getID("save-qq").title="账号正能更换一次，不可更换";
		removeEventHandler(getID("save-qq"),'click',changeCount);
	}