<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <ConfettiExplosion :particleCount="500" :force="0.7" :duration="50000" :colors="['#2E3191', '#41BBC7', '#EB6373']" :stageHeight="1200" :stageWidth="8000"  />
  {{pollId}}

  <ConfettiExplosion class="styleConfettiRight" :particleCount="500" :force="0.7" :duration="50000" :colors="['#2E3191', '#41BBC7', '#EB6373']" :stageHeight="1200" :stageWidth="8000"  />

  <div>
{{pointsForPoll}}
    {{allParticipants[this.firstPlace]}}
    <br>
<div class="showResult">

  <div id="secondPlace">
    <img v-if="pointsForPoll.length > 1" id="secondImg" v-bind:src="allParticipants[secondPlace].participantImg">
    <img v-else id="noSecondImg" v-bind:src="allParticipants[secondPlace].participantImg">

    <br>
    <div id="podiumSecond">
      <span class="nr2"> 2 </span>
      <br>
      <span v-if="pointsForPoll.length > 1" class="nr2"> {{allParticipants[secondPlace].participantName}} </span>

    </div>


  </div>
    <div id="firstPlace">
      <img id="winnerImg" v-bind:src="allParticipants[firstPlace].participantImg">
      <br>
      <div id="podiumFirst">
        <span id="nr1"> 1 <br> {{allParticipants[firstPlace].participantName}} </span>
      </div>
     

    </div>

    <div id="thirdPlace">
      <img v-if="pointsForPoll.length > 2" id="thirdImg" v-bind:src="allParticipants[thirdPlace].participantImg">
      <img v-else id="noThirdImg" v-bind:src="allParticipants[thirdPlace].participantImg">
      <br>
      <div id="podiumThird">
        <span class="nr3"> 3 </span>
        <br>
        <span v-if="pointsForPoll.length > 2" class="nr3"> {{allParticipants[thirdPlace].participantName}} </span>
      </div>

    </div>
</div>

  <div v-on:click="showWinner=!showWinner">
<button v-on:click="decideWinner()">
</button>
  </div>
  <div v-show="showWinner">





  </div>


  <div>
  Good work everybody! The result is.....

  </div>
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
import ConfettiExplosion from "vue-confetti-explosion";

const socket = io();

export default {
  name: 'Result',
  components: {
    ConfettiExplosion
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
      for (let i = 0; i < this.pointsForPoll.length; i++
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

      for (let i = 0; i < this.pointsForPoll.length; i++) {
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
  }}

</script>

<style>

#winnerImg {
  border-radius: 100%;
  width: 50%;
  height: 45%;


}
#secondImg {
  border-radius: 100%;
  width: 50%;
  height: 45%;
  margin-top: 6vh;
}
#noSecondImg {
  width: 50%;
  height: 45%;
  margin-top: 6vh;
  visibility: hidden;
}
#noThirdImg {
  width: 50%;
  height: 45%;
  margin-top: 9vh;
  visibility: hidden;
}


#thirdImg{
  border-radius: 100%;
  width: 50%;
  height: 45%;
  margin-top: 9vh;
}
.showResult {
  display: grid;
  grid-template-columns: 20% 20% 20%;
  width: 100%;
  height: 60vh;
  place-content: center;
}
#secondPlace {
  place-content: center;
  height: 100%;

}
#firstPlace{
  height: 100%;

}
#thirdPlace{
  height: 100%;

}
#podiumSecond {
  width: 100%;
  height: 19vh;
  background-color: saddlebrown;
  place-content: center;
  border-top-left-radius: 15%;
}
#podiumFirst {
  width: 100%;
  height: 25vh;
  background-color: saddlebrown;
  place-content: center;
  border-top-left-radius: 8%;
  border-top-right-radius: 8%;
}
#podiumThird {
  width: 100%;
  height: 16vh;
  background-color: saddlebrown;
  place-content: center;
  border-top-right-radius: 15%;
}
#nr1{
  font-size: 5vh;
  font-family: Damascus;
  color: gold;
  font-weight: bold;

}

.nr2 {
  font-size: 5vh;
  font-family: Damascus;
  color: silver;
  font-weight: bold;
}
.nr3{
  font-size: 5vh;
  font-family: Damascus;
  color: sandybrown;
  font-weight: bold;
  place-content: center;
}


.styleConfettiRight{
  margin-left: 95%
}



/*Style taken from the same as in start*/
.bg {
  animation:slide 23s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #BB6372 50%, #79333D 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}
.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:23s;
}
.bg3 {
  animation-duration:23s;
}
@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
</style>


