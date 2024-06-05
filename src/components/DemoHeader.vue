<template>
  <div class="border-shadow h-16 bg-white">
    <div class="flex justify-between px-5">
      <div class="flex flex-row items-center justify-start">
        <div class="flex h-6 flex-row justify-start lg:h-8">
          <img src="../assets/dpa-id-wordmark.svg" alt="ID" class="mr-2 pr-4" />
          <img src="../assets/dpa-id-logo.svg" alt="dpa-ID" />
        </div>
      </div>
      <div class="flex h-6 flex-row items-center justify-end lg:h-8">
        <DpaIdAppswitcher stage="devel" overlay-top="12px" class="mr-2 items-center" />
        <DpaIdUsericon
          v-if="isAuthenticated"
          class="m-1"
          :client-id="AUTH0_CLIENT_ID"
          :firstname="user?.firstName"
          :img-url="user?.hasAvatar ? user.image.src : undefined"
          :initials="user?.initials"
          :lastname="user?.lastName"
          :overlay-right="'-7px'"
          :overlay-top="'16px'"
          :size="32"
          stage-useradmin="dev"
          stage-auth0="dev"
          @logout="logoutFunction"
        ></DpaIdUsericon>
        <UiButton v-else rounded size="small" color="transparent" @click="login">Log in</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DpaIdAppswitcher, DpaIdUsericon } from '@dpa-it/dpa-id-partner-components-vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { UiButton } from '@dpa-id-components/dpa-shared-components'

const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID
const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0()

const login = () => loginWithRedirect()
const logoutFunction = async () => {
  await logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
<style>
.border-shadow {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}
</style>
