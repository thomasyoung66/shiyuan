
loadTab0Flag=false;
loadTab1Flag=false;
loadTab2Flag=false;
loadTab3Flag=false;
loadTab4Flag=false;
function confirm_ok(code) {
	var btnArray = ['否', '是'];
	mui.confirm('是否确认收货？', '系统提示', btnArray, function(e) {
		if(e.index == 1) {
		    postJsonURL("shiyuan/mall50.php/order/confirmOrder",{"orderCode":code},function(data){
		            console.log(json_to_string(data));
		            if (data.code!=0){
		                mui.toast("确认收货失败,错误代码："+data.code);
		            }
		            else
		            	 mui.toast("确认收货成功");
		            hide_wait();
		        },
		        function(data){
		            mui.toast("服务器内部错误!");
		            console.log(json_to_string(data));
		            hide_wait();
		
		        }
		    );	
		} 
	});
}


function confirm_delete(code) {
	var btnArray = ['否', '是'];
	mui.confirm('是否确认取消订单？', '系统提示', btnArray, function(e) {
		if(e.index == 1) {
			    postJsonURL("shiyuan/mall50.php/order/cancelOrder",{"SID":code},function(data){
		            console.log(json_to_string(data));
		            if (data.code!=0){
		                mui.toast("取消订单失败,错误代码:"+data.code);
		            }
		            else
		            	 mui.toast("取消订单成功");
		            hide_wait();
		        },
		        function(data){
		            mui.toast("服务器内部错误!");
		            console.log(json_to_string(data));
		            hide_wait();
		
		        }
		    );			
		} 
	});
}
function confirm_pay(code) {
	var btnArray = ['否', '是'];
	mui.confirm('是否确认付款？', '系统提示', btnArray, function(e) {
		if(e.index == 1) {
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
	});
}
function see_wuliu(code)
{

	location.href="wuliu.html?code="+code+"&rnd="+Math.random();
	//alert("see_wuliu");
}
function get_status(data,id)
{
	
	for(var sid in data.data.orderStatus){
		console.log("my>>>>"+sid+"----"+id);
		if (sid==id){
			return data.data.orderStatus[sid];
		}
	}
	//data.data.orderStatus[item.orderID]
	return "未知状态";
}
function loadTab0Data()
{
	if (loadTab0Flag==true)
		return ;
	show_wait();
	//http://wn.10000kf.com/shiyuan/mall50.php/order/list/type/
	
	loadJsonUrl("shiyuan/mall50.php/order/list/type/5",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
	
	
			str="";
			for(n=0;n<count_obj(data.data.items);n++){
				
				items=data.data.items[n];
				if (count_obj(items)==0)
					continue;
				//dump_obj(item);
				item=items[0];
				str+='<div class="div_order"> \
				<div class="div-order-item-header"> \
				<div class="div-order-item-left">订单号:'+item.code+'</div> \
				<div class="div-order-item-right color-high">'+get_status(data,item.status)+'</div> \
				<div class="div-clear"></div> \
				</div> \
				<div class="div-line"></div>';
							
				for(p=0;p<count_obj(items);p++){
					item=items[p];
					str+='\
					<div> \
						<div class="div-order-body-left"> \
							<img src="'+item.value+'"> \
						</div> \
						<div class="div-order-body-right"> \
							<div class="div-order-body-item"> \
								<div class="div-order-body-item-left"> \
									'+item.productInfo[0]+' \
								</div> \
							<div class="div-order-body-item-right"> \
							￥'+item.price+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					<div class="div-order-body-item1"> \
						<div class="div-order-body-item1-left"> \
							产品规格:'+save_value(item.spec,"无")+'\
						</div> \
						<div class="div-order-body-item1-right"> \
							x'+item.count+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					</div> \
					<div class="div-clear"></div> \
					</div>';
				}
				str+='\
					<div class="div-order-summer"> \
						共'+count_obj(items)+'件商品： 合计:￥'+item.payMent+'元 (含运费:￥'+item.postage+'元) \
					</div> \
					<div class="div-line"></div> \
						<div class="div-order-bottom"> \
							<div class="div-right"> \
								<div class="div-button-order-ok" onclick="confirm_ok('+item.code+')">确认收货</div> \
									<div class="div-button-order-wuliu" onclick="see_wuliu('+item.code+')">查看物流</div> \
									<div class="div-clear"></div> \
								</div> \
							<div class="div-clear"></div> \
						</div> \
					</div>';
				
			}
			$("#item1mobile").append(str);
			loadTab0Flag=true;
			hide_wait();
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);	
}
function loadTab1Data()
{
	if (loadTab1Flag==true)
		return ;
	show_wait();

	loadJsonUrl("shiyuan/mall50.php/order/list/type/1",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}

			str="";
			for(n=0;n<count_obj(data.data.items);n++){
				
				items=data.data.items[n];
				if (count_obj(items)==0)
					continue;
				//dump_obj(item);
				item=items[0];
				str+='<div class="div_order"> \
				<div class="div-order-item-header"> \
				<div class="div-order-item-left">订单号:'+item.code+'</div> \
				<div class="div-order-item-right color-high">'+get_status(data,item.status)+'</div> \
				<div class="div-clear"></div> \
				</div> \
				<div class="div-line"></div>';
							
				for(p=0;p<count_obj(items);p++){
					item=items[p];
					str+='\
					<div> \
						<div class="div-order-body-left"> \
							<img src="'+item.value+'"> \
						</div> \
						<div class="div-order-body-right"> \
							<div class="div-order-body-item"> \
								<div class="div-order-body-item-left"> \
									'+item.productInfo[0]+' \
								</div> \
							<div class="div-order-body-item-right"> \
							￥'+item.price+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					<div class="div-order-body-item1"> \
						<div class="div-order-body-item1-left"> \
							产品规格:'+save_value(item.spec,"无")+'\
						</div> \
						<div class="div-order-body-item1-right"> \
							x'+item.count+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					</div> \
					<div class="div-clear"></div> \
					</div>';
				}
				str+='\
					<div class="div-order-summer"> \
						共'+count_obj(items)+'件商品： 合计:￥'+item.payMent+'元 (含运费:￥'+item.postage+'元) \
					</div> \
					<div class="div-line"></div> \
						<div class="div-order-bottom"> \
							<div class="div-right"> \
								<div class="div-button-order-ok" onclick="confirm_pay('+item.code+')">确认付款</div> \
									<div class="div-button-order-wuliu" onclick="confirm_delete('+item.code+')">取消订单</div> \
									<div class="div-clear"></div> \
								</div> \
							<div class="div-clear"></div> \
						</div> \
					</div>';
				
			}
			$("#item2mobile").append(str);
			loadTab1Flag=true;
			hide_wait();
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);		
}
function loadTab2Data()
{
	if (loadTab2Flag==true)
		return ;
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/order/list/type/2",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			str="";
			for(n=0;n<count_obj(data.data.items);n++){
				
				items=data.data.items[n];
				if (count_obj(items)==0)
					continue;
				//dump_obj(item);
				item=items[0];
				str+='<div class="div_order"> \
				<div class="div-order-item-header"> \
				<div class="div-order-item-left">订单号:'+item.code+'</div> \
				<div class="div-order-item-right color-high">'+get_status(data,item.status)+'</div> \
				<div class="div-clear"></div> \
				</div> \
				<div class="div-line"></div>';
							
				for(p=0;p<count_obj(items);p++){
					item=items[p];
					str+='\
					<div> \
						<div class="div-order-body-left"> \
							<img src="'+item.value+'"> \
						</div> \
						<div class="div-order-body-right"> \
							<div class="div-order-body-item"> \
								<div class="div-order-body-item-left"> \
									'+item.productInfo[0]+' \
								</div> \
							<div class="div-order-body-item-right"> \
							￥'+item.price+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					<div class="div-order-body-item1"> \
						<div class="div-order-body-item1-left"> \
							产品规格:'+save_value(item.spec,"无")+'\
						</div> \
						<div class="div-order-body-item1-right"> \
							x'+item.count+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					</div> \
					<div class="div-clear"></div> \
					</div>';
				}
				str+='\
					<div class="div-order-summer"> \
						共'+count_obj(items)+'件商品： 合计:￥'+item.payMent+'元 (含运费:￥'+item.postage+'元) \
					</div> \
					<div class="div-line"></div> \
						<div class="div-order-bottom"> \
							<div class="div-right"> \
								<div class="div-button-order-ok" onclick="confirm_ok('+item.code+')">确认收货</div> \
									<div class="div-button-order-wuliu" onclick="see_wuliu('+item.code+')">查看物流</div> \
									<div class="div-clear"></div> \
								</div> \
							<div class="div-clear"></div> \
						</div> \
					</div>';
				
			}
			$("#item3mobile").append(str);
			loadTab2Flag=true;
			hide_wait();
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);			
}
function loadTab3Data()
{
	if (loadTab3Flag==true)
		return ;
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/order/list/type/3",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			str="";
			for(n=0;n<count_obj(data.data.items);n++){
				
				items=data.data.items[n];
				if (count_obj(items)==0)
					continue;
				//dump_obj(item);
				item=items[0];
				str+='<div class="div_order"> \
				<div class="div-order-item-header"> \
				<div class="div-order-item-left">订单号:'+item.code+'</div> \
				<div class="div-order-item-right color-high">'+get_status(data,item.status)+'</div> \
				<div class="div-clear"></div> \
				</div> \
				<div class="div-line"></div>';
							
				for(p=0;p<count_obj(items);p++){
					item=items[p];
					str+='\
					<div> \
						<div class="div-order-body-left"> \
							<img src="'+item.value+'"> \
						</div> \
						<div class="div-order-body-right"> \
							<div class="div-order-body-item"> \
								<div class="div-order-body-item-left"> \
									'+item.productInfo[0]+' \
								</div> \
							<div class="div-order-body-item-right"> \
							￥'+item.price+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					<div class="div-order-body-item1"> \
						<div class="div-order-body-item1-left"> \
							产品规格:'+save_value(item.spec,"无")+'\
						</div> \
						<div class="div-order-body-item1-right"> \
							x'+item.count+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					</div> \
					<div class="div-clear"></div> \
					</div>';
				}
				str+='\
					<div class="div-order-summer"> \
						共'+count_obj(items)+'件商品： 合计:￥'+item.payMent+'元 (含运费:￥'+item.postage+'元) \
					</div> \
					<div class="div-line"></div> \
						<div class="div-order-bottom"> \
							<div class="div-right"> \
								<div class="div-button-order-ok" onclick="confirm_ok('+item.code+')">确认收货</div> \
									<div class="div-button-order-wuliu" onclick="see_wuliu('+item.code+')">查看物流</div> \
									<div class="div-clear"></div> \
								</div> \
							<div class="div-clear"></div> \
						</div> \
					</div>';
				
			}
			$("#item4mobile").append(str);
			loadTab3Flag=true;
			hide_wait();
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);			
}
function loadTab4Data()
{
	if (loadTab4Flag==true)
		return ;
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/order/list/type/4",
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			str="";
			for(n=0;n<count_obj(data.data.items);n++){
				
				items=data.data.items[n];
				if (count_obj(items)==0)
					continue;
				//dump_obj(item);
				item=items[0];
				str+='<div class="div_order"> \
				<div class="div-order-item-header"> \
				<div class="div-order-item-left">订单号:'+item.code+'</div> \
				<div class="div-order-item-right color-high">'+get_status(data,item.status)+'</div> \
				<div class="div-clear"></div> \
				</div> \
				<div class="div-line"></div>';
							
				for(p=0;p<count_obj(items);p++){
					item=items[p];
					str+='\
					<div> \
						<div class="div-order-body-left"> \
							<img src="'+item.value+'"> \
						</div> \
						<div class="div-order-body-right"> \
							<div class="div-order-body-item"> \
								<div class="div-order-body-item-left"> \
									'+item.productInfo[0]+' \
								</div> \
							<div class="div-order-body-item-right"> \
							￥'+item.price+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					<div class="div-order-body-item1"> \
						<div class="div-order-body-item1-left"> \
							产品规格:'+save_value(item.spec,"无")+'\
						</div> \
						<div class="div-order-body-item1-right"> \
							x'+item.count+' \
						</div>	\
						<div class="div-clear"></div> \
					</div> \
					</div> \
					<div class="div-clear"></div> \
					</div>';
				}
				str+='\
					<div class="div-order-summer"> \
						共'+count_obj(items)+'件商品： 合计:￥'+item.payMent+'元 (含运费:￥'+item.postage+'元) \
					</div> \
					<div class="div-line"></div> \
						<div class="div-order-bottom"> \
							<div class="div-right"> \
								<div class="div-button-order-ok" onclick="confirm_ok('+item.code+')">确认收货</div> \
									<div class="div-button-order-wuliu" onclick="see_wuliu('+item.code+')">查看物流</div> \
									<div class="div-clear"></div> \
								</div> \
							<div class="div-clear"></div> \
						</div> \
					</div>';
				
			}
			$("#item5mobile").append(str);
			loadTab4Flag=true;
			hide_wait();
		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);		
}
function loadMyOrder(tabId)
{
	if (tabId==0){
		loadTab0Data();
	}
	else if (tabId==1){
		loadTab1Data();
	}
	else if (tabId==2){
		loadTab2Data();
	}
	else if (tabId==3){
		loadTab3Data();
	}
	else if (tabId==4){
		loadTab4Data();
	}
}