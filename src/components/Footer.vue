<script setup lang="ts">
import { UseColorMode } from '@vueuse/components'
import { toggleDark, useMode } from '~/composables'
import { useThemeStore } from '~/stores'

const { t, availableLocales, locale } = useI18n()

const mode = useColorMode({
  modes: {
    contrast: 'contrast dark',
    dark: 'dark',
  },
})
const { state, next, prev } = useCycleList(['dark', 'cafe'], { initialValue: mode })
// const { next } = useCycleList(['dark'], { initialValue: mode })
const themeSotre = useThemeStore()
themeSotre.$patch({
  colorMode: state.value,
})
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const toggleColorMode = () => {
  next()
  themeSotre.$patch({
    colorMode: state.value,
  })
  console.log(themeSotre.colorMode)
}
</script>

<template>
  <nav text-xl mt-6>
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleColorMode()"
    >
      <div i="carbon-sun dark:carbon-moon" />
      <!-- <div i="dark:carbon-moon" /> -->
    </button>

    <!-- <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
      <div i-carbon-language />
    </a> -->

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse"
      target="_blank"
      title="GitHub"
    >
      <div i-carbon-logo-github />
    </a>
  </nav>
  <nav>
    <router-link class="icon-btn mx-2" to="/mine">
      <div i-mdi-mine style="color:red;" />
    </router-link>
  </nav>
</template>
<style>
html.cafe {
  filter: sepia(0.9) hue-rotate(315deg) brightness(0.9);
}
html.contrast {
  filter: contrast(2);
}
</style>
