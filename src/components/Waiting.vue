<template>

<div id="wrapper">
  <div id="textColumn">

    <p class="textLine1"> {{uiLabels.waitingRoomNr}}{{this.pollId}}</p>
    <p class="textLine2"> {{uiLabels.waitParticipant}}</p>
    <p class="textLine3">{{uiLabels.waitQuestionMaster}}</p>

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

.textLine1{
  font-size: 2.5vw;
  font-weight: bold;
}

.textLine2{
  font-size: 2vw;
  font-weight: bold
}

.textLine3 {
  font-size: 1vw;
  font-weight: bold;
}

@keyframes bounce {
  from {
    transform: translateY(0vh);
  }
  to {
    transform: translateY(-1.5vh);
  }
}

@media only screen and (max-width: 768px) {
  #wrapper{
    grid-template-rows: 35% 65%;
    grid-template-columns: 100%;
  }

  #textColumn{
    grid-row: 1;
    height: 15vh;
    font-size: 3vw;
    margin-bottom: 5%;
  }

  #waitingSection{
    position: unset;
    grid-row: 2;
    grid-column: 1;
    width: 90%;
    margin-left: 4%;
    height: 50vh;
  }

  .textLine1{
    font-size: 5vw;
  }

  .textLine2{
    font-size: 3vw;
  }

  .textLine3 {
    font-size: 3vw;
  }
}

</style>