<template>
  <div class="marketplace-app" :data-theme="theme">
    <!-- iOS Glass Banner Toast from Top -->
    <transition name="toast-slide">
      <div v-if="toastState.visible" class="ios-glass-toast" role="status">
        <div class="toast-pill">
          <AppIcon :name="toastState.icon" size="16" class="toast-icon" />
          <span class="toast-text">{{ $t(toastState.message) }}</span>
        </div>
        
      </div>
    </transition>

    <!-- Header -->
    <AppHeader />

    <!-- Main Dynamic Route View -->
    <main class="marketplace-main">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Mobile Navigation Bottom Bar -->
    <MobileBottomNav />

    <!-- Mobile Offcanvas Menu Drawer -->
    <MobileOffcanvas />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import MobileBottomNav from '@/components/layout/MobileBottomNav.vue';
import MobileOffcanvas from '@/components/layout/MobileOffcanvas.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    MobileBottomNav,
    MobileOffcanvas
  },
  computed: {
    ...mapGetters('ui', ['theme', 'toastState'])
  }
};
</script>

<style lang="scss">
@import '@/styles/main';

.marketplace-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--color-bg-body);

  /* Page bottom padding = tab bar height (64px) + safe area + 16px */
  @media (max-width: 991.98px) {
    padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px) + 26px);
  }
}

.marketplace-main {
  flex: 1 0 auto;
}

/* iOS Glass Toast Notification */
.ios-glass-toast {
  position: fixed;
  top: 14px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: var(--z-toast);
  pointer-events: none;
}

.toast-pill {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-pill);
  @include liquid-glass;
  box-shadow: var(--shadow-float-pill);
  color: var(--color-label-primary);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-semibold);

  .toast-icon {
    color: var(--color-primary);
  }
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: transform 320ms var(--spring-bounce), opacity 240ms ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-24px) scale(0.94);
}

/* Page Transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms var(--spring-ease);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
