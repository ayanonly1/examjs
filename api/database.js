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
		var db = new this.locallydb('./'+databaseName);
		return true;
	},
	user : {},
	question : {
		insertQuestionToDatabase : function(questionObject) {
			var db = new locallydb(this.databaseName);
			var question = db.collection('question');
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
			var questionArray = [];
			for(var index in categoryIdArray) {
				var categoryId = categoryIdArray[index];
				var questionIdArray = this.getQuestionIdArrayFromCategoryId(categoryId);
				for(var questionIndex in questionIdArray) {
					var questionId = questionIdArray[questionIndex];
					var questionObject = this.getQuestionObjectFromQuestionId();
					questionArray.push(questionObject);
				}
			}
			return questionArray;
		},
		getQuestionObjectFromQuestionId : function(questionId) {
			var db = new locallydb(this.databaseName);
			var question = db.collection('question');
			var questionObject = question.where("(@questionId == '"+questionId+"')")[0];
			return questionObject;
		},
		getQuestionIdArrayFromCategoryId : function(categoryId) {
			var db = new locallydb(this.databaseName);
			var questionToCategory = db.collection('questionToCategory');
			var questionIdArray = questionToCategory.where("(@categoryId == '"+categoryId+"')");
			return questionIdArray;
		},
		getMaxIdFromQuestionList : function() {
			var parentObject = module.exports;
			var db = new parentObject.locallydb(parentObject.databaseName);
			console.log(parentObject.databaseName);
		}

	}
};