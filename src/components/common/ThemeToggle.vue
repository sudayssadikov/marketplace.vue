<template>
  <button
    type="button"
    class="theme-toggle-btn"
    :aria-label="$t('header.themeToggleAria')"
    :title="$t('header.themeToggleAria')"
    @click="toggleTheme"
  >
    <transition name="icon-spin" mode="out-in">
      <AppIcon
        v-if="isDark"
        key="moon"
        name="moon"
        size="18"
        class="icon-moon"
      />
      <AppIcon
        v-else
        key="sun"
        name="sun"
        size="18"
        class="icon-sun"
      />
    </transition>
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ThemeToggle',
  computed: {
    ...mapGetters('ui', ['isDark'])
  },
  methods: {
    ...mapActions('ui', ['toggleTheme'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.theme-toggle-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  background-color: var(--color-bg-fill);
  border: 0.5px solid var(--color-separator);
  color: var(--color-label-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill-hover);
  }

  .icon-sun {
    color: #FF9500;
  }

  .icon-moon {
    color: #0A84FF;
  }
}

.icon-spin-enter-active,
.icon-spin-leave-active {
  transition: transform 220ms var(--spring-ease), opacity 180ms ease;
}

.icon-spin-enter-from {
  opacity: 0;
  transform: rotate(-70deg) scale(0.7);
}

.icon-spin-leave-to {
  opacity: 0;
  transform: rotate(70deg) scale(0.7);
}
</style>
