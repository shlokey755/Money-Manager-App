/**
 * FilterManager.js
 * Reads and manages the filter/sort controls in the UI.
 */
export class FilterManager {
  constructor(onChange) {
    this._onChange = onChange;

    this.categoryEl    = document.getElementById('filterCategory');
    this.subCategoryEl = document.getElementById('filterSubCategory');
    this.dateFromEl    = document.getElementById('filterDateFrom');
    this.dateToEl      = document.getElementById('filterDateTo');
    this.sortByEl      = document.getElementById('sortBy');
    this.resetBtn      = document.getElementById('resetFiltersBtn');

    this._bindEvents();
  }

  _bindEvents() {
    [this.categoryEl, this.subCategoryEl, this.dateFromEl, this.dateToEl, this.sortByEl]
      .forEach(el => el.addEventListener('change', () => this._onChange(this.getFilters())));

    this.resetBtn.addEventListener('click', () => this.reset());
  }

  /** @returns {Object} current filter state */
  getFilters() {
    return {
      category:    this.categoryEl.value,
      subCategory: this.subCategoryEl.value,
      dateFrom:    this.dateFromEl.value,
      dateTo:      this.dateToEl.value,
      sortBy:      this.sortByEl.value,
    };
  }

  /** Reset all filters to defaults */
  reset() {
    this.categoryEl.value    = 'all';
    this.subCategoryEl.value = 'all';
    this.dateFromEl.value    = '';
    this.dateToEl.value      = '';
    this.sortByEl.value      = 'date-desc';
    this._onChange(this.getFilters());
  }
}
