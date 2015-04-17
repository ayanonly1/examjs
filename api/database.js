// this file contains all the functionalities on databse
/**
*
	************** here is the table structures ***************
	category { // table to hold the category details
		categoryId : "",
		categoryName : ""
	}
	question { // table to hold the question details
		questionId : "",
		questionStatement : "",
		option1 : "",
		option2 : "",
		option3 : "",
		option4 : "",
		option5 : "",
		answer : "",
		dificulty : "",// 1-easy, 2-moderate, 3-tough, 4-for experts, default 2
		createdOn : "",
		createdBy : ""
	}
	questionToCategory { // table to hold the relationship of question to category
		questionId : "",
		categoryId : ""
	}

*/
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
	user : {},
	question : {
		insertQuestionToDatabase : function(questionObject) {
			
		}
	}
};