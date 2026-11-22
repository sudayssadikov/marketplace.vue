<template>
  <nav v-if="totalPages > 1" class="pagination-wrapper" :aria-label="$t('pagination.page')">
    <div class="pagination-pill">
      <!-- Previous Button -->
      <button
        type="button"
        class="page-btn page-nav-btn prev-btn"
        :disabled="currentPage <= 1"
        :aria-label="$t('pagination.prev')"
        @click="goToPage(currentPage - 1)"
      >
        <AppIcon name="chevron-left" size="14" />
        <span class="nav-text d-none d-sm-inline">{{ $t('pagination.prev') }}</span>
      </button>

      <!-- Page Numbers with Ellipsis -->
      <div class="page-numbers">
        <template v-for="(item, index) in visiblePages" :key="index">
          <span v-if="item === '...'" class="page-ellipsis">
            &hellip;
          </span>
          <button
            v-else
            type="button"
            class="page-btn page-num-btn"
            :class="{ active: item === currentPage }"
            :aria-current="item === currentPage ? 'page' : null"
            :aria-label="$t('pagination.goToPage', { page: item })"
            @click="goToPage(item)"
          >
            {{ item }}
          </button>
        </template>
      </div>

      <!-- Next Button -->
      <button
        type="button"
        class="page-btn page-nav-btn next-btn"
        :disabled="currentPage >= totalPages"
        :aria-label="$t('pagination.next')"
        @click="goToPage(currentPage + 1)"
      >
        <span class="nav-text d-none d-sm-inline">{{ $t('pagination.next') }}</span>
        <AppIcon name="chevron-right" size="14" />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1
    }
  },
  emits: ['page-change'],
  computed: {
    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      if (current <= 4) {
        return [1, 2, 3, 4, 5, '...', total];
      }

      if (current >= total - 3) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
      }

      return [1, '...', current - 1, current, current + 1, '...', total];
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.pagination-pill {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  @include liquid-glass;
  padding: 0.4rem;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  border-radius: var(--radius-pill);
  background-color: transparent;
  color: var(--color-label-primary);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-medium);
  @include tap-spring;

  &:hover:not(:disabled) {
    background-color: var(--color-bg-fill);
  }

  &.active {
    background-color: var(--color-primary);
    color: var(--color-label-white);
    font-weight: var(--font-weight-bold);
    box-shadow: 0 2px 10px var(--color-primary-glow);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

.page-nav-btn {
  gap: 0.35rem;
  padding: 0 0.85rem;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-caption);

  &:hover:not(:disabled) {
    background-color: var(--color-primary-tint);
    color: var(--color-primary);
  }
}

.page-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 36px;
  color: var(--color-label-tertiary);
  user-select: none;
  font-weight: var(--font-weight-bold);
}
</style>
