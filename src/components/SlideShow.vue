<template>

<div class="wrapperSlideShow">
  <div id="slides">
    <div v-show="overviewUser" class="overview">{{questions}}<br></div>
    <div v-show="!overviewUser" id="questionHeader" >{{questions}}<br></div>
    <div class="answerLayout">
      <div id="oneQuestion" v-for="(answer, key) in answers" v-bind:key="'answer'+key" >

        <div v-show="!questionMaster" >
          <div v-if="canClick()">
            <button v-if="timePassed < timeForQuestion" class="selectedAnswer" v-on:click="saveAnswer(answer)">{{answer}}</button>
          </div>
          <div class="hasAnswered" v-if="!canClick() && timePassed < timeForQuestion">
            {{answer}}
          </div>
          <div class="correctAnswer" v-if="answer === correctAnswer && timePassed >= timeForQuestion">
            {{answer}}
          </div>
          <div class="wrongAnswer" v-if="answer !== correctAnswer && timePassed >= timeForQuestion">
            {{answer}}
          </div>
        </div>

        <div v-show="questionMaster && !overviewUser">
          <div v-if="timePassed < timeForQuestion" class="AnswerQuestionMasters">
            {{answer}}
          </div>
          <div v-if="answer === correctAnswer && timePassed >= timeForQuestion" class="correctAnswer">
            {{answer}}
          </div>
          <div v-if="answer !== correctAnswer && timePassed >= timeForQuestion" class="wrongAnswer">
            {{answer}}
          </div>
        </div>

        <div v-show="questionMaster && overviewUser" class="AnswerQuestionMasterOverview">
          {{answer}}
        </div>
      </div>
    </div>
  </div>
  <div id="app" v-if="!overviewUser">
    <Timer :time-left="timeLeft" v-bind:timeLimit="this.timeForQuestion"></Timer>

    <div id="textForPhones">

      <div class="showPoints"> {{ uiLabels.PointsForThisQuestion }}  <br> {{this.pointsForQuestion}} </div>

      <div class="showPoints" v-if="!questionMaster"><br> {{ uiLabels.yourTotalPoints }} <br>{{this.yourPoints}} </div>

      <div class="showPoints" v-if="questionMaster"> {{uiLabels.totalAnswered}} <br> {{this.totalParticipantsAnswered}} / {{this.participantsLength}}</div>
    </div>

  </div>
</div>

</template>

<script>
import Timer from "../components/Timer";

export default {
  name: "SlideShow",
  components: {
    Timer,
  },

  props: {
    uiLabels: Object,
    questions: String,
    pollId: String,
    answers: Array,
    questionMaster: Boolean,
    overviewUser: Boolean,
    timeForQuestion: Number,
    pointsForQuestion: Number,
    correctAnswer: String,
    yourPoints: Number,
    totalParticipantsAnswered: Number,
    participantsLength: Number,
  },

  data: function () {
    return {
      lang: "",
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
        this.$emit('timePassed', this.timeForQuestion- this.timePassed)
        return this.timeForQuestion - this.timePassed
    }
  },

  methods:{

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
      console.log("testar om svar kommer", this.answer)
      this.$emit('hasAnswerd')
      if (this.answer === this.correctAnswer) {
        this.$emit('pointsCollected', Math.trunc(this.pointsForQuestion*(this.timeLeft/this.timeForQuestion)))
      } else {
        console.log("FEL SVAR")
      }
    }
  },
}

</script>

<style scoped>

.showPoints{
  height: 7.5vh;
  font-size: 1.5vw;
  font-family: AppleGothic,sans-serif;
  font-weight: bold;
  position: center;
  margin-top: 15%;
  margin-right: 10%;
}

.wrapperSlideShow{
  display: grid;
  grid-template-rows: 90%;
  grid-template-columns: 78% 22%;
}

#slides {
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 90%;
  width: 85%;
  margin-right: 2em;
  margin-left: 2em;
  margin-top: 2em;
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
  height: 3.5vw;
  width: 25vw;
  font-size: 1.5vw;
}

.selectedAnswer:hover{
  background: #57A0D3;
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
  margin-right: 10%;
}

.AnswerQuestionMasterOverview{
  display: grid;
  margin-bottom: 15%;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  margin-top: 5%;
  font-size: 0.8vw;
  place-content: center;
}

.AnswerQuestionMasters{
  background-color: gray;
  font-size: xx-large;
  border-radius: 1vw;
}
.styleYourPoints{
  font-size: 1.5vw;
}

#app {
  right: 5%;
  margin-top: 20%;
}

.correctAnswer {
  background-color: #1d823c;
  font-weight: bold;
  font-size: 2vw;
  animation: blinker 0.5s linear;
  animation-iteration-count: 3;
  border-radius: 1vw;
}

.wrongAnswer {
  background-color: #ed3632;
  font-size: 2vw;
  border-radius: 1vw;
}

.hasAnswered{
  background-color: gray;
  border-radius: 1vw;
  font-size: 2vw;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrapperSlideShow{
    display: grid;
    grid-template-rows: 40% 60%;
    grid-template-columns: 50% 50%;

  }
  #slides{
    grid-row: 2;
    grid-column: span 2;
    height: 90%;
    width: 85%;
  }

  #app{
    grid-column: span 2;
    grid-row: 1;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    place-items: center;
    margin-top: 15%;
    margin-bottom: 10%;
  }

  #textForPhones{
    margin-right: 15%;
    margin-left: -30%;
    margin-bottom: 5%;
  }

  .showPoints{
    font-size: 3vw;
  }

  .selectedAnswer{
    height: 5vw;
    width: 30vw;
    font-size: 4vw;
  }

  .wrongAnswer {
    font-size: 3.5vw;
  }

  .correctAnswer {
    font-size: 3.5vw;
  }
}

</style>