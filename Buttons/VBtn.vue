<template>
  <button
      :class="[
      'btn',
      {
        btn__secondary: secondary,
        btn__white: whiteMode,
        btn__transparent: transparentMode,
        btn__danger: danger
      }
    ]"
      :disabled="disabled"
      @click="$emit('onClick')"
  >
    {{ title }}
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VBtn',
  props: {
    disabled: {type: Boolean, default: false},
    transparentMode: {type: Boolean, default: false},
    title: {type: String, default: ''},
    whiteMode: {type: Boolean, default: false},
    secondary: {type: Boolean, default: false},
    danger: {type: Boolean, default: false}
  }
})
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  @include flexCenterAll;
  max-width: 100%;
  min-width: 100px;
  padding: 14px 22px;
  border-radius: 100px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.21;
  transition: $animation3ms;
}

.btn {
  background-color: $primaryDarkestColor;
  color: $secondaryLightestColor;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    background-color: $primaryLightestColor;
    color: $primaryLighterColor;
  }

  &__secondary {
    color: $primaryDarkestColor;
    background-color: $primaryLightestColor;

    &:hover {
      color: $primaryDarkestColor;
      background-color: $primaryLightestColor;
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.1;
    }
  }

  &__white {
    background-color: $secondaryLightestColor;
    color: $primaryDarkestColor;

    &:hover {
      background-color: $primaryDarkestColor;
      color: $secondaryLightestColor;
    }
  }

  &__transparent {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &__danger {
    background: $dangerLightestColor;
    color: $dangerLightColor;
    &:disabled {
      opacity: .9;
    }
  }
}
</style>
