<template>
  <div class="mobile-offcanvas-wrapper">
    <!-- Backdrop Overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="offcanvas-backdrop"
        :aria-label="$t('header.closeMenuAria')"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- Offcanvas Drawer -->
    <transition name="slide">
      <aside
        v-if="isMobileMenuOpen"
        class="offcanvas-panel"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('header.menuToggleAria')"
      >
        <!-- Header -->
        <div class="offcanvas-header">
          <router-link to="/" class="brand-logo" @click="closeMobileMenu">
            <span class="logo-icon-bubble">
              <AppIcon name="bag" size="18" />
            </span>
            <span class="logo-text">Bozor<span class="logo-dot">.</span></span>
          </router-link>
          <button
            type="button"
            class="close-glass-btn"
            :aria-label="$t('header.closeMenuAria')"
            @click="closeMobileMenu"
          >
            <AppIcon name="xmark" size="18" />
          </button>
        </div>

        <!-- Controls: Theme and Language -->
        <div class="offcanvas-controls">
          <div class="control-row">
            <span class="control-label">{{ $t('header.languageSelectAria') }}</span>
            <LanguageSwitcher />
          </div>
          <div class="control-row">
            <span class="control-label">{{ $t('header.themeToggleAria') }}</span>
            <ThemeToggle />
          </div>
        </div>

        <!-- Categories Section -->
        <div class="offcanvas-section">
          <h4 class="section-heading">{{ $t('categories.title') }}</h4>
          <ul class="category-list">
            <li v-for="cat in categories" :key="cat.id">
              <button
                type="button"
                class="category-btn"
                :class="{ active: selectedCategory === cat.slug }"
                @click="onSelectCategory(cat.slug)"
              >
                <span class="cat-icon-wrap" :style="cat.color ? { backgroundColor: cat.color + '18', color: cat.color } : {}">
                  <AppIcon :name="cat.icon" size="16" />
                </span>
                <span class="cat-name">{{ $t(cat.nameKey) }}</span>
                <span class="cat-count">{{ cat.count }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Navigation Links -->
        <div class="offcanvas-section nav-links-section">
          <h4 class="section-heading">{{ $t('footer.linksTitle') }}</h4>
          <ul class="offcanvas-nav">
            <li>
              <router-link to="/favorites" @click="closeMobileMenu">
                <AppIcon name="heart" size="18" class="nav-icon" />
                <span>{{ $t('nav.favorites') }}</span>
                <span v-if="favoritesCount > 0" class="badge badge-popular ms-auto">
                  {{ favoritesCount }}
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/cart" @click="closeMobileMenu">
                <AppIcon name="cart" size="18" class="nav-icon" />
                <span>{{ $t('nav.cart') }}</span>
                <span v-if="cartTotalItems > 0" class="badge badge-discount ms-auto">
                  {{ cartTotalItems }}
                </span>
              </router-link>
            </li>
            <li>
              <router-link :to="isAuthenticated ? '/profile' : '/login'" @click="closeMobileMenu">
                <AppIcon :name="isAuthenticated ? 'user-fill' : 'user'" size="18" class="nav-icon" />
                <span>{{ isAuthenticated ? currentUser.name : $t('nav.login') + ' / ' + $t('nav.register') }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Footer / Contact Info -->
        <div class="offcanvas-footer">
          <a :href="'tel:' + $t('footer.supportPhone')" class="support-phone">
            <AppIcon name="phone" size="16" />
            <span>{{ $t('footer.supportPhone') }}</span>
          </a>
          <p class="support-text">{{ $t('footer.workHours') }}</p>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';

export default {
  name: 'MobileOffcanvas',
  components: {
    LanguageSwitcher,
    ThemeToggle
  },
  computed: {
    ...mapGetters('ui', ['isMobileMenuOpen', 'favoritesCount', 'cartTotalItems']),
    ...mapGetters('products', ['categoriesList', 'selectedCategory']),
    ...mapGetters('auth', ['isAuthenticated', 'currentUser']),
    categories() {
      return this.categoriesList;
    }
  },
  methods: {
    ...mapActions('ui', ['closeMobileMenu']),
    ...mapActions('products', ['setCategory']),
    onSelectCategory(slug) {
      this.setCategory(slug);
      this.closeMobileMenu();
      if (this.$route.name !== 'Home' && this.$route.name !== 'Catalog') {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: var(--z-backdrop);
}

.offcanvas-panel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 82%;
  max-width: 320px;
  @include liquid-glass;
  border-radius: 0 var(--radius-card) var(--radius-card) 0;
  z-index: var(--z-offcanvas);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1.25rem;
}

.offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid var(--color-separator);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: var(--font-weight-heavy);
  font-size: 1.3rem;
  color: var(--color-label-primary);

  .logo-icon-bubble {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-pill);
    background: var(--color-primary);
    color: var(--color-label-white);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-dot {
    color: var(--color-primary);
  }
}

.close-glass-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-pill);
  background-color: var(--color-bg-fill);
  color: var(--color-label-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  @include tap-spring;

  &:hover {
    color: var(--color-label-primary);
  }
}

.offcanvas-controls {
  padding: 1rem 0;
  border-bottom: 0.5px solid var(--color-separator);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .control-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .control-label {
      font-size: var(--font-size-subhead);
      color: var(--color-label-secondary);
      font-weight: var(--font-weight-medium);
    }
  }
}

.offcanvas-section {
  padding: 1.25rem 0;
  border-bottom: 0.5px solid var(--color-separator);

  .section-heading {
    font-size: var(--font-size-caption-2);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  .category-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.5rem 0.65rem;
    border-radius: var(--radius-sm);
    color: var(--color-label-primary);
    font-size: var(--font-size-subhead);
    text-align: left;
    @include tap-spring;

    &:hover {
      background-color: var(--color-bg-fill);
    }

    &.active {
      background-color: var(--color-primary-tint);
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }

    .cat-icon-wrap {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-xs);
      background-color: var(--color-bg-fill);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cat-name {
      flex: 1;
    }

    .cat-count {
      font-size: var(--font-size-caption-2);
      color: var(--color-label-tertiary);
    }
  }
}

.offcanvas-nav {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  li a {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.6rem 0.75rem;
    border-radius: var(--radius-sm);
    color: var(--color-label-primary);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-medium);
    @include tap-spring;

    &:hover {
      background-color: var(--color-bg-fill);
      color: var(--color-primary);
    }

    .nav-icon {
      color: var(--color-label-secondary);
    }
  }
}

.offcanvas-footer {
  margin-top: auto;
  padding-top: 1.25rem;

  .support-phone {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    font-size: var(--font-size-subhead);
  }

  .support-text {
    font-size: var(--font-size-caption-2);
    color: var(--color-label-tertiary);
    margin-top: 0.2rem;
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 220ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 260ms var(--spring-ease);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
