/**
* 
  *********** user related collections ************
  user : {
  	userId : "",
	userEmail : "",
	role : "",//0-normal user, 1- admin, 2 - student
	password : ""
  }

  userDetails : {
	userId : "",
	name : "",
	dob : "",// timestamp
	address : "",
	mobile : "",
	organisation : "",
	registeredOn : ""// timestamp
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
		userEmail : "",
		role : "",//0-normal user, 1- admin, 2 - student
		password : ""
	  	name : "",
	  	mobile : "",
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
		if(this.checkUserEmailAlreadyExistsOrNot(userObject.userEmail)) { // if user email exists in database skipping registration process
			return false;
		}
		var newUserId = this.getNewUserId();
		
		var dataForUserCollection = {
			userId : newUserId,
			userEmail : userObject.userEmail.trim(),
			role : ((typeof userObject.role == "undefined")?2:userObject.role),
			password : userObject.password.trim()
		};

		var dataForUserDetailsCollection = {
			userId : newUserId,
			name : ((typeof userObject.name == "undefined" || userObject.name == "")?"":userObject.name.trim()),
			dob : "",
			mobile : ((typeof userObject.mobile == "undefined" || userObject.mobile == "")?"":userObject.mobile.rim()),
			address : ((typeof userObject.address == "undefined" || userObject.address == "")?"":userObject.address.trim()),
			organisation : ((typeof userObject.organisation == "undefined" || userObject.organisation == "")?"":userObject.organisation.trim()),
			registeredOn : ((new Date().getTime())/1000)// timestamp
		};
		return this.insertUserDataToDatabase(dataForUserCollection, dataForUserDetailsCollection);
	},

	// this function checks wheather the userObject received is valid or not
	checkUserData : function(userObject) {
		if(JSON.stringify(userObject)=="{}") {
			return false;
		}
		if(typeof userObject.userEmail == "undefined" || userObject.userEmail == "" || typeof userObject.password=="undefined" || userObject.password=="") {
			return false;
		}
		return true;
	},

	// this function checks wheather the given user name already exists in database or not
	checkUserEmailAlreadyExistsOrNot : function(userEmail) {
		var db = new locallydb('./examdb');
		var user = db.collection('user');
		return user.where("(@userEmail == '"+userEmail.trim()+"')").length;
	},

	// this function returns the userId which will be associated with the newly registered user
	getNewUserId : function() {
		var db = new locallydb('./examdb');
		var user = db.collection('user');
		return user.items.length();
	},

	// this function receives the user's data in two objects and put them to proper collection
	insertUserDataToDatabase : function(userObject, userDetailsObject) {
		var db = new locallydb('./examdb');
		var user = db.collection('user');
		var userDetails = db.collection('userDetails')
		user.insert(userObject);
		userDetails.insert(userDetailsObject);
		return true;
	}

	// this function will register user from a csv file
	signUpFromFile : function() {

	},

	login : function(userEmail, userPassword) {
		if(!this.checkUserEmailAlreadyExistsOrNot(userEmail)) {
			return {error : "user doesnot exists"};
		}
		var passwordFromDatabase = this.getUserPasswordFromUserEmail(userEmail.trim());
	},

	getUserPasswordFromUserEmail : function() {
		
	},
	checkUserIsLoggedIn : function() {

	},
	getUserRole : function() {

	},
	getUserInfo : function() {

	},

}