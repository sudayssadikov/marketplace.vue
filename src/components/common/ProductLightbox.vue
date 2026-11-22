<template>
  <transition name="lightbox-fade">
    <div
      v-if="isOpen"
      class="ios-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="close"
    >
      <!-- Top controls -->
      <div class="lightbox-header">
        <span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        <div class="header-actions">
          <button
            type="button"
            class="control-pill-btn"
            :title="$t('product.zoomImage')"
            @click="toggleZoom"
          >
            <AppIcon name="zoom" size="18" />
          </button>
          <button
            type="button"
            class="control-pill-btn close-btn"
            aria-label="Close"
            @click="close"
          >
            <AppIcon name="xmark" size="20" />
          </button>
        </div>
      </div>

      <!-- Main image container -->
      <div class="lightbox-image-stage" @click="toggleZoom">
        <img
          :src="currentImage"
          :alt="'Image ' + (currentIndex + 1)"
          class="lightbox-image"
          :class="{ zoomed: isZoomed }"
        />
      </div>

      <!-- Prev / Next navigation -->
      <button
        v-if="images.length > 1"
        type="button"
        class="nav-glass-btn prev-btn"
        aria-label="Previous image"
        @click.stop="prev"
      >
        <AppIcon name="chevron-left" size="22" />
      </button>
      <button
        v-if="images.length > 1"
        type="button"
        class="nav-glass-btn next-btn"
        aria-label="Next image"
        @click.stop="next"
      >
        <AppIcon name="chevron-right" size="22" />
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ProductLightbox',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  data() {
    return {
      currentIndex: this.initialIndex,
      isZoomed: false
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || '';
    }
  },
  watch: {
    initialIndex(newVal) {
      this.currentIndex = newVal;
    },
    isOpen(newVal) {
      this.isZoomed = false;
      if (typeof document !== 'undefined') {
        if (newVal) {
          document.body.style.overflow = 'hidden';
          window.addEventListener('keydown', this.handleKeyDown);
        } else {
          document.body.style.overflow = '';
          window.removeEventListener('keydown', this.handleKeyDown);
        }
      }
    }
  },
  beforeUnmount() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  },
  methods: {
    close() {
      this.isZoomed = false;
      this.$emit('close');
    },
    prev() {
      this.isZoomed = false;
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    next() {
      this.isZoomed = false;
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    toggleZoom() {
      this.isZoomed = !this.isZoomed;
    },
    handleKeyDown(e) {
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.ios-lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-header {
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  .image-counter {
    color: #FFFFFF;
    font-size: var(--font-size-subhead);
    font-weight: var(--font-weight-semibold);
    background: rgba(255, 255, 255, 0.15);
    padding: 0.35rem 0.85rem;
    border-radius: var(--radius-pill);
    backdrop-filter: blur(12px);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .control-pill-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    @include tap-spring;

    &:hover {
      background: rgba(255, 255, 255, 0.28);
    }
  }
}

.lightbox-image-stage {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
  overflow: hidden;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  transition: transform 300ms var(--spring-ease);

  &.zoomed {
    transform: scale(1.6);
    cursor: zoom-out;
  }
}

.nav-glass-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(16px);
  z-index: 10;
  @include tap-spring;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev-btn {
    left: 1.5rem;
  }

  &.next-btn {
    right: 1.5rem;
  }
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 240ms ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>

