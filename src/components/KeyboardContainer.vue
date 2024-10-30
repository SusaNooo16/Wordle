<script setup>
import KeyboardItem from './KeyboardItem.vue'
import KeyBtnModel from '../models/KeyBtnModel.js'

const keyboardBtns = {
  firstRow: ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  secondRow: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
  thirdRow: ['⌫', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Enter'],
}
for (const row in keyboardBtns) {
  keyboardBtns[row] = keyboardBtns[row].map(
    keyValue => new KeyBtnModel(keyValue),
  )
}
</script>

<template>
  <div class="keyboard-container">
    <div
      class="keyboard-container__row"
      v-for="keyboardRow in keyboardBtns"
      :key="keyboardRow"
    >
      <KeyboardItem
        v-for="key in keyboardRow"
        :key="key.keyValue"
        :keyBtn="key"
        >{{ key.keyValue }}</KeyboardItem
      >
    </div>
  </div>
</template>
