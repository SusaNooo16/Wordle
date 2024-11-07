<script setup>
import KeyBtnModel from '@/models/KeyBtnModel'
import { computed, inject } from 'vue'

const props = defineProps({
  keyBtn: {
    type: KeyBtnModel,
    required: true,
  },
})
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
</script>

<template>
  <div class="keyboard-container__item" :class="classes">
    {{ keyBtn.keyBtnValue }}
  </div>
</template>
