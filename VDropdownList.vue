<template>
  <ul :class="'dropdown__list'">
    <li
      v-for="(v, i) in dropdownList"
      :key="i"
      class="dropdown__item"
      @click="(e) => clickCallback(e, v.id || i)"
    >
      <span v-if="typeof v === 'object' && v !== null && 'title' in v"> {{ v.title || '' }}</span>
      <span v-else-if="typeof v === 'string' && v?.length === 2">{{ t(`${v}`) }}</span>
      <span v-else> {{ v }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'VDropdownList',
  props: {
    withoutBorder: { type: Boolean },
    clickCallback: { type: Function, required: true },
    dropdownList: { type: Array, required: true }
  },
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>

<style scoped lang="scss">
.dropdown__list {
  position: absolute;
  top: 110%;
  left: 0;
  border-radius: 12px;
  border: 1px solid $secondaryLighterColor;
  width: 100%;
  max-width: 467px;
  min-height: 97px;
  height: 100%;
  max-height: 200px;
  z-index: 999;
  transition: $animation3ms;
  background-color: $secondaryLightestColor;
  @include body-12-400;
  overflow-y: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
    background-color: $secondaryLighterColor;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $primaryDarkestColor;
    border-radius: 4px;
  }

  & > :first-child {
    border-radius: 12px 12px 0 0;
  }

  & > :last-child {
    border-radius: 0 0 12px 12px;
  }

  .dropdown__item {
    display: flex;
    color: $secondaryDarkestColor;
    transition: $animation3ms;
    padding: 16px 8px;
    cursor: pointer;

    &:hover {
      background-color: $primaryLightestColor;
    }
  }
}
</style>
