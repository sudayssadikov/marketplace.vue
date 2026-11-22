import { createRouter, createWebHistory } from 'vue-router';
import { i18n } from '@/locales/i18n';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      titleKey: 'nav.home'
    }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('@/views/CatalogView.vue'),
    meta: {
      titleKey: 'nav.catalog'
    }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: {
      titleKey: 'placeholders.product'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: {
      titleKey: 'nav.cart'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
    meta: {
      titleKey: 'nav.favorites'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      titleKey: 'nav.profile'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      titleKey: 'nav.login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      titleKey: 'nav.register'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      titleKey: 'notFound.title'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    // If navigating to same path with query change only (e.g. ?page=2), keep position or scroll to product section if requested
    if (to.path === from.path && to.query.page !== from.query.page) {
      const el = document.getElementById('all-products-section');
      if (el) {
        return { el, top: 90, behavior: 'smooth' };
      }
    }
    return { top: 0, behavior: 'smooth' };
  }
});

router.afterEach((to) => {
  const baseTitle = 'Bozor';
  if (to.meta && to.meta.titleKey) {
    try {
      const pageTitle = i18n.global.t(to.meta.titleKey);
      document.title = `${pageTitle} | ${baseTitle}`;
    } catch {
      document.title = baseTitle;
    }
  } else {
    document.title = baseTitle;
  }
});

export default router;
