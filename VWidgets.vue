<template>
  <div
    :class="['widgets', { widgets__green: name === 'active', widgets__red: name === 'noActive' }]"
  >
    <div class="widgets__img">
      <img :src="isName()" alt="img" />
    </div>
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import telegram from '@/assets/img/icons/tg.svg'
import lang from '@/assets/img/icons/lang.svg'
import mail from '@/assets/img/icons/mail.svg'
import tel from '@/assets/img/icons/tel.svg'
import active from '@/assets/img/icons/active.svg'
import noActive from '@/assets/img/icons/noActive.svg'

export default defineComponent({
  name: 'VWidgets',
  props: {
    text: { type: String, required: true },
    name: { type: String, required: true }
  },
  setup(props) {
    const isName = () => {
      switch (props.name) {
        case 'telegram':
          return telegram
        case 'lang':
          return lang
        case 'mail':
          return mail
        case 'tel':
          return tel
        case 'active':
          return active
        case 'noActive':
          return noActive
        default:
          return noActive
      }
    }
    return {
      isName
    }
  }
})
</script>

<style scoped lang="scss">
.widgets {
  display: flex;
  align-items: center;
  border-radius: 16px;

  &__green {
    color: $successDarkerColor;
  }

  &__red {
    color: $dangerDarkerColor;
  }

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    margin-right: 8px;

    img {
    }
  }
}
</style>
