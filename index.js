const axios = require('axios');
const apiUrl = 'https://the-trivia-api.com/api/questions/';

axios.get(apiUrl)
  .then(response => {
    const questionData = response.data[0];
    const question = questionData.question;
    const correctAnswer = questionData.correctAnswer;
    const incorrectAnswers = questionData.incorrectAnswers;
    const optionsToDisplay = incorrectAnswers.slice(0, 2).concat(correctAnswer).sort( (a, b) => 0.5 - Math.random() );
    console.log('question' , question);
    console.log('optionsToDisplay' , optionsToDisplay);
    console.log('correctAnswer' , correctAnswer);
  })
  .catch(error => {
    console.error('Failed to fetch question data:', error);
  });
