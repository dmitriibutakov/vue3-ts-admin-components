<template>
  <div class="icon">
    <icon-requests v-if="name === 'Requests'" :fill="fill" />
    <icon-classificator v-if="name === 'Classificator'" :fill="fill" />
    <icon-performers v-if="name === 'Performers'" :fill="fill" />
    <icon-projects v-if="name === 'Projects'" :fill="fill" />
    <icon-settings v-if="name === 'Settings'" :fill="fill" />
    <icon-logout v-if="name === 'Logout'" :fill="fill" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import IconLogout from '@/components/Icons/IconLogout.vue'
import IconProjects from '@/components/Icons/IconProjects.vue'
import IconPerformers from '@/components/Icons/IconPerformers.vue'
import IconClassificator from '@/components/Icons/IconClassificator.vue'
import IconSettings from '@/components/Icons/IconSettings.vue'
import IconRequests from '@/components/Icons/IconRequests.vue'

export default defineComponent({
  name: 'VIcons',
  components: {
    IconRequests,
    IconSettings,
    IconClassificator,
    IconPerformers,
    IconProjects,
    IconLogout
  },
  props: {
    name: { type: String },
    fill: { type: String }
  }
})
</script>

<style scoped>
.icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 16px;
  width: 20px;
  height: 20px;
}
</style>
