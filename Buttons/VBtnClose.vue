<template>
  <button @click="$emit('onClick')" class="button">
    <slot>{{ name }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VBtnClose',
  props: {
    name: { type: String, default: '' },
    onClick: { type: Function, required: true }
  }
})
</script>

<style scoped lang="scss">
.button {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  background: $secondaryDarkerColor;
  border-radius: 3px;
  color: #fff;
  transition: $animationColor;

  &:disabled {
    background-color: #858585;
  }

  &:hover {
    background: $dangerDarkerColor;
    opacity: 1;
  }
}
</style>
