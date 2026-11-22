<template>
  <div ref="dropdownRef" class="language-switcher">
    <button
      type="button"
      class="lang-pill-btn"
      :aria-label="$t('header.languageSelectAria')"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <span class="lang-tag">{{ currentLocaleObj.short }}</span>
      <AppIcon
        name="chevron-down"
        size="12"
        class="chevron-icon"
        :class="{ 'is-open': isOpen }"
      />
    </button>

    <transition name="popover-spring">
      <ul
        v-if="isOpen"
        class="lang-menu"
        role="listbox"
        :aria-label="$t('header.languageSelectAria')"
      >
        <li
          v-for="loc in supportedLocales"
          :key="loc.code"
          class="lang-item"
          :class="{ active: loc.code === currentLocale }"
          role="option"
          :aria-selected="loc.code === currentLocale"
          @click="selectLocale(loc.code)"
        >
          <span class="item-tag">{{ loc.short }}</span>
          <span class="item-name">{{ loc.name }}</span>
          <AppIcon
            v-if="loc.code === currentLocale"
            name="check"
            size="15"
            class="check-icon"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { SUPPORTED_LOCALES, setAppLocale } from '@/locales/i18n';

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      isOpen: false,
      supportedLocales: SUPPORTED_LOCALES
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
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectLocale(code) {
      setAppLocale(code);
      this.$i18n.locale = code;
      this.isOpen = false;

      // Update meta title
      if (this.$route.meta && this.$route.meta.titleKey) {
        document.title = `${this.$t(this.$route.meta.titleKey)} | Bozor`;
      }
    },
    handleOutsideClick(event) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.language-switcher {
  position: relative;
  display: inline-block;
}

.lang-pill-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background-color: var(--color-bg-fill);
  border: 0.5px solid var(--color-separator);
  border-radius: var(--radius-pill);
  color: var(--color-label-primary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-caption);
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill-hover);
  }

  .lang-tag {
    letter-spacing: 0.05em;
    font-size: 0.75rem;
  }

  .chevron-icon {
    color: var(--color-label-secondary);
    transition: transform var(--transition-fast);

    &.is-open {
      transform: rotate(180deg);
    }
  }
}

.lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  @include liquid-glass;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.4rem;
  z-index: var(--z-toast);
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-subhead);
  color: var(--color-label-primary);
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill);
  }

  &.active {
    background-color: var(--color-primary-tint);
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }

  .item-tag {
    font-size: 0.7rem;
    font-weight: var(--font-weight-bold);
    background: var(--color-bg-fill);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    letter-spacing: 0.03em;
  }

  .item-name {
    flex: 1;
  }

  .check-icon {
    color: var(--color-primary);
  }
}

.popover-spring-enter-active,
.popover-spring-leave-active {
  transition: opacity 180ms var(--spring-ease), transform 220ms var(--spring-bounce);
  transform-origin: top right;
}

.popover-spring-enter-from,
.popover-spring-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(-6px);
}
</style>
