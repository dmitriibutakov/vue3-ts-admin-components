<template>
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6 0.5C5.58579 0.5 5.25 0.835786 5.25 1.25V5.75H0.75C0.335786 5.75 0 6.08579 0 6.5C0 6.91421 0.335786 7.25 0.75 7.25H5.25V11.75C5.25 12.1642 5.58579 12.5 6 12.5C6.41421 12.5 6.75 12.1642 6.75 11.75V7.25H11.25C11.6642 7.25 12 6.91421 12 6.5C12 6.08579 11.6642 5.75 11.25 5.75H6.75V1.25C6.75 0.835786 6.41421 0.5 6 0.5Z"
        :fill="fill"/>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'IconPlus',
  props: {
    fill: {type: String, default: '#525252'}
  }
})
</script>
