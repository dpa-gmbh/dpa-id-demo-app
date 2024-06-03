<template>
  <div>
    <UiButton rounded size="small" color="transparent" @click="login">Log in</UiButton>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { UiButton } from '@dpa-id-components/dpa-shared-components'
const { loginWithRedirect } = useAuth0()
const login = () => loginWithRedirect()
</script>
