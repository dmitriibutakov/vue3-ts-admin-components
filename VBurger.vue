<template>
  <div :class="isShowMenu ? 'burger__active' : 'burger'" @click="$emit('onClick', !isShowMenu)">
    <span />
    <span />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VBurger',
  props: {
    isShowMenu: { type: Boolean, required: true }
  }
})
</script>

<style lang="scss" scoped>
.burger {
  width: 20px;
  height: 20px;
}

.burger,
.burger__active {
  display: flex;
  position: fixed;
  left: 8px;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-out;

  span {
    background-color: $secondaryLightestColor;
    width: 100%;
    height: 2px;
    transition: all 0.3s ease-in-out;
  }
}

.burger {
  &:first-child {
  }

  &:last-child {
    bottom: 4px;
  }
}

.burger__active {
  justify-content: space-between;
  width: 20px;
  height: 20px;

  span {
    &:first-child {
      transform: translateY(9.2px) rotate(45deg);
    }

    &:last-child {
      transform: translateY(-8.5px) rotate(-45deg);
    }
  }
}
</style>
