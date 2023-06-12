<template>
  <div>
    <p class="name">{{ t('add') }} {{ t(getActiveClassificator, 1) }}</p>
    <form @submit.prevent="onSubmit" class="form">
      <div v-for="(v, i) in formData" :key="i">
        <v-dropdown
          v-if="i !== 'filter'"
          :default-active-item="t('setNewGroup')"
          :dropdown-list="getNamesGroups"
          :name="i"
          @setActiveList="handleCustomChange"
          :error="formValidator[i]"
        />
        <v-input
          v-if="i === 'filter'"
          :placeholder="t('setName')"
          :value="v"
          :name="i"
          :error="formValidator[i]"
          @customChange="handleCustomChange"
        />
      </div>
      <v-btn>Save</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { isValidFormInput } from '@/helpers/isValidFormInput'
import { useClassificatorStore } from '@/stores/classificator'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import VBtn from '@/components/Buttons/VBtn.vue'
import VInput from '@/components/VInput.vue'
import VDropdown from '@/components/VDropdown.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FilterFormAdd',
  components: { VDropdown, VInput, VBtn },
  setup() {
    const { t } = useI18n()
    const { getNamesGroups, getActiveClassificator } = storeToRefs(useClassificatorStore())
    const { addNewFilter } = useClassificatorStore()
    const { preloadFunction } = useCommonStore()

    const disabledBtn: boolean = false
    const formData = ref({
      group: '',
      filter: ''
    })
    const formValidator = ref({
      group: '',
      filter: ''
    })

    const handleCustomChange = (val: 'group' | 'filter', data: string) => {
      formValidator.value[val] = ''
      formData.value[val] = data.trim()
    }

    const onSubmit = async (): Promise<any> => {
      isValidFormInput(formData.value, formValidator.value)
      if (Object.values(formData.value).every((el: string) => el.length > 0)) {
        await preloadFunction(addNewFilter(formData.value))
      }
    }

    return {
      disabledBtn,
      t,
      formData: formData.value,
      formValidator: formValidator.value,
      handleCustomChange,
      onSubmit,
      getActiveClassificator,
      getNamesGroups
    }
  }
})
</script>

<style scoped lang="scss">
.name {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
  color: $primaryDarkestColor;
}

.form {
  & > *:not(:last-child) {
    margin-bottom: 24px;
  }

  button {
    margin: 24px auto 0;
  }
}
</style>
