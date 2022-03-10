<script setup lang="ts">
import MineArea from './components/MineArea.vue'
import { options } from './config'
import { NPopselect, NButton } from 'naive-ui'


const start = (val: number) => {
  matrixValue.value = val
  showMineArea.value = !showMineArea.value
}
const end = () => {
  showMineArea.value = !showMineArea.value
}
const showMineArea = ref(false)

const matrixValue = ref(0)


</script>

<template>
  <div>
    <div text-4xl>
      <div i-mdi-mine inline-block />
    </div>
    <div>
      <n-popselect
        :options="options"
        trigger="click"
        :on-update:value="start"
        v-if="!showMineArea"
      >
        <n-button  type="primary">start</n-button>
      </n-popselect>
      <MineArea v-if="showMineArea" v-bind="options[matrixValue]" />
      <br />
      <n-button type="warning" @click="end()" v-if="showMineArea">end</n-button>
    </div>
  </div>
</template>
