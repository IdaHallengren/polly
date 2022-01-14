function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang = 'en') {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function (d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function (d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, timeForQuestion: d.timeForQuestion, pointsForQuestion: d.pointsForQuestion, correctAnswer: d.correctAnswer, questionNumber: d.questionNumber});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('joinPoll', function (pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function (d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });


  socket.on('nextQuestion', function(d){
    io.to(d.pollId).emit('updateQuestion', d.questionNumber)
  })

  socket.on('submitAnswer', function (d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('addParticipant', function (d) {
    data.addParticipant(d.pollId, d.participantInfo)
    io.to(d.pollId).emit('participantsAdded', data.getParticipants(d.pollId));
  })

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('getPoll', function (pollId) {
    socket.emit('fullPoll', data.getPoll(pollId))
  });

  socket.on('removeSlide', function (d) {
    data.removeQuestion(d.pollId, {q: d.q, a: d.a, timeForQuestion: d.timeForQuestion, pointsForQuestion: d.pointsForQuestion, correctAnswer: d.correctAnswer, questionNumber: d.questionNumber});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  })

  socket.on('startGame' , function(d){
    io.to(d.pollId).emit('gameStart', d.boolean)
  })

  socket.on('removeParticipant', function(d){
    data.removeParticipant(d.pollId , {participantName: d.participantName, participantId: d.participantId, participantImg: d.participantImg, totPoints: d.totPoints})
    io.to(d.pollId).emit('dataUpdate', data.getParticipants(d.pollId))
  })

  socket.on('viewResult', function(d){
    io.to(d.pollId).emit('endGame', d.endGame)
  })

  socket.on('totPoints', function(d){
    io.to(d.pollId).emit('pointsForQuestion', data.getPoints(d.pollId, d.event, d.participantId))
  })

  socket.on('getAllParticipants', function(pollId){
    io.to(pollId).emit('collectParticipants', data.getParticipants(pollId))
  })

  socket.on('hasAnswered', function(pollId){
    io.to(pollId).emit('aPersonHasAnswered', pollId)
  })

  socket.on('reorder', function(d) {
    data.reorder(d)
    socket.emit('fullPoll', data.getPoll(d.pollId))
  })

  socket.on('nextQuestion', function(d) {
    io.to(d.pollId).emit('updateQuestion', d.questionNumber)
  })

  socket.on('showCorrectAnswer', function(pollId){
    io.to(pollId).emit('setTimeToZero', pollId)
  })
}

module.exports = sockets;