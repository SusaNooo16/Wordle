<script setup>
import { inject } from 'vue'

defineProps({
  isWin: {
    type: Boolean,
    required: true,
  },
})
const word = inject('word')
</script>
<template>
  <div class="popup-container">
    <div class="popup">
      <h2 v-if="isWin">Поздравляю, вы победили! 😃</h2>
      <h2 v-else>Вы проиграли. 😕</h2>
      <h3>...слово: {{ word.toUpperCase() }}</h3>
      <button @click="$emit('playAgain')">Сыграть еще раз</button>
    </div>
  </div>
</template>
