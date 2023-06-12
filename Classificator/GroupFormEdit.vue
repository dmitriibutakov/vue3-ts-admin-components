<template>
  <div class="body">
    <p class="name">{{ t('editGroups') }} {{ t(getActiveClassificator, 2) }}</p>
    <div class="forms">
      <div class="form___upd">
        <p class="form__desc">
          {{ t('editGroupsDesc') }}
        </p>
        <div class="form__inputs">
          <v-dropdown
            :name="'group'"
            :default-active-item="t('chooseGroup')"
            :disabled="getNamesGroups.length <= 1"
            :dropdown-list="getNamesGroups"
            @setActiveList="handleCustomChange"
          />
          <v-input
            :placeholder="t('setNewTitle')"
            :value="formData.updTitle"
            :name="'updTitle'"
            @customChange="handleCustomChange"
          />
        </div>
        <div class="buttons">
          <v-btn
            @onClick="editHandler"
            :title="t('edit', 1)"
            :disabled="!formData['group'] || !formData.updTitle"
          />
          <!--          <v-btn-->
          <!--            @onClick="deleteHandler"-->
          <!--            :disabled="formData.group.length < 1 || formData.group === 'All'"-->
          <!--            :title="t('delete')"-->
          <!--          />-->
        </div>
      </div>
      <div class="form__create">
        <p class="form__desc">
          {{ t('createGroupsDesc') }}
        </p>
        <div class="form__inputs">
          <v-input
            :placeholder="t('setNewTitle')"
            :value="formData.createTitle"
            :name="'createTitle'"
            @customChange="handleCustomChange"
          />
        </div>
        <div class="buttons">
          <v-btn
            :createStyle="true"
            @onClick="addHandler"
            :title="t('create')"
            :disabled="!formData.createTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useClassificatorStore } from '@/stores/classificator'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
import VBtn from '@/components/Buttons/VBtn.vue'
import VInput from '@/components/VInput.vue'
import VDropdown from '@/components/VDropdown.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'GroupFormEdit',
  components: { VDropdown, VInput, VBtn },
  setup() {
    const { t } = useI18n()
    const { addNewGroup, deleteGroup, editGroup } = useClassificatorStore()
    const { getNamesGroups, getActiveClassificator } = storeToRefs(useClassificatorStore())
    const { preloadFunction } = useCommonStore()
    const formData = ref({
      group: '',
      updTitle: '',
      createTitle: ''
    })

    const editHandler = async () => {
      const id = getNamesGroups.value.find((el) => el.title === formData.value.group)?.id
      const title = formData.value.updTitle || formData.value.group
      id && (await preloadFunction(editGroup({ id, title })))
    }

    const deleteHandler = async () => {
      const id = getNamesGroups.value.find((el) => el.title === formData.value.group)?.id
      id && (await preloadFunction(deleteGroup(id)))
    }

    const addHandler = async () => {
      await preloadFunction(addNewGroup(formData.value))
    }

    const handleCustomChange = (val: string, data: string) => {
      ;(formData.value as Record<string, string>)[val] = data.trim()
    }
    return {
      addHandler,
      deleteHandler,
      editHandler,
      formData,
      t,
      handleCustomChange,
      getNamesGroups,
      getActiveClassificator
    }
  }
})
</script>

<style scoped lang="scss">
.body {
  width: 100%;

  .name {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 24px;
    color: $primaryDarkestColor;
  }

  .forms {
    display: flex;
    flex-direction: column;

    .form___upd {
      margin-bottom: 32px;
    }

    .form___upd,
    .form__create {
      .form__desc {
        font-size: 16px;
        margin: 0 0 16px 0;
        line-height: 1.4;
        color: $primaryDarkestColor;
      }

      .form__inputs {
        flex: 1;
        margin-bottom: 16px;

        & > * {
          height: 43px;
        }

        & > :nth-child(2) {
          margin-top: 16px;
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
