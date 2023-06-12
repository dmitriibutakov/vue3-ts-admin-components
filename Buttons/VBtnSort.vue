<template>
  <button @click="handleClick" class="btn">
    {{ name === 'group' ? t(name, 0) : t(name) }}
    <img src="@/assets/img/icons/sort.svg" alt="sort" />
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'VBtnSort',
  props: {
    name: { type: String, required: true }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    let sort = 'desc'
    const handleClick = () => {
      emit('setSort', props.name, sort)
      sort === 'inc' ? (sort = 'desc') : (sort = 'inc')
    }

    return {
      handleClick,
      t
    }
  }
})
</script>

<style scoped lang="scss">
.btn {
  @include flexCenterAll;
  @include body-14-500;
  color: $secondaryDarkestColor;

  img {
    margin-left: 8px;
    width: 7px;
    height: 10px;
  }
}
</style>
