<template>
  <button class="iconButton" :style="style" :aria-label="ariaLabel" v-on:click="onButtonPress()">
    <svg class="iconButton__symbol">
      <use :href="iconRef"></use>
    </svg>
    <span class="sr-only">{{ariaLabel}}</span>
  </button>
</template>
<script>
export default {
  name: 'IconButton',
  props: {
    value: {
      type: String
    },
    ariaLabel: {
      type: String,
      default: 'Button'
    },
    iconId: {
      type: String
    },
    size: {
      type: Number,
      default: 32
    },
    action: {
      type: Function
    }
  },
  data() {
    return {
      style: {
        '--buttonSize': `${this.size}px`
      }
    };
  },
  computed: {
    iconRef() {
      return `#${this.iconId}`;
    }
  },
  methods: {
    onButtonPress() {
      this.action();
    }
  }
};
</script>
<style>
.iconButton {
  position: relative;
  width: var(--buttonSize);
  height: var(--buttonSize);
  padding: 6px;
  border: 0;
}

.iconButton__symbol {
  width: 100%;
  height: 100%;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
