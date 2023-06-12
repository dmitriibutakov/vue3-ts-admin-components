<template>
  <div
    :class="[
      'dropdown__body',
      {
        dropdown__body_search: isSearchDropdown,
        dropdown__body_column: setList
      }
    ]"
  >
    <div
      v-click-outside="closeList"
      :class="['dropdown__name', { dropdown__name_border: setList }]"
      @click.stop="toggleShow"
    >
      {{ activeItem || defaultActiveItem }}
      <div class="dropdown__arr">
        <icon-arrow :class="['dropdown__arr_up', { dropdown__arr_down: !isShowList }]" />
      </div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <v-dropdown-list
        :withoutBorder="!!setList"
        v-if="isShowList && dropdownList && !getIsLoading"
        :click-callback="clickHandler"
        :dropdown-list="dropdownList"
      />
    </transition>
    <p v-if="error" class="dropdown__error">
      <icon-danger />
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import VDropdownList from '@/components/VDropdownList.vue'
import IconArrow from '@/components/Icons/IconArrow.vue'
import IconDanger from '@/components/Icons/IconDanger.vue'

export default defineComponent({
  name: 'VDropdown',
  components: { IconDanger, IconArrow, VDropdownList },
  props: {
    disabled: { type: Boolean, default: false },
    dropdownList: { type: Array, default: () => [] },
    name: { type: String, default: '' },
    setList: { type: Function, default: () => ({}) },
    defaultActiveItem: { type: String, required: true },
    isSearchDropdown: { type: Boolean, default: false },
    error: { type: String }
  },
  setup(props, { emit }) {
    const { getIsLoading } = storeToRefs(useCommonStore())

    const isShowList = ref(false)
    const activeItem = ref(props.defaultActiveItem || '')

    const toggleShow = async () => {
      await emit('setListCallback')
      isShowList.value = !isShowList.value
    }

    const closeList = () => {
      isShowList.value = false
    }

    const clickHandler = (evt: any, ind: number) => {
      activeItem.value = evt.target.innerText
      isShowList.value = false
      emit('setActiveList', props.name, evt.target.innerText, ind)
    }

    watch(
      () => props.defaultActiveItem,
      (newValue) => {
        if (newValue) {
          activeItem.value = newValue
        }
      }
    )

    return {
      isShowList,
      activeItem,
      toggleShow,
      closeList,
      clickHandler,
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

  &_search {
    background-color: transparent;
  }

  &_column {
    flex-direction: column;
  }

  .dropdown__error {
    @include flexCenterAll;
    @include body-14-500;
    position: absolute;
    left: 0;
    bottom: -1.5em;
    color: $primaryDarkestColor;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

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

    &_border {
      @include body-14-400;
    }

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

  &_search {
    border-radius: 100px;
    height: 100%;
    flex: 0 1 110px;
  }

  //&:hover {
  //  border: 1px solid $primaryLighterColor;
  //}
}
</style>
