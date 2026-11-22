<template>
  <div class="auth-view">
    <div class="container-fluid content-container">
      <div class="auth-card-wrapper">
        <div class="auth-card">
          <!-- Card Header -->
          <div class="auth-header">
            <div class="auth-icon-badge">
              <AppIcon name="lock" size="24" />
            </div>
            <h1 class="auth-title">{{ $t('auth.loginTitle') }}</h1>
            <p class="auth-subtitle">{{ $t('auth.loginSubtitle') }}</p>
          </div>

          <!-- Demo Notice -->
          <div class="demo-banner">
            <AppIcon name="info" size="16" class="info-icon" />
            <span>{{ $t('auth.demoNotice') }}</span>
          </div>

          <!-- Login Form -->
          <form class="auth-form" @submit.prevent="handleSubmit">
            <!-- Email Field -->
            <div class="form-group">
              <label for="login-email" class="form-label">{{ $t('auth.email') }}</label>
              <div class="input-wrap" :class="{ 'has-error': errors.email }">
                <AppIcon name="mail" size="18" class="input-icon" />
                <input
                  id="login-email"
                  v-model.trim="email"
                  type="email"
                  :placeholder="$t('auth.emailPlaceholder')"
                  class="ios-input"
                  autocomplete="email"
                  required
                />
              </div>
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label for="login-password" class="form-label">{{ $t('auth.password') }}</label>
              <div class="input-wrap" :class="{ 'has-error': errors.password }">
                <AppIcon name="lock" size="18" class="input-icon" />
                <input
                  id="login-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.passwordPlaceholder')"
                  class="ios-input"
                  autocomplete="current-password"
                  required
                />
                <button
                  type="button"
                  class="password-toggle-btn"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <AppIcon :name="showPassword ? 'eye-slash' : 'eye'" size="18" />
                </button>
              </div>
              <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary btn-submit"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              <span>{{ $t('auth.loginBtn') }}</span>
            </button>
          </form>

          <!-- Card Footer Switch Link -->
          <div class="auth-footer">
            <span class="footer-text">{{ $t('auth.noAccount') }}</span>
            <router-link to="/register" class="auth-switch-link">
              {{ $t('auth.registerLink') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: 'demo@bozor.uz',
      password: 'password123',
      showPassword: false,
      isLoading: false,
      errors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = { email: '', password: '' };

      if (!this.email) {
        this.errors.email = this.$t('auth.emailRequired');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = this.$t('auth.emailInvalid');
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = this.$t('auth.passwordRequired');
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = this.$t('auth.passwordMin');
        isValid = false;
      }

      return isValid;
    },
    async handleSubmit() {
      if (!this.validate()) return;
      this.isLoading = true;
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });
        const redirect = this.$route.query.redirect || '/profile';
        this.$router.push(redirect);
      } catch (err) {
        this.errors.password = this.$t('auth.passwordMin');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.auth-view {
  padding: 3rem 0 6rem;
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
}

.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-card-wrapper {
  max-width: 440px;
  margin: 0 auto;
}

.auth-card {
  padding: 2.25rem 2rem;
  border-radius: var(--radius-2xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);

  @include respond-to('sm') {
    padding: 2.5rem 2.25rem;
  }

  .auth-header {
    text-align: center;
    margin-bottom: 1.5rem;

    .auth-icon-badge {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--radius-full);
      background: rgba(10, 132, 255, 0.1);
      color: var(--color-primary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .auth-title {
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
      margin-bottom: 0.375rem;
    }

    .auth-subtitle {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.4;
    }
  }

  .demo-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.875rem;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    border: 1px solid var(--glass-border);
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;

    .info-icon {
      color: var(--color-primary);
      flex-shrink: 0;
    }
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;

      .form-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-text-primary);
      }

      .input-wrap {
        display: flex;
        align-items: center;
        background: var(--color-surface);
        border: 1px solid var(--glass-border);
        border-radius: 14px;
        padding: 0 0.875rem;
        transition: border-color var(--transition-base), box-shadow var(--transition-base);

        &:focus-within {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-light);
        }

        &.has-error {
          border-color: var(--color-danger);
        }

        .input-icon {
          color: var(--color-text-tertiary);
          margin-right: 0.625rem;
          flex-shrink: 0;
        }

        .ios-input {
          flex: 1;
          height: 48px;
          border: none;
          background: transparent;
          color: var(--color-text-primary);
          font-size: 0.9375rem;
          outline: none;

          &::placeholder {
            color: var(--color-text-tertiary);
          }
        }

        .password-toggle-btn {
          border: none;
          background: transparent;
          color: var(--color-text-tertiary);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;

          &:hover {
            color: var(--color-text-primary);
          }
        }
      }

      .error-msg {
        font-size: 0.75rem;
        color: var(--color-danger);
        font-weight: 500;
      }
    }

    .btn-submit {
      margin-top: 0.5rem;
      min-height: 50px;
      border-radius: var(--radius-full);
      font-size: 1rem;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(10, 132, 255, 0.3);
    }
  }

  .auth-footer {
    text-align: center;
    margin-top: 1.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--glass-border);
    font-size: 0.875rem;

    .footer-text {
      color: var(--color-text-secondary);
      margin-right: 0.375rem;
    }

    .auth-switch-link {
      color: var(--color-primary);
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

