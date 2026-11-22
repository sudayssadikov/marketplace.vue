import { storage } from '@/utils/storage';

const SAVED_USER = storage.get('marketplace_user', null);
const SAVED_TOKEN = storage.get('marketplace_token', null);

export default {
  namespaced: true,
  state: () => ({
    user: SAVED_USER,
    token: SAVED_TOKEN
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    userInitials: (state) => {
      if (!state.user || !state.user.name) return 'U';
      const parts = state.user.name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
  },
  mutations: {
    SET_AUTH(state, { user, token }) {
      state.user = user;
      state.token = token;
      storage.set('marketplace_user', user);
      storage.set('marketplace_token', token);
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      storage.remove('marketplace_user');
      storage.remove('marketplace_token');
    },
    UPDATE_USER(state, payload) {
      if (state.user) {
        state.user = { ...state.user, ...payload };
        storage.set('marketplace_user', state.user);
      }
    }
  },
  actions: {
    login({ commit, dispatch }, { email, password }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!email || !password || password.length < 6) {
            reject(new Error('Invalid credentials'));
            return;
          }

          const mockUser = {
            id: 'usr-' + Date.now().toString(36),
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            phone: '+998 90 123-45-67',
            location: 'Toshkent, Oʻzbekiston',
            ordersCount: 3,
            joinedDate: '2024-01-15'
          };
          const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);

          commit('SET_AUTH', { user: mockUser, token: mockToken });
          dispatch(
            'ui/showToast',
            { message: 'auth.loginSuccess', icon: 'check' },
            { root: true }
          );
          resolve(mockUser);
        }, 300);
      });
    },

    register({ commit, dispatch }, { name, email, password }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!name || !email || !password || password.length < 6) {
            reject(new Error('Invalid registration data'));
            return;
          }

          const mockUser = {
            id: 'usr-' + Date.now().toString(36),
            name,
            email,
            phone: '+998 90 000-00-00',
            location: 'Toshkent',
            ordersCount: 0,
            joinedDate: new Date().toISOString().split('T')[0]
          };
          const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);

          commit('SET_AUTH', { user: mockUser, token: mockToken });
          dispatch(
            'ui/showToast',
            { message: 'auth.loginSuccess', icon: 'check' },
            { root: true }
          );
          resolve(mockUser);
        }, 300);
      });
    },

    logout({ commit, dispatch }) {
      commit('CLEAR_AUTH');
      dispatch(
        'ui/showToast',
        { message: 'auth.logoutSuccess', icon: 'check' },
        { root: true }
      );
    },

    updateProfile({ commit, dispatch }, payload) {
      commit('UPDATE_USER', payload);
      dispatch(
        'ui/showToast',
        { message: 'profile.updatedSuccess', icon: 'check' },
        { root: true }
      );
    }
  }
};

