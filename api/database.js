// this file contains all the functionalities on databse
module.exports = {
	databseName : "",
	locallydb : require('locallydb'),// creating localdb instance
	setDatabase : function(databaseName) {
		var trimmedDatabaseName = databaseName.trim();
		if(trimmedDatabaseName == "") {
			return false;
		}
		this.databaseName = trimmedDatabaseName;
		var db = new this.locallydb('./'+databaseName+);
		return true;
	}
};