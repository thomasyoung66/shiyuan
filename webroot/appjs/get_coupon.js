
function getTicket(id)
{
	
	show_wait();
	
	postJsonURL("shiyuan/mall50.php/person/GetTicketAPI",{tid:id},
		function(data) {
			if(data.code != 0) {
				mui.toast("领取优惠券失败，错误代码:" + data.code);
				return;
			}
			mui.toast("获取优惠券成功!");
			hide_wait();
		},
		function (data){
			hide_wait();
			mui.toast("获取优惠券失败!");
		}
	);
}
function loadGetCouponInfo()
{
	show_wait();
	console.log("================begin===================");
	//http://wn.10000kf.com/shiyuan/mall50.php/person/GetTicketList
	//http://wn  shiyuan/mall50.php/person/GetTicketList/iskefu/1
	loadJsonUrl("shiyuan/mall50.php/person/GetTicketList",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			hide_wait();

			console.log(data.data.length+"------------------"+json_to_string(data));
			for(n=0;n<data.data.length;n++){
				var item=data.data[n];
				str='<div class="div-get-coupon-frame"> \
				<div class="div-get-coupon-frame-left"> \
					<table style="width: 100%;height:100%"> \
						<tr> \
							<td style="text-align: center; vertical-align: middle;"> \
							</td> \
						</tr> \
					</table> \
				</div> \
				<div class="div-get-coupon-frame-center"> \
					<table style="width: 100%;height:100%"> \
						<tr> \
							<td style="text-align: center; vertical-align: middle;"> \
								<div class="div-get-coupon-header">'+item.ticket+'</div> \
								<div class="div-get-coupon-money color-high"> \
									￥<font size="6">'+item.value+'</font> \
								</div>\
								<div class="div-get-coupon-dec color-high"> \
									'+item.instruction+' \
								</div> \
								<div class="div-get-coupon-expire"> \
									有效期:'+item.end+'</div> \
							</td> \
						</tr> \
					</table> \
				</div> \
				<div class="div-get-coupon-frame-right"> \
					<table style="width: 100%;height:100%"> \
						<tr> \
							<td style="text-align: center; vertical-align: middle; " onclick=\'getTicket('+item.id+')\'> \
								立即获取\
							</td> \
						</tr> \
					</table> \
				</div> \
				<div class="div-clear"></div> \
			</div>';
			
			
				$("#main-content").append(str);
			}
			
			
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
	console.log("================end===================");
}
