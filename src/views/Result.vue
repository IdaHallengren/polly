<template>
  {{pollId}}


  <div>
{{pointsForPoll}}
    {{allParticipants[this.firstPlace]}}
    <br>
<div class="showResult">
  <div id="secondPlace" v-if="pointsForPoll.length >= 2">
    <img class="winnerImg" v-bind:src="allParticipants[secondPlace].participantImg">
    <br>
    <div id="podiumSecond">

    </div>
    <span>{{allParticipants[secondPlace].participantName}}</span>

  </div>
    <div id="firstPlace">
      <img class="winnerImg" v-bind:src="allParticipants[firstPlace].participantImg">
      <br>
      <div id="podiumFirst">

      </div>
      <span>{{allParticipants[firstPlace].participantName}}</span>

    </div>

    <div id="thirdPlace" v-if="pointsForPoll.length >= 3">
      <img class="winnerImg" v-bind:src="allParticipants[thirdPlace].participantImg">
      <br>
      <div id="podiumThird">

      </div>
      <span>{{allParticipants[thirdPlace].participantName}}</span>
    </div>
</div>



  </div>

  <div v-on:click="showWinner=!showWinner">
<button v-on:click="decideWinner()">

</button>
  </div>
  <div v-show="showWinner">

  <img class="winnerImg" v-bind:src="allParticipants[firstPlace].participantImg">
  </div>


  <div>
  Good work everybody! The result is.....

  </div>


  <!-- Här ska vi ta in resultatbars -->

<!--  <Bars v-bind:data="data"/>-->

<!--  <div v-for="(participant, key) in participants" v-bind:key="'participant'+key">-->
<!--   <span> pointsForPoll[key]= participant.totPoints </span>-->
<!--          -->
<!--  </div>-->
</template>

<script>
// @ is an alias to /src
// import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    // Bars
  },
  data: function () {
    return {
      question: "",
      pointsForPoll: [],
      participants: [],
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 0,
      showWinner: false,
      allParticipants: [],


      data: {
        pollId: ""
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;

    socket.emit('joinPoll', this.pollId)
    socket.emit('getAllParticipants', this.pollId)
    socket.on('collectParticipants', (d) => {
      this.allParticipants = d
      for (let i = 0; i < this.allParticipants.length; i++) {
        this.pointsForPoll[i] = this.allParticipants[i].totPoints
      }
      for(let i = 0; i < this.pointsForPoll.length; i++
      ) {
        if (this.pointsForPoll[i] > this.pointsForPoll[this.firstPlace] || i === 0) {
          this.thirdPlace = i
          let tempSecond = this.secondPlace
          this.thirdPlace = tempSecond
          this.secondPlace = i
          let tempFirst = this.firstPlace
          this.secondPlace = tempFirst
          this.firstPlace = i
        } else if (this.pointsForPoll[i] <= this.pointsForPoll[this.firstPlace] && (this.pointsForPoll[i] > this.pointsForPoll[this.secondPlace]
            || i === 1)) {
          this.thirdPlace = i;
          let tempSecond = this.secondPlace;
          this.thirdPlace = tempSecond;
          this.secondPlace = i;
        } else if (this.pointsForPoll[i] <= this.pointsForPoll[this.secondPlace] && (this.pointsForPoll[i] >= this.pointsForPoll[this.thirdPlace]
            || i === 2)) {
          this.thirdPlace = i;
        }
      }
        }
    )

    // socket.on("dataUpdate", (update) => {
    //   this.data = update.a;
    //   this.question = update.q;
    // });
    // socket.on("newQuestion", update => {
    //   this.question = update.q;
    //   this.data = {};
    // })

/*    socket.on('pointsForQuestion', (d) => {
      console.log('Have the points sent to result?');
      this.participants = d;

      for (let i = 0; i < this.participants.length; i++) {
        this.pointsForPoll[i] = this.participants[i].totPoints
      }
      console.log('registerd points in list', this.pointsForPoll)
      //Här måste vi nog skicka all info till socket för annars ligger det väl bara "lokalt"?
      return this.pointsForPoll
    })


    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )*/

  },
  methods: {
    decideWinner: function () {


      for(let i = 0; i < this.pointsForPoll.length; i++
      )
      {
        if (this.pointsForPoll[i] > this.pointsForPoll[this.firstPlace] || i === 0) {
          this.thirdPlace = i
          let tempSecond = this.secondPlace
          this.thirdPlace = tempSecond
          this.secondPlace = i
          let tempFirst = this.firstPlace
          this.secondPlace = tempFirst
          this.firstPlace = i
        }

        else if (this.pointsForPoll[i] <= this.pointsForPoll[this.firstPlace] && (this.pointsForPoll[i] > this.pointsForPoll[this.secondPlace]
            || i === 1)){
          this.thirdPlace = i;
          let tempSecond = this.secondPlace;
          this.thirdPlace = tempSecond;
          this.secondPlace = i;
        }

        else if (this.pointsForPoll[i] <= this.pointsForPoll[this.secondPlace] && (this.pointsForPoll[i] >= this.pointsForPoll[this.thirdPlace]
            || i === 2)){
          this.thirdPlace = i;
        }
}
}}}



</script>

<style>

.winnerImg {
  border-radius: 100%;
  width: 12vw;
  height: 21vh;
}
.showResult {
  display: inline-grid;
  grid-template-columns: 20% 20% 20%;
  width: 100%;
  height: 60vh;
  place-content: center;
}
#secondPlace {
  margin-bottom: -20%;
}
#firstPlace{

}
#thirdPlace{

}
#podiumSecond {
  width: 100%;
  height: 12vh;
  background-color: gray;
  place-content: center;
  margin-bottom: 0;
}
#podiumFirst {
  width: 100%;
  height: 15vh;
  background-color: gray;
  place-content: center;
}
#podiumThird {
  width: 100%;
  height: 10vh;
  background-color: gray;
  place-content: center;
}
</style>