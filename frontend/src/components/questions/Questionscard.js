import React, { useState, useEffect } from "react";
import axios from "axios";
import questionsData from "./questionfinal.json"; // Assuming it's in the same directory
import { useParams } from "react-router-dom";
import { useAuth } from "../Context";
import { Box, Heading, ChakraProvider } from "@chakra-ui/react";
import QuestionCard from "./QuestionInCard";
import Nav from "../Nav";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const { userId } = useAuth();
  const { category } = useParams();

  useEffect(() => {
    const fetchCompletedQuestionIds = async () => {
      try {
        const filteredQuestions = questionsData.filter(
          (question) => question.tag === category
        );
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/progress/completed-questions`,
          { userId }
        );

        const completedQuestionIds = response.data.completedQuestions.map(
          (completedQuestion) => completedQuestion.questionId
        );
        console.log(completedQuestionIds);
        if (completedQuestionIds === null) {
          setQuestions(
            filteredQuestions.map((question) => ({
              ...question,
              completed: false,
            }))
          );
          return;
        }

        
        const updatedQuestions = filteredQuestions.map((question) => ({
          ...question,
          completed: completedQuestionIds.includes(question.question_id),
        }));

        setQuestions(updatedQuestions);
        console.log(updatedQuestions);
      } catch (error) {
        console.error("Error fetching completed questions:", error);
      }
    };

    fetchCompletedQuestionIds();
  }, [category, userId]);

  const handleCheckboxChange = async (questionId) => {
    console.log("questionId:", questionId);

    const updatedQuestions = questions.map((q) =>
      q.question_id === questionId ? { ...q, completed: !q.completed } : q
    );

    setQuestions(updatedQuestions);
    console.log(updatedQuestions);

    try {
      const updatedQuestionsToSend = updatedQuestions.filter(
        (question) =>
          question.tag === category && question.question_id === questionId
      );

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/progress/update-progress`,
        {
          userId,
          questions: updatedQuestionsToSend.map(
            ({ question_id, completed }) => ({
              questionId: question_id,
              status: completed ? "completed" : "unanswered",
              tag: category,
            })
          ),
        }
      );
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  return (
    <ChakraProvider>
      <Nav />
      <Box
        p={4}
        bg="white"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Heading mb={4} color="black" textAlign="center">
          {category}
        </Heading>
        {questions.map((question) => (
          <QuestionCard
            key={question.question_id}
            question={question}
            onCheckboxChange={() => handleCheckboxChange(question.question_id)}
          />
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default QuestionList;
