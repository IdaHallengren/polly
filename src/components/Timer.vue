<template>
  <div class="base-timer">
    <svg
        class="svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g class="circle">
        <circle
            class="path-elapsed"
            cx="50"
            cy="50"
            r="46.5"
        />
      </g>
    </svg>
    <span class="label">
      {{ formattedTimeLeft }}
    </span>
  </div>
</template>

<script>

export default {
  name: "Timer.vue",
  props: {
    timeLeft: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft

      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    }
  }
}
</script>

<style scoped>

.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
}

.circle {
    fill: none;
    stroke: none;
}

.path-elapsed {
    stroke-width: 7px;
    stroke: grey;
}

.label {
   position: absolute;
   width: 300px;
   height: 300px;
   top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 48px;
}



</style>