<template>
  <div class="navigation__item">
    <button
      :class="
        `/${route.path.split('/')[1]}` === asideData.location
          ? 'navigation__item_title-active'
          : 'navigation__item_title'
      "
      :disabled="asideData.location[0] !== '/'"
      @click="handleClick"
    >
      <v-icons
        :name="t(asideData.title)"
        :fill="`/${route.path.split('/')[1]}` === asideData.location ? '#01367c' : '#fff'"
      />
      {{ t(asideData.title) }}
      <icon-up
        v-if="t(asideData.title) === t('classificator')"
        :class="['dropdown__arr_up', { dropdown__arr_down: !isShowList }]"
        :fill="`/${route.path.split('/')[1]}` === asideData.location ? '#01367c' : '#fff'"
      />
    </button>
    <nav class="navigation__nav">
      <aside-list-for-item
        v-if="isShowList"
        :listVariants="asideData.listVariants"
        :set-active-filter="setActiveClassificator"
        :active-filter="getActiveClassificator"
      />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useClassificatorStore } from '@/stores/classificator'
import router from '@/router'
import { storeToRefs } from 'pinia'
import AsideListForItem from '@/components/Aside/AsideListForItem.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import IconUp from '@/components/Icons/IconUp.vue'
import VIcons from '@/components/Icons/VIcons.vue'

export default defineComponent({
  name: 'AsidePanelItem',
  components: { VIcons, IconUp, AsideListForItem },
  props: {
    asideData: {
      type: Object as () => {
        title: string
        location: string
        listVariants?: string[]
      },
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const route = useRoute()
    const { setActiveClassificator } = useClassificatorStore()
    const { activeClassificator } = storeToRefs(useClassificatorStore())
    const { getActiveClassificator } = storeToRefs(useClassificatorStore())
    const isShowList = ref(false)
    const handleClick = () => {
      switch (props.asideData.location) {
        case '/auth/logout': {
          useAuthStore().setLogout()
          break
        }
        case '/classificator': {
          if (
            !isShowList.value &&
            router.currentRoute.value.fullPath !== props.asideData.location
          ) {
            activeClassificator.value = 'expertise'
            router.push('/classificator/expertise')
          }
          isShowList.value = !isShowList.value
          break
        }
        default: {
          router.push(props.asideData.location)
          break
        }
      }
    }
    return {
      isShowList,
      setActiveClassificator,
      getActiveClassificator,
      route,
      t,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.navigation__item {
  @include body-14-500;
  position: relative;
  width: 100%;

  .dropdown__arr_up,
  .dropdown__arr_down {
    margin-left: 24px;
    width: 12px;
    height: 12px;
    transition: $animation3ms;
  }

  .dropdown__arr_down {
    transform: rotate(180deg);
  }

  &_title,
  &_title-active {
    display: inline-flex;
    align-items: center;
    @include body-14-500;
    width: 100%;
    max-width: 204px;
    padding: 16px 16px 16px 48px;
    border-radius: 12px;
  }

  &_title {
    color: $secondaryLightestColor;

    &:disabled {
      opacity: 0.5;
    }

    &-active {
      background-color: $secondaryLightestColor;
    }
  }
}
</style>
