<template>
  <div class="body">{{ t('performersNotFound') }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ClassificatorNodata',
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>
<style scoped lang="scss">
.body {
  width: 100%;
  display: flex;
  font-size: 24px;
  font-weight: 500;
  color: #023577;
  justify-content: center;
  padding: 30px;
}
</style>
