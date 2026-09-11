/**
 * cvStore.js - High-Capacity Client-Side Binary Storage for CV / Resume Documents
 * 
 * Uses browser-native IndexedDB to eliminate the 5MB localStorage quota bottleneck.
 * Supports direct File/Blob storage up to hundreds of megabytes, instant Blob URL preview,
 * and reliable one-click downloads.
 */

const DB_NAME = 'portfolio_cv_db';
const DB_VERSION = 1;
const STORE_NAME = 'cv_files';
const CV_RECORD_ID = 'active_cv';

let dbInstance = null;

/**
 * Open or initialize the IndexedDB database
 */
function openDatabase() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      return reject(new Error('IndexedDB is not supported in this browser environment.'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('Failed to open CV IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Persist a File or Blob into IndexedDB
 * @param {File|Blob} file 
 * @param {string} [customName]
 * @returns {Promise<{ id: string, name: string, size: number, type: string, updatedAt: string, blob: Blob }>}
 */
export async function storeCvBlob(file, customName) {
  const db = await openDatabase();
  const fileName = customName || file.name || 'Niharika_CV.pdf';
  const fileSize = file.size || 0;
  const fileType = file.type || 'application/pdf';
  const updatedAt = new Date().toISOString();

  const record = {
    id: CV_RECORD_ID,
    name: fileName,
    size: fileSize,
    type: fileType,
    blob: file,
    updatedAt
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);

    req.onsuccess = () => {
      window.dispatchEvent(new CustomEvent('portfolio_cv_changed', { detail: record }));
      resolve(record);
    };

    req.onerror = (e) => {
      console.error('Error saving CV to IndexedDB:', e.target.error);
      reject(e.target.error);
    };
  });
}

/**
 * Retrieve the active stored CV record from IndexedDB
 * @returns {Promise<{ id: string, name: string, size: number, type: string, updatedAt: string, blob: Blob }|null>}
 */
export async function getStoredCvRecord() {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(CV_RECORD_ID);

      req.onsuccess = () => {
        resolve(req.result || null);
      };

      req.onerror = (e) => {
        console.warn('Error reading CV from IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('IndexedDB unavailable:', err);
    return null;
  }
}

/**
 * Remove the active CV record from IndexedDB
 * @returns {Promise<boolean>}
 */
export async function deleteStoredCvRecord() {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(CV_RECORD_ID);

      req.onsuccess = () => {
        window.dispatchEvent(new CustomEvent('portfolio_cv_changed', { detail: null }));
        resolve(true);
      };

      req.onerror = (e) => {
        console.error('Error deleting CV from IndexedDB:', e.target.error);
        resolve(false);
      };
    });
  } catch (err) {
    return false;
  }
}

/**
 * Preview the active CV by generating a native Blob URL and opening in a new browser tab.
 * Uses browser's native PDF reader (zero iframe / data URI restrictions).
 * @returns {Promise<boolean>} true if preview opened, false if no record
 */
export async function previewStoredCv() {
  const record = await getStoredCvRecord();
  if (record && record.blob) {
    const blobUrl = URL.createObjectURL(record.blob);
    const win = window.open(blobUrl, '_blank');
    if (!win) {
      alert('Pop-up blocked. Please allow pop-ups for this site to preview your PDF.');
      return false;
    }
    // Clean up memory after browser has loaded the PDF
    setTimeout(() => URL.revokeObjectURL(blobUrl), 120000);
    return true;
  }
  return false;
}

/**
 * Trigger direct download of the active CV file with its original filename
 * @returns {Promise<boolean>} true if download started, false if no record
 */
export async function downloadStoredCv() {
  const record = await getStoredCvRecord();
  if (record && record.blob) {
    const blobUrl = URL.createObjectURL(record.blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = record.name || 'Niharika_CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    return true;
  }
  return false;
}

/**
 * Helper to format byte counts into human-readable size
 * @param {number} bytes 
 * @returns {string} e.g. "245.8 KB", "1.4 MB"
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
