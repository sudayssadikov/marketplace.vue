<template>
  <div class="ios-language-sheet-wrapper">
    <!-- Trigger Button (if showTrigger is true) -->
    <div v-if="showTrigger" ref="triggerRef" class="trigger-container">
      <!-- Header / Compact Mode -->
      <button
        v-if="compact"
        type="button"
        class="lang-compact-btn"
        :aria-label="$t('header.languageSelectAria')"
        aria-haspopup="dialog"
        :aria-expanded="isOpen"
        @click="open"
      >
        <span class="lang-code-tag">{{ currentLocaleObj.short }}</span>
        <AppIcon
          v-if="showChevron"
          name="chevron-down"
          size="12"
          class="chevron-icon"
          :class="{ 'is-open': isOpen }"
        />
      </button>

      <!-- Settings Row Mode -->
      <button
        v-else-if="isRow"
        type="button"
        class="lang-row-btn"
        :aria-label="$t('header.languageSelectAria')"
        aria-haspopup="dialog"
        :aria-expanded="isOpen"
        @click="open"
      >
        <span class="row-lang-code">{{ currentLocaleObj.short }}</span>
        <AppIcon name="chevron-right" size="14" class="chevron-icon" />
      </button>

      <!-- Default Pill Button -->
      <button
        v-else
        type="button"
        class="lang-default-btn"
        :aria-label="$t('header.languageSelectAria')"
        aria-haspopup="dialog"
        :aria-expanded="isOpen"
        @click="open"
      >
        <AppIcon name="globe" size="16" />
        <span class="lang-name">{{ currentLocaleObj.name }}</span>
        <AppIcon
          v-if="showChevron"
          name="chevron-down"
          size="12"
          class="chevron-icon"
          :class="{ 'is-open': isOpen }"
        />
      </button>
    </div>

    <!-- Teleport Sheet & Popover to body so parent overflow NEVER clips it -->
    <teleport to="body">
      <!-- Backdrop (Mobile & Desktop) -->
      <transition name="sheet-backdrop-fade">
        <div
          v-if="isOpen"
          class="ios-lang-backdrop"
          aria-hidden="true"
          @click="close"
        ></div>
      </transition>

      <!-- Mobile Bottom Sheet (<768px) -->
      <transition name="sheet-slide-up">
        <div
          v-if="isOpen && isMobile"
          class="ios-bottom-sheet"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('header.languageSelectAria')"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- Grab Handle -->
          <div class="sheet-grab-handle"></div>

          <!-- Sheet Header -->
          <div class="sheet-header">
            <h3 class="sheet-title">{{ $t('profile.language') }}</h3>
          </div>

          <!-- Inset Grouped List -->
          <div class="sheet-list-card" role="listbox">
            <button
              v-for="loc in supportedLocales"
              :key="loc.code"
              type="button"
              class="sheet-row-btn"
              :class="{ active: loc.code === currentLocale }"
              role="option"
              :aria-selected="loc.code === currentLocale"
              @click="selectLocale(loc.code)"
            >
              <div class="row-left">
                <span class="badge-code">{{ loc.short }}</span>
                <span class="lang-label">{{ loc.name }}</span>
              </div>
              <AppIcon
                v-if="loc.code === currentLocale"
                name="check"
                size="18"
                class="active-checkmark"
              />
            </button>
          </div>
        </div>
      </transition>

      <!-- Desktop Popover (>=768px) -->
      <transition name="popover-spring">
        <div
          v-if="isOpen && !isMobile"
          ref="desktopPopoverRef"
          class="ios-desktop-popover"
          :style="popoverStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('header.languageSelectAria')"
        >
          <div class="popover-list-card" role="listbox">
            <button
              v-for="loc in supportedLocales"
              :key="loc.code"
              type="button"
              class="popover-row-btn"
              :class="{ active: loc.code === currentLocale }"
              role="option"
              :aria-selected="loc.code === currentLocale"
              @click="selectLocale(loc.code)"
            >
              <span class="badge-code">{{ loc.short }}</span>
              <span class="lang-label">{{ loc.name }}</span>
              <AppIcon
                v-if="loc.code === currentLocale"
                name="check"
                size="16"
                class="active-checkmark"
              />
            </button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { SUPPORTED_LOCALES, setAppLocale } from '@/locales/i18n';

export default {
  name: 'LanguageSheet',
  props: {
    showTrigger: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    isRow: {
      type: Boolean,
      default: false
    },
    showChevron: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],
  data() {
    return {
      isOpen: false,
      isMobile: false,
      supportedLocales: SUPPORTED_LOCALES,
      touchStartY: 0,
      touchCurrentY: 0,
      popoverStyle: {
        top: '0px',
        left: '0px',
        right: 'auto',
        bottom: 'auto'
      }
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    currentLocaleObj() {
      return (
        this.supportedLocales.find((l) => l.code === this.currentLocale) || this.supportedLocales[0]
      );
    }
  },
  mounted() {
    this.checkIsMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('keydown', this.handleKeyDown);
    }
  },
  beforeUnmount() {
    this.unlockBodyScroll();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  },
  methods: {
    checkIsMobile() {
      if (typeof window !== 'undefined') {
        this.isMobile = window.innerWidth < 768;
      }
    },
    open(event) {
      this.checkIsMobile();
      const targetEl =
        (event && event.currentTarget) || this.$refs.triggerRef || null;

      if (!this.isMobile && targetEl) {
        this.calculatePopoverPosition(targetEl);
      }

      this.isOpen = true;

      if (this.isMobile) {
        this.lockBodyScroll();
      }
    },
    close() {
      this.isOpen = false;
      this.unlockBodyScroll();
    },
    toggle(event) {
      if (this.isOpen) {
        this.close();
      } else {
        this.open(event);
      }
    },
    selectLocale(code) {
      setAppLocale(code);
      this.$i18n.locale = code;
      this.$emit('change', code);

      // Update document title if route has titleKey
      if (this.$route && this.$route.meta && this.$route.meta.titleKey) {
        try {
          const pageTitle = this.$t(this.$route.meta.titleKey);
          document.title = `${pageTitle} | Bozor`;
        } catch {
          // Ignore
        }
      }

      setTimeout(() => {
        this.close();
      }, 140);
    },
    calculatePopoverPosition(el) {
      if (!el || typeof window === 'undefined') return;
      const rect = el.getBoundingClientRect();
      const popoverWidth = 200;
      const popoverHeight = 150;
      const margin = 8;

      let top = rect.bottom + margin;
      let left = rect.right - popoverWidth;

      // Check if popover overflows bottom of viewport -> Flip upward!
      if (top + popoverHeight > window.innerHeight - 16) {
        top = Math.max(16, rect.top - popoverHeight - margin);
      }

      // Check left/right viewport boundaries
      if (left < 16) {
        left = 16;
      } else if (left + popoverWidth > window.innerWidth - 16) {
        left = window.innerWidth - popoverWidth - 16;
      }

      this.popoverStyle = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${popoverWidth}px`
      };
    },
    lockBodyScroll() {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    },
    unlockBodyScroll() {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    },
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    },
    handleResize() {
      this.checkIsMobile();
      if (this.isOpen && !this.isMobile && this.$refs.triggerRef) {
        this.calculatePopoverPosition(this.$refs.triggerRef);
      }
    },
    handleTouchStart(e) {
      if (e.touches && e.touches.length > 0) {
        this.touchStartY = e.touches[0].clientY;
      }
    },
    handleTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        this.touchCurrentY = e.touches[0].clientY;
      }
    },
    handleTouchEnd() {
      const diff = this.touchCurrentY - this.touchStartY;
      if (diff > 50) {
        // Swiped down -> close
        this.close();
      }
      this.touchStartY = 0;
      this.touchCurrentY = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.ios-language-sheet-wrapper {
  display: inline-block;
}

.trigger-container {
  display: inline-flex;
  align-items: center;
}

/* Compact Pill Button (Header) */
.lang-compact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  height: 32px;
  border-radius: var(--radius-pill);
  border: 0.5px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  color: var(--color-label-primary);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  @include tap-spring;

  &:hover {
    background: var(--color-bg-fill-hover);
  }

  .lang-code-tag {
    letter-spacing: 0.04em;
  }

  .chevron-icon {
    color: var(--color-label-tertiary);
    transition: transform var(--transition-base);

    &.is-open {
      transform: rotate(180deg);
    }
  }
}

/* Row Button (Settings list trailing) */
.lang-row-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: transparent;
  border: none;
  color: var(--color-label-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;

  .row-lang-code {
    font-weight: 600;
    font-size: 0.8125rem;
    padding: 2px 7px;
    border-radius: 6px;
    background: var(--color-bg-fill);
    color: var(--color-label-secondary);
  }

  .chevron-icon {
    color: var(--color-label-tertiary);
  }
}

/* Default Pill Button */
.lang-default-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-pill);
  background: var(--color-bg-surface);
  border: 0.5px solid var(--glass-border);
  color: var(--color-label-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  @include tap-spring;

  .chevron-icon {
    color: var(--color-label-tertiary);
  }
}

/* -------------------------------------------------------------
   GLOBAL TELEPORTED OVERLAYS (Above tab bar: z-index >= 1140)
---------------------------------------------------------------- */
.ios-lang-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1140;
}

/* Mobile Bottom Sheet */
.ios-bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-surface);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top: 0.5px solid var(--glass-border);
  box-shadow: var(--shadow-float-pill);
  padding: 10px 16px max(24px, env(safe-area-inset-bottom, 24px));
  z-index: 1150;
  touch-action: pan-y;

  .sheet-grab-handle {
    width: 36px;
    height: 5px;
    border-radius: 3px;
    background: var(--color-separator-opaque);
    margin: 4px auto 14px;
  }

  .sheet-header {
    text-align: center;
    margin-bottom: 1rem;

    .sheet-title {
      font-size: 1.0625rem;
      font-weight: 700;
      color: var(--color-label-primary);
      margin: 0;
    }
  }

  .sheet-list-card {
    border-radius: 16px;
    background: var(--color-bg-fill);
    overflow: hidden;
    border: 0.5px solid var(--glass-border);

    .sheet-row-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.875rem 1rem;
      border: none;
      background: transparent;
      border-bottom: 0.5px solid var(--color-separator);
      cursor: pointer;
      color: var(--color-label-primary);
      transition: background var(--transition-fast);

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background: var(--color-bg-fill-hover);
      }

      &.active {
        background: var(--color-bg-fill-hover);
      }

      .row-left {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .badge-code {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 7px;
          border-radius: 6px;
          background: rgba(10, 132, 255, 0.12);
          color: var(--color-primary);
          letter-spacing: 0.04em;
        }

        .lang-label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-label-primary);
        }
      }

      .active-checkmark {
        color: var(--color-primary);
      }
    }
  }
}

/* Desktop Popover */
.ios-desktop-popover {
  position: fixed;
  z-index: 1150;
  border-radius: 18px;
  @include liquid-glass;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  padding: 6px;

  .popover-list-card {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .popover-row-btn {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.625rem 0.875rem;
      border: none;
      border-radius: 12px;
      background: transparent;
      color: var(--color-label-primary);
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-size: 0.875rem;
      transition: background var(--transition-fast);

      &:hover {
        background: var(--color-bg-fill-hover);
      }

      &:active {
        background: var(--color-bg-fill-active);
      }

      &.active {
        background: var(--color-bg-fill);
        font-weight: 600;
      }

      .badge-code {
        font-size: 0.6875rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 5px;
        background: rgba(10, 132, 255, 0.12);
        color: var(--color-primary);
      }

      .lang-label {
        flex: 1;
      }

      .active-checkmark {
        color: var(--color-primary);
      }
    }
  }
}

/* Animations */
.sheet-backdrop-fade-enter-active,
.sheet-backdrop-leave-active {
  transition: opacity 240ms ease;
}
.sheet-backdrop-fade-enter-from,
.sheet-backdrop-leave-to {
  opacity: 0;
}

.sheet-slide-up-enter-active,
.sheet-slide-up-leave-active {
  transition: transform 320ms var(--spring-ease);
}
.sheet-slide-up-enter-from,
.sheet-slide-up-leave-to {
  transform: translateY(100%);
}

.popover-spring-enter-active,
.popover-spring-leave-active {
  transition: opacity 180ms ease, transform 220ms var(--spring-bounce);
}
.popover-spring-enter-from,
.popover-spring-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(-6px);
}
</style>
