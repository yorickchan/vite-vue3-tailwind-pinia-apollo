import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { apolloClient } from './apollo.config'
import { provideApolloClient } from '@vue/apollo-composable'

const app = createApp({
  setup() {
    // provideApolloClient(apolloClient)
  },
  render() {
    return h(App)
  },
})

app.use(createPinia())
app.use(router)
app.mount('#app')
