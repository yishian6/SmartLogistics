// import './assets/main.css'
import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive("scrollBottom", {
    updated(el) {
        // 这里的el即是绑定指令处的dom元素
        el.scrollTo({
            top: el.scrollHeight - el.clientHeight,
            behavior: "smooth"
        })
    }
})
app.mount('#app')
