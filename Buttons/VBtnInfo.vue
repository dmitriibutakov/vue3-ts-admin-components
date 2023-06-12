<template>
  <button :class="['btn']" :disabled="disabled" @click="$emit('onClick')">
    <img src="@/assets/img/icons/info.svg" alt="icons" /> {{ title }}
    <span>{{ quantity }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VBtnInfo',
  props: {
    disabled: { type: Boolean, default: false },
    title: { type: String, required: true },
    quantity: { type: Number, required: true }
  }
})
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  @include body-14-600;
  text-transform: capitalize;

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  img {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }

  span {
    background-color: $primaryLightestColor;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-left: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: $primaryDarkestColor;
  }
}
</style>
