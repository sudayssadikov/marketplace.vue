<template>
  <div class="cart-view">
    <div class="container-fluid content-container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Header -->
      <div class="cart-page-header">
        <div class="header-left">
          <h1 class="page-title">{{ $t('cart.title') }}</h1>
          <span v-if="cartItems.length > 0" class="items-count-badge">
            {{ $t('cart.itemsCount', { count: totalItems }) }}
          </span>
        </div>
        <button
          v-if="cartItems.length > 0"
          type="button"
          class="clear-cart-btn"
          @click="handleClearCart"
        >
          <AppIcon name="trash" size="14" />
          <span>{{ $t('cart.clearCart') }}</span>
        </button>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cartItems.length === 0" class="empty-cart-card">
        <div class="empty-icon-wrap">
          <AppIcon name="cart" size="64" />
        </div>
        <h2 class="empty-title">{{ $t('cart.emptyCart') }}</h2>
        <p class="empty-desc">{{ $t('cart.emptyCartDesc') }}</p>
        <router-link to="/catalog" class="btn btn-primary btn-pill">
          <AppIcon name="arrow-left" size="16" />
          <span>{{ $t('cart.continueShopping') }}</span>
        </router-link>
      </div>

      <!-- Active Cart Items & Summary -->
      <div v-else class="row g-4 g-xl-5">
        <!-- Left: Cart Items List -->
        <div class="col-12 col-lg-8">
          <div class="cart-items-list">
            <div
              v-for="item in cartItems"
              :key="item.productId"
              class="cart-item-card"
            >
              <!-- Item Image -->
              <router-link :to="`/product/${item.productId}`" class="item-img-link">
                <img
                  :src="item.product?.images?.[0] || 'https://picsum.photos/200/200'"
                  :alt="item.product?.title || 'Product'"
                  class="item-img"
                />
              </router-link>

              <!-- Item Details -->
              <div class="item-info">
                <div class="item-top">
                  <span class="item-category">
                    {{ $t(`categories.${item.product?.category || 'smartphones'}`) }}
                  </span>
                  <button
                    type="button"
                    class="remove-btn"
                    :title="$t('cart.itemRemoved')"
                    :aria-label="$t('cart.itemRemoved')"
                    @click="handleRemoveItem(item.productId)"
                  >
                    <AppIcon name="trash" size="16" />
                  </button>
                </div>

                <router-link :to="`/product/${item.productId}`" class="item-title">
                  {{ item.product?.title || 'Product Title' }}
                </router-link>

                <div class="item-seller">
                  <AppIcon name="store" size="13" />
                  <span>{{ item.product?.seller }}</span>
                </div>

                <!-- Price & Quantity Row -->
                <div class="item-bottom">
                  <div class="item-price-wrap">
                    <span class="unit-price">
                      {{ formatNumber(item.product?.price || 0) }} {{ $t('product.currency') }}
                    </span>
                    <span v-if="item.product?.oldPrice" class="unit-old-price">
                      {{ formatNumber(item.product.oldPrice) }} {{ $t('product.currency') }}
                    </span>
                  </div>

                  <!-- Quantity Controller -->
                  <div class="qty-pill">
                    <button
                      type="button"
                      class="qty-btn"
                      aria-label="Decrease quantity"
                      @click="decreaseQty(item)"
                    >
                      <AppIcon name="minus" size="12" />
                    </button>
                    <span class="qty-number">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="qty-btn"
                      :disabled="item.quantity >= (item.product?.stock || 99)"
                      aria-label="Increase quantity"
                      @click="increaseQty(item)"
                    >
                      <AppIcon name="plus" size="12" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Shopping Link -->
          <div class="back-to-shop-wrap">
            <router-link to="/catalog" class="back-to-shop-link">
              <AppIcon name="arrow-left" size="15" />
              <span>{{ $t('cart.continueShopping') }}</span>
            </router-link>
          </div>
        </div>

        <!-- Right: Order Summary Card -->
        <div class="col-12 col-lg-4">
          <div class="summary-card">
            <h3 class="summary-title">{{ $t('cart.orderSummary') }}</h3>

            <div class="summary-rows">
              <div class="summary-row">
                <span class="label">{{ $t('cart.subtotal') }}</span>
                <span class="value">{{ formatNumber(subtotal) }} {{ $t('product.currency') }}</span>
              </div>

              <div v-if="totalDiscount > 0" class="summary-row discount-row">
                <span class="label">{{ $t('cart.discount') }}</span>
                <span class="value">-{{ formatNumber(totalDiscount) }} {{ $t('product.currency') }}</span>
              </div>

              <div class="summary-row">
                <span class="label">{{ $t('cart.delivery') }}</span>
                <span class="value free-tag">{{ $t('cart.deliveryFree') }}</span>
              </div>
            </div>

            <!-- Promo code input -->
            <div class="promo-box">
              <div class="promo-input-wrap">
                <AppIcon name="tag" size="16" class="promo-icon" />
                <input
                  v-model="promoInput"
                  type="text"
                  :placeholder="$t('cart.promoPlaceholder')"
                  class="promo-input"
                />
              </div>
              <button
                type="button"
                class="btn-promo-apply"
                :disabled="!promoInput.trim()"
                @click="applyPromoCode"
              >
                {{ $t('cart.applyPromo') }}
              </button>
            </div>

            <div class="divider"></div>

            <!-- Grand Total -->
            <div class="summary-total-row">
              <span class="total-label">{{ $t('cart.total') }}</span>
              <div class="total-value-box">
                <span class="total-amount">{{ formatNumber(grandTotal) }}</span>
                <span class="total-currency">{{ $t('product.currency') }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              type="button"
              class="btn btn-primary btn-checkout"
              @click="handleCheckout"
            >
              <AppIcon name="credit-card" size="18" />
              <span>{{ $t('cart.checkout') }}</span>
            </button>

            <!-- Safe guarantee notice -->
            <div class="checkout-guarantee">
              <AppIcon name="lock" size="14" />
              <span>{{ $t('productDetail.warranty') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import { formatNumber } from '@/utils/formatters';

export default {
  name: 'CartView',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      promoInput: '',
      appliedDiscount: 0
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.ui.cart;
    },
    totalItems() {
      return this.$store.getters['ui/cartTotalItems'];
    },
    breadcrumbItems() {
      return [
        { label: this.$t('breadcrumbs.cart') }
      ];
    },
    subtotal() {
      return this.cartItems.reduce((acc, item) => {
        const itemPrice = (item.product?.oldPrice || item.product?.price || 0);
        return acc + itemPrice * (item.quantity || 1);
      }, 0);
    },
    totalDiscount() {
      const itemsDiscount = this.cartItems.reduce((acc, item) => {
        if (item.product?.oldPrice && item.product?.price) {
          return acc + (item.product.oldPrice - item.product.price) * (item.quantity || 1);
        }
        return acc;
      }, 0);
      return itemsDiscount + this.appliedDiscount;
    },
    grandTotal() {
      const total = this.$store.getters['ui/cartTotalPrice'] - this.appliedDiscount;
      return total > 0 ? total : 0;
    }
  },
  methods: {
    formatNumber,
    increaseQty(item) {
      this.$store.dispatch('ui/updateCartQuantity', {
        productId: item.productId,
        quantity: item.quantity + 1
      });
    },
    decreaseQty(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('ui/updateCartQuantity', {
          productId: item.productId,
          quantity: item.quantity - 1
        });
      } else {
        this.handleRemoveItem(item.productId);
      }
    },
    handleRemoveItem(productId) {
      this.$store.dispatch('ui/removeFromCart', productId);
      this.$store.dispatch('ui/showToast', {
        message: 'cart.itemRemoved',
        icon: 'trash'
      });
    },
    handleClearCart() {
      this.$store.dispatch('ui/clearCart');
    },
    applyPromoCode() {
      if (!this.promoInput.trim()) return;
      this.appliedDiscount = 50000;
      this.promoInput = '';
      this.$store.dispatch('ui/showToast', {
        message: 'product.badgeDiscount',
        icon: 'check'
      });
    },
    handleCheckout() {
      this.$store.dispatch('ui/checkout');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.cart-view {
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

.cart-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

    .items-count-badge {
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-full);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);
      color: var(--color-text-secondary);
    }
  }

  .clear-cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--glass-border);
    background: transparent;
    color: var(--color-danger);
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background: rgba(255, 59, 48, 0.1);
    }
  }
}

/* Empty State */
.empty-cart-card {
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

/* Cart Items List */
.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: var(--radius-xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base);

  @include respond-to('sm') {
    gap: 1.25rem;
  }

  .item-img-link {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-surface);

    @include respond-to('sm') {
      width: 110px;
      height: 110px;
    }

    .item-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;

      .item-category {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--color-primary);
        letter-spacing: 0.04em;
      }

      .remove-btn {
        border: none;
        background: transparent;
        color: var(--color-text-tertiary);
        padding: 0.25rem;
        cursor: pointer;
        transition: color var(--transition-base);

        &:hover {
          color: var(--color-danger);
        }
      }
    }

    .item-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-primary);
      text-decoration: none;
      line-height: 1.35;
      margin-bottom: 0.375rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &:hover {
        color: var(--color-primary);
      }
    }

    .item-seller {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      margin-bottom: 0.75rem;
    }

    .item-bottom {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.75rem;

      .item-price-wrap {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;

        .unit-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .unit-old-price {
          font-size: 0.8125rem;
          color: var(--color-text-tertiary);
          text-decoration: line-through;
        }
      }

      .qty-pill {
        display: inline-flex;
        align-items: center;
        background: var(--color-surface);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-full);
        padding: 0.1875rem;

        .qty-btn {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          &:hover:not(:disabled) {
            background: var(--color-card);
          }

          &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
        }

        .qty-number {
          min-width: 2rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }
      }
    }
  }
}

.back-to-shop-wrap {
  margin-top: 1.5rem;

  .back-to-shop-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 0.9375rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* Summary Card */
.summary-card {
  padding: 1.5rem;
  border-radius: var(--radius-2xl);
  background: var(--color-card);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 5rem;

  .summary-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 1.25rem;
  }

  .summary-rows {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;

    .summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9375rem;
      color: var(--color-text-secondary);

      .value {
        font-weight: 600;
        color: var(--color-text-primary);

        &.free-tag {
          color: var(--color-success);
        }
      }

      &.discount-row .value {
        color: var(--color-success);
      }
    }
  }

  .promo-box {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.25rem;

    .promo-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-full);
      background: var(--color-surface);
      border: 1px solid var(--glass-border);

      .promo-icon {
        color: var(--color-text-tertiary);
      }

      .promo-input {
        border: none;
        background: transparent;
        font-size: 0.875rem;
        color: var(--color-text-primary);
        width: 100%;
        outline: none;

        &::placeholder {
          color: var(--color-text-tertiary);
        }
      }
    }

    .btn-promo-apply {
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      border: none;
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-weight: 600;
      font-size: 0.8125rem;
      cursor: pointer;
      border: 1px solid var(--glass-border);
      transition: all var(--transition-base);

      &:hover:not(:disabled) {
        background: var(--color-primary);
        color: #fff;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  .divider {
    height: 1px;
    background: var(--glass-border);
    margin: 1.25rem 0;
  }

  .summary-total-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5rem;

    .total-label {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .total-value-box {
      display: flex;
      align-items: baseline;
      gap: 0.375rem;

      .total-amount {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--color-primary);
      }

      .total-currency {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
    }
  }

  .btn-checkout {
    width: 100%;
    min-height: 50px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(10, 132, 255, 0.35);
  }

  .checkout-guarantee {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    margin-top: 1rem;
  }
}
</style>

