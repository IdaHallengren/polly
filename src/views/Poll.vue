
<template>
  <div id="cancel">
    <button1 v-on:click="newPage('/')"><span class='text'>Cancel</span>
    </button1>
  </div>

 <div>
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
 </div>


  <div v-show = "showID">
    <div class = "wrapper1">
      <label><h2>Enter your Poll-Id</h2></label>
        <div class="contentCenter">
          <input v-model = "PollId" type="number" min="0" id = "PollId" required="required" name="PollId" placeholder="Poll-Id">

          <button4 v-on:click = "showID = !showID"><span class='text'>OK</span></button4>
        </div>
    </div>
  </div>


<div v-if="!showID">

<p class="YourName"> Poll-ID: {{PollId}} </p>

  <div v-show ="isThisVisible">
    <div class = "wrapper2">
      <label><h2>Enter your name</h2></label>
        <div class="contentCenter">
          <input v-model="participantName" type="text" id="participantName" name="participantName" placeholder="Name" required>
          <button4 v-on:click = "isThisVisible = !isThisVisible"><span class='text'>OK</span></button4>
        </div>
    </div>
  </div>
</div>


<div id ="HideAvatars">
  <div v-if = "isThisVisible==false">
    <p class="YourName"> Name: {{participantName}} </p>

      <section id="selectAvatar">
        <p id="select"> Avatar:  </p>
        <span > <img id="selectedAvatar" src= "https://live.staticflickr.com/65535/51722209074_02d7aa466a_b.jpg"> </span>

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
      <button5 id="continueWaiting" v-on:click="newPage('/waiting/')"><span class='text'>Next</span></button5>

  </div>
</div>

  <div v-if=" isThisVisible==false">
    <button2 class = "backButton" v-on:click = "isThisVisible = !isThisVisible"><span class='text'>Back</span>
    </button2>
  </div>

  <div v-else-if="showID==false">
    <button2 class = "backButton" v-on:click = "showID = !showID"><span class='text'>Back</span>
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
      participantName: "",
      participantImg: "",
      isThisVisible: true,
      participantInfo: {
        participantName: "",
        participantImg: ""
      },
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
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
        this.question = q
    )
  },

  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },

    changeAvatar: function (event) {
      document.getElementById("selectedAvatar").setAttribute('src', event)
    },

    newPage: function(route) {
      if (route === '/')
        this.$router.push( '/' )
      else
        this.$router.push( '/waiting/' + this.pollId )

    }
  }
}
</script>

<style>

.wrapper1{
  padding-top: 200px;
}

.wrapper2{
  padding-top: 100px;
}

.contentCenter{
  padding-left: 42%;
}

#PollId{
  width: 150px;
  height: 50px;
  font-size: larger;
  float:left;
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
  width: 50%;
  left: 25%;
}

#selectedAvatar {
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
  background: red;
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
  transform: translateX(30px);
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
  transform: translateX(25px);
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