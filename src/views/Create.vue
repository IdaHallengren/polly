


<template>


<div v-show="letsPlayButton">
  <div v-show="startPoll">

    <div> </div>
    <div> </div>
    <button class="cancel" v-on:click="cancelPage">
      <span class='text'>{{uiLabels.cancelButton}}</span>
    </button>

  <div class="headlines">
    <div> {{uiLabels.overview}} </div>
    <div> {{uiLabels.presentation}} </div>
    <div> {{uiLabels.editQuestion}}</div>
  </div>

  <div class="wrapper">
    <div id="overview">
        <SlideShow id="overviewPresentationSlide" v-for="(question, i) in fullPoll['questions']"
                   v-bind:key="question"
                   v-bind:questions="fullPoll['questions'][i].q"
                   v-bind:answers="fullPoll['questions'][i].a"
                   v-bind:pollId="pollId"
                   v-bind:uiLabels="uiLabels"
                   v-bind:questionMaster="questionMaster"
                   v-bind:overviewUser="overviewUser">
      </SlideShow>

      <button v-on:click="removeSlide" class="icon-btn add-btn" >
       <span class="btn-txt"> {{ uiLabels.removeSlide }} </span>
      </button>
      <button v-on:click="addSlide" class="icon-btn add-btn" >
        <span class="add-icon"></span>
        <span class="btn-txt"> {{ uiLabels.addSlide }} </span> </button>

    </div>

    <div id="presentation" >
      <div>
      </div>
      <br>
      <br>

      <div></div>
      <div></div>

    <div>
<!--      {{uiLabels.question}}:-->
    <div v-if="typeOfQuestion!=='Presentation'"> <!--This is to change the input area for when it is a presentation-->
      <textarea class="questionInput"   v-model="question" :placeholder= "'Write your question here'" ></textarea>
    </div>

    <div v-if="typeOfQuestion==='Presentation'">
      <textarea class="presentationInput" v-model="presentation" :placeholder=" 'Write your presentation here'" ></textarea>
    </div>

    <p class="marginPresentation"> </p> <!--This is to put the whitespace between the question and the answers-->


    <div v-if="typeOfQuestion!=='Presentation'" class="answers" >
      <div>
        <br>
        {{ uiLabels.answers }}
      </div>
        <div class="answerBox">
        <input v-for="(_, i) in answers"
               v-model="answers[i]"
               v-bind:key="'answer'+i"
               class="answersStyle">


        <div v-if="typeOfQuestion==='Quiz' || typeOfQuestion==='Voting'" >

          <button v-on:click="removeAnswer" class="icon-btn add-btn">
            <span class="btn-txt">{{ uiLabels.removeAlternative }}</span>
          </button>

          <button  v-on:click="addAnswer" class="icon-btn add-btn" >
            <span class="add-icon"></span>
            <span class="btn-txt">{{ uiLabels.addAlternative }}</span>
          </button>
        </div>
        <br>
      </div>
  <div>

    <span>{{ uiLabels.correctAnswer }}:</span>

    <label v-for="(answer, i) in answers" v-bind:key="'answer' + i">
      <input type="radio" name="test" v-bind:id="answer" v-bind:value="i" v-model="correctIndex" >
      {{answerOptions[i]}}<br> </label>

    {{correctIndex}}
    {{selectedAnswer}}

  </div>
        <br>
      <div>
<!--        <button v-on:click="addQuestion">Add question</button>-->
<!--        <input type="number" v-model="questionNumber">-->
<!--        <button v-on:click="runQuestion">Run question</button>-->
<!--        {{data}}-->
      </div>
    </div>
  </div>
<!--    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->
  </div>
  <div id="editQuestion">
    <div id="v-model-select-question" class="typeOfQuestion">
      <br>
      <label class="labelsText"> {{ uiLabels.chooseTypeOfQuestion }} </label>
      <br>
      <select v-model="typeOfQuestion" style="width: 50%">
        <option value="Quiz" > Quiz </option>
        <option value="Voting"> {{ uiLabels.voting }} </option>
        <option value="TrueOrFalse" > {{ uiLabels.trueOrFalse }} </option>
        <option value="Presentation" > Presentation </option>
      </select>
<!--  <span> Selected: {{ showAnswerButton }}</span>-->
    </div>

    <div id="v-model-select-time" class="timeForQuestion" v-if="typeOfQuestion!=='Presentation'">
      <label class="labelsText">{{uiLabels.chooseTimeForQuestion }} </label>
      <br>
      <select v-model="timeForQuestion" style="width: 30%">
        <option v-for="index in 10" :key="index" v-bind:value="5*index" > {{5*index}} </option>
      </select>
      seconds
<!--       <span> Selected: {{ timeForQuestion }}</span>-->
    </div>

    <div v-if="typeOfQuestion!=='Presentation'" id="v-model-select-points" class="pointsForQuestion">
      <label class="labelsText"> {{ uiLabels.choosePointsForQuestion}}</label>
      <br>
      <select v-model.number="pointsForQuestion" style="width: 30%" >
        <option  > 5 </option>
        <option > 10 </option>
        <option > 15 </option>
        <option > 20 </option>
        <option > 25 </option>
        <option > 30 </option>
      </select>
    </div>

    <div v-on:click= "startPoll= !startPoll" >
      <button class="continue" v-on:click="createPoll">
        <span class='text'>{{ uiLabels.createPoll }}</span>
      </button>
    </div>
  </div>

    <button class="noSelect" v-on:click="cancelPage">
      <span class='text'> {{ uiLabels.backButton }} </span>
    </button>
  </div>

  Poll link:
  <input type="text" v-model="pollId">
</div>


<!--  NEXT PAGE  -->
  <div v-show="!startPoll" class="wrapperWaitRoom">
    <div> </div>
    <div>
      <button class="cancel" v-on:click="cancelPage"><span class='text'>{{uiLabels.cancelButton}}</span></button>
    </div>

    <div>
      <div class="pollIdStyle">
        PollId: {{pollId}}
      </div>
      <div id="QRCode">
        <qrcode-vue :value="`http://localhost:8080/#/poll/${this.pollId}/${this.lang}`"  :size="size" >  </qrcode-vue>
      </div>
    </div>


    <div>
      <h2 class="waitingroomHeadline"> {{ uiLabels.waitingRoom }}</h2>
      <form class = "waitingRoom">
        <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">
          <span v-if="participants.length>0">
          <img class="participants"
            :src="participant.participantImg">
        <br>
          {{participant.participantName}}
            </span>
        </div>
      </form>
    </div>

    <div>
      <button class="noSelect" v-on:click="startPoll=!startPoll">
        <span class='text'> {{ uiLabels.backButton }} </span>
      </button>
    </div>

    <div v-on:click="letsPlayButton=!letsPlayButton , overviewUser=!overviewUser  ">
      <button class="continue" v-on:click="letsPlay">
        <span class='text'> {{ uiLabels.letsPlay }} </span>
      </button>
    </div>
    </div>
</div>
  {{fullPoll["timeForQuestion"]}}
<!--NEXT PAGE-->

<div v-if="letsPlayButton === false" class="layoutQuestionmaster">

  <SlideShow class="overviewSlideShow"
             v-bind:questions="allQuestions[questionNumber]"
             v-bind:answers="allAnswers[questionNumber]"
             v-bind:pollId="pollId"
             v-bind:uiLabels="uiLabels"
             v-bind:index="questionNumber"
             v-bind:questionMaster="questionMaster"
             v-bind:overviewUser="overviewUser"
             v-bind:pointsForQuestion="pointsForQuestions[questionNumber]"
             v-bind:typeOfQuestion="typeOfQuestions[questionNumber]"
             v-bind:timeForQuestion="timeForQuestions[questionNumber]"
             v-bind:correctAnswer="correctAnswers[questionNumber]"
              >
  </SlideShow>

  <button  class="nextQuestion" v-if="this.questionNumber < allQuestions.length-1" v-on:click="nextQuestion"> Next question </button>
  <button  class="nextQuestion" v-show="this.questionNumber === allQuestions.length-1" v-on:click="finish('/result/')">View Result</button>
  {{this.allQuestions}}
  {{this.allAnswers}}
  {{this.typeOfQuestions}}
  {{this.timeForQuestions}}
  {{this.correctAnswers}}
  {{this.pointsForQuestions}}

  Timer:
  Amount of participants answered

</div>


</template>

<script>
import QrcodeVue from 'qrcode.vue'
import io from 'socket.io-client';
import SlideShow from "../components/SlideShow.vue";
const socket = io();


export default {
  name: 'Create',
  components: {
    SlideShow,
    QrcodeVue
  },

  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      presentation: "",
      answers: ["", ""],
      slides: {},
      questionNumber: 0,
      data: {},
      uiLabels: {},
      typeOfQuestion: 'Quiz',
      timeForQuestion: 5,
      pointsForQuestion: 5,

      typeOfQuestions: [],
      timeForQuestions:[],
      pointsForQuestions:[],

      showAnswerButton: true,
      startPoll: true,
      size: 300,
      letsPlayButton: true,
      fullPoll: {},

      number: 1,
      activeQuestion: {},
      allQuestions:[],
      allAnswers: [],
      participants: [],
      participantName: "",
      participantImg: "",
      answerOptions: ['A','B','C','D'],

      selectedAnswer: "",
      correctAnswers:[],

      showGameStart: true,

      // For the SlideShow
      questionMaster: true,
      overviewUser: true,



      correctIndex:0
    }
  },

  watch: {
    typeOfQuestion: function(newVal) {

      if (newVal === "Quiz" || newVal === "Voting")
        this.showAnswerButton = true
      else if (newVal ==='Presentation'){
        this.showAnswerButton = false
        //this.answers.length=0
        // this.timeForQuestion='60s'
        // this.pointsForQuestion='0p'
        // this.correctAnswers='null'
      }
      else
        this.answers.length=2
        this.showAnswerButton = false
    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;

    socket.emit('joinPoll', this.pollId)
    this.createPoll();

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

    socket.on('fullPoll', (myPoll) =>
        {this.fullPoll = myPoll
        })

    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )
  },

  methods: {
    createPoll: function () {
      this.addQuestion();
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
      console.log("Skickat info")
      socket.emit('getPoll', this.pollId)
    },

    addQuestion: function () {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        typeOfQuestion: this.typeOfQuestion,
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
        this.answers
    },

    removeAnswer: function () {
      if (this.answers.length === 1) {
        this.answers();
      }
      this.answers.pop();
    },

    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      this.questionNumber++; //Added this to increase the number for the question
    },

    addSlide: function () {
      this.allQuestions.push(this.question)
      this.typeOfQuestions.push(this.typeOfQuestion)
      this.timeForQuestions.push(this.timeForQuestion)
      this.pointsForQuestions.push(this.pointsForQuestion)
      this.correctAnswers.push(this.answers[this.correctIndex])
      console.log(this.correctIndex, this.answers, this.correctAnswers)
      console.log(this.answers[this.correctIndex])
      // this.selectedAnswer=""
      this.addQuestion()
      this.runQuestion() //Added this so that we get the questionnumber, but it can be made easier
      socket.emit('getPoll', this.pollId)
    },

     finish: function(route) {
      if (route === 'result') {
        this.$router.push(`/result/${this.pollId}/${this.lang}`)
      }
    },

    nextQuestion: function () {
      this.questionNumber++;
      this.allAnswers = this.fullPoll["questions"][this.questionNumber].a
      // socket.emit('dataUpdate', this.allAnswers, this.questionNumber)
      socket.emit('runQuestion', {pollId: this.pollId, questionNumber: this.questionNumber} )
      socket.emit('removeButtons', {pollId: this.pollId, isClicked: this.isClicked})
    },

    removeSlide: function() {
      socket.emit("removeSlide", {pollId: this.pollId, q: this.question, a: this.answers})
      this.allQuestions.pop();
      this.questionNumber--;
      // socket.emit("dataUpdate", {questionNumber: this.questionNumber});
      this.runQuestion();
      socket.emit('getPoll', this.pollId)
    },

    cancelPage: function () {
      this.$router.push('/')
    },

    letsPlay: function () {
      socket.emit('startGame', {pollId: this.pollId, boolean: this.showGameStart})
      this.questionNumber = 0;
      this.allAnswers = this.fullPoll["questions"][this.questionNumber].a
      socket.emit('runQuestion', {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}


</script>

<style>

.nextQuestion {
  width: 10%;
  height: 7%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  background: #558564;
  margin-left: 32em;
  position: fixed;
  bottom: 0.5em;
  right: 5em;

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
  font-family: AppleGothic,sans-serif;
  color: white;
}

.labelsText{
  font-size: 2vw;
}

.noSelect{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  grid-gap: 2px;
  font-family:  AppleGothic,sans-serif;

  height: 45em;
}

#overview{
  border:solid;
  border-radius: 2%;
  background-color: #D3D3D3;
  overflow: scroll;
  height: 70%;
}

#presentation{
  border: solid;
  border-radius: 2%;
  background-color: white;
  height: 70%
}

#editQuestion{
  border: solid;
  border-radius: 2%;
  background-color: #D3D3D3;
  height: 70%
}

.headlines{
  margin-top: 1.5em;
  display: grid;
  grid-template-rows: 98% 2%;
  grid-template-columns: 25% 50% 25%;
  font-size: 3vw;
  font-family: AppleGothic,sans-serif;

  font-weight: bold;
}

.questionInput{
  height: 7em;
  max-height: 10em;
  width: 90%;
  font-size: 1vw;
  white-space: pre-wrap;
  font-family: inherit;
  border-radius: 5%;
}

.presentationInput{
  height: 7em;
  max-height: 10em;
  width: 90%;
  font-size: 1vw;
  white-space: pre-wrap;
  font-family: inherit;
  border-radius: 5%;
}

.marginPresentation{
  margin-bottom: 28%;
}

.typeOfQuestion{
  font-size: 2vw;
  margin-bottom: 10%;
}

.timeForQuestion{
  font-size: 2vw;
  margin-bottom: 10%;
}

.pointsForQuestion{
  font-size: 2vw;
}

.answers{
  font-size: 1.5vw;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 15% 60% 25%;
}

.answersStyle{
  height: 5vh;
  width: 40%;
  font-size: 1.5vw;
  outline: none;
}

.selectCorrectAnswer:hover{
  background: green;
}

#overviewPresentationSlide{
  /*border:solid;*/
  /*border-radius: 10%;*/
  /*background-color: white;*/
  height: 35%;
  margin: 10px;
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
  height: 80%
}

.participants{
  width: 100px;
  height: 100px;
  border-radius: 100%;
  padding: 15px;
  position: relative;
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

.cancel .text {
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

.continue .text {
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

.noSelect .text {
  transform: translateX(34%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;

}

.noSelect:hover {
  background: #1d72f0;
}

.selectRightAnswer:hover{

}



</style>