<template>
  <nav class="mobile-bottom-nav d-lg-none" aria-label="Mobile Navigation">
    <div class="nav-pill-bar">
      <!-- Home -->
      <router-link to="/" class="nav-tab" :class="{ active: $route.path === '/' }">
        <div class="tab-icon-wrap">
          <AppIcon
            :name="$route.path === '/' ? 'home-fill' : 'home'"
            size="22"
          />
        </div>
        <span class="tab-label">{{ $t('nav.home') }}</span>
      </router-link>

      <!-- Catalog -->
      <router-link to="/catalog" class="nav-tab" :class="{ active: $route.path.startsWith('/catalog') }">
        <div class="tab-icon-wrap">
          <AppIcon
            :name="$route.path.startsWith('/catalog') ? 'grid-fill' : 'grid'"
            size="22"
          />
        </div>
        <span class="tab-label">{{ $t('nav.catalog') }}</span>
      </router-link>

      <!-- Favorites -->
      <router-link to="/favorites" class="nav-tab" :class="{ active: $route.path === '/favorites' }">
        <div class="tab-icon-wrap">
          <AppIcon
            :name="$route.path === '/favorites' ? 'heart-fill' : 'heart'"
            size="22"
          />
          <span v-if="favoritesCount > 0" class="badge-bubble">
            {{ favoritesCount > 99 ? '99+' : favoritesCount }}
          </span>
        </div>
        <span class="tab-label">{{ $t('nav.favorites') }}</span>
      </router-link>

      <!-- Cart -->
      <router-link to="/cart" class="nav-tab" :class="{ active: $route.path === '/cart' }">
        <div class="tab-icon-wrap">
          <AppIcon
            :name="$route.path === '/cart' ? 'cart-fill' : 'cart'"
            size="22"
          />
          <span v-if="cartTotalItems > 0" class="badge-bubble cart-bubble">
            {{ cartTotalItems > 99 ? '99+' : cartTotalItems }}
          </span>
        </div>
        <span class="tab-label">{{ $t('nav.cart') }}</span>
      </router-link>

      <!-- Profile -->
      <router-link
        to="/profile"
        class="nav-tab"
        :class="{ active: $route.path === '/profile' || $route.path === '/login' || $route.path === '/register' }"
      >
        <div class="tab-icon-wrap">
          <AppIcon
            :name="($route.path === '/profile' || $route.path === '/login' || $route.path === '/register') ? 'user-fill' : 'user'"
            size="22"
          />
        </div>
        <span class="tab-label">{{ $t('nav.profile') }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MobileBottomNav',
  computed: {
    ...mapGetters('ui', ['favoritesCount', 'cartTotalItems'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.mobile-bottom-nav {
  position: fixed;
  bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  left: 14px;
  right: 14px;
  z-index: var(--z-header);
  pointer-events: none; /* Let background clicks pass through empty sides */
}

.nav-pill-bar {
  pointer-events: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: var(--mobile-tab-height);
  border-radius: var(--radius-pill);
  @include liquid-glass;
  box-shadow: var(--shadow-float-pill);
  padding: 0 0.5rem;
  max-width: 480px;
  margin: 0 auto;
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--color-label-secondary);
  text-decoration: none;
  @include tap-spring;

  .tab-icon-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .tab-label {
    font-size: var(--font-size-caption-2);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    letter-spacing: 0.01em;
  }

  &.active {
    color: var(--color-primary);

    .tab-label {
      font-weight: var(--font-weight-bold);
    }
  }
}

.badge-bubble {
  position: absolute;
  top: -4px;
  right: -9px;
  min-width: 16px;
  height: 16px;
  border-radius: var(--radius-pill);
  background-color: var(--color-primary);
  color: var(--color-label-white);
  font-size: 0.625rem;
  font-weight: var(--font-weight-heavy);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  line-height: 1;
  border: 1.5px solid var(--color-bg-surface);
}

.cart-bubble {
  background-color: var(--color-danger);
}
</style>
