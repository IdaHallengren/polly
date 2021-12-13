
<template>
<div class="cancel">
  <button1 v-on:click="newPage('/')"><span class='text'>{{uiLabels.cancelButton}}</span>
  </button1>
</div>

<!--<div>
  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>

</div>-->
<div v-if="showWaiting">
  <p class="fontSize"> {{uiLabels.pollId}} {{pollId}} </p>

    <div v-show ="showName">
      <div class = "wrapperName">
        <label><h2 class="fontSize">{{uiLabels.enterName}}</h2></label>
         <div class="contentCenter">
           <input v-model="participantName" type="text" id="participantName" name="participantName" placeholder="Name" required>
           <button4 v-on:click = "showName = !showName"><span class='text'>OK</span></button4>
         </div>
      </div>
     </div>


  <div id ="HideAvatars">
    <div v-if = "showName==false">
      <p class="fontSize">{{uiLabels.name}}{{participantName}} </p>

        <section id="selectAvatar">
          <p id="select"> {{uiLabels.avatar}}  </p>
          <span > <img id="selectedAvatar" v-bind:src=this.participantImg> </span>
        </section>

      <div id="formsize">
        <form class = "form">
          <div class = "wrapper">
           <AvatarLoop v-for="avatar in Avatars"
                  v-bind:avatar="avatar"
                  v-bind:key="avatar.Name"
                  v-on:participantImg="changeAvatar($event)"
            />
          </div>
        </form>
      </div>
      <div v-on:click="showWaiting = !showWaiting">
        <button5 id="continueWaiting" v-on:click="newPage('null')" ><span class='text'>{{uiLabels.continueButton}}</span></button5>
     </div>
      <button2 class = "backButton" v-on:click = "showName = !showName"><span class='text'>{{uiLabels.backButton}}</span></button2>
    </div>
  </div>
</div>


<div v-if="!showWaiting">

  <Waiting v-bind:participants="participants" v-bind:pollId="pollId" v-bind:uiLabels="uiLabels"></Waiting>

  <div v-on:click="deleteInfo('back')">
  <button2 class = "backButton" v-on:click = "showWaiting = !showWaiting, showName=!showName"><span class='text'>{{uiLabels.backButton}}</span>
  </button2>
  </div>

  <div class="cancel">
    <button1 v-on:click="deleteInfo('delete')" ><span class='text'>{{uiLabels.cancelButton}}</span>
    </button1>
  </div>

</div>

</template>

<script>
/*// @ is an alias to /src
import Question from '@/components/Question.vue';*/

import AvatarLoop from '../components/AvatarLoop.vue'
import Waiting from '../components/Waiting.vue'
import io from 'socket.io-client'
import avatar from '../data/avatar.json'

const socket = io();

export default {
  name: 'Poll',
  components: {
    AvatarLoop,
    Waiting
  },
  data: function () {
    return {
      Avatars: avatar,
      lang: "",
      uiLabels: {},
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",
      participantId: 0,
      showName: true,
      showID: true,
/*      question: {
        q: "",
        a: []
      },*/
      pollId: "inactive poll",
      showWaiting: true,
      participants: []
    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    this.participantId=Math.floor(Math.random() * 1000);


    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
        this.question = q
    )
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on('participantsAdded', (myParticipant) =>
        this.participants = myParticipant
    )

    socket.on('gameStart', () => {
      console.log('SKICKA DÅÅÅ')
          // this.pollId=startPoll
          this.$router.push(`/result/${this.pollId}/${this.lang}` )
        }
    )


  },

  methods: {
/*    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },*/

    changeAvatar: function (event) {
      this.participantImg=event
    },

    newPage: function(route) {
      if (route === '/'){
        this.$router.push('/')
      }
      else {
        socket.emit("addParticipant", {
          pollId: this.pollId,
          participantInfo: {
            participantId: this.participantId,
            participantName: this.participantName,
            participantImg: this.participantImg
          },
        },);
    }
  },

    deleteInfo: function(){
/*      if (route === 'back') {
        delete participantName,
        delete participantImg
      }
      else {
        delete participantName
        delete participantImg
        delete participantId
      }*/
    }


}
}
</script>

<style>

.wrapperName{
  padding-top: 100px;
}

.contentCenter{
  padding-left: 42%;
}

#participantName{
  width: 150px;
  height: 50px;
  font-size: larger;
  float: left;
}

#select {
  position: relative;
  font-size: xx-large;
  font-weight: bold;
  color: White;
  grid-column: 1;
  top: -25%;
  left: 35%;

}

.fontSize{
  font-size: xx-large;
  font-weight: bold;
  color: white;
}

#selectAvatar {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 1em;
  position: relative;
  width: 100%;
}

#selectedAvatar {
  place-content: center;
  grid-column: 2;
  width: 7em;
  height: auto;
  right: 25%;
  border-radius: 100%;
  position: relative;
  top: -10%;

}

#formsize {
  width: 50%;
  position: absolute;
  left: 25%
}

.wrapper{
  display:grid;
  width: 100%;
  grid-template-rows: 33% 33% 33%;
  grid-template-columns: 33% 33% 33%;
}

.form{
  padding-top: 2em;
  padding-bottom: 2em;
  background-color: #D3D3D3;
  border: 0.3em solid white;
  /*overflow-y: auto;*/
}

.backButton{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

.cancel {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

button1{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #EF6461;
}

button1 .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

button1:hover {
  background: #ed3632;
}

button2{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #5995ED;
}

button2 .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

button2:hover {
  background: #1d72f0;
}

button4{
  width: 45px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

button4 .text {
  transform: translateX(10px);
  color: white;
  font-weight: bold;
}

button4:hover {
  background: #1d823c;
}
button5{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #558564;
}

button5 .text {
  transform: translateX(30px);
  color: white;
  font-weight: bold;
}

button5:hover {
  background: #1d823c;
}

#continueWaiting{
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;

}

</style>