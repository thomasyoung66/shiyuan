
function edit_input(id,name)
{
	/*
	                        mui.openWindow({
                            url: 'input.html', 
                            id:'nextID',
                                 show:{                               
                                aniShow:"slide-in-right",
                                duration:300,
                                autoShow:false
                                 },
                             waiting:{
                                title:"正在加载，请稍后..."
                             },
                      });
                      
          $("#nextID").css("width",$(window).width()+"px");
          $("#nextID").css("height",$(window).height()+"px");
          
                      return ;
                      */
	//var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
	console.log(name);
	console.log($('#'+id).html());
	sessionStorage.input_id=id;
	sessionStorage.input_name=name;
	sessionStorage.input_val=$('#'+id).html();
	
	
	var index = layer.open({
	  type: 2,
	  title:false,
	  closeBtn: false,
	  content: 'input.html?rnd='+Math.random(),
	  area: ['0px', '0px'],
	  maxmin: false
	});
	layer.full(index);	
	
}


function update_value(id,val)
{
	$("#"+id).html(val);
}



function loadPersonInfo() {
	show_wait();
	loadJsonUrl("shiyuan/mall50.php/goods/GetGoodsInfo/id/" + getvalue("gid"),
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

function gotoAddrEdit() {
	location.href = 'addr_edit.html?rnd=' + Math.random();
}