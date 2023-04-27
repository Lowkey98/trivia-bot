const axios = require('axios');
const readline = require('readline');
const shuffle = require('shuffle-array');

const apiUrl = 'https://the-trivia-api.com/api/questions/';

axios.get(apiUrl)
  .then(response => {
    const questionData = response.data[0];
    const question = questionData.question;
    const correctAnswer = questionData.correctAnswer;
    const incorrectAnswers = questionData.incorrectAnswers;
    const options = shuffle([correctAnswer, ...(incorrectAnswers || [])]);
    const optionsToDisplay = options.slice(0, 3);

    console.log(`Question: ${question}`);
    console.log('Select the correct answer from the following options:');
    optionsToDisplay.forEach((option, index) => {
      console.log(`${index + 1}- ${option}`);
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the number of the correct answer: ', (userInput) => {
      rl.close();
      if (!isNaN(userInput) && userInput <= optionsToDisplay.length) {
        if (optionsToDisplay[userInput - 1] === correctAnswer) {
          console.log('CORRECT');
        } else {
          console.log(`INCORRECT. The correct answer is: ${correctAnswer}`);
        }
      } else {
        console.log('Invalid input.');
      }
    });

  })
  .catch(error => {
    console.error('Failed to fetch question data:', error);
  });
