const { SlashCommandBuilder } = require('discord.js');

const fetchTriviaQuestion = require('../fetchTriviaQuestion');
module.exports = {
  data: new SlashCommandBuilder().setName('question').setDescription('Ask a trivia question'),

  run: async ({ interaction, client, handler }) => {
    const { question, optionsToDisplay, correctAnswer } = await fetchTriviaQuestion();
    const questionEmbed = {
      color: 0x0099ff,
      title: 'Trivia Question',
      description: question,
      fields: [
        {
          name: 'Options',
          // add numbers to options
          value: optionsToDisplay.map((option, index) => `${index + 1}. ${option}`).join('\n'),
        },
      ],
      timestamp: new Date(),
    };
    // send the question
    interaction.reply({ embeds: [questionEmbed] });

    //  use collector to listen to messages with no filter

    const collector = interaction.channel.createMessageCollector({
      filter: (message) => {
        // check if the message is from a bot
        if (message.author.bot) return false;
        // check if the message is a number
        if (message.content !== '1' && message.content !== '2' && message.content !== '3') return false;

        return true;
      },
      // time to wait for a message
      time: 10000,
    });
    // track the user who answered

    // listen to collect event

    collector.users = new Set();
    collector.on('collect', (message) => {
      // check if the answer is correct
      // stop user from answering again
      if (collector.users.has(message.author.id)) {
        message.reply('You already answered!');
        return;
      }
      console.log('collector');
      if (optionsToDisplay[message.content - 1] === correctAnswer) {
        // reply with correct answer
        message.reply('Correct answer!');
        collector.stop();
        // reset active quizz
        // resetActiveQuizz();
      } else {
        // dont let same user answer again next time
        collector.users.add(message.author.id);

        // collector.users.delete(message.author.id);

        message.reply('Incorrect answer!');
      }

      // reply with incorrect answer
    });
    collector.on('end', () => {
      // console.log(' no one answered correctly');
      // send the correct answer if no one answered correctly
      interaction.followUp(`No one answered correctly! The correct answer is ${correctAnswer}`);
    });
    // listen to end event
    // collector.on('end', (collected) => {
    //   // if no message is collected
    //   if (collected.size === 0) {
    //     // reply with no answer
    //     interaction.reply('No answer!');
    //     // reset active quizz
    //     // resetActiveQuizz();
    //   }
    // });

    // reply with the question
    // interaction.reply(question);
    // interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
