<script setup>
import WordRowListModel from '@/models/WordRowListModel'
import GameRow from './GameRow.vue'
import { useTemplateRef } from 'vue'

const props = defineProps({
  wordRowList: {
    type: WordRowListModel,
    required: true,
  },
})

const gameRowRef = useTemplateRef('gameRowRef')

function shakeRow() {
  gameRowRef.value[props.wordRowList.firstUnfilledRowIndex].shakeRow()
}

defineExpose({
  shakeRow,
})
</script>

<template>
  <div class="game-container">
    <GameRow
      v-for="(row, index) in wordRowList"
      :key="index"
      :row="wordRowList[index]"
      ref="gameRowRef"
    />
  </div>
</template>
