
<template>
<!--  <div>
    {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>-->


<div id = "HideOk">
  <div v-show ="isThisVisible">

    <div class = "wrapper">
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

<!--  <div id = "ChosenProfile">

    <v-avatar>





    </v-avatar>



  </div>-->


<div id ="HideAvatars">
  <div v-if = "isThisVisible==false">













    <div id = "avatars">
      <form id = "form">
        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
              src= "https://www.loudegg.com/wp-content/uploads/2020/10/Patrick-Star.jpg" width="200px" height="220px" alt = "" />
        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHn_TpINxs0q_Hpn0nZhUCIayEig99hw7S9Q&usqp=CAU" alt = ""/>
        </label>
        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
              src = "https://i.pinimg.com/originals/ce/5f/53/ce5f53437e291c48705428721406985c.jpg" width="200px" height="220px" alt = ""/>
        </label>
        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
              src = "https://st.depositphotos.com/1787196/1330/i/600/depositphotos_13301967-stock-photo-furry-blue-monster.jpg" width="230px" alt = ""/>
        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJC_WmCWZS0lPcmq9PloqGY7L8wZgfs0Sww&usqp=CAU" width="230px" height="200px" alt=""/>
        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src="https://www.liveabout.com/thmb/b_XjAEyjRIBb-loREyq24Dmg4Sg=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc()/bart-simpson-58fe1f773df78ca159b60cc2.jpg" width="220px" alt=""/>
        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src="https://img.buzzfeed.com/buzzfeed-static/static/2018-08/1/16/tmp/buzzfeed-prod-web-06/18744028b408f907a59e0b9229fc85ef-8.jpg?downsize=900:*&output-format=auto&output-quality=auto" width="220px" alt=""/>

        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src="https://pleated-jeans.com/wp-content/uploads/2011/06/Kitty-White.jpeg" width="200px" height="220px"  alt=""/>

        </label>

        <label class = "avatars">
          <input type = "radio"
                 name = "avatar"/>
          <img
            src="https://www.how-to-draw-cartoons-online.com/image-files/xhow-to-draw-sonic.gif.pagespeed.ic.MhqtKIS1HE.png" width="200px" alt=""/>
        </label>











<!--    <button class = "avatarButton">
      <img src = "" id = "avatar1" onclick = butClick();>



    </button>-->

  </form>
    </div>
</div>
</div>
</template>

<script>
/*// @ is an alias to /src
import Question from '@/components/Question.vue';*/

import io from 'socket.io-client';

// import .....json
const socket = io();

export default {
  name: 'Poll',
  /*components: {
    Question
  },*/
  data: function () {
    return {
      // Avatars: Avatar,
      EnterName: "",
      isThisVisible: true,
      isThisHidden: false,
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
.wrapper{
  font-family: "Al Nile";
  padding-top: 200px;
  grid-template-rows: 100%;
}

#EnterName{
  width: 150px;
  height: 50px;
  font-size: larger;

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

#avatars{
  overflow-y: auto;
  grid-template-rows: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  padding-left: 250px;
  padding-right: 250px;

}
.avatars img:hover {
  border-radius: 100%;
  padding: 15px;
  position: relative;

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
#form{
  padding-top: 50px;
  padding-bottom: 50px;
  padding-top: 50px;
  padding-right: 50px;
  padding-left: 50px;
  background-color: cadetblue;
  border: 0.3em solid black;
}



</style>