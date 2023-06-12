<template>
  <div :class="['input__block', { input__block_search: isSearch }]">
    <icon-search class="image" v-if="isSearch"/>
    <input
        :id="placeholder"
        v-if="!isComment"
        v-model="inputValue"
        :type="(name === 'Password' && 'password') || type"
        :class="{ input__body_error: error, input__block_active: inputValue }"
        @input="handlerChange"
    />
    <textarea
        v-else
        :id="placeholder"
        v-model="inputValue"
        :class="{ input__block_error: error, input__block_active: inputValue }"
        @input="handlerChange"
    />
    <label :for="placeholder">
      {{ placeholder }}
    </label>
    <p v-if="error" class="input__error">
      <icon-danger/>
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import IconDanger from '@/components/Icons/IconDanger.vue'
import IconSearch from '@/components/Icons/IconSearch.vue'

export default defineComponent({
  name: 'VInput',
  components: {IconSearch, IconDanger},
  props: {
    isSearch: {type: Boolean, default: false},
    type: {type: String, default: 'text'},
    placeholder: {type: String, required: true},
    error: String,
    value: [String, Number],
    name: {type: String, required: true},
    isComment: {type: Boolean, default: false}
  },
  setup(props, {emit}) {
    const inputValue = ref(props.value)
    const maxmobile = 20

    // function acceptNumber(event: Event) {
    //   if (props.name === 'phone') {
    //     const {target} = event
    //     inputValue.value = (target as HTMLInputElement).value.trim().replace(/\D/g, '')
    //   }
    //   emit('customChange', props.name, +inputValue.value)
    // }

    function handlerChange(event: Event) {
      const {target} = event
      if (props.name === 'phone') {
        inputValue.value = `+${(target as HTMLInputElement).value.trim().replace(/\D/g, '')}`
        emit('customChange', props.name, +inputValue.value)
      } else if (props.name === 'budget') {
        inputValue.value = (target as HTMLInputElement).value.trim().replace(/\D/g, '')
        emit('customChange', props.name, +inputValue.value)
      } else {
        inputValue.value = (target as HTMLInputElement).value.trim()
        emit('customChange', props.name, inputValue.value)
      }
    }

    return {
      handlerChange,
      maxmobile,
      inputValue
    }
  }
})
</script>

<style scoped lang="scss">
.input__block {
  width: 100%;
  display: flex;
  height: 100%;
  min-height: 43px;
  z-index: 0;
  position: relative;

  .image {
    position: absolute;
    left: 16px;
    top: 33%;
    z-index: 2;
    width: 14px;
    height: 14px;
  }

  label {
    position: absolute;
    @include body-14-500;
    padding-right: 16px;
    color: $secondaryDarkerColor;
    left: 12px;
    top: 28%;
    transition: top 0.3s linear;
  }

  input,
  textarea {
    color: $secondaryDarkestColor;
    width: 100%;
    padding: 16px 12px 8px 12px;
    background-color: transparent;
    border-radius: 12px;
    z-index: 2;
  }

  textarea {
    padding: 24px 12px 12px 12px;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 90%;
      width: 6px;
      border-radius: 2px;
      background-color: $secondaryLightestColor;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $secondaryLighterColor;
      border-radius: 2px;
    }
  }

  input:focus + label,
  textarea:focus + label,
  &_active + label {
    font-size: 12px;
    z-index: 3;
    height: 14px;
    background-color: white;
    border-radius: 6px;
    color: $secondaryDarkerColor;
    top: 4px;
  }

  ::-webkit-input-placeholder {
    opacity: 0;
  }

  input:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder {
    opacity: 1;
  }

  input,
  textarea {
    border: 1px solid $secondaryLighterColor;

    &:hover,
    &:focus {
      border: 1px solid $primaryLighterColor;
    }

    &_error {
      border: 1px solid $dangerDarkColor;
    }
  }

  .input__error {
    @include flexCenterAll;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    left: 0;
    bottom: -1.5em;
    color: $primaryDarkestColor;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  &_search {
    input {
      width: 100%;
      min-width: 250px;
      max-width: 343px;
      border-radius: 100px;
      padding-left: 38px;
    }

    label {
      left: 38px;
    }
  }
}
</style>
