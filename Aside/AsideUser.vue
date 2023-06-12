<template>
  <div class="user">
    <icon-profile :fill="'#fff'" />
    <div class="user__name">Dimpulse Admin</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconProfile from '@/components/Icons/iconProfile.vue'

export default defineComponent({
  name: 'AsideUser',
  components: { IconProfile }
})
</script>

<style scoped lang="scss">
.user {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 204px;
  color: $secondaryLightestColor;

  img {
    width: 32px;
    height: 32px;
  }

  &__name {
    margin-top: 16px;
    @include body-14-500;
  }
}
</style>
