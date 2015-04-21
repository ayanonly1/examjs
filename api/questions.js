/**
*
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
	questionListFromDatabase : [],
	insertQuestionToDatabase : function(questionObject) {

	},
	insertCategoryToDatabase : function(categoryObject) {

	},
	insertQuestionToCategoryToDatabase : function(questionToCategoryObject) {

	},

	insertFromFile : function(filePath) {
		var fileObject = require('fs');
		var presentModule = this;
		fileObject.exists(filePath, function(isExists){
			if(isExists) {
				fileObject.readFile(filePath, "utf-8", function(err, data) {
					var questionsList = presentModule.parseCSVdata(data);
					presentModule.insertQuestionListToDatabase(questionsList);			
				});		
			} else {
				presentModule.fileNotFound(filePath);
			}
		});
		
	},

	insertQuestionListToDatabase : function(questionList) {
		var database = require('./database');
		database.setDatabase('examdb');
		for(var index=0; index<(questionList.length); index++) {
			var maxQuestionId = database.question.getMaxIdFromQuestionList();
			var questionObject = {
				questionId : (maxQuestionId+1),
				questionStatement : questionList[index].questionStatement,
				option1 : questionList[index].option1,
				option2 : questionList[index].option2,
				option3 : questionList[index].option3,
				option4 : questionList[index].option4,
				option5 : questionList[index].option5,
				answer : questionList[index].answer,
				dificulty : questionList[index].dificulty,
				createdOn : new Date().getTime(),
				createdBy : questionList[index].createdBy
			};
			if(!this.isQuestionExists(questionObject)) {
				database.question.insertQuestionToDatabase(questionObject);console.log("inserted");
				var categoryArray = questionList[index].category.split(",");
				var categoryIdArray = this.checkAndInsertCategory(categoryArray);
				this.insertQuestionToCategoryRelation(categoryIdArray, questionObject.questionId);
			}

		}
	},

	insertQuestionToCategoryRelation : function(categoryIdArray, questionId) {

	},

	checkAndInsertCategory : function(categoryArray) {
		var categoryIdArray = [];
		for(var index in categoryArray) {
			var category = categoryArray[index];
			var database = require('./database');
			database.setDatabase('examdb');
			categoryIdArray.push(database.question.checkAndInsertCategory(category));
		}
		return categoryIdArray;
	},
	isQuestionExists : function(questionObject) {
		var questionListFromDatabase = this.getAllQuestions();
		var flag = 0;
		for(var index in questionListFromDatabase) {
			if(questionListFromDatabase.toLowerCase()==questionObject.questionStatement) {
				flag = 1;
				break;
			}
		}
		return flag;

	},

	getAllQuestions : function() {
		var database = require('./database');
		database.setDatabase('examdb');
		return database.question.getAllQuestionAsList();
	},

	parseCSVdata : function(data) {
		var dataArray = data.split("\n");
		var questionsList = [];
		for(var index=1;index<dataArray.length; index++) {
			var csvData = dataArray[index].split(",");
			var questionObject = {
				questionStatement : csvData[0],
				option1 : csvData[1],
				option2 : csvData[2],
				option3 : csvData[3],
				option4 : csvData[4],
				option5 : csvData[5],
				answer : csvData[6],
				dificulty : csvData[7],
				createdBy : csvData[8],
				category : csvData[9]
			};
			questionsList.push(questionObject);
		}
		return questionsList;
	},

	fileNotFound : function(filePath) {
		console.log("The given "+filePath+"  not found");
	}
};