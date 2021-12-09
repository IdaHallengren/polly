<template>
<div class="wrapper">

  <div id="slides">

<!--    <div v-for="questions in question" v-bind:key="questions">-->
<!--      {{questions.q }} {{questions.a}}-->
<!--    </div>-->

Hejhej

  </div>
</div>

</template>

<script>




export default {
  name: "SlideShow"








}
</script>

<style scoped>
.wrapper{
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 95% 5%;
}

#slides {
  border: solid;
  border-radius: 10%;
  background-color: white;
  height: 700px;
  width: 85%;
  margin: 10px;
}

</style>