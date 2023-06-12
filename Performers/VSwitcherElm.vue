<template>
  <div class="switcher">
    <div class="switcher__col">
      <div class="switcher__name">
        {{ name }}
      </div>
      <div class="switcher__desc">
        {{ desc }}
      </div>
    </div>
    <div class="switcher__col">
      <v-switch :checked="checked" @update=" (val) => $emit('updateCheck', val)"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import VSwitch from "@/components/VSwitch.vue";

export default defineComponent({
  name: 'VSwitcherElm',
  components: {VSwitch},
  props: {
    checked: {type: Boolean, required: true},
    name: {type: String, required: true},
    desc: {type: String, required: true}
  }
})
</script>

<style scoped lang="scss">
.switcher {
  padding: 12px;
  border-radius: 16px;
  border: 1px solid $secondaryLighterColor;
  display: flex;
  justify-content: space-between;
  &__col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 60px;
    &:first-of-type {
      margin-right: 16px;
    }
  }

  &__name {
    @include body-16-600;
    margin-bottom: 2px;
  }

  &__desc {
    @include body-14-400;
    color: $secondaryDarkerColor;
  }
}
</style>
