<script setup>
import { computed, inject, ref, watch } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  letter: {
    type: String,
    required: true,
  },
  isFilledRow: {
    type: Boolean,
    required: true,
  },
  hidden: {
    type: Boolean,
    required: true,
  },
  isError: {
    type: Boolean,
    required: true,
  },
})

const word = inject('word')
const hidden = ref(props.hidden)
watch(
  () => props.hidden,
  () => {
    if (props.hidden) {
      hidden.value = props.hidden
      return
    }
    const timer = setTimeout(
      () => {
        hidden.value = props.hidden
        clearTimeout(timer)
      },
      200 * (props.index + 1),
    )
  },
)

const themeClasses = {
  green: 'game-container__item_theme_green',
  yellow: 'game-container__item_theme_yellow',
  gray: 'game-container__item_theme_gray',
}

const classes = computed(() => {
  if (props.isError) {
    return 'game-container__item_error'
  }

  if (hidden.value) {
    return
  }
  const resultClasses = ['game-container__item_rotate']
  if (word.value[props.index] == props.letter) {
    resultClasses.push(themeClasses.green)
  } else if (word.value.includes(props.letter)) {
    resultClasses.push(themeClasses.yellow)
  } else {
    resultClasses.push(themeClasses.gray)
  }

  return resultClasses
})
</script>

<template>
  <div class="game-container__item" :class="classes">{{ letter }}</div>
</template>
