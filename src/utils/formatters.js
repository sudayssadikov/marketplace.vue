/**
 * Formatting utilities
 */

/**
 * Format numbers with space separators, e.g. 15400000 -> "15 400 000"
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return '0';
  return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatNumber = formatPrice;


/**
 * Format date string to localized date
 */
export const formatDate = (dateStr, locale = 'uz-UZ') => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

