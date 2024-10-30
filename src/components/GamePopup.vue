<script setup>
defineProps({
  isWin: {
    type: Boolean,
    required: true,
  },
})
</script>
<template>
  <div class="popup-container">
    <div class="popup">
      <h2 v-if="isWin">Поздравляю, вы победили! 😃</h2>
      <h2 v-else>Вы проиграли. 😕</h2>
    </div>
  </div>
</template>
