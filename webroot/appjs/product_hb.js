
var hb_type=new Array("标准版","增强版","旗舰版","配件");
var hb_img=new Array("img/class/hb_bz.jpg","img/class/hb_zz.jpg","img/class/hb_qj.jpg","img/class/hb_pj.jpg");
function bug_product()
{
	
	show_wait();
	
	//http://wn.10000kf.com/shiyuan/mall50.php/goods/AsyncBuy
	
	postJsonURL("shiyuan/mall50.php/cart/addCart",{"SID":getvalue("gid"),"count":1},function(data){
			console.log(json_to_string(data));
			if (data.code!=0){
				mui.toast("提交错误！错误代码："+data.code+" 错误原因:"+data.message);
			}
			hide_wait();
		},
		function(data){
			mui.toast("服务器内部错误!");
			console.log(json_to_string(data));
			hide_wait();
			
		}
	);

}

function loadProductHbInfo()
{
	document.getElementById("title_image").src=hb_img[getvalue("hid")];
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/goods/GetGoodsInfo/id/"+getvalue("gid"),
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			$(document).attr("title", hb_type[getvalue("hid")]);



			hide_wait();
	

		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
}