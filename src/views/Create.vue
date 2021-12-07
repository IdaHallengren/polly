


<template>


<div v-show="letsPlayButton">
  <div v-show="startPoll">

  <div class="headlines">
    <div> {{uiLabels.overview}} </div>
    <div> {{uiLabels.presentation}} </div>
    <div> {{uiLabels.editQuestion}}</div>
  </div>

  <div class="wrapper">
    <div id="overview">

      <div id="slides">

      <div id="overviewPresentationSlide">

      </div>
      </div>

      <button v-on:click="removeSlide"> {{ uiLabels.removeSlide }} </button>
      <button v-on:click="addSlide" > {{ uiLabels.addSlide }} </button>


    </div>


<div id="presentation" >
    <div>

    </div>
  <br>
  <br>


    <div></div>
    <div></div>

    <div>
<!--      {{uiLabels.question}}:-->
      <div v-if="typeOfQuestion!='Presentation'"> <!--This is to change the input area for when it is a presentation-->
      <input class="questionInput" type="text" v-model="question" placeholder="Write your question here" >
      </div>

      <div v-if="typeOfQuestion==='Presentation'">
        <input class="presentationInput" type="text" v-model="presentation" placeholder="Write your presentation here">
      </div>

      <p class="marginPresentation"> </p> <!--This is to put the whitespace between the question and the answers-->

<div v-if="typeOfQuestion!='Presentation'" class="answers" >
      <div >
        <br>
        {{ uiLabels.answers }}
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i"
            class="answersStyle"
        >

        <div v-if="typeOfQuestion==='Quiz' || typeOfQuestion==='Voting'" >



          <button v-on:click="removeAnswer" class="icon-btn add-btn">
            <div class="btn-txt">{{ uiLabels.removeAlternative }}</div>
          </button>
          <button  v-on:click="addAnswer" class="icon-btn add-btn" >
            <div class="add-icon"></div>
            <div class="btn-txt">{{ uiLabels.addAlternative }}</div>
          </button>


        </div>

        <br>
      </div>

  <br>

    <div>
    <button v-on:click="addQuestion">
      Add question
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    </div>
    </div>
    </div>


    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>


  <div id="editQuestion">
    <div id="v-model-select-question" class="typeOfQuestion">
      <br>
      <label> {{ uiLabels.chooseTypeOfQuestion }} </label>
      <br>
      <select v-model="typeOfQuestion" >
        <option v-on="showAnswerButton" > Quiz </option>
        <option v-on="showAnswerButton" > {{ uiLabels.voting }} </option>
        <option v-on="showAnswerButton=!showAnswerButton" > {{ uiLabels.trueOrFalse }} </option>
        <option v-on="showAnswerButton=!showAnswerButton" > Presentation </option>


      </select>
<!--  <span> Selected: {{ showAnswerButton }}</span>-->

    </div>


    <div id="v-model-select-time" class="timeForQuestion" v-if="typeOfQuestion!='Presentation'">
      <label>{{uiLabels.chooseTimeForQuestion }} </label>
      <br>
      <select v-model="timeForQuestion" >
        <option > 5s </option>
        <option> 10s </option>
        <option > 15s </option>
        <option > 20s </option>
        <option > 25s </option>
        <option > 30s </option>
        <option > 35s </option>
        <option > 40s </option>
        <option > 45s </option>
        <option > 50s </option>
        <option > 55s </option>
        <option > 60s </option>
      </select>
<!--       <span> Selected: {{ timeForQuestion }}</span>-->
    </div>

    <div v-if="typeOfQuestion!='Presentation'" id="v-model-select-points" class="pointsForQuestion">
      <label> {{ uiLabels.choosePointsForQuestion}}</label>
      <br>
      <select v-model="pointsForQuestion" >
        <option > 5p </option>
        <option > 10p </option>
        <option > 15p </option>
        <option > 20p </option>
        <option > 25p </option>
        <option > 30p </option>
      </select>
<!--      <span> Selected: {{ pointsForQuestion }}</span>-->
    </div>



<div v-on:click= "startPoll= !startPoll" id="startButton">

  <buttonCreatePoll class="noselect" v-on:click="createPoll">
    <span class='text'>{{ uiLabels.createPoll }}</span>
  </buttonCreatePoll>


<!--    <button v-on:click="createPoll">-->
<!--      {{ uiLabels.createPoll }}-->
<!--    </button>-->
</div>
  </div>
  </div>



  Poll link:
  <input type="text" v-model="pollId">


    <buttonCancel1 class="noselect" v-on:click="cancelPage">
      <span class='text'>Cancel</span>
    </buttonCancel1>

  </div>



<!--  NEXT PAGE  -->

<div v-show="!startPoll" class="wrapperWaitRoom">

  <div> </div>

  <div>
  <buttonCancel2 class="noselect" v-on:click="cancelPage">
    <span class='text'>Cancel</span>
  </buttonCancel2>
    </div>

  <div>
  <div class="pollIdStyle">
PollId: {{pollId}}
  </div>


<div id="QRCode">

  <qrcode-vue :value="qrValue" text="Hejhej"  :size="size" >

  </qrcode-vue>

</div>

  </div>





<div>  <h2> Waitingroom</h2>

  <form class = "waitingRoom">
    <div class = "wrapper">

    </div>

  </form>

</div>


<div>
  <buttonBack class="noselect" v-on:click="startPoll=!startPoll">
    <span class='text'> Back </span>
  </buttonBack>
</div>

  <div v-on:click="letsPlayButton=!letsPlayButton">
    <buttonLetsPlay class="noselect" v-on:click="letsPlay">
      <span class='text'> Let's play! </span>
    </buttonLetsPlay>
  </div>


</div>

</div>







</template>

<script>


import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'


import io from 'socket.io-client';
const socket = io();





export default {
  name: 'Create',
  components: {
    QrcodeVue
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      presentation: "",
      answers: ["", ""],
      slides: {},
      questionNumber: 0,
      data: {},
      uiLabels: {},
      typeOfQuestion: "Quiz",
      timeForQuestion: "5s",
      pointsForQuestion: "5p",
      showAnswerButton: true,
      startPoll: true,
      qrValue: "https://old.utn.se/sv/bokningskalendern",
      size: 300,
      letsPlayButton: true



    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
      console.log("Skickat info")
      this.getPollId();

    },
    getPollId: function () {
      return this.pollId=Math.floor(Math.random() * 100000);

    },

    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers});

    },

    addAnswer: function () {
      this.answers.push("")

    },
    removeAnswer: function () {
      if (this.answers.length === 1) {
        this.answers();
      }
      this.answers.pop();
    },


    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})

    },
    addSlide: function () {
      var p = document.createElement("DIV");
      p.setAttribute("style", "margin:10px;border:solid;border-radius:10%; background-color:white;height:200px");
      p.id="removeSlides"
      document.getElementById("slides").appendChild(p);

        var slides = html2canvas(document.querySelector("#presentation")).then(canvas => {
        document.body.appendChild(canvas)
        slides.id="removePictures"


      });


      // this.slides.push("")
    },

    removeSlide: function() {

      document.getElementById("slides").removeChild(document.getElementById("removeSlides"));
      document.getElementById('presentation').removeChild()

    },




    cancelPage: function() {
      this.$router.push( '/' )

    },

    letsPlay: function(){

    }

}}




</script>

<style>

.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  grid-gap: 2px;
  font-family: AppleGothic;

  height: 45em;
}

#overview{
  border:solid;
  border-radius: 2%;
  background-color: lightblue;
  overflow: scroll;

}

#presentation{
  border: solid;
  border-radius: 2%;
}

#editQuestion{
  border: solid;
  border-radius: 2%;
  background-color: lightblue;

}

.headlines{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 25% 50% 25%;
  font-size: 40px;
  font-family: AppleGothic;

}


.questionInput{
  height: 5em;
  width: 90%;
  font-size: 2vw;
}

.presentationInput{
  height: 5em;
  width: 90%;
  font-size: 2em;
}


.marginPresentation{
  margin-bottom: 20em;
}

.typeOfQuestion{
  font-size: 20px;
  margin-bottom: 30px;
}

.timeForQuestion{
  font-size: 20px;
  margin-bottom: 30px;
}


.pointsForQuestion{
  font-size: 20px;
}


.answers{
  font-size: 20px;
}

.answersStyle{
  height: 30px;
  width: 150px;
  font-size: 15px;
}

#overviewPresentationSlide{
  border:solid;
  border-radius: 10%;
  background-color: white;
  height: 200px;
  margin: 10px;
}

#startButton{
  margin-top: 30em ;
}

.pollIdStyle{
  background-color: lightblue;
  width: 10em;
  margin-left: 6em;
  margin-top: 4em;
  text-align: center;
  font-size: 2em;

}


#QRCode{
margin-top: 2em;
}



.wrapperWaitRoom{
  display: grid;
  grid-gap: 3em;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1% 79% 20%;
}

.waitingRoom{
  width: 8em;
  height: 28em;
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









.icon-btn {
  width: 50px;
  height: 50px;
  border: 1px solid #cdcdcd;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  transition: width 0.2s ease-in-out;
}
.add-btn:hover {
  width: 120px;
}
.add-btn::before,
.add-btn::after {
  transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 4px;
  width: 10px;
  top: calc(50% - 2px);
  background: plum;
}
.add-btn::after {
  right: 14px;
  overflow: hidden;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn::before {
  left: 14px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.icon-btn:focus {
  outline: none;
}
.btn-txt {
  opacity: 0;
  transition: opacity 0.2s;
}
.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}


.add-btn:hover .btn-txt {
  opacity: 1;
}
.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 20px;
  width: 2px;
  top: calc(50% - 10px);
  background: plum;
  overflow: hidden;
}
.add-icon::before {
  left: 22px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.add-icon::after {
  right: 22px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}





buttonCancel1{
  width: 150px;
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

/*button1, button1 span {*/
/*  transition: 200ms;*/
/*}*/

buttonCancel1 .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}



buttonCancel2{
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: red;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: #e62222;
  margin-left: 32em;
}

/*button1, button1 span {*/
/*  transition: 200ms;*/
/*}*/

buttonCancel2 .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}

/*button1 .icon {*/
/*  position: absolute;*/
/*  border-left: 1px solid #c41b1b;*/
/*  transform: translateX(110px);*/
/*  height: 40px;*/
/*  width: 40px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*}*/

/*button1 svg {*/
/*  width: 15px;*/
/*  fill: #eee;*/
/*}*/




buttonletsPlay{
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: green;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: green;
  margin-left: 32em;

}

buttonletsPlay .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}



buttonletsPlay:hover {
  background: green;
}



buttonCreatePoll{
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: green;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: green;
}

buttonCreatePoll .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}



buttonCreatePoll:hover {
  background: green;
}



buttonBack{
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: green;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  background: green;
  left: 0em;

}

buttonBack .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}



buttonBack:hover {
  background: green;
}



</style>