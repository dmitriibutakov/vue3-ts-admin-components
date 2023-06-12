<template>
  <label class="container">
    <input
        v-bind="$attrs"
        class="input"
        type="checkbox"
        :checked="checked"
        @change="$emit('update', $event.target.checked)"
    />
    <span class="switch"></span>
  </label>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "VSwitch",
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  }
})
</script>

<style scoped lang="scss">
.container {
  cursor: pointer;
  display: flex;
  align-items: center;

  .input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .switch {
    --switch-container-width: 50px;
    --switch-size: calc(var(--switch-container-width) / 2);
    /* Vertically center the inner circle */
    display: flex;
    align-items: center;
    position: relative;
    height: var(--switch-size);
    flex-basis: var(--switch-container-width);
    border-radius: var(--switch-size);
    background-color: $secondaryLighterColor;
    flex-shrink: 0;
    transition: background-color 0.25s ease-in-out;

    &::before {
      content: "";
      position: absolute;
      left: 1px;
      height: calc(var(--switch-size) - 4px);
      width: calc(var(--switch-size) - 4px);
      border-radius: 9999px;
      background-color: white;
      border: 2px solid $secondaryLighterColor;
      transition: transform 0.375s ease-in-out;
    }
  }

  .input:checked + .switch {
    background-color: $primaryDarkestColor;
  }

  .input:checked + .switch::before {
    border-color: $primaryDarkestColor;
    /* Move the inner circle to the right */
    transform: translateX(
            calc(var(--switch-container-width) - var(--switch-size))
    );
  }

  .input:focus:checked + .switch::before {
    border-color: $primaryDarkestColor;
  }
}
</style>
