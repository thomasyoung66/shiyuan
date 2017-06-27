

function gotoSelectCity()
{
	var cityPicker3 = new $.PopPicker({layer: 3});
	cityPicker3.setData(cityData3);
	setTimeout(function(){
			cityPicker3.show(function(items){
			//	$("#city_id1").val((items[0] || {}).value + "," + (items[1] || {}).value);
				$("#curr_city").html((items[0] || {}).text + " " + (items[1] || {}).text);
			});
		},200);
/*
	var city_picker1 = new mui.PopPicker({layer:2});
	city_picker1.setData(init_city_picker);

	setTimeout(function(){
			city_picker1.show(function(items){
			//	$("#city_id1").val((items[0] || {}).value + "," + (items[1] || {}).value);
				$("#curr_city").html((items[0] || {}).text + " " + (items[1] || {}).text);
			});
		},200);
*/

}
function loadAddrEdit()
{
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