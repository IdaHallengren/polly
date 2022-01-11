<template>
<!--  <p>{{questions.q}}</p>-->
  <div class="ordered-grid">
    <div v-for="(question, k) in questions"
         v-bind:class="['answer', {wiggle: currentlyMoving===question}]"
         draggable="true"
         v-on:mousedown="prepareDrag(question,k)"
         v-on:dragstart="startDrag($event)"
         v-on:dragenter="updatePosition($event, k)"
         v-on:dragend="drop"
         v-bind:key="'q'+ k"
         v-bind:ref="'q'+ k">
        {{question.q}} <ul><li v-for="a in question.a" :key="a"> {{a}}</li></ul>

    </div>
  </div>
</template>
<script>
export default {
  name: 'DragDrop',

  props: {
questions: Array,
  },

  data: function () {
    return {
/*      question: {
        [q: "Reorder these animals according to height (smallest first)",
        a:[
          {
            order: 3,
            text: 'Cat',
          },
          {
            order: 1,
            text: 'Mouse',
          },
          {
            order: 2,
            text: 'Giraffe',
          },
          {
            order: 4,
            text: 'Tyrannosaurus Rex',
          },
          {
            order: 5,
            text: 'Tyrannosaurus Lexus',
          }]

        ]
      },*/
      currentlyMoving: null,
      currentlyMovingIndex: 0
    }

  },

  methods: {
    updatePosition: function(e, d) {
      if (this.currentlyMoving != d) {
        for (let i=0; i<this.questions.length; i++) {
          if (e.target === this.$refs["q"+i]) {
            this.$emit('reorder',{ startDragIndex: this.currentlyMovingIndex, newDragIndex: i})
            break;
          }
        }
      }
    },
    drop: function() {
      this.currentlyMoving = null;
    },
    prepareDrag: function (a,i) {
      console.log('prepare drag',a)
      this.currentlyMoving = a;
      this.currentlyMovingIndex = i;

    },
    startDrag: function (e) {
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    }
  }
}
</script>
<style scoped>
.ordered-grid {
  display: grid;
  width:30em;
  margin:auto;
}
.answer {
  padding: 1em;
  border:1px solid black;
  user-drag: none;
}
.wiggle {
  animation: wiggle 0.1s ease-in-out;
  animation-iteration-count:infinite;
  background-color: pink;
}

@keyframes wiggle {
  0% {transform:rotate(0.5deg);}
  50% {transform:rotate(-0.5deg);}
  100% {transform:rotate(0.5deg);}
}
</style>