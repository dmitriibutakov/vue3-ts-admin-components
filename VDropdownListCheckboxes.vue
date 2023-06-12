<template>
  <ul class="dropdown__list">
    <li class="dropdown__item" v-for="(v, i) in dropdownList"
        :key="i">
      <v-checkbox
          @clickCheckbox="clickCheckbox"
          :is-checked="checkboxes[v]" :value="v"/>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import VCheckbox from "@/components/VCheckbox.vue";

export default defineComponent({
  name: 'VDropdownListCheckboxes',
  components: {VCheckbox},
  props: {
    dropdownList: {type: Array, required: true},
    checkboxes: {type: Object, required: true}
  },
  setup(props, {emit}) {
    const {t} = useI18n()
    const clickCheckbox = (name: string, evt: Boolean) => {
      emit('clickCheckbox', name, evt)
    }
    return {
      t, clickCheckbox
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
