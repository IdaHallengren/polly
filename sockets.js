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

    data.addQuestion(d.pollId, {q: d.q, a: d.a, type: d.type, time: d.time});

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
      data.removeQuestion(d.pollId, {q: d.q, a: d.a});
      socket.emit('dataUpdate', data.getAnswers(d.pollId));
    })


  socket.on('startGame' , function(pollId, boolean){
     io.to(pollId).emit('gameStart', boolean)
  })








  socket.on('removeParticipant', function(d){
    data.removeParticipant(d.pollId , {participantName: d.participantName, participantId: d.participantId, participantImg: d.participantImg})
    io.to(d.pollId).emit('dataUpdate', data.getParticipants(d.pollId))

  })


}



module.exports = sockets;