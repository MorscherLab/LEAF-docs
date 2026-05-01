---
title: Install in MINT (recommended)
description: LEAF deploys into a MINT server as a plugin bundle. Step-by-step install instructions live in the MINT documentation.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace('https://mint-docs.morscherlab.org/plugins/leaf')
  }
})
</script>

<noscript>
<meta http-equiv="refresh" content="0; url=https://mint-docs.morscherlab.org/plugins/leaf" />
</noscript>

# Install in MINT (recommended)

LEAF ships as a [MINT](https://mint-docs.morscherlab.org) plugin bundle (`.mld`). For lab and shared-server deployments, this is the recommended path: MINT handles authentication, file-folder access control, and multi-user isolation, and the same LEAF instance is reachable from any browser on the lab network.

**The install steps live in the MINT documentation:**

→ **[mint-docs.morscherlab.org/plugins/leaf](https://mint-docs.morscherlab.org/plugins/leaf)**

You should be redirected automatically. If not, follow the link above.

## What you'll need

| | |
|---|---|
| **A running MINT instance** | If your lab does not yet have one, see [MINT Docs → Install](https://mint-docs.morscherlab.org). |
| **MINT admin role** | Plugin upload is admin-gated. |
| **The LEAF bundle** | Download `leaf-webui-bundle-<version>.mld` from the [LEAF releases page](https://github.com/MorscherLab/LEAF/releases/latest). |

The bundle includes the LEAF wheel and its dependencies (Rust accelerators for `x86_64-linux`, SEED).

## Once it's installed

End users open the lab's MINT URL in a browser, sign in with their lab credentials, and click the **LEAF** tile on the dashboard. There is no separate LEAF login — MINT propagates the session.

## Other install paths

- **[Install the wheel + CLI](/get-started/install-cli)** — local single-user install on macOS / Windows / Linux (recommended for individual researchers without a MINT server).
- **[Desktop app](/get-started/install-desktop)** — native launcher, in development.
