<template>
  <div class = "avatars">

    <img id="avatarImg" v-on:click="avatarChange(avatar.url)"  v-bind:src="avatar.url">

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

#avatarImg{
  width: 100px;
  height: 100px;
}

.avatars img {
  border-radius: 100%;
  padding: 15px;
  position: relative;
  cursor: pointer;
  border: 2px outset transparent;
}

.avatars img:hover{
  border: 2px solid #228b22;
}

</style>