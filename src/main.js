import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/androidstudio.css'
// isbl-editor-dark.css,androidstudio.css,arta.css,atelier-cave-dark.css,codepen-embed.css


import './assets/style.css'
const app= createApp(App)
app.provide("$store", store)
app.use(store).use(VueHighlightJS).use(router).mount('#app')
