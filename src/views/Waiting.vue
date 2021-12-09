<template>

<div id="wrapper">
  <div id="textColumn">
    <h2> Waiting for participants</h2>
    <h4>Please wait for the questionmaster to start the game!</h4>
  </div>

  <section id="waitingSection">
    <div>
      <Participants v-for ="avatarImg in participants"
                    v-bind:avatarImg="avatarImg"
                    v-bind:key="avatarImg.participantImg"

      />
      <img class="participants" v-bind:src="participants.participantImg" >


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
    participants: {},

  }
},

created: function () {
  this.pollId = this.$route.params.id
  this.lang = this.$route.params.lang
  socket.on("participantsAdded", (myParticipant) =>
        this.participants = myParticipant
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