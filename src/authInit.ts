import { createAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue'

export const auth0Init = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
})

export const getAuth0IdToken = computed(() => {
  try {
    return (
      auth0Init.isAuthenticated.value &&
      !auth0Init.isLoading.value &&
      auth0Init.idTokenClaims.value?.__raw
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching token:', error)
  }
  return undefined
})
