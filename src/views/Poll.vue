
<template>

 <div>

    {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
 </div>

<div id = "HidePollId">
  <div v-show = "showID">
    <div class = "wrapper1">
      <label><h2>Enter your Poll-Id</h2></label>
      <input v-model = "PollId" type="text" id = "PollId" name = "PollId" placeholder="Poll-Id">

      <button class = "okButton" v-on:click = "showID = !showID">
      OK
      </button>

    </div>
  </div>
</div>

<div v-if="!showID">
  <div id = "HideOk">
    <div v-show ="isThisVisible">
      <div class = "wrapper2">
        <label><h2>Enter your name</h2></label>

        <div style = position:center>

          <input v-model = "EnterName" type="text" id = "EnterName" name = "EnterName" placeholder="Name">

          <button class = "okButton" v-on:click = "isThisVisible = !isThisVisible">
            OK
          </button>

        </div>
      </div>
    </div>
  </div>
</div>


<div id ="HideAvatars">
  <div v-if = "isThisVisible==false">


    <span id = "YourName">{{EnterName}}</span>

      <form class = "form">
        <div class = "wrapper">
          <AvatarLoop v-for="avatar in Avatars"
                  v-bind:avatar="avatar"
                  v-bind:key="avatar.Name"
          />
        </div>

      </form>
  </div>
</div>

<div id = "backButton">
  <div v-if=" isThisVisible==false">
    <button class = "backButton" v-on:click = "isThisVisible = !isThisVisible">
        BACK
    </button>
  </div>

  <div v-else-if="showID==false">
    <button class = "backButton" v-on:click = "showID = !showID">
        BACK
    </button>

  </div>

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
      EnterName: "",
      isThisVisible: true,
      // isThisHidden: false,
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
    nextstep: function () {

    }


  }
}
/*const targetDiv = document.getElementById("HideOk");
const btn = document.getElementId("toggle");
btn.onclick = function(){
  if(targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }else {
    targetDiv.style.display = "block";

    }
}*/
</script>

<style>

.wrapper1{
  font-family: "Al Nile";
  padding-top: 200px;
  grid-template-rows: 100%;

}
.wrapper2{
  font-family: "Al Nile";
  padding-top: 200px;
  grid-template-rows: 100%;
}

#PollId{
  width: 150px;
  height: 50px;
  font-size: larger;

}

#EnterName{
  width: 150px;
  height: 50px;
  font-size: larger;

}
#YourName{
  font-size: xx-large;
}

.okButton{
  width: 50px;
  height: 55px;
  color: white;
  background: forestgreen;
  font-style: italic;
}

.avatarButton{
  border-radius: 100%;
}
/**{
  box-sizing: border-box;
}*/

.wrapper{
  display:grid;
  grid-template-rows: 33% 33% 33%;
  grid-template-columns: 33% 33% 33%;
  padding-left: 250px;
  padding-right: 250px;
}

.avatars > input {
  display: none;
}

.avatars > input + img{
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 100%;
}

.avatars > input:checked + img{
  border: 2px solid forestgreen;
}

.form{
  padding-top: 50px;
  padding-bottom: 50px;
  padding-top: 50px;
  padding-right: 50px;
  padding-left: 50px;
  background-color: cadetblue;
  border: 0.3em solid black;
  overflow-y: auto;
  padding-left: 250px;
  padding-right: 250px;
}

.avatars img {
  /*border-radius: 100%;*/
  shape: rounded;
  padding: 15px;
  position: relative;
}

.backButton{
  position: fixed;
  bottom: 0em;
  left: 0em;
  width: 100px;
  height: 55px;
  background-color: forestgreen;
  color: white;
}

</style>