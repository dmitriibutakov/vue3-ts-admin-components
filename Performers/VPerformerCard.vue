<template>
  <div class="performer">
    <div class="performer__row">
      <div class="performer__img">
        <img :src="data.avatar_url" alt="avatar" />
      </div>
      <div class="performer__userdata">
        <span class="performer__userdata_role">Expert</span>
        <h3 class="performer__userdata_name">John Saller</h3>
        <div class="performer__userdata_id">@{{ data.id }}</div>
      </div>
      <div class="performer__dates">{{ t('added') }}: 5 days ago {{ t('edited') }}: 3 days ago</div>
      <div class="performer__btns">
        <icon-dots />
      </div>
    </div>
    <div class="performer__row">
      <v-widgets v-for="(v, i) in icons" :key="i" :name="v.name" :text="v.text" />
    </div>
    <div class="performer__row">
      <v-btn-info :title="t('services', 2)" :quantity="0" />
      <v-btn-info :title="t('works', 2)" :quantity="5" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VBtnInfo from '@/components/Buttons/VBtnInfo.vue'
import VWidgets from '@/components/VWidgets.vue'
import { useI18n } from 'vue-i18n'
import IconDots from '@/components/Icons/IconDots.vue'

export default defineComponent({
  name: 'VPerformerCard',
  components: { IconDots, VWidgets, VBtnInfo },
  props: {
    data: { type: Object as () => any, required: true }
  },
  setup() {
    const { t } = useI18n()
    const icons = [
      { text: 'English, Russian', name: 'lang' },
      { text: `+573475734`, name: 'tel' },
      { text: 'lorem@lorem.io', name: 'mail' },
      { text: '@telegram', name: 'telegram' },
      { text: 'Active', name: 'active' }
    ]
    return {
      icons,
      t
    }
  }
})
</script>

<style scoped lang="scss">
.performer {
  position: relative;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid $secondaryLighterColor;
  @include flexColumnCenter;
  margin-bottom: 16px;

  & > :not(:last-of-type) {
    margin-bottom: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
    width: 100%;

    & > *:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__img {
    width: 64px;
    height: 64px;
    margin-right: 16px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__userdata {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &_role {
      @include body-12-500;
      text-transform: uppercase;
      color: $secondaryDarkerColor;
      margin-bottom: 2px;
    }

    &_name {
      @include body-18-600;
      color: $primaryDarkestColor;
      margin-bottom: 4px;
    }

    &_id {
      @include body-12-500;
      color: $secondaryDarkerColor;
    }
  }

  &__dates {
    position: absolute;
    right: 50px;
    @include body-14-400;
    color: $secondaryDarkerColor;
  }

  &__btns {
    position: absolute;
    right: 38px;
    height: 13px;

    img {
      height: 13px;
      width: 3px;
    }
  }
}
</style>
