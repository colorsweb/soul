<script setup lang="ts">

const props = defineProps({
  m: Number,
  n: Number,
  mineNum: Number,
  label: String,
  value: Number
})
const matrix = computed(() => {
  console.log(props.m)
  //@ts-ignore
  return Array.from({ length: props.m }, (_, i) => Array.from({ length: props.n }, (_, j) => i * props.m + j + 1))
})

</script>

<template>
  <div v-for="arr of matrix">
    <button btn-green w-5 h-5 v-for="i in arr">{{ i }}</button>
  </div>
</template>