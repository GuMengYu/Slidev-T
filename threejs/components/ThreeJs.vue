<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import useRender from '../setup/useRender'
const container = ref<HTMLElement | null>(null)
const props = defineProps({
  type: {
    type: String,
    default: 'BASIC'
  },
  width: [Number, String],
  height: [Number, String]
})
useRender(container, props.type, props.width, props.height)
onActivated(() => {
  console.log('activeated')
})
</script>
<template>
  <div ref="container"></div>
</template>
