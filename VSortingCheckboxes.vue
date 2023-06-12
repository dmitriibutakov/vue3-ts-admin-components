<template>
  <v-checkboxes
      :checkboxes="[t('experts'), t('workers'), t('hidden')]"
      @setCheckbox="(vl) => (activeCheckbox = vl)"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import VCheckboxes from "@/components/VCheckboxes.vue";

export default defineComponent({
  name: 'VSortingCheckboxes',
  components: {VCheckboxes},
  setup() {
    const {t} = useI18n()
    const activeCheckbox = ref('')
    return {
      activeCheckbox,
      t
    }
  }
})
</script>

<style scoped></style>
