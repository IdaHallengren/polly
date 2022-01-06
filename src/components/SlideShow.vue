<template>


<div class="wrapper"      @drop="onDrop($event, questions)"
     @dragenter.prevent
     @dragover.prevent>
  <div id="slides" draggable="true" @dragstart="startDrag($event, questions)">

    <div v-show="overviewUser" class="overview">{{questions}}<br></div>

      <div id="questionHeader" v-show="!overviewUser">{{questions}}<br></div>

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
  </div><div id="app" v-if="!overviewUser">
    <Timer :time-left="timeLeft" v-bind:timeLimit="this.timeForQuestion"></Timer>
  </div>
</div>
</template>

<script>
 // import io from 'socket.io-client'
 import Timer from "../components/Timer";
 // const socket = io();



export default {
  name: "SlideShow",
   components: {
       Timer
   },


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
      isClicked:{},
      timePassed: 0,
      timerInterval: null,
    }},



  watch: {
    questions: {
      handler: function () {
        this.startTimer();
      },
      immediate: true
    }
  },

  computed: {
    timeLeft() {
      if(this.timeForQuestion - this.timePassed <= 0) {
        return 0
      }
      else
        return this.timeForQuestion - this.timePassed
    }
  },
  created: function () {
/*    socket.on("sendQuestions", (activeQuestion) =>
        this.question = activeQuestion)*/
  },

  mounted() {

  },

  methods:{

    startDrag: function(event, item){
      console.log(item)
      event.dataTransfer.dropEffect='move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemId', item.id)
    },

     onDrop: function(event, list){
      const itemId = event.dataTransfer.getData('itemId')
      const item = this.item.find(list = item.id === itemId)
       item.list = list

     },

    startTimer() {
      if(this.timerInterval != null){
        clearInterval(this.timerInterval)
        this.timePassed = 0
      }
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    canClick: function(){
         return !this.isClicked[this.questions]

    },

    saveAnswer: function (answer){
        this.answer = answer
        this.isClicked[this.questions] = true
        // socket.emit('changingBoolean', this.isClicked)
        console.log("testar om svar kommer", this.answer)
        if (this.answer === this.correctAnswer) {
          console.log("KORREKT SVAR")
          this.pointsCollected = this.pointsCollected + this.pointsForQuestion
          this.$emit('pointsCollected', this.pointsForQuestion)
          console.log("testar poang", this.pointsCollected)
        } else {
          console.log("FEL SVAR")
        }


    }

},
}

</script>

<style scoped>
.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 80% 20%;
}

#slides {
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 80%;
  width: 85%;
  margin: 2em;
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
  margin-left: 10%;
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
  font-size: 1.3vw;
  place-content: center;
  padding-right: 4vw;
}

.AnswerQuestionMasters:before {
  content:"•";
  padding-left: 10vw;
}

#app {
  position: absolute;
  right: 5%;
  top: 15%;
}

</style>