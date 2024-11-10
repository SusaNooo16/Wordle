<script setup>
import KeyBtnModel from '@/models/KeyBtnModel'
import { computed, inject } from 'vue'

const props = defineProps({
  keyBtn: {
    type: KeyBtnModel,
    required: true,
  },
})
const onKeyDown = inject('onKeyDown')

const inputedLetters = inject('inputedLetters')
const includesInputedLetters = inject('includesInputedLetters')
const rightPlaceInputedLetters = inject('rightPlaceInputedLetters')

const themeClasses = {
  green: 'keyboard-container__item_theme_green',
  yellow: 'keyboard-container__item_theme_yellow',
  gray: 'keyboard-container__item_theme_gray',
}

const classes = computed(() => {
  const resultClasses = []
  if (props.keyBtn.size == 'm') {
    resultClasses.push('keyboard-container__item_size_l')
  }

  if (
    rightPlaceInputedLetters.value.includes(
      props.keyBtn.keyBtnValue.toLowerCase(),
    )
  ) {
    resultClasses.push(themeClasses.green)
  } else if (
    includesInputedLetters.value.includes(
      props.keyBtn.keyBtnValue.toLowerCase(),
    )
  ) {
    resultClasses.push(themeClasses.yellow)
  } else if (
    inputedLetters.value.includes(props.keyBtn.keyBtnValue.toLowerCase())
  ) {
    resultClasses.push(themeClasses.gray)
  }

  return resultClasses
})

function onClick(keyBtnValue) {
  onKeyDown({ key: keyBtnValue })
}
</script>

<template>
  <div
    v-if="keyBtn.keyBtnValue != 'Backspace'"
    class="keyboard-container__item"
    @click="onClick(keyBtn.keyBtnValue)"
    :class="classes"
  >
    {{ keyBtn.keyBtnValue }}
  </div>
  <div
    v-else
    class="keyboard-container__item keyboard-container__item_backspace"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
      ></path>
    </svg>
  </div>
</template>
