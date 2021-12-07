<template>
  <div class = "avatars">

    <img class="avatars" v-on:click="avatarChange(avatar.url)"  v-bind:src= "avatar.url"  style="width: 100px; height: 100px">

  </div>
</template>

<script>

export default {
  name: "AvatarLoop",
  props:{
    avatar:Object
  },
  data: function () {
    return {
      url: "",
    }
  },
methods: {

  avatarChange: function (url) {
    this.url = url
    this.$emit('participantImg', this.url)

  },

}
}
</script>

<style scoped>

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


</style>