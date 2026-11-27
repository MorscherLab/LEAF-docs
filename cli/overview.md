---
title: "Moved → Scripting / CLI / Overview"
---

# This page moved

→ [Scripting / Command line / Overview](/scripting/cli/overview)

The previous `/cli/` section has been folded into the Scripting pillar. Old bookmarks still resolve, but newer browsers will be redirected automatically.

<script setup>
import { onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

onMounted(() => {
  useRouter().go(withBase('/scripting/cli/overview'))
})
</script>
