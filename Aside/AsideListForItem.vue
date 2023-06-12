<template>
  <transition name="fade" appear mode="out-in">
    <ul class="aside__list">
      <li
        v-for="n in listVariants"
        :class="t(activeFilter, 0) === t(n, 0) ? 'aside__list_item_active' : 'aside__list_item'"
        @click="() => setActiveFilterHandler(n)"
        :key="n"
      >
        {{ t(n, 0) }}
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AsideListForItem',
  props: {
    listVariants: {
      type: Array as () => string[] | undefined,
      required: true
    },
    activeFilter: {
      type: String,
      default: 'All'
    },
    setActiveFilter: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const setActiveFilterHandler = async (n: string) => {
      if (props.activeFilter !== n) {
        await props.setActiveFilter(n)
        await router.push({ name: `Classificator/${n}` })
      }
    }

    return {
      t,
      setActiveFilterHandler
    }
  }
})
</script>

<style scoped lang="scss">
.aside__list {
  position: relative;
  margin: 8px 0;
  border-radius: 12px;
  padding: 16px 0 16px 35px;
  background-color: $secondaryLightestColor;
  color: $secondaryDarkerColor;

  & > * {
    cursor: pointer;
    padding: 7px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 16px;
    height: calc(100% - 32px);
    width: 2px;
    background-color: $secondaryLightColor;
  }

  &_item {
    &:hover {
      color: $primaryDarkestColor;
      height: 100%;
      position: relative;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: -19px;
      height: 100%;
      width: 2px;
      background-color: $primaryDarkestColor;
    }
  }

  &_item_active {
    position: relative;
    transition: $animationColor;
    color: $primaryDarkestColor;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -19px;
      height: 33px;
      width: 2px;
      background-color: $primaryDarkestColor;
    }
  }

  &_item {
    & > *:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}
</style>
