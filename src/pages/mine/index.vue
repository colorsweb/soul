<script setup lang="ts">
import { NButton, NPopselect } from 'naive-ui'
import MineArea from './components/MineArea'
import { options } from './config'

const showMineArea = ref(false)
const matrixValue = ref(0)
const start = (val: number) => {
  matrixValue.value = val
  showMineArea.value = !showMineArea.value
}
const end = () => {
  showMineArea.value = !showMineArea.value
}

</script>

<template>
  <div>
    <div text-4xl>
      <div i-mdi-mine inline-block />
    </div>
    <div>
      <n-popselect v-if="!showMineArea" :options="options" trigger="click" :on-update:value="start">
        <n-button type="primary">
          start
        </n-button>
      </n-popselect>
      <MineArea v-if="showMineArea" v-bind="options[matrixValue]" />
      <br>
      <n-button v-if="showMineArea" type="warning" @click="end()">
        end
      </n-button>
    </div>
  </div>
</template>
