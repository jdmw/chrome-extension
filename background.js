chrome.runtime.onInstalled.addListener(function () {
  /*
  chrome.storage.sync.set({color:'#00FF00'},function(){
    console.log("set the color #00FF00" );
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
           pageUrl: {hostEquals: 'developer.chrome.com'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
  */
  chrome.webRequest.onBeforeRequest.addListener(
    function (detail) {
      console.log(detail);
    },
    {
      urls: ["https://hr-t.dqprism.com/*"],
      types: ["xmlhttprequest"],
    },
    ["requestBody"]
  );
});

var match = (function (matcher, url) {
  var parseUrl = function (url) {
    var hostStartPos = url.indexOf("://");
    var schema, host, port, path, query;
    if (hostStartPos > 0) {
      schema = url.substr(0, 5);
      hostStartPos = hostStartPos + 3;
    } else {
      schema = "http";
      hostStartPos = 0;
    }
    var hostEndPos = url.indexOf("/", hostStartPos);
    host = url.substring(hostStartPos, hostEndPos);
    var portPos = host.indexOf(":");
    if (portPos > 0) {
      port = host.substring(portPos + 1);
      host = host.substring(0, portPos);
    }

    var queryPos = url.indexOf("?", hostEndPos);
    if (queryPos > 0) {
      path = url.substring(hostEndPos + 1, queryPos);
      query = url.substring(queryPos + 1);
    } else {
      path = url.substring(hostEndPos + 1);
    }
    return { schema: schema, host: host, port: port, path: path, query: query };
  };
  return function (matcher, urlinfo) {
    for (var k in matcher) {
      if (k.startsWith("url")) {
        switch (k) {
          case "urlContains":
            if (urlinfo.url.search(matcher[k]) < 0) return false;
            break;
        }
      } else {
        if (!urlinfo["host"]) {
          var _info = parseUrl(urlinfo.url);
          for (var k1 in _info) {
            urlinfo[k1] = _info[k1];
          }
        }
        switch (k) {
          case "hostEquals": {
            if (urlinfo["host"] !== matcher[k]) {
              return false;
              debugger;
            }
            break;
          }
        }
      }
    }
    return true;
  };
})();

var getLoginScript = function (user) {
  var pageAction = user["pageAction"] || {};
  var script = pageAction["script"];
  if (!script) {
    var account = user["account"];
    if (account.constructor == Array) {
      account = account[0];
    }
    debugger;
    script = script || "";
    var setValTpl = 'document.querySelector("{selector}").value = "{value}";';
    var clickBtnTpl = 'document.querySelector("{selector}").click(); ';

    if (pageAction["loginMethodLable"]) {
      script += clickBtnTpl.replace(
        "{selector}",
        pageAction["loginMethodLable"]
      );
    }
    if (pageAction["userfield"]) {
      script += setValTpl
        .replace("{selector}", pageAction["userfield"])
        .replace("{value}", account["username"]);
    }
    script += setValTpl
      .replace("{selector}", pageAction["passwordField"] || "[type=password]")
      .replace("{value}", account["password"]);
    script += clickBtnTpl.replace(
      "{selector}",
      pageAction["submitButton"] || "[type=submit]"
    );
    //if (pageAction['script']) eval(pageAction['script'])
    pageAction["script"] = script;
  }
  return script;
};

var login = function (url) {
  var pathinfo = { url: url };
  for (var user of users) {
    if (!user.disable && match(user["matcher"], pathinfo)) {
      getLoginScript(user);
      return user;
    }
  }
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //sendResponse('echo ' + message + ' from background.');
  //debugger;
  var res = "";
  if (message.type == "login") {
    res = login(message.url);
  }
  sendResponse(res);
});

console.log("chrome.runtime.onMessage.addListener");
