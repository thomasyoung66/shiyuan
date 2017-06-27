
function bug_action(id)
{
	location.href="product_info.html?gid="+id+"&rnd="+Math.random();
}
function loadSearchData()
{
	//show_wait();
	if (getvalue("v").length<=0){
		alert("ok");
		return ;
	}
	loadJsonUrl("shiyuan/mall50.php/site/search/keyword/"+getvalue("v"),
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}
			console.log(json_to_string(data));
			if (data.code!=0){
				mui.toast("搜索返回错误代码!");
				return ;
			}
			for(n=0;n<data.data.length;n++){
				var item=data.data[n];
				str='<div class="div-search-frame"> \
				<div class="div-search-frame-left ">\
					<img src="'+item.image+'"></img>\
				</div>\
				<div class="div-search-frame-center">\
					<div class="div-search-name ">\
						'+item.name+'\
					</div>\
					<div class="div-search-money color-high">\
						￥'+item.price+'\
					</div>	\
				</div>\
				<div class="div-search-frame-right">\
					<div class="div-search-bug" onclick="bug_action('+item.id+')">\
						购买\
					</div>\
				</div>\
				<div class="div-clear"></div>\
			</div>';
				$("#main-content").append(str);
			}
		//	hide_wait();
	

		},
		function(data) {
		//	hide_wait();
			mui.toast("failure");
		}
	);
}


