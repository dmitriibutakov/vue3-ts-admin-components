<template>
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 0.333984C15.841 0.333984 17.3333 1.82637 17.3333 3.66732V10.334C17.3333 12.1749 15.841 13.6673 14 13.6673H4C2.15905 13.6673 0.666668 12.1749 0.666668 10.334V3.66732C0.666668 1.82637 2.15905 0.333984 4 0.333984H14ZM7.33334 2.00065H10.6667V12.0007H7.33334V2.00065ZM5.66667 2.00065V12.0007H4C3.07953 12.0007 2.33334 11.2545 2.33334 10.334V3.66732C2.33334 2.74684 3.07953 2.00065 4 2.00065H5.66667ZM14 12.0007H12.3333V2.00065H14C14.9205 2.00065 15.6667 2.74684 15.6667 3.66732V10.334C15.6667 11.2545 14.9205 12.0007 14 12.0007Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconProjects',
  props: {
    fill: { type: String, default: '#525252' }
  }
})
</script>
