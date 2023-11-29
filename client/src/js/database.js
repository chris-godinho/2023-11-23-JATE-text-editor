import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const transaction = db.transaction("jate", "readwrite");
    const store = transaction.objectStore("jate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("JATE database updated", result);
  } catch (error) {
    console.error("Error updating JATE database:", error);
  }
};

export const getDb = async () => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result?.value;
};

initdb();
