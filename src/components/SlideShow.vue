<template>

  <div id="slides">
<!--    <div v-for="questions in question" v-bind:key="questions">-->
<!--      {{questions.q }} {{questions.a}}-->
<!--    </div>-->
    <div id="test">
      <button v-on:click="nextQuestion"> hej </button>
      {{fullPoll}}
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
      questionNumber: 1
  }},
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;

    socket.on('fullPoll', (myPoll) =>
        this.fullPoll = myPoll)

    console.log(this.fullPoll)
  },

  methods:{
  nextQuestion: function () {
    socket.emit("getPoll", this.pollId);  //Byt poll id till sträng med aktivt poll id så funkar det
    this.questionNumber++;
  }
}}
</script>

<style scoped>

#slides {
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 700px;
  width: 90%;
  margin: 10px;
}

</style>