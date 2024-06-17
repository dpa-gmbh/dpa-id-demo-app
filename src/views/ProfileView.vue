<template>
  <div class="flex flex-col">
    <DemoHeader />
    <Suspense>
      <DemoProfile />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import DemoProfile from '@/components/DemoProfile.vue'
import DemoHeader from '@/components/DemoHeader.vue'
</script>
