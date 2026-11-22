<template>
  <article class="product-card">
    <div class="product-media">
      <!-- Discount / New Badges -->
      <div class="badge-group">
        <span v-if="product.discount > 0" class="badge badge-discount">
          -{{ product.discount }}%
        </span>
        <span v-if="product.isNew" class="badge badge-new">
          {{ $t('product.badgeNew') }}
        </span>
        <span v-else-if="product.isPopular" class="badge badge-popular">
          {{ $t('product.badgePopular') }}
        </span>
      </div>

      <!-- Favorite Button (Small Glass Circle) -->
      <button
        type="button"
        class="favorite-glass-btn"
        :class="{ 'is-active': isFavorite(product.id) }"
        :aria-label="isFavorite(product.id) ? $t('product.removeFromFavorites') : $t('product.addToFavorites')"
        @click.stop="onToggleFavorite"
      >
        <AppIcon
          :name="isFavorite(product.id) ? 'heart-fill' : 'heart'"
          :size="16"
          :class="{ 'heart-active': isFavorite(product.id) }"
        />
      </button>

      <!-- Clickable Image with 4:3 Aspect Ratio and Lazy Loading -->
      <router-link :to="`/product/${product.id}`" class="image-wrapper" :aria-label="product.title">
        <img
          :src="primaryImage"
          :alt="product.title"
          loading="lazy"
          class="product-image"
          @error="handleImageError"
        />
      </router-link>
    </div>

    <!-- Content -->
    <div class="product-content">
      <!-- Seller and Location -->
      <div class="seller-meta">
        <AppIcon name="store" size="12" class="seller-icon" />
        <span class="seller-name">{{ product.seller }}</span>
        <span class="seller-dot">&bull;</span>
        <span class="seller-location">{{ product.location }}</span>
      </div>

      <!-- Title with 2-line clamp -->
      <h3 class="product-title">
        <router-link :to="`/product/${product.id}`" class="title-link" :title="product.title">
          {{ product.title }}
        </router-link>
      </h3>

      <!-- Rating & Reviews -->
      <div class="rating-bar">
        <div class="stars">
          <AppIcon name="star-fill" size="12" class="star-gold" />
          <span class="rating-value">{{ product.rating }}</span>
        </div>
        <span class="reviews-count">({{ product.reviewsCount }} {{ $t('product.reviews') }})</span>
      </div>

      <!-- Price & Action -->
      <div class="product-footer">
        <div class="price-wrap">
          <div v-if="product.oldPrice" class="old-price">
            {{ formattedOldPrice }} {{ $t('product.currency') }}
          </div>
          <div class="current-price">
            {{ formattedPrice }} <span class="currency">{{ $t('product.currency') }}</span>
          </div>
        </div>

        <button
          type="button"
          class="cart-action-btn"
          :class="{ 'in-cart': isInCart(product.id) }"
          :aria-label="isInCart(product.id) ? $t('product.inCart') : $t('product.addToCart')"
          :title="isInCart(product.id) ? $t('product.inCart') : $t('product.addToCart')"
          @click.stop="onAddToCart"
        >
          <AppIcon
            :name="isInCart(product.id) ? 'check' : 'cart'"
            :size="17"
          />
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatPrice } from '@/utils/formatters';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('ui', ['isFavorite', 'isInCart']),
    primaryImage() {
      if (this.product.images && this.product.images.length > 0) {
        return this.product.images[0];
      }
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    },
    formattedPrice() {
      return formatPrice(this.product.price);
    },
    formattedOldPrice() {
      return this.product.oldPrice ? formatPrice(this.product.oldPrice) : null;
    }
  },
  methods: {
    ...mapActions('ui', ['toggleFavorite', 'addToCart']),
    onToggleFavorite() {
      this.toggleFavorite(this.product.id);
    },
    onAddToCart() {
      this.addToCart({ product: this.product, quantity: 1 });
    },
    handleImageError(event) {
      event.target.src =
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.product-card {
  @include card-surface;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--color-bg-card);
}

.product-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3; /* 4:3 iOS ratio requirement */
  background-color: var(--color-bg-fill);
  overflow: hidden;
}

.image-wrapper {
  display: block;
  width: 100%;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);

  @media (hover: hover) {
    .product-card:hover & {
      transform: scale(1.03);
    }
  }
}

.badge-group {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
  pointer-events: none;
}

.favorite-glass-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-pill);
  @include liquid-glass;
  color: var(--color-label-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: var(--shadow-sm);
  @include tap-spring;

  &:hover {
    color: var(--color-danger);
    background: var(--color-bg-surface);
  }

  &.is-active {
    color: var(--color-danger);
    background: var(--color-bg-surface);
  }

  .heart-active {
    color: var(--color-danger);
  }
}

.product-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.seller-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--font-size-caption-2);
  color: var(--color-label-tertiary);
  margin-bottom: 0.35rem;

  .seller-icon {
    color: var(--color-label-tertiary);
  }

  .seller-name {
    @include text-truncate;
    max-width: 110px;
  }
}

.product-title {
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;
  margin-bottom: 0.45rem;
  min-height: 2.7em;

  .title-link {
    @include line-clamp(2); /* 2-line title clamp requirement */
    color: var(--color-label-primary);

    &:hover {
      color: var(--color-primary);
    }
  }
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--font-size-caption-2);
  margin-bottom: 0.65rem;

  .stars {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: #FF9500;
    font-weight: var(--font-weight-semibold);
  }

  .reviews-count {
    color: var(--color-label-tertiary);
  }
}

.product-footer {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 0.5px solid var(--color-separator);
}

.price-wrap {
  display: flex;
  flex-direction: column;

  .old-price {
    font-size: var(--font-size-caption-2);
    color: var(--color-label-tertiary);
    text-decoration: line-through;
    line-height: 1.2;
  }

  .current-price {
    font-size: 1rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-label-primary);
    line-height: 1.2;
    letter-spacing: var(--letter-spacing-tight);

    .currency {
      font-size: var(--font-size-caption-2);
      font-weight: var(--font-weight-medium);
      color: var(--color-label-secondary);
    }
  }
}

.cart-action-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  background-color: var(--color-primary-tint);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  @include tap-spring;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-label-white);
  }

  &.in-cart {
    background-color: var(--color-success);
    color: var(--color-label-white);
  }
}
</style>
