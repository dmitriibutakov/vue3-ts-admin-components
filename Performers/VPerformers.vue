<template>
  <div class="performers__table">
    <transition-group name="card" tag="div" appear>
      <v-performer-card
        v-for="(v, i) in performers"
        :key="i"
        :data="v"
        :style="{ transitionDelay: `${i * 0.25}s` }"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VPerformerCard from '@/components/Performers/VPerformerCard.vue'

export default defineComponent({
  name: 'VPerformers',
  components: { VPerformerCard },
  props: {
    performers: { type: Array as () => any, required: true }
  },
  setup() {
    const limit = ref(10)
    return {
      limit
    }
  }
})
</script>

<style scoped lang="scss">
.performers__table {
  display: flex;
  flex-direction: column;

  .card-enter-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }

  .card-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .card-enter-to {
    opacity: 1;
    transform: translateY(0px);
  }

  .card-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }

  .card-leave-from {
    opacity: 1;
    transform: translateY(0%);
  }

  .card-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  /* Add a delay to the transition based on the index of the item */
}
</style>
