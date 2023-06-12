<template>
  <transition name="fade" mode="out-in" appear>
    <div class="table">
      <div class="table__nav">
        <h1 class="table__title">{{ t(getActiveClassificator, 0) }}</h1>
      </div>
      <div class="table__view">
        <!--        actions-->
        <div class="table__actions">
          <div class="table__actions_col">
            <v-btn class="table__actions_btn" @onClick="() => setModalView('addFilter', '')">
              <icon-add :fill="'#fff'" />
              {{ t('add') }} {{ t(getActiveClassificator, 1) }}
            </v-btn>
            <v-input
              :name="'message'"
              :value="message"
              :is-search="true"
              :placeholder="`${t('search')} ${t(getActiveClassificator, 2)}`"
              @customChange="(name, value) => handlerSearch(name, value, findFilter)"
            />
          </div>
          <div class="table__actions_col">
            <div class="table__actions_ttl">{{ t('chooseGroup') }}</div>
            <span>
              <v-dropdown
                :default-active-item="getActiveGroup === '' ? 'All' : getActiveGroup"
                :disabled="getNamesGroups.length <= 1"
                :dropdown-list="getNamesGroups"
                @setActiveList="setActiveGroupCallback"
              />
            </span>
            <v-btn class="table__btn" @onClick="() => setModalView('editGroup', '')"
              >{{ t('editGroups') }}
            </v-btn>
          </div>
        </div>
        <table class="table__block">
          <classificator-table-header />
          <classificator-nodata v-if="getActiveList.length < 1" />
          <tbody v-else class="table__body">
            <tr class="table__body_row" v-for="(data, index) in getActiveList" :key="index">
              <td>
                <button @click="() => setModalView('editFilter', data)">
                  <icon-pencil />
                </button>
                <button @click="() => setModalView('deleteFilter', data)">
                  <icon-trash />
                  <!--                <img src="@/assets/img/trash.svg" alt="edit"/>-->
                </button>
              </td>
              <td>
                {{ data?.id }}
              </td>
              <td>
                {{ data?.title }}
              </td>
              <td>
                {{ data?.group_title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--    modal-->
      <modal-layout @toggleModal="(v) => (isModalOpen = v)" v-if="getIsModalOpen">
        <filter-form-add v-if="getModalsTable.addFilter" />
        <filter-form-edit v-if="getModalsTable.editFilter" :active-item="getActiveItemTable" />
        <filter-form-delete v-if="getModalsTable.deleteFilter" :active-item="getActiveItemTable" />
        <group-form-edit v-if="getModalsTable.editGroup" />
      </modal-layout>
      <v-pagination
        :active-page="getActivePage"
        :count-page="getCountPage"
        :changePageCallback="changePageCallback"
      />
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useClassificatorStore } from '@/stores/classificator'
import { useCommonStore } from '@/stores/common'
import resetForm from '@/helpers/resetForm'
import useGlobal from '@/main'
import { storeToRefs } from 'pinia'
import VPagination from '@/components/VPagination.vue'
import GroupFormEdit from '@/components/Classificator/GroupFormEdit.vue'
import FilterFormDelete from '@/components/Classificator/FilterFormDelete.vue'
import FilterFormEdit from '@/components/Classificator/FilterFormEdit.vue'
import FilterFormAdd from '@/components/Classificator/FilterFormAdd.vue'
import ModalLayout from '@/layouts/ModalLayout.vue'
import ClassificatorNodata from '@/components/Classificator/ClassificatorNodata.vue'
import ClassificatorTableHeader from '@/components/Classificator/ClassificatorTableHeader.vue'
import VDropdown from '@/components/VDropdown.vue'
import VInput from '@/components/VInput.vue'
import VBtn from '@/components/Buttons/VBtn.vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import IconTrash from '@/components/Icons/IconTrash.vue'
import IconAdd from '@/components/Icons/IconAdd.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'

export default defineComponent({
  name: 'ClassificatorTable',
  components: {
    IconPencil,
    IconAdd,
    IconTrash,
    VBtn,
    VInput,
    VDropdown,
    ClassificatorTableHeader,
    ClassificatorNodata,
    ModalLayout,
    FilterFormAdd,
    FilterFormEdit,
    FilterFormDelete,
    GroupFormEdit,
    VPagination
  },
  setup() {
    const { t } = useI18n()
    const { message } = useGlobal()
    const { handlerSearch } = useGlobal()
    let { activeItemTable } = storeToRefs(useClassificatorStore())
    const {
      getActiveList,
      modalsTable,
      isModalOpen,
      getIsModalOpen,
      getActiveClassificator,
      getModalsTable,
      getActiveGroup,
      activeClassificator,
      getActiveItemTable,
      getActivePage,
      getCountPage,
      getNamesGroups
    } = storeToRefs(useClassificatorStore())
    const { setActiveGroup, changePage, findFilter, setActiveClassificator } =
      useClassificatorStore()
    activeClassificator.value = router.currentRoute.value.name?.toString().split('/')[1] || ''
    if (getActiveList.value.length < 1) {
      setActiveClassificator(getActiveClassificator.value)
    }
    const setActiveGroupCallback = async (name: string, val: any): Promise<any> => {
      await useCommonStore().preloadFunction(setActiveGroup(val))
    }

    const changePageCallback = async (page: number) => {
      await useCommonStore().preloadFunction(changePage(page))
    }

    const setModalView = (
      group: 'addFilter' | 'deleteFilter' | 'editFilter' | 'editGroup',
      item: any
    ) => {
      resetForm(modalsTable.value)
      activeItemTable.value = item
      modalsTable.value[group] = true
      isModalOpen.value = true
    }
    return {
      changePageCallback,
      getActiveItemTable,
      getModalsTable,
      getIsModalOpen,
      setModalView,
      isModalOpen,
      getActivePage,
      getCountPage,
      getActiveList,
      setActiveGroupCallback,
      findFilter,
      getNamesGroups,
      getActiveGroup,
      handlerSearch,
      message,
      t,
      getActiveClassificator
    }
  }
})
</script>

<style lang="scss" scoped>
.table {
  width: 100%;

  &__nav {
    padding: 18px 24px;
    background-color: white;
    @media (max-width: 1129px) {
      margin-bottom: 16px;
    }

    .table__title {
      @include body-24-600;
    }
  }

  &__view {
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: calc(100% - 48px);
    @media (max-width: 1129px) {
      padding: 0 16px;
      width: calc(100% - 32px);
    }

    .table__actions {
      display: flex;
      padding: 8px 0;
      margin-bottom: 16px;
      align-items: center;
      justify-content: space-between;

      &_ttl {
        display: flex;
        align-items: center;
        width: 150px;

        color: $primaryDarkestColor;
        @include body-14-500;
        margin: 0 16px;
      }

      &_dropdown {
        width: 180px;
      }

      &_btn {
        min-width: 200px;

        & > :first-child {
          margin-right: 8px;
        }

        //span {
        //  margin-left: 8px;
        //}
      }

      &_col {
        display: flex;
        height: 43px;

        .table__btn {
          width: 100%;
          max-width: 230px;
        }

        span {
          width: 200px;
        }

        & > :last-child {
          margin-left: 16px;
        }
      }

      &_add {
        margin-right: 8px;
        width: 18px;
        height: 18px;
      }

      @media (max-width: 1129px) {
        flex-direction: column;
        align-items: flex-start;
        & > :first-child {
          margin-bottom: 24px;
        }
      }
    }
  }

  &__block {
    .table__body {
      min-height: 420px;

      &_row {
        display: flex;
        align-items: center;
        width: calc(100% - 24px);
        padding: 12px 0;
        border-bottom: 0.5px solid $secondaryDarkerColor;

        & > :nth-child(1),
        & > :nth-child(2) {
          flex: 0 0 7%;
        }

        & > :nth-child(1) {
          display: flex;
          align-items: center;

          svg:first-of-type {
            margin-right: 16px;
          }
        }

        & > :nth-child(3) {
          padding-left: 20px;
          flex: 1 1 auto;
          @media (max-width: 1129px) {
          }
        }

        & > :nth-child(4) {
          flex: 0 0 15%;
        }

        & :first-child {
          img {
            display: flex;
            align-items: center;
            height: 17px;
            margin-right: 16px;
          }
        }
      }
    }
  }
}
</style>
