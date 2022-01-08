<template>

<div id="wrapper">
  <div id="textColumn">

    <p style="font-size: 2.5vw ; font-weight: bold"> {{uiLabels.waitingRoomNr}}{{this.pollId}}</p>
    <p style="font-size: 2vw ; font-weight: bold"> {{uiLabels.waitParticipant}}</p>
    <p style="font-size: 1vw ; font-weight: bold">{{uiLabels.waitQuestionMaster}}</p>

  </div>

  <section id="waitingSection">

    <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">

      <img class="participants"
           :src="participant.participantImg"><br>
           {{participant.participantName}}
    </div>
  </section>

</div>

</template>

<script>

export default {
  name: "Waiting",

  props: {
    uiLabels: Object,
    participants: Array,
    pollId: String
  },

  data: function () {
    return {
      lang: "",
    }
  },

  created: function () {
  }
}

</script>

<style scoped>

#textColumn{
  color: White;
  grid-column: 1;
}

#wrapper{
  display: grid;
  grid-template-columns: 40% 60%;
}

#waitingSection{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-column: 2;
  padding-top: 1em;
  padding-bottom: 1em;
  border: 5px solid white;
  background-color: #D3D3D3;
  width: 50%;
  position: absolute;
  left: 40%;
  height: 80%;
  overflow: scroll;
}

.participants{
  width: 60%;
  height: auto;
  border-radius: 100%;
  position: relative;
  animation: bounce 0.7s infinite alternate;
}



@keyframes bounce {
  from {
    transform: translateY(0vh);
  }
  to {
    transform: translateY(-1.5vh);
  }
}











</style>