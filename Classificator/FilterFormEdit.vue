<template>
  <div>
    <p class="name">{{ t(`edit`, 1) }} {{ t(`expertise`, 1) }} {{ activeItem?.title }}</p>
    <form @submit.prevent="onSubmit" class="form">
      <div v-for="(v, i) in formData" :key="i">
        <v-input
          v-if="i === 'title'"
          :placeholder="t('setNewTitle')"
          :value="v"
          :name="i"
          @customChange="handleCustomChange"
        />
        <div class="desc" v-if="i === 'group_title'"></div>
        <v-dropdown
          v-if="i === 'group_title'"
          :name="i"
          :default-active-item="t('changeGroup')"
          :dropdown-list="getNamesGroups"
          @setActiveList="handleCustomChange"
        />
      </div>
      <v-btn :disabled="Object.values(formData).some((el) => !el)" :title="t('save')" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import { useClassificatorStore } from '@/stores/classificator'
import { storeToRefs } from 'pinia'
import VBtn from '@/components/Buttons/VBtn.vue'
import VDropdown from '@/components/VDropdown.vue'
import VInput from '@/components/VInput.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterFormEdit',
  components: { VInput, VDropdown, VBtn },
  props: {
    activeItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const { getNamesGroups } = storeToRefs(useClassificatorStore())
    const { editFilter } = useClassificatorStore()
    const formData: Ref<Record<string, any>> = ref(props.activeItem)

    const onSubmit = async () => {
      const res = getNamesGroups.value.find((el) => el.title === formData.value.group_title)?.id
      if (res) {
        formData.value.group_id = res
      }
      await editFilter(formData.value)
    }

    const handleCustomChange = (val: string, data: string) => {
      formData.value[val] = data.trim()
    }

    return {
      formData,
      t,
      getNamesGroups,
      onSubmit,
      handleCustomChange
    }
  }
})
</script>

<style scoped lang="scss">
.name {
  @include body-18-500;
  margin-bottom: 24px;
  color: $primaryDarkestColor;
}

.desc {
  margin-bottom: 16px;
}

.form {
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }

  button {
    margin: 24px auto 0;
  }
}
</style>
