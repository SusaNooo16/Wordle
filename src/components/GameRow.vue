<script setup>
import WordRowModel from '@/models/WordRowModel'
import { computed, ref, watch } from 'vue'
import GameItem from './GameItem.vue'

const props = defineProps({
  row: {
    type: WordRowModel,
    required: true,
  },
})
const hiddenList = ref(Array(props.row.letters.length).fill(true))

watch(
  () => props.row.isFilled,
  () => {
    if (props.row.isFilled) {
      hiddenList.value[0] = false
      let temp = 1
      const interval = setInterval(() => {
        hiddenList.value[temp] = false
        temp++
        if (hiddenList.value.length == temp) {
          clearInterval(interval)
        }
      }, 200)
    }
  },
)

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
      :hidden="hiddenList[index]"
      :isError="shake"
    />
  </div>
</template>
