<template>
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.2428 7.18183L11.3034 6.12117L6.00011 0.817871L0.696777 6.1212L1.75744 7.18186L6.00011 2.93919L10.2428 7.18183Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconUp',
  props: {
    fill: { type: String, default: '#525252' }
  }
})
</script>
