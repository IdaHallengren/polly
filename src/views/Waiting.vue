<template>

<div id="wrapper">
  <div id="textColumn">
    <h1> Wating room nr: {{this.pollId}}</h1>
    <h2> Waiting for participants</h2>
    <h4>Please wait for the questionmaster to start the game!</h4>
    <h4> Entered players: </h4>
   <span v-for="(participant, key) in participants" v-bind:key="'participant'+key">{{participant}} </span>
  </div>


  <section id="waitingSection">
    <div>

      <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">

      <img class="participants"
           :src="participant.participantInfo.participantImg" >


    </div>
    </div>
  </section>

</div>




</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Waiting',


data: function () {
  return {
    uiLabels: {},
    lang: "",
    participants: [],
    pollId: "",
  }
},

created: function () {
  this.pollId = this.$route.params.id
  this.lang = this.$route.params.lang
  socket.on("participantsAdded", (myParticipant) =>{


        this.participants = myParticipant
    console.log("test" , this.participants)
      }
  )
  socket.emit("pageLoaded", this.lang);
  socket.on("init", (labels) => {
    this.uiLabels = labels
  })

}
}

</script>

<style scoped>

#textColumn{
  grid-column: 1;
}

#wrapper{
  display: grid;
  grid-template-columns: 40% 60%;
}

#waitingSection{
  grid-column: 2;
  border: 5px solid black;
  background-color: cadetblue;
  width: 50%;
  position: absolute;
  left: 40%;
  height: 90%
}


</style>