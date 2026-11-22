<template>
  <div class="catalog-view">
    <div class="container-fluid content-container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Catalog Header Bar -->
      <div class="catalog-page-header">
        <div class="header-titles">
          <h1 class="page-large-title">{{ pageTitle }}</h1>
          <p class="results-count-text">
            {{ $t('sections.allProducts.found', { count: paginationData.totalItems }) }}
          </p>
        </div>

        <!-- Controls: Filter trigger button on Mobile, Sort selector on Desktop/Mobile -->
        <div class="header-action-controls">
          <!-- Mobile Filter Button (opens iOS Bottom Sheet) -->
          <button
            type="button"
            class="btn btn-secondary filter-mobile-trigger d-lg-none"
            @click="openMobileFilters"
          >
            <AppIcon name="filter" size="16" />
            <span>{{ $t('filters.title') }}</span>
            <span v-if="activeFiltersCount > 0" class="filter-count-badge">
              {{ activeFiltersCount }}
            </span>
          </button>

          <!-- Sort Selector -->
          <div class="sort-selector-wrap">
            <label for="catalog-sort-select" class="sort-label d-none d-sm-inline">
              {{ $t('sort.label') }}
            </label>
            <div class="select-pill-wrapper">
              <select
                id="catalog-sort-select"
                :value="sortBy"
                class="sort-select"
                @change="handleSortChange($event.target.value)"
              >
                <option value="featured">{{ $t('sort.featured') }}</option>
                <option value="price-asc">{{ $t('sort.priceAsc') }}</option>
                <option value="price-desc">{{ $t('sort.priceDesc') }}</option>
                <option value="rating">{{ $t('sort.rating') }}</option>
                <option value="newest">{{ $t('sort.newest') }}</option>
                <option value="discount">{{ $t('sort.discount') }}</option>
              </select>
              <AppIcon name="chevron-down" size="13" class="select-chevron" />
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filters Quick Bar -->
      <div v-if="hasAnyActiveFilters" class="active-filters-chips-bar">
        <span v-if="searchQuery" class="filter-chip">
          <AppIcon name="search" size="13" />
          <span>"{{ searchQuery }}"</span>
          <button type="button" class="remove-chip-btn" aria-label="Clear query" @click="clearSearchQuery">
            <AppIcon name="xmark" size="11" />
          </button>
        </span>
        <span v-if="selectedCategory !== 'all'" class="filter-chip">
          <AppIcon name="grid" size="13" />
          <span>{{ currentCategoryName }}</span>
          <button type="button" class="remove-chip-btn" aria-label="Clear category" @click="selectCategory('all')">
            <AppIcon name="xmark" size="11" />
          </button>
        </span>
        <span v-if="localMinPrice || localMaxPrice" class="filter-chip">
          <AppIcon name="tag" size="13" />
          <span>
            {{ (localMinPrice ? formatPrice(localMinPrice) : '0') }} -
            {{ (localMaxPrice ? formatPrice(localMaxPrice) : '∞') }} {{ $t('product.currency') }}
          </span>
          <button type="button" class="remove-chip-btn" aria-label="Clear price" @click="clearPriceFilter">
            <AppIcon name="xmark" size="11" />
          </button>
        </span>
        <span v-if="localMinRating" class="filter-chip">
          <AppIcon name="star-fill" size="12" class="text-gold" />
          <span>{{ localMinRating }}+</span>
          <button type="button" class="remove-chip-btn" aria-label="Clear rating" @click="setRating(null)">
            <AppIcon name="xmark" size="11" />
          </button>
        </span>
        <span v-if="localInStockOnly" class="filter-chip">
          <AppIcon name="check" size="12" />
          <span>{{ $t('filters.inStockOnly') }}</span>
          <button type="button" class="remove-chip-btn" aria-label="Clear in stock" @click="localInStockOnly = false; applyFilters()">
            <AppIcon name="xmark" size="11" />
          </button>
        </span>

        <button type="button" class="clear-all-text-btn" @click="resetAllFilters">
          {{ $t('filters.resetAll') }}
        </button>
      </div>

      <!-- Main Layout: Sidebar on Desktop + Products Grid -->
      <div class="row g-4 catalog-main-row">
        <!-- Desktop Sidebar Filters -->
        <aside class="col-12 col-lg-3 d-none d-lg-block">
          <div class="sidebar-filters-card">
            <div class="sidebar-card-header">
              <h3 class="filter-card-title">{{ $t('filters.title') }}</h3>
              <button
                v-if="hasAnyActiveFilters"
                type="button"
                class="reset-btn-link"
                @click="resetAllFilters"
              >
                {{ $t('filters.resetAll') }}
              </button>
            </div>

            <!-- 1. Categories List -->
            <div class="filter-group">
              <h4 class="filter-group-heading">{{ $t('categories.title') }}</h4>
              <ul class="filter-category-list">
                <li v-for="cat in categories" :key="cat.id">
                  <button
                    type="button"
                    class="category-filter-item"
                    :class="{ active: selectedCategory === cat.slug }"
                    @click="selectCategory(cat.slug)"
                  >
                    <span class="cat-item-left">
                      <AppIcon :name="cat.icon" size="15" class="cat-icon" />
                      <span>{{ $t(cat.nameKey) }}</span>
                    </span>
                    <span class="cat-item-count">{{ cat.count }}</span>
                  </button>
                </li>
              </ul>
            </div>

            <!-- 2. Price Range -->
            <div class="filter-group">
              <h4 class="filter-group-heading">{{ $t('filters.priceRange') }}</h4>
              <div class="price-inputs-row">
                <div class="input-col">
                  <span class="input-sublabel">{{ $t('filters.minPrice') }}</span>
                  <input
                    v-model.number="localMinPrice"
                    type="number"
                    min="0"
                    step="500000"
                    placeholder="0"
                    class="price-input"
                    @keyup.enter="applyFilters"
                  />
                </div>
                <span class="price-dash">-</span>
                <div class="input-col">
                  <span class="input-sublabel">{{ $t('filters.maxPrice') }}</span>
                  <input
                    v-model.number="localMaxPrice"
                    type="number"
                    min="0"
                    step="500000"
                    placeholder="50 000 000"
                    class="price-input"
                    @keyup.enter="applyFilters"
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn btn-secondary btn-sm w-100 mt-2"
                @click="applyFilters"
              >
                {{ $t('filters.apply') }}
              </button>
            </div>

            <!-- 3. Rating Filter -->
            <div class="filter-group">
              <h4 class="filter-group-heading">{{ $t('filters.rating') }}</h4>
              <div class="rating-options-list">
                <button
                  v-for="rate in [4.8, 4.5, 4.0]"
                  :key="rate"
                  type="button"
                  class="rating-option-btn"
                  :class="{ active: localMinRating === rate }"
                  @click="setRating(localMinRating === rate ? null : rate)"
                >
                  <div class="stars-group">
                    <AppIcon name="star-fill" size="13" class="text-gold" />
                    <span>{{ rate }} +</span>
                  </div>
                  <AppIcon
                    v-if="localMinRating === rate"
                    name="check"
                    size="14"
                    class="check-icon"
                  />
                </button>
              </div>
            </div>

            <!-- 4. Stock Availability Toggle -->
            <div class="filter-group border-0 pb-0">
              <label class="ios-switch-row">
                <span class="switch-label">{{ $t('filters.inStockOnly') }}</span>
                <input
                  v-model="localInStockOnly"
                  type="checkbox"
                  class="ios-switch-checkbox"
                  @change="applyFilters"
                />
                <span class="ios-switch-slider"></span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Product Grid Area -->
        <main class="col-12 col-lg-9">
          <!-- Skeleton Loading -->
          <div v-if="isLoading" class="row g-3 g-md-4">
            <div
              v-for="n in 8"
              :key="n"
              class="col-6 col-md-4 col-xl-3"
            >
              <SkeletonCard />
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="productsList.length === 0" class="empty-state-card">
            <div class="empty-icon-wrap">
              <AppIcon name="box" size="32" />
            </div>
            <h3 class="empty-title">{{ $t('empty.noProducts') }}</h3>
            <p class="empty-desc">{{ $t('empty.tryDifferent') }}</p>
            <button type="button" class="btn btn-primary" @click="resetAllFilters">
              <AppIcon name="rotate-left" size="16" />
              <span>{{ $t('empty.resetFilters') }}</span>
            </button>
          </div>

          <!-- Products Grid -->
          <div v-else class="row g-3 g-md-4">
            <div
              v-for="product in productsList"
              :key="product.id"
              class="col-6 col-md-4 col-xl-3"
            >
              <ProductCard :product="product" />
            </div>
          </div>

          <!-- Pagination -->
          <Pagination
            v-if="!isLoading && paginationData.totalPages > 1"
            :current-page="paginationData.page"
            :total-pages="paginationData.totalPages"
            @page-change="handlePageChange"
          />
        </main>
      </div>
    </div>

    <!-- Mobile Filters Bottom Sheet (iOS Style) -->
    <transition name="bottom-sheet-fade">
      <div
        v-if="isMobileFiltersOpen"
        class="bottom-sheet-backdrop"
        @click.self="closeMobileFilters"
      >
        <div class="bottom-sheet-card" role="dialog" aria-modal="true">
          <!-- Grabber Bar -->
          <div class="sheet-grabber"></div>

          <!-- Sheet Header -->
          <div class="sheet-header">
            <button type="button" class="sheet-reset-btn" @click="resetAllFilters">
              {{ $t('filters.resetAll') }}
            </button>
            <h3 class="sheet-title">{{ $t('filters.title') }}</h3>
            <button type="button" class="sheet-close-btn" @click="closeMobileFilters">
              <AppIcon name="xmark" size="18" />
            </button>
          </div>

          <!-- Sheet Content -->
          <div class="sheet-body">
            <!-- 1. Categories -->
            <div class="sheet-section">
              <h4 class="sheet-section-title">{{ $t('categories.title') }}</h4>
              <div class="sheet-categories-grid">
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  type="button"
                  class="sheet-category-pill"
                  :class="{ active: selectedCategory === cat.slug }"
                  @click="selectCategory(cat.slug)"
                >
                  <AppIcon :name="cat.icon" size="14" />
                  <span>{{ $t(cat.nameKey) }}</span>
                </button>
              </div>
            </div>

            <!-- 2. Price Range -->
            <div class="sheet-section">
              <h4 class="sheet-section-title">{{ $t('filters.priceRange') }}</h4>
              <div class="price-inputs-row">
                <div class="input-col">
                  <span class="input-sublabel">{{ $t('filters.minPrice') }}</span>
                  <input
                    v-model.number="localMinPrice"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="price-input"
                  />
                </div>
                <span class="price-dash">-</span>
                <div class="input-col">
                  <span class="input-sublabel">{{ $t('filters.maxPrice') }}</span>
                  <input
                    v-model.number="localMaxPrice"
                    type="number"
                    min="0"
                    placeholder="50 000 000"
                    class="price-input"
                  />
                </div>
              </div>
            </div>

            <!-- 3. Rating -->
            <div class="sheet-section">
              <h4 class="sheet-section-title">{{ $t('filters.rating') }}</h4>
              <div class="sheet-rating-row">
                <button
                  v-for="rate in [4.8, 4.5, 4.0]"
                  :key="rate"
                  type="button"
                  class="sheet-rating-pill"
                  :class="{ active: localMinRating === rate }"
                  @click="setRating(localMinRating === rate ? null : rate)"
                >
                  <AppIcon name="star-fill" size="13" class="text-gold" />
                  <span>{{ rate }}+</span>
                </button>
              </div>
            </div>

            <!-- 4. In Stock -->
            <div class="sheet-section border-0 pb-0">
              <label class="ios-switch-row">
                <span class="switch-label">{{ $t('filters.inStockOnly') }}</span>
                <input
                  v-model="localInStockOnly"
                  type="checkbox"
                  class="ios-switch-checkbox"
                />
                <span class="ios-switch-slider"></span>
              </label>
            </div>
          </div>

          <!-- Sheet Footer Action -->
          <div class="sheet-footer">
            <button type="button" class="btn btn-primary w-100" @click="applyMobileFilters">
              {{ $t('filters.showResults', { count: paginationData.totalItems }) }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/product/ProductCard.vue';
import SkeletonCard from '@/components/product/SkeletonCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import { formatPrice } from '@/utils/formatters';

export default {
  name: 'CatalogView',
  components: {
    ProductCard,
    SkeletonCard,
    Pagination,
    Breadcrumbs
  },
  data() {
    return {
      isMobileFiltersOpen: false,
      localMinPrice: null,
      localMaxPrice: null,
      localMinRating: null,
      localInStockOnly: false
    };
  },
  computed: {
    ...mapGetters('products', [
      'productsList',
      'paginationData',
      'isLoading',
      'categoriesList',
      'selectedCategory',
      'searchQuery',
      'sortBy',
      'filtersState'
    ]),
    categories() {
      return this.categoriesList;
    },
    currentCategoryName() {
      const cat = this.categoriesList.find((c) => c.slug === this.selectedCategory);
      return cat ? this.$t(cat.nameKey) : this.selectedCategory;
    },
    pageTitle() {
      if (this.searchQuery) {
        return `"${this.searchQuery}"`;
      }
      if (this.selectedCategory && this.selectedCategory !== 'all') {
        return this.currentCategoryName;
      }
      return this.$t('nav.catalog');
    },
    breadcrumbItems() {
      const items = [{ label: this.$t('nav.catalog'), to: '/catalog' }];
      if (this.selectedCategory && this.selectedCategory !== 'all') {
        items.push({ label: this.currentCategoryName });
      } else if (this.searchQuery) {
        items.push({ label: `"${this.searchQuery}"` });
      }
      return items;
    },
    activeFiltersCount() {
      let count = 0;
      if (this.selectedCategory !== 'all') count++;
      if (this.localMinPrice || this.localMaxPrice) count++;
      if (this.localMinRating) count++;
      if (this.localInStockOnly) count++;
      return count;
    },
    hasAnyActiveFilters() {
      return (
        this.selectedCategory !== 'all' ||
        !!this.searchQuery ||
        !!this.localMinPrice ||
        !!this.localMaxPrice ||
        !!this.localMinRating ||
        this.localInStockOnly
      );
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.syncFromRouteQuery(newQuery);
      }
    }
  },
  mounted() {
    this.loadCategories();
    this.syncFromRouteQuery(this.$route.query);
  },
  methods: {
    ...mapActions('products', [
      'loadCategories',
      'loadProducts',
      'setCategory',
      'setSort',
      'setSearch',
      'setFilters',
      'resetFilters',
      'setPage'
    ]),
    formatPrice,

    syncFromRouteQuery(query) {
      const page = parseInt(query.page, 10) || 1;
      const category = query.category || 'all';
      const search = query.search || '';
      const sort = query.sort || 'featured';
      const minPrice = query.minPrice ? Number(query.minPrice) : null;
      const maxPrice = query.maxPrice ? Number(query.maxPrice) : null;
      const minRating = query.minRating ? Number(query.minRating) : null;
      const inStockOnly = query.inStock === 'true';

      this.localMinPrice = minPrice;
      this.localMaxPrice = maxPrice;
      this.localMinRating = minRating;
      this.localInStockOnly = inStockOnly;

      if (category !== this.selectedCategory) {
        this.$store.commit('products/SET_SELECTED_CATEGORY', category);
      }
      if (search !== this.searchQuery) {
        this.$store.commit('products/SET_SEARCH_QUERY', search);
      }
      if (sort !== this.sortBy) {
        this.$store.commit('products/SET_SORT_BY', sort);
      }

      this.$store.commit('products/SET_FILTERS', { minPrice, maxPrice, minRating, inStockOnly });

      this.loadProducts({
        page,
        category,
        search,
        sortBy: sort,
        minPrice,
        maxPrice,
        minRating,
        inStockOnly
      });
    },

    selectCategory(slug) {
      this.setCategory(slug);
      this.updateUrlQuery({ category: slug === 'all' ? undefined : slug, page: 1 });
    },

    handleSortChange(sort) {
      this.setSort(sort);
      this.updateUrlQuery({ sort: sort === 'featured' ? undefined : sort, page: 1 });
    },

    setRating(rate) {
      this.localMinRating = rate;
      this.applyFilters();
    },

    applyFilters() {
      this.setFilters({
        minPrice: this.localMinPrice,
        maxPrice: this.localMaxPrice,
        minRating: this.localMinRating,
        inStockOnly: this.localInStockOnly
      });
      this.updateUrlQuery({
        minPrice: this.localMinPrice || undefined,
        maxPrice: this.localMaxPrice || undefined,
        minRating: this.localMinRating || undefined,
        inStock: this.localInStockOnly ? 'true' : undefined,
        page: 1
      });
    },

    clearPriceFilter() {
      this.localMinPrice = null;
      this.localMaxPrice = null;
      this.applyFilters();
    },

    clearSearchQuery() {
      this.setSearch('');
      this.updateUrlQuery({ search: undefined, page: 1 });
    },

    resetAllFilters() {
      this.localMinPrice = null;
      this.localMaxPrice = null;
      this.localMinRating = null;
      this.localInStockOnly = false;
      this.resetFilters();
      this.$router.push({ path: '/catalog' });
      if (this.isMobileFiltersOpen) {
        this.closeMobileFilters();
      }
    },

    handlePageChange(page) {
      this.setPage(page);
      this.updateUrlQuery({ page });
    },

    updateUrlQuery(newParams) {
      const query = { ...this.$route.query, ...newParams };
      Object.keys(query).forEach((key) => {
        if (query[key] === undefined || query[key] === null || (key === 'page' && query[key] === 1)) {
          delete query[key];
        }
      });
      this.$router.push({ path: '/catalog', query });
    },

    openMobileFilters() {
      this.isMobileFiltersOpen = true;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    },

    closeMobileFilters() {
      this.isMobileFiltersOpen = false;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    },

    applyMobileFilters() {
      this.applyFilters();
      this.closeMobileFilters();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.catalog-view {
  padding-top: 1.25rem;
  padding-bottom: 2.5rem;
}

.content-container {
  max-width: 1440px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
}

.catalog-page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 0.5px solid var(--color-separator);
}

.header-titles {
  .page-large-title {
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-heavy);
    color: var(--color-label-primary);
    letter-spacing: var(--letter-spacing-title);
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: var(--font-size-large-title);
    }
  }

  .results-count-text {
    font-size: var(--font-size-subhead);
    color: var(--color-label-secondary);
    margin-top: 0.25rem;
  }
}

.header-action-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-mobile-trigger {
  min-height: 38px;
  padding: 0.4rem 0.95rem;
  font-size: var(--font-size-caption);
  border-radius: var(--radius-pill);

  .filter-count-badge {
    background: var(--color-primary);
    color: var(--color-label-white);
    padding: 0.1rem 0.4rem;
    border-radius: var(--radius-pill);
    font-size: 0.65rem;
    font-weight: var(--font-weight-bold);
  }
}

.sort-selector-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .sort-label {
    font-size: var(--font-size-subhead);
    color: var(--color-label-secondary);
  }
}

.select-pill-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;

  .sort-select {
    appearance: none;
    background-color: var(--color-bg-surface);
    border: 0.5px solid var(--color-separator);
    border-radius: var(--radius-pill);
    padding: 0.45rem 2.2rem 0.45rem 0.9rem;
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-semibold);
    color: var(--color-label-primary);
    cursor: pointer;

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-glow);
    }
  }

  .select-chevron {
    position: absolute;
    right: 0.75rem;
    pointer-events: none;
    color: var(--color-label-tertiary);
  }
}

/* Active Filter Chips */
.active-filters-chips-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: var(--color-primary-tint);
  color: var(--color-primary);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-pill);

  .remove-chip-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    padding: 2px;
  }
}

.clear-all-text-btn {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--color-danger);
  padding: 0.35rem 0.6rem;
  @include tap-spring;

  &:hover {
    text-decoration: underline;
  }
}

/* Sidebar Filters (Desktop) */
.sidebar-filters-card {
  @include card-surface;
  padding: 1.5rem;
  position: sticky;
  top: calc(var(--header-height) + 1.25rem);
}

.sidebar-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 0.5px solid var(--color-separator);

  .filter-card-title {
    font-size: var(--font-size-headline);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
  }

  .reset-btn-link {
    font-size: var(--font-size-caption);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);

    &:hover {
      text-decoration: underline;
    }
  }
}

.filter-group {
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 0.5px solid var(--color-separator);

  .filter-group-heading {
    font-size: var(--font-size-subhead);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
    margin-bottom: 0.85rem;
  }
}

.filter-category-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .category-filter-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.45rem 0.65rem;
    border-radius: var(--radius-sm);
    color: var(--color-label-primary);
    font-size: var(--font-size-subhead);
    text-align: left;
    @include tap-spring;

    &:hover {
      background-color: var(--color-bg-fill);
    }

    &.active {
      background-color: var(--color-primary-tint);
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }

    .cat-item-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cat-item-count {
      font-size: var(--font-size-caption-2);
      color: var(--color-label-tertiary);
    }
  }
}

.price-inputs-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .input-col {
    flex: 1;

    .input-sublabel {
      display: block;
      font-size: var(--font-size-caption-2);
      color: var(--color-label-tertiary);
      margin-bottom: 0.2rem;
    }

    .price-input {
      width: 100%;
      padding: 0.45rem 0.65rem;
      font-size: var(--font-size-caption);
    }
  }

  .price-dash {
    color: var(--color-label-tertiary);
    margin-top: 1rem;
  }
}

.rating-options-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .rating-option-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.45rem 0.65rem;
    border-radius: var(--radius-sm);
    color: var(--color-label-primary);
    font-size: var(--font-size-subhead);
    @include tap-spring;

    &:hover {
      background-color: var(--color-bg-fill);
    }

    &.active {
      background-color: var(--color-primary-tint);
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }

    .stars-group {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
  }
}

/* iOS Toggle Switch */
.ios-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .switch-label {
    font-size: var(--font-size-subhead);
    font-weight: var(--font-weight-medium);
    color: var(--color-label-primary);
  }

  .ios-switch-checkbox {
    display: none;

    &:checked + .ios-switch-slider {
      background-color: var(--color-success);

      &::after {
        transform: translateX(18px);
      }
    }
  }

  .ios-switch-slider {
    position: relative;
    width: 44px;
    height: 26px;
    background-color: var(--color-bg-fill-active);
    border-radius: var(--radius-pill);
    transition: background-color var(--transition-fast);

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 22px;
      height: 22px;
      background-color: #FFFFFF;
      border-radius: var(--radius-pill);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: transform var(--transition-fast);
    }
  }
}

/* Empty State Card */
.empty-state-card {
  text-align: center;
  padding: 4.5rem 1.5rem;
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-card);
  border: 0.5px solid var(--color-separator);

  .empty-icon-wrap {
    width: 68px;
    height: 68px;
    border-radius: var(--radius-pill);
    background-color: var(--color-bg-fill);
    color: var(--color-label-tertiary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: var(--font-size-title-3);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
    margin-bottom: 0.4rem;
  }

  .empty-desc {
    font-size: var(--font-size-subhead);
    color: var(--color-label-secondary);
    max-width: 420px;
    margin: 0 auto 1.5rem;
  }
}

/* Mobile Bottom Sheet (iOS Liquid Glass Modal) */
.bottom-sheet-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: var(--z-modal);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bottom-sheet-card {
  width: 100%;
  max-width: 540px;
  max-height: 85vh;
  @include liquid-glass;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom, 1rem);
}

.sheet-grabber {
  width: 36px;
  height: 4px;
  border-radius: var(--radius-pill);
  background-color: var(--color-separator-opaque);
  margin: 8px auto 0;
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  border-bottom: 0.5px solid var(--color-separator);

  .sheet-title {
    font-size: var(--font-size-headline);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
    margin: 0;
  }

  .sheet-reset-btn {
    font-size: var(--font-size-caption);
    color: var(--color-danger);
    font-weight: var(--font-weight-medium);
  }

  .sheet-close-btn {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-pill);
    background: var(--color-bg-fill);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-label-secondary);
  }
}

.sheet-body {
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sheet-section {
  padding-bottom: 1.25rem;
  border-bottom: 0.5px solid var(--color-separator);

  .sheet-section-title {
    font-size: var(--font-size-subhead);
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
    margin-bottom: 0.75rem;
  }
}

.sheet-categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .sheet-category-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.85rem;
    border-radius: var(--radius-pill);
    background-color: var(--color-bg-fill);
    color: var(--color-label-primary);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);

    &.active {
      background-color: var(--color-primary);
      color: var(--color-label-white);
    }
  }
}

.sheet-rating-row {
  display: flex;
  gap: 0.6rem;

  .sheet-rating-pill {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.55rem;
    border-radius: var(--radius-pill);
    background: var(--color-bg-fill);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-semibold);

    &.active {
      background: var(--color-primary);
      color: var(--color-label-white);
    }
  }
}

.sheet-footer {
  padding: 1rem 1.25rem 0.5rem;
  border-top: 0.5px solid var(--color-separator);
}

.bottom-sheet-fade-enter-active,
.bottom-sheet-fade-leave-active {
  transition: opacity 220ms ease;

  .bottom-sheet-card {
    transition: transform 280ms var(--spring-ease);
  }
}

.bottom-sheet-fade-enter-from,
.bottom-sheet-fade-leave-to {
  opacity: 0;

  .bottom-sheet-card {
    transform: translateY(100%);
  }
}

.text-gold {
  color: #FF9500;
}
</style>

