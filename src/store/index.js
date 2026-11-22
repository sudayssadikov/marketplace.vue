import { createStore } from 'vuex';
import ui from './modules/ui';
import products from './modules/products';
import auth from './modules/auth';

export default createStore({
  modules: {
    ui,
    products,
    auth
  }
});
