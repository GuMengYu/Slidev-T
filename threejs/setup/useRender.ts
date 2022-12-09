import { onMounted, isRef, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import examples from '../example/examples'

export default function(container: Ref<HTMLElement | null> | HTMLElement, example: string, width?: number | string, height?: number | string) {
  onMounted(() => {
    let _container: HTMLElement | null
    if (isRef(container)) {
      _container = container.value
    } else {
      _container = container
    }
    if (_container) {
      const { init, animate } = examples[example]?.(width, height)
      if (init) {
        init(_container)
        animate(_container)
      }
    }
  })
}