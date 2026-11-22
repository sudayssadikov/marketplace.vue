<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-image skeleton-box"></div>
    <div class="skeleton-content">
      <div class="skeleton-tags">
        <div class="skeleton-box tag-skeleton"></div>
      </div>
      <div class="skeleton-box title-line-1"></div>
      <div class="skeleton-box title-line-2"></div>
      <div class="skeleton-rating">
        <div class="skeleton-box rating-stars"></div>
        <div class="skeleton-box rating-count"></div>
      </div>
      <div class="skeleton-footer">
        <div class="skeleton-price-group">
          <div class="skeleton-box old-price-line"></div>
          <div class="skeleton-box current-price-line"></div>
        </div>
        <div class="skeleton-box action-btn-skeleton"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonCard'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.skeleton-card {
  @include card-surface;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--radius-card);
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0;
}

.skeleton-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.6rem;
}

.skeleton-tags {
  display: flex;
  gap: 0.5rem;

  .tag-skeleton {
    width: 55px;
    height: 16px;
    border-radius: var(--radius-pill);
  }
}

.title-line-1 {
  width: 90%;
  height: 13px;
  border-radius: 4px;
}

.title-line-2 {
  width: 65%;
  height: 13px;
  border-radius: 4px;
}

.skeleton-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.2rem;

  .rating-stars {
    width: 60px;
    height: 11px;
    border-radius: 4px;
  }

  .rating-count {
    width: 40px;
    height: 11px;
    border-radius: 4px;
  }
}

.skeleton-footer {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 0.75rem;

  .old-price-line {
    width: 50px;
    height: 11px;
    margin-bottom: 0.35rem;
    border-radius: 4px;
  }

  .current-price-line {
    width: 90px;
    height: 18px;
    border-radius: 4px;
  }

  .action-btn-skeleton {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-pill);
  }
}
</style>
