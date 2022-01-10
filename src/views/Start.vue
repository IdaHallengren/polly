<template>

<!-- Style for the background, Created by Chris Smith -->
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>

<main>

  <div id="langDiv">
    <img id="sweImg" src="../img/swe.jpg" v-on:click="switchToSwedishLanguage"/>
    <img id="engImg" src="../img/eng.jpg" v-on:click="switchToEnglishLanguage"/>
  </div>

  <div v-show="showStart">
    <div id="wrapperHead">
      <div id="header">
        <img id="logo" src="../img/logo1.svg">
        <div id="headerText">
        <p style="font-size: 1.5vw;"> {{uiLabels.welcome}}</p>
        <p style="font-size: 1vw;">{{uiLabels.welcomeEasy}}</p>
        </div>
      </div>
    </div>

    <section id="wrapperButtons">
      <button class="startButton" v-on:click="newPage('Create')">{{uiLabels.createPoll}}</button>
      <button class="startButton" id="partButton" v-on:click = "showStart = !showStart">{{uiLabels.participatePoll}}</button>
    </section>
  </div>

  <div v-if="!showStart">
    <div v-show = "showId">
      <div class = "wrapperPollId">
        <label class="textFont">{{uiLabels.enterPollId}}</label>
        <div>
          <input v-on:keyup.enter="newPage('Poll')" v-model = "pollId" type="number" min="0" class= "PollId" required="required" name="PollId" placeholder="Poll-Id">
          <button class="okButton" v-on:click="newPage('Poll')"><span class='buttonText'> OK</span></button>
        </div>
      </div>
      <button class = "backButton" v-on:click = "showStart = !showStart"><span class='buttonText'>{{uiLabels.backButton}}</span></button>
    </div>
  </div>

</main>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      lang: "en",
      showStart: true,
      showId: true,
      pollId: "",
      showCreateQuote: false,
      showParticipateQuote: false
    }
  },

  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit('pageLoaded')
  },

  methods: {

    switchToSwedishLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      socket.emit("switchLanguage", this.lang)
    },

    switchToEnglishLanguage: function() {
      if (this.lang === "sv")
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },

    newPage: function(route) {
      if (route === 'Create'){
        this.pollId=Math.floor(Math.random() * 100000);
        this.$router.push(`/create/${this.pollId}/${this.lang}`)}
      else
        this.$router.push(`/poll/${this.pollId}/${this.lang}`)
    }
  }
}
</script>

<style>

body{
  background-color: #317773;
}

#wrapperHead {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

#langDiv{
  position: relative;
  grid-column: 3;
  grid-row: 1;
}

#sweImg{
  position: absolute;
  top: 0em;
  right: 2.2em;
  border-radius: 100%;
  width: 2em;
  height: 2em;
}

#sweImg:hover{
  width: 2.5em;
  height: 2.5em;
}

#engImg{
  position: absolute;
  top: 0em;
  right: 0em;
  border-radius: 100%;
  width: 2em;
  height: 2em;
}

#engImg:hover{
  width: 2.5em;
  height: 2.5em;
}

#wrapperHead {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

#header{
  position: relative;
  top: 5%;
  font-weight: bold;
  color: white;
  grid-column: 2;
  grid-row: 1;
}

#logo{
  height:80%;
  width: 80%;
}

#headerText{
  position: relative;
  bottom: 22%;
  font-weight: bold;
  color: lightskyblue;
  padding-top: 10%;
}

#wrapperButtons{
  display: grid;
  place-items: center;
  grid-template-columns: 25% 25% 25% 25%;
}

/* Personal altered buttons with source code from Chance Squires*/
.startButton {
  height:10vh;
  width: 15vw;
  grid-column: 2;
  grid-row: 1;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
  color: dimgrey;
  font-family: AppleGothic,sans-serif;
  background: white;
  border: 0.1em solid #1d72f0;
  box-shadow: 0.1em 0.1em 0 #5995ED,
  -0.1em -0.1em 0 #5995ED,
  -0.1em 0.1em 0 #5995ED,
  0.1em -0.1em 0 #5995ED;
  transition: 500ms ease-in-out;
}

.startButton:hover {
  background: lightskyblue;
  color: White;
}

.startButton:focus {
  outline: none;
}

#partButton{
  grid-column: 3;
  grid-row: 1;
}

/* Personal altered buttons with source code from Chance Squires*/
.okButton{
  width: 5vw;
  height: 8vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 2px;
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

.okButton:hover {
  background: #1d823c;
}

.PollId{
  width: 15vw;
  height: 7.2vh;
  font-size: larger;
  float:left;
}

.wrapperPollId{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
  padding-top: 15vw;
  place-items: center;
  font-family: AppleGothic,sans-serif;
}

/* Personal altered buttons with source code from Chance Squires*/
.backButton{
  width: 6vw;
  height: 6%;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  place-content: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
  font-family: AppleGothic,sans-serif;
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.backButton .buttonText {
  transform: translateX(30%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  margin-right: 2vw;
}

.backButton:hover {
  background: #1d72f0;
}

.textFont{
  font-size: xx-large;
  color: white;
}

 /*Style for the background, Created by Chris Smith */
.bg {
  animation:slide 12s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #772D8B 50%, #e2725b 50%);
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
  animation-duration:12s;
}
.bg3 {
  animation-duration:12s;
}
@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}

</style>

