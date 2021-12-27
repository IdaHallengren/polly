
<template>
<!--<div>
  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>

</div>-->

<div v-if="!showGameStart">

<div v-if="!showWaiting">
  <button class="cancelButton" v-on:click="newPage('/')"><span class='text'>{{uiLabels.cancelButton}}</span>
  </button>
  <p class="fontSize"> {{uiLabels.pollId}} {{pollId}} </p>

    <div v-show ="!showName">
      <div class = "wrapperName">
        <p class="fontSize">{{uiLabels.enterName}}</p>
         <div>
           <input v-model="participantName" type="text" id="participantName" name="participantName" placeholder="Name" required>
           <button class="okButton" v-on:click = "showName = !showName"><span class='text'>OK</span></button>
         </div>
      </div>
    </div>


  <div id ="HideAvatars">
    <div v-if = "showName">
      <p class="fontSize">{{uiLabels.name}}{{participantName}} </p>

        <section id="selectAvatar">
          <p id="select"> {{uiLabels.avatar}}  </p>
          <span > <img id="selectedAvatar" v-bind:src=this.participantImg alt="Avatar"> </span>
        </section>

      <div id="formsize">
        <form class = "form">
          <div class = "wrapper">
           <AvatarLoop v-for="avatar in Avatars"
                  v-bind:avatar="avatar"
                  v-bind:key="avatar.Name"
                  v-on:participantImg="changeAvatar($event)"
            />
          </div>
        </form>
      </div>

        <div  v-on:click="showWaiting=true">
        <button class="continueButton"  v-on:click="newPage('add')"><span class='text'>{{uiLabels.continueButton}}</span></button>
        </div>
        <button class = "backButton" v-on:click = "showName = !showName"><span class='text'>{{uiLabels.backButton}}</span></button>
    </div>
  </div>
</div>

<div v-if="showWaiting">

  <Waiting v-bind:participants="participants" v-bind:pollId="pollId" v-bind:uiLabels="uiLabels"></Waiting>

  <button class="cancelButton" v-on:click="deleteInfo('delete')" ><span class='text'>{{uiLabels.cancelButton}}</span></button>

</div>
</div>


<div v-if="showGameStart">
 
 <SlideShow v-bind:questions="question.q"
            v-bind:answers="question.a"
            v-bind:pollId="pollId"
            v-bind:uiLabels="uiLabels"
            index=1
            v-bind:questionMaster="questionMaster"
            v-bind:pointsForQuestion="question.pointsForQuestion"
            v-bind:timeForQuestion="question.timeForQuestion"
            v-bind:typeOfQuestion="question.typeOfQuestion"
            v-bind:correctAnswer="question.correctAnswer"

            >
<!--            v-bind:isClicked="this.isClicked"-->

 </SlideShow>

  Type of question is: {{question.typeOfQuestion}} ,
  Time for question is: {{question.timeForQuestion}},
  Points for question are: {{question.pointsForQuestion}},
  The correct answer is: {{question.correctAnswer}}


</div>






</template>

<script>
/*// @ is an alias to /src
import Question from '@/components/Question.vue';*/

import AvatarLoop from '../components/AvatarLoop.vue'
import Waiting from '../components/Waiting.vue'
import io from 'socket.io-client'
import avatar from '../data/avatar.json'
import SlideShow from "../components/SlideShow";

const socket = io();

export default {
  name: 'Poll',
  components: {
    SlideShow,
    AvatarLoop,
    Waiting
  },
  data: function () {
    return {
      Avatars: avatar,
      lang: "",
      uiLabels: {},
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",
      participantId: 0,
      showName: false,
      showID: false,
/*      question: {
        q: "",
        a: []
      },*/
      pollId: "inactive poll",
      showWaiting: false,
      participants: [],
      showGameStart: false,

      fullPoll: {},
      // allAnswers: [],
      // questionNumber:0,
      question:{},
      questionMaster: false,

       correctAnswer:[],
       timeForQuestion: [],
      typeOfQuestion: [],
      pointsForQuestion: [],
       infoQuestions:{}



    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    this.participantId=Math.floor(Math.random() * 1000);

    socket.emit('joinPoll', this.pollId)

    socket.on("newQuestion", q =>
        this.question = q
    )

    socket.emit("pageLoaded", this.lang);

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )

    socket.on('gameStart', (myBoolean) => {
      console.log('SHOW GAME START')
        this.showGameStart= myBoolean
        })

    socket.on("pleaseRemoveThem", (myBoolean) =>{
      this.isClicked = myBoolean
      console.log("trying to remove boolean isClicked",this.isClicked)
    }
    )

    socket.on('booleanChange' , (myBoolean) =>{
      this.isClicked=myBoolean
      console.log("trying to change back boolean isClicked",this.isClicked)

    })


  },

  methods: {
/*    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },*/

    changeAvatar: function (event) {
      this.participantImg=event
    },

    newPage: function(route) {
      if (route === '/'){
        this.$router.push('/')
    }
      else {
        socket.emit("addParticipant", {
          pollId: this.pollId,
          participantInfo: {
            participantId: this.participantId,
            participantName: this.participantName,
            participantImg: this.participantImg
          },
        },);
      }
  },

    deleteInfo: function(){
    socket.emit('removeParticipant', {
      pollId: this.pollId, participantImg: this.participantImg, participantName: this.participantName, participantId: this.participantId
    })
      this.$router.push('/')
    }
}
}
</script>

<style>

/*body{*/
/*  background-color: #772D8B;*/
/*}*/

.wrapperName{
  padding-top: 100px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
  place-items: center;
}

#participantName{
  width: 15vw;
  height: 7.2vh;
  font-size: larger;
  float: left;
  font-family: AppleGothic,sans-serif;
}

#select {
  position: relative;
  font-size: 2.5vw;
  font-weight: bold;
  color: White;
  grid-column: 1;
  top: -25%;
  left: 35%;
  font-family: AppleGothic,sans-serif;
}

.fontSize{
  font-size: 2.5vw;
  font-weight: bold;
  color: white;
  font-family: AppleGothic,sans-serif;
}

#selectAvatar {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 1em;
  position: relative;
  width: 100%;
}

#selectedAvatar {
  place-content: center;
  grid-column: 2;
  width: 17%;
  height: auto;
  right: 25%;
  border-radius: 100%;
  position: relative;
  top: -10%;

}

#formsize {
  width: 50%;
  position: absolute;
  left: 25%
}

.wrapper{
  display:grid;
  width: 100%;
  grid-template-rows: 33% 33% 33%;
  grid-template-columns: 33% 33% 33%;
}

.form{
  padding-top: 2em;
  padding-bottom: 2em;
  background-color: #D3D3D3;
  border: 0.3em solid white;
}

/* Personal altered buttons with source code from Chance Squires*/
.cancelButton {
  position: fixed;
  top: 0.5em;
  right: 0.5em;
  width: 6%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #EF6461;
}

.cancelButton .text {
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.cancelButton:hover {
  background: #ed3632;
}

/* Personal altered buttons with source code from Chance Squires*/
.backButton{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
  width: 7%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
}

.backButton .text {
  transform: translateX(30%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.backButton:hover {
  background: #1d72f0;
}

/* Personal altered buttons with source code from Chance Squires*/
.okButton {
  width: 5vw;
  height: 8vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

.okButton .text {
  transform: translateX(50%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.okButton button:hover {
  background: #1d823c;
}

/* Personal altered buttons with source code from Chance Squires*/
.continueButton{
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  width: 6%;
  height: 6%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

.continueButton .text {
  transform: translateX(40%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.continueButton:hover {
  background: #1d823c;
}

</style>