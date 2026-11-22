<template>
  <div class="favorites-view">
    <div class="container-fluid content-container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Header -->
      <div class="favorites-header">
        <div class="header-left">
          <h1 class="page-title">{{ $t('favorites.title') }}</h1>
          <span v-if="favoriteProducts.length > 0" class="count-badge">
            {{ $t('favorites.itemsCount', { count: favoriteProducts.length }) }}
          </span>
        </div>

        <button
          v-if="favoriteProducts.length > 0"
          type="button"
          class="btn btn-primary btn-add-all"
          @click="addAllToCart"
        >
          <AppIcon name="cart" size="16" />
          <span>{{ $t('favorites.addAllToCart') }}</span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="favoriteProducts.length === 0" class="empty-favorites-card">
        <div class="empty-icon-wrap">
          <AppIcon name="heart" size="64" />
        </div>
        <h2 class="empty-title">{{ $t('favorites.emptyFavorites') }}</h2>
        <p class="empty-desc">{{ $t('favorites.emptyFavoritesDesc') }}</p>
        <router-link to="/catalog" class="btn btn-primary btn-pill">
          <AppIcon name="arrow-left" size="16" />
          <span>{{ $t('favorites.browseProducts') }}</span>
        </router-link>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="row g-3 g-md-4">
        <div
          v-for="product in favoriteProducts"
          :key="product.id"
          class="col-6 col-md-4 col-xl-3"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { MOCK_PRODUCTS } from '@/api/products';

export default {
  name: 'FavoritesView',
  components: {
    Breadcrumbs,
    ProductCard
  },
  computed: {
    favoriteIds() {
      return this.$store.state.ui.favorites;
    },
    favoriteProducts() {
      return MOCK_PRODUCTS.filter((prod) => this.favoriteIds.includes(prod.id));
    },
    breadcrumbItems() {
      return [
        { label: this.$t('breadcrumbs.favorites') }
      ];
    }
  },
  methods: {
    addAllToCart() {
      this.favoriteProducts.forEach((product) => {
        this.$store.dispatch('ui/addToCart', {
          product,
          quantity: 1
        });
      });
      this.$store.dispatch('ui/showToast', {
        message: 'favorites.allAddedToCart',
        icon: 'check'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.favorites-view {
  padding-top: 1rem;
  padding-bottom: 5rem;
}

.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  @include respond-to('md') {
    padding: 0 1.5rem;
  }
}

.favorites-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .page-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--color-text-primary);
      margin: 0;
    }

    .count-badge {
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-full);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);
      color: var(--color-text-secondary);
    }
  }

  .btn-add-all {
    border-radius: var(--radius-full);
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(10, 132, 255, 0.25);
  }
}

.empty-favorites-card {
  padding: 4.5rem 1.5rem;
  background: var(--color-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  text-align: center;
  max-width: 520px;
  margin: 2rem auto;

  .empty-icon-wrap {
    color: var(--color-text-tertiary);
    margin-bottom: 1.25rem;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  .empty-desc {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    line-height: 1.5;
    margin-bottom: 1.75rem;
  }
}
</style>

