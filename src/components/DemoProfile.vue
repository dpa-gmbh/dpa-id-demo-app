<template>
  <div class="mx-5 mt-20 flex min-h-[calc(100vh-180px)] flex-col pb-5 lg:mx-32 lg:mt-24 xl:pb-16">
    <div class="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-default">
      <h3>This is a single page demo application</h3>
      <h1 v-if="isAuthenticated">Hello, {{ user?.given_name }}!</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated } = useAuth0()
</script>
