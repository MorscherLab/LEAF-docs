---
layout: page
title: Team
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
} from 'vitepress/theme'

const labUrl = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
}

const scholar = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>',
}

const core = [
  {
    avatar: '/team/raphael-morscher.jpg',
    name: 'Raphael Morscher',
    title: 'Principal Investigator',
    desc: 'EMBO Young Investigator. Researches metabolic regulation of translation in pediatric cancer.',
    links: [
      { icon: scholar, link: 'https://scholar.google.co.in/citations?hl=en&user=KishSKgAAAAJ' },
      { icon: labUrl, link: 'https://www.morscherlab.org' },
    ],
  },
  {
    avatar: 'https://github.com/EstrellaXD.png',
    name: 'Xingyu Pan',
    title: 'Doctoral Researcher',
    desc: 'Develops LEAF, SEED, and SCMeTA. Rust, Python, Vue.',
    links: [
      { icon: 'github', link: 'https://github.com/EstrellaXD' },
    ],
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>The team behind LEAF</template>
    <template #lead>
      LEAF is built by the
      <a href="https://www.morscherlab.org" target="_blank">Morscher Lab</a>
      at Universitäts-Kinderspital Zürich.
    </template>
  </VPTeamPageTitle>

  <VPTeamMembers size="medium" :members="core" />
</VPTeamPage>

<style scoped>
.team-photo {
  max-width: 640px;
  margin: 2rem auto 0;
  text-align: center;
}
.team-photo img {
  width: 100%;
  border-radius: 12px;
}
.team-photo figcaption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
</style>

<figure class="team-photo">
  <img src="/team/lab-dinner.jpg" alt="Morscher Lab team dinner" />
  <figcaption>Lab dinner, 2025</figcaption>
</figure>
