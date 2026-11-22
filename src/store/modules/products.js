import { fetchProducts, fetchCuratedSection } from '@/api/products';
import { fetchCategories } from '@/api/categories';

export default {
  namespaced: true,
  state: () => ({
    // Paginated main list
    items: [],
    pagination: {
      page: 1,
      limit: 12,
      totalItems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false
    },
    loading: false,
    error: null,

    // Categories
    categories: [],
    categoriesLoading: false,

    // Filter and sort state
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    minPrice: null,
    maxPrice: null,
    minRating: null,
    inStockOnly: false,

    // Featured curated sections
    featured: {
      popular: [],
      newArrivals: [],
      deals: []
    },
    featuredLoading: false
  }),
  getters: {
    productsList: (state) => state.items,
    paginationData: (state) => state.pagination,
    isLoading: (state) => state.loading,
    categoriesList: (state) => state.categories,
    selectedCategory: (state) => state.selectedCategory,
    searchQuery: (state) => state.searchQuery,
    sortBy: (state) => state.sortBy,
    filtersState: (state) => ({
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      minRating: state.minRating,
      inStockOnly: state.inStockOnly
    }),
    popularProducts: (state) => state.featured.popular,
    newProducts: (state) => state.featured.newArrivals,
    dealProducts: (state) => state.featured.deals,
    isFeaturedLoading: (state) => state.featuredLoading
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_PRODUCTS(state, { items, pagination }) {
      state.items = items;
      state.pagination = pagination;
    },
    SET_CATEGORIES_LOADING(state, loading) {
      state.categoriesLoading = loading;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_SELECTED_CATEGORY(state, category) {
      state.selectedCategory = category;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SORT_BY(state, sortBy) {
      state.sortBy = sortBy;
    },
    SET_FILTERS(state, { minPrice, maxPrice, minRating, inStockOnly }) {
      if (minPrice !== undefined) state.minPrice = minPrice;
      if (maxPrice !== undefined) state.maxPrice = maxPrice;
      if (minRating !== undefined) state.minRating = minRating;
      if (inStockOnly !== undefined) state.inStockOnly = inStockOnly;
    },
    RESET_FILTERS(state) {
      state.minPrice = null;
      state.maxPrice = null;
      state.minRating = null;
      state.inStockOnly = false;
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.sortBy = 'featured';
    },
    SET_PAGE(state, page) {
      state.pagination.page = page;
    },
    SET_FEATURED_LOADING(state, loading) {
      state.featuredLoading = loading;
    },
    SET_FEATURED_SECTION(state, { key, items }) {
      state.featured[key] = items;
    }
  },
  actions: {
    async loadCategories({ commit, state }) {
      if (state.categories.length > 0) return;
      commit('SET_CATEGORIES_LOADING', true);
      try {
        const categories = await fetchCategories();
        commit('SET_CATEGORIES', categories);
      } catch (err) {
        commit('SET_ERROR', err.message);
      } finally {
        commit('SET_CATEGORIES_LOADING', false);
      }
    },

    async loadProducts({ commit, state }, customParams = {}) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      const params = {
        page: customParams.page || state.pagination.page,
        limit: customParams.limit || state.pagination.limit,
        category: customParams.category !== undefined ? customParams.category : state.selectedCategory,
        search: customParams.search !== undefined ? customParams.search : state.searchQuery,
        sortBy: customParams.sortBy || state.sortBy,
        minPrice: customParams.minPrice !== undefined ? customParams.minPrice : state.minPrice,
        maxPrice: customParams.maxPrice !== undefined ? customParams.maxPrice : state.maxPrice,
        minRating: customParams.minRating !== undefined ? customParams.minRating : state.minRating,
        inStockOnly: customParams.inStockOnly !== undefined ? customParams.inStockOnly : state.inStockOnly
      };

      try {
        const result = await fetchProducts(params);
        commit('SET_PRODUCTS', result);
      } catch (err) {
        commit('SET_ERROR', err.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async loadFeaturedSections({ commit }) {
      commit('SET_FEATURED_LOADING', true);
      try {
        const [popular, newArrivals, deals] = await Promise.all([
          fetchCuratedSection('popular', 4),
          fetchCuratedSection('new', 4),
          fetchCuratedSection('deals', 4)
        ]);
        commit('SET_FEATURED_SECTION', { key: 'popular', items: popular });
        commit('SET_FEATURED_SECTION', { key: 'newArrivals', items: newArrivals });
        commit('SET_FEATURED_SECTION', { key: 'deals', items: deals });
      } catch (err) {
        console.error('Error fetching featured sections:', err);
      } finally {
        commit('SET_FEATURED_LOADING', false);
      }
    },

    setCategory({ commit, dispatch }, category) {
      commit('SET_SELECTED_CATEGORY', category);
      commit('SET_PAGE', 1);
      return dispatch('loadProducts', { category, page: 1 });
    },

    setSearch({ commit, dispatch }, query) {
      commit('SET_SEARCH_QUERY', query);
      commit('SET_PAGE', 1);
      return dispatch('loadProducts', { search: query, page: 1 });
    },

    setSort({ commit, dispatch }, sortBy) {
      commit('SET_SORT_BY', sortBy);
      commit('SET_PAGE', 1);
      return dispatch('loadProducts', { sortBy, page: 1 });
    },

    setFilters({ commit, dispatch }, filters) {
      commit('SET_FILTERS', filters);
      commit('SET_PAGE', 1);
      return dispatch('loadProducts', { ...filters, page: 1 });
    },

    resetFilters({ commit, dispatch }) {
      commit('RESET_FILTERS');
      commit('SET_PAGE', 1);
      return dispatch('loadProducts', {
        category: 'all',
        search: '',
        sortBy: 'featured',
        minPrice: null,
        maxPrice: null,
        minRating: null,
        inStockOnly: false,
        page: 1
      });
    },

    setPage({ commit, dispatch }, page) {
      commit('SET_PAGE', page);
      return dispatch('loadProducts', { page });
    }
  }
};
