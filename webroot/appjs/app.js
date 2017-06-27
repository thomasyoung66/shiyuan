var server="http://wn.10000kf.com/";


function save_value(val,def){
	
	
	if (val==null || val==undefined)
		return def;
	else
		return val;
}

function safe_value(val,def){
	console.log(">>>>>"+val);
	if (val==null || val==undefined||val=="null")
		return def;
	else
		return val;
}

function get_server()
{
	return server;
}
function json_to_string(j)
{
	return JSON.stringify(j);
}
function string_to_json(s)
{
	return JSON.parse(s);
}
function dump_obj(myObject) {
	var s = "";
	for(var property in myObject) {
		console.log(property + ": " + myObject[property]);
	}
}
function count_obj(obj)
{
	var sum=0;
	for(var property in obj) {
		sum++;
	}
	return sum;
}
//检查登录
function check_login() {
	var str=window.location.href;
	if (str.indexOf("login.html")>0)
		return ;
	
	var loginSucc = sessionStorage.loginSucceed;
	if(loginSucc == undefined) {
		location.href = "login.html";
	}
}
//获取html传参数
function getvalue(name)
{
    var str=window.location.search;
    if (str.indexOf(name)!=-1)
    {
        var pos_start=str.indexOf(name)+name.length+1;
        var pos_end=str.indexOf("&",pos_start);
        if (pos_end==-1)
        {
            return str.substring(pos_start);
        }
        else
        {
            return str.substring(pos_start,pos_end)
        }
    }
    else
    {
        return "";
    }
}
function loadJsonUrl(jsonURL, successFunc, errorFunc) {
	var host=get_server();
	console.log(host+jsonURL);
    $.ajax({
        url: host+jsonURL,
        type: "GET",
        dataType: 'json',
        jsonp: 'json',
        contentType: "application/json;utf-8",
        success: successFunc,
        error: errorFunc
    });
}
function postJsonURL(jsonURL, params, successFunc, errorFunc) {
    var host=get_server();
    console.log( host+jsonURL);
    $.ajax({
        url: host+jsonURL,
        type: 'POST',
        dataType: 'json',
        jsonp: 'json',
        data: params,
        success: successFunc,
        error: errorFunc
    });
}


sprintfWrapper = {
    init: function() {
        if (typeof arguments == "undefined") {
            return null;
        }
        if (arguments.length < 1) {
            return null;
        }
        if (typeof arguments[0] != "string") {
            return null;
        }
        if (typeof RegExp == "undefined") {
            return null;
        }

        var string = arguments[0];
        var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        var matches = new Array();
        var strings = new Array();
        var convCount = 0;
        var stringPosStart = 0;
        var stringPosEnd = 0;
        var matchPosEnd = 0;
        var newString = '';
        var match = null;

        while (match = exp.exec(string)) {
            if (match[9]) {
                convCount += 1;
            }
            stringPosStart = matchPosEnd;
            stringPosEnd = exp.lastIndex - match[0].length;
            strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
            matchPosEnd = exp.lastIndex;
            matches[matches.length] = {
                match: match[0],
                left: match[3] ? true: false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[convCount]) < 0 ? true: false,
                argument: String(arguments[convCount])
            };
        }

        strings[strings.length] = string.substring(matchPosEnd);
        if (matches.length == 0) {
            return string;
        }

        if ((arguments.length - 1) < convCount) {
            return null;
        }

        var code = null;
        var match = null;
        var i = null;

        for (i = 0; i < matches.length; i++) {
            if (matches[i].code == '%') {
                substitution = '%'
            }
            else if (matches[i].code == 'b') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'c') {
                matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'd') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'f') {
                matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision: 6));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'o') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 's') {
                matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision: matches[i].argument.length)
                substitution = sprintfWrapper.convert(matches[i], true);
            }
            else if (matches[i].code == 'x') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = sprintfWrapper.convert(matches[i]);
            }
            else if (matches[i].code == 'X') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
            }
            else {
                substitution = matches[i].match;
            }
            newString += strings[i];
            newString += substitution;
        }
        newString += strings[i];
        return newString;
    },

    convert: function(match, nosign) {
        if (nosign) {
            match.sign = '';
        } else {
            match.sign = match.negative ? '-': match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0: l).join(match.pad);
        if (!match.left) {
            if (match.pad == "0" || nosign) {
                return match.sign + pad + match.argument;
            } else {
                return pad + match.sign + match.argument;
            }
        } else {
            if (match.pad == "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, ' ');
            } else {
                return match.sign + match.argument + pad;
            }
        }
    }
}
sprintf = sprintfWrapper.init;
function $$(id){
	return document.getElementById(id);
}

function goSubPage(url)
{
	location.href=url;
}
//check_login();
//dump_obj(sessionStorage);

function show_wait()
{
    str='<div class="loadingWrap"></div>';
    var oDiv=document.createElement("div");
    oDiv.setAttribute("id","my_wait");
    oDiv.innerHTML =str;
    document.body.appendChild(oDiv);
}
function hide_wait()
{
    $("#my_wait").remove();
}