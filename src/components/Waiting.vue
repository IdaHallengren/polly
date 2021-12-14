<template>

<div id="wrapper">
  <div id="textColumn">
    <h1> {{uiLabels.waitingRoomNr}} {{this.pollId}}</h1>
    <h2> {{uiLabels.waitParticipant}}</h2>
    <h4>{{uiLabels.waitQuestionMaster}}</h4>
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
    pollId: Number
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
  height: 90%;
  overflow: scroll;
}

.participants{
  width: 6em;
  height: 6em;
  border-radius: 100%;
  position: relative;
}


</style>