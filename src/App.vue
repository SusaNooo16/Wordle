<script setup>
import { computed, provide, ref, useTemplateRef } from 'vue'
import GameContainer from './components/GameContainer.vue'
import KeyboardContainer from './components/KeyboardContainer.vue'
import GamePopup from './components/GamePopup.vue'

import WordRowListModel from './models/WordRowListModel'

import wordReferenceList from '../assets/words.js'

let word = ref(getRandomWord())
const wordRowList = ref(new WordRowListModel())

const isWin = ref(false)
const isLose = computed(() => wordRowList.value.isAllRowFilled)
const isGameOver = computed(() => isWin.value || isLose.value)

const inputedLetters = computed(() => wordRowList.value.inputedLetters)
const includesInputedLetters = computed(() =>
  inputedLetters.value.filter(x => word.value.includes(x)),
)
const rightPlaceInputedLetters = computed(() =>
  wordRowList.value.inputedLettersWithIndex
    .filter(({ letter, index }) => word.value.indexOf(letter) == index)
    .map(({ letter }) => letter),
)

provide('word', word)
provide('inputedLetters', inputedLetters)
provide('includesInputedLetters', includesInputedLetters)
provide('rightPlaceInputedLetters', rightPlaceInputedLetters)
provide('wordRowList', wordRowList)
provide('onEnterClick', wordRowList)
provide('onKeyDown', onKeyDown)

const gameContainerRef = useTemplateRef('gameContainerRef')

window.addEventListener('keydown', onKeyDown)
function onKeyDown({ key }) {
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
}
function onEnterClick() {
  if (word.value == wordRowList.value.firstUnfilledRow.word) {
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
  word.value = getRandomWord()

  wordRowList.value = new WordRowListModel()

  isWin.value = false
}

function getRandomWord() {
  const temp = wordReferenceList.filter(word => word.length == 5)
  let newIndexOfWord = Math.floor(temp.length * Math.random())
  console.log(temp[newIndexOfWord])
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
