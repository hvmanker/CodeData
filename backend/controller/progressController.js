const UserProgress = require("../model/userprogress_model");
const User = require('../model/user_model'); 


//get the user progress question id and tag

const getUserProgress = async (req, res) => {

  const { userId } = req.body;
  console.log(req.body);
  try {
    const userProgress = await UserProgress.findOne( {userId} );

    if (!userProgress) {
      return res
        .json({ success: false, completedQuestions:null});
    }

    const completedQuestions = userProgress.questions
      .filter((question) => question.status === "completed")
      .map((question) => ({
        questionId: question.questionId,
        tag: question.tag,
      }));
    // console.log(completedQuestions)
  
    return res.json({ success: true, completedQuestions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Update userprogress status by user ID and question ID

const updateUserProgress = async (req, res) => {
  const { userId, questions} = req.body;
  console.log(userId)

  try {
    // Check if the user exists in the database
    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Continue with updating user progress
    let existingUserProgress = await UserProgress.findOne({ userId });

    if (!existingUserProgress) {
      // If it doesn't exist, create a new record
      existingUserProgress = new UserProgress({
        userId,
        questions: Array.isArray(questions) ? questions : [],
      });
    } else {
      // If it exists, update the existing record
      existingUserProgress.questions = [
        ...existingUserProgress.questions,
        ...(Array.isArray(questions) ? questions : []),
      ];
    }

    // Save the user progress
    await existingUserProgress.save();

    res.json({ success: true, message: 'User progress updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//reset user progress for a category 
const resetProgress = async (req, res) => {
  try {
    const { userId, category } = req.body;

    let user = await UserProgress.findOne({"userId": userId }).exec();
    

    if (!user) {
      return res.json({ message: "nothing to reset" });
    }

    // Loop through questions and update the status if the tag matches the category
    for (const question of user.questions) {
      if (question.tag === category) {
        question.status = "unanswered";
      }
    }

    // Save the updated user document
    await user.save();

    return res.json(user.questions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  updateUserProgress,
  getUserProgress,
  resetProgress
};
