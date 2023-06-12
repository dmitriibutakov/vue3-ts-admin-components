<template>
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.5 7.5C0.5 3.35786 3.85786 0 8 0C12.1421 0 15.5 3.35786 15.5 7.5C15.5 11.6421 12.1421 15 8 15C3.85786 15 0.5 11.6421 0.5 7.5ZM8 1.5C4.68629 1.5 2 4.18629 2 7.5C2 10.8137 4.68629 13.5 8 13.5C11.3137 13.5 14 10.8137 14 7.5C14 4.18629 11.3137 1.5 8 1.5Z"
      :fill="fill"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.75 3.75C8.75 3.33579 8.41421 3 8 3C7.58579 3 7.25 3.33579 7.25 3.75V6.75H4.25C3.83579 6.75 3.5 7.08579 3.5 7.5C3.5 7.91421 3.83579 8.25 4.25 8.25H7.25V11.25C7.25 11.6642 7.58579 12 8 12C8.41421 12 8.75 11.6642 8.75 11.25V8.25H11.75C12.1642 8.25 12.5 7.91421 12.5 7.5C12.5 7.08579 12.1642 6.75 11.75 6.75H8.75V3.75Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconAdd',
  props: {
    fill: { type: String, default: '#525252' }
  }
})
</script>
