<script setup lang="ts">
import { NButton, NPopselect } from 'naive-ui'
import { initPixi } from './animation'
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

const mineAniVisible = ref('hidden')
// const mineAniVisible = ref('visible')
onMounted(() => {
  initPixi()
})
</script>

<template>
  <div class="main-container">
    <div text-4xl>
      <div i-mdi-mine inline-block />
    </div>
    <div class="mine-container">
      <n-popselect v-if="!showMineArea" :options="options" trigger="click" :on-update:value="start">
        <n-button type="primary">
          start
        </n-button>
      </n-popselect>
      <MineArea v-if="showMineArea" :key="MineAreaKey" v-bind="options[matrixValue]" />
      <br>
      <n-button v-if="showMineArea" type="warning" @click="back">
        back
      </n-button>
      <br>
      <n-button v-if="showMineArea" type="info" @click="restart">
        restart
      </n-button>
    </div>
  </div>
  <div
    id="mine-ani"
  />
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
#mine-ani {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  visibility: v-bind(mineAniVisible);
}
</style>
