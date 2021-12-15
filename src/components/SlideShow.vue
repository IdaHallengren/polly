<template>
<div class="wrapper">

  <div id="slides">


      <div id="questionHeader">{{questions}}<br>

      </div>
    <div class="answerLayout">


      <div id="oneQuestion" v-for="(answer, key) in answers" v-bind:key="'answer'+key">


          <div>



         <button class="selectedAnswer">{{answer}} </button>
          </div>


      </div>
      </div>



      <div> </div>



    </div>


  </div>



</template>

<script>






import io from 'socket.io-client'
const socket = io();

socket.on("sendQuestions", (activeQuestion) =>
    this.question = activeQuestion)

export default {
  name: "SlideShow",

  props: {
    uiLabels: Object,
    questions: Array,
    pollId: Number,
    index: Number,
    answers: Array
  },


  data: function () {
    return {
      lang: "",
      fullPoll: {},
      questionNumber: 0,
      number: 1
  }},
  created: function () {

    console.log("test om det funkar", this.question)
   /* socket.emit("getPoll", this.pollId);
    socket.on('fullPoll', (myPoll) =>
        this.fullPoll = myPoll)

    console.log(this.fullPoll)*/
  },

  methods:{
/*  nextQuestion: function () {
    this.number = this.fullPoll.questions.length;
    socket.emit("getPoll", this.pollId);
    this.question = this.fullPoll["questions"][this.questionNumber].q
    this.answers = this.fullPoll["questions"][this.questionNumber].a
    if(this.questionNumber <= this.fullPoll["questions"].length)  {
        this.questionNumber++;
  }}*/
},
 /* finish: function(route) {
    if (route === 'result') {
      this.$router.push(`/result/${this.pollId}/${this.lang}`)
    }
  }*/


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

#questionHeader {
  font-size: 5vw;
  margin-top: 5%;

}
.selectedAnswer{
  height: 5vw;
  width: 25vw;
  font-size: 1.5vw;

}

.selectedAnswer:hover{
  background: green;

}
.answerLayout{
  display: grid;
  margin-bottom: 25%;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  margin-top: 15%;




}
#oneQuestion{
  margin-bottom:10%;
  margin-left:8%;
  margin-right:8%;







}

</style>