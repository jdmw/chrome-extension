var defaultHandle = function(tab){
  console.log("open popup page");
  document.getElementById("website-list").style.display = "" ;
  document.getElementById("dashboard").onclick = openDashBoard ;
}

document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.url-link a');
  for(var i=0;i<links.length;i++){
    var a = links[i];
    // a.onclick = function(){
      // var url = a.href ;
      // window.open(url);
    // }
  }
  getCurentTab(function(tab) {
    if ( tab.url.search('login') > 0 ) {
      chrome.runtime.sendMessage({'type':'login','url' : tab.url }, function(response){
        if (response  && response['pageAction'] ) {
          var script = response['pageAction']['script']
        	chrome.tabs.executeScript(tab.tabId,{code:script},function(){
        		showInfo('Logged in ' + response['name']) ;
        	});
        }else[
          showInfo("not user and password saved")
        ]
      });
    }
	});
	//route();

});

var showInfo = function(msg,isErr){
  document.getElementById('info').innerHTML = msg ;
}

var setVisiable = function(id,visiable){
  document.getElementById(id).style.display = (visiable == false) ? "none" : "" ;
}

var showLoginPage = function(){
  setVisiable("login-page",true)
}

var hideLoginPage = function(){
  setVisiable("login-page",false)
}

var showWorkFrame = function(){
  setVisiable("work-frame",true)
}

var hideWorkFrame = function(){
  setVisiable("work-frame",true)
}
