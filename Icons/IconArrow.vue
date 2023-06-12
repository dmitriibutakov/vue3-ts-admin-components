<template>
  <svg width="20" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.82153 5.28596L10 4.10745L15.8926 10L10 15.8926L8.82153 14.7141L13.5356 10L8.82153 5.28596Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconArrow',
  props: {
    fill: { type: String, default: '#525252' }
  }
})
</script>
