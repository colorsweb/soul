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
const back = () => {
  showMineArea.value = !showMineArea.value
}

const MineAreaKey = ref(new Date())
const restart = () => {
  MineAreaKey.value = new Date()
}

</script>

<template>
  <div class="main-container">
    <div text-4xl>
      <div i-mdi-mine inline-block />
    </div>
    <div class="mine-container">
      <n-popselect v-if="!showMineArea" :options="options" trigger="click" :on-update:value="start">
        <n-button type="primary">start</n-button>
      </n-popselect>
      <MineArea :key="MineAreaKey" v-if="showMineArea" v-bind="options[matrixValue]" />
      <br />
      <n-button v-if="showMineArea" type="warning" @click="back">back</n-button>
      <br />
      <n-button v-if="showMineArea" type="info" @click="restart">restart</n-button>
    </div>
  </div>
</template>

<style lang="scss">
.main-container {
  .mine-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .n-button {
    margin-bottom: 10px;
  }
}
</style>