<template>
  <div class="home-view">
    <!-- 1. Hero Banner / Slider -->
    <section class="hero-section">
      <div class="container-fluid content-container">
        <div
          class="hero-slider-container"
          @mouseenter="pauseAutoPlay"
          @mouseleave="startAutoPlay"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <!-- Slides -->
          <div
            v-for="(slide, index) in heroSlides"
            :key="index"
            class="hero-slide-card"
            :class="{ active: currentSlide === index }"
            :style="{ backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.55), rgba(10, 15, 30, 0.75)), url(${slide.image})` }"
          >
            <div class="slide-content">
              <span class="slide-badge-pill">
                <AppIcon name="bolt" size="13" class="badge-icon" />
                <span>{{ $t(slide.tagKey) }}</span>
              </span>
              <h1 class="slide-title">{{ $t(slide.titleKey) }}</h1>
              <p class="slide-subtitle">{{ $t(slide.subtitleKey) }}</p>
              <div class="slide-actions">
                <button type="button" class="btn btn-primary" @click="scrollToCatalog">
                  <span>{{ $t(slide.ctaKey) }}</span>
                  <AppIcon name="arrow-right" size="16" />
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop-only glass arrows positioned safely outside text area -->
          <button
            type="button"
            class="slider-glass-arrow prev-arrow d-none d-md-flex"
            aria-label="Previous slide"
            @click="prevSlide"
          >
            <AppIcon name="chevron-left" size="18" />
          </button>
          <button
            type="button"
            class="slider-glass-arrow next-arrow d-none d-md-flex"
            aria-label="Next slide"
            @click="nextSlide"
          >
            <AppIcon name="chevron-right" size="18" />
          </button>

          <!-- Slider Dots -->
          <div class="slider-dots">
            <button
              v-for="(_, index) in heroSlides"
              :key="index"
              type="button"
              class="dot-pill"
              :class="{ active: currentSlide === index }"
              :aria-label="`Slide ${index + 1}`"
              @click="setSlide(index)"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Category Chips / iOS Segmented Control -->
    <section class="categories-section section-container">
      <div class="container-fluid content-container">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon-bubble cat-bubble">
              <AppIcon name="grid" size="18" />
            </span>
            <div>
              <h2 class="section-title">{{ $t('categories.title') }}</h2>
              <p class="section-subtitle">{{ $t('categories.subtitle') }}</p>
            </div>
          </div>
        </div>

        <!-- iOS Segmented Control Pills -->
        <div class="segmented-control-track">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="segmented-pill"
            :class="{ active: selectedCategory === cat.slug }"
            @click="handleCategorySelect(cat.slug)"
          >
            <AppIcon :name="cat.icon" size="15" class="pill-icon" />
            <span class="pill-text">{{ $t(cat.nameKey) }}</span>
            <span class="pill-badge">{{ cat.count }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 3. Curated Section: Hot Deals -->
    <section v-if="dealProducts.length > 0" class="deals-section section-container">
      <div class="container-fluid content-container">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon-bubble deals-bubble">
              <AppIcon name="fire" size="18" />
            </span>
            <div>
              <h2 class="section-title">{{ $t('sections.deals.title') }}</h2>
              <p class="section-subtitle">{{ $t('sections.deals.subtitle') }}</p>
            </div>
          </div>
          <button type="button" class="section-link" @click="handleSortChange('discount')">
            <span>{{ $t('sections.deals.viewAll') }}</span>
            <AppIcon name="chevron-right" size="14" />
          </button>
        </div>

        <div class="row g-3 g-md-4">
          <div
            v-for="product in dealProducts"
            :key="product.id"
            class="col-6 col-md-4 col-lg-3"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Curated Section: Popular -->
    <section v-if="popularProducts.length > 0" class="popular-section section-container">
      <div class="container-fluid content-container">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon-bubble popular-bubble">
              <AppIcon name="star" size="18" />
            </span>
            <div>
              <h2 class="section-title">{{ $t('sections.popular.title') }}</h2>
              <p class="section-subtitle">{{ $t('sections.popular.subtitle') }}</p>
            </div>
          </div>
          <button type="button" class="section-link" @click="handleSortChange('rating')">
            <span>{{ $t('sections.popular.viewAll') }}</span>
            <AppIcon name="chevron-right" size="14" />
          </button>
        </div>

        <div class="row g-3 g-md-4">
          <div
            v-for="product in popularProducts"
            :key="product.id"
            class="col-6 col-md-4 col-lg-3"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Curated Section: New Arrivals -->
    <section v-if="newProducts.length > 0" class="new-arrivals-section section-container">
      <div class="container-fluid content-container">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon-bubble new-bubble">
              <AppIcon name="sparkles" size="18" />
            </span>
            <div>
              <h2 class="section-title">{{ $t('sections.new.title') }}</h2>
              <p class="section-subtitle">{{ $t('sections.new.subtitle') }}</p>
            </div>
          </div>
          <button type="button" class="section-link" @click="handleSortChange('newest')">
            <span>{{ $t('sections.new.viewAll') }}</span>
            <AppIcon name="chevron-right" size="14" />
          </button>
        </div>

        <div class="row g-3 g-md-4">
          <div
            v-for="product in newProducts"
            :key="product.id"
            class="col-6 col-md-4 col-lg-3"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Main Product Grid with Sorting and Pagination -->
    <section id="all-products-section" class="main-grid-section section-container">
      <div class="container-fluid content-container">
        <!-- Main Header & Controls -->
        <div class="catalog-controls-header">
          <div class="catalog-title-wrap">
            <h2 class="section-title">{{ $t('sections.allProducts.title') }}</h2>
            <span class="products-count-badge">
              {{ $t('sections.allProducts.found', { count: paginationData.totalItems }) }}
            </span>
          </div>

          <!-- Active Filter Pill if searching or filtering -->
          <div v-if="searchQuery || selectedCategory !== 'all'" class="active-filters-bar">
            <span v-if="searchQuery" class="filter-pill">
              <AppIcon name="search" size="13" />
              <span>"{{ searchQuery }}"</span>
              <button type="button" class="clear-pill" @click="clearSearchQuery">
                <AppIcon name="xmark" size="11" />
              </button>
            </span>
            <span v-if="selectedCategory !== 'all'" class="filter-pill">
              <AppIcon name="grid" size="13" />
              <span>{{ activeCategoryName }}</span>
              <button type="button" class="clear-pill" @click="handleCategorySelect('all')">
                <AppIcon name="xmark" size="11" />
              </button>
            </span>
          </div>

          <!-- iOS Style Sort Selector -->
          <div class="sort-selector-wrap">
            <label for="sort-select" class="sort-label d-none d-sm-inline">
              {{ $t('sort.label') }}
            </label>
            <div class="select-pill-wrapper">
              <select
                id="sort-select"
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

        <!-- Skeleton Loading State -->
        <div v-if="isLoading" class="row g-3 g-md-4">
          <div
            v-for="n in 8"
            :key="n"
            class="col-6 col-md-4 col-lg-3"
          >
            <SkeletonCard />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="productsList.length === 0" class="empty-state">
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
            class="col-6 col-md-4 col-lg-3"
          >
            <ProductCard :product="product" />
          </div>
        </div>

        <!-- Reusable Pagination Component -->
        <Pagination
          v-if="!isLoading && paginationData.totalPages > 1"
          :current-page="paginationData.page"
          :total-pages="paginationData.totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/product/ProductCard.vue';
import SkeletonCard from '@/components/product/SkeletonCard.vue';
import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCard,
    SkeletonCard,
    Pagination
  },
  data() {
    return {
      currentSlide: 0,
      autoPlayTimer: null,
      touchStartX: 0,
      heroSlides: [
        {
          tagKey: 'hero.slide1.tag',
          titleKey: 'hero.slide1.title',
          subtitleKey: 'hero.slide1.subtitle',
          ctaKey: 'hero.slide1.cta',
          image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=80'
        },
        {
          tagKey: 'hero.slide2.tag',
          titleKey: 'hero.slide2.title',
          subtitleKey: 'hero.slide2.subtitle',
          ctaKey: 'hero.slide2.cta',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&auto=format&fit=crop&q=80'
        },
        {
          tagKey: 'hero.slide3.tag',
          titleKey: 'hero.slide3.title',
          subtitleKey: 'hero.slide3.subtitle',
          ctaKey: 'hero.slide3.cta',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80'
        }
      ]
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
      'popularProducts',
      'newProducts',
      'dealProducts'
    ]),
    categories() {
      return this.categoriesList;
    },
    activeCategoryName() {
      const cat = this.categoriesList.find((c) => c.slug === this.selectedCategory);
      return cat ? this.$t(cat.nameKey) : this.selectedCategory;
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        const page = parseInt(newQuery.page, 10) || 1;
        const category = newQuery.category || 'all';
        if (page !== this.paginationData.page || category !== this.selectedCategory) {
          this.loadProducts({ page, category });
        }
      }
    }
  },
  mounted() {
    this.startAutoPlay();
    this.loadCategories();
    this.loadFeaturedSections();

    const initialPage = parseInt(this.$route.query.page, 10) || 1;
    const initialCategory = this.$route.query.category || 'all';

    if (initialCategory !== this.selectedCategory) {
      this.$store.commit('products/SET_SELECTED_CATEGORY', initialCategory);
    }

    this.loadProducts({ page: initialPage, category: initialCategory });
  },
  beforeUnmount() {
    this.pauseAutoPlay();
  },
  methods: {
    ...mapActions('products', [
      'loadCategories',
      'loadProducts',
      'loadFeaturedSections',
      'setCategory',
      'setSort',
      'setSearch',
      'setPage'
    ]),

    // Slider controls & swipe
    startAutoPlay() {
      this.pauseAutoPlay();
      this.autoPlayTimer = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    pauseAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
    },
    setSlide(index) {
      this.currentSlide = index;
    },
    handleTouchStart(e) {
      if (e.touches && e.touches[0]) {
        this.touchStartX = e.touches[0].clientX;
      }
    },
    handleTouchEnd(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = e.changedTouches[0].clientX - this.touchStartX;
        if (diffX > 45) {
          this.prevSlide();
        } else if (diffX < -45) {
          this.nextSlide();
        }
      }
    },

    // Category filter
    handleCategorySelect(slug) {
      this.setCategory(slug);
      this.syncUrlQuery({ category: slug === 'all' ? undefined : slug, page: 1 });
    },

    // Sort change
    handleSortChange(sortBy) {
      this.setSort(sortBy);
      this.syncUrlQuery({ page: 1 });
    },

    // Pagination change
    handlePageChange(page) {
      this.setPage(page);
      this.syncUrlQuery({ page });
    },

    // Clear search
    clearSearchQuery() {
      this.setSearch('');
      this.syncUrlQuery({ page: 1 });
    },

    // Reset all filters
    resetAllFilters() {
      this.setSearch('');
      this.setCategory('all');
      this.setSort('featured');
      this.syncUrlQuery({ category: undefined, page: 1 });
    },

    syncUrlQuery(newParams) {
      const query = { ...this.$route.query, ...newParams };
      Object.keys(query).forEach((key) => {
        if (query[key] === undefined || query[key] === null || (key === 'page' && query[key] === 1)) {
          delete query[key];
        }
      });
      this.$router.push({ query });
    },

    scrollToCatalog() {
      const el = document.getElementById('all-products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.home-view {
  display: flex;
  flex-direction: column;
}

.content-container {
  max-width: 1440px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
}

/* 1. Hero Section */
.hero-section {
  padding-top: 0.75rem;

  @media (min-width: 768px) {
    padding-top: 1.25rem;
  }
}

.hero-slider-container {
  position: relative;
  height: 340px;
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);

  @media (min-width: 768px) {
    height: 400px;
  }

  @media (min-width: 1200px) {
    height: 440px;
  }
}

.hero-slide-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms var(--spring-ease), visibility 500ms var(--spring-ease);
  display: flex;
  align-items: center;
  padding: 1.75rem 1.25rem;

  @media (min-width: 768px) {
    /* Safe left-aligned padding so arrows never overlap text */
    padding: 3rem 4.5rem;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.slide-content {
  max-width: 580px;
  color: var(--color-label-white);
}

.slide-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  background-color: var(--color-primary);
  color: var(--color-label-white);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-caption-2);
  font-weight: var(--font-weight-heavy);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.85rem;
  box-shadow: 0 4px 12px var(--color-primary-glow);
}

.slide-title {
  font-size: 1.65rem;
  font-weight: var(--font-weight-heavy);
  line-height: 1.15;
  letter-spacing: var(--letter-spacing-title);
  margin-bottom: 0.65rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.75rem;
  }
}

.slide-subtitle {
  font-size: var(--font-size-body);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.45;
  margin-bottom: 1.25rem;
  max-width: 480px;

  @media (min-width: 768px) {
    font-size: var(--font-size-headline);
  }
}

/* Desktop-only small glass arrows placed safely at screen edges */
.slider-glass-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  @include liquid-glass;
  color: var(--color-label-white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  @include tap-spring;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: #000000;
  }

  &.prev-arrow {
    left: 1rem;
  }

  &.next-arrow {
    right: 1rem;
  }
}

.slider-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.45rem;
  z-index: 5;

  .dot-pill {
    width: 22px;
    height: 5px;
    border-radius: var(--radius-pill);
    background-color: rgba(255, 255, 255, 0.35);
    transition: all var(--transition-fast);

    &.active {
      background-color: #FFFFFF;
      width: 36px;
    }
  }
}

/* 2. iOS Segmented Control Track */
.segmented-control-track {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.35rem 0.15rem 0.75rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.segmented-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  background-color: var(--color-bg-surface);
  border: 0.5px solid var(--color-separator);
  border-radius: var(--radius-pill);
  color: var(--color-label-primary);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
  @include tap-spring;

  &:hover {
    background-color: var(--color-bg-fill);
  }

  &.active {
    background-color: var(--color-label-primary);
    border-color: var(--color-label-primary);
    color: var(--color-bg-body);
    font-weight: var(--font-weight-bold);
    box-shadow: var(--shadow-md);

    .pill-badge {
      background-color: var(--color-bg-surface);
      color: var(--color-label-primary);
    }
  }

  .pill-icon {
    opacity: 0.85;
  }

  .pill-badge {
    font-size: var(--font-size-caption-2);
    background-color: var(--color-bg-fill);
    color: var(--color-label-secondary);
    padding: 0.15rem 0.45rem;
    border-radius: var(--radius-pill);
    font-weight: var(--font-weight-semibold);
  }
}

/* Bubble Accents */
.cat-bubble {
  background-color: var(--color-primary-tint);
  color: var(--color-primary);
}

.deals-bubble {
  background-color: var(--color-danger-tint);
  color: var(--color-danger);
}

.popular-bubble {
  background-color: var(--color-warning-tint);
  color: var(--color-warning);
}

.new-bubble {
  background-color: var(--color-success-tint);
  color: var(--color-success);
}

/* Main Grid Controls */
.catalog-controls-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid var(--color-separator);
}

.catalog-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .section-title {
    margin-bottom: 0;
  }

  .products-count-badge {
    font-size: var(--font-size-caption);
    color: var(--color-label-secondary);
    background-color: var(--color-bg-fill);
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-pill);
    font-weight: var(--font-weight-medium);
  }
}

.active-filters-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: var(--color-primary-tint);
  color: var(--color-primary);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-pill);

  .clear-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    padding: 2px;
  }
}

.sort-selector-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  .sort-label {
    font-size: var(--font-size-subhead);
    color: var(--color-label-secondary);
    font-weight: var(--font-weight-medium);
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
    padding: 0.45rem 2.2rem 0.45rem 0.85rem;
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

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-card);
  border: 0.5px solid var(--color-separator);
  margin: 1.5rem 0;

  .empty-icon-wrap {
    width: 64px;
    height: 64px;
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
    max-width: 400px;
    margin: 0 auto 1.5rem;
  }
}
</style>
