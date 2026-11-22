import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './locales/i18n';
import AppIcon from './components/common/AppIcon.vue';

// Create App instance
const app = createApp(App);

// Register Global Components
app.component('AppIcon', AppIcon);

// Register Plugins
app.use(store);
app.use(router);
app.use(i18n);

// Mount to DOM
app.mount('#app');
