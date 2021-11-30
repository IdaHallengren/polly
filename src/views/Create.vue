<template>

  <div class="headlines">
    <div >Overview</div>
    <div> Presentation </div>
    <div> Edit question</div>
  </div>

  <div class="wrapper">
    <div id="overview">
    </div>


<div id="presentation">
    <div>

    </div>
  <br>


    <div></div>
    <div></div>

    <div>
<!--      {{uiLabels.question}}:-->
      <input class="questionInput" type="text" v-model="question" placeholder="Write your question here" >

      <p class="marginPresentation"> </p> <!--This is to put the whitespace between the question and the answers-->


      <div class="answers">
        <br>
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i"
            class="answersStyle"
        >


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
    <div id="v-model-select-question" class="typeOfQuestion">
      <label> Choose type of question </label>
      <select>
        <option> Quiz </option>
        <option> Voting </option>
        <option > True or False </option>
        <option > Presentation </option>


      </select>
      <!--      <span> Selected: {{ selected }}</span>-->
    </div>


    <div id="v-model-select-time" class="timeForQuestion">
      <label> Choose time for this question </label>
      <br>
      <select>
        <option> 5s </option>
        <option> 10s </option>
        <option > 15s </option>
        <option > 20s </option>
        <option > 25s </option>
        <option > 30s </option>
        <option > 35s </option>
        <option > 40s </option>
        <option > 45s </option>
        <option > 50s </option>
        <option > 55s </option>
        <option > 60s </option>
      </select>
      <!--      <span> Selected: {{ selected }}</span>-->
    </div>

    <div id="v-model-select-points" class="pointsForQuestion">
      <label> Choose points for this question </label>
      <br>
      <select>
        <option> 5p </option>
        <option> 10p </option>
        <option > 15p </option>
        <option > 20p </option>
        <option > 25p </option>
        <option > 30p </option>
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
  font-size: 40px;

}

.editQuestion{
  border: solid;
  border-radius: 5%;
  margin: 2px;
}

.questionInput{
  height: 100px;
  width: 600px;
  font-size: 30px;
  max-width: 8000px;
}


.marginPresentation{
  margin-bottom: 400px;
}

.typeOfQuestion{

  font-size: 20px;
  margin-bottom: 30px;
}

.timeForQuestion{
  font-size: 20px;
  margin-bottom: 30px;
}


.pointsForQuestion{
  font-size: 20px;
}


.answers{
  font-size: 20px;
}

.answersStyle{
  height: 30px;
  width: 150px;
  font-size: 15px;

}

</style>