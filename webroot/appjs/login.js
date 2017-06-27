

function loadLoginInfo()
{
	return ;
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/goods/GetGoodsInfo/id/"+getvalue("gid"),
		function(data) {
			if(data.code != 0) {
				mui.toast("server return code error" + data.code);
				return;
			}

			hide_wait();
	

		},
		function(data) {
			hide_wait();
			mui.toast("failure");
		}
	);
}

function gotoAddrEdit()
{
	location.href='addr_edit.html?rnd='+Math.random();
}
