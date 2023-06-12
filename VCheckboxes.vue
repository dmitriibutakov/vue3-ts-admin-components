<template>
  <div class="checkbox__wrapper">
    <v-checkbox v-for="(v, i) in checkboxes" :key="i"
                @setCheckbox="(val, evt) => clickCallback(val, evt, i)"
                :is-checked="checkedValue === i"
                :value="v"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue'
import VCheckbox from "@/components/VCheckbox.vue";

export default defineComponent({
  name: 'VCheckboxes',
  components: {VCheckbox},
  props: {
    checkboxes: {type: Array as () => string[], required: true},
    defaultText: {type: String, default: ''},
    bg: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const checkedValue: Ref<number> = ref(0)

    function clickCallback(value: string, evt: Event, index: number) {
      console.log(value, evt, index)
      emit('setCheckbox', value)
      checkedValue.value = index
    }

    return {
      checkedValue,
      clickCallback
    }
  }
})
</script>
<style scoped lang="scss">
.checkbox__wrapper {
  display: flex;
  align-items: center;
}
</style>
