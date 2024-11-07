<script setup>
import { computed, provide, ref, useTemplateRef } from 'vue'
import GameContainer from './components/GameContainer.vue'
import KeyboardContainer from './components/KeyboardContainer.vue'
import GamePopup from './components/GamePopup.vue'

import WordRowListModel from './models/WordRowListModel'

import wordReferenceList from '../assets/words.js'

let word = getRandomWord()
provide('word', word)

const isWin = ref(false)
const isLose = computed(() => wordRowList.value.isAllRowFilled)
const isGameOver = computed(() => isWin.value || isLose.value)

const inputedLetters = computed(() => wordRowList.value.inputedLetters)
const includesInputedLetters = computed(() =>
  inputedLetters.value.filter(x => word.includes(x)),
)
const rightPlaceInputedLetters = computed(() =>
  wordRowList.value.inputedLettersWithIndex
    .filter(({ letter, index }) => word.indexOf(letter) == index)
    .map(({ letter }) => letter),
)

provide('inputedLetters', inputedLetters)
provide('includesInputedLetters', includesInputedLetters)
provide('rightPlaceInputedLetters', rightPlaceInputedLetters)

const wordRowList = ref(new WordRowListModel())

const gameContainerRef = useTemplateRef('gameContainerRef')

window.addEventListener('keydown', ({ key }) => {
  if (/[А-Яа-я]/.test(key)) {
    wordRowList.value.setLetter(key.toLowerCase())
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
function playAgain() {
  word = getRandomWord()

  wordRowList.value = new WordRowListModel()

  isWin.value = false
}

function getRandomWord() {
  const temp = wordReferenceList.filter(word => word.length == 5)
  let newIndexOfWord = Math.floor(temp.length * Math.random())

  return temp[newIndexOfWord]
}
</script>

<template>
  <main>
    <div class="container">
      <GameContainer :wordRowList="wordRowList" ref="gameContainerRef" />
      <KeyboardContainer />
    </div>

    <GamePopup v-if="isGameOver" :is-win="isWin" @playAgain="playAgain" />
  </main>
</template>
