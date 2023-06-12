<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.3571 10.0223L13.5356 11.2008L10 14.7363L6.4645 11.2008L7.64301 10.0223L9.1667 11.546V5.26502H10.8334V11.546L12.3571 10.0223Z"
      :fill="fill"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.4818 16.4825C12.902 20.0623 7.098 20.0623 3.51819 16.4825C-0.0616155 12.9027 -0.0616155 7.09864 3.51819 3.51884C7.098 -0.0609671 12.902 -0.0609671 16.4818 3.51884C20.0616 7.09864 20.0616 12.9027 16.4818 16.4825ZM15.3033 15.304C12.3744 18.2329 7.62563 18.2329 4.6967 15.304C1.76777 12.375 1.76777 7.62628 4.6967 4.69735C7.62563 1.76842 12.3744 1.76842 15.3033 4.69735C18.2322 7.62628 18.2322 12.375 15.3033 15.304Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconRequests',
  props: {
    fill: { type: String, default: '#525252' }
  }
})
</script>
