var users = (window.users || []).concat([
  {
    name : "jekins",
    matcher : {hostEquals: 'pub.dqprism.com'},
    account : {
      username : "qiancheng",
      password : "qianc#2019%QC"
    },
    pageAction: {
      userfield : "#j_username"
    }
  },
  {
    name : "dev1-pc",
    matcher : {hostEquals: 'www1.dqprism.com'},
    account : {
      username : "18256625691",
      password : "123456"
    },
    pageAction: {
      userfield : "#login-mobile-field"
    }
  },
  {
    name : "dev1-hr",
    matcher : {hostEquals: 'hr1.dqprism.com'},
    account : {
      username : "15021723075",
      password : "moseeker123"
    },
    pageAction: {
      loginMethodLable : "#Input2",
      userfield : "[name=mobile]"
    }
  },
  {
    name : "sandbox-hr",
    matcher : {hostEquals: 'hr-t.dqprism.com'},
    account : {
      username : "15000869284",
      password : "moseeker321"
    },
    pageAction: {
      loginMethodLable : "#Input2",
      userfield : "[name=mobile]"
    }
  },
]);
