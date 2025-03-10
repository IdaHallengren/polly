'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.correctAnswer= [];
    poll.participants = [];
    poll.currentQuestion = 0;
    poll.timeForQuestion=[];
    poll.pointsForQuestion=[];
    poll.numberOfParticipants= "";
    poll.booleanClicked=true;
    poll.pointsForOne=0;
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.getPoll = function(pollId){
  const poll = this.polls[pollId];
  console.log("pollrequested", pollId);
  if (typeof poll !== 'undefined') {
    console.log(poll)
  return poll
  }
  return {}
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.getQuestion = function(pollId, qId=0) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];

  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {questionNumber: poll.questionNumber,
        q: poll.questions[poll.currentQuestion].q,
        a: answers,
        time: poll.timeForQuestion[poll.currentQuestion],
        points: poll.pointsForQuestion[poll.currentQuestion],
        correctAnswer: poll.correctAnswer[poll.currentQuestion]};
    }
  }
  return {}
}

Data.prototype.addParticipant = function(pollId, participant) {
  const poll = this.polls[pollId];
  console.log("participant added to", pollId, participant);
  if (typeof poll !== 'undefined') {
    poll.participants.push(participant);
  }
}

Data.prototype.getParticipants = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
      return poll.participants
  }
  return {}
}

Data.prototype.removeQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question removed", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.pop();
  }
}

Data.prototype.removeParticipant= function(pollId, participant){
  const poll = this.polls[pollId];
  console.log("participant removed", pollId, participant);
  if (typeof poll !== 'undefined') {
    for (let i = 0; i<poll.participants.length; i++ ) {
      if (poll.participants[i].participantId === participant.participantId) {
        poll.participants.splice(i, 1)
      }
    }
  }
}

Data.prototype.getPoints= function(pollId ,points,  participantId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    for (let i = 0; i<poll.participants.length; i++ ) {
      if (poll.participants[i].participantId === participantId) {
        poll.pointsForOne=poll.participants[i].totPoints;
        poll.pointsForOne+=points;
        poll.participants[i].totPoints=poll.pointsForOne ;
        return poll.participants
      }
    }
  }
}

Data.prototype.reorder = function(d) {
  const poll = this.polls[d.pollId];
  if (typeof poll !== 'undefined') {
    poll.questions = d.q;
  }
}

module.exports = Data;

