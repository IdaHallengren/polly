


<template>


<div v-show="letsPlayButton">
  <div v-show="startPoll">

    <div> </div>
    <div> </div>
    <buttonCancel class="cancel" v-on:click="cancelPage">
      <span class='text'>{{uiLabels.cancelButton}}</span>
    </buttonCancel>



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
      <div >
        <br>
        {{ uiLabels.answers }}
        <input v-for="(_, i) in answers"
               v-model="answers[i]" 
               v-bind:key="'answer'+i"
            class="answersStyle"
        >

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
    <button v-on:click="addQuestion">
      Add question
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    </div>
    </div>
    </div>


    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>


  <div id="editQuestion">
    <div id="v-model-select-question" class="typeOfQuestion">
      <br>
      <label> {{ uiLabels.chooseTypeOfQuestion }} </label>
      <br>
      <select v-model="typeOfQuestion" >
        <option v-on="showAnswerButton" > Quiz </option>
        <option v-on="showAnswerButton" > {{ uiLabels.voting }} </option>
        <option v-on="showAnswerButton=!showAnswerButton" > {{ uiLabels.trueOrFalse }} </option>
        <option v-on="showAnswerButton=!showAnswerButton" > Presentation </option>


      </select>
<!--  <span> Selected: {{ showAnswerButton }}</span>-->

    </div>


    <div id="v-model-select-time" class="timeForQuestion" v-if="typeOfQuestion!='Presentation'">
      <label>{{uiLabels.chooseTimeForQuestion }} </label>
      <br>
      <select v-model="timeForQuestion" >
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
      <label> {{ uiLabels.choosePointsForQuestion}}</label>
      <br>
      <select v-model="pointsForQuestion" >
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

  <buttonContinue class="continue" v-on:click="createPoll">
    <span class='text'>{{ uiLabels.createPoll }}</span>
  </buttonContinue>





      <!--    <button v-on:click="createPoll">-->
<!--      {{ uiLabels.createPoll }}-->
<!--    </button>-->
</div>


  </div>

    <buttonBack class="noselect" v-on:click="cancelPage">
      <span class='text'> {{ uiLabels.backButton }} </span>
    </buttonBack>
  </div>



  Poll link:
  <input type="text" v-model="pollId">





  </div>



<!--  NEXT PAGE  -->

<div v-show="!startPoll" class="wrapperWaitRoom">

  <div> </div>

  <div>
  <buttonCancel class="cancel" v-on:click="cancelPage">
    <span class='text'>{{uiLabels.cancelButton}}</span>
  </buttonCancel>
    </div>



  <div>
  <div class="pollIdStyle">
PollId: {{pollId}}
  </div>


<div id="QRCode">

  <qrcode-vue :value="qrValue" text="pollId"  :size="size" >

  </qrcode-vue>

</div>

  </div>




<div>
 <h2 class="waitingroomHeadline"> {{ uiLabels.waitingroom }}</h2>


<form class = "waitingRoom">
<!--   <div class = "wrapper">-->
     <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">

       <img class="participants"
            :src="participant.participantImg" >
       <br>
       {{participant.participantName}}

     </div>

<!--  </div>-->

  </form>


</div>

<div>
  <buttonBack class="noselect" v-on:click="startPoll=!startPoll">
    <span class='text'> {{ uiLabels.backButton }} </span>
  </buttonBack>
</div>

  <div v-on:click="letsPlayButton=!letsPlayButton">
    <buttonContinue class="continue" v-on:click="letsPlay">
      <span class='text'> {{ uiLabels.letsPlay }} </span>
    </buttonContinue>
  </div>


</div>

</div>



<div v-if="letsPlayButton==false">


  <SlideShow>

  </SlideShow>

  {{questions}}
Timer:
  Amount of participants answerd
  <button v-on:click="nextQuestion"></button>
</div>


</template>

<script>


import QrcodeVue from 'qrcode.vue'
// import html2canvas from 'html2canvas'


// import Waiting from "../components/Waiting";
import io from 'socket.io-client';
import SlideShow from "../components/SlideShow";
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
      size: 300,
      letsPlayButton: true,
      fullPoll: {},
      participants: [],
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",

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
        this.data = data
    )

    socket.on("dataUpdate", (myParticipant) =>
        this.participants = myParticipant
    )

    socket.on("pollCreated", (data) =>
        this.data = data)

    socket.on('fullPoll', (myPoll) =>
        this.fullPoll = myPoll)

    socket.on('participantsAdded', (myParticipant) =>
    { console.log('kommer du hit')
        this.participants = myParticipant}
    )


  },
  methods: {
    createPoll: function () {
      this.addQuestion();
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
      console.log("Skickat info")


    },
    // setPollId: function () {
    //   this.pollId=Math.floor(Math.random() * 100000);
    //   this.createPoll()
    //
    // },

    addQuestion: function () {

      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, type:this.typeOfQuestion, time:this.timeForQuestion});


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
      socket.emit('getPoll', this.pollId)


      // var p = document.createElement("DIV");
      // p.setAttribute("style", "margin:10px;border:solid;border-radius:10%; background-color:white;height:200px");
      // p.id="removeSlides"
      // document.getElementById("slides").appendChild(p);


      //
      //
      //   var slides = html2canvas(document.querySelector('#presentation')).then(canvas => {
      //   document.body.appendChild(canvas)
      //   slides.id="removePictures"


    // });


      // this.slides.push("")
    },




    removeSlide: function() {
      socket.emit("removeSlide", {pollId: this.pollId, q: this.question, a: this.answers})
      this.questionNumber--;
      socket.emit("dataUpdate", {questionNumber: this.questionNumber});
      this.runQuestion();


      // document.getElementById("slides").removeChild(document.getElementById("removeSlides"));


      // document.getElementById('presentation').del(document.getElementById("removePictures"))




    },

    nextQuestion: function() {

    },




    cancelPage: function() {
      this.$router.push( '/' )

    },

    letsPlay: function(){
socket.emit('startGame' ,this.pollId)

    }

}}




</script>

<style>

.waitingroomHeadline{
  padding-right: 40%;
}

.noselect{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.cancel{
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

.continue{
  position: fixed;
  bottom: 0.5em;
  right:0.5em;
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
}

#presentation{
  border: solid;
  border-radius: 2%;
  background-color: white;
}

#editQuestion{
  border: solid;
  border-radius: 2%;
  background-color: #D3D3D3;
}

.headlines{
  margin-top: 1.5em;
  display: grid;
  grid-template-rows: 98% 2%;
  grid-template-columns: 25% 50% 25%;
  font-size: 40px;
  font-family: AppleGothic;
  font-weight: bold;
}

.questionInput{
  height: 10em;
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
  font-size: 2em;
  outline: none;
  white-space: pre-line;
}

.marginPresentation{
  margin-bottom: 20em;
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
  outline: none;
}

#overviewPresentationSlide{
  border:solid;
  border-radius: 10%;
  background-color: white;
  height: 200px;
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


buttonCancel{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #EF6461;
  margin-left: 79.5em;
  margin-bottom: 0.5em;
}

buttonCancel .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

buttonCancel:hover {
  background: #ed3632;
}

buttonContinue{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
  margin-left: 32em;
}

buttonContinue .text {
  transform: translateX(15px);
  color: white;
  font-weight: bold;
}

buttonContinue:hover {
  background: #1d823c;
}

buttonBack{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
  left: 0em;
  margin-top:1.5em;
}

buttonBack .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

buttonBack:hover {
  background: #1d72f0;
}



</style>