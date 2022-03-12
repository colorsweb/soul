<script setup lang="ts">

const props = defineProps({
  m: Number,
  n: Number,
  mineNum: Number,
  label: String,
  value: Number,
})
console.log('props',props)
// @ts-expect-error
const matrix = reactive(Array.from({ length: props.m },
// @ts-expect-error
  (_, i) => Array.from({ length: props.n }, (_, j) => ({ type: 1 }))))

// const typeMap =

const dealItem = (item) => {
  switch (item.type) {
    case 1:
      return ''
      break
    case 2:

    default:
      break
  }
}
</script>

<template>
  <div v-for="arr of matrix">
    <button v-for="item in arr" border bg-gray w-8 h-8>
      {{ dealItem(item) }}
    </button>
  </div>
</template>
