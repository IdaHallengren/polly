<template>
<div id = "Avatars">
  <div class = "avatars">

    <img class="avatars" v-bind:src= "avatar.url" style="width: 100px; height: 100px">

  </div>
</div>

</template>

<script>
export default {
  name: "AvatarLoop",
  props:{
    avatar:Object
  }
}
</script>

<style scoped>
#Avatars{

}

.avatars img {
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

.avatars > input:checked + img {
  border: 2px solid forestgreen;
}

#form{
  padding-top: 50px;
  padding-bottom: 50px;
  padding-right: 50px;
  padding-left: 50px;
  background-color: cadetblue;
  border: 0.3em solid black;
}

.avatars img {
  border-radius: 100%;
  padding: 15px;
  position: relative;
}

</style>