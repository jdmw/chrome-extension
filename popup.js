var defaultHandle = function (tab) {
  console.log("open popup page");
  document.getElementById("website-list").style.display = "";
  document.getElementById("dashboard").onclick = openDashBoard;
};

var oversea_host = "api2.dqprism.com:12001";
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".url-link a");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    // a.onclick = function(){
    // var url = a.href ;
    // window.open(url);
    // }
  }
  getCurentTab(function (tab) {
    if (tab.url.search("login") > 0 || tab.url.search(/sign.*in/i) > 0) {
      chrome.runtime.sendMessage({ type: "login", url: tab.url }, function (
        response
      ) {
        if (response && response["pageAction"]) {
          var script = response["pageAction"]["script"];
          chrome.tabs.executeScript(tab.tabId, { code: script }, function () {
            showInfo("Logged in " + response["name"]);
          });
        } else [showInfo("not user and password saved")];
      });
    }

    var convertPosivitionVO = function (positionId, json) {
      var vo = {
        collegeIds: [3],
        companyId: json.company_id,
        positionId: positionId,
        title: json.title,
        city: json.city,
        accountabilities: json.accountabilities,
        requirement: json.requirement,
        salary: "",
        employmentType: json.employment_type,
        degree: json.degree,
        candidateSource: json.candidate_source,
        salaryTop: json.salary.salary_top,
        salaryBottom: json.salary.salary_bottom,
        publisherName: "",
        salaryType: json.salary.salary_type,
      };
      return {
        queue: "SYNC_ATS_TO_OVERSEA_POSITION_DETAIL",
        msg: vo,
      };
    };
    var decodeUtf8 = function (arrayBuffer) {
      var result = "";
      var i = 0;
      var c = 0;
      var c1 = 0;
      var c2 = 0;
      var c3 = 0;

      var data = new Uint8Array(arrayBuffer);

      // If we have a BOM skip it
      if (
        data.length >= 3 &&
        data[0] === 0xef &&
        data[1] === 0xbb &&
        data[2] === 0xbf
      ) {
        i = 3;
      }

      while (i < data.length) {
        c = data[i];

        if (c < 128) {
          result += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          if (i + 1 >= data.length) {
            throw "UTF-8 Decode failed. Two byte character was truncated.";
          }
          c2 = data[i + 1];
          result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          if (i + 2 >= data.length) {
            throw "UTF-8 Decode failed. Multi byte character was truncated.";
          }
          c2 = data[i + 1];
          c3 = data[i + 2];
          result += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
          );
          i += 3;
        }
      }
      return result;
    };

    var arrBuf2Str = function (buf) {
      var blob = new Blob([buf]);
      //将Blob 对象转换成字符串
      var reader = new FileReader();
      reader.readAsText(blob, "utf-8");
      reader.onload = function (e) {
        console.info(reader.result);
      };
    };
    var post = function (url, body, msg) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function state_Change() {
        if (xmlhttp.readyState == 4) {
          // 4 = "loaded"
          if (xmlhttp.status == 200) {
            // 200 = OK
            // ...our code here...
            if (msg) alert(msg);
          } else {
            alert("AJAX Error");
          }
        }
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.send(JSON.stringify(body));
    };
    chrome.webRequest.onBeforeRequest.addListener(
      function (detail) {
        if (detail.method == "PUT") {
          var url = detail.url;
          var positionId = Number.parseInt(
            url.substr(url.lastIndexOf("/") + 1)
          );
          var buf = detail.requestBody.raw[0].bytes;
          var json = decodeUtf8(buf);
          var vo = convertPosivitionVO(positionId, JSON.parse(json));
          console.log(vo);
          post(
            oversea_host + "/mq/send",
            vo,
            "synch position to oversea system"
          );
        }
        //console.log(detail);
      },
      {
        urls: [
          // https://hr1.dqprism.com/
          "https://hr-t.dqprism.com/api/position/*",
        ],
        types: ["xmlhttprequest"],
      },
      ["requestBody"]
    );

    /******************* chrome proxy  ******************/

    var setProxy = function () {
      var fixedServerProxyConfig = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "https",
            host: "localhost",
          },
          bypassList: ["localhost*"],
        },
      };
      var findProxyForURL = function (url, host) {
        debugger;
        if (host == "hr1.dqprism.com") {
          return "PROXY localhost:12001";
        }
        return "DIRECT";
      };

      var pacPrxyConfig = {
        mode: "pac_script",
        pacScript: {
          // url: "js/prxy_pac_script.js",
          data: "eval('findProxyForURL')",
        },
      };
      chrome.proxy.settings.set(
        { value: pacPrxyConfig, scope: "regular" },
        function () {}
      );
    };
    var setProxyDefult = function () {
      chrome.proxy.settings.clear({ scope: "regular" });
      /* 或：chrome.proxy.settings.set(
        { value: { mode: "system" }, scope: "regular" },
        function () {}
      );*/
    };
    //setProxy();
    chrome.proxy.settings.get({ incognito: false }, function (config) {
      debugger;
      console.log(JSON.stringify(config));
    });
  });
  //route();
});

var showInfo = function (msg, isErr) {
  document.getElementById("info").innerHTML = msg;
};

var setVisiable = function (id, visiable) {
  document.getElementById(id).style.display = visiable == false ? "none" : "";
};

var showLoginPage = function () {
  setVisiable("login-page", true);
};

var hideLoginPage = function () {
  setVisiable("login-page", false);
};

var showWorkFrame = function () {
  setVisiable("work-frame", true);
};

var hideWorkFrame = function () {
  setVisiable("work-frame", true);
};
