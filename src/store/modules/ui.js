import { storage } from '@/utils/storage';

const INITIAL_THEME = storage.get('marketplace_theme', 'light');
const INITIAL_FAVORITES = storage.get('marketplace_favorites', []);
const INITIAL_CART = storage.get('marketplace_cart', []);

// Set initial theme on HTML tag immediately
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', INITIAL_THEME);
}

let toastTimer = null;

export default {
  namespaced: true,
  state: () => ({
    theme: INITIAL_THEME,
    isMobileMenuOpen: false,
    favorites: INITIAL_FAVORITES,
    cart: INITIAL_CART,
    toast: {
      visible: false,
      message: '',
      icon: 'check'
    }
  }),
  getters: {
    isDark: (state) => state.theme === 'dark',
    favoritesCount: (state) => state.favorites.length,
    isFavorite: (state) => (productId) => state.favorites.includes(productId),
    cartTotalItems: (state) => state.cart.reduce((total, item) => total + (item.quantity || 1), 0),
    cartTotalPrice: (state) =>
      state.cart.reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 1), 0),
    isInCart: (state) => (productId) => state.cart.some((item) => item.productId === productId),
    toastState: (state) => state.toast
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      storage.set('marketplace_theme', theme);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
    },
    TOGGLE_THEME(state) {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = nextTheme;
      storage.set('marketplace_theme', nextTheme);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', nextTheme);
      }
    },
    SET_MOBILE_MENU(state, isOpen) {
      state.isMobileMenuOpen = isOpen;
      if (typeof document !== 'undefined') {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    },
    TOGGLE_FAVORITE(state, productId) {
      const index = state.favorites.indexOf(productId);
      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      storage.set('marketplace_favorites', state.favorites);
    },
    ADD_TO_CART(state, { product, quantity = 1 }) {
      const existing = state.cart.find((item) => item.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({
          productId: product.id,
          quantity,
          product
        });
      }
      storage.set('marketplace_cart', state.cart);
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find((i) => i.productId === productId);
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter((i) => i.productId !== productId);
        } else {
          item.quantity = quantity;
        }
        storage.set('marketplace_cart', state.cart);
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
      storage.set('marketplace_cart', []);
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.productId !== productId);
      storage.set('marketplace_cart', state.cart);
    },
    SET_TOAST(state, { visible, message = '', icon = 'check' }) {
      state.toast.visible = visible;
      state.toast.message = message;
      state.toast.icon = icon;
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME');
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme);
    },
    openMobileMenu({ commit }) {
      commit('SET_MOBILE_MENU', true);
    },
    closeMobileMenu({ commit }) {
      commit('SET_MOBILE_MENU', false);
    },
    toggleMobileMenu({ commit, state }) {
      commit('SET_MOBILE_MENU', !state.isMobileMenuOpen);
    },
    toggleFavorite({ commit, dispatch, state }, productId) {
      const wasFav = state.favorites.includes(productId);
      commit('TOGGLE_FAVORITE', productId);
      dispatch('showToast', {
        message: wasFav ? 'product.removeFromFavorites' : 'product.addToFavorites',
        icon: wasFav ? 'heart' : 'heart-fill'
      });
    },
    addToCart({ commit, dispatch }, payload) {
      commit('ADD_TO_CART', payload);
      dispatch('showToast', {
        message: 'product.inCart',
        icon: 'check'
      });
    },
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload);
    },
    clearCart({ commit, dispatch }) {
      commit('CLEAR_CART');
      dispatch('showToast', {
        message: 'cart.clearedSuccess',
        icon: 'trash'
      });
    },
    checkout({ commit, dispatch }) {
      commit('CLEAR_CART');
      dispatch('showToast', {
        message: 'cart.orderPlacedSuccess',
        icon: 'check'
      });
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    showToast({ commit }, { message, icon = 'check' }) {
      clearTimeout(toastTimer);
      commit('SET_TOAST', { visible: true, message, icon });
      toastTimer = setTimeout(() => {
        commit('SET_TOAST', { visible: false, message: '', icon: 'check' });
      }, 2400);
    }
  }
};
