var users = (window.users || []).concat([
  {
    name: "git",
    matcher: { hostEquals: "git.moseeker.com" },
    account: {
      username: "qiancheng@moseeker.com",
      password: "asdfjkl;"
    },
    pageAction: {
      userfield: "#user_login"
    }
  },
  {
    name: "jekins",
    matcher: { hostEquals: "pub.dqprism.com" },
    account: {
      username: "qiancheng",
      password: "qianc#2019%QC"
    },
    pageAction: {
      userfield: "#j_username"
    }
  },
  {
    name: "sensors",
    matcher: { hostEquals: "sensors.moseeker.com" },
    account: {
      username: "qiancheng@moseeker.com",
      password: "qiancheng123"
    },
    pageAction: {
      userfield: "#userName"
    }
  },
  {
    name: "confluence",
    matcher: { hostEquals: "confluence.moseeker.com" },
    account: {
      username: "qiancheng",
      password: "asdfjkl;"
    },
    pageAction: {
      userfield: "#os_username"
    }
  },
  {
    name: "dev1-pc",
    matcher: { hostEquals: "www1.dqprism.com" },
    account: {
      username: "18256625691",
      password: "123456"
    },
    pageAction: {
      userfield: "#login-mobile-field"
    }
  },
  {
    name: "dev1-hr",
    matcher: { hostEquals: "hr1.dqprism.com" },
    account: {
      username: "13162064424",
      password: "123qweasd"
    },
    pageAction: {
      loginMethodLable: "#Input2",
      userfield: "[name=mobile]",
      passwordField:
        "form[name=loginForm]>section:first-child input[type=password]:last-child"
    }
  },
  {
    name: "dev3-hr",
    matcher: { hostEquals: "hr3.dqprism.com" },
    account: {
      username: "13162064424",
      password: "123qweasd"
    },
    pageAction: {
      loginMethodLable: "#Input2",
      userfield: "[name=mobile]",
      passwordField:
        "form[name=loginForm]>section:first-child input[type=password]:last-child"
    }
  },
  {
    name: "sandbox-hr",
    matcher: { hostEquals: "hr-t.dqprism.com" },
    account: {
      username: "18256625691",
      password: "moseeker123"
    },
    pageAction: {
      loginMethodLable: "#Input2",
      userfield: "[name=mobile]",
      passwordField:
        "form[name=loginForm]>section:first-child input[type=password]:last-child"
    }
  },
  {
    name: "rabbitmq-dev1",
    matcher: { hostEquals: "rabbitmq1.dqprism.com:15672" },
    account: {
      username: "daqi",
      password: "2U3sanQJ"
    },
    pageAction: {
      userfield: "[name=username]"
    }
  }
]);
