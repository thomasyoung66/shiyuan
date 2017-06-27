

function bug_product()
{
	
	show_wait();
	postJsonURL("shiyuan/mall50.php/cart/addCart",{"SID":getvalue("gid"),"count":1},function(data){
			console.log(json_to_string(data));
			if (data.code!=0){
				mui.toast("提交错误！错误代码："+data.code+" 错误原因:"+data.message);
			}
			mui.toast("购买商品成功!");
			hide_wait();
		},
		function(data){
			mui.toast("服务器内部错误!");
			console.log(json_to_string(data));
			hide_wait();
			
		}
	);
	/*
	loadJsonUrl("shiyuan/mall50.php/goods/AsyncBuy/id/"+getvalue("gid"),
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			console.log("------"+JSON.stringify(data))
			mui.toast("商品加入到购物车成功！");
			hide_wait();
	

		},
		function(data) {
			hide_wait();
			mui.toast("加入到购物车失败...");
		}
	);*/
}

function loadProductInfo()
{
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/goods/GetGoodsInfo/id/"+getvalue("gid"),
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			$(document).attr("title", data.pageTitle);
			$('.div-product-info-title').html(data.detail);
			$('.div-product-info-text').html(data.description);
			$('.div-product-info-price').html("￥"+data.price);
			
			if (data.banner!=undefined && data.banner.length>0){
				str="";
				str+='<div class="mui-slider-item mui-slider-item-duplicate">'
				str+='<a href="#">';
				str+='<img src="'+data.banner[0].url+'">';
				str+='</a>';
				str+='</div>';
				$('#slider_content').append(str);
				t=data.banner.length;
				for(n=0;n<t;n++){
					str="";
					str+='<div class="mui-slider-item">'
					str+='<a href="#">';
					str+='<img src="'+data.banner[0].url+'">';
					str+='</a>';
					str+='</div>';
					$('#slider_content').append(str);	
					if (n==0)
					 	$("#slider_ind").append('<div class="mui-indicator mui-active"></div>');
					 else
					 	$("#slider_ind").append('<div class="mui-indicator"></div>');	
					 
				}	
				str="";
				str+='<div class="mui-slider-item mui-slider-item-duplicate">'
				str+='<a href="#">';
				str+='<img src="'+data.banner[t-1].url+'">';
				str+='</a>';
				str+='</div>';
				$('#slider_content').append(str);
			}

			str='<img class="img-main-body" width="100%" src="'+data.thumbUrl+'"></img>'
			$("#image_detail").append(str);
			hide_wait();
	

		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
}