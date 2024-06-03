import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth0Init } from './authInit'

const app = createApp(App)
app.use(auth0Init)
app.use(router)
app.mount('#app')
