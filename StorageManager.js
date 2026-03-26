/**
 * StorageManager.js
 * Handles all localStorage read/write operations.
 */
export class StorageManager {
  static STORAGE_KEY = 'vault_transactions';

  /**
   * Load raw transaction objects from localStorage.
   * @returns {Array<Object>}
   */
  static load() {
    try {
      const raw = localStorage.getItem(StorageManager.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('StorageManager: failed to load data —', err);
      return [];
    }
  }

  /**
   * Save an array of plain objects to localStorage.
   * @param {Array<Object>} transactions
   */
  static save(transactions) {
    try {
      const data = transactions.map(tx =>
        typeof tx.toJSON === 'function' ? tx.toJSON() : tx
      );
      localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('StorageManager: failed to save data —', err);
    }
  }

  /** Clear all stored data */
  static clear() {
    try {
      localStorage.removeItem(StorageManager.STORAGE_KEY);
    } catch (err) {
      console.error('StorageManager: failed to clear data —', err);
    }
  }
}
