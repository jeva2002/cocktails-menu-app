import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  CollectionReference,
  DocumentData,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const cocktailsCollection = collection(db, 'cocktails');

export const createDocument = async (
  data: any,
  collection: string,
  document: string,
  options?: {}
) => {
  try {
    return await setDoc(doc(db, collection, document), data, options ?? {});
  } catch (error) {
    throw error;
  }
};

export const getDocument = async (path: string) => {
  try {
    const document = await getDoc(doc(db, path));
    return document.data();
  } catch (error) {
    throw error;
  }
};

export const getAllDocuments = async (
  collection: CollectionReference<DocumentData>
) => {
  try {
    return await (
      await getDocs(collection)
    ).docs.map((e) => {
      return { ...e.data(), id: e.id };
    });
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async (
  data: any,
  collection: string,
  document: string
) => {
  try {
    return await updateDoc(doc(db, collection, document), data);
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async (collection: string, document: string) => {
  try {
    return await deleteDoc(doc(db, collection, document));
  } catch (error) {
    throw error;
  }
};

export const listenDocument = async (
  collection: string,
  document: string,
  callback: () => Promise<void>
) => {
  try {
    return onSnapshot(doc(db, collection, document), () => {
      if (callback) callback();
    });
  } catch (error) {
    throw error;
  }
};
