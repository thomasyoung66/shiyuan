

function loadCouponInfo()
{
	loadJsonUrl("shiyuan/mall50.php/person/GetTicket",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			hide_wait();
			
			console.log("------------------");
			for(n=0;n<data.data.length;n++){
				var item=data.data[n];
				var str='<div class="div-coupon-frame">\
				<div class="div-coupon-frame-left">\
					<table style="width: 100%;height:100%">\
						<tr>\
							<td style="text-align: center; vertical-align: middle;">\
								<div class="div-coupon-frame-left-money">￥<font size="7">'+item.value+'</font></div>\
								<div class="div-coupon-frame-left-note">'+item.intro+'</div>\
							</td>\
						</tr>\
					</table>\
				</div>\
				<div class="div-coupon-frame-right">\
					<table style="width: 100%;height:100%">\
						<tr>\
							<td style="text-align: left; vertical-align: middle;">\
								<div class="div-coupon-frame-right-name">'+item.ticket+'</div>\
								<div class="div-coupon-frame-right-time">有效期:'+item.endtime+'</div>\
							</td>\
						</tr>\
					</table>\
				</div>\
				<div class="div-clear"></div>\
			</div>';
				$("#main-content").append(str);
			}
			
			
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
}

function gotoAddrEdit()
{
	location.href='coupon.html?rnd='+Math.random();
}
