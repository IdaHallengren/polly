<template>
<main class="start">

  <div id="wrapperHead">
    <div id="header">

      <img id="logo" src="../img/logo.jpg">
      <h1> Welcome to Pollify</h1>
      <h3> - Easy to create and participate</h3>
    </div>

    <div id="langDiv">

      <img id="sweImg" src="../img/swe.jpg" v-on:click="switchToSwedishLanguage"/>

      <img id="engImg" src="../img/eng.jpg" v-on:click="switchToEnglishLanguage"/>
    </div>
  </div>

<section id="wrapperButtons">

   <button class="button" v-on:click="newPage('Create')">
     {{uiLabels.createPoll}}
   </button>

   <button id="partButton" class="button" v-on:click="newPage('Poll')">
     {{uiLabels.participatePoll}}
   </button>

</section>

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
      lang: "en"
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
      if (route === 'Create')
        this.$router.push( '/create/' + this.lang)
      else
        this.$router.push( '/poll/:id' )
    }
  }
}
</script>

<style>

body{
  background-color: indigo;
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

</style>
