const axios = require('axios');
const apiUrl = 'https://the-trivia-api.com/api/questions/';

const fetchTriviaQuestion = async () => {
  const response = await axios.get(apiUrl);
  const questionData = response.data[0];
  const question = questionData.question;
  const correctAnswer = questionData.correctAnswer;
  const incorrectAnswers = questionData.incorrectAnswers;
  const optionsToDisplay = incorrectAnswers
    .slice(0, 2)
    .concat(correctAnswer)
    .sort((a, b) => 0.5 - Math.random());
  return {
    question,
    optionsToDisplay,
    correctAnswer,
  };
};

module.exports = fetchTriviaQuestion;
