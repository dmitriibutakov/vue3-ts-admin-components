<template>
  <div>
    <h3 class="text">{{ t('confirmDelete') }} {{ activeItem?.title }}??</h3>
    <div class="buttons">
      <v-btn :title="t('yes')" @onClick="deleteFilterCallback(activeItem?.id)" />
      <v-btn :title="t('no')" @onClick="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassificatorStore } from '@/stores/classificator'
import { useCommonStore } from '@/stores/common'
import VBtn from '@/components/Buttons/VBtn.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterFormDelete',
  components: { VBtn },
  props: {
    activeItem: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    const store = useClassificatorStore()
    const { preloadFunction } = useCommonStore()
    const closeModal = () => (store.isModalOpen = false)
    const deleteFilterCallback = async (id: number): Promise<any> => {
      await preloadFunction(store.deleteFilter(id))
    }

    return {
      deleteFilterCallback,
      closeModal,
      t
    }
  }
})
</script>

<style scoped lang="scss">
.text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;

  & > :first-child {
    margin-right: 32px;
  }
}
</style>
