<template>
  <div class="sorting">
    <v-btn-sort v-for="(v, i) in ['abc', 'byDateChange', 'byDateCreate']" :name="v" :key="i" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VBtnSort from '@/components/Buttons/VBtnSort.vue'

export default defineComponent({
  name: 'VSorting',
  components: { VBtnSort }
})
</script>

<style scoped lang="scss">
.sorting {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
}
</style>
