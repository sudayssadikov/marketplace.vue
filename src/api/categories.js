/**
 * Categories Mock Service
 * Returns category list with simulated network latency
 */

export const CATEGORIES = [
  {
    id: 'all',
    slug: 'all',
    icon: 'grid',
    nameKey: 'categories.all',
    color: '#0A84FF',
    count: 48
  },
  {
    id: 'smartphones',
    slug: 'smartphones',
    icon: 'smartphone',
    nameKey: 'categories.smartphones',
    color: '#0A84FF',
    count: 10
  },
  {
    id: 'laptops',
    slug: 'laptops',
    icon: 'laptop',
    nameKey: 'categories.laptops',
    color: '#5856D6',
    count: 8
  },
  {
    id: 'audio',
    slug: 'audio',
    icon: 'headphones',
    nameKey: 'categories.audio',
    color: '#34C759',
    count: 7
  },
  {
    id: 'wearables',
    slug: 'wearables',
    icon: 'watch',
    nameKey: 'categories.wearables',
    color: '#FF9500',
    count: 6
  },
  {
    id: 'appliances',
    slug: 'appliances',
    icon: 'appliances',
    nameKey: 'categories.appliances',
    color: '#FF3B30',
    count: 6
  },
  {
    id: 'gaming',
    slug: 'gaming',
    icon: 'gamepad',
    nameKey: 'categories.gaming',
    color: '#AF52DE',
    count: 6
  },
  {
    id: 'clothing',
    slug: 'clothing',
    icon: 'clothing',
    nameKey: 'categories.clothing',
    color: '#FF2D55',
    count: 5
  }
];

export const fetchCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...CATEGORIES]);
    }, 250);
  });
};

export const fetchCategoryBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = CATEGORIES.find((c) => c.slug === slug);
      if (category) {
        resolve({ ...category });
      } else {
        reject(new Error(`Category ${slug} not found`));
      }
    }, 200);
  });
};
