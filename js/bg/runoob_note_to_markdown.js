var htmlToMarkdown = function () {
  var parseHeader = function (e) {
    var content = "";
    var num = parseInt(e.nodeName.match("\\d"));
    while (num-- > 0) content += "#";
    content += " " + e.innerText;
    return content;
  };

  var getCode = function (e) {
    $ncode = e.querySelector(".example_code");
    // ignore comments
    var comments = $ncode.querySelectorAll(".hl-comment");
    if (comments[1] && comments[1].innerText.startsWith("!")) {
      for (var c of comments) {
        c.parentElement.removeChild(c);
      }
    }

    var lang = location.pathname.substring(
      1,
      location.pathname.indexOf("/", 1)
    );
    return "\n```" + lang + "\n" + $ncode.innerText + "\n```\n";
  };

  var parseTable = function (e) {
    var parseTr = function (tr) {
      var _arr = [];
      for (var td of tr.childNodes) {
        _arr.push(td.innerText.replace(/\|/g, "\\|"));
      }
      return _arr.join("|");
    };

    var trs = e.querySelectorAll("tr");
    var content = "\n" + parseTr(trs[0]) + "\n"; // table header
    var _arr = [];
    for (var i = 0; i < trs[0].childNodes.length; i++) {
      _arr.push("---");
    }
    content += _arr.join("|") + "\n";

    // table body
    for (var i = 1; i < trs.length; i++) {
      content += parseTr(trs[i]) + "\n";
    }
    return content;
  };

  var md = "";
  var nodeName;
  for (var e of document.querySelector(".article-intro").children) {
    nodeName = e.nodeName;
    // debugger
    if (nodeName.search("^H\\d$") == 0) {
      // headers
      md += "\n" + parseHeader(e) + "\n\n";
    } else if (nodeName === "PRE") {
      // block text
      md += "\n```text\n" + e.innerText + "\n```\n";
    } else if (e.classList.contains("example")) {
      // codes
      md += getCode(e) + "\n";
    } else if (nodeName == "TABLE") {
      md += parseTable(e) + "\n";
    } else {
      md += e.innerText + "\n";
    }
  }

  return md;
};

var copyToclipBoard = function (data) {
  input = document.createElement("textarea");
  input.value = data;
  document.body.appendChild(input);
  input.select();
  if (document.execCommand("copy")) {
    console.log("copyed to clipboard");
  }
  document.body.removeChild(input);
  return data;
};
//console.log(copyToclipBoard(htmlToMarkdown()))
