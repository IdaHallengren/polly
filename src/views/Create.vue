<template>

  <div class="headlines">
    <div >Overview</div>
    <div> Presentation </div>
    <div> Edit question</div>
  </div>

  <div class="wrapper">

    <div id="overview"> </div>


<div id="presentation">
    <div>

    </div>
  <br>


    <div></div>
    <div></div>

    <div >
<!--      {{uiLabels.question}}:-->
      <input class="questionInput" type="text" v-model="question" placeholder="Write your question here" >

      <div>
        <br>
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">


        <button v-on:click="addAnswer">

          Add answer alternative
        </button>
        <br>
      </div>
    </div>
  <br>
    <div>
    <button v-on:click="addQuestion">
      Add question
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    </div>



    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>


  <div class="editQuestion">
    <div id="v-model-select" class="typeOfQuestion">
      <label> Choose type of question </label>
      <select>
        <option> Quiz </option>
        <option> Voting </option>
        <option > True or False </option>


      </select>
      <!--      <span> Selected: {{ selected }}</span>-->
    </div>
  </div>
  </div>



  Poll link:
  <input type="text" v-model="pollId">
  <button v-on:click="createPoll">
    Create poll
  </button>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>

<style>



.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  grid-gap: 2px;
  font-family: AppleGothic;
}

#overview{

  border:solid;
  border-radius: 10%;
  background-color: beige;

}

#presentation{
  border: solid;
  border-radius: 5%;

}

.headlines{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  font-size: 50px;

}

.editQuestion{
  border: solid;
  border-radius: 5%;
  margin: 2px;
}

.questionInput{
  height: 100px;
  width: 400px;
  font-size: 30px;
  max-width: 400px;
}

</style>