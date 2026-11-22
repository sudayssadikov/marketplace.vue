<template>
  <div class="profile-view">
    <div class="container-fluid content-container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <div class="profile-layout">
        <!-- User Profile Card -->
        <div class="user-hero-card">
          <div class="avatar-ring">
            <div class="user-avatar-circle">
              {{ isAuthenticated ? userInitials : 'G' }}
            </div>
          </div>

          <div v-if="isAuthenticated" class="user-info-text">
            <h1 class="user-name">{{ currentUser.name }}</h1>
            <p class="user-email">{{ currentUser.email }}</p>
            <div class="user-tags">
              <span class="user-pill">
                <AppIcon name="map-pin" size="12" />
                {{ currentUser.location || 'Toshkent' }}
              </span>
              <span class="user-pill">
                <AppIcon name="clock" size="12" />
                {{ $t('profile.memberSince') }}: {{ currentUser.joinedDate || '2024' }}
              </span>
            </div>
          </div>

          <div v-else class="user-info-text">
            <h1 class="user-name">{{ $t('profile.guestTitle') }}</h1>
            <p class="user-email">{{ $t('profile.guestSubtitle') }}</p>
            <div class="auth-buttons-row">
              <router-link to="/login" class="btn btn-primary btn-sm btn-pill">
                <AppIcon name="lock" size="14" />
                <span>{{ $t('profile.signInBtn') }}</span>
              </router-link>
              <router-link to="/register" class="btn btn-secondary btn-sm btn-pill">
                <AppIcon name="user" size="14" />
                <span>{{ $t('profile.signUpBtn') }}</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- iOS Grouped Inset List Settings -->
        <div class="settings-groups">
          <!-- Group 1: Activity & Orders -->
          <div class="settings-group">
            <h2 class="group-title">{{ $t('profile.accountSettings') }}</h2>
            <div class="ios-list-card">
              <!-- Orders Row -->
              <div class="ios-list-item" @click="handleOrdersClick">
                <div class="item-icon-wrap bg-blue">
                  <AppIcon name="package" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('profile.orders') }}</span>
                  <span class="item-subtitle">{{ $t('profile.ordersDesc') }}</span>
                </div>
                <div class="item-right">
                  <span class="badge-count">
                    {{ isAuthenticated ? (currentUser.ordersCount || 3) : 0 }}
                  </span>
                  <AppIcon name="chevron-right" size="14" class="chevron" />
                </div>
              </div>

              <!-- Favorites Row -->
              <router-link to="/favorites" class="ios-list-item">
                <div class="item-icon-wrap bg-red">
                  <AppIcon name="heart-fill" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('favorites.title') }}</span>
                </div>
                <div class="item-right">
                  <span class="badge-count">{{ favoritesCount }}</span>
                  <AppIcon name="chevron-right" size="14" class="chevron" />
                </div>
              </router-link>

              <!-- Cart Row -->
              <router-link to="/cart" class="ios-list-item">
                <div class="item-icon-wrap bg-green">
                  <AppIcon name="cart" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('cart.title') }}</span>
                </div>
                <div class="item-right">
                  <span class="badge-count">{{ cartCount }}</span>
                  <AppIcon name="chevron-right" size="14" class="chevron" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Group 2: App Preferences -->
          <div class="settings-group">
            <h2 class="group-title">{{ $t('profile.appPreferences') }}</h2>
            <div class="ios-list-card">
              <!-- Language Switcher Row -->
              <div class="ios-list-item interactive-control">
                <div class="item-icon-wrap bg-orange">
                  <AppIcon name="globe" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('profile.language') }}</span>
                </div>
                <div class="item-right">
                  <LanguageSwitcher />
                </div>
              </div>

              <!-- Theme Toggle Row -->
              <div class="ios-list-item interactive-control">
                <div class="item-icon-wrap bg-purple">
                  <AppIcon :name="isDark ? 'moon' : 'sun'" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('profile.theme') }}</span>
                </div>
                <div class="item-right">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          <!-- Group 3: Support -->
          <div class="settings-group">
            <h2 class="group-title">{{ $t('footer.customerCare') }}</h2>
            <div class="ios-list-card">
              <a href="tel:+998712000000" class="ios-list-item">
                <div class="item-icon-wrap bg-teal">
                  <AppIcon name="phone" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('profile.support') }}</span>
                  <span class="item-subtitle">{{ $t('footer.supportPhone') }}</span>
                </div>
                <div class="item-right">
                  <AppIcon name="chevron-right" size="14" class="chevron" />
                </div>
              </a>

              <router-link to="/catalog" class="ios-list-item">
                <div class="item-icon-wrap bg-indigo">
                  <AppIcon name="store" size="18" />
                </div>
                <div class="item-label-wrap">
                  <span class="item-title">{{ $t('nav.catalog') }}</span>
                </div>
                <div class="item-right">
                  <AppIcon name="chevron-right" size="14" class="chevron" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Group 4: Logout (If logged in) -->
          <div v-if="isAuthenticated" class="settings-group">
            <div class="ios-list-card">
              <button
                type="button"
                class="ios-list-item logout-btn"
                @click="handleLogout"
              >
                <div class="item-icon-wrap bg-danger">
                  <AppIcon name="log-out" size="18" />
                </div>
                <span class="item-title text-danger">{{ $t('profile.logout') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';

export default {
  name: 'ProfileView',
  components: {
    Breadcrumbs,
    LanguageSwitcher,
    ThemeToggle
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    currentUser() {
      return this.$store.getters['auth/currentUser'];
    },
    userInitials() {
      return this.$store.getters['auth/userInitials'];
    },
    favoritesCount() {
      return this.$store.getters['ui/favoritesCount'];
    },
    cartCount() {
      return this.$store.getters['ui/cartTotalItems'];
    },
    isDark() {
      return this.$store.getters['ui/isDark'];
    },
    breadcrumbItems() {
      return [
        { label: this.$t('breadcrumbs.profile') }
      ];
    }
  },
  methods: {
    handleOrdersClick() {
      this.$store.dispatch('ui/showToast', {
        message: 'profile.ordersDesc',
        icon: 'package'
      });
    },
    handleLogout() {
      if (confirm(this.$t('profile.logoutConfirm'))) {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.profile-view {
  padding-top: 1rem;
  padding-bottom: 5rem;
}

.content-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;

  @include respond-to('md') {
    padding: 0 1.5rem;
  }
}

.profile-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* User Card */
.user-hero-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem;
  border-radius: var(--radius-2xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);

  .avatar-ring {
    padding: 3px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--color-primary), #5856d6);
    flex-shrink: 0;
  }

  .user-avatar-circle {
    width: 68px;
    height: 68px;
    border-radius: var(--radius-full);
    background: var(--color-card);
    color: var(--color-primary);
    font-size: 1.5rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-card);
  }

  .user-info-text {
    flex: 1;

    .user-name {
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 0.25rem;
    }

    .user-email {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
    }

    .user-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .user-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        color: var(--color-text-secondary);
        background: var(--color-surface);
        padding: 0.25rem 0.625rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--glass-border);
      }
    }

    .auth-buttons-row {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
  }
}

/* Inset Grouped Settings */
.settings-groups {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.settings-group {
  .group-title {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-tertiary);
    margin-bottom: 0.5rem;
    padding-left: 0.75rem;
  }

  .ios-list-card {
    border-radius: var(--radius-xl);
    background: var(--color-card);
    border: 1px solid var(--glass-border);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .ios-list-item {
    display: flex;
    align-items: center;
    padding: 0.875rem 1.125rem;
    border-bottom: 1px solid var(--glass-border);
    text-decoration: none;
    color: var(--color-text-primary);
    background: transparent;
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
    cursor: pointer;
    transition: background var(--transition-base);

    &:last-child {
      border-bottom: none;
    }

    &:hover:not(.interactive-control) {
      background: var(--color-surface);
    }

    &.interactive-control {
      cursor: default;
    }

    .item-icon-wrap {
      width: 2rem;
      height: 2rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 0.875rem;
      flex-shrink: 0;

      &.bg-blue { background: #007aff; }
      &.bg-red { background: #ff2d55; }
      &.bg-green { background: #34c759; }
      &.bg-orange { background: #ff9500; }
      &.bg-purple { background: #af52de; }
      &.bg-teal { background: #30b0c7; }
      &.bg-indigo { background: #5856d6; }
      &.bg-danger { background: rgba(255, 59, 48, 0.15); color: #ff3b30; }
    }

    .item-label-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;

      .item-title {
        font-size: 0.9375rem;
        font-weight: 600;
      }

      .item-subtitle {
        font-size: 0.75rem;
        color: var(--color-text-secondary);
      }
    }

    .item-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .badge-count {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }

      .chevron {
        color: var(--color-text-tertiary);
      }
    }

    &.logout-btn {
      text-align: left;
      font-weight: 600;
    }
  }
}
</style>

