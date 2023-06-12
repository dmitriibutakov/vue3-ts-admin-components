<template>
  <thead>
    <tr class="table__header">
      <th class="table__header_column" />
      <th class="table__header_column">
        <v-btn-sort name="id" @setSort="sortColumn" />
      </th>
      <th class="table__header_column">
        <v-btn-sort name="title" @setSort="sortColumn" />
      </th>
      <th class="table__header_column">
        <v-btn-sort name="group" @setSort="sortColumn" />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassificatorStore } from '@/stores/classificator'
import { useCommonStore } from '@/stores/common'
import VBtnSort from '@/components/Buttons/VBtnSort.vue'

export default defineComponent({
  name: 'ClassificatorTableHeader',
  components: { VBtnSort },
  setup() {
    const { sortList } = useClassificatorStore()
    const { preloadFunction } = useCommonStore()

    const sortColumn = async (name: string, sort: string): Promise<any> => {
      const filterBy = name === 'group' ? 'group_title' : `element_${name}`
      let data = { order_by: filterBy, order_sort: sort }
      await preloadFunction(sortList(data))
    }

    return { sortColumn }
  }
})
</script>

<style scoped lang="scss">
.table__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  @include body-16-500;
  width: calc(100% - 24px);

  & > * {
    display: flex;
    align-items: center;
    color: $primaryDarkestColor;

    span {
      margin-right: 16px;
    }

    p {
      width: 60px;
    }
  }

  & > :nth-child(1),
  & > :nth-child(2) {
    flex: 0 0 7%;
  }

  & > :nth-child(3) {
    padding-left: 20px;
    flex: 1 1 auto;
  }

  & > :nth-child(2),
  & > :nth-child(3) {
    position: relative;
    cursor: pointer;
  }

  & > :last-child {
    flex: 0 0 15%;
  }

  @media (max-width: 1129px) {
  }
}
</style>
