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
	insertQuestionToDatabase : function(questionObject) {

	},
	insertCategoryToDatabase : function(categoryObject) {

	},
	insertQuestionToCategoryToDatabase : function(questionToCategoryObject) {

	},
	insertFromFile : function(filePath) {
		var fileObject = require('fs');
		fileObject.readFile(filePath, function(err, data) {
			var csvParseObject = require('csv-parse');
			parse(data,{comment : '#'}, function() {
				
			});
		});
	}
};