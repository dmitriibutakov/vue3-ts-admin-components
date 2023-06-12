<template>
  <div class="chip">

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VChip',
  props: {
    name: {type: String, required: true}
  }
})
</script>
<style lang="scss" scoped>
.chip {

}
</style>
