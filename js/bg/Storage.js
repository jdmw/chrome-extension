function BrowserStore(){
	this.currentUser ;
}
BrowserStore.prototype = {
	'savePersistentUser' : function(name,username,password,code){
		if(!name || !username || !password) {
			throw "name,username or password can't be empty" ;
		}
		var user = {
			"name"	   : name ,
			"username" : username ,
			"password" : password
		};
		if(window.localStorage){
			window.localStorage["jdmw.wse.user."+name] = this.encrypt(JSON.stringify(user),code||0xde);
		}else{
			throw 'This browser does NOT support localStorage';
		}
	},
	'getPersistentUser' : function(name,code){
		if(!name ) {
			throw "name can't be empty" ;
		}
		if(window.localStorage){
			return JSON.parse(this.encrypt(window.localStorage["jdmw.wse.user."+name],code||0xde)) ;
		}else{
			throw 'This browser does NOT support localStorage';
		}
	},
	'saveSessionUser' : function(name,username,password,code){
		if(!name || !username || !password) {
			throw "name,username or password can't be empty" ;
		}
		var user = {
			"name"	   : name ,
			"username" : username ,
			"password" : password
		};
		if(window.sessionStorage){
			var str = JSON.stringify(user);
			if(code != undefined ){
				str = this.encrypt(str,code||0xea);
			}
			window.sessionStorage["jdmw.wse.currentUser"] = str ;
		}else{
			throw 'This browser does NOT support sessionStorage';
		}
	},
	'getSeesionUser' : function(name,code){
		if(!name ) {
			throw "name can't be empty" ;
		}
		if(window.sessionStorage){
			var str = window.sessionStorage["jdmw.wse.currentUser"]
			if(code != undefined ){
				str = this.decrypt(str,code||0xea);
			}
			return JSON.parse(str) ;
		}else{
			throw 'This browser does NOT support sessionStorage';
		}
	},
	'encrypt' : function(str,code){
		if(!str || !code){
			throw 'the string or code can not be empty' ;
		}
		if(!isNaN(code)){
			if(code.constructor === String){
				code =  code * 1 ;
				
			}
			var a = code % 256 ;
			var b = (code - a) / 256 % 256 ;
			code = a ^ b ;
		}else{
			code = code.toString();
			
			if(code.length > 0){
				var ch = code.charCodeAt(0);
				for(var i=1;i<code.length;i++){
					ch = ch ^ code.charCodeAt(i);
				}
				code = ch ;
			}
		}
		if(!code) code = 0xed ; // code can't be 0
		
		var newStr = "" ;
		for(var i=0;i<str.length;i++){
			newStr += String.fromCharCode(str.charCodeAt(i) ^ code);
		}
		return newStr ;
	},
	'decrypt' : function(str,code){
		return this.encrypt(str,code);
	}
}
	