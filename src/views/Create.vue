


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
<!--      <div id="slides">-->
      <div id="overviewPresentationSlide">
        {{fullPoll}}
      </div>
<!--      </div>-->

      <button v-on:click="removeSlide" class="icon-btn add-btn" >
       <div class="btn-txt"> {{ uiLabels.removeSlide }} </div>
      </button>
      <button v-on:click="addSlide" class="icon-btn add-btn" >
        <div class="add-icon"></div>
        <div class="btn-txt"> {{ uiLabels.addSlide }} </div> </button>

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
    <div v-if="typeOfQuestion!='Presentation'"> <!--This is to change the input area for when it is a presentation-->
      <textarea class="questionInput" type="text"  v-model="question" placeholder="Write your question here" ></textarea>
    </div>

    <div v-if="typeOfQuestion==='Presentation'">
      <textarea class="presentationInput" type="text" v-model="presentation" placeholder="Write your presentation here"></textarea>
    </div>

    <p class="marginPresentation"> </p> <!--This is to put the whitespace between the question and the answers-->

    <div v-if="typeOfQuestion!='Presentation'" class="answers" >
      <div>
        <br>
        {{ uiLabels.answers }}
        <input v-for="(_, i) in answers"
               v-model="answers[i]" 
               v-bind:key="'answer'+i"
               class="answersStyle">

        <div v-if="typeOfQuestion==='Quiz' || typeOfQuestion==='Voting'" >

          <button v-on:click="removeAnswer" class="icon-btn add-btn">
            <div class="btn-txt">{{ uiLabels.removeAlternative }}</div>
          </button>

          <button  v-on:click="addAnswer" class="icon-btn add-btn" >
            <div class="add-icon"></div>
            <div class="btn-txt">{{ uiLabels.addAlternative }}</div>
          </button>
        </div>

        <br>
      </div>

        <br>

      <div>
        <button v-on:click="addQuestion">Add question</button>

        <input type="number" v-model="questionNumber">

        <button v-on:click="runQuestion">Run question</button>
        {{data}}
      </div>
    </div>
  </div>


    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>


  <div id="editQuestion">
    <div id="v-model-select-question" class="typeOfQuestion">
      <br>
      <label class="labelsText"> {{ uiLabels.chooseTypeOfQuestion }} </label>
      <br>
      <select v-model="typeOfQuestion" style="width: 50%">
        <option value="quiz" > Quiz </option>
        <option value="voting"> {{ uiLabels.voting }} </option>
        <option value="trueorfalse" > {{ uiLabels.trueOrFalse }} </option>
        <option value="presentation" > Presentation </option>
      </select>
<!--  <span> Selected: {{ showAnswerButton }}</span>-->

    </div>

    <div id="v-model-select-time" class="timeForQuestion" v-if="typeOfQuestion!='Presentation'">
      <label class="labelsText">{{uiLabels.chooseTimeForQuestion }} </label>
      <br>
      <select v-model="timeForQuestion" style="width: 30%">
        <option > 5s </option>
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
<!--       <span> Selected: {{ timeForQuestion }}</span>-->
    </div>

    <div v-if="typeOfQuestion!='Presentation'" id="v-model-select-points" class="pointsForQuestion">
      <label class="labelsText"> {{ uiLabels.choosePointsForQuestion}}</label>
      <br>
      <select v-model="pointsForQuestion" style="width: 30%">
        <option > 5p </option>
        <option > 10p </option>
        <option > 15p </option>
        <option > 20p </option>
        <option > 25p </option>
        <option > 30p </option>
      </select>
<!--      <span> Selected: {{ pointsForQuestion }}</span>-->
    </div>

    <div v-on:click= "startPoll= !startPoll" >
      <button class="continue" v-on:click="createPoll">
        <span class='text'>{{ uiLabels.createPoll }}</span>
      </button>
    </div>

    </div>

    <button class="noselect" v-on:click="cancelPage">
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
        <qrcode-vue :value="qrValue" text="pollId"  :size="size" >  </qrcode-vue>
      </div>
    </div>


    <div>
      <h2 class="waitingroomHeadline"> {{ uiLabels.waitingRoom }}</h2>
      <form class = "waitingRoom">
        <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">
          <img class="participants"
            :src="participant.participantImg" >
        <br>
          {{participant.participantName}}
        </div>
      </form>
    </div>

    <div>
      <button class="noselect" v-on:click="startPoll=!startPoll">
        <span class='text'> {{ uiLabels.backButton }} </span>
      </button>
    </div>

    <div v-on:click="letsPlayButton=!letsPlayButton">
      <button class="continue" v-on:click="letsPlay">
        <span class='text'> {{ uiLabels.letsPlay }} </span>
      </button>
    </div>


    </div>

</div>



<div v-if="letsPlayButton == false">

  <SlideShow v-bind:questions="allQuestions[this.questionNumber]" v-bind:answers="allAnswers" v-bind:pollId="pollId" v-bind:uiLabels="uiLabels" v-bind:index="questionNumber">


  </SlideShow>

  <button v-if="this.questionNumber < allQuestions.length-1" v-on:click="nextQuestion"> Next question </button>
  <button v-show="this.questionNumber == allQuestions.length-1" v-on:click="finish('/result/')">View Result</button>-->
<!--  {{this.questions}}-->
<!--{{this.fullPoll['questions'][1].q}}-->
  {{this.allQuestions}}
  {{this.allAnswers}}
  Timer:
  Amount of participants answerd

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
    // Waiting,
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
      typeOfQuestion: "Quiz",
      timeForQuestion: "5s",
      pointsForQuestion: "5p",
      showAnswerButton: true,
      startPoll: true,
      qrValue: `http://localhost:8080/#/poll/${this.pollId}/${this.lang}`,
      size: 200,
      letsPlayButton: true,
      fullPoll: {},

      number: 1,
      activeQuestion: {},
      allQuestions:[],
      allAnswers: [],
      participants: [],
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",

    }
  },

  watch: {
    typeOfQuestion: function(newVal) {

      if (newVal === "quiz" || newVal === "voting")
        this.showAnswerButton = true
      else
        this.showAnswerButton = false
    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    socket.emit('joinPoll', this.pollId)
    this.createPoll();
    //Fixa så att om den har ett pollId så återanvände den det

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
        this.questions = myPoll['questions']
          console.log(this.questions, "test alex")
        })


    socket.on('participantsAdded', (myParticipant) =>
    { console.log('kommer du hit')
        this.participants = myParticipant})


  },
  methods: {
    createPoll: function () {
      this.addQuestion();
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
      console.log("Skickat info")
    },

    addQuestion: function () {

      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: this.question,
        a: this.answers,
        type: this.typeOfQuestion,
        time: this.timeForQuestion
      });


    },

    addAnswer: function () {
      this.answers.push("")
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

      this.addQuestion()
      this.runQuestion() //Added this so that we get the questionnumber, but it can be made easier
      this.allQuestions.push(this.question)
      socket.emit('getPoll', this.pollId)


      // var p = document.createElement("DIV");
      // p.setAttribute("style", "margin:10px;border:solid;border-radius:10%; background-color:white;height:200px");
      // p.id="removeSlides"
      // document.getElementById("slides").appendChild(p);



      // });


    },
     finish: function(route) {
      if (route === 'result') {
        this.$router.push(`/result/${this.pollId}/${this.lang}`)
      }
    },

    nextQuestion: function () {
      this.questionNumber++;
      this.allAnswers = this.fullPoll["questions"][this.questionNumber].a
      socket.emit('dataUpdate', this.allAnswers, this.questionNumber)



      /*  this.number = this.fullPoll.questions.length;
      socket.emit("getPoll", this.pollId);
      this.question = this.fullPoll["questions"][this.questionNumber].q
      this.answers = this.fullPoll["questions"][this.questionNumber].a
      if(this.questionNumber <= this.fullPoll["questions"].length)  {
        this.questionNumber++;
        }*/
    },




    removeSlide: function() {

      socket.emit("removeSlide", {pollId: this.pollId, q: this.question, a: this.answers})
      this.questionNumber--;
      socket.emit("dataUpdate", {questionNumber: this.questionNumber});
      this.runQuestion();


      // document.getElementById("slides").removeChild(document.getElementById("removeSlides"));


      // document.getElementById('presentation').del(document.getElementById("removePictures"))


    },


    cancelPage: function () {
      this.$router.push('/')

    },

    letsPlay: function () {
      this.questionNumber = 0;
      this.allAnswers = this.fullPoll["questions"][this.questionNumber].a
      socket.emit('dataUpdate', this.questionNumber, this.allAnswers)
      socket.emit('startGame', this.pollId)
    }

  }

}


</script>

<style>

.waitingroomHeadline{
  padding-right: 40%;
}

.labelsText{
  font-size: 2vw;
}

.noselect{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  grid-gap: 2px;
  font-family: AppleGothic;
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
  font-family: AppleGothic;
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
  height: 5em;
  width: 90%;
  font-size: 2vw;
  outline: none;
  white-space: pre-line;
}

.marginPresentation{
  margin-bottom: 25%;
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
}

.answersStyle{
  height: 5vh;
  width: 30%;
  font-size: 1.5vw;
  outline: none;
}

#overviewPresentationSlide{
  border:solid;
  border-radius: 10%;
  background-color: white;
  height: 30%;
  margin: 10px;
}

.pollIdStyle{
  width: 10em;
  margin-left: 6em;
  margin-top: 4em;
  text-align: center;
  font-size: 2em;
}

#QRCode{
margin-top: 2em;
}

.wrapperWaitRoom{
  display: grid;
  grid-template-columns: 50% 50%;
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
  height: 90%
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
  transform: translateX(30%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic;
}

.cancel:hover {
  background: #ed3632;
}

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
  font-family: AppleGothic;
}

.continue:hover {
  background: #1d823c;
}

.noselect{
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

.noselect .text {
  transform: translateX(34%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic;
}

.noselect:hover {
  background: #1d72f0;
}



</style>