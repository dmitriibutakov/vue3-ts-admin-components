<template>
  <button
      @click="$emit('onClick')"
      @mouseover="fillData = '#fff'"
      @mouseleave="fillData = '#525252'"
  >
    <IconPlus :fill="fillData"/>
    <span>
    {{ title }}
      </span>
  </button>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import IconPlus from "@/components/Icons/IconPlus.vue";

export default defineComponent({
  name: 'VBtnPlus',
  components: {IconPlus},
  props: {
    title: {type: String, default: ''}
  },
  setup() {
    const fillData = ref('#525252')
    return {fillData}
  }
})
</script>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 1px solid $secondaryDarkerColor;
  border-radius: 16px;
  min-width: 80px;
  color: $secondaryDarkerColor;

  &:hover {
    background-color: $primaryDarkestColor;
    border: 1px solid $primaryDarkestColor;
    color: $secondaryLightestColor;
  }

  span {
    @include body-14-500;
    margin-left: 8px;
  }
}
</style>
