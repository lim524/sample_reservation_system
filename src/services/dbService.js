const DB_NAME = 'aura_consulting_db';
const DB_VERSION = 1;
const STORE_APPOINTMENTS = 'appointments';
const STORE_CONSULTATIONS = 'consultations';

/**
 * Open or upgrade the IndexedDB database
 */
const openDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('이 브라우저는 IndexedDB를 지원하지 않습니다.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create Appointments store
      if (!db.objectStoreNames.contains(STORE_APPOINTMENTS)) {
        const appointmentStore = db.createObjectStore(STORE_APPOINTMENTS, { keyPath: 'id' });
        appointmentStore.createIndex('createdAt', 'createdAt', { unique: false });
        appointmentStore.createIndex('date', 'date', { unique: false });
        appointmentStore.createIndex('customerName', 'customerName', { unique: false });
      }

      // Create Consultations store
      if (!db.objectStoreNames.contains(STORE_CONSULTATIONS)) {
        const consultationStore = db.createObjectStore(STORE_CONSULTATIONS, { keyPath: 'id' });
        consultationStore.createIndex('createdAt', 'createdAt', { unique: false });
        consultationStore.createIndex('customerName', 'customerName', { unique: false });
      }
    };
  });
};

/**
 * Add new appointment
 */
export const addAppointment = async (data) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_APPOINTMENTS, 'readwrite');
      const store = tx.objectStore(STORE_APPOINTMENTS);

      const record = {
        id: 'APT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        ...data,
      };

      const request = store.add(record);

      request.onsuccess = () => {
        resolve({ success: true, data: record });
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('addAppointment failed:', error);
    throw error;
  }
};

/**
 * Get all appointments sorted by creation date descending
 */
export const getAllAppointments = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_APPOINTMENTS, 'readonly');
      const store = tx.objectStore(STORE_APPOINTMENTS);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result || [];
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        resolve(results);
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('getAllAppointments failed:', error);
    return [];
  }
};

/**
 * Delete an appointment by ID
 */
export const deleteAppointment = async (id) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_APPOINTMENTS, 'readwrite');
      const store = tx.objectStore(STORE_APPOINTMENTS);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('deleteAppointment failed:', error);
    return false;
  }
};

/**
 * Add quick consultation request
 */
export const addConsultation = async (data) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CONSULTATIONS, 'readwrite');
      const store = tx.objectStore(STORE_CONSULTATIONS);

      const record = {
        id: 'CNS-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        ...data,
      };

      const request = store.add(record);

      request.onsuccess = () => {
        resolve({ success: true, data: record });
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('addConsultation failed:', error);
    throw error;
  }
};

/**
 * Get all consultation requests
 */
export const getAllConsultations = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CONSULTATIONS, 'readonly');
      const store = tx.objectStore(STORE_CONSULTATIONS);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result || [];
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        resolve(results);
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('getAllConsultations failed:', error);
    return [];
  }
};

/**
 * Delete consultation entry
 */
export const deleteConsultation = async (id) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CONSULTATIONS, 'readwrite');
      const store = tx.objectStore(STORE_CONSULTATIONS);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (error) {
    console.error('deleteConsultation failed:', error);
    return false;
  }
};
