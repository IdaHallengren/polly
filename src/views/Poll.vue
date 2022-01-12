
<template>
  <!-- Style for the background, Created by Chris Smith -->
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>

<div v-if="!showGameStart">
  <div v-if="!showWaiting">
    <button class="cancelButton" v-on:click="newPage('/')"><span class='buttonText'>{{uiLabels.cancelButton}}</span> </button>
     <p class="fontSize"> {{uiLabels.pollId}} {{pollId}} </p>
      <div v-show ="!showName">
        <div class = "wrapperName">
          <label class="fontSize">{{uiLabels.enterName}}</label>
           <div>
             <input v-on:keyup.enter="showName = !showName" v-model="participantName" type="text" id="participantName" name="participantName" placeholder="Name" >
             <button class="okButton" v-on:click = "showName = !showName"><span class='buttonText'>OK</span></button>
           </div>
        </div>
      </div>

<!-- Page for choosing avatars -->
    <div>
      <div v-if = "showName">
        <p class="fontSize">{{uiLabels.name}}{{participantName}} </p>
          <section id="selectAvatar">
            <p id="selectYourAvatarText"> {{uiLabels.avatar}}  </p>
            <span > <img id="selectedAvatar" v-bind:src=this.participantImg alt="Avatar"> </span>
          </section>

      <div id="formSize">
        <form class = "form">
          <div class = "drawAvatars">
             <AvatarLoop v-for="avatar in Avatars"
                    v-bind:avatar="avatar"
                    v-bind:key="avatar.Name"
                    v-on:participantImg="changeAvatar($event)"
             />
          </div>
        </form>
      </div>

        <div  v-on:click="showWaiting=true">
        <button class="continueButton"  v-on:click="newPage('add')"><span class='buttonText'>{{uiLabels.continueButton}}</span></button>
        </div>

        <button class = "backButton" v-on:click = "showName = !showName"><span class='buttonText'>{{uiLabels.backButton}}</span></button>
      </div>

    </div>
  </div>

<!-- Page for waitingroom -->
  <div v-if="showWaiting">
  <Waiting v-bind:participants="participants" v-bind:pollId="pollId" v-bind:uiLabels="uiLabels"></Waiting>
  <button class="cancelButton" v-on:click="deleteInfo('delete')" ><span class='buttonText'>{{uiLabels.cancelButton}}</span></button>

  </div>
</div>

<!-- Poll starting-->
<div v-if="showGameStart" class="pollTaking">

 <SlideShow v-bind:questions="fullPoll['questions'][questionNumber].q"
            v-bind:answers="fullPoll['questions'][questionNumber].a"
            v-bind:pollId="pollId"
            v-bind:uiLabels="uiLabels"
            v-bind:index="questionNumber"
            v-bind:questionMaster="questionMaster"
            v-bind:overviewUser="overviewUser"
            v-bind:pointsForQuestion="fullPoll['questions'][questionNumber].pointsForQuestion"
            v-bind:timeForQuestion="fullPoll['questions'][questionNumber].timeForQuestion"
            v-bind:correctAnswer="fullPoll['questions'][questionNumber].correctAnswer"
            v-on:pointsCollected="pointsTot($event)"
            v-bind:yourPoints="this.yourPoints"
            v-on:hasAnswerd="totalAnswered()"
            v-bind:timeLeft="this.timeLeft"
            >
 </SlideShow>

</div>
  <button class="cancelButton" v-on:click="leavePoll()"> <span class='buttonText'>{{uiLabels.exitPoll}} </span></button>

</template>

<script>
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
      lang: "",
      uiLabels: {},
      pollId: "inactive poll",
      Avatars: avatar,

      //Participantinfo
      participants: [],
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",
      participantId: 0,
      totPoints:0,
      
      //For hide and show
      showName: false,
      showID: false,
      showWaiting: false,
      showGameStart: false,
      endGame: false,
      questionMaster: false,

      //Info about questions
      fullPoll: {},
      question:{},
      correctAnswer:[],
      timeForQuestion: [],
      pointsForQuestion: [],
      infoQuestions:{},
      yourPoints:0,
      questionNumber: 0,
      timeLeft:0
    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    this.participantId=Math.floor(Math.random() * 1000);

    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.emit('getPoll', this.pollId)

    socket.on('fullPoll', (myPoll) => {
      this.fullPoll = myPoll
      console.log('kommer poll fram')
      console.log(this.fullPoll)
    })

    socket.on("newQuestion", q => {
      this.question = q
    })
    socket.on('updateQuestion', q => {
      this.question = q
      this.questionNumber++;
    })

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )

    socket.on('gameStart', (myBoolean) => {
      console.log('bjas')
        this.showGameStart= myBoolean
    })

    socket.on('endGame',(d)=> {
      this.endGame= d
      this.$router.push(`/result/${this.pollId}/${this.lang}`)
    })

    socket.on('setTimeToZero', (pollId)=>{
      if(this.pollId===pollId){
        this.fullPoll['questions'][this.questionNumber].timeForQuestion = 0
      }
    })

    socket.on('updateQuestion', q=>{
      this.question = q
      this.questionNumber ++
    })
  },

  methods: {
    changeAvatar: function (event) {
      this.participantImg=event
    },

    pointsTot: function (event){
      socket.emit( 'totPoints', {pollId: this.pollId,event: event, participantId: this.participantId})
      socket.on('pointsForQuestion', (d) => {
        this.participants=d
        for (let i = 0; i < this.participants.length; i++) {
          if(this.participantId===this.participants[i].participantId){
            this.yourPoints=this.participants[i].totPoints
          }
        }
      })
    },

    totalAnswered: function(){
      socket.emit('hasAnswered', this.pollId)
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
            participantImg: this.participantImg,
            totPoints: this.totPoints
          }
        });
      }
    },

    deleteInfo: function(){
    socket.emit('removeParticipant', {
      pollId: this.pollId,
      participantImg: this.participantImg,
      participantName: this.participantName,
      participantId: this.participantId
    })
      this.$router.push('/')
    },

    leavePoll: function (){
      this.$router.push('/')
    }
  }
}
</script>

<style>

.fontSize{
  font-weight: bold;
  font-size: xx-large;
  color: white;
  font-family: AppleGothic,sans-serif;
}

.wrapperName{
  padding-top: 80px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  place-items: center;
}

#participantName{
  width: 15vw;
  height: 7.2vh;
  font-size: larger;
  float: left;
  font-family: AppleGothic,sans-serif;
}

#selectAvatar {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 1em;
  position: relative;
  width: 100%;
}

#selectYourAvatarText {
  position: relative;
  font-size: 2.5vw;
  font-weight: bold;
  color: White;
  grid-column: 1;
  top: -25%;
  left: 35%;
  font-family: AppleGothic,sans-serif;
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

#formSize {
  width: 50%;
  position: absolute;
  left: 25%
}

.drawAvatars{
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

.pollTaking{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80% 12% 8%;
}

/* Personal altered buttons with source code from Chance Squires*/
.cancelButton {
  top: 0.5em;
  right: 0.5em;
  width: 6vw;
  height: 6%;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #EF6461;
}

.cancelButton .buttonText {
  transform: translateX(20%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
  margin-right: 1.8vw;
}

.cancelButton:hover {
  background: #ed3632;
}

/* Personal altered buttons with source code from Chance Squires*/
.backButton{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
  width: 6vw;
  height: 6%;
  cursor: pointer;
  display: flex;
  place-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
}

.backButton .buttonText {
  transform: translateX(30%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
  margin-right: 1.3vw;
}

.backButton:hover {
  background: #1d72f0;
}

/* Personal altered buttons with source code from Chance Squires*/
.okButton {
  width: 4.6vw;
  height: 8vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

.okButton .buttonText {
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

.continueButton .buttonText {
  transform: translateX(40%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  font-family: AppleGothic,sans-serif;
}

.continueButton:hover {
  background: #1d823c;
}

/* Style for the background, Created by Chris Smith */
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



@media only screen and (max-width: 768px) {
  /* For mobile phones: */
   .pollTaking{
     height: 100%;
  }
  .cancelButton{
    width: 15vw;
    height: 9vh;
  }
  .cancelButton .buttonText {
    font-size: 3vw;
    margin-right: 3vw;
  }
  .okButton{
    width: 13vw;
  }
  .okButton .buttonText {
    font-size: 3vw;
  }
  .backButton{
    width: 20vw;
  }
  .backButton .buttonText {
    font-size: 4vw;
    margin-right: 5vw;
  }

  .continueButton{
    width: 20vw;

  }
  .continueButton .buttonText {
    font-size: 4vw;
    margin-left: 1vw;
  }

  .fontSize{
    font-size: 6vw;
  }
  #formSize{
    width: 80%;
    left: 10%;
    margin-bottom: 15%;

  }
  #selectYourAvatarText{
    font-size: 3vw;
  }
  #selectedAvatar{
    width: 25%;
  }
  #selectedAvatar{
    right: 20%;
  }

}

</style>