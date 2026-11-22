<template>
  <div class="product-detail-view">
    <div class="container-fluid content-container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Skeleton loading state -->
      <div v-if="isLoading" class="detail-skeleton">
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <div class="skeleton-gallery"></div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line meta"></div>
            <div class="skeleton-line price"></div>
            <div class="skeleton-block desc"></div>
            <div class="skeleton-line button"></div>
          </div>
        </div>
      </div>

      <!-- Error / Product not found -->
      <div v-else-if="!product" class="not-found-card text-center">
        <div class="not-found-icon-wrap">
          <AppIcon name="search" size="48" />
        </div>
        <h2 class="not-found-title">{{ $t('empty.noProducts') }}</h2>
        <p class="not-found-desc">{{ $t('notFound.description') }}</p>
        <router-link to="/catalog" class="btn btn-primary btn-pill">
          <AppIcon name="arrow-left" size="16" />
          <span>{{ $t('breadcrumbs.catalog') }}</span>
        </router-link>
      </div>

      <!-- Main product view -->
      <div v-else class="product-main-content">
        <div class="row g-4 g-xl-5">
          <!-- Left: Image Gallery -->
          <div class="col-12 col-lg-6">
            <div
              class="gallery-card"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
            >
              <!-- Featured Main Image -->
              <div class="main-image-stage" @click="openLightbox(activeImageIndex)">
                <img
                  :src="activeImage"
                  :alt="product.title"
                  class="main-image"
                />

                <!-- Top glass badges -->
                <div class="gallery-badges">
                  <span v-if="product.discount" class="discount-badge">
                    -{{ product.discount }}%
                  </span>
                  <span v-if="product.isNew" class="badge-pill new-badge">
                    {{ $t('product.badgeNew') }}
                  </span>
                </div>

                <!-- Zoom hint button -->
                <button
                  type="button"
                  class="zoom-trigger-btn"
                  :title="$t('productDetail.zoom')"
                  :aria-label="$t('productDetail.zoom')"
                  @click.stop="openLightbox(activeImageIndex)"
                >
                  <AppIcon name="zoom" size="18" />
                </button>

                <!-- Mobile dot indicator -->
                <div v-if="galleryImages.length > 1" class="gallery-dots d-md-none">
                  <span
                    v-for="(_, idx) in galleryImages"
                    :key="idx"
                    class="dot"
                    :class="{ active: activeImageIndex === idx }"
                  ></span>
                </div>
              </div>

              <!-- Thumbnails Strip -->
              <div v-if="galleryImages.length > 1" class="thumbnails-strip">
                <button
                  v-for="(img, idx) in galleryImages"
                  :key="idx"
                  type="button"
                  class="thumb-btn"
                  :class="{ active: activeImageIndex === idx }"
                  :aria-label="'Preview image ' + (idx + 1)"
                  @click="activeImageIndex = idx"
                >
                  <img :src="img" :alt="'Thumbnail ' + (idx + 1)" class="thumb-img" />
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Product Purchase Info -->
          <div class="col-12 col-lg-6">
            <div class="product-info-panel">
              <!-- Seller & Location bar -->
              <div class="seller-strip">
                <span class="seller-name">
                  <AppIcon name="store" size="14" />
                  {{ product.seller }}
                </span>
                <span class="divider">&bull;</span>
                <span class="seller-location">
                  <AppIcon name="map-pin" size="14" />
                  {{ product.location }}
                </span>
              </div>

              <!-- Product Title -->
              <h1 class="product-title">{{ product.title }}</h1>

              <!-- Rating, Reviews & Stock Badge -->
              <div class="rating-stock-row">
                <div class="rating-pill">
                  <AppIcon name="star-fill" size="15" class="star-icon" />
                  <span class="rating-value">{{ product.rating }}</span>
                  <span class="reviews-count">({{ product.reviewsCount }} {{ $t('product.reviews') }})</span>
                </div>

                <div
                  class="stock-pill"
                  :class="product.stock > 0 ? 'in-stock' : 'out-of-stock'"
                >
                  <AppIcon :name="product.stock > 0 ? 'check' : 'xmark'" size="13" />
                  <span>
                    {{ product.stock > 0 ? $t('product.inStock') : $t('product.outOfStock') }}
                  </span>
                </div>

                <span v-if="product.stock > 0 && product.stock <= 5" class="low-stock-warning">
                  {{ $t('product.stockCount', { count: product.stock }) }}
                </span>
              </div>

              <!-- Price Box -->
              <div class="price-box">
                <div class="price-main">
                  <span class="current-price">{{ formattedPrice }}</span>
                  <span class="currency">{{ $t('product.currency') }}</span>
                </div>
                <div v-if="product.oldPrice" class="price-sub">
                  <span class="old-price">{{ formattedOldPrice }} {{ $t('product.currency') }}</span>
                  <span v-if="product.discount" class="savings-tag">
                    {{ $t('cart.discount') }}: {{ formatNumber(product.oldPrice - product.price) }} {{ $t('product.currency') }}
                  </span>
                </div>
              </div>

              <!-- Quantity Selector -->
              <div class="quantity-section">
                <span class="section-label">{{ $t('productDetail.quantity') }}:</span>
                <div class="quantity-controller">
                  <button
                    type="button"
                    class="qty-btn"
                    :disabled="quantity <= 1"
                    aria-label="Decrease quantity"
                    @click="quantity > 1 && quantity--"
                  >
                    <AppIcon name="minus" size="14" />
                  </button>
                  <span class="qty-display">{{ quantity }}</span>
                  <button
                    type="button"
                    class="qty-btn"
                    :disabled="quantity >= product.stock"
                    aria-label="Increase quantity"
                    @click="quantity < product.stock && quantity++"
                  >
                    <AppIcon name="plus" size="14" />
                  </button>
                </div>
              </div>

              <!-- Primary Action Buttons -->
              <div class="actions-group">
                <button
                  type="button"
                  class="btn btn-primary btn-add-cart"
                  :disabled="product.stock <= 0"
                  @click="handleAddToCart"
                >
                  <AppIcon name="cart" size="18" />
                  <span>{{ $t('product.addToCart') }}</span>
                </button>

                <button
                  type="button"
                  class="btn btn-secondary btn-buy-now"
                  :disabled="product.stock <= 0"
                  @click="handleBuyNow"
                >
                  <AppIcon name="credit-card" size="18" />
                  <span>{{ $t('productDetail.buyNow') }}</span>
                </button>

                <button
                  type="button"
                  class="btn-icon-glass"
                  :class="{ active: isFavorite }"
                  :aria-label="$t('product.addToFavorites')"
                  @click="handleToggleFavorite"
                >
                  <AppIcon :name="isFavorite ? 'heart-fill' : 'heart'" size="20" />
                </button>

                <button
                  type="button"
                  class="btn-icon-glass"
                  :title="$t('productDetail.share')"
                  :aria-label="$t('productDetail.share')"
                  @click="handleShare"
                >
                  <AppIcon name="share" size="20" />
                </button>
              </div>

              <!-- Benefits & Delivery Cards -->
              <div class="perks-grid">
                <div class="perk-card">
                  <div class="perk-icon-box">
                    <AppIcon name="truck" size="20" />
                  </div>
                  <div class="perk-content">
                    <h4 class="perk-title">{{ $t('productDetail.deliveryNotice') }}</h4>
                    <p class="perk-desc">{{ $t('footer.delivery') }}</p>
                  </div>
                </div>

                <div class="perk-card">
                  <div class="perk-icon-box">
                    <AppIcon name="lock" size="20" />
                  </div>
                  <div class="perk-content">
                    <h4 class="perk-title">{{ $t('productDetail.warranty') }}</h4>
                    <p class="perk-desc">{{ $t('header.searchPlaceholder').slice(0, 30) }}...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Segmented Control Tabs (Description / Specs / Reviews) -->
        <div class="product-tabs-container">
          <div class="ios-segmented-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              class="segmented-tab"
              :class="{ active: activeTab === 'description' }"
              :aria-selected="activeTab === 'description'"
              @click="activeTab = 'description'"
            >
              {{ $t('productDetail.description') }}
            </button>
            <button
              type="button"
              role="tab"
              class="segmented-tab"
              :class="{ active: activeTab === 'specs' }"
              :aria-selected="activeTab === 'specs'"
              @click="activeTab = 'specs'"
            >
              {{ $t('productDetail.specs') }}
            </button>
            <button
              type="button"
              role="tab"
              class="segmented-tab"
              :class="{ active: activeTab === 'reviews' }"
              :aria-selected="activeTab === 'reviews'"
              @click="activeTab = 'reviews'"
            >
              {{ $t('productDetail.reviews') }} ({{ product.reviewsCount }})
            </button>
          </div>

          <!-- Tab Content Cards -->
          <div class="tab-content-card">
            <!-- Description Tab -->
            <div v-show="activeTab === 'description'" class="tab-pane">
              <h3 class="pane-title">{{ $t('productDetail.description') }}</h3>
              <p class="product-full-desc">{{ product.description }}</p>
              
              <div v-if="product.specs" class="quick-highlights">
                <h4 class="highlights-title">{{ $t('product.specs') }}:</h4>
                <div class="row g-2">
                  <div
                    v-for="(val, key) in product.specs"
                    :key="key"
                    class="col-12 col-sm-6 col-md-4"
                  >
                    <div class="spec-chip">
                      <span class="chip-key">{{ formatSpecKey(key) }}:</span>
                      <span class="chip-val">{{ val }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Specs Tab -->
            <div v-show="activeTab === 'specs'" class="tab-pane">
              <h3 class="pane-title">{{ $t('productDetail.specs') }}</h3>
              <div v-if="product.specs" class="specs-table-wrap">
                <table class="ios-specs-table">
                  <tbody>
                    <tr v-for="(val, key) in product.specs" :key="key">
                      <td class="spec-name">{{ formatSpecKey(key) }}</td>
                      <td class="spec-value">{{ val }}</td>
                    </tr>
                    <tr>
                      <td class="spec-name">{{ $t('productDetail.sku') }}</td>
                      <td class="spec-value">{{ product.id.toUpperCase() }}</td>
                    </tr>
                    <tr>
                      <td class="spec-name">{{ $t('product.seller') }}</td>
                      <td class="spec-value">{{ product.seller }}</td>
                    </tr>
                    <tr>
                      <td class="spec-name">{{ $t('product.location') }}</td>
                      <td class="spec-value">{{ product.location }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-show="activeTab === 'reviews'" class="tab-pane">
              <div class="reviews-header">
                <div>
                  <h3 class="pane-title">{{ $t('productDetail.reviews') }}</h3>
                  <div class="overall-rating">
                    <span class="score">{{ product.rating }}</span>
                    <div class="stars">
                      <AppIcon
                        v-for="s in 5"
                        :key="s"
                        name="star-fill"
                        size="16"
                        :class="s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'"
                      />
                    </div>
                    <span class="count">{{ product.reviewsCount }} {{ $t('product.reviews') }}</span>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  @click="showWriteReviewNotice"
                >
                  <AppIcon name="tag" size="14" />
                  <span>{{ $t('productDetail.writeReview') }}</span>
                </button>
              </div>

              <!-- Reviews List -->
              <div class="reviews-list">
                <div
                  v-for="(review, rIdx) in mockReviews"
                  :key="rIdx"
                  class="review-item"
                >
                  <div class="review-top">
                    <div class="reviewer-avatar">{{ review.author.charAt(0) }}</div>
                    <div class="reviewer-meta">
                      <h5 class="reviewer-name">{{ review.author }}</h5>
                      <span class="review-date">{{ review.date }}</span>
                    </div>
                    <div class="review-stars ms-auto">
                      <AppIcon
                        v-for="st in 5"
                        :key="st"
                        name="star-fill"
                        size="13"
                        :class="st <= review.rating ? 'star-filled' : 'star-empty'"
                      />
                    </div>
                  </div>
                  <p class="review-text">{{ review.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products Section -->
        <div v-if="relatedProducts.length > 0" class="related-section">
          <div class="section-header">
            <h2 class="section-title">{{ $t('productDetail.relatedProducts') }}</h2>
          </div>
          <div class="row g-3 g-md-4">
            <div
              v-for="relProd in relatedProducts"
              :key="relProd.id"
              class="col-6 col-md-4 col-xl-3"
            >
              <ProductCard :product="relProd" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <ProductLightbox
      :is-open="isLightboxOpen"
      :images="galleryImages"
      :initial-index="activeImageIndex"
      @close="isLightboxOpen = false"
    />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import ProductLightbox from '@/components/common/ProductLightbox.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { fetchProductById, fetchRelatedProducts } from '@/api/products';
import { formatNumber } from '@/utils/formatters';

export default {
  name: 'ProductDetailView',
  components: {
    Breadcrumbs,
    ProductLightbox,
    ProductCard
  },
  data() {
    return {
      product: null,
      relatedProducts: [],
      isLoading: true,
      activeImageIndex: 0,
      quantity: 1,
      activeTab: 'description',
      isLightboxOpen: false,
      touchStartX: 0
    };
  },
  computed: {
    galleryImages() {
      if (!this.product || !this.product.images) return [];
      return this.product.images;
    },
    activeImage() {
      if (this.galleryImages.length > 0) {
        return this.galleryImages[this.activeImageIndex] || this.galleryImages[0];
      }
      return '';
    },
    formattedPrice() {
      return this.product ? formatNumber(this.product.price) : '0';
    },
    formattedOldPrice() {
      return this.product && this.product.oldPrice ? formatNumber(this.product.oldPrice) : '';
    },
    isFavorite() {
      if (!this.product) return false;
      return this.$store.getters['ui/isFavorite'](this.product.id);
    },
    breadcrumbItems() {
      if (!this.product) return [];
      return [
        { label: this.$t('breadcrumbs.catalog'), to: '/catalog' },
        { label: this.$t(`categories.${this.product.category}`), to: `/catalog?category=${this.product.category}` },
        { label: this.product.title }
      ];
    },
    mockReviews() {
      if (!this.product) return [];
      return [
        {
          author: 'Davronbek K.',
          rating: 5,
          date: '2024-03-12',
          text: 'Juda ajoyib mahsulot! Sifati kutilganidan ham yaxshi chiqdi. Yetkazib berish ham juda tez boʻldi.'
        },
        {
          author: 'Malika S.',
          rating: 5,
          date: '2024-03-08',
          text: 'Dizayni juda chiroyli, foydalanishga qulay. Barchaga tavsiya qilaman!'
        },
        {
          author: 'Azizbek M.',
          rating: 4,
          date: '2024-02-28',
          text: 'Narxiga arziydigan sifat. Hozircha hammasi aʼlo darajada ishlayapti.'
        }
      ];
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.loadProduct(newId);
        }
      }
    }
  },
  methods: {
    formatNumber,
    async loadProduct(id) {
      this.isLoading = true;
      this.activeImageIndex = 0;
      this.quantity = 1;
      try {
        const prod = await fetchProductById(id);
        this.product = prod;
        if (prod) {
          const related = await fetchRelatedProducts(prod.category, prod.id, 4);
          this.relatedProducts = related;
        }
      } catch (err) {
        this.product = null;
      } finally {
        this.isLoading = false;
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    openLightbox(idx) {
      this.activeImageIndex = idx;
      this.isLightboxOpen = true;
    },
    handleTouchStart(e) {
      if (e.touches && e.touches.length > 0) {
        this.touchStartX = e.touches[0].clientX;
      }
    },
    handleTouchEnd(e) {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;

      if (Math.abs(diff) > 40 && this.galleryImages.length > 1) {
        if (diff > 0) {
          // Swipe left -> next image
          this.activeImageIndex = (this.activeImageIndex + 1) % this.galleryImages.length;
        } else {
          // Swipe right -> prev image
          this.activeImageIndex =
            (this.activeImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        }
      }
    },
    handleAddToCart() {
      if (!this.product) return;
      this.$store.dispatch('ui/addToCart', {
        product: this.product,
        quantity: this.quantity
      });
    },
    handleBuyNow() {
      if (!this.product) return;
      this.$store.dispatch('ui/addToCart', {
        product: this.product,
        quantity: this.quantity
      });
      this.$router.push('/cart');
    },
    handleToggleFavorite() {
      if (!this.product) return;
      this.$store.dispatch('ui/toggleFavorite', this.product.id);
    },
    handleShare() {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      this.$store.dispatch('ui/showToast', {
        message: 'productDetail.copied',
        icon: 'check'
      });
    },
    showWriteReviewNotice() {
      this.$store.dispatch('ui/showToast', {
        message: 'productDetail.writeReview',
        icon: 'tag'
      });
    },
    formatSpecKey(key) {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.product-detail-view {
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

/* Skeleton Loading */
.detail-skeleton {
  .skeleton-gallery {
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-2xl);
    background: var(--color-surface);
    animation: pulse 1.5s infinite ease-in-out;
  }

  .skeleton-line {
    height: 1.5rem;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    margin-bottom: 1rem;
    animation: pulse 1.5s infinite ease-in-out;

    &.title {
      height: 2.5rem;
      width: 80%;
    }
    &.meta {
      width: 40%;
    }
    &.price {
      height: 3rem;
      width: 50%;
    }
    &.button {
      height: 3.25rem;
      width: 60%;
      border-radius: var(--radius-full);
    }
  }

  .skeleton-block.desc {
    height: 6rem;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    margin-bottom: 1.5rem;
    animation: pulse 1.5s infinite ease-in-out;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

/* Not Found View */
.not-found-card {
  padding: 4rem 1.5rem;
  background: var(--color-card);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  max-width: 560px;
  margin: 2rem auto;

  .not-found-icon-wrap {
    color: var(--color-text-tertiary);
    margin-bottom: 1rem;
  }

  .not-found-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  .not-found-desc {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
}

/* Gallery Section */
.gallery-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-stage {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-2xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }

  &:hover .main-image {
    transform: scale(1.02);
  }

  .gallery-badges {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 2;

    .discount-badge {
      background: var(--color-danger);
      color: #fff;
      font-size: 0.8125rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-full);
    }

    .new-badge {
      background: var(--color-primary);
      color: #fff;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-full);
    }
  }

  .zoom-trigger-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-full);
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    z-index: 2;
    cursor: pointer;
    transition: transform var(--transition-base);

    &:hover {
      transform: scale(1.08);
    }
  }

  .gallery-dots {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.375rem;
    z-index: 2;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.5);
      transition: all var(--transition-base);

      &.active {
        width: 16px;
        background: #fff;
      }
    }
  }
}

.thumbnails-strip {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.25rem 0;

  .thumb-btn {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: var(--radius-lg);
    border: 2px solid transparent;
    overflow: hidden;
    padding: 0;
    background: var(--color-card);
    cursor: pointer;
    transition: all var(--transition-base);

    &.active {
      border-color: var(--color-primary);
      transform: scale(1.04);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

/* Info Panel */
.product-info-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .seller-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);

    .seller-name, .seller-location {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    .divider {
      color: var(--color-text-tertiary);
    }
  }

  .product-title {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
    margin: 0;

    @include respond-to('md') {
      font-size: 2.125rem;
    }
  }

  .rating-stock-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;

    .rating-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-full);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);
      font-size: 0.875rem;

      .star-icon {
        color: #ff9500;
      }

      .rating-value {
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .reviews-count {
        color: var(--color-text-secondary);
      }
    }

    .stock-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      font-weight: 600;

      &.in-stock {
        background: rgba(52, 199, 89, 0.12);
        color: var(--color-success);
      }

      &.out-of-stock {
        background: rgba(142, 142, 147, 0.15);
        color: var(--color-text-secondary);
      }
    }

    .low-stock-warning {
      font-size: 0.8125rem;
      color: var(--color-warning);
      font-weight: 600;
    }
  }

  .price-box {
    padding: 1.25rem;
    border-radius: var(--radius-xl);
    background: var(--color-card);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-sm);

    .price-main {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;

      .current-price {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        color: var(--color-text-primary);
      }

      .currency {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
    }

    .price-sub {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.375rem;

      .old-price {
        font-size: 1rem;
        color: var(--color-text-tertiary);
        text-decoration: line-through;
      }

      .savings-tag {
        font-size: 0.8125rem;
        color: var(--color-success);
        font-weight: 600;
      }
    }
  }

  .quantity-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    .section-label {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .quantity-controller {
      display: inline-flex;
      align-items: center;
      background: var(--color-card);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-full);
      padding: 0.25rem;

      .qty-btn {
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-full);
        border: none;
        background: transparent;
        color: var(--color-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background var(--transition-base);

        &:hover:not(:disabled) {
          background: var(--color-surface);
        }

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }

      .qty-display {
        min-width: 2.5rem;
        text-align: center;
        font-weight: 700;
        font-size: 0.9375rem;
        color: var(--color-text-primary);
      }
    }
  }

  .actions-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;

    .btn-add-cart {
      flex: 1 1 200px;
      min-height: 50px;
      border-radius: var(--radius-full);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(10, 132, 255, 0.3);
    }

    .btn-buy-now {
      flex: 1 1 160px;
      min-height: 50px;
      border-radius: var(--radius-full);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .btn-icon-glass {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-full);
      background: var(--color-card);
      border: 1px solid var(--glass-border);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-base);

      &:hover {
        transform: scale(1.05);
        color: var(--color-text-primary);
      }

      &.active {
        color: var(--color-danger);
      }
    }
  }

  .perks-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-top: 0.5rem;

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }

    .perk-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);

      .perk-icon-box {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-md);
        background: rgba(10, 132, 255, 0.1);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .perk-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0;
      }

      .perk-desc {
        font-size: 0.75rem;
        color: var(--color-text-secondary);
        margin: 0;
      }
    }
  }
}

/* Segmented Tabs */
.product-tabs-container {
  margin-top: 3.5rem;
}

.ios-segmented-tabs {
  display: inline-flex;
  padding: 0.3125rem;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 1px solid var(--glass-border);
  margin-bottom: 1.5rem;
  max-width: 100%;
  overflow-x: auto;

  .segmented-tab {
    padding: 0.5rem 1.25rem;
    border-radius: var(--radius-full);
    border: none;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--transition-base);

    &.active {
      background: var(--color-card);
      color: var(--color-text-primary);
      box-shadow: var(--shadow-sm);
    }
  }
}

.tab-content-card {
  padding: 1.75rem;
  border-radius: var(--radius-2xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);

  .pane-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
  }

  .product-full-desc {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }

  .quick-highlights {
    .highlights-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 0.75rem;
    }

    .spec-chip {
      padding: 0.625rem 0.875rem;
      border-radius: var(--radius-md);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);
      font-size: 0.875rem;
      display: flex;
      justify-content: space-between;

      .chip-key {
        font-weight: 600;
        color: var(--color-text-secondary);
      }

      .chip-val {
        color: var(--color-text-primary);
        font-weight: 500;
      }
    }
  }

  .specs-table-wrap {
    overflow-x: auto;

    .ios-specs-table {
      width: 100%;
      border-collapse: collapse;

      tr {
        border-bottom: 1px solid var(--glass-border);

        &:last-child {
          border-bottom: none;
        }
      }

      td {
        padding: 0.875rem 0.5rem;
        font-size: 0.9375rem;

        &.spec-name {
          font-weight: 600;
          color: var(--color-text-secondary);
          width: 35%;
        }

        &.spec-value {
          color: var(--color-text-primary);
        }
      }
    }
  }

  .reviews-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--glass-border);

    .overall-rating {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .score {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-text-primary);
      }

      .stars {
        display: flex;
        gap: 0.125rem;
      }

      .count {
        font-size: 0.875rem;
        color: var(--color-text-secondary);
      }
    }
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .review-item {
      padding: 1.25rem;
      border-radius: var(--radius-xl);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);

      .review-top {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .reviewer-avatar {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-full);
          background: var(--color-primary);
          color: #fff;
          font-weight: 700;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reviewer-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
        }

        .review-date {
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
        }
      }

      .review-text {
        font-size: 0.875rem;
        color: var(--color-text-secondary);
        line-height: 1.5;
        margin: 0;
      }
    }
  }
}

.star-filled {
  color: #ff9500;
}

.star-empty {
  color: rgba(142, 142, 147, 0.4);
}

/* Related Products */
.related-section {
  margin-top: 4rem;

  .section-header {
    margin-bottom: 1.5rem;

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-primary);
      letter-spacing: -0.02em;
    }
  }
}
</style>

