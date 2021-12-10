
<template>
<div id="cancel">
  <button1 v-on:click="newPage('/')"><span class='text'>{{uiLabels.cancelButton}}</span>
  </button1>
</div>

<div>
  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>

</div>

<p class="YourName"> {{uiLabels.pollId}} {{pollId}} </p>

  <div v-show ="isThisVisible">
    <div class = "wrapperName">
      <label><h2>{{uiLabels.enterName}}</h2></label>
        <div class="contentCenter">
          <input v-model="participantName" type="text" id="participantName" name="participantName" placeholder="Name" required>
          <button4 v-on:click = "isThisVisible = !isThisVisible"><span class='text'>OK</span></button4>
        </div>
    </div>
  </div>

<div id ="HideAvatars">
  <div v-if = "isThisVisible==false">
    <p class="YourName">{{uiLabels.name}}{{participantName}} </p>

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
      <button5 id="continueWaiting" v-on:click="newPage('/waiting/')"><span class='text'>{{uiLabels.continueButton}}</span></button5>
  </div>
</div>

<div v-if=" isThisVisible==false">
    <button2 class = "backButton" v-on:click = "isThisVisible = !isThisVisible"><span class='text'>{{uiLabels.backButton}}</span>
    </button2>
</div>

</template>

<script>
/*// @ is an alias to /src
import Question from '@/components/Question.vue';*/

import AvatarLoop from '../components/AvatarLoop.vue'
import io from 'socket.io-client'
import avatar from '../data/avatar.json'

const socket = io();

export default {
  name: 'Poll',
  components: {
    AvatarLoop
  },
  data: function () {
    return {
      Avatars: avatar,
      lang: "",
      uiLabels: {},
      participantName: "",
      participantImg: "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg",
      isThisVisible: true,
      showID: true,
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll"
    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
        this.question = q
    )
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },

  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },

    changeAvatar: function (event) {
      this.participantImg=event

    },

    newPage: function(route) {
      if (route === '/')
        this.$router.push('/')
      else {
        socket.emit("addParticipant", { pollId: this.pollId,
          participantInfo: {
            participantName: this.participantName,
            participantImg: this.participantImg
          },
        },);
        this.$router.push( `/waiting/${this.pollId}/${this.lang}`)}
    },
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
  grid-column: 2;

}

.YourName{
  font-size: xx-large;
}

#selectAvatar {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding-bottom: 1em;
  position: relative;
  width: 60%;
  left: 23%;
}

#selectedAvatar {
  place-content: center;
  grid-column: 3;
  width: 7em;
  height: auto;
  border-radius: 100%;
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  top: -10%
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
  background-color: cadetblue;
  border: 0.3em solid black;
  overflow-y: auto;
}

.backButton{
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}

#cancel {
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
  background: #e62222;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #e62222;
}

button1 .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

button1:hover {
  background: #ff3636;
}

button2{
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #1E90FF;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #1E90FF;
}

button2 .text {
  transform: translateX(25px);
  color: white;
  font-weight: bold;
}

button2:hover {
  background: #00BFFF;
}

button4{
  width: 45px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #006400;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #006400;
}

button4 .text {
  transform: translateX(10px);
  color: white;
  font-weight: bold;
}

button4:hover {
  background: #008000;
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
  background: #006400;
}

button5 .text {
  transform: translateX(30px);
  color: white;
  font-weight: bold;
}

button5:hover {
  background: #008000;
}

#continueWaiting{
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;

}

</style>