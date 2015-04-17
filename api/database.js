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
			var db = new locallydb(this.databaseName);
			var questionsToCategory = db.collection('questionToCategory');
			question.insert(questionObject);
			return true;
		},
		insertCategoryObject : function(categoryObject) {
			var db = new locallydb(this.databaseName);
			var category = db.collection('category');
			category.insert(categoryObject);
			return true;
		},
		insertQuestionToCategoryObject : function(questionToCategoryObject) {
			var db = new locallydb(this.databaseName);
			var questionToCategory = db.collection('questionToCategory');
			questionToCategory.insert(questionToCategoryObject);
			return true;
		},
		getQuestionsFromCategoryIdArray : function(categoryIdArray) {
			for(var index in categoryIdArray) {
				var categoryId = categoryIdArray[index];
			}
		}

	}
};