<template>
  <div class="sorting">
    <v-dropdown v-for="(v, i) in dropdowns" :default-active-item="v" :key="i" />
    <v-btn :secondary="true">Reset</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VBtn from '@/components/Buttons/VBtn.vue'
import VDropdown from '@/components/VDropdown.vue'

export default defineComponent({
  name: 'VSortingLists',
  components: { VDropdown, VBtn },
  props: {
    dropdowns: { type: Array as () => string[], required: true }
  }
})
</script>

<style scoped lang="scss">
.sorting {
  display: flex;
  margin-bottom: 24px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
