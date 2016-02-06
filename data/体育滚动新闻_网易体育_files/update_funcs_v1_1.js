(function(){var g=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},f=function(a){var b=[],c;for(c in a)b.push(c+"="+encodeURIComponent(a[c]));return b.join("&")},e=function(a,b){this.base=a||{};var c={id:"f2e"},d;for(d in c)"undefined"==typeof this.base[d]&&(this.base[d]=c[d]);this.cfg=b||{};c={baseUrl:"http://project.f2e.netease.com:88/e.gif",wait:1E3};for(d in c)"undefined"==typeof this.cfg[d]&&(this.cfg[d]=c[d]);this.info=[]};e.prototype.domload=function(a){window.addEventListener?
document.addEventListener("DOMContentLoaded",a,!1):document.attachEvent&&document.attachEvent("onreadystatechange",a)};e.prototype.load=function(a){window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a)};e.prototype.performance=function(){var a=this;a.domload(function(){a.timer("domload")});a.load(function(){setTimeout(function(){a.timer("load");if(window.performance&&window.performance.timing){var b={},c=window.performance.timing.navigationStart,
d,e;for(e in window.performance.timing)d=window.performance.timing[e]-c,0<d&&(b[e]=d);a.collect(b)}a.send()},a.cfg.wait)})};e.prototype.timer=function(a){if(window._ntes_const&&window._ntes_const.stime){var b={};b[a]=(new Date).getTime()-window._ntes_const.stime.getTime();this.collect(b)}};e.prototype.collect=function(a){g(a)||(a=[a]);this.info=this.info.concat(a)};e.prototype.send=function(){for(var a=this.cfg.baseUrl,a=a+("?"+f(this.base)),b=0,c=this.info.length;b<c;b++)a+="&"+f(this.info[b]);(new Image).src=
a;this.info=[]};window.NTES||(window.NTES={});window.NTES.Monitor=e})();
var _f2e_tools ={
	setCookie : function(name, value, expires, domain, path, secure){//过期时间：天
		var cookieStr = [escape(name) + "=" + escape(value)];
		if (expires) {
			var date;
			if (!isNaN(expires)) {
				date = new Date();
				date.setTime(date.getTime() + expires * 60 * 1000);
			} else {
				date = expires;
			}
			cookieStr.push("expires=" + date.toUTCString());
		}
		if (path != null && path !== "") {
			cookieStr.push("path=" + path);
		}
		if (domain) {
			cookieStr.push("domain=" + domain);
		}
		if (secure) {
			cookieStr.push("secure");
		}
		document.cookie = cookieStr.join(";");	
	},
	getCookie:function(name){
		name = escape(name) + "=";
		var cookie = document.cookie, beginPos = cookie.indexOf(name);
		if (-1 === beginPos) {
			return "";
		}
		beginPos += name.length;
		var endPos = cookie.indexOf(";", beginPos);
		if (endPos === -1) {
			endPos = cookie.length;
		}
		return unescape(cookie.substring(beginPos, endPos));		
	},
	addEvent:function(obj,_event,func){
		if (obj.attachEvent){
			obj.attachEvent('on' + _event,func);
		}else{	
			obj.addEventListener(_event,func,false); 
		}	
	},
	stopDefault:function(e){//阻止浏览器默认动作		
		if (e && e.preventDefault){
			e.preventDefault();
		}else{
			window.event.returnValue = false;
		}
		return false;			
	},
	ieupdate:function(){
		var _t= this;
		var html = '<div style="width:960px;margin:1px auto;height:26px;overflow:hidden;border-bottom:2px solid #6699cc;background:#bad6eb;text-align:left;overflow:hidden;">'+
				   '<p style="font-size:12px;height:22px;padding:4px 15px 0 15px;color:#33588d;margin:0;line-height:20px;">'+
				   '<a id="update_popwin_close" onmouseover="this.style.color=\'#BA2636\';" onmouseout="this.style.color=\'#4F85B1\';" style="float:right;color:#4F85B1;text-decoration:underline; font-size:12px;" href="javascript:void(0);" target="_self" >下次不再显示</a>'+
				   '<span style="float:left;">亲爱的网易用户，您是否还在用老旧的ie6浏览器？加入网易“<a onmouseover="this.style.color=\'#BA2636\';this.style.textDecoration=\'underline\';" onmouseout="this.style.color=\'#4F85B1\';" style="color:#4F85B1;font-size:12px;text-decoration:underline;" href="http://developer.163.com/notice/ie_update.html">全网公敌IE6</a>”活动，一起给你的</span>'+
				   '<a style="float:left;zoom:1;padding: 0 3px;margin:0 5px;background:#fff;border:1px solid #a6adb7;color:#33588d;text-decoration:none; font-size:12px;height: 16px;line-height: 16px;line-height:18px\\9;overflow:hidden; _display: inline;" onmouseover="this.style.borderColor=\'#69c\'; this.style.color=\'#fff\';this.style.backgroundColor=\'#356AA0\';" onmouseout="this.style.borderColor=\'#a6adb7\'; this.style.color=\'#33588d\';this.style.backgroundColor=\'#fff\';" href="http://developer.163.com/notice/ie_update.html">浏览器升级</a>'+
				   '<span style="float:left;">吧！您也可以: </span>'+
				   '<a onmouseover="this.style.color=\'#BA2636\';" onmouseout="this.style.color=\'#4F85B1\';" style="float:left;color:#4F85B1;text-decoration:underline; font-size:12px;" href="http://developer.163.com/notice/ie_update.html">下载360安全浏览器</a>'+
				   '<img src="http://img1.cache.netease.com/2012/ieupdate/360.gif" alt="360安全浏览器" style="float:left;margin-left:5px;_display:inline;"/>'+
				   '</p></div>';
		var close = _t.getCookie("_ieupdate_close");	
		if(close === ""){
			var node = document.createElement("div");
				node.id = 'update_popwin';	
				node.style.overflow = 'hidden';
				node.style.position = 'relative';
				node.style.zIndex = 9999;		
				node.innerHTML = html.replace(/ie_update.html/g,'ie_update.html?ref='+location.hostname);
			var parent = document.getElementsByTagName("body")[0];		
			var timmer = null;
			var time_close = 20000;			
			function showwin(n,height,time){
				n.style.height = '0px';
				var h = 0,t=0;
				function Sine(t,b,c,d){ return -c * Math.cos(t/d * (Math.PI/2)) + c + b; }
				var _timmer = setInterval(function(){
					h = Sine(t,0,height,time);				
					if(t>time){
						n.style.height = height+"px";
						clearInterval(_timmer);
						_timmer = null;
						return;
					}				
					n.style.height = h+"px";
					t+=13;																
				},13);			
			}
			function hiddenwin(n,height,time){
				var h = height,t=0;
				function Sine(t,b,c,d){ return c * Math.sin(t/d * (Math.PI/2)) + b; }
				var _timmer = setInterval(function(){
					h = Sine(t,height,-1*height,time);				
					if(t>time){
						n.style.height = height+"px";
						n.style.display = "none";
						clearInterval(_timmer);
						_timmer = null;
						return;
					}				
					n.style.height = h+"px";
					t+=13;																
				},13);			
			}						
			parent.insertBefore(node,parent.firstChild);
			var height = node.offsetHeight;		
			showwin(node,height,300);
			_t.addEvent(document.getElementById("update_popwin_close"),"click",function(e){
				e = e || window.event;
				_t.stopDefault(e);           			
				hiddenwin(node,height,300);	
				_t.setCookie("_ieupdate_close","close",365);
				if(timmer!==null){
					clearTimeout(timmer);
					timmer = null;
				}		
			});
			_t.addEvent(node,"mouseover",function(e){
				if(timmer!=null){
					clearTimeout(timmer);
					timmer = null;
				}
			});	
			_t.addEvent(node,"mouseout",function(e){
				timmer = setTimeout(function(){
					hiddenwin(node,height,300);	
				},time_close);
			});				
			timmer = setTimeout(function(){
				 hiddenwin(node,height,300);		
			},time_close);							
		}		
	}	
};
function __ieUpdate(){
	setTimeout(function(){
		_f2e_tools.ieupdate();
	},17000);
}
function __f2e_monitor(cid,r){
	if(typeof _ntes_const === "undefined"){
		return;
	}
	var ratio = r || 0.0001;	
	if(Math.random()<ratio){
	  (new NTES.Monitor({id:cid})).performance();
	}	
}


