
/*导航栏 “万物有灵特效”*/
$(document).ready(function(){
	function changeOp(){
		$('#nav-right-btn').animate({opacity:'1'},"slow");
	}
	$("#nav-right-btn").hover(function(){
		$('#nav-right-btn').animate({opacity:'0.7'},"slow",changeOp);
		$('#nav-right-btn').css("animation","elastic 0.8s 0s");
	},function(){
		$('#nav-right-btn').css("animation","");
	});
});

/*选项卡*/
$(function () {
	$('#myTab a').hover(function () {
        $(this).tab('show');
    });
	$('#myTab>li').hover(function () {
        $('#myTab>li').removeClass('cha');
      	$(this).addClass('cha');
    });
	$('#myTab li:eq(0) a').tab('show');
});

/*妖灵图标的栅格系统*/
$(document).ready(function(){
	$('#handbook-content ul').addClass("row");
	$('#handbook-content li').addClass("col-md-2");
	$('#handbook-content img').addClass("circle grid-img");
	$('#handbook-content p').addClass("grid-p");

});

/**
*	妖灵类型的方法
*/
$(document).ready(function(){
	/*妖灵类型的存储*/
	var jsonDemonType={
		"demonTypeList":["上古三门","最初的伙伴","四海志","四海志传奇","古怪集","古怪集传奇","青丘录","神武道","英雄会"]
	};
	saveJsonLocal("demonTypeList",jsonDemonType);
	//初始化的时候将妖灵类型存储到后台，然后放进下拉框中
	var jsonTypeStr=readJsonLocal("demonTypeList").demonTypeList;
	for (var i = 0; i < jsonTypeStr.length; i++) {
		if(jsonTypeStr[i]!=null){
			var newDemonType="<option value="+jsonTypeStr[i]+">"+jsonTypeStr[i]+"</option>";
	           $("#demon-type-select").append(newDemonType);
	           var newDemonTypeLi="<li>"+jsonTypeStr[i]+"</li>";
	           $("#handbook-nav-ul").append(newDemonTypeLi);
		}
	}
});

/**
*	  妖灵信息的方法
*/
$(document).ready(function(){
	var demonRows=$("#handbook-content").children("ul").length;
	var demonLastRow=$("#handbook-content>ul").eq(length-1);
	var denmonLastColumns=demonLastRow.children("li").length;
	/*创建妖灵姓名、妖灵图标的前台HTML节点的方法*/
	function createDemon(demonName,way){
		var isQueryDemon=false;
        var demonRows=$("#handbook-content").children("ul").length;
        var demonLastRow;
        var denmonLastColumns;
        var isQueryDemon=false,isNull=true;
        var demonList = readJsonLocal("demonList");
        for (var i in demonList) {
        	demonLastRow=$("#handbook-content>ul").eq(demonRows-1);
			denmonLastColumns=demonLastRow.children("li").length;
        	if (demonList[i]!=null&&demonList[i].name!=null) {
	            if (demonList[i][way] == demonName ||way=="初始化") {
	            	isQueryDemon=true;//表明存在妖灵
	            	//移除页面所有(妖灵节点)
	            	if (isNull) {
		            	$("#handbook-content").children("ul").remove();
	            		demonRows=0;
	          			isNull=false;
	            	}
	            	//在前页面创建节点
	            	if (demonRows==0 || denmonLastColumns==undefined) {
	            		var newDemon="<ul class=\"row\"><li class=\"col-md-2\"><img src="+demonList[i].icon+" class=\"circle grid-img\"><p class=\"grid-p\">"+demonList[i].name+"</p></li></ul>";
						$("#handbook-content").append(newDemon);
						demonRows++;
	            	}
	                if (denmonLastColumns<6){
		            	var newDemon="<li class=\"col-md-2\"><img src="+demonList[i].icon+" class=\"circle grid-img\"><p class=\"grid-p\">"+demonList[i].name+"</p></li>";
		            	demonLastRow.append(newDemon);
		            }else if (denmonLastColumns>=6){
						var newDemon="<ul class=\"row\"><li class=\"col-md-2\"><img src="+demonList[i].icon+" class=\"circle grid-img\"><p class=\"grid-p\">"+demonList[i].name+"</p></li></ul>";
						demonLastRow.after(newDemon);
						demonRows++;
		            }
	            }
        	}
        }
        return isQueryDemon;
	}
	
	/*添加妖灵*/
	function addDemon(demonName,demonType,demonIcon,demonIntro){
		var demonLocal=getLocal("demonList");
		if (demonLocal == null || demonLocal == "") {
            //第一次加入妖灵
        	var jsonDemon = [{"name":demonName,"type":demonType,"icon":demonIcon,"intro":demonIntro}];
            saveJsonLocal("demonList",jsonDemon);
        }else{
        	//不是第一次加入
			var demonList = readJsonLocal("demonList");
            var result = false;
            //查找本地缓存是否有预添加妖灵
            for (var i in demonList) {
                if (demonList[i].name == demonName) {
                    result = true;
                    break;//如果存在直接跳出循环
                }
            }
            if(!result){
	            demonList.push({"name":demonName,"type":demonType,"icon":demonIcon,"intro":demonIntro});
	            saveJsonLocal("demonList",demonList);
	            alert("本地存储成功");
            }else{
            	alert("此妖灵已经存在，添加失败");
            }
        }
        showDemon();
	}

	/*删除妖灵*/
	function deleteDemon(demonName){
		var demonList = readJsonLocal("demonList");
        for (var i in demonList) {
        	if (demonList[i]!=null&&demonList[i].name!=null) {
	            if (demonList[i].name == demonName) {
	                demonList.splice(i,1);//删除指定索引值中的数组元素
	            }
        	}
        }
        saveJsonLocal("demonList",demonList);
        showDemon();
	}
	/*修改指定妖灵的信息*/
	function alterDemon(alterDemonName,demonName,demonType,demonIcon,demonIntro){
		var demonList = readJsonLocal("demonList");
        for (var i in demonList) {
        	if (demonList[i]!=null&&demonList[i].name!=null) {
	            if (demonList[i].name == alterDemonName) {
	                demonList[i].name=demonName;
	                demonList[i].type=demonType;
	                demonList[i].icon=demonIcon;
	                demonList[i].intro=demonIntro;
	            }
        	}
        }
        saveJsonLocal("demonList",demonList);
        // showDemon();
	}

	/*查询妖灵信息(按照名字查询)*/
	function queryDemon(queryDemonName,name){
		if ($("#search-demon-input").val()=="") {
			alert("查询的妖灵不能为空！！！");
			return;
		}
        if (!createDemon(queryDemonName,name)) {
        	alert("您所查询的妖灵不存在！！！请重新查询");
        }
	}
	//点击"搜索"执行的事件（妖灵名字查询）
	$("#search-demon-click").click(function(){
		queryDemon($("#search-demon-input").val(),"name");
		$("#search-demon-input").val("");
	});

	/*查询妖灵信息(按照类型查询)*/
	function queryDemonType(queryDemonTypeName,type){
        if (!createDemon(queryDemonTypeName,type)) {
        	alert("您所查询的妖灵类型暂时没有妖灵，我们后续将持续进行更新");
        }
	}
	//点击妖灵类型执行的方法
	$("#handbook-nav-ul>li").css("cursor","pointer");
	$("#handbook-nav-ul").on('click','li',function(){
		var demonTypeName=$(this).text();
		if (demonTypeName=="全部") {
			$("#handbook-content>ul").remove();
			showDemon();
		}else{
			queryDemonType(demonTypeName,"type");
		}
	});

	/*封装前台页面呈现本地数据的方法*/
	//从本地存储取出数据放进栅格系统、初始化、查询全部妖灵的方法
	function showDemon(){
		var jsonDemon  = readJsonLocal("demonList");
		if (jsonDemon ==undefined || jsonDemon==null) {
			return;
		}
        createDemon("","初始化");   
	}

	/*页面加载完毕后，从本地取出数据，显示在前台界面*/
	showDemon();//调用读取全部本地文件并显示前台的方法

	
 	/*妖灵图标路径*/
 	var demonFileIcon;
 	//input file选中文件改变执行的方法
	$("#demon-icon").change(function(){
	    var file = this.files[0];
	    demonFileIcon="../images/demon/"+file.name; //获取相对路径
	    $("#demon-icon-url").val(demonFileIcon);  //将相对路径set进文本框中
	});

	/*模态框的方法*/
	//设置模态框的基本属性
	$("#add-demon-modal").modal({
		show:false,
		backdrop:false
	});
	//点击弹出模态框
	$("#add-new-demon").click(function(){
		$("#add-demon-modal").modal("show");
		$("#save-message-btn").text("添加妖灵");	//改变模态框按钮文字（变相改变按钮的功能）
	});
	//点击关闭模态框
	$("#close-modal").click(function(){
		$("#add-demon-modal").modal("hide");
	});
	//模态框关闭之后，清空其中的数据
	$("#add-demon-modal").on('hidden.bs.modal',function(){
		$("#demon-name-input").val("");
		$("#demon-icon-url").val("");
		$("#demon-icon-input").val("");
		$("#demon-intro").val("")
		demonFileIcon=null;	//关闭后将图标路径设置成空
	});
	
	//点击妖灵弹出模态框
	var name,type,icon,intro,demonName;
	$('#handbook-content').on('click','li',function(){
		demonName=$(this).text();
		$("#demon-message-modal").modal("show");
		for (var i = 0; i < readJsonLocal("demonList").length; i++) {
			if (readJsonLocal("demonList")[i].name==$(this).text()) {
				name=readJsonLocal("demonList")[i].name;
				type=readJsonLocal("demonList")[i].type;
				icon=readJsonLocal("demonList")[i].icon;
				intro=readJsonLocal("demonList")[i].intro;
				$("#demon-name-h3").text(name);
				$("#demon-type-h6").text(type);
				$("#demon-message-intro").text(intro);
				$("#demon-message-img").attr("src",icon);
			}
			//点击妖灵修改按钮
			$("#alter-demon-btn").click(function(){
				$("#demon-message-modal").modal("hide");//关闭当前妖灵窗口
				$("#add-demon-modal").modal("show");
				$("#save-message-btn").text("修改妖灵");//改变模态框按钮的值
			//将值放进模态框中
				$("#demon-name-input").val(name);
				$('#demon-type-select').val(type);//设置下拉菜单的选中值
				$("#demon-icon-url").val(icon);
				$("#demon-intro").val(intro);
			});
		}
		
	});
	//模态框中点击“确定”按钮 执行的操作
	$("#save-message-btn").click(function(){
		if ($("#save-message-btn").text()=="添加妖灵") {
			//给模态框输入框添加正则验证
			if(checkRegex($("#demon-name-input").val(),chineseRegex)){

				if ($("#demon-name-input").val()!=null&&$('#demon-type-select option:selected').val()!=null&&$("#demon-intro").val()!=null&&$("#demon-intro").val()!="") {
					if(demonFileIcon==null&&$("#demon-icon-url").val()!=null){
						demonFileIcon=$("#demon-icon-url").val();
					}else if(demonFileIcon==null||$("#demon-icon-url").val()==null){
						alert("请选择妖灵图标");
						return;
					}
					addDemon($("#demon-name-input").val(),$('#demon-type-select option:selected').val(),demonFileIcon,$("#demon-intro").val());
					
					$("#add-demon-modal").modal("hide");//保存成功，关闭模态框
				}else{
					alert("输入内容不能为空");
				}
			}else{
				alert("您输入的格式不符合规范");
			}
		}
		//修改妖灵信息
		else if ($("#save-message-btn").text()=="修改妖灵") {
			if(checkRegex($("#demon-name-input").val(),chineseRegex)){
				if ($("#demon-name-input").val()!=null&&$('#demon-type-select option:selected').val()!=null&&$("#demon-intro").val()!=null&&$("#demon-intro").val()!="") {
					if(demonFileIcon==null&&$("#demon-icon-url").val()!=null){
						demonFileIcon=$("#demon-icon-url").val();
					}else if(demonFileIcon==null||$("#demon-icon-url").val()==null){
						alert("请选择妖灵图标");
						return;
					}
					if($("#demon-name-input").val()==name&&$('#demon-type-select option:selected').val()==type&&demonFileIcon==icon&&$("#demon-intro").val()==intro){
						alert("您未进行修改");
					}else{
						alterDemon(demonName,$("#demon-name-input").val(),$('#demon-type-select option:selected').val(),demonFileIcon,$("#demon-intro").val());
						if(demonName!=$("#demon-name-input").val()||icon!=demonFileIcon){
							$("#handbook-content li:contains("+demonName+")").html("<img src="+demonFileIcon+" class=\"circle grid-img\"><p class=\"grid-p\">"+$("#demon-name-input").val()+"</p>");
							alert("修改成功");
						}
						$("#add-demon-modal").modal("hide");//保存成功，关闭模态框
					}
				}else{
					alert("输入内容不能为空");
				}
			}else{
				alert("您输入的格式不符合规范");
			}
		}
	});
	//点击妖灵删除按钮
	$("#delete-demon-btn").click(function(){
		if(confirm("确定删除该权限?")){
		 　　//点击确定后操作
			deleteDemon(demonName);
			$("#handbook-content li:contains("+demonName+")").remove();
			$("#demon-message-modal").modal("hide")
			alert("妖灵删除成功");
		}
	});
});



$(document).ready(function(){
	$("#testHttp").click(function(){
		$.post("http://api.rswkoala.xyz/group/query-all", {}, function(data){
			console.log("发送http");
		console.log(data);
	});
	})
});


