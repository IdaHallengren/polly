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
      <h1> Welcome to Pollify</h1>
      <h3> - Easy to create and participate</h3>
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
      <div class="contentCenter">
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
  height:40vh;
  width: 20vw;
}

#header{
  font-weight: bold;
  font-size: 90%;
  color: white;
  padding-bottom: 6em;
  grid-column: 2;
  grid-row: 1;
}

#wrapperButtons{
  font-size: 100%;
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
  font-size: 1.2em;
  font-weight: bold;
  color: black;
  background: white;
  border: 0.1em solid black;
  box-shadow: 0.25em 0.25em 0 black,
  -0.25em -0.25em 0 black,
  -0.25em 0.25em 0 black,
  0.25em -0.25em 0 black;
  transition: 500ms ease-in-out;
}

.start button:hover {
  box-shadow: 2em 0.25em 0 black, -2em -0.25em 0 black;
  background: palegreen;
  color: indigo;
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
  background: #006400;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #006400;
}

button4 .text {
  transform: translateX(10px);
  color: white;
  font-weight: bold;
}

button4:hover {
  background: #008000;
}

#PollId{
  width: 150px;
  height: 50px;
  font-size: larger;
  float:left;
}

.contentCenter{
  padding-left: 42%;
}

.wrapper1{
  padding-top: 200px;
}

button2{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
}

button2 .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
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

</style>
