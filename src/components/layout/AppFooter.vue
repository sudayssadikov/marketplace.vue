<template>
  <footer class="app-footer">
    <div class="container-fluid footer-container">
      <div class="row g-4 footer-top">
        <!-- Brand Info & Mission -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="footer-brand">
            <router-link to="/" class="brand-logo" aria-label="Bozor Home">
              <span class="logo-icon-bubble">
                <AppIcon name="bag" size="18" />
              </span>
              <span class="logo-text">Bozor<span class="logo-dot">.</span></span>
            </router-link>
            <p class="brand-desc">
              {{ $t('footer.aboutText') }}
            </p>
            <div class="social-links">
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Telegram">
                <AppIcon name="telegram" size="16" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Instagram">
                <AppIcon name="instagram" size="16" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Facebook">
                <AppIcon name="facebook" size="16" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="YouTube">
                <AppIcon name="youtube" size="16" />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-6 col-sm-6 col-md-3 col-lg-2">
          <h4 class="footer-title">{{ $t('footer.linksTitle') }}</h4>
          <ul class="footer-menu">
            <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li><router-link to="/catalog">{{ $t('nav.catalog') }}</router-link></li>
            <li><router-link to="/cart">{{ $t('nav.cart') }}</router-link></li>
            <li><router-link to="/favorites">{{ $t('nav.favorites') }}</router-link></li>
            <li><router-link to="/login">{{ $t('nav.login') }}</router-link></li>
          </ul>
        </div>

        <!-- Categories Links -->
        <div class="col-6 col-sm-6 col-md-3 col-lg-3">
          <h4 class="footer-title">{{ $t('footer.categoriesTitle') }}</h4>
          <ul class="footer-menu">
            <li><router-link to="/catalog?category=smartphones">{{ $t('categories.smartphones') }}</router-link></li>
            <li><router-link to="/catalog?category=laptops">{{ $t('categories.laptops') }}</router-link></li>
            <li><router-link to="/catalog?category=audio">{{ $t('categories.audio') }}</router-link></li>
            <li><router-link to="/catalog?category=appliances">{{ $t('categories.appliances') }}</router-link></li>
            <li><router-link to="/catalog?category=gaming">{{ $t('categories.gaming') }}</router-link></li>
          </ul>
        </div>

        <!-- Customer Care & Contact Info -->
        <div class="col-12 col-md-6 col-lg-3">
          <h4 class="footer-title">{{ $t('footer.contactTitle') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <AppIcon name="phone" size="18" class="contact-icon" />
              <div>
                <a :href="'tel:' + $t('footer.supportPhone')" class="contact-val font-weight-bold">
                  {{ $t('footer.supportPhone') }}
                </a>
                <span class="contact-sub">{{ $t('footer.workHours') }}</span>
              </div>
            </div>
            <div class="contact-item">
              <AppIcon name="mail" size="18" class="contact-icon" />
              <div>
                <a :href="'mailto:' + $t('footer.supportEmail')" class="contact-val">
                  {{ $t('footer.supportEmail') }}
                </a>
              </div>
            </div>
            <div class="contact-item">
              <AppIcon name="shield" size="18" class="contact-icon" />
              <div>
                <span class="contact-val">{{ $t('footer.customerCare') }}</span>
                <span class="contact-sub">{{ $t('footer.faq') }} &bull; {{ $t('footer.delivery') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p class="copyright-text">
              {{ $t('footer.copyright') }}
            </p>
          </div>
          <div class="col-12 col-md-6 text-center text-md-end">
            <div class="bottom-links">
              <a href="#" @click.prevent>{{ $t('footer.privacy') }}</a>
              <span class="dot-separator">&bull;</span>
              <a href="#" @click.prevent>{{ $t('footer.terms') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.app-footer {
  background-color: var(--color-bg-surface);
  border-top: 0.5px solid var(--color-separator);
  padding: 3rem 0 2rem;
  margin-top: auto;
  transition: background-color var(--transition-base);
}

.footer-container {
  max-width: 1440px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
}

.footer-top {
  padding-bottom: 2rem;
  border-bottom: 0.5px solid var(--color-separator);
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: var(--font-weight-heavy);
  font-size: 1.35rem;
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing-title);
  margin-bottom: 0.75rem;

  .logo-icon-bubble {
    width: 34px;
    height: 34px;
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

.brand-desc {
  color: var(--color-label-secondary);
  font-size: var(--font-size-subhead);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  max-width: 360px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  .social-pill {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-pill);
    background-color: var(--color-bg-fill);
    color: var(--color-label-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    @include tap-spring;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-label-white);
    }
  }
}

.footer-title {
  font-size: var(--font-size-headline);
  font-weight: var(--font-weight-semibold);
  color: var(--color-label-primary);
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-tight);
}

.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  li a {
    color: var(--color-label-secondary);
    font-size: var(--font-size-subhead);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;

  .contact-icon {
    color: var(--color-primary);
    margin-top: 0.15rem;
  }

  .contact-val {
    display: block;
    color: var(--color-label-primary);
    font-size: var(--font-size-subhead);
    font-weight: var(--font-weight-semibold);

    &:hover {
      color: var(--color-primary);
    }
  }

  .contact-sub {
    display: block;
    font-size: var(--font-size-caption-2);
    color: var(--color-label-tertiary);
    margin-top: 0.15rem;
  }
}

.footer-bottom {
  padding-top: 1.5rem;
}

.copyright-text {
  font-size: var(--font-size-caption);
  color: var(--color-label-tertiary);
}

.bottom-links {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--font-size-caption);
  color: var(--color-label-secondary);

  a:hover {
    color: var(--color-primary);
  }

  .dot-separator {
    color: var(--color-separator-opaque);
  }
}
</style>
