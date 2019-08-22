
// usage: getCurentTab(function(tab){console.log(tab)})
var getCurentTab = function(callback){
	chrome.tabs.query({active: true,currentWindow: true},function(tabs){
		if(tabs && tabs.length > 0){
			for(var i=0;i<tabs.length;i++){
				var tab = tabs[i];
				if(tab.url){
					callback(tab);
				}
			}
		}
	});
}


var route = function(){
	var handles = {
		'world.wallstreetenglish.com.cn/student/activityPlayer':injectDashboard,
	}
	var getHandle = function(url){
		var handle ;
		for(var k in handles){
			var str = k.toLowerCase();
			if(url.toLowerCase().match(str)){
				handle = handles[k];
				break;
			}
		}
		return handle || defaultHandle;
	}
	getCurentTab(function(tab){
		console.log(tab);
		if(tab && tab.url){
			getHandle(tab.url)(tab);
		}else{
			defaultHandle(tab);
		}
	});
}



var popupDashBoard = function(){
	var createProperties = {
		url : "https://world.wallstreetenglish.com.cn/login",
		active: false
	};
	var script = "alert(Test)";
	chrome.tabs.create(createProperties,function(tab){
		setTimeout(function(){
			chrome.tabs.executeScript(tab.tabId,{code:script},function(){
				document.getElementById('info').innerHTML = 'Logged in WSE';
				alert("logged in in WSE through chrome extension");
			});
		},3000);
	});
}
var openDashBoard = function(){
	var user = getUser();
	var createProperties = {
		url : "https://world.wallstreetenglish.com.cn/",
		active: false
	};
	// var script = "userName.value='"+user.username+"';password.value='"+user.password+"';";
	var script = "alert(Test)";
	chrome.tabs.create(createProperties,function(tab){
		setTimeout(function(){
			chrome.tabs.executeScript(tab.tabId,{code:script},function(){
				document.getElementById('info').innerHTML = 'Logged in WSE';
				alert("logged in in WSE through chrome extension");
			});
			// alert("Test");
		},3000);
		// alert("Test");
		// console.log(window.tab = tab);
		// console.log(document.getElementById("username"));
	});
}
