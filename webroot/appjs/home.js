var loadClassDataSucc = false;
function product_info(id)
{
	location.href="product_info.html?gid="+id+"&rnd="+Math.random();
}
function loadClassData() {
	if (loadClassDataSucc==true){
		return ;
	}
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/allCate/getCateInfo",
		function(data) {
			if(data.code != 0) {
				mui.toast("加载数据失败...错误代码：" + data.code);
				console.log("server return code error" + data.code);
				return;
			}

			console.log(data.pageTitle);
			for(n = 0; n < data.data.length; n++) {
				str = "";
				str += '<div class="div_class">';
				str += '<table width="100%">';
				if (data.data[n].product==undefined)
					continue;
				for(p=0;p<(data.data[n].product.length/2+1);p++){
					str += '<tr>';
					str += '<td width="20%" style="text-align: center;">';
					if (p==0)
						str += data.data[n].column;
					str += '</td>';
					str += '<td width="40%">';
					if (p*2<data.data[n].product.length){
						seq=2*p;
						str += '<div class="div-class-image-frame">';
					//	str += '<div class="div-class-float">'+data.data[n].product[seq].fdName+'</div>';
					//	str += '<div class="div-class-float">'+data.data[n].product[seq].fdName+'<img class="img-dj" src="img/dj_bug.png"/></div>';
						str += '<img class="div-class-image" onclick="product_info('+data.data[n].product[seq].gid+')" src="'+data.data[n].product[seq].pic+'" />';	
						str +='</div>';
						str +='<div class="div-product-name">'+data.data[n].product[seq].fdName+'</div>';
					}

					str += '</td>';
					str += '<td width="40%">';
					if ((p*2+1)<data.data[n].product.length){
						seq=2*p+1;
						str += '<div class="div-class-image-frame">';
						//str += '<div class="div-class-float">'+data.data[n].product[seq].fdName+'</div>';
						str += '<img class="div-class-image" onclick="product_info('+data.data[n].product[seq].gid+')" src="'+data.data[n].product[seq].pic+'"  />';
						str +='</div>';
						str +='<div class="div-product-name">'+data.data[n].product[seq].fdName+'</div>';
					}
					str += '</td>';
					str += '</tr>';
				}
				str += '</table>';
				str += '</div>';

				$("#tabbar").append(str);
			}
			loadClassDataSucc=true;
			hide_wait();

		},
		function(data) {
			hide_wait();
			mui.toast("加载数据失败...");
		}
	);
}

var loadDsDataSucc=false;
function loadDsData() {

	if (loadDsDataSucc==true){
		return ;
	}
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/MaxAmbassador/getMaxGoods",
		function(data) {
			if(data.code != 0) {
				mui.toast("加载数据失败...错误代码：" + data.code);
				console.log("server return code error" + data.code);
				return;
			}

			
			console.log("ds data..."+json_to_string(data));
			for(n = 0; n < data.hotGoods.length; n++) {
				
				
				str='<li class="mui-table-view-cell mui-media mui-col-xs-6" style="background:#fff" onclick="product_info('+data.hotGoods[n].id+')" > \
							<a href="#"> \
								<span class="mui-icon "> \
									<img  width="100%" class="img-max-sale-column" src="'+data.hotGoods[n].pic+'"/> \
								</span> \
								<div class="mui-media-body div_max_sale_name">'+save_value(data.hotGoods[n].fdName,"商品名字")+'</div> \
								<div class="mui-media-body div_max_sale_price">¥'+save_value(data.hotGoods[n].fdPrice,"999.00")+'</div> \
							</a> \
						</li>';
				$("#max_ds").append(str);
			}
			loadDsDataSucc=true;
			hide_wait();

		},
		function(data) {
			hide_wait();
			mui.toast("加载数据失败...");
		}
	);
}
var first_id=0;
function loadHomeData() {
	
	/*
	var data=3;
	postJsonURL("shiyuan/mall50.php/address/GetCityList",{"id":data},function(data){
			dump_obj(data);
		},
		function(data){
			dump_obj(data);
		}
	);*/
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/site/GetIndexInfo",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}

			$(document).attr("title", data.pageTitle);
			
			n=0;
			str = '<div class="mui-slider-item mui-slider-item-duplicate">';
			str += '<a href="javascript:goSubPage(\'' + data.data.banners[n].fdUri + '\')">'
			str += '<img width="100%"  class="img-home-slier-item" src="' + data.data.banners[n].fdImgUri + '">'
			str += '</a>';
			str += '</div>';
			//$("#banner").append(str);
			//alert(data.data.banners[n].fdImgUri);
			document.getElementById("banner_first").src=data.data.banners[n].fdImgUri;
			first_id=data.data.banners[n].fdUri;
			$('#banner_first').click(function(){
				goSubPage(first_id);
			});
			//$$("img_first").src=data.data.banners[n].fdImgUri;
			for(n =0;n< data.data.banners.length;n++) {
				str = "";
				str = '<div class="mui-slider-item">';
				str += '<a href="javascript:goSubPage(\'' + data.data.banners[n].fdUri + '\')">'
				str += '<img width="100%"  class="img-home-slier-item" src="' + data.data.banners[n].fdImgUri + '">'
				str += '</a>';
				str += '</div>';
	

				if(n == 0) {
					//$("#slider_indicator").append('<div class="mui-indicator mui-active"></div>');
				} else {
					$("#slider_indicator").append('<div class="mui-indicator"></div>');
				}
				$("#banner").append(str);
			}
			

			n = data.data.banners.length - 1;
			str = "";
			str = '<div class="mui-slider-item mui-slider-item-duplicate">';
			str += '<a href="javascript:goSubPage(\'' + data.data.banners[n].fdUri + '\')">'
			str += '<img width="100%"  class="img-home-slier-item" src="' + data.data.banners[n].fdImgUri + '">'
			str += '</a>';
			str += '</div>';
			//$$("banner_last").src=data.data.banners[n].fdImgUri;
			$("#banner").append(str);

			for(n = 0; n < data.data.cate.length; n++) {
				str = '<img class="img-main-body" width="100%" src="' + data.data.cate[n].fdImage + '"></img>';
				//$("#big_image").append(str);
			}
			hide_wait();
			$(".img-home-slier-item").css("height",sl_height+"px");
				
			/*
			str='<div class="mui-slider-item mui-slider-item-duplicate">';
			str+='<a href="javascript:goSubPage(\''+data.data.banners[0].fdUri+'\')">'
			str+='<img  class="img-home-slier-item" src="'+data.data.banners[0].fdImgUri+'">'
			str+='</a>';
			str+='</div>';
			$("#banner").append(str);
			*/

		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
	
/*
	window.addEventListener("popstate", function(e) {  
        alert("我监听到了浏览器的返回按钮事件啦"); 
    }, false);  
*/
}
function pushHistory() {
    var state = {
        title: "title",
        url: "__SELF__"  
    };
    window.history.pushState(state, state.title, state.url);
}
var sl_height=0;

function fix_home_screen() {
	console.log("my_nav width=" + $('#my_nav').height());

	search_height = 45;
	w = $(window).width();//Math.floor(($(window).width() * 436) / 750);
	h = Math.floor((w * 180) / 1050);
	console.log($(window).width() + " w=" + w + " h=" + h);
	$('.div-home-coupon').css("width", w + "px");
	$('.div-home-coupon').css("height", h + "px");

	$('#slider').height($(window).height() - $("#my_nav").height() - h - search_height);
	
	

	$(".img-home-slier-item").width($(window).width());
	//$(".img-home-slier-item").height($(window).height() - $("#my_nav").height() - h - search_height);
	sl_height=$(window).height() - $("#my_nav").height() - h - search_height;

	$(".img-home-slier-item").css("height",sl_height+"px");
	//修改iframe位置
//	console.log("search height="+$("#search_all").height());
//	console.log("my_nav height="+$("#my_nav").height());
	
	mui(".mui-icon-clear")[0].addEventListener('tap',function(){
		$("#body_frame").css("display","none");
	});
	document.getElementById("all_search").addEventListener('input',function(){
		if (this.value.length>2){
			show_search_iframe("search.html?rnd="+Math.random()+"&v="+this.value);
		}
		else{
			$("#body_frame").css("display","none");	
		}
		
	});

}
function show_search_iframe(url)
{
	h=45;//$("#search_all").height();
	$("#body_frame").css("top",h+"px");
	$("#body_frame").css("height",($(window).height()-h-$("#my_nav").height())+"px");
	document.getElementById("body_frame").src=url;
	$("#body_frame").css("display","");
	$("#body_frame").css("left","0px");
	
	
	
}
function gotoGetCoupon()
{
	location.href='get_coupon.html?rnd='+Math.random();
}
function gotoCoupon()
{
	location.href='coupon.html?rnd='+Math.random();
}
function gotoPerson()
{
	location.href='person.html?rnd='+Math.random();
}
function gotoAddr()
{
	location.href='addr.html?rnd='+Math.random();
}
function gotoBuger()
{
	location.href="buger.html";
}
function gotoBeginExtend()
{
	location.href="begin_extend.html?rnd="+Math.random();
}
function gotoMaxDs()
{
	    var defaultTab = document.getElementById("tab_maxds");
         mui.trigger(defaultTab, 'tap');
}
function gotoCorpInfo()
{
	location.href="corp_info.html?rnd="+Math.random();
}
function gotoGjwt()
{
	location.href="cjwt.html?rnd="+Math.random();
}
function gotoMaxZst()
{
	location.href="max_zst.html?rnd="+Math.random();
}
function gotoHb(hid)
{
	location.href="product_hb.html?hid="+hid+"&rnd="+Math.random();	
}
function gotoProductAll()
{

	location.href="product_all.html?rnd="+Math.random();		
}
function gotoPersonMax()
{
	location.href="person_max.html?rnd="+Math.random();		
}
function goto_extend_order()
{
	location.href="extend_order.html?rnd="+Math.random();	
}
function goto_my_friend()
{
	location.href="my_friend.html?rnd="+Math.random();	
}
mui("#my_nav").on("tap", "a", function() { //点击触发   
	//a1=plus.webview.getWebviewById("a1");  
	var id = this.getAttribute("myseq");
	$("#body_frame").css("display","none");
	for(n = 1; n <= 4; n++) {
		if(n == id)
			$("#home_tab" + n)[0].src = "img/home_tab" + n + "_on.png";
		else
			$("#home_tab" + n)[0].src = "img/home_tab" + n + "_off.png";
	}
	if(id == 1) {
		loadClassData();
	}
	else if(id==3){
		loadDsData();
	}
	return;

});