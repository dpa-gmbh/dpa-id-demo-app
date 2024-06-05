<template>
  <div class="place-content-center">
    <h3>This is a single page demo application</h3>
  </div>
  <div class="place-content-center" v-if="isAuthenticated">
    <h1>Hello, {{ user?.given_name }}!</h1>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated } = useAuth0()
</script>
