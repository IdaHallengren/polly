<template>

  <!-- Style for the background, Created by Chris Smith -->
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>

  <div v-show="!letsPlayButton">
    <div v-show="!startPoll">
      <button class="cancel" v-on:click="cancelPage"><span class='buttonText'>{{uiLabels.cancelButton}}</span></button>
      <div class="headlines">
        <div> {{uiLabels.overview}} </div>
        <div> {{uiLabels.presentation}} </div>
        <div> {{uiLabels.editQuestion}}</div>
      </div>

      <div class="createPoll">

        <!-- Overview -->
        <div id="overview">
          <div v-if="drag" class="buttonText"> {{uiLabels.clickDrag}}</div>
          <button class="dragFalse" v-on:click="dragAvailable()" v-bind:class="{'dragTrue': drag, 'dragFalse': !drag }">
            <span class="buttonText"> {{uiLabels.edit}}  </span>
          </button>

        <DragDrop class="overviewPresentationSlide"
                  v-on:reorderDisplay="reorderDisplay($event)"
                  v-on:drop="reorder()"
                  v-bind:questions="fullPoll['questions']"
                  v-bind:fullPoll="fullPoll"
                  v-bind:uiLabels="uiLabels"
                  v-bind:drag="drag">

        </DragDrop>

      </div>

        <!-- Presentation -->
        <div id="presentation">
          <div>
            <textarea class="questionInput" v-model="question" :placeholder= "'Write your question here'" ></textarea>
            <div class="answers" >
              <br>
              <div>
                <div class="answerBox">
                <span v-for="(answer, i) in answers" v-bind:key="'answer'+i">
                  {{answerOptions[i]}}
                  <input v-model="answers[i]" class="answersStyle">
                </span>
                </div>
                <div>
                  <button v-if="answers.length > 1" v-on:click="removeAnswer" class="icon-btn add-btn">
                    <span class="btn-txt">{{ uiLabels.removeAlternative }}</span>
                  </button>
                  <button v-if="answers.length < 4" v-on:click="addAnswer" class="icon-btn add-btn" >
                    <span class="add-icon"></span><span class="btn-txt">{{ uiLabels.addAlternative }}</span>
                  </button>
                </div>
                <br>
              </div>
              <div>
                <span class="correctAnswer">{{ uiLabels.correctAnswer }}:</span> <br>
                <label v-for="(answer, i) in answers" v-bind:key="'answer' + i" class="correctAnswer">
                  <input type="radio" name="test" v-bind:id="answer" v-bind:value="i" v-model="correctIndex" >
                  {{answerOptions[i]}}
                  <br>
                </label>
              </div>
              <br>
            </div>
          </div>
        </div>

        <!-- Edit question -->
        <div id="editQuestion">
          <div id="chooseHeadline"> {{uiLabels.choose}} </div>
          <div id="v-model-select-time" class="timeForQuestion">
            <label class="labelsText">{{uiLabels.chooseTimeForQuestion }} </label>
            <br>
            <select v-model="timeForQuestion" style="width: 30%">
              <option v-for="index in 10" :key="index" v-bind:value="5*index" > {{5*index}} </option>
            </select>
          </div>
          <div id="v-model-select-points" class="pointsForQuestion">
            <label class="labelsText"> {{ uiLabels.choosePointsForQuestion}}</label>
            <br>
            <select v-model="pointsForQuestion" style="width: 30%" >
              <option v-for="index in 6" :key="index" v-bind:value="5*index"> {{5*index}} </option>
            </select>
          </div>

          <button v-on:click="removeSlide"  class="removeSlides"><span class="buttonText"> {{ uiLabels.removeSlide }} </span></button>
          <button v-on:click="addSlide" class="addSlides" ><span class="buttonText"> {{ uiLabels.addSlide }} </span> </button>

          <div v-on:click= "startPoll= !startPoll" >
            <button class="continue" v-on:click="createPoll"><span class="buttonText">{{ uiLabels.createPoll }}</span></button>
          </div>
        </div>

        <button class="noSelect" v-on:click="cancelPage"><span class="buttonText"> {{ uiLabels.backButton }} </span></button>
      </div>
    </div>

    <!--  Waitingroom -->
    <div v-show="startPoll" class="wrapperWaitRoom">
      <div> </div>
      <div>
        <button class="cancel" v-on:click="cancelPage"><span class="buttonText">{{uiLabels.cancelButton}}</span></button>
      </div>
      <div>
        <div class="pollIdStyle">
          PollId: {{pollId}}
        </div>
        <div class="pollLink">
          Link: {{`http://localhost:8080/#/poll/${this.pollId}/${this.lang}`}}
        </div>
        <div id="QRCode">
          <!-- QR-code taken from: https://www.npmjs.com/package/qrcode.vue -->
          <qrcode-vue :value="`https://pollifyquiz.herokuapp.com/#/poll/${this.pollId}/${this.lang}`"  :size="300" >  </qrcode-vue>
        </div>
      </div>

      <div>
        <p class="waitingroomHeadline"> {{ uiLabels.waitingRoom }}</p>
        <form class = "waitingRoom">
          <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">
          <span v-if="participants.length>0">
            <img class="participants" :src="participant.participantImg">
            <br>
            {{participant.participantName}}
          </span>
          </div>
        </form>
      </div>

      <div>
        <button class="noSelect" v-on:click="startPoll=!startPoll"><span class="buttonText"> {{ uiLabels.backButton }} </span></button>
      </div>

      <div v-on:click="letsPlayButton=!letsPlayButton , overviewUser=!overviewUser  ">
        <button class="continue" v-on:click="letsPlay"><span class="buttonText"> {{ uiLabels.letsPlay }} </span></button>
      </div>
    </div>
  </div>

  <!-- Starting poll -->
  <div v-if="letsPlayButton === true" class="layoutQuestionmaster">
    <SlideShow class="overviewSlideShow"
               v-bind:questions="fullPoll['questions'][questionNumber].q"
               v-bind:answers="fullPoll['questions'][questionNumber].a"
               v-bind:pollId="pollId"
               v-bind:uiLabels="uiLabels"
               v-bind:index="questionNumber"
               v-bind:questionMaster="questionMaster"
               v-bind:overviewUser="overviewUser"
               v-bind:pointsForQuestion="fullPoll['questions'][questionNumber].pointsForQuestion"
               v-bind:timeForQuestion="fullPoll['questions'][questionNumber].timeForQuestion"
               v-bind:correctAnswer="fullPoll['questions'][questionNumber].correctAnswer"
               v-bind:totalParticipantsAnswered="this.totalParticipantsAnswered"
               v-bind:participantsLength="this.participantsLength"
               v-on:timePassed="totalTimeLeft($event)"
    >

    </SlideShow>

    <div v-if="this.timeLeft>1 ">
      <button class="showResultButton" v-on:click="showCorrectAnswer() "> Show correct answer </button>
    </div>
    <div v-if="this.timeLeft===1">
      <button  class="nextQuestion" v-if="this.questionNumber < allQuestions.length-1 " v-on:click="nextQuestion"> {{uiLabels.nextQuestion}} </button>
      <button  class="nextQuestion" v-show="this.questionNumber === allQuestions.length-1 " v-on:click="finish('result')">{{uiLabels.viewResult}}</button>
    </div>
  </div>

</template>

<script>
import QrcodeVue from 'qrcode.vue'
import DragDrop from '../components/DragDrop.vue'
import io from 'socket.io-client';
import SlideShow from "../components/SlideShow.vue";

const socket = io();

export default {
  name: 'Create',
  components: {
    SlideShow,
    QrcodeVue,
     DragDrop,
  },

  data: function () {
    return {
      lang: "",
      uiLabels: {},
      pollId: "",
      data: {},
      drag: false,

      //One question with answers
      question: "",
      answers: ["", ""],
      correctIndex:0,
      questionNumber: 0,

      //Info about questions
      timeForQuestion: 20,
      pointsForQuestion: 5,
      correctAnswer: "",
      allQuestions:[],
      fullPoll: {},
      answerOptions: ['A','B','C','D'],

      //Hide and show
      showAnswerButton: true,
      startPoll: false,
      letsPlayButton: false,
      showGameStart: true,
      endgame: true,
      timeLeft:0,

      // For the SlideShow
      questionMaster: true,
      overviewUser: true,

      //Info about participants
      participants: [],
      participantName: "",
      participantImg: "",

      //Participants answering
      totalParticipantsAnswered: 0,
      participantsLength:0

    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    this.createPoll();

    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on("dataUpdate", (data) =>
        this.data = data)

    socket.on("dataUpdate", (myParticipant) =>
        this.participants = myParticipant)

    socket.on("pollCreated", (data) =>
        this.data = data)

    socket.on('fullPoll', (myPoll) => {
      this.fullPoll = myPoll
    })

    socket.on('participantsAdded', (myParticipant) => {
      this.participants = myParticipant
      this.participantsLength = this.participants.length
    })

    socket.on('aPersonHasAnswered', (pollId)=>{
      if(this.pollId===pollId){
        this.totalParticipantsAnswered+=1
      }
    })
  },

  methods: {

    reorderDisplay: function (d) {
      let moving = this.fullPoll.questions.splice(d.startDragIndex,1)
      this.fullPoll.questions.splice(d.newDragIndex,0, moving[0])
    },

    reorder: function () {
      socket.emit('reorder', {pollId: this.pollId, q: this.fullPoll.questions})
    },

    totalTimeLeft: function(event){
      if(this.timeLeft!=1) {
        this.timeLeft = event
      }
    },

    showCorrectAnswer: function(){
      this.fullPoll['questions'][this.questionNumber].timeForQuestion = 0
      this.timeLeft=1
      this.timePassed = 100
      socket.emit('showCorrectAnswer', this.pollId)
    },

    dragAvailable: function (){
      if( this.drag === false)
        return this.drag = true
      else
        this.drag = false
    },

    createPoll: function () {
      if(this.question!==""){
        this.addSlide()
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
        socket.emit('getPoll', this.pollId)
      }
      else {
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
        socket.emit('getPoll', this.pollId)
      }
    },

    addQuestion: function () {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        questionNumber: this.questionNumber,
        timeForQuestion: this.timeForQuestion,
        pointsForQuestion: this.pointsForQuestion,
        correctAnswer: this.answers[this.correctIndex]
      });

      this.question = "";
      for(let i= 0; i < this.answers.length; i++){
        this.answers[i]= "";
      }
    },

    addAnswer: function () {
      if(this.answers.length<4){
        this.answers.push("")}
      else
        this.answers()
    },

    removeAnswer: function () {
      if (this.answers.length === 1) {
        this.answers();
      }
      this.answers.pop();
    },

    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      this.questionNumber++;
    },

    addSlide: function () {
      this.allQuestions.push(this.question)
      this.addQuestion()
      this.runQuestion()
      this.answers = ["", ""];
      this.timeForQuestion=20;
      this.pointsForQuestion=5;
      this.correctIndex=0;
      socket.emit('getPoll', this.pollId)
    },

    finish: function(route) {
      if (route === 'result') {
        this.$router.push(`/result/${this.pollId}/${this.lang}`)
        socket.emit('viewResult', {pollId: this.pollId, endGame: this.endGame})
      }
    },

    nextQuestion: function () {
      this.timeLeft=0
      this.fullPoll['questions'][this.questionNumber].timeForQuestion = 0
      this.totalParticipantsAnswered=0
      this.questionNumber++;
      socket.emit('nextQuestion', {pollId: this.pollId,questionNumber: this.questionNumber })
      socket.emit('runQuestion', {pollId: this.pollId, questionNumber: this.questionNumber} )
      socket.emit('removeButtons', {pollId: this.pollId, isClicked: this.isClicked})
    },

    removeSlide: function() {
      socket.emit("removeSlide", {pollId: this.pollId, q: this.question, a: this.answers, timeForQuestion: this.timeForQuestion, pointsForQuestion: this.pointsForQuestion, correctAnswer: this.correctAnswer, questionNumber: this.questionNumber})
      this.allQuestions.pop();
      this.questionNumber--;
      this.runQuestion();
      socket.emit('getPoll', this.pollId)
    },

    cancelPage: function () {
      this.$router.push('/')
    },

    letsPlay: function () {
      socket.emit('startGame', {pollId: this.pollId, boolean: this.showGameStart})
      this.questionNumber = 0;
      socket.emit('runQuestion', {pollId: this.pollId, questionNumber: this.questionNumber})
    },
  }
}

</script>

<style>

.dragFalse{
  width: 20%;
  margin-left:70%;
  margin-top: 0.5em;
  position: relative;
  cursor: pointer;
  background-color: lightslategray;
  border-radius: 10%;
}

.dragTrue{
  width: 20%;
  margin-left:70%;
  margin-top: 0.5em;
  position: relative;
  cursor: pointer;
  background-color: orange;
  border-radius: 10%;
}

.dragTrue .buttonText{
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1vw;
  font-family: AppleGothic,sans-serif;
}

.headlines{
  margin-top: 1.5em;
  display: grid;
  grid-template-rows: 98% 2%;
  grid-template-columns: 25% 50% 25%;
  font-size: 3vw;
  font-family: AppleGothic,sans-serif;
  font-style: italic;
}

.createPoll{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  grid-gap: 2px;
  font-family: AppleGothic,sans-serif;
  height: 45em;
}

#overview{
  border:solid;
  border-radius: 8%;
  background-color: #d3d0c4;
  overflow: scroll;
  height: 70%;
}

#presentation{
  border: solid;
  border-radius: 8%;
  background-color: #f0efeb;
  height: 70%
}

#editQuestion{
  border: solid;
  border-radius: 8%;
  background-color: #d3d0c4;
  height: 70%
}

.overviewPresentationSlide{
  height: 50%;
  width: 100%;
}


.removeSlides{
  width: 40%;
  height: 8%;
  cursor: pointer;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: lightslategray;
  margin-bottom: 0.5em;
}

.removeSlides .buttonText{
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1vw;
  font-family: AppleGothic,sans-serif;
}

.removeSlides:hover{
  background: #ed3632;
}

.addSlides{
  width: 40%;
  height: 8%;
  cursor: pointer;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: lightslategray;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}

.addSlides .buttonText{
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1vw;
  font-family: AppleGothic,sans-serif;
}

.addSlides:hover{
  background:darkgreen;
}

.showResultButton{
  width: 10%;
  height: 7%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  background: #558564;
  margin-left: 32em;
  position: fixed;
  bottom: 4em;
  right:1em;
  transform: translateX(5%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.nextQuestion {
  width: 10%;
  height: 7%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  background: #558564;
  margin-left: 32em;
  position: fixed;
  bottom: 0.5em;
  right: 1em;
  transform: translateX(5%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.nextQuestion:hover {
  background: #1d823c;
}

.layoutQuestionmaster{
  display: grid;
  grid-template-columns: 95% 5%;
  grid-template-rows: auto;
}

.waitingroomHeadline{
  padding-right: 10%;
  font-size: 2.5vw;
  font-family: AppleGothic, sans-serif;
  font-weight: bold;
  color: white;
}

.labelsText{
  font-size: 2vw;
}

#chooseHeadline{
  font-size: 2.5vw;
  margin-top: 5%;
}

.noSelect{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.questionInput{
  height: 7em;
  max-height: 10em;
  width: 90%;
  font-size: 1vw;
  white-space: pre-wrap;
  font-family: AppleGothic,sans-serif;
  border-radius: 5%;
  margin-top: 5%;
  margin-bottom: 30%;
}

.timeForQuestion{
  font-size: 2vw;
  margin-bottom: 10%;
  margin-top: 10%;
}

.pointsForQuestion{
  font-size: 2vw;
  margin-bottom: 30%;
}

.answers{
  font-size: 1.5vw;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 0.1% 78% 20%;
}

.answersStyle{
  height: 5vh;
  width: 70%;
  font-size: 1.5vw;
  outline: none;
  border-radius: 10%;
  margin-top: 1%;
  place-content: center;
}

.correctAnswer{
  font-size: 1vw;
  margin-right: 4%;
}

.answerBox{
  display: grid;
  grid-template-columns: 50% 50%;
}

.pollIdStyle{
  width: 10em;
  margin-left: 20%;
  margin-top: 25%;
  text-align: center;
  font-size: 2.5vw;
  font-weight: bold;
  font-family: AppleGothic,sans-serif;
  color: white;
}

.pollLink{
  margin-top: 5%;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  font-family: AppleGothic,sans-serif;
  color: white;
}

#QRCode{
  margin-top: 2em;
}

.wrapperWaitRoom{
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 1% 70% 20%;
}

.waitingRoom{
  overflow: scroll;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-column: 2;
  border: 5px solid white;
  background-color: #D3D3D3;
  width: 50%;
  position: absolute;
  left: 40%;
  height: 80%;
}

.participants{
  width: 100px;
  height: 100px;
  border-radius: 100%;
  padding: 15px;
  position: relative;
  animation: bounce 0.7s infinite alternate;
}

.icon-btn {
  width: 50px;
  height: 50px;
  border: 1px solid #cdcdcd;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  transition: width 0.2s ease-in-out;
}

.add-btn:hover {
  width: 120px;
}

.add-btn::before,
.add-btn::after {
  transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 4px;
  width: 10px;
  top: calc(50% - 2px);
  background: plum;
}

.add-btn::after {
  right: 14px;
  overflow: hidden;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

.add-btn::before {
  left: 14px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}

.icon-btn:focus {
  outline: none;
}

.btn-txt {
  opacity: 0;
  transition: opacity 0.2s;
}

.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}

.add-btn:hover .btn-txt {
  opacity: 1;
}

.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 20px;
  width: 2px;
  top: calc(50% - 10px);
  background: plum;
  overflow: hidden;
}

.add-icon::before {
  left: 22px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

}
.add-icon::after {
  right: 22px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}

/* Personal altered buttons with source code from Chance Squires*/
.cancel{
  width: 6%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #EF6461;
  margin-right: 0.5%;
  margin-bottom: 0.5em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

.cancel .buttonText {
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.cancel:hover {
  background: #ed3632;
}

/* Personal altered buttons with source code from Chance Squires*/
.continue{
  width: 7%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
  margin-left: 32em;
  position: fixed;
  bottom: 0.5em;
  right:0.5em;
}

.continue .buttonText {
  transform: translateX(5%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.continue:hover {
  background: #1d823c;
}

/* Personal altered buttons with source code from Chance Squires*/
.noSelect{
  width: 7%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
  left: 0.5em;
  margin-top:1.5em;
}

.noSelect .buttonText {
  transform: translateX(34%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
  margin-left: 1vw;
}

.noSelect:hover {
  background: #1d72f0;
}

/*testar ändra bakgrund även på create */

.bg {
  animation:slide 23s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #BB8FCE 50%, #ea9c8c 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}
.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:23s;
}
.bg3 {
  animation-duration:23s;
}
@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
@keyframes bounce {
  from {
    transform: translateY(0vh);
  }
  to {
    transform: translateY(-1.5vh);
  }
}

</style>