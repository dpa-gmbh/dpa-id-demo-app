<template>
  <div class="border-shadow fixed z-20 flex h-16 w-full basis-full items-center bg-white lg:h-20">
    <div class="my-6 flex w-full justify-between px-5 lg:px-32">
      <div class="flex flex-row items-center justify-start">
        <div class="flex h-6 flex-row justify-start lg:h-8">
          <img src="../assets/dpa-id-wordmark.svg" alt="ID" class="mr-2" />
          <img src="../assets/dpa-id-logo.svg" alt="dpa-ID" />
        </div>
      </div>
      <div class="flex h-6 flex-row items-center justify-end lg:h-8">
        <DpaIdAppswitcher stage="devel" overlay-top="12px" class="mr-2 items-center" />
        <DpaIdUsericon
          v-if="isAuthenticated && showUserIcon && user?.data.profile"
          :key="user?.data.profile"
          class="m-1"
          :client-id="AUTH0_CLIENT_ID"
          :firstname="user?.data.profile.firstName"
          :img-url="user.hasAvatar ? user.image.src : undefined"
          :initials="user?.data.profile.initials"
          :lastname="user?.data.profile.lastName"
          :overlay-right="'-7px'"
          :overlay-top="'16px'"
          :size="32"
          stage-useradmin="prod"
          stage-auth0="prod"
          @logout="logoutFunction"
        ></DpaIdUsericon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export const showUserIcon = ref(true)
</script>

<script lang="ts" setup>
//import { DpaIdAppswitcher, DpaIdUsericon } from '@dpa-it/dpa-id-partner-components-vue'
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID
const { isAuthenticated, user, logout } = useAuth0()

const logoutFunction = async () => {
  await logout()
}
</script>
<style>
.border-shadow {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}
</style>
