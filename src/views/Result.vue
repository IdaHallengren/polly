<template>
  {{pollId}}
  <div>
{{pointsForPoll}}
  </div>

  <div v-on:click="showWinner=!showWinner">
<button v-on:click="decideWinner()">

</button>
  </div>
  <div v-show="showWinner">
  {{participants[this.firstPlace]}}
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
      participants:[],
      firstPlace:0,
      secondPlace:0,
      thirdPlace:0,
      showWinner:false,



      data:{
      pollId:""
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;



     socket.emit('joinPoll', this.pollId)
    // socket.on("dataUpdate", (update) => {
    //   this.data = update.a;
    //   this.question = update.q;
    // });
    // socket.on("newQuestion", update => {
    //   this.question = update.q;
    //   this.data = {};
    // })

    socket.on('pointsForQuestion', (d) => {
      console.log('Have the points sent to result?');
      this.participants=d;

      for (let i = 0; i<this.participants.length; i++){
        this.pointsForPoll[i]=this.participants[i].totPoints
      }
      console.log('registerd points in list', this.pointsForPoll)
      //Här måste vi nog skicka all info till socket för annars ligger det väl bara "lokalt"?
      return this.pointsForPoll
    })


    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )

  },
  methods: {
     decideWinner: function(){
       for (let i = 0; i<this.pointsForPoll.length; i++){
         if(this.pointsForPoll > this.firstPlace){
           this.firstPlace=i;
         }
       }
  },
}
}

</script>
