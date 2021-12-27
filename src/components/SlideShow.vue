<template>


<div class="wrapper">

  <div id="slides">
    {{pointsForQuestion}}
    {{typeOfQuestion}}
    {{timeForQuestion}}
    {{correctAnswer}}

    <div v-show="overviewUser" class="overview">{{questions}}<br>
    </div>

      <div id="questionHeader" v-show="!overviewUser">{{questions}}<br>
      </div>


    <div class="answerLayout">
      <div id="oneQuestion" v-for="(answer, key) in answers" v-bind:key="'answer'+key" >
          <div v-show="!questionMaster" >
            <div v-if="canClick()">

             <button id="testMe" class="selectedAnswer" v-on:click="saveAnswer(answer)">
               {{answer}}
             </button>

            </div>
            <div v-if="!canClick()" >
              {{answer}}
            </div>
          </div>

        <div v-show="questionMaster && !overviewUser" class="AnswerQuestionMasters">
          {{answer}}
        </div>
          <div v-show="questionMaster && overviewUser" class="AnswerQuestionMasterOverview">
            {{answer}}
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
    questions: String,
    pollId: String,
    index: String,
    answers: Array,
    questionMaster: Boolean,
    overviewUser: Boolean,
    timeForQuestion: Number,
    typeOfQuestion: String,
    pointsForQuestion: Number,
    correctAnswer: Array,


  },


  data: function () {
    return {
      lang: "",
      fullPoll: {},
      questionNumber: 0,
      number: 1,
      pointsCollected: 0,
      isClicked:{}

  }},
  created: function () {

  },

  methods:{

    canClick: function(){
      return !this.isClicked[this.questions]
    },

    saveAnswer: function (answer){
      this.answer=answer
      this.isClicked[this.questions]=true
      // socket.emit('changingBoolean', this.isClicked)
      console.log("testar om svar kommer", this.answer)
       if(this.answer===this.correctAnswer){
         console.log("KORREKT SVAR" )
          this.pointsCollected=this.pointsCollected+this.pointsForQuestion
         console.log("testar poang", this.pointsCollected)
       }
       else{
         console.log("FEL SVAR")
       }
    }

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
  height: 90%;
  width: 85%;
  margin: 10px;
}

#questionHeader {
  font-size: 4vw;
  margin-top: 5%;
}

.overview{
  font-size: 1vw;
  margin-top: 5%;
  place-content: center;
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

.AnswerQuestionMasterOverview{
  display: grid;
  margin-bottom: 15%;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  margin-top: 5%;
  font-size: 0.8vw;
  place-content: center;
  /*border:solid;*/
  /*height: 5vw;*/
  /*width: 25vw;*/
}

.AnswerQuestionMasters{

  display: grid;
  margin-bottom: 15%;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  margin-top: 5%;
  font-size: 4vw;
  place-content: center;
  padding-right: 5vw;
}

.AnswerQuestionMasters:before {
  content:"•";
  padding-left: 10vw;
}

</style>