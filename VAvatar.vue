<template>
  <div>
    <div class="avatar">
      <button
          @mouseover="showPencil = true"
          @mouseleave="showPencil = false"
          class="avatar__btn btn"
      >
        <img :src="avatar || defaultAvatar" alt="avatar"/>
        <icon-pencil class="btn__pencil" v-if="showPencil" @click="showModal" :fill="'#fff'"/>
      </button>
      <modal-layout @toggleModal="(v) => (isModalOpen = v)" v-if="isModalOpen">
        <v-tabs
            :class="'avatar__tabs'"
            :tabs="[t('requirements'), t('edit')]"
            @setActiveTab="(v) => (activeTab = v)"
            :active-tab="activeTab"
        />
        <div v-if="activeTab === t('requirements')" class="avatar__requirements requirements">
          <div class="requirements__images">
            <img src="@/assets/img/photoRules1.svg" alt="rule"/>
            <img src="@/assets/img/photoRules2.svg" alt="rule"/>
            <img src="@/assets/img/photoRules3.svg" alt="rule"/>
          </div>
          <ul class="requirements__rules">
            <li v-for="(v, i) in 7" :key="i + Math.random()">
              {{ t(`descs.avatarDesc.${v - 1}`) }}
            </li>
          </ul>
        </div>
        <div v-else-if="activeTab === t('edit')" class="avatar__photo photo">
          <cropper
              ref="cropper"
              class="cropper"
              :background-class="'cropper__tr'"
              :stencil-component="$options.components.VStencil"
              :src="preview"
          />
          <div class="cropper__btns">
            <v-btn :secondary="true" @onClick="() => $refs.fileAvatar.click()">
              <input type="file" ref="fileAvatar" @change="addFile($event)" accept="image/*"/>
              {{ t('upload') }}
            </v-btn>
            <v-btn :disabled="defaultAvatar === preview" @onClick="() => cropFile()">
              {{ t('save') }}
            </v-btn>
            <v-btn :disabled="defaultAvatar === preview" :danger="true" @onClick="() => deleteFile()">
              {{ t('delete') }}
            </v-btn>
          </div>
        </div>
      </modal-layout>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import ModalLayout from '@/layouts/ModalLayout.vue'
import {storeToRefs} from 'pinia'
import {usePerformersStore} from '@/stores/performers'
import {useI18n} from 'vue-i18n'
import VBtn from '@/components/Buttons/VBtn.vue'
import VTabs from '@/components/VTabs.vue'
import {Cropper} from 'vue-advanced-cropper'
import '@/assets/styles/cropper.css'

export default defineComponent({
  name: 'VAvatar',
  components: {
    VTabs,
    VBtn,
    Cropper,
    ModalLayout,
    IconPencil
  },
  props: {
    avatar: {type: String, required: true},
    defaultAvatar: {
      type: String, required: true
    }
  },
  setup(props, {emit}) {
    const {t} = useI18n()
    const activeTab = ref(t('requirements'))
    const showPencil = ref(false)
    const preview = ref<any>('')
    const cropper = ref()
    const file = ref()
    preview.value = props.defaultAvatar
    const cropFile = () => {
      if (preview.value && preview.value !== props.defaultAvatar) {
        const {canvas} = cropper.value.getResult()
        emit('addFile', canvas.toDataURL())
        isModalOpen.value = false
      } else {
        console.log('error')
      }
    }

    const addFile = (event) => {
      const {files} = event.target
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = function () {
          preview.value = reader.result;
        }
        if (files.length > 0) {
          reader.readAsDataURL(files[0]);
        } else {
          preview.value = props.defaultAvatar
        }
      }
    }

    const {isModalOpen} = storeToRefs(usePerformersStore())
    const deleteFile = () => {
      isModalOpen.value = false
      preview.value = props.defaultAvatar
      emit('deleteFile')
    }
    const showModal = () => {
      isModalOpen.value = true
    }
    return {
      showModal,
      showPencil,
      isModalOpen,
      t,
      deleteFile,
      activeTab,
      preview,
      cropper,
      file,
      addFile,
      cropFile
    }
  }
})
</script>

<style lang="scss" scoped>
.cropper {
  height: 240px;
  overflow: hidden;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  &__btns {
    margin-top: 16px;
    display: flex;
    justify-content: center;

    & > :not(:last-child) {
      margin-right: 8px;
    }
  }
}

input {
  display: none;
}

.avatar {
  height: 86px;
  width: 86px;
  border-radius: 50%;
  overflow: hidden;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;

    &__pencil {
      position: absolute;
    }

    img {
      width: 100%;
    }
  }

  &__tabs {
    margin-bottom: 16px;
  }

  .requirements {
    &__images {
      display: flex;
      justify-content: space-between;

      & > * {
        flex: 0 0 32%;
      }
    }

    &__rules {
      margin-top: 8px;
      text-align: start;

      & > *:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }

  .photo {
    height: 100%;

    img {
      width: 124px;
      height: 124px;
      border: 1px solid $primaryDarkColor;
      border-radius: 50%;
    }

    &__btns {
      margin-top: 16px;
      display: flex;

      & > :first-child {
        margin-right: 16px;
      }
    }
  }
}
</style>
