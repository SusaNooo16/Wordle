<script setup>
import KeyBtnModel from '@/models/KeyBtnModel'
import { computed } from 'vue'

const props = defineProps({
  keyBtn: {
    type: KeyBtnModel,
    required: true,
  },
})

const classes = computed(() => {
  const resultClasses = []
  if (props.keyBtn.size == 'm') {
    resultClasses.push('keyboard-container__item_size_l')
  }
  return resultClasses
})
</script>

<template>
  <div class="keyboard-container__item" :class="classes">
    {{ keyBtn.keyBtnValue }}
  </div>
</template>
