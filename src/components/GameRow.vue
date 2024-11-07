<script setup>
import WordRowModel from '@/models/WordRowModel'
import { computed, ref } from 'vue'
import GameItem from './GameItem.vue'

defineProps({
  row: {
    type: WordRowModel,
    required: true,
  },
})

const shake = ref(false)

function shakeRow() {
  shake.value = true
  const timer = setTimeout(() => {
    shake.value = false
    clearTimeout(timer)
  }, 300)
}

defineExpose({
  shakeRow,
})

const classes = computed(() => {
  const resultClasses = []
  if (shake.value) {
    resultClasses.push('game-container__row_shake')
  }
  return resultClasses
})
</script>

<template>
  <div class="game-container__row" :class="classes">
    <GameItem
      v-for="(letter, index) in row.letters"
      :key="index"
      :index="index"
      :letter="letter"
      :isFilledRow="row.isFilled"
      :hidden="!row.isFilled"
      :isError="shake"
    />
  </div>
</template>
