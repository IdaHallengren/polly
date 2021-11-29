<template>

  <div id="wrapper">

  <header id="header">
    <h1> Welcome to Pollify</h1>
    <h3> - Easy to create and participate</h3>
  </header>

  <div id="langdiv">
    <img class="langimg" src="img/swe.jpg">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <img class="langimg" src="img/eng.jpg">
  </div>

  <div id="nav">
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <label>
      Write poll id: 
      <input type="text" v-model="id">
    </label>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
  </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>

<style>



.langimg{
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
}

#wrapper {
  display: grid;
}

#langdiv{
  grid-column: 3;
  grid-row: 1;
}

#header{
  grid-column: 2;
  grid-row: 1;
}
</style>
