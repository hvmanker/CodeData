// controllers/userProgressController.js

const Question = require("../model/question_model");
const UserProgress = require("../model/userprogress_model");
const axios = require("axios");

const allTags=[
    'Array',
    'Matrix',
    'String',
    'Searching & Sorting',
    'LinkedList',
    'Binary Trees',
    'Binary Search Trees',
    'Greedy',
    'BackTracking',
    'Stacks & Queues',
    'Heap',
    'Graph',
    'Trie',
    'Dynamic Programming',
    'Bit Manipulation'
];

// Controller to get total questions per tag
exports.getTotalQuestionsPerTag = async (req,res) => {
  try {
    const questions = await Question.find({}, "tag");
    const totalQuestionsPerTag = questions.reduce((acc, question) => {
      acc[question.tag] = (acc[question.tag] || 0) + 1;
      return acc;
    }, {});
    return res.json(totalQuestionsPerTag); // Returning the result without sending the response
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

// Controller to get total completed questions per tag
exports.getTotalCompletedQuestionsPerTag = async (userId) => {
  let totalCompletedQuestionsPerTag = allTags.reduce((acc, tag) => {
    acc[tag] = 0;
    return acc;
  }, {});
  try {
    
    const userProgress = await UserProgress.findOne(userId);
    
    // console.log(userProgress)
    if (!userProgress) {
      return totalCompletedQuestionsPerTag;
    }

    userProgress.questions.forEach((question) => {
      if (question.status === "completed") {
        totalCompletedQuestionsPerTag[question.tag] += 1;
      }
    });

    return totalCompletedQuestionsPerTag; 
    // res.json(totalCompletedQuestionsPerTag)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller to get combined data
exports.getCombinedData = async (req, res) => {
  try {
    const userID = req.params;
    
    // Get total questions per tag
    const totalQuestionsPerTagResponse = await axios.get(
      "https://codedata-backend.onrender.com/mlroutes/gettotalquestions"
    );
    const totalQuestionsPerTag = totalQuestionsPerTagResponse.data;


    // Get total completed questions per tag for a specific user (replace 'userId' with an actual user ID)
    const totalCompletedQuestionsPerTag =
      await exports.getTotalCompletedQuestionsPerTag(userID);

    // console.log(totalQuestionsPerTag)

    const totalCompleted = Object.values(totalCompletedQuestionsPerTag).reduce(
      (acc, value) => acc + value,
      0
    );
    const totalQuestions = Object.values(totalQuestionsPerTag).reduce(
      (acc, value) => acc + value,
      0
    );

    
    // Combine the results
    const combinedData = {
      totalQuestionsPerTag,
      totalCompletedQuestionsPerTag,
    };
    console.log(combinedData)
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      combinedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return res
      .status(200)
      .json({
        mldata: response.data,
        totalqestions: totalQuestions,
        totalcompleted: totalCompleted,
        combinedData:combinedData
      });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


