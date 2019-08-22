var users = (window.users || []).concat([
  {
    name : "Wall street English",
    matcher : {hostEquals: 'world.wallstreetenglish.com.cn', pathEquals:'login'},
    account : {
      name : 'Huber' ,
      username : "sh6v.00338.cn" ,
      password : "@@R04515"
    },
    pageAction: {
      userfield : "#username",
      passfield : "#password"
    }
  },
  {
    name : "wificm",
    disable : true ,
    matcher : {hostEquals: '192.168.103.3', portEquals:8099},
    account : [{
      username : "18256625691" ,
      password : "caoyue"
    },{
      username : "17316363894" ,
      password : "lmz520.."
    }]
    pageAction: {
      userfield : "#usr",
      passfield : "#pwd",
      submitButton: ".subbtn"
    }
  }
]);
