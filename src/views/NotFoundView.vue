<template>
  <div class="not-found-view">
    <div class="container-fluid content-container">
      <div class="not-found-card">
        <div class="not-found-code">404</div>
        <h1 class="not-found-title">{{ $t('notFound.title') }}</h1>
        <p class="not-found-desc">
          {{ $t('notFound.description') }}
        </p>
        <router-link to="/" class="btn btn-primary">
          <AppIcon name="home" size="18" />
          <span>{{ $t('notFound.backHome') }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.not-found-view {
  padding: 4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height) - 160px);
}

.content-container {
  max-width: 520px;
}

.not-found-card {
  @include card-surface;
  text-align: center;
  padding: 3.5rem 2rem;
  border-radius: var(--radius-card);
}

.not-found-code {
  font-size: 5rem;
  font-weight: var(--font-weight-heavy);
  line-height: 1;
  color: var(--color-primary);
  margin-bottom: 0.85rem;
  letter-spacing: -0.05em;
}

.not-found-title {
  font-size: var(--font-size-title-2);
  font-weight: var(--font-weight-bold);
  color: var(--color-label-primary);
  margin-bottom: 0.5rem;
  letter-spacing: var(--letter-spacing-title);
}

.not-found-desc {
  font-size: var(--font-size-body);
  color: var(--color-label-secondary);
  line-height: 1.5;
  margin-bottom: 1.75rem;
}
</style>
