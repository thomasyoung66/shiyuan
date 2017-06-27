

function save_data()
{
	parent.update_value(sessionStorage.input_id,$("#input_value").val());
	//
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);

}
function loadInputInfo() {
	console.log(getvalue("title"));
	console.log(getvalue("val"));
	
	$("#input_name").html(sessionStorage.input_name);
	$("#input_value").val(sessionStorage.input_val);
}

