<template>
<div class="drawAvatars">

    <div v-for="(question, k) in fullPoll['questions']"
         draggable="true"
         v-on:mousedown="prepareDrag(question,k)"
         v-on:dragstart="startDrag($event)"
         v-on:dragenter="updatePosition($event, k)"
         v-on:dragend="drop"
         v-bind:key="'q'+ k"
         v-bind:ref="'q'+ k"
         v-bind:class="['slides', {wiggleAll: drag}]">

         <div class="overview">{{fullPoll['questions'][k].q}}<br></div>

        <div class="answerLayout" >
          <div class="oneQuestion" v-for="answer in fullPoll['questions'][k].a" :key="answer">{{answer}}</div>
          <div style="font-style: italic">{{uiLabels.timeSlide}}{{fullPoll['questions'][k].timeForQuestion}}s, {{uiLabels.pointsSlide}}{{fullPoll['questions'][k].pointsForQuestion}}p</div>
        </div>

    </div>
</div>

</template>
<script>

export default {
  name: 'DragDrop',

  props: {
    questions: Array,
    drag: Boolean,
    fullPoll: Object,
    uiLabels: Object,
  },

  data: function () {
    return {
      currentlyMoving: null,
      currentlyMovingIndex: 0,
      draggable: false
    }

  },

  methods: {
    updatePosition: function(e, d) {
      if(this.drag) {
      if (this.currentlyMovingIndex != d) {
        for (let i=0; i<this.questions.length; i++) {
          if (e.target === this.$refs["q"+i]) {
            this.$emit('reorderDisplay', {startDragIndex: this.currentlyMovingIndex, newDragIndex: i})
            this.currentlyMovingIndex = i;
            break;
          }
          }
        }
      }
    },

    drop: function() {
      this.currentlyMoving = null;
      this.$emit('drop')
    },
    prepareDrag: function (a,i) {
      if(this.drag) {
        console.log('prepare drag', a)
        this.currentlyMoving = a;
        this.currentlyMovingIndex = i;
      }
    },

    startDrag: function (e) {
      if(this.drag) {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
      }
    }
  }
}
</script>
<style scoped>

.slides{
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 25vh;
  width: 20vw;
  margin: 2vh;
  font-size: 1vw;
  place-content: center;
  padding-bottom: 1vh;
}

.drawAvatars{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
}

.overview {
  font-size: 1.2vw;
  margin-top: 5%;
  font-weight: bold;
  place-content: center;
  user-drag: none;
}

/*.wiggle {
  animation: wiggle 0.2s ease-in-out;
  animation-iteration-count:infinite;
  background-color: forestgreen;
}*/

.wiggleAll {
  animation: wiggle 0.2s ease-in-out;
  animation-iteration-count:infinite;
  background-color: lightgrey;
}

.answerLayout{
  display: grid;
  margin-bottom: 25%;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  margin-top: 15%;
}

.oneQuestion{
  margin-bottom:10%;
  margin-left: 10%;
  margin-right: 10%;
}

@keyframes wiggle {
  0% {transform:rotate(0.5deg);}
  50% {transform:rotate(-0.5deg);}
  100% {transform:rotate(0.5deg);}
}
</style>