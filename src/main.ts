import { createApp } from 'vue';
import './assets/css/index.less';
import 'uno.css';
import App from './App.vue';
import router from './router';
import pinia from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { useLoginStore } from './store/login/login';

const app = createApp(App);
// 注册element-plus中的所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(pinia);
const loginStore = useLoginStore();
loginStore.loadLocalDataAction();
app.use(router);
app.mount('#app');
