<template>
  <nav v-if="items && items.length > 0" class="ios-breadcrumbs d-none d-md-flex" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">
          <AppIcon name="home" size="14" class="home-icon" />
          <span>{{ $t('nav.home') }}</span>
        </router-link>
      </li>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === items.length - 1 }"
      >
        <AppIcon name="chevron-right" size="12" class="breadcrumb-separator" />
        <router-link
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="breadcrumb-link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.ios-breadcrumbs {
  margin-bottom: 1.25rem;
  padding: 0.25rem 0;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: var(--font-size-footnote);
  color: var(--color-label-secondary);
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  .home-icon {
    margin-right: 0.2rem;
    color: var(--color-label-tertiary);
  }

  .breadcrumb-separator {
    color: var(--color-label-quaternary);
  }

  .breadcrumb-link {
    color: var(--color-label-secondary);
    display: inline-flex;
    align-items: center;
    @include tap-spring;

    &:hover {
      color: var(--color-primary);
    }
  }

  .breadcrumb-current {
    color: var(--color-label-primary);
    font-weight: var(--font-weight-semibold);
    max-width: 280px;
    @include text-truncate;
  }
}
</style>

