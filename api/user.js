/**
* 
  *********** user related collections ************
  user : {
  	userId : "",
	loginName : "",
	role : "",//0-normal user, 1- admin, 2 - student
	password : ""
  }

  userDetails : {
	userId : "",
	name : "",
	dob : "",// timestamp
	address : "",
	organisation : ""
  }

  userLoginDetails : {
	userId : "",
	loginTime : "",
	loginIp : "",
	logoutTime : "",
	status : ""//0-logged out 1- active
  }

  ***** total userObject expected to receive from frontend
	userObject : {
	  	userId : "",
		loginName : "",
		role : "",//0-normal user, 1- admin, 2 - student
		password : ""
	  	name : "",
		dob : "",// timestamp
		address : "",
		organisation : ""
    }  

*/
module.exports = {
	// this function should be called to register one user
	signUp : function(userObject={}) {
		if(!this.checkUserData(userObject)) {
			return false;
		}
		var db = new locallydb('./examdb');
		var user = db.collection('user');
		var userDetails = db.collection('userDetails')
		var dataForUserCollection = {
			userId
		}
	},

	// this function checks wheather the userObject received is valid or not
	checkUserData : function(userObject) {
		if(JSON.stringify(userObject)=="{}") {
			return false;
		}
		if(typeof userObject.loginName == "undefined" || userObject.loginName == "" || typeof userObject.password=="undefined" || userObject.password=="") {
			retuirn false;
		}
		return true;
	},

	// this function checks wheather the given user name already exists in database or not
	checkUserNameAlreadyExistsOrNot : function(userName) {

	},

	// this function will register user from a csv file
	signUpFromFile : function() {

	},

	login : function() {

	},
	checkUserIsLoggedIn : function() {

	},
	getUserRole : function() {

	},
	getUserInfo : function() {

	},

}