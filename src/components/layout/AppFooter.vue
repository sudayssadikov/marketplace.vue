<template>
  <footer class="app-footer">
    <!-- ========================================================
         MOBILE FOOTER (< 992px) - iOS Settings Inset Grouped Style
         ======================================================== -->
    <div class="mobile-footer d-lg-none">
      <div class="container-fluid footer-mobile-container">
        <!-- Brand Block at Top -->
        <div class="mobile-brand-block">
          <router-link to="/" class="brand-logo" aria-label="Bozor Home">
            <span class="logo-icon-bubble">
              <AppIcon name="bag" size="18" />
            </span>
            <span class="logo-text">Bozor<span class="logo-dot">.</span></span>
          </router-link>
          <p class="brand-desc">{{ $t('app.tagline') }}</p>
          <div class="social-row">
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Telegram">
              <AppIcon name="telegram" size="18" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Instagram">
              <AppIcon name="instagram" size="18" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Facebook">
              <AppIcon name="facebook" size="18" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="YouTube">
              <AppIcon name="youtube" size="18" />
            </a>
          </div>
        </div>

        <!-- Group 1: Tezkor havolalar (Quick Links) -->
        <div class="ios-footer-group">
          <h3 class="ios-section-caption">{{ $t('footer.linksTitle') }}</h3>
          <div class="ios-inset-card">
            <!-- Home -->
            <router-link to="/" class="ios-row-item">
              <div class="badge-icon bg-blue">
                <AppIcon name="home" size="16" />
              </div>
              <span class="row-label">{{ $t('nav.home') }}</span>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>

            <!-- Catalog -->
            <router-link to="/catalog" class="ios-row-item">
              <div class="badge-icon bg-indigo">
                <AppIcon name="grid" size="16" />
              </div>
              <span class="row-label">{{ $t('nav.catalog') }}</span>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>

            <!-- Cart -->
            <router-link to="/cart" class="ios-row-item">
              <div class="badge-icon bg-green">
                <AppIcon name="cart" size="16" />
              </div>
              <span class="row-label">{{ $t('nav.cart') }}</span>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>

            <!-- Favorites -->
            <router-link to="/favorites" class="ios-row-item">
              <div class="badge-icon bg-red">
                <AppIcon name="heart-fill" size="16" />
              </div>
              <span class="row-label">{{ $t('nav.favorites') }}</span>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>

            <!-- Login -->
            <router-link to="/login" class="ios-row-item">
              <div class="badge-icon bg-orange">
                <AppIcon name="lock" size="16" />
              </div>
              <span class="row-label">{{ $t('nav.login') }}</span>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>
          </div>
        </div>

        <!-- Group 2: Toifalar (Categories - Collapsible Accordion) -->
        <div class="ios-footer-group">
          <h3 class="ios-section-caption">{{ $t('footer.categoriesTitle') }}</h3>
          <div class="ios-inset-card">
            <!-- Accordion Header Toggle Row -->
            <button
              type="button"
              class="ios-row-item accordion-toggle-btn"
              :aria-expanded="isCategoriesOpen"
              @click="isCategoriesOpen = !isCategoriesOpen"
            >
              <div class="badge-icon bg-purple">
                <AppIcon name="tag" size="16" />
              </div>
              <span class="row-label">{{ $t('categories.all') }}</span>
              <AppIcon
                name="chevron-right"
                size="14"
                class="row-chevron accordion-chevron"
                :class="{ 'is-open': isCategoriesOpen }"
              />
            </button>

            <!-- Accordion Collapsible List -->
            <div
              class="accordion-content"
              :class="{ 'is-open': isCategoriesOpen }"
            >
              <div class="accordion-inner">
                <router-link
                  v-for="cat in categoryList"
                  :key="cat.id"
                  :to="cat.id === 'all' ? '/catalog' : `/catalog?category=${cat.id}`"
                  class="ios-row-item sub-category-item"
                >
                  <div class="badge-icon" :style="{ background: cat.color + '20', color: cat.color }">
                    <AppIcon :name="cat.icon" size="15" />
                  </div>
                  <span class="row-label">{{ $t(cat.nameKey) }}</span>
                  <AppIcon name="chevron-right" size="13" class="row-chevron" />
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Group 3: Bog'lanish (Contact & Customer Care) -->
        <div class="ios-footer-group">
          <h3 class="ios-section-caption">{{ $t('footer.contactTitle') }}</h3>
          <div class="ios-inset-card">
            <!-- Phone -->
            <a :href="'tel:' + $t('footer.supportPhone')" class="ios-row-item contact-row">
              <div class="badge-icon bg-teal">
                <AppIcon name="phone" size="16" />
              </div>
              <div class="row-info-wrap">
                <span class="row-title">{{ $t('footer.supportPhone') }}</span>
                <span class="row-caption">{{ $t('footer.workHours') }}</span>
              </div>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </a>

            <!-- Email -->
            <a :href="'mailto:' + $t('footer.supportEmail')" class="ios-row-item contact-row">
              <div class="badge-icon bg-blue">
                <AppIcon name="mail" size="16" />
              </div>
              <div class="row-info-wrap">
                <span class="row-title">{{ $t('footer.supportEmail') }}</span>
                <span class="row-caption">{{ $t('footer.customerCare') }}</span>
              </div>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </a>

            <!-- Help / FAQs -->
            <router-link to="/catalog" class="ios-row-item contact-row">
              <div class="badge-icon bg-indigo">
                <AppIcon name="shield" size="16" />
              </div>
              <div class="row-info-wrap">
                <span class="row-title">{{ $t('footer.customerCare') }}</span>
                <span class="row-caption">{{ $t('footer.faq') }} &bull; {{ $t('footer.delivery') }}</span>
              </div>
              <AppIcon name="chevron-right" size="14" class="row-chevron" />
            </router-link>
          </div>
        </div>

        <!-- Bottom Centered Copyright Caption -->
        <div class="mobile-footer-bottom">
          <p class="mobile-copyright">© 2026 Bozor</p>
        </div>
      </div>
    </div>

    <!-- ========================================================
         DESKTOP FOOTER (≥ 992px) - Clean 4-Column Layout
         ======================================================== -->
    <div class="desktop-footer d-none d-lg-block">
      <div class="container-fluid footer-desktop-container">
        <div class="row g-5">
          <!-- Col 1: Brand & Socials -->
          <div class="col-lg-4">
            <div class="desktop-brand">
              <router-link to="/" class="brand-logo" aria-label="Bozor Home">
                <span class="logo-icon-bubble">
                  <AppIcon name="bag" size="18" />
                </span>
                <span class="logo-text">Bozor<span class="logo-dot">.</span></span>
              </router-link>
              <p class="desktop-brand-desc">
                {{ $t('footer.aboutText') }}
              </p>
              <div class="desktop-socials">
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Telegram">
                  <AppIcon name="telegram" size="18" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Instagram">
                  <AppIcon name="instagram" size="18" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Facebook">
                  <AppIcon name="facebook" size="18" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="YouTube">
                  <AppIcon name="youtube" size="18" />
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="col-lg-2">
            <h4 class="desktop-col-title">{{ $t('footer.linksTitle') }}</h4>
            <ul class="desktop-links-list">
              <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
              <li><router-link to="/catalog">{{ $t('nav.catalog') }}</router-link></li>
              <li><router-link to="/cart">{{ $t('nav.cart') }}</router-link></li>
              <li><router-link to="/favorites">{{ $t('nav.favorites') }}</router-link></li>
              <li><router-link to="/login">{{ $t('nav.login') }}</router-link></li>
            </ul>
          </div>

          <!-- Col 3: Categories -->
          <div class="col-lg-3">
            <h4 class="desktop-col-title">{{ $t('footer.categoriesTitle') }}</h4>
            <ul class="desktop-links-list">
              <li><router-link to="/catalog?category=smartphones">{{ $t('categories.smartphones') }}</router-link></li>
              <li><router-link to="/catalog?category=laptops">{{ $t('categories.laptops') }}</router-link></li>
              <li><router-link to="/catalog?category=audio">{{ $t('categories.audio') }}</router-link></li>
              <li><router-link to="/catalog?category=appliances">{{ $t('categories.appliances') }}</router-link></li>
              <li><router-link to="/catalog?category=gaming">{{ $t('categories.gaming') }}</router-link></li>
            </ul>
          </div>

          <!-- Col 4: Contact & Help -->
          <div class="col-lg-3">
            <h4 class="desktop-col-title">{{ $t('footer.contactTitle') }}</h4>
            <div class="desktop-contact-items">
              <div class="desktop-contact-item">
                <AppIcon name="phone" size="18" class="contact-icon text-primary" />
                <div>
                  <a :href="'tel:' + $t('footer.supportPhone')" class="contact-val">
                    {{ $t('footer.supportPhone') }}
                  </a>
                  <span class="contact-sub">{{ $t('footer.workHours') }}</span>
                </div>
              </div>

              <div class="desktop-contact-item">
                <AppIcon name="mail" size="18" class="contact-icon text-primary" />
                <div>
                  <a :href="'mailto:' + $t('footer.supportEmail')" class="contact-val">
                    {{ $t('footer.supportEmail') }}
                  </a>
                  <span class="contact-sub">{{ $t('footer.customerCare') }}</span>
                </div>
              </div>

              <div class="desktop-contact-item">
                <AppIcon name="shield" size="18" class="contact-icon text-primary" />
                <div>
                  <span class="contact-val">{{ $t('footer.customerCare') }}</span>
                  <span class="contact-sub">{{ $t('footer.faq') }} &bull; {{ $t('footer.delivery') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Footer Bottom Bar -->
        <div class="desktop-footer-bottom">
          <p class="desktop-copyright">{{ $t('footer.copyright') }}</p>
          <div class="desktop-legal-links">
            <a href="#" @click.prevent>{{ $t('footer.privacy') }}</a>
            <span class="dot-separator">&bull;</span>
            <a href="#" @click.prevent>{{ $t('footer.terms') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { CATEGORIES } from '@/api/categories';

export default {
  name: 'AppFooter',
  data() {
    return {
      isCategoriesOpen: false,
      categories: CATEGORIES
    };
  },
  computed: {
    categoryList() {
      return this.categories.filter((c) => c.id !== 'all');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.app-footer {
  margin-top: auto;
  background-color: var(--color-bg-body);
}

/* ========================================================
   COMMON BRAND STYLES
   ======================================================== */
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-label-primary);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;

  .logo-icon-bubble {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-xs);
    background: var(--color-primary);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .logo-dot {
    color: var(--color-primary);
  }
}

.social-circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-fill);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform var(--transition-fast), background var(--transition-fast);
  @include tap-spring;

  &:hover {
    background: var(--color-bg-fill-hover);
  }
}

/* ========================================================
   MOBILE FOOTER (iOS Inset Grouped Settings Style)
   ======================================================== */
.mobile-footer {
  padding: 2rem 0 1rem;
}

.footer-mobile-container {
  max-width: 540px;
  margin: 0 auto;
  padding: 0 1rem;
}

.mobile-brand-block {
  text-align: center;
  margin-bottom: 2rem;

  .brand-desc {
    font-size: 0.875rem;
    color: var(--color-label-secondary);
    margin: 0.625rem auto 1rem;
    max-width: 360px;
    line-height: 1.4;
  }

  .social-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.875rem;
  }
}

.ios-footer-group {
  margin-bottom: 1.5rem;

  .ios-section-caption {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: var(--color-label-tertiary);
    margin-bottom: 0.5rem;
    padding-left: 0.75rem;
  }

  .ios-inset-card {
    border-radius: 20px;
    background: var(--color-bg-surface);
    border: 0.5px solid var(--color-separator);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .ios-row-item {
    display: flex;
    align-items: center;
    padding: 0.8125rem 1rem;
    text-decoration: none;
    color: var(--color-label-primary);
    background: transparent;
    border: none;
    width: 100%;
    cursor: pointer;
    position: relative;
    transition: background var(--transition-fast);

    &:active {
      background: var(--color-bg-fill);
    }

    /* Hairline separator inset from left (after icon badge) */
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 54px;
      right: 0;
      bottom: 0;
      height: 0.5px;
      background: var(--color-separator);
    }

    .badge-icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 0.875rem;
      flex-shrink: 0;

      &.bg-blue { background: #007aff; }
      &.bg-indigo { background: #5856d6; }
      &.bg-purple { background: #af52de; }
      &.bg-green { background: #34c759; }
      &.bg-red { background: #ff2d55; }
      &.bg-orange { background: #ff9500; }
      &.bg-teal { background: #30b0c7; }
    }

    .row-label {
      font-size: 0.9375rem;
      font-weight: 500;
      flex: 1;
      text-align: left;
    }

    .row-info-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: left;

      .row-title {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--color-label-primary);
      }

      .row-caption {
        font-size: 0.75rem;
        color: var(--color-label-secondary);
        margin-top: 1px;
      }
    }

    .row-chevron {
      color: var(--color-label-tertiary);
      flex-shrink: 0;
      transition: transform var(--transition-base);

      &.accordion-chevron.is-open {
        transform: rotate(90deg);
      }
    }
  }

  /* Accordion styles */
  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 320ms var(--spring-ease);

    &.is-open {
      max-height: 480px;
    }

    .accordion-inner {
      border-top: 0.5px solid var(--color-separator);
      background: var(--color-bg-fill);

      .sub-category-item {
        padding-left: 1.125rem;

        &:not(:last-child)::after {
          left: 56px;
        }
      }
    }
  }
}

.mobile-footer-bottom {
  text-align: center;
  padding: 1.25rem 0 0.5rem;

  .mobile-copyright {
    font-size: 12px;
    color: var(--color-label-secondary);
    margin: 0;
  }
}

/* ========================================================
   DESKTOP FOOTER (≥ 992px) - Clean 4-Column Layout
   ======================================================== */
.desktop-footer {
  border-top: 0.5px solid var(--color-separator);
  padding: 3.5rem 0 2rem;
  background-color: var(--color-bg-body);
}

.footer-desktop-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.desktop-brand {
  .desktop-brand-desc {
    font-size: 0.875rem;
    color: var(--color-label-secondary);
    line-height: 1.6;
    margin: 1rem 0 1.5rem;
    max-width: 320px;
  }

  .desktop-socials {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
}

.desktop-col-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-label-primary);
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

.desktop-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li a {
    font-size: 0.875rem;
    color: var(--color-label-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }
}

.desktop-contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;

  .desktop-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    .contact-icon {
      margin-top: 2px;
      color: var(--color-primary);
      flex-shrink: 0;
    }

    .contact-val {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-label-primary);
      text-decoration: none;
      display: block;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--color-primary);
      }
    }

    .contact-sub {
      font-size: 0.75rem;
      color: var(--color-label-secondary);
      display: block;
      margin-top: 2px;
    }
  }
}

.desktop-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 0.5px solid var(--color-separator);

  .desktop-copyright {
    font-size: 0.8125rem;
    color: var(--color-label-secondary);
    margin: 0;
  }

  .desktop-legal-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    a {
      font-size: 0.8125rem;
      color: var(--color-label-secondary);
      text-decoration: none;

      &:hover {
        color: var(--color-label-primary);
      }
    }

    .dot-separator {
      color: var(--color-label-tertiary);
    }
  }
}
</style>
