<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container-fluid header-container">
      <!-- Top Row -->
      <div class="header-main-row">
        <!-- Left: Menu Trigger (Mobile) & Logo -->
        <div class="header-left">
          <button
            type="button"
            class="mobile-menu-trigger d-lg-none"
            :aria-label="$t('header.menuToggleAria')"
            @click="toggleMobileMenu"
          >
            <AppIcon name="menu" size="20" />
          </button>

          <router-link to="/" class="brand-logo" aria-label="Bozor Home">
            <span class="logo-icon-bubble">
              <AppIcon name="bag" size="18" />
            </span>
            <span class="logo-text">Bozor<span class="logo-dot">.</span></span>
          </router-link>

          <!-- Catalog Pill (Desktop) -->
          <router-link to="/catalog" class="catalog-pill d-none d-md-flex">
            <AppIcon name="grid" size="16" />
            <span>{{ $t('header.catalogButton') }}</span>
          </router-link>
        </div>

        <!-- Center: Search Input Bar (Desktop) -->
        <div class="header-center d-none d-lg-block">
          <form class="search-form" @submit.prevent="handleSearchSubmit">
            <div class="search-input-pill">
              <AppIcon name="search" size="16" class="search-icon" />
              <input
                v-model="localSearchQuery"
                type="search"
                class="search-input"
                :placeholder="$t('header.searchPlaceholder')"
                :aria-label="$t('header.searchAria')"
                @input="handleSearchInput"
              />
              <button
                v-if="localSearchQuery"
                type="button"
                class="search-clear-btn"
                aria-label="Clear search"
                @click="clearSearch"
              >
                <AppIcon name="xmark" size="13" />
              </button>
            </div>
          </form>
        </div>

        <!-- Right: Actions (Language, Theme, Favorites, Cart, Profile) -->
        <div class="header-right">
          <!-- Language Switcher -->
          <LanguageSwitcher class="d-none d-sm-inline-block" />

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Favorites Link with Badge -->
          <router-link
            to="/favorites"
            class="action-pill d-none d-md-flex"
            :aria-label="$t('header.favoritesAria')"
            :title="$t('nav.favorites')"
          >
            <div class="action-icon-wrap">
              <AppIcon :name="favoritesCount > 0 ? 'heart-fill' : 'heart'" size="20" />
              <span v-if="favoritesCount > 0" class="action-badge">
                {{ favoritesCount > 99 ? '99+' : favoritesCount }}
              </span>
            </div>
            <span class="action-label d-none d-xl-inline">{{ $t('nav.favorites') }}</span>
          </router-link>

          <!-- Cart Link with Badge -->
          <router-link
            to="/cart"
            class="action-pill cart-pill"
            :aria-label="$t('header.cartAria')"
            :title="$t('nav.cart')"
          >
            <div class="action-icon-wrap">
              <AppIcon :name="cartTotalItems > 0 ? 'cart-fill' : 'cart'" size="20" />
              <span v-if="cartTotalItems > 0" class="action-badge cart-badge">
                {{ cartTotalItems > 99 ? '99+' : cartTotalItems }}
              </span>
            </div>
            <span class="action-label d-none d-xl-inline">{{ $t('nav.cart') }}</span>
          </router-link>

          <!-- User Profile / Login -->
          <router-link
            :to="isAuthenticated ? '/profile' : '/login'"
            class="action-pill d-none d-md-flex"
            :aria-label="isAuthenticated ? $t('nav.profile') : $t('nav.login')"
            :title="isAuthenticated ? currentUser.name : $t('nav.login')"
          >
            <div class="action-icon-wrap">
              <div v-if="isAuthenticated" class="user-avatar-badge">
                {{ userInitials }}
              </div>
              <AppIcon v-else name="user" size="20" />
            </div>
            <span class="action-label d-none d-xl-inline">
              {{ isAuthenticated ? currentUser.name.split(' ')[0] : $t('nav.login') }}
            </span>
          </router-link>
        </div>
      </div>

      <!-- Mobile Search Field (Uncramped, spacious, collapses smoothly on scroll) -->
      <div class="header-mobile-search d-lg-none" :class="{ collapsed: isScrolled }">
        <form class="search-form" @submit.prevent="handleSearchSubmit">
          <div class="search-input-pill">
            <AppIcon name="search" size="16" class="search-icon" />
            <input
              v-model="localSearchQuery"
              type="search"
              class="search-input"
              :placeholder="$t('header.searchPlaceholder')"
              :aria-label="$t('header.searchAria')"
              @input="handleSearchInput"
            />
            <button
              v-if="localSearchQuery"
              type="button"
              class="search-clear-btn"
              aria-label="Clear search"
              @click="clearSearch"
            >
              <AppIcon name="xmark" size="13" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';

export default {
  name: 'AppHeader',
  components: {
    LanguageSwitcher,
    ThemeToggle
  },
  data() {
    return {
      localSearchQuery: '',
      searchDebounceTimer: null,
      isScrolled: false
    };
  },
  computed: {
    ...mapGetters('ui', ['favoritesCount', 'cartTotalItems']),
    ...mapGetters('products', ['searchQuery']),
    ...mapGetters('auth', ['isAuthenticated', 'currentUser', 'userInitials'])
  },
  watch: {
    searchQuery(newVal) {
      this.localSearchQuery = newVal;
    }
  },
  created() {
    this.localSearchQuery = this.searchQuery;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions('ui', ['toggleMobileMenu']),
    ...mapActions('products', ['setSearch']),
    handleScroll() {
      this.isScrolled = window.scrollY > 40;
    },
    handleSearchInput() {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(() => {
        this.performSearch();
      }, 350);
    },
    handleSearchSubmit() {
      clearTimeout(this.searchDebounceTimer);
      this.performSearch();
    },
    clearSearch() {
      this.localSearchQuery = '';
      this.performSearch();
    },
    performSearch() {
      this.setSearch(this.localSearchQuery);
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

.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  @include liquid-glass;
  transition: padding var(--transition-base), box-shadow var(--transition-base);
  padding: 0.6rem 0;

  &.is-scrolled {
    box-shadow: var(--shadow-sm);
  }
}

.header-container {
  max-width: 1440px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
}

.header-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1.25rem;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
}

.mobile-menu-trigger {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-label-primary);
  background-color: var(--color-bg-fill);
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill-hover);
  }
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: var(--font-weight-heavy);
  font-size: 1.35rem;
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing-title);
  @include tap-spring;

  .logo-icon-bubble {
    width: 34px;
    height: 34px;
    border-radius: var(--radius-pill);
    background: var(--color-primary);
    color: var(--color-label-white);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px var(--color-primary-glow);
  }

  .logo-dot {
    color: var(--color-primary);
  }
}

.catalog-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-label-white);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 2px 10px var(--color-primary-glow);
  @include tap-spring;

  &:hover {
    background-color: var(--color-primary-hover);
    color: var(--color-label-white);
  }
}

.header-center {
  flex: 1;
  max-width: 520px;
  margin: 0 0.5rem;
}

.search-form {
  width: 100%;
}

.search-input-pill {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  .search-icon {
    position: absolute;
    left: 1rem;
    color: var(--color-label-tertiary);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 0.55rem 2.2rem 0.55rem 2.45rem;
    background-color: var(--color-bg-fill);
    border: 0.5px solid transparent;
    border-radius: var(--radius-pill);
    font-size: var(--font-size-body);
    color: var(--color-label-primary);

    &:focus {
      background-color: var(--color-bg-surface);
      border-color: var(--color-primary);
    }
  }

  .search-clear-btn {
    position: absolute;
    right: 0.75rem;
    width: 20px;
    height: 20px;
    border-radius: var(--radius-pill);
    background: var(--color-separator-opaque);
    color: var(--color-bg-surface);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--color-label-secondary);
    }
  }
}

.header-mobile-search {
  margin-top: 0.65rem;
  transition: all var(--transition-base);

  &.collapsed {
    margin-top: 0.4rem;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;

  @media (min-width: 992px) {
    gap: 0.75rem;
  }
}

.action-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-pill);
  color: var(--color-label-primary);
  background-color: transparent;
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill);
    color: var(--color-primary);
  }

  .action-icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-badge {
    position: absolute;
    top: -5px;
    right: -8px;
    background-color: var(--color-primary);
    color: var(--color-label-white);
    font-size: 0.625rem;
    font-weight: var(--font-weight-heavy);
    min-width: 17px;
    height: 17px;
    border-radius: var(--radius-pill);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid var(--color-bg-surface);
  }

  .cart-badge {
    background-color: var(--color-danger);
  }

  .user-avatar-badge {
    width: 26px;
    height: 26px;
    border-radius: var(--radius-pill);
    background-color: var(--color-primary);
    color: var(--color-label-white);
    font-size: 0.7rem;
    font-weight: var(--font-weight-heavy);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
  }

  .action-label {
    font-size: var(--font-size-footnote);
    font-weight: var(--font-weight-medium);
  }
}
</style>
