<template>


  {{pollId}}
  <div>

    {{question}}

    <button> hej </button>
{{pointsForPoll}}

  </div>
  <Bars v-bind:data="data"/>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      question: "",
      pointsForPoll: [],
      participants:[],

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
      this.pointsForPoll=d.totPoints;
    })

    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )

  }
}
</script>
