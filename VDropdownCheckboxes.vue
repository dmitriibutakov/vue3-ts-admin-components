<template>
  <div :class="['dropdown__body']">
    <div
        :class="['dropdown__name']"
        @click.stop="toggleShow"
    >
      <div v-if="Object.values(checkboxes).every(el => !el)">
        {{ defaultActiveItem }}
      </div>
      <div v-else>
<span v-for="(v, i) in Object.keys(checkboxes)" :key="i">
  <template v-if="checkboxes[v] !== false">
    <span v-if="checkboxes[v]">
      {{ v }}
    </span>
    <span
        v-if="checkboxes[v] && i < Object.keys(checkboxes).length - 1 && (Object.values(checkboxes).filter(value => value === true).length > 1)">
      {{ ', ' }}
    </span>
  </template>
</span>
      </div>
      <div class="dropdown__arr">
        <icon-arrow :class="['dropdown__arr_up', { dropdown__arr_down: !isShowList }]"/>
      </div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <v-dropdown-list-checkboxes
          v-if="isShowList && dropdownList && !getIsLoading"
          @clickCheckbox="clickCheckbox"
          :checkboxes="checkboxes"
          :dropdown-list="dropdownList"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useCommonStore} from '@/stores/common'
import {storeToRefs} from 'pinia'
import IconArrow from '@/components/Icons/IconArrow.vue'
import VDropdownListCheckboxes from "@/components/VDropdownListCheckboxes.vue";

export default defineComponent({
  name: 'VDropdownCheckboxes',
  components: {VDropdownListCheckboxes, IconArrow},
  props: {
    dropdownList: {type: Array, required: true},
    defaultActiveItem: {type: String, required: true},
    checkboxes: {type: Object, required: true}
  },
  setup(props, {emit}) {
    const {getIsLoading} = storeToRefs(useCommonStore())
    const isShowList = ref(false)

    const toggleShow = async () => {
      await emit('setListCallback')
      isShowList.value = !isShowList.value
    }

    const closeList = () => {
      isShowList.value = false
    }

    const clickCheckbox = (name: string, evt: Boolean) => {
      emit('clickCheckbox', name, evt)
    }

    return {
      isShowList,
      toggleShow,
      closeList,
      clickCheckbox,
      getIsLoading
    }
  }
})
</script>

<style scoped lang="scss">
.dropdown__body {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;

  transition: $animation3ms;
  color: $secondaryDarkestColor;
  border: 1px solid $secondaryLighterColor;
  border-radius: 12px;
  background-color: $secondaryLightestColor;

  .dropdown__name {
    position: relative;
    display: flex;
    height: 43px;
    padding-left: 8px;
    @include body-14-400;
    justify-content: flex-start;
    width: calc(100% - 16px);
    align-items: center;
    transition: $animation3ms;


    .dropdown__arr {
      position: absolute;
      right: 6px;
      width: 16px;
      height: 16px;
      transform: rotate(-90deg);

      .dropdown__arr_up,
      .dropdown__arr_down {
        width: 100%;
        height: 100%;
        transition: $animation3ms;
      }

      .dropdown__arr_down {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
