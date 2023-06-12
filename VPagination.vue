<template>
  <div class="pagination">
    <div class="pagination__body">
      <button @click="leftClick" class="pagination__btn pagination__btn_left">
        <icon-arrow :fill="'#01367c'" />
      </button>
      <button
        v-for="(v, i) in links"
        :key="i"
        @click="clickHandler"
        :class="v === activePage ? 'pagination__btn_active' : 'pagination__btn'"
      >
        {{ v }}
      </button>
      <button @click="rightClick" class="pagination__btn">
        <icon-arrow :fill="'#01367c'" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import IconArrow from '@/components/Icons/IconArrow.vue'

export default defineComponent({
  name: 'VPagination',
  components: { IconArrow },
  props: {
    countPage: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    },
    changePageCallback: {
      type: Function as PropType<(page: number) => void>,
      required: true
    }
  },
  setup(props) {
    const limit = 3

    function rangeFn(start: number, end: number): number[] {
      let page: any = []
      for (let i = start - 1; i < end; i++) {
        if (pages.value.length >= i + 1) {
          page.push(i + 1)
        }
      }
      return page
    }

    const pages = computed(() => {
      let pages = []
      for (let i = 1; i <= props.countPage; i++) {
        pages.push(i)
      }
      return pages
    })

    const links = computed(() => {
      let first = [1, '...']
      let last = ['...', props.countPage]
      let range: any = []
      if (props.activePage <= limit) {
        range = rangeFn(1, limit + 1)
        return range.length <= limit ? range : range.concat(last)
      } else if (props.activePage > props.countPage - limit) {
        range = rangeFn(props.countPage - limit, props.countPage)
        return first.concat(range)
      } else {
        range = rangeFn(
          props.activePage - Math.ceil(limit / 2),
          props.activePage + Math.ceil(limit / 2)
        )
        return first.concat(range).concat(last)
      }
    })

    async function clickHandler(event: Event) {
      if (event.target instanceof HTMLElement) {
        let n = +event.target.innerHTML
        !isNaN(n) &&
          n !== props.activePage &&
          (await props.changePageCallback(+event.target.innerHTML))
      }
    }

    async function leftClick() {
      props.activePage > 1 && (await props.changePageCallback(props.activePage - 1))
    }

    async function rightClick() {
      props.activePage < props.countPage && (await props.changePageCallback(props.activePage + 1))
    }

    return {
      limit,
      pages,
      links,
      clickHandler,
      leftClick,
      rightClick
    }
  }
})
</script>

<style scoped lang="scss">
.pagination {
  .pagination__body {
    padding: 32px;
    display: flex;
    justify-content: flex-end;

    & > *:not(:last-child) {
      margin-right: 16px;
    }

    .pagination__btn,
    .pagination__btn_active {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
    }

    .pagination__btn {
      border: 1px solid $secondaryDarkerColor;

      &_left {
        transform: rotate(180deg);
      }
    }

    .pagination__btn_active {
      background-color: $primaryDarkestColor;
      color: $secondaryLightestColor;
    }
  }
}
</style>
