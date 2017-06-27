

function loadWuLiu()
{
	show_wait();
	//http://wn.10000kf.com/shiyuan/mall50.php/order/GetExpressInfo/orderCode/149735508278
	
	loadJsonUrl("shiyuan/mall50.php/order/GetExpressInfo/orderCode/"+getvalue("code"),
		function(json) {
			if(json.code != 0) {
				mui.toast("server return code error" + json.code);
				return;
			}
			if (json.data.ischeck==1)
				$("#wl_status").html("已经接收");
			else
				$("#wl_status").html("未接收");
			
			$('#corp').html(json.data.com);
			$('#code').html(getvalue("code"));
			str="";
			for(n=0;n<json.data.data.length;n++){
				item=json.data.data[n];
				console.log("---"+item.location);
				if (n==0){
					str+='<div class="div-wuliu-item ">\
						<div class="div-wuliu-time-new">\
							<div>\
								<img src="img/wuliu/wu_arriv.png" ></img>\
							</div>\
							<div class="div-wuliu-hist-line"></div>\
						</div>\
						<div class="div-wuliu-time-content">\
							<div class="div-wuliu-time-addr">'+item.context+'</div>\
							<div class="div-wuliu-time-text">地点:'+safe_value(item.location,"无")+'</div>\
							<div class="div-wuliu-time-text">'+item.time+'</div>\
						</div>\
						<div class="div-clear"></div>\
					</div>';
				}
				else{
					str+='<div class="div-wuliu-item">\
					<div class="div-wuliu-time-new">\
						<div style="margin:0 auto; margin-left: 3px;">\
							<img style="width:16px;" src="img/wuliu/wu_go.png" ></img>\
						</div>\
						<div class="div-wuliu-hist-line"></div>\
					</div>\
					<div class="div-wuliu-time-content">\
						<div class="div-wuliu-time-addr">'+item.context+'</div>\
						<div class="div-wuliu-time-text">地点:'+safe_value(item.location,"无")+'</div>\
						<div class="div-wuliu-time-text">'+item.time+'</div>\
					</div>\
					<div class="div-clear"></div>\
				</div>';
				}

				
				console.log("data-----"+item.time);
			}
			$("#wuliu_body").append(str);
			hide_wait();
	

		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
}