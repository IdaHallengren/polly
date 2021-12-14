<template>
<main class="start">

<div id="langDiv">
    <img id="sweImg" src="../img/swe.jpg" v-on:click="switchToSwedishLanguage"/>

    <img id="engImg" src="../img/eng.jpg" v-on:click="switchToEnglishLanguage"/>
</div>

<div v-show="showStart">

  <div id="wrapperHead">
    <div id="header">

      <img id="logo" src="../img/logo.jpg">
      <p style="font-size: 2.5vw;"> {{uiLabels.welcome}}</p>
      <p style="font-size: 2vw;">{{uiLabels.welcomeEasy}}</p>
    </div>
  </div>

  <section id="wrapperButtons">

    <button class="button" v-on:click="newPage('Create')">{{uiLabels.createPoll}}</button>

    <button class="button" id="partButton" v-on:click = "showStart = !showStart">{{uiLabels.participatePoll}}</button>

  </section>
</div>

<div v-if="!showStart">
  <div v-show = "showId">
    <div class = "wrapper1">
      <label><h2 id="textFont">{{uiLabels.enterPollId}}</h2></label>
      <div >
        <input v-model = "pollId" type="number" min="0" id = "PollId" required="required" name="PollId" placeholder="Poll-Id">

        <button4  v-on:click="newPage('Poll')"><span class='text'> OK</span></button4>
      </div>
    </div>
    <button2 class = "backButton" v-on:click = "showStart = !showStart"><span class='text'>{{uiLabels.backButton}}</span></button2>
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
      pollId: ""
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

#sweImg:hover{
  width: 2.5em;
  height: 2.5em;
}

#engImg:hover{
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

#sweImg{
  position: absolute;
  top: 0em;
  right: 2.2em;
  border-radius: 100%;
  width: 2em;
  height: 2em;
}

#logo{
  height:60%;
  width: 60%;
}

#header{
  font-weight: bold;
  color: white;
  padding-bottom: 10%;
  grid-column: 2;
  grid-row: 1;
}

#wrapperButtons{
  display: grid;
  place-items: center;
  grid-template-columns: 25% 25% 25% 25%;
}

.start .button {
  height:10vh;
  width: 15vw;
  grid-column: 2;
  grid-row: 1;
  cursor: pointer;
  font-size: 2vw;
  font-weight: bold;
  color: black;
  background: white;
  border: 0.1em solid #1d72f0;
  box-shadow: 0.25em 0.25em 0 #5995ED,
  -0.25em -0.25em 0 #5995ED,
  -0.25em 0.25em 0 #5995ED,
  0.25em -0.25em 0 #5995ED;
  transition: 500ms ease-in-out;
}

.start button:hover {
  box-shadow: 2em 0.25em 0 #317773, -2em -0.25em 0 #317773;
  background: #5995ED;
  color: White;
}

.start button:focus {
  outline: none;
}
#partButton{
  grid-column: 3;
  grid-row: 1;
}

button4{
  width: 45px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

button4 .text {
  transform: translateX(10px);
  color: white;
  font-weight: bold;
}

button4:hover {
  background: #1d823c;
}

#PollId{
  width: 150px;
  height: 50px;
  font-size: larger;
  float:left;
}

.wrapper1{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
  padding-top: 200px;
  place-items: center
;
}

button2{
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

button2 .text {
  transform: translateX(30%);
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
}

button2:hover {
  background: #1d72f0;
}

.backButton{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

#textFont{
  font-size: xx-large;
  color: white;
}

.effect1 {
  color: #222;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 24px;
  position: relative;
  padding: 10px 50px 10px 20px;

  -webkit-transition: all 0.3s;

  -o-transition: all 0.3s;

  transition: all 0.3s;

  -webkit-transform: scale(1);

  -ms-transform: scale(1);

  transform: scale(1); /*change scale(3) to scale(1)*/
}

.effect1 .bg {
  background: #222;
  width: 30px;
  height: 2px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -1px;
  z-index: -1;

  -webkit-transition: all 0.3s;

  -o-transition: all 0.3s;

  transition: all 0.3s;
}

.effect1:hover {
  padding-right: 20px;
  color: #fff;
}

.effect1:hover .bg {
  height: 100%;
  width: 100%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.effect1 .bg:before, .effect1 .bg:after {
  content: '';
  height: 2px;
  width: 10px;
  background: #222;
  position: absolute;
  right: -2px;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.effect1 .bg:before {
  bottom: 3px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.effect1 .bg:after{
  top: 3px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.effect1:hover .bg:before,
.effect1:hover .bg:after{
  right: 0;
}

.effect1:hover .bg:before{
  bottom: 6px;
}

.effect1:hover .bg:after{
  top: 6px;
}


</style>
