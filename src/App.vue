<script setup>
import { computed, provide, ref, useTemplateRef } from 'vue'
import GameContainer from './components/GameContainer.vue'
import KeyboardContainer from './components/KeyboardContainer.vue'
import GamePopup from './components/GamePopup.vue'

import WordRowListModel from './models/WordRowListModel'

const word = 'искра'
provide('word', word)

const isWin = ref(false)
const isLose = computed(() => wordRowList.value.isAllRowFilled)
const isGameOver = computed(() => isWin.value || isLose.value)

const wordRowList = ref(new WordRowListModel())

const gameContainerRef = useTemplateRef('gameContainerRef')

window.addEventListener('keydown', ({ key }) => {
  if (/[А-Яа-я]/.test(key)) {
    wordRowList.value.setLetter(key)
    return
  }
  if (key == 'Backspace') {
    wordRowList.value.removeLastLetter()
    return
  }
  if (key == 'Enter') {
    onEnterClick()
  }
})
function onEnterClick() {
  if (word == wordRowList.value.firstUnfilledRow.word) {
    isWin.value = true
    wordRowList.value.firstUnfilledRow.isFilled = true
    return
  }
  if (wordRowList.value.checkWord()) {
    wordRowList.value.firstUnfilledRow.isFilled = true
    return
  }
  gameContainerRef.value.shakeRow()
}
</script>

<template>
  <main>
    <div class="container">
      <GameContainer :wordRowList="wordRowList" ref="gameContainerRef" />
      <KeyboardContainer />
    </div>

    <GamePopup v-if="isGameOver" :is-win="isWin" />
  </main>
</template>
