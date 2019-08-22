// https://world.wallstreetenglish.com.cn/student/activityPlayer

if(!XMLHttpRequest.prototype.open.oldfun){
	(function(){
		var jsonList = [];
		var oldfun = XMLHttpRequest.prototype.open ;
		XMLHttpRequest.prototype.open = function(method,url,more){
			if(url.endsWith(".json")){
				jsonList.push(url);
				//console.log(url);
			}
			this.open.oldfun.apply(this,arguments);
		}
		XMLHttpRequest.prototype.open.oldfun = oldfun;
		delete oldfun;
		window.showJsonData = function(){
			return jsonList ;
		}
	})();
}
