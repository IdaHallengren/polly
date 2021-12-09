<template>

<div id="wrapper">
  <div id="textColumn">
    <h2> Waiting for participants</h2>
    <h4>Please wait for the questionmaster to start the game!</h4>
  </div>

  <section id="waitingSection">


  </section>
</div>




</template>

<script>


export default {
  name: "Waiting"
}



</script>

<style scoped>

#textColumn{
  grid-column: 1;
}

#wrapper{
  display: grid;
  grid-template-columns: 40% 60%;
}

#waitingSection{
  grid-column: 2;
  border: 5px solid black;
  background-color: cadetblue;
  width: 50%;
  position: absolute;
  left: 40%;
  height: 90%
}


</style>