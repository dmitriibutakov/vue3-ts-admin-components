<template>
  <label class="search__checkbox">
    <input
        type="checkbox"
        :checked="isChecked"
        @click="(evt) => clickCallback(value || '',evt)"
    />
    <span class="checkmark"/>
    {{ defaultText || value }}
  </label>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VCheckbox',
  props: {
    value: {type: String, default: ''},
    isChecked: {type: Boolean, required: true},
    defaultText: {type: String, default: ''},
  },
  setup(props, {emit}) {
    const clickCallback = (name: string, evt: Event) => {
      emit('clickCheckbox', name, (evt.target as HTMLInputElement).checked)
    }

    return {
      clickCallback
    }
  }
})
</script>
<style scoped lang="scss">
.search__checkbox {
  display: flex;
  @include body-14-500;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:not(:first-of-type) {
    margin-left: 16px;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 14px;
    width: 14px;
    border: 2px solid $primaryDarkestColor;
    border-radius: 4px;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 38%;
      top: 2px;
      width: 3px;
      height: 7px;
      border: solid $primaryDarkestColor;
      border-radius: 1px;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>
