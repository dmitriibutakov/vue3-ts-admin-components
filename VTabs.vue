<template>
  <div class="tabs">
    <div
      :class="['tab', { tab__active: activeTab === v }]"
      v-for="(v, i) in tabs"
      @click="$emit('SetActiveTab', v)"
      :key="i"
    >
      {{ v }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VTabs',
  props: {
    tabs: { type: Array, required: true },
    activeTab: { type: String, required: true }
  }
})
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin: 0 auto;
  @include body-14-600;

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 30px;
    border-bottom: 2px solid $secondaryLighterColor;
    cursor: pointer;
    min-width: 120px;

    &__active {
      border-bottom: 2px solid $primaryDarkestColor;
      color: $primaryDarkestColor;
    }
  }
}
</style>
