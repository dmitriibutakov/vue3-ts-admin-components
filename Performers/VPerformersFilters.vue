<template>
  <div class="filters">
    <button
      :class="['filters__link', { filters__link_active: getActiveFilterPerformers === v }]"
      v-for="(v, i) in filters"
      :key="i"
      @click="() => setActiveFilterPerformers(v && v)"
    >
      {{ v }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePerformersStore } from '@/stores/performers'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'VPerformersFilters',
  props: {
    filters: { type: Array as () => any, required: true }
  },
  setup() {
    const { getActiveFilterPerformers } = storeToRefs(usePerformersStore())
    const { setActiveFilterPerformers } = usePerformersStore()
    return { getActiveFilterPerformers, setActiveFilterPerformers }
  }
})
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  padding: 8px 0;
  margin-bottom: 8px;

  & > *:not(:last-child) {
    margin-right: 32px;
  }

  &__link {
    @include body-16-500;
    color: $secondaryDarkerColor;

    &_active {
      color: $primaryDarkestColor;
    }
  }
}
</style>
