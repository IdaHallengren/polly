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
            r="45"
        />
        <path
            :stroke-dasharray="circleDasharray"
            :class="remainingPathColor"
            class="path-remaining"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>
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
    timeLimit: Number,
    timeLeft: {
      type: Number,
      required: true
    },
    alertThreshold: {
      type: Number,
      default: 5
    },
    warningThreshold: {
      type: Number,
      default: 10
    },
  },

  computed: {
    circleDasharray() {
      return `${(this.timeFraction * 283).toFixed(0)} 283`;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit

      return rawTimeFraction -
          (1 / this.timeLimit) * (1 - rawTimeFraction)
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft

      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    },

    colorCodes() {
      return {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.warningThreshold
        },
        alert: {
          color: "red",
          threshold: this.alertThreshold
        }
      }
    },

    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  }
}
</script>

<style scoped>

.base-timer {
  position: relative;
  width: 21vw;
  height: 21vw;
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
   width: 21vw;
   height: 21vw;
   top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 3vw;

}

.path-remaining {
   stroke-width: 7px;
   stroke-linecap: round;
   transform: rotate(90deg);
   transform-origin: center;
   transition: 1s linear all;
   stroke: currentColor;
}

.svg {
transform: scaleX(-1);
}

.green {
   color: rgb(65, 184, 131);
}

.orange {
   color: orange;
}

.red {
   color: red;
 }

</style>