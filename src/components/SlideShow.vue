<template>
<div class="wrapper">



  <div id="slides">

    <div v-for="questions in question" v-bind:key="questions">
      {{questions.q }}
      {{questions.a}}


    <div v-for="(allQuestions) in fullPoll" v-bind:key="allQuestions">
      {{allQuestions}}

    </div>
<!--{{fullPoll}}-->

    <div id="test">

      <div v-show="this.questionNumber < this.number">
      <button v-on:click="nextQuestion"> Next question </button>
      </div>
<!--        {{fullPoll}}-->
      {{this.questionNumber}}
        {{this.question}}
     <div v-for= "answer in answers" v-bind:key="answer">
      {{answer}}

     </div>

    <button v-on:click="nextQuestion"> hej </button>

    </div>
    <button v-show="this.questionNumber == this.number" v-on:click="finish ('/result/')">View Result</button>

  </div>
</div>
</div>

</template>

<script>






import io from 'socket.io-client'
const socket = io();

export default {
  name: "SlideShow",



  data: function () {
    return {
      lang: "",
      pollId: "",
      fullPoll: {},
      questionNumber: 0,
      question: "",
      answers: [],
      number: 1
  }},
  created: function () {

    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;

    socket.emit("getPoll", this.pollId);
    socket.on('fullPoll', (myPoll) =>
        this.fullPoll = myPoll)

    console.log(this.fullPoll)
  },

  methods:{
  nextQuestion: function () {
    this.number = this.fullPoll.questions.length;
    socket.emit("getPoll", this.pollId);
    this.question = this.fullPoll["questions"][this.questionNumber].q
    this.answers = this.fullPoll["questions"][this.questionNumber].a
    if(this.questionNumber <= this.fullPoll["questions"].length)  {
        this.questionNumber++;
  }}
},
  finish: function(route) {
    if (route === 'result') {
      this.$router.push(`/result/${this.pollId}/${this.lang}`)
    }
  }


}
</script>

<style scoped>
.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 95% 5%;
}

#slides {
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 700px;
  width: 85%;
  margin: 10px;
}

</style>