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
	
	setDatabase : function(databaseName) {
		var locallydb = require('locallydb');
		var trimmedDatabaseName = databaseName.trim();
		if(trimmedDatabaseName == "") {
			return false;
		}
		this.databaseName = trimmedDatabaseName;
		var db = new locallydb('./'+databaseName);
		return true;
	},
	user : {},
	question : {
		insertQuestionToDatabase : function(questionObject) {
			var locallydb = require('locallydb');
			var db = new locallydb(module.exports.databaseName);
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
			var locallydb = require('locallydb');
			var parentObject = module.exports;
			var db = new locallydb(parentObject.databaseName);
			var question = db.collection('question');
			var questionList = question.where("@questionId > 0").items;
			return (questionList.length==0)?0:(questionList.length-1);
		},
		getMaxIdFromCategoryList : function() {
			var locallydb = require('locallydb');
			var parentObject = module.exports;
			var db = new locallydb(parentObject.databaseName);
			var category = db.collection('category');
			var categoryList = category.where("@categoryId > 0").items;
			return (categoryList.length==0)?0:(questionList.length-1);
		},
		getAllQuestionAsList : function() {
			var locallydb = require('locallydb');
			var db = new locallydb(this.databaseName);
			var question = db.collection('question');
			var questionObjectList = question.where("@questionId > 0").items;
			var questionList = [];
			for(var index in questionObjectList) {
				questionList.push(questionObjectList[index].questionStatement);
			}
			return questionList;
		},
		checkAndInsertCategory : function(category) {
			var locallydb = require('locallydb');
			var db = new locallydb(this.databaseName);
			var categoryTable = db.collection('category');
			var categoryObjectList = categoryTable.where("@categoryId > 0").items;
			var flag = 0;
			for(var index in categoryObjectList) {
				if(categoryObjectList[index].categoryName == category) {
					flag = index;
					break;
				}
			}
			if(flag == 0) {
				var parentObject = module.exports;
				var maxCategoryId = parentObject.getMaxIdFromCategoryList()+1;
				var categoryObject = {
					categoryId : maxCategoryId,
					categoryName : category.toLowerCase()
				};
				parentObject.insertCategoryObject(categoryObject);
				flag = maxCategoryId;
			}
			return flag;
		}

	}
};